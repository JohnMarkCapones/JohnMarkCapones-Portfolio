/**
 * Stats Page
 * Development metrics and statistics dashboard
 */

'use client';

import { motion } from 'framer-motion';

const stats = [
  {
    label: 'Projects Completed',
    value: '15+',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    color: 'from-primary/20 to-accent-green/20',
    glow: 'shadow-primary/20',
  },
  {
    label: 'Technologies Used',
    value: '25+',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    color: 'from-accent-green/20 to-accent-purple/20',
    glow: 'shadow-accent-green/20',
  },
  {
    label: 'GitHub Repositories',
    value: '30+',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: 'from-accent-purple/20 to-primary/20',
    glow: 'shadow-accent-purple/20',
  },
  {
    label: 'Years of Experience',
    value: '3+',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: 'from-accent-yellow/20 to-primary/20',
    glow: 'shadow-accent-yellow/20',
  },
];

const skills = [
  { name: 'React/Next.js', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Laravel/PHP', level: 88 },
  { name: 'Docker/K8s', level: 80 },
  { name: 'AWS/Cloud', level: 75 },
  { name: 'Database Design', level: 85 },
];

export default function StatsPage() {
  return (
    <main className="container-custom py-20 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="font-heading text-5xl font-bold text-text-primary md:text-6xl lg:text-7xl">
            Statistics
          </h1>
          <p className="mt-6 text-xl text-text-secondary">
            A glimpse into my development journey
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-surface-border bg-surface-secondary/50 p-8 backdrop-blur-sm transition-all"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity group-hover:opacity-100`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent-green/20 text-primary">
                  {stat.icon}
                </div>
                <div className="mb-2 font-heading text-4xl font-bold text-text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>

              {/* Glow effect on hover */}
              <div className={`absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 blur-xl transition-opacity group-hover:opacity-100`} />
            </motion.div>
          ))}
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border border-surface-border bg-surface-secondary/50 p-8 backdrop-blur-sm lg:p-12"
        >
          <h2 className="mb-8 font-heading text-3xl font-bold text-text-primary">
            Top Skills
          </h2>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={skill.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-text-primary">{skill.name}</span>
                  <span className="text-sm text-text-tertiary">{skill.level}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-surface-tertiary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent-green"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
