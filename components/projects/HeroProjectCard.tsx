/**
 * Hero Project Card Component
 * Large, prominent card for flagship project (CampusConnect)
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { AnimatedButton } from '@/components/ui/animated-button';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

/**
 * Hero Project Card Props
 */
export interface HeroProjectCardProps {
  /**
   * Project data
   */
  project: Project;
}

/**
 * Hero Project Card Component
 *
 * Full-width featured card for the flagship project
 * Shows project preview, key metrics, and call-to-action
 *
 * @example
 * ```tsx
 * <HeroProjectCard project={campusConnect} />
 * ```
 */
export function HeroProjectCard({ project }: HeroProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="group relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-surface-secondary to-surface-secondary p-1"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-primary/20 via-accent-green/20 to-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-xl bg-surface-secondary">
        <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success" dot size="sm">
                {project.status}
              </Badge>
              {project.users && (
                <Badge variant="primary" size="sm" className="gap-1">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {project.users.toLocaleString()}+ Users
                </Badge>
              )}
              <Badge variant="warning" size="sm">
                Flagship Project
              </Badge>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-gradient md:text-4xl lg:text-5xl">
                {project.title}
              </h3>
              <p className="text-lg text-primary md:text-xl">
                {project.tagline}
              </p>
              <p className="text-base leading-relaxed text-text-secondary">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-surface-border bg-surface-tertiary px-3 py-1 text-sm text-text-primary transition-all hover:border-primary/50 hover:bg-surface-border"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 6 && (
                <span className="rounded-full border border-surface-border bg-surface-tertiary px-3 py-1 text-sm text-text-tertiary">
                  +{project.techStack.length - 6} more
                </span>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={`/projects/${project.id}`}>
                <AnimatedButton variant="primary" size="lg" className="group/btn">
                  View Full Case Study
                  <svg
                    className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1"
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
                </AnimatedButton>
              </Link>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <AnimatedButton variant="outline" size="lg" className="group/btn">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Visit Live Site
                  </AnimatedButton>
                </a>
              )}
            </div>
          </div>

          {/* Right Column - Metrics Grid */}
          <div className="flex items-center">
            <div className="grid w-full gap-4 sm:grid-cols-2">
              {project.metrics?.slice(0, 4).map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={cn(
                    'group/metric relative overflow-hidden rounded-xl border border-surface-border p-6 transition-all',
                    'bg-gradient-to-br from-surface-tertiary/50 to-surface-secondary',
                    'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10'
                  )}
                >
                  {/* Background decoration */}
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover/metric:bg-primary/10" />

                  <div className="relative z-10">
                    <p className="mb-2 text-sm font-medium text-text-tertiary">
                      {metric.label}
                    </p>
                    <p className="mb-1 text-3xl font-bold text-gradient">
                      {metric.value}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {metric.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent-green transition-all duration-300 group-hover/metric:w-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom decoration bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-accent-green to-primary opacity-50" />
      </div>
    </motion.div>
  );
}
