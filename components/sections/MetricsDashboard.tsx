/**
 * Metrics Dashboard Section Component
 * Fun developer statistics and metrics
 */

'use client';

import type { JSX } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRealMetrics, getFunMetrics } from '@/data/personal';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/animations';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

/**
 * Metric Icon Component
 * Returns icon based on metric icon type
 */
function MetricIcon({ icon }: { icon: string }) {
  const icons: Record<string, JSX.Element> = {
    zap: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    code: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    bug: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    check: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    rocket: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    layers: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    ),
    'help-circle': (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    book: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    clock: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'git-branch': (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    moon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    package: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    'alert-circle': (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    music: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    circle: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth={2} />
      </svg>
    ),
    users: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  };

  return icons[icon] || icons.code;
}

/**
 * Metrics Dashboard Section
 *
 * Displays fun statistics and metrics
 * Mix of real and humorous data points
 *
 * Features:
 * - Real metrics highlighted
 * - Trend indicators (up/down)
 * - Icon representation
 * - Responsive grid layout
 * - Playful descriptions
 */
export function MetricsDashboard() {
  const realMetrics = getRealMetrics();
  const funMetrics = getFunMetrics();

  return (
    <section id="metrics" className="container-custom section-spacing">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <ScrollReveal variant={fadeInUp}>
          <div className="mb-12 text-center">
            <Badge variant="primary" className="mb-4">
              Metrics Dashboard
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              By The Numbers
            </h2>
            <p className="text-text-secondary">
              A mostly accurate representation of my developer journey
            </p>
          </div>
        </ScrollReveal>

        {/* Real Metrics Section */}
        <div className="mb-12">
          <ScrollReveal variant={fadeInUp} delay={0.1}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold">Real Impact</h3>
              <Badge variant="success" size="sm">
                Verified Data
              </Badge>
            </div>
          </ScrollReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px', amount: 0.1 }}
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {realMetrics.map((metric) => (
              <motion.div key={metric.id} variants={staggerItem}>
                <Card
                  variant="hover"
                  className="group relative overflow-hidden border-primary/20 transition-all duration-300 hover:border-primary/50 hover:shadow-glow-sm"
                >
                <CardContent className="p-6">
                  {/* Trend Indicator */}
                  {metric.trend && (
                    <div className="absolute right-4 top-4">
                      <div
                        className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full',
                          metric.trend === 'up' ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'
                        )}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={metric.trend === 'up' ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <MetricIcon icon={metric.icon} />
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <p className="text-3xl font-bold text-primary">
                      {metric.value}
                      {metric.unit && <span className="ml-1 text-lg text-text-tertiary">{metric.unit}</span>}
                    </p>
                  </div>

                  {/* Label */}
                  <p className="mb-2 text-sm font-medium text-text-primary">{metric.label}</p>

                  {/* Description */}
                  <p className="text-xs text-text-tertiary">{metric.description}</p>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Fun Metrics Section */}
        <div>
          <ScrollReveal variant={fadeInUp} delay={0.1}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold">Fun Stats</h3>
              <Badge variant="secondary" size="sm">
                Mostly True
              </Badge>
            </div>
          </ScrollReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px', amount: 0.1 }}
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {funMetrics.map((metric) => (
              <motion.div key={metric.id} variants={staggerItem}>
                <Card
                  variant="hover"
                  className="group transition-all duration-300 hover:border-primary/30"
                >
                <CardContent className="p-4">
                  {/* Icon & Value */}
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-tertiary text-primary transition-transform group-hover:scale-110">
                      <MetricIcon icon={metric.icon} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold text-primary">
                        {metric.value}
                        {metric.unit && <span className="ml-1 text-sm text-text-tertiary">{metric.unit}</span>}
                      </p>
                    </div>
                    {metric.trend && (
                      <div className="flex-shrink-0">
                        <div
                          className={cn(
                            'flex h-5 w-5 items-center justify-center rounded-full',
                            metric.trend === 'up' ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'
                          )}
                        >
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={metric.trend === 'up' ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <p className="mb-1 text-sm font-medium text-text-primary">{metric.label}</p>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-text-tertiary">{metric.description}</p>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Disclaimer */}
        <ScrollReveal variant={fadeInUp} delay={0.2}>
          <Card className="mt-12 border-accent-amber/20 bg-accent-amber/5">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-text-secondary">
              <span className="font-medium text-accent-amber">⚠️ Disclaimer:</span> Some metrics are estimated or exaggerated for fun. Real impact metrics are marked as "Verified Data".
            </p>
          </CardContent>
        </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
