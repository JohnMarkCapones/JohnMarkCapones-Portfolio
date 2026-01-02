/**
 * GitHub Stats Component
 * Display live GitHub statistics
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getGitHubStats, getMockContributions, getContributionStats, type GitHubStats } from '@/lib/github';
import { staggerContainer, staggerItem } from '@/lib/animations';

/**
 * GitHub Stats Props
 */
export interface GitHubStatsProps {
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Stat Card Component
 */
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  loading?: boolean;
}

function StatCard({ icon, label, value, change, loading }: StatCardProps) {
  return (
    <Card variant="hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          {change && (
            <Badge variant="success" size="sm">
              {change}
            </Badge>
          )}
        </div>
        <div className="mt-4">
          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded bg-surface-tertiary" />
          ) : (
            <p className="text-3xl font-bold text-text-primary">{value.toLocaleString()}</p>
          )}
          <p className="mt-1 text-sm text-text-tertiary">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * GitHub Stats Component
 *
 * Displays live statistics from GitHub API
 */
export function GitHubStats({ className }: GitHubStatsProps) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [contributionStats, setContributionStats] = useState({
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch GitHub stats
        const githubStats = await getGitHubStats();
        setStats(githubStats);

        // Get contribution data
        const contributions = getMockContributions();
        const contribStats = getContributionStats(contributions);
        setContributionStats(contribStats);
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8 text-center">
        <Badge variant="primary" className="mb-4">
          Live from GitHub
        </Badge>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Open Source Contributions</h2>
        <p className="text-text-secondary">
          Real-time stats from my GitHub profile
        </p>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px', amount: 0.2 }}
        variants={staggerContainer}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={staggerItem}>
          <StatCard
            icon={
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            }
            label="Public Repositories"
            value={stats?.totalRepos || 0}
            loading={loading}
          />
        </motion.div>

        <motion.div variants={staggerItem}>
          <StatCard
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            }
            label="Total Stars"
            value={stats?.totalStars || 0}
            loading={loading}
          />
        </motion.div>

        <motion.div variants={staggerItem}>
          <StatCard
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            label="Followers"
            value={stats?.followers || 0}
            loading={loading}
          />
        </motion.div>

        <motion.div variants={staggerItem}>
          <StatCard
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            label="Contributions (2024)"
            value={contributionStats.totalContributions}
            loading={loading}
          />
        </motion.div>
      </motion.div>

      {/* Contribution Streaks */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px', amount: 0.2 }}
        variants={staggerContainer}
        className="mt-6 grid gap-6 sm:grid-cols-2"
      >
        <motion.div variants={staggerItem}>
          <Card variant="hover" className="border-accent-green/20 bg-accent-green/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-green/20 text-accent-green">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">{contributionStats.currentStreak} days</p>
                  <p className="text-sm text-text-tertiary">Current Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card variant="hover" className="border-accent-amber/20 bg-accent-amber/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-amber/20 text-accent-amber">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">{contributionStats.longestStreak} days</p>
                  <p className="text-sm text-text-tertiary">Longest Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
