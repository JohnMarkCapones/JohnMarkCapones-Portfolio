/**
 * Custom Hooks for GitHub Data with Caching
 * Uses localStorage cache with TTL for optimal performance
 */

'use client';

import { useEffect, useState } from 'react';
import { getCache, setCache, CACHE_KEYS } from '@/lib/utils/storage';
import {
  getGitHubStats,
  getPinnedRepos,
  getMockContributions,
  getContributionStats,
  type GitHubStats,
  type GitHubRepo,
} from '@/lib/github';

/**
 * Contribution stats structure
 */
export interface ContributionStatsData {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
}

/**
 * Hook result structure
 */
interface UseGitHubDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Cache TTL: 30 minutes
 */
const CACHE_TTL = 30 * 60 * 1000;

/**
 * Custom hook for GitHub stats with caching
 *
 * Fetches GitHub stats and caches them in localStorage for 30 minutes.
 * On subsequent visits, data loads instantly from cache while fresh data
 * is fetched in the background.
 *
 * @example
 * ```tsx
 * const { data: stats, loading, error, refetch } = useGitHubStats();
 * ```
 */
export function useGitHubStats(): UseGitHubDataResult<GitHubStats> {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get from cache first
      const cachedData = getCache<GitHubStats>(CACHE_KEYS.GITHUB_STATS);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        // Still fetch fresh data in background
        const freshData = await getGitHubStats();
        if (freshData) {
          setCache(CACHE_KEYS.GITHUB_STATS, freshData, CACHE_TTL);
          setData(freshData);
        }
        return;
      }

      // No cache, fetch fresh data
      const freshData = await getGitHubStats();
      if (freshData) {
        setCache(CACHE_KEYS.GITHUB_STATS, freshData, CACHE_TTL);
        setData(freshData);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch GitHub stats'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchStats,
  };
}

/**
 * Custom hook for GitHub repositories with caching
 *
 * Fetches pinned/top repositories and caches them in localStorage for 30 minutes.
 * Implements stale-while-revalidate pattern for instant loads.
 *
 * @param limit - Number of repos to return (default: 6)
 *
 * @example
 * ```tsx
 * const { data: repos, loading, error, refetch } = useGitHubRepos(6);
 * ```
 */
export function useGitHubRepos(limit: number = 6): UseGitHubDataResult<GitHubRepo[]> {
  const [data, setData] = useState<GitHubRepo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRepos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get from cache first
      const cachedData = getCache<GitHubRepo[]>(CACHE_KEYS.GITHUB_REPOS);
      if (cachedData) {
        setData(cachedData.slice(0, limit));
        setLoading(false);
        // Still fetch fresh data in background
        const freshData = await getPinnedRepos();
        if (freshData && freshData.length > 0) {
          setCache(CACHE_KEYS.GITHUB_REPOS, freshData, CACHE_TTL);
          setData(freshData.slice(0, limit));
        }
        return;
      }

      // No cache, fetch fresh data
      const freshData = await getPinnedRepos();
      if (freshData && freshData.length > 0) {
        setCache(CACHE_KEYS.GITHUB_REPOS, freshData, CACHE_TTL);
        setData(freshData.slice(0, limit));
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch GitHub repos'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, [limit]);

  return {
    data,
    loading,
    error,
    refetch: fetchRepos,
  };
}

/**
 * Custom hook for contribution stats with caching
 *
 * Fetches contribution statistics (total, current streak, longest streak)
 * and caches them in localStorage for 30 minutes.
 *
 * @example
 * ```tsx
 * const { data: stats, loading, error } = useContributionStats();
 * if (stats) {
 *   console.log(stats.totalContributions, stats.currentStreak);
 * }
 * ```
 */
export function useContributionStats(): UseGitHubDataResult<ContributionStatsData> {
  const [data, setData] = useState<ContributionStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContributions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get from cache first
      const cachedData = getCache<ContributionStatsData>('github_contributions');
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        // Still fetch fresh data in background
        const contributions = getMockContributions();
        const freshData = getContributionStats(contributions);
        setCache('github_contributions', freshData, CACHE_TTL);
        setData(freshData);
        return;
      }

      // No cache, fetch fresh data
      const contributions = getMockContributions();
      const freshData = getContributionStats(contributions);
      setCache('github_contributions', freshData, CACHE_TTL);
      setData(freshData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch contribution stats'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchContributions,
  };
}

/**
 * Combined hook for all GitHub data
 *
 * Fetches all GitHub data (stats, repos, contributions) with caching.
 * Useful when you need multiple data sources on the same page.
 *
 * @param repoLimit - Number of repos to return (default: 6)
 *
 * @example
 * ```tsx
 * const { stats, repos, contributions, loading } = useAllGitHubData(6);
 * ```
 */
export function useAllGitHubData(repoLimit: number = 6) {
  const stats = useGitHubStats();
  const repos = useGitHubRepos(repoLimit);
  const contributions = useContributionStats();

  return {
    stats: stats.data,
    repos: repos.data,
    contributions: contributions.data,
    loading: stats.loading || repos.loading || contributions.loading,
    error: stats.error || repos.error || contributions.error,
    refetch: async () => {
      await Promise.all([stats.refetch(), repos.refetch(), contributions.refetch()]);
    },
  };
}
