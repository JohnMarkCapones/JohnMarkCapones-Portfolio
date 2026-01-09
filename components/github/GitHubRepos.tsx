/**
 * GitHub Repositories Component
 * Display pinned/top repositories with live stats
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPinnedRepos, type GitHubRepo } from '@/lib/github';
import { staggerContainer, staggerItem } from '@/lib/animations';

/**
 * GitHub Repos Props
 */
export interface GitHubReposProps {
  /**
   * Custom className
   */
  className?: string;

  /**
   * Number of repos to show
   * @default 6
   */
  limit?: number;
}

/**
 * Repository Card Component
 */
interface RepoCardProps {
  repo: GitHubRepo;
}

function RepoCard({ repo }: RepoCardProps) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card variant="hover" className="h-full">
        <CardHeader>
          <div className="mb-2 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-text-tertiary" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
              </svg>
              <CardTitle className="text-lg">{repo.name}</CardTitle>
            </div>
          </div>
          <CardDescription className="line-clamp-2">
            {repo.description || 'No description available'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Language & Topics */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {repo.language && (
              <Badge variant="secondary" size="sm">
                {repo.language}
              </Badge>
            )}
            {repo.topics?.slice(0, 2).map((topic) => (
              <Badge key={topic} variant="outline" size="sm">
                {topic}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-text-tertiary">
            {/* Stars */}
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
              <span>{repo.stargazers_count}</span>
            </div>

            {/* Forks */}
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              </svg>
              <span>{repo.forks_count}</span>
            </div>

            {/* Updated */}
            <div className="ml-auto text-xs">
              Updated {new Date(repo.updated_at).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.a>
  );
}

/**
 * Repository Loading Skeleton
 */
function RepoSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 h-6 w-32 animate-pulse rounded bg-surface-tertiary" />
        <div className="h-4 w-full animate-pulse rounded bg-surface-tertiary" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface-tertiary" />
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded bg-surface-tertiary" />
          <div className="h-6 w-16 animate-pulse rounded bg-surface-tertiary" />
        </div>
        <div className="flex gap-4">
          <div className="h-4 w-12 animate-pulse rounded bg-surface-tertiary" />
          <div className="h-4 w-12 animate-pulse rounded bg-surface-tertiary" />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * GitHub Repositories Component
 *
 * Displays top/pinned repositories with live statistics
 */
export function GitHubRepos({ className, limit = 6 }: GitHubReposProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const data = await getPinnedRepos();
        setRepos(data.slice(0, limit));
      } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [limit]);

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8 text-center">
        <Badge variant="primary" className="mb-4">
          Featured Repositories
        </Badge>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Top Projects on GitHub</h2>
        <p className="text-text-secondary">
          My most popular and actively maintained open source projects
        </p>
      </div>

      {/* Repository Grid */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit }).map((_, index) => (
            <RepoSkeleton key={index} />
          ))}
        </div>
      ) : repos.length > 0 ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px', amount: 0.1 }}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {repos.map((repo) => (
            <motion.div key={repo.id} variants={staggerItem}>
              <RepoCard repo={repo} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-text-secondary">No repositories found</p>
          </CardContent>
        </Card>
      )}

      {/* View All Link */}
      <div className="mt-8 text-center">
        <a
          href="https://github.com/JohnMarkCapones?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          View all repositories on GitHub
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
