/**
 * Project Card Component
 * Displays project information in a card format
 */

'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

/**
 * Project Card Props
 */
export interface ProjectCardProps {
  /**
   * Project data
   */
  project: Project;

  /**
   * Card size variant
   */
  variant?: 'default' | 'featured';

  /**
   * Show full description
   */
  showFullDescription?: boolean;
}

/**
 * Get status badge variant
 */
function getStatusVariant(status: string): 'success' | 'warning' | 'secondary' {
  switch (status) {
    case 'live':
      return 'success';
    case 'development':
      return 'warning';
    default:
      return 'secondary';
  }
}

/**
 * Project Card Component
 *
 * Features:
 * - Hover lift effect
 * - Tech stack badges
 * - Status indicator
 * - Metrics display
 * - Link to detail page
 *
 * @example
 * ```tsx
 * <ProjectCard
 *   project={campusConnect}
 *   variant="featured"
 * />
 * ```
 */
export function ProjectCard({ project, variant = 'default', showFullDescription = false }: ProjectCardProps) {
  const isFeatured = variant === 'featured' || project.featured;

  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        'group block overflow-hidden rounded-lg border border-surface-border bg-surface-secondary transition-all duration-300',
        'hover:border-primary/50 hover:shadow-glow-sm hover:-translate-y-1',
        isFeatured && 'md:col-span-2'
      )}
    >
      {/* Card Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3
              className={cn(
                'mb-2 font-bold transition-colors group-hover:text-primary',
                isFeatured ? 'text-2xl' : 'text-xl'
              )}
            >
              {project.title}
            </h3>
            <p className="text-sm text-text-tertiary">{project.tagline}</p>
          </div>

          {/* Status Badge */}
          <Badge variant={getStatusVariant(project.status)} dot>
            {project.status}
          </Badge>
        </div>

        {/* Description */}
        <p
          className={cn(
            'mb-4 text-text-secondary',
            !showFullDescription && 'line-clamp-2',
            isFeatured && 'text-base'
          )}
        >
          {project.description}
        </p>

        {/* Metrics (if available and featured) */}
        {isFeatured && project.metrics && project.metrics.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {project.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="rounded-md bg-surface-tertiary p-3">
                <p className="text-xs text-text-tertiary">{metric.label}</p>
                <p className="text-lg font-bold text-primary">{metric.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Users Count (if available) */}
        {project.users && (
          <div className="mb-4">
            <Badge variant="primary">{project.users.toLocaleString()}+ Users</Badge>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, isFeatured ? 8 : 5).map((tech) => (
            <Badge key={tech} variant="secondary" size="sm">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > (isFeatured ? 8 : 5) && (
            <Badge variant="outline" size="sm">
              +{project.techStack.length - (isFeatured ? 8 : 5)} more
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Timeline */}
          <div className="text-xs text-text-tertiary">
            Started: {project.timeline.started}
            {project.timeline.launched && ` • Launched: ${project.timeline.launched}`}
          </div>

          {/* View Details Arrow */}
          <div className="flex items-center gap-2 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
            View Details
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-green/5" />
      </div>
    </Link>
  );
}

/**
 * Project Card Skeleton
 * Loading state placeholder
 */
export function ProjectCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'featured' }) {
  const isFeatured = variant === 'featured';

  return (
    <div
      className={cn(
        'animate-pulse rounded-lg border border-surface-border bg-surface-secondary p-6',
        isFeatured && 'md:col-span-2'
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className={cn('mb-2 h-6 w-3/4 rounded bg-surface-tertiary', isFeatured && 'h-8')} />
          <div className="h-4 w-1/2 rounded bg-surface-tertiary" />
        </div>
        <div className="h-6 w-16 rounded-full bg-surface-tertiary" />
      </div>

      {/* Description */}
      <div className="mb-4 space-y-2">
        <div className="h-4 w-full rounded bg-surface-tertiary" />
        <div className="h-4 w-5/6 rounded bg-surface-tertiary" />
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-6 w-20 rounded-full bg-surface-tertiary" />
        ))}
      </div>
    </div>
  );
}
