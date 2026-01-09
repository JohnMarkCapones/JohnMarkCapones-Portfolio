/**
 * Client-Side Storage Utility
 * localStorage cache with TTL (Time To Live) support
 * Includes automatic cleanup of expired entries
 */

export interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

/**
 * Storage configuration
 */
const STORAGE_CONFIG = {
  prefix: 'portfolio_', // Prefix for all cache keys
  defaultTTL: 30 * 60 * 1000, // 30 minutes in milliseconds
  cleanupInterval: 5 * 60 * 1000, // Run cleanup every 5 minutes
} as const;

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const test = '__storage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get prefixed cache key
 */
function getCacheKey(key: string): string {
  return `${STORAGE_CONFIG.prefix}${key}`;
}

/**
 * Set data in cache with TTL
 *
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttl - Time to live in milliseconds (default: 30 minutes)
 */
export function setCache<T>(key: string, data: T, ttl: number = STORAGE_CONFIG.defaultTTL): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    const cacheKey = getCacheKey(key);
    const entry: CacheEntry<T> = {
      data,
      expiresAt: Date.now() + ttl,
    };

    window.localStorage.setItem(cacheKey, JSON.stringify(entry));
  } catch (error) {
    // Silently fail if localStorage is full or unavailable
    console.warn('Failed to set cache:', error);
  }
}

/**
 * Get data from cache
 * Returns null if cache is expired or doesn't exist
 *
 * @param key - Cache key
 */
export function getCache<T>(key: string): T | null {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    const cacheKey = getCacheKey(key);
    const item = window.localStorage.getItem(cacheKey);

    if (!item) {
      return null;
    }

    const entry: CacheEntry<T> = JSON.parse(item);

    // Check if cache is expired
    if (Date.now() > entry.expiresAt) {
      // Remove expired entry
      window.localStorage.removeItem(cacheKey);
      return null;
    }

    return entry.data;
  } catch (error) {
    // Return null if parsing fails
    console.warn('Failed to get cache:', error);
    return null;
  }
}

/**
 * Remove specific cache entry
 *
 * @param key - Cache key
 */
export function removeCache(key: string): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    const cacheKey = getCacheKey(key);
    window.localStorage.removeItem(cacheKey);
  } catch (error) {
    console.warn('Failed to remove cache:', error);
  }
}

/**
 * Clear all cache entries with our prefix
 */
export function clearAllCache(): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    const keys = Object.keys(window.localStorage);
    const cacheKeys = keys.filter((key) => key.startsWith(STORAGE_CONFIG.prefix));

    cacheKeys.forEach((key) => {
      window.localStorage.removeItem(key);
    });
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
}

/**
 * Clean up expired cache entries
 * Called automatically on initialization
 */
export function cleanupExpiredCache(): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    const keys = Object.keys(window.localStorage);
    const cacheKeys = keys.filter((key) => key.startsWith(STORAGE_CONFIG.prefix));
    const now = Date.now();

    cacheKeys.forEach((key) => {
      try {
        const item = window.localStorage.getItem(key);
        if (!item) return;

        const entry: CacheEntry<unknown> = JSON.parse(item);

        // Remove if expired
        if (now > entry.expiresAt) {
          window.localStorage.removeItem(key);
        }
      } catch {
        // Remove if parsing fails
        window.localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Failed to cleanup cache:', error);
  }
}

/**
 * Initialize cache cleanup
 * Run cleanup on page load and periodically
 */
if (typeof window !== 'undefined') {
  // Run cleanup immediately
  cleanupExpiredCache();

  // Setup periodic cleanup
  setInterval(cleanupExpiredCache, STORAGE_CONFIG.cleanupInterval);
}

/**
 * Cache key constants for GitHub data
 */
export const CACHE_KEYS = {
  GITHUB_USER: 'github_user',
  GITHUB_REPOS: 'github_repos',
  GITHUB_STATS: 'github_stats',
} as const;
