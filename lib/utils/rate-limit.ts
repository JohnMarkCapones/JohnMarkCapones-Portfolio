/**
 * Rate Limiting Utility
 * Distributed rate limiter using Vercel KV for serverless environments
 */

import { kv } from '@vercel/kv';

/**
 * Rate limit configuration
 */
const RATE_LIMIT_CONFIG = {
  maxRequests: 5, // Max requests per window
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
};

interface RateLimitData {
  count: number;
  resetTime: number;
}

/**
 * Check if request should be rate limited
 * Uses Vercel KV for distributed rate limiting across serverless functions
 *
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @returns Promise with allowed status and remaining attempts
 */
export async function checkRateLimit(identifier: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetTime: number;
}> {
  try {
    const key = `rate_limit:${identifier}`;
    const now = Date.now();

    // Get current count and reset time from KV
    const data = await kv.get<RateLimitData>(key);

    // First request or expired window
    if (!data || now > data.resetTime) {
      const resetTime = now + RATE_LIMIT_CONFIG.windowMs;
      await kv.set(key, { count: 1, resetTime }, { px: RATE_LIMIT_CONFIG.windowMs });

      return {
        allowed: true,
        remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
        resetTime,
      };
    }

    // Check if limit exceeded
    if (data.count >= RATE_LIMIT_CONFIG.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: data.resetTime,
      };
    }

    // Increment count
    const newCount = data.count + 1;
    const ttl = data.resetTime - now;
    await kv.set(key, { count: newCount, resetTime: data.resetTime }, { px: ttl });

    return {
      allowed: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests - newCount,
      resetTime: data.resetTime,
    };
  } catch (error) {
    // Fallback: allow request if KV fails (don't block users due to infrastructure issues)
    // In production, you might want to log this to a monitoring service
    console.error('Rate limit check failed (KV error):', error);

    return {
      allowed: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests,
      resetTime: Date.now() + RATE_LIMIT_CONFIG.windowMs,
    };
  }
}
