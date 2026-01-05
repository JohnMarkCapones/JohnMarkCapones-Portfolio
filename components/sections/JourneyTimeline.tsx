/**
 * Journey Timeline Section Component
 * Professional journey and key milestones in visual timeline with year grouping
 */

'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import type { JSX } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { timelineEvents, timelineStats, getAllYears } from '@/data/timeline';
import type { TimelineEvent } from '@/types';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/animations';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import { TimelineSidebar } from './TimelineSidebar';

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
 * Check if event is a major milestone
 */
function isMajorMilestone(event: TimelineEvent): boolean {
  return event.type === 'milestone' || event.id === 'campus-launch-2025' || event.id === 'graduate-shs-2020';
}

/**
 * Journey Timeline Section
 */
export function JourneyTimeline() {
  const [filter, setFilter] = useState<TimelineEvent['type'] | 'all'>('all');
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const yearRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const filteredEvents = filter === 'all'
    ? timelineEvents
    : timelineEvents.filter((event) => event.type === filter);

  const allYears = useMemo(() => getAllYears(), []);

  // Group events by year
  const eventsByYear = useMemo(() => {
    const grouped = new Map<number, TimelineEvent[]>();
    filteredEvents.forEach((event) => {
      const yearEvents = grouped.get(event.year) || [];
      yearEvents.push(event);
      grouped.set(event.year, yearEvents);
    });
    return Array.from(grouped.entries()).sort(([a], [b]) => a - b);
  }, [filteredEvents]);

  const filterOptions: Array<{ value: TimelineEvent['type'] | 'all'; label: string; count: number }> = [
    { value: 'all', label: 'All Events', count: timelineEvents.length },
    { value: 'milestone', label: 'Milestones', count: timelineStats.milestones },
    { value: 'achievement', label: 'Achievements', count: timelineStats.achievements },
    { value: 'project', label: 'Projects', count: timelineStats.projects },
    { value: 'learning', label: 'Learning', count: timelineStats.learningEvents },
    { value: 'education', label: 'Education', count: timelineStats.educationEvents },
    { value: 'work', label: 'Work', count: timelineEvents.filter(e => e.type === 'work').length },
  ];

  // Handle year click from sidebar - smooth scroll to year
  const handleYearClick = useCallback((year: number) => {
    const element = yearRefs.current.get(year);
    if (element) {
      const offset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  // Track current year with IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const year = parseInt(entry.target.getAttribute('data-year') || '0', 10);
          if (year) {
            setCurrentYear(year);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all year sections
    yearRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [eventsByYear]);

  return (
    <section id="timeline" className="container-custom section-spacing relative">
      {/* Timeline Sidebar Navigator */}
      <TimelineSidebar
        years={allYears}
        currentYear={currentYear}
        onYearClick={handleYearClick}
      />

      <div className="mx-auto max-w-4xl xl:max-w-5xl">
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

        {/* Enhanced Stats Dashboard */}
        <ScrollReveal variant={fadeInUp} delay={0.1}>
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative overflow-hidden rounded-xl border border-surface-border bg-gradient-to-br from-primary/5 to-primary/10 p-6 transition-all hover:border-primary/50"
            >
              <div className="relative z-10">
                <p className="text-3xl font-bold text-primary">{timelineStats.totalEvents}</p>
                <p className="mt-1 text-sm text-text-tertiary">Total Events</p>
              </div>
              <div className="absolute -right-4 -top-4 text-6xl opacity-10">📅</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative overflow-hidden rounded-xl border border-surface-border bg-gradient-to-br from-accent-green/5 to-accent-green/10 p-6 transition-all hover:border-accent-green/50"
            >
              <div className="relative z-10">
                <p className="text-3xl font-bold text-accent-green">{timelineStats.milestones}</p>
                <p className="mt-1 text-sm text-text-tertiary">Major Milestones</p>
              </div>
              <div className="absolute -right-4 -top-4 text-6xl opacity-10">🏆</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative overflow-hidden rounded-xl border border-surface-border bg-gradient-to-br from-accent-amber/5 to-accent-amber/10 p-6 transition-all hover:border-accent-amber/50"
            >
              <div className="relative z-10">
                <p className="text-3xl font-bold text-accent-amber">{timelineStats.projects}</p>
                <p className="mt-1 text-sm text-text-tertiary">Projects Built</p>
              </div>
              <div className="absolute -right-4 -top-4 text-6xl opacity-10">🚀</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative overflow-hidden rounded-xl border border-surface-border bg-gradient-to-br from-accent-blue/5 to-accent-blue/10 p-6 transition-all hover:border-accent-blue/50"
            >
              <div className="relative z-10">
                <p className="text-3xl font-bold text-accent-blue">{timelineStats.learningEvents}</p>
                <p className="mt-1 text-sm text-text-tertiary">Skills Learned</p>
              </div>
              <div className="absolute -right-4 -top-4 text-6xl opacity-10">📚</div>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Filter Buttons */}
        <ScrollReveal variant={fadeInUp} delay={0.15}>
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={cn(
                    'group relative overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-all',
                    filter === option.value
                      ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20'
                      : 'border-surface-border bg-surface-secondary text-text-secondary hover:border-primary/50 hover:text-text-primary'
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {option.label}
                    <span className={cn(
                      'rounded-full px-1.5 py-0.5 text-xs',
                      filter === option.value
                        ? 'bg-primary/20 text-primary'
                        : 'bg-surface-tertiary text-text-tertiary'
                    )}>
                      {option.count}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline with Year Grouping */}
        <div className="relative">
          {/* Animated Vertical Line */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-1/2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Events Grouped by Year */}
          <div className="space-y-16">
            {eventsByYear.map(([year, events]) => (
              <div
                key={year}
                className="relative"
                ref={(el) => {
                  if (el) {
                    yearRefs.current.set(year, el);
                  } else {
                    yearRefs.current.delete(year);
                  }
                }}
                data-year={year}
              >
                {/* Year Header */}
                <ScrollReveal variant={fadeInUp}>
                  <div className="relative mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-surface-border" />
                    </div>
                    <div className="relative z-10 rounded-full border-2 border-primary/30 bg-surface-primary px-6 py-2 shadow-lg">
                      <h3 className="text-2xl font-bold text-gradient">{year}</h3>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Events for this year */}
                <div className="space-y-8">
                  {events.map((event, index) => {
                    const isEven = index % 2 === 0;
                    const isMajor = isMajorMilestone(event);
                    const isLast = index === events.length - 1 && year === eventsByYear[eventsByYear.length - 1]?.[0];

                    return (
                      <ScrollReveal
                        key={event.id}
                        variant={isEven ? fadeInLeft : fadeInRight}
                        delay={0.1}
                      >
                        <div
                          className={cn(
                            'relative flex items-center gap-8',
                            isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                          )}
                        >
                          {/* Timeline Dot */}
                          <div className="absolute left-8 flex items-center justify-center md:left-1/2 md:-ml-2">
                            <motion.div
                              whileHover={{ scale: 1.3 }}
                              className={cn(
                                'rounded-full border-4 border-surface-primary shadow-lg transition-all',
                                isMajor ? 'h-6 w-6' : 'h-4 w-4',
                                event.type === 'milestone' && 'bg-primary shadow-primary/50',
                                event.type === 'achievement' && 'bg-accent-green shadow-accent-green/50',
                                event.type === 'project' && 'bg-accent-amber shadow-accent-amber/50',
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
                          <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            className={cn(
                              'ml-20 flex-1 md:ml-0',
                              isMajor && 'md:scale-105'
                            )}
                          >
                            <Card
                              variant="hover"
                              className={cn(
                                'transition-all duration-300',
                                isMajor
                                  ? 'border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10 shadow-glow-md'
                                  : 'hover:border-primary/30 hover:shadow-glow-sm',
                                isEven ? 'md:text-right' : 'md:text-left'
                              )}
                            >
                              <CardContent className={cn('p-6', isMajor && 'p-8')}>
                                {/* Year & Month with Type Badge */}
                                <div className={cn('mb-3 flex items-center gap-2', isEven ? 'md:justify-end' : 'md:justify-start')}>
                                  <Badge variant="secondary" size="sm">
                                    {event.month ? `${event.year}-${String(event.month).padStart(2, '0')}` : event.year}
                                  </Badge>
                                  <Badge variant={getEventBadgeVariant(event.type)} size="sm">
                                    {event.type}
                                  </Badge>
                                  {isMajor && (
                                    <Badge variant="primary" size="sm" className="gap-1">
                                      ⭐ Major
                                    </Badge>
                                  )}
                                </div>

                                {/* Title with Icon */}
                                <div className={cn('mb-4 flex items-start gap-3', isEven ? 'md:flex-row-reverse' : 'md:flex-row')}>
                                  <div
                                    className={cn(
                                      'flex flex-shrink-0 items-center justify-center rounded-lg transition-all',
                                      isMajor ? 'h-12 w-12' : 'h-10 w-10',
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
                                  <h3 className={cn(
                                    'flex-1 font-bold text-text-primary',
                                    isMajor ? 'text-xl md:text-2xl' : 'text-lg'
                                  )}>
                                    {event.title}
                                  </h3>
                                </div>

                                {/* Description */}
                                <p className={cn(
                                  'mb-4 leading-relaxed text-text-secondary',
                                  isMajor ? 'text-base' : 'text-sm'
                                )}>
                                  {event.description}
                                </p>

                                {/* Tags */}
                                {event.tags && event.tags.length > 0 && (
                                  <div className={cn('flex flex-wrap gap-1.5', isEven ? 'md:justify-end' : 'md:justify-start')}>
                                    {event.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="rounded-full bg-surface-tertiary px-2.5 py-1 text-xs text-text-tertiary transition-colors hover:bg-surface-border hover:text-text-secondary"
                                      >
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Status Indicator */}
        <ScrollReveal variant={fadeInUp} delay={0.2}>
          <div className="mt-16 text-center">
            <Card className="inline-block border-accent-green/30 bg-gradient-to-br from-accent-green/5 to-accent-green/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-accent-green" />
                    <div className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-accent-green opacity-75" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-text-primary">Currently Active</p>
                    <p className="text-sm text-text-secondary">
                      4th Year BSIT Student | Mastering Kubernetes & AWS
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
