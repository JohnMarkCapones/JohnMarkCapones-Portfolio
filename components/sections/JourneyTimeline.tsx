/**
 * Journey Timeline Section Component
 * Professional journey and key milestones in visual timeline
 */

'use client';

import { useState } from 'react';
import type { JSX } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { timelineEvents, timelineStats } from '@/data/timeline';
import type { TimelineEvent } from '@/types';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/animations';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/lib/animations';

/**
 * Timeline Event Icon Component
 */
function TimelineIcon({ event }: { event: TimelineEvent }) {
  const icons: Record<TimelineEvent['type'], JSX.Element> = {
    learning: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    achievement: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    project: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    milestone: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    education: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    work: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  return icons[event.type] || icons.learning;
}

/**
 * Get badge variant based on event type
 */
function getEventBadgeVariant(type: TimelineEvent['type']): 'primary' | 'success' | 'warning' | 'secondary' {
  const variants: Record<TimelineEvent['type'], 'primary' | 'success' | 'warning' | 'secondary'> = {
    milestone: 'primary',
    achievement: 'success',
    project: 'warning',
    learning: 'secondary',
    education: 'primary',
    work: 'success',
  };
  return variants[type];
}

/**
 * Journey Timeline Section
 *
 * Visual timeline of professional journey
 * Chronological display from 2018 to present
 *
 * Features:
 * - Filter by event type
 * - Vertical timeline with connecting lines
 * - Event type indicators
 * - Year markers
 * - Responsive design
 */
export function JourneyTimeline() {
  const [filter, setFilter] = useState<TimelineEvent['type'] | 'all'>('all');

  const filteredEvents = filter === 'all'
    ? timelineEvents
    : timelineEvents.filter((event) => event.type === filter);

  const filterOptions: Array<{ value: TimelineEvent['type'] | 'all'; label: string }> = [
    { value: 'all', label: 'All Events' },
    { value: 'milestone', label: 'Milestones' },
    { value: 'achievement', label: 'Achievements' },
    { value: 'project', label: 'Projects' },
    { value: 'learning', label: 'Learning' },
    { value: 'education', label: 'Education' },
    { value: 'work', label: 'Work' },
  ];

  return (
    <section id="timeline" className="container-custom section-spacing">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <ScrollReveal variant={fadeInUp}>
          <div className="mb-12 text-center">
            <Badge variant="primary" className="mb-4">
              Timeline
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              My Journey
            </h2>
            <p className="text-text-secondary">
              {timelineStats.yearsOfExperience} years of learning, building, and growing
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Summary */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px', amount: 0.3 }}
          variants={staggerContainer}
          className="mb-12 grid gap-4 sm:grid-cols-2 md:grid-cols-4"
        >
          <motion.div variants={staggerItem}>
            <Card variant="hover">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">{timelineStats.totalEvents}</p>
                <p className="text-sm text-text-tertiary">Total Events</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={staggerItem}>
            <Card variant="hover">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-accent-green">{timelineStats.milestones}</p>
                <p className="text-sm text-text-tertiary">Milestones</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={staggerItem}>
            <Card variant="hover">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-accent-amber">{timelineStats.projects}</p>
                <p className="text-sm text-text-tertiary">Projects</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={staggerItem}>
            <Card variant="hover">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-accent-blue">{timelineStats.learningEvents}</p>
                <p className="text-sm text-text-tertiary">Skills Learned</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Filter Buttons */}
        <ScrollReveal variant={fadeInUp} delay={0.1}>
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {filterOptions.map((option) => (
                <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                  filter === option.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-surface-border bg-surface-secondary text-text-secondary hover:border-primary/50 hover:text-text-primary'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-1/2" />

          {/* Events */}
          <div className="space-y-8">
            {filteredEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              const isLast = index === filteredEvents.length - 1;

              return (
                <ScrollReveal
                  key={event.id}
                  variant={isEven ? fadeInLeft : fadeInRight}
                  delay={0.05}
                >
                  <div
                    className={cn(
                      'relative flex items-center gap-8',
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    )}
                  >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 flex h-4 w-4 items-center justify-center md:left-1/2 md:-ml-2">
                    <div
                      className={cn(
                        'h-4 w-4 rounded-full border-4 border-surface-primary shadow-lg transition-all',
                        event.type === 'milestone' && 'bg-primary',
                        event.type === 'achievement' && 'bg-accent-green',
                        event.type === 'project' && 'bg-accent-amber',
                        event.type === 'learning' && 'bg-accent-blue',
                        event.type === 'education' && 'bg-primary',
                        event.type === 'work' && 'bg-accent-green',
                        isLast && 'animate-pulse'
                      )}
                    />
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden flex-1 md:block" />

                  {/* Event Card */}
                  <Card
                    variant="hover"
                    className={cn(
                      'ml-20 flex-1 transition-all duration-300 hover:border-primary/50 hover:shadow-glow-sm md:ml-0',
                      isEven ? 'md:text-right' : 'md:text-left'
                    )}
                  >
                    <CardContent className="p-6">
                      {/* Year & Month */}
                      <div className={cn('mb-2 flex items-center gap-2', isEven ? 'md:justify-end' : 'md:justify-start')}>
                        <Badge variant="secondary" size="sm">
                          {event.month ? `${event.year}-${String(event.month).padStart(2, '0')}` : event.year}
                        </Badge>
                        <Badge variant={getEventBadgeVariant(event.type)} size="sm">
                          {event.type}
                        </Badge>
                      </div>

                      {/* Title */}
                      <div className={cn('mb-3 flex items-start gap-3', isEven ? 'md:flex-row-reverse' : 'md:flex-row')}>
                        <div
                          className={cn(
                            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
                            event.type === 'milestone' && 'bg-primary/10 text-primary',
                            event.type === 'achievement' && 'bg-accent-green/10 text-accent-green',
                            event.type === 'project' && 'bg-accent-amber/10 text-accent-amber',
                            event.type === 'learning' && 'bg-accent-blue/10 text-accent-blue',
                            event.type === 'education' && 'bg-primary/10 text-primary',
                            event.type === 'work' && 'bg-accent-green/10 text-accent-green'
                          )}
                        >
                          <TimelineIcon event={event} />
                        </div>
                        <h3 className="flex-1 text-lg font-bold text-text-primary">{event.title}</h3>
                      </div>

                      {/* Description */}
                      <p className="mb-3 text-sm leading-relaxed text-text-secondary">{event.description}</p>

                      {/* Tags */}
                      {event.tags && event.tags.length > 0 && (
                        <div className={cn('flex flex-wrap gap-1', isEven ? 'md:justify-end' : 'md:justify-start')}>
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-surface-tertiary px-2 py-0.5 text-xs text-text-tertiary"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Current Status Indicator */}
        <ScrollReveal variant={fadeInUp} delay={0.2}>
          <div className="mt-12 text-center">
            <Card glass className="inline-block">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-accent-green" />
                  <p className="font-medium">
                    Currently: 4th Year BSIT Student | Learning Kubernetes & AWS
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
