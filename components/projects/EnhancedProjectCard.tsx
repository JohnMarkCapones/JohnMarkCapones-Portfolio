/**
 * Enhanced Project Card Component
 * Improved project card with better visual hierarchy and hover effects
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

/**
 * Enhanced Project Card Props
 */
export interface EnhancedProjectCardProps {
  /**
   * Project data
   */
  project: Project;

  /**
   * Card index for stagger animation
   */
  index?: number;
}

/**
 * Enhanced Project Card Component
 *
 * Modern project card with:
 * - Hover lift and scale effect
 * - Gradient borders on hover
 * - Project metrics display
 * - Tech stack badges
 * - Status indicators
 *
 * @example
 * ```tsx
 * <EnhancedProjectCard project={project} index={0} />
 * ```
 */
export function EnhancedProjectCard({ project, index = 0 }: EnhancedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.id}`}>
        <motion.div
          whileHover={{ scale: 1.03, y: -8 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="group relative h-full"
        >
          {/* Gradient border effect */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 transition-all duration-500 group-hover:from-primary/50 group-hover:via-accent-green/30 group-hover:to-primary/50 group-hover:opacity-100" />

          <Card className="relative h-full overflow-hidden border-surface-border bg-surface-secondary transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl group-hover:shadow-primary/10">
            <CardContent className="flex h-full flex-col p-6">
              {/* Header - Status & Category */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={project.status === 'live' ? 'success' : 'secondary'}
                    dot={project.status === 'live'}
                    size="sm"
                  >
                    {project.status}
                  </Badge>
                  {project.users && (
                    <Badge variant="primary" size="sm">
                      {project.users >= 1000
                        ? `${(project.users / 1000).toFixed(1)}K+`
                        : `${project.users}+`}{' '}
                      users
                    </Badge>
                  )}
                </div>

                {/* Icon based on category */}
                <div className="rounded-lg bg-surface-tertiary p-2 transition-colors group-hover:bg-primary/10">
                  {project.category === 'web-app' && (
                    <svg className="h-5 w-5 text-text-secondary transition-colors group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  )}
                  {project.category === 'desktop-app' && (
                    <svg className="h-5 w-5 text-text-secondary transition-colors group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {project.category === 'api' && (
                    <svg className="h-5 w-5 text-text-secondary transition-colors group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div className="mb-6 flex-grow">
                <h3 className="mb-2 text-2xl font-bold text-text-primary transition-colors group-hover:text-gradient">
                  {project.title}
                </h3>
                <p className="mb-2 text-sm font-medium text-primary">
                  {project.tagline}
                </p>
                <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mt-auto">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-surface-tertiary px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-surface-border hover:text-text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="rounded-md bg-surface-tertiary px-2 py-1 text-xs text-text-tertiary">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* View Project Link */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-all group-hover:opacity-100">
                  <span>View Details</span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>

              {/* Hover gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent-green/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/5 group-hover:via-transparent group-hover:to-accent-green/5 group-hover:opacity-100" />
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
}
