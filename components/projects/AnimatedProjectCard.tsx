/**
 * Animated Project Card Component
 * Project card with smooth hover animations
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';

/**
 * Animated Project Card Props
 */
export interface AnimatedProjectCardProps {
  /**
   * Project data
   */
  project: Project;

  /**
   * Card variant
   */
  variant?: 'default' | 'featured';
}

/**
 * Animated Project Card Component
 *
 * Project card with smooth hover animations
 *
 * Features:
 * - Hover scale and lift effect
 * - Smooth shadow transition
 * - Title color change on hover
 * - Maintains clickable link functionality
 *
 * @example
 * ```tsx
 * <AnimatedProjectCard project={projectData} variant="featured" />
 * ```
 */
export function AnimatedProjectCard({ project, variant = 'default' }: AnimatedProjectCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        whileHover={{
          scale: 1.02,
          y: -4,
          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 },
        }}
      >
        <Card variant="hover" className="group h-full cursor-pointer">
          <CardHeader>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge
                variant={project.status === 'live' ? 'success' : 'secondary'}
                dot={project.status === 'live'}
              >
                {project.status}
              </Badge>
              {isFeatured && project.users && (
                <Badge variant="primary">{project.users.toLocaleString()}+ Users</Badge>
              )}
            </div>
            <CardTitle className="group-hover:text-primary">{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-2">
              {project.techStack.slice(0, isFeatured ? 8 : 5).map((tech) => (
                <Badge key={tech} variant="secondary" size="sm">
                  {tech}
                </Badge>
              ))}
              {!isFeatured && project.techStack.length > 5 && (
                <Badge variant="outline" size="sm">
                  +{project.techStack.length - 5}
                </Badge>
              )}
            </div>

            {isFeatured && project.metrics && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {project.metrics.slice(0, 3).map((metric) => (
                  <div key={metric.label} className="rounded-md bg-surface-tertiary p-3">
                    <p className="text-xs text-text-tertiary">{metric.label}</p>
                    <p className="text-lg font-bold text-primary">{metric.value}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
