/**
 * Rate Limiting Utility
 * Simple in-memory rate limiter for API routes
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Rate limit configuration
 */
const RATE_LIMIT_CONFIG = {
  maxRequests: 5, // Max requests per window
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
};

/**
 * Check if request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @returns Object with allowed status and remaining attempts
 */
export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // No entry exists - first request
  if (!entry) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    });

    return {
      allowed: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    };
  }

  // Entry exists but window has expired - reset
  if (now > entry.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    });

    return {
      allowed: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    };
  }

  // Entry exists and window is active
  if (entry.count >= RATE_LIMIT_CONFIG.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;
  rateLimitMap.set(identifier, entry);

  return {
    allowed: true,
    remaining: RATE_LIMIT_CONFIG.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Clean up expired entries (optional - prevents memory leak)
 */
export function cleanupRateLimitMap(): void {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

// Clean up every 10 minutes
if (typeof window === 'undefined') {
  setInterval(cleanupRateLimitMap, 10 * 60 * 1000);
}
