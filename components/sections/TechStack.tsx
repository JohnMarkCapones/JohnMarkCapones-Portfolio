/**
 * Tech Stack Bento Grid Component
 * Interactive technology showcase with 3D hover effects
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { techStack, techStats } from '@/data/techstack';
import type { TechItem } from '@/data/techstack';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/animations';
import { fadeInUp } from '@/lib/animations';

/**
 * Tech Icon Component using simple-icons
 */
function TechIcon({ icon, color, name }: { icon: string; color: string; name: string }) {
  // Using simple-icons CDN for tech logos
  const iconUrl = `https://cdn.simpleicons.org/${icon}/${color.replace('#', '')}`;

  return (
    <div className="relative h-12 w-12">
      <img
        src={iconUrl}
        alt={`${name} logo`}
        className="h-full w-full object-contain"
        onError={(e) => {
          // Fallback to text if icon fails to load
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = `<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-xl font-bold text-primary">${name.charAt(0)}</div>`;
        }}
      />
    </div>
  );
}

/**
 * Tech Detail Modal
 */
function TechModal({ tech, onClose }: { tech: TechItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-surface-border bg-surface-primary p-8 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-text-tertiary transition-colors hover:bg-surface-border hover:text-text-primary"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6 flex items-start gap-4">
          <div className="rounded-xl bg-surface-secondary p-4">
            <TechIcon icon={tech.icon} color={tech.color} name={tech.name} />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-2xl font-bold text-text-primary">{tech.name}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{tech.yearsOfExperience}</Badge>
              <Badge variant="secondary">{tech.category}</Badge>
              {tech.status && (
                <Badge
                  variant={
                    tech.status === 'expert'
                      ? 'primary'
                      : tech.status === 'favorite'
                      ? 'success'
                      : 'warning'
                  }
                >
                  {tech.status === 'expert' && '⭐ Expert'}
                  {tech.status === 'favorite' && '❤️ Favorite'}
                  {tech.status === 'learning' && '🔥 Learning'}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Proficiency Bar */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-text-secondary">Proficiency</span>
            <span className="font-bold text-primary">{tech.proficiency}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-surface-border">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${tech.proficiency}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent-green"
            />
          </div>
        </div>

        {/* Personality */}
        {tech.personality && (
          <div className="mb-6 rounded-xl bg-primary/5 p-4 border border-primary/20">
            <p className="text-center italic text-text-secondary">&quot;{tech.personality}&quot;</p>
          </div>
        )}

        {/* Capabilities */}
        <div className="mb-6">
          <h4 className="mb-3 font-semibold text-text-primary">What I Can Build:</h4>
          <div className="grid gap-2">
            {tech.capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-text-secondary">{capability}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Favorite Feature */}
        {tech.favoriteFeature && (
          <div className="mb-6 rounded-xl border border-accent-amber/30 bg-accent-amber/5 p-4">
            <h4 className="mb-2 flex items-center gap-2 font-semibold text-accent-amber">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              Favorite Feature
            </h4>
            <p className="text-sm text-text-secondary">{tech.favoriteFeature}</p>
          </div>
        )}

        {/* Used In */}
        {tech.usedIn && tech.usedIn.length > 0 && (
          <div className="mb-6">
            <h4 className="mb-3 font-semibold text-text-primary">Used In:</h4>
            <div className="flex flex-wrap gap-2">
              {tech.usedIn.map((project) => (
                <span
                  key={project}
                  className="rounded-full bg-surface-secondary px-3 py-1 text-sm text-text-secondary"
                >
                  {project}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Achievement */}
        {tech.achievement && (
          <div className="rounded-xl border border-accent-green/30 bg-accent-green/5 p-4">
            <h4 className="mb-2 flex items-center gap-2 font-semibold text-accent-green">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Key Achievement
            </h4>
            <p className="text-sm text-text-secondary">{tech.achievement}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * Tech Card Component with 3D hover effect
 */
function TechCard({ tech }: { tech: TechItem }) {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5, z: 50 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedTech(tech)}
        className={cn(
          'group relative cursor-pointer overflow-hidden rounded-2xl border border-surface-border bg-gradient-to-br from-surface-secondary to-surface-tertiary p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-glow-md',
          tech.size === 'large' && 'p-8 md:col-span-2 md:row-span-2',
          tech.size === 'medium' && 'md:col-span-2',
          tech.status === 'favorite' && 'border-accent-green/30'
        )}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Gradient Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${tech.color}10, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon and Name */}
          <div className={cn('mb-4 flex items-center gap-4', tech.size === 'large' && 'mb-6')}>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={cn(
                'rounded-xl p-3',
                tech.size === 'large' && 'p-4'
              )}
              style={{ backgroundColor: `${tech.color}15` }}
            >
              <TechIcon icon={tech.icon} color={tech.color} name={tech.name} />
            </motion.div>
            <div className="flex-1">
              <h3
                className={cn(
                  'font-bold text-text-primary',
                  tech.size === 'large' && 'text-2xl',
                  tech.size === 'medium' && 'text-xl',
                  tech.size === 'small' && 'text-lg'
                )}
              >
                {tech.name}
              </h3>
              {tech.size !== 'small' && (
                <p className="text-sm text-text-tertiary">{tech.yearsOfExperience}</p>
              )}
            </div>
          </div>

          {/* Large Card Content */}
          {tech.size === 'large' && (
            <>
              {tech.status && (
                <Badge
                  variant={
                    tech.status === 'expert'
                      ? 'primary'
                      : tech.status === 'favorite'
                      ? 'success'
                      : 'warning'
                  }
                  className="mb-4"
                >
                  {tech.status === 'expert' && '⭐ Expert'}
                  {tech.status === 'favorite' && '❤️ Favorite'}
                  {tech.status === 'learning' && '🔥 Current Focus'}
                </Badge>
              )}
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">{tech.personality}</p>

              {/* Proficiency Bar */}
              <div className="mb-2">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-text-tertiary">Proficiency</span>
                  <span className="font-bold" style={{ color: tech.color }}>{tech.proficiency}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-border">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${tech.proficiency}%`,
                      backgroundColor: tech.color,
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Medium Card Content */}
          {tech.size === 'medium' && (
            <>
              <p className="mb-3 line-clamp-2 text-sm text-text-secondary">{tech.personality}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-tertiary">Click to learn more</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
                  <span className="text-xs font-bold text-text-secondary">{tech.proficiency}%</span>
                </div>
              </div>
            </>
          )}

          {/* Small Card - Minimal */}
          {tech.size === 'small' && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-tertiary">{tech.yearsOfExperience}</span>
            </div>
          )}
        </div>

        {/* Click Indicator */}
        <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
          <svg className="h-5 w-5 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTech && <TechModal tech={selectedTech} onClose={() => setSelectedTech(null)} />}
      </AnimatePresence>
    </>
  );
}

/**
 * Main Tech Stack Section
 */
export function TechStack() {
  return (
    <section className="section-spacing">
      <div className="container-custom">
        {/* Header */}
        <ScrollReveal variant={fadeInUp}>
          <div className="mb-12 text-center">
            <Badge variant="primary" className="mb-4">
              Technologies & Tools
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              My Tech Arsenal
            </h2>
            <p className="mx-auto max-w-2xl text-text-secondary">
              Click on any technology to explore my capabilities, achievements, and what makes each tool special
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal variant={fadeInUp} delay={0.1}>
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <div className="rounded-lg border border-surface-border bg-surface-secondary/50 px-6 py-3">
              <span className="text-2xl font-bold text-primary">{techStats.totalTechnologies}</span>
              <span className="ml-2 text-sm text-text-tertiary">Technologies</span>
            </div>
            <div className="rounded-lg border border-surface-border bg-surface-secondary/50 px-6 py-3">
              <span className="text-2xl font-bold text-accent-green">{techStats.expertLevel}</span>
              <span className="ml-2 text-sm text-text-tertiary">Expert Level</span>
            </div>
            <div className="rounded-lg border border-surface-border bg-surface-secondary/50 px-6 py-3">
              <span className="text-2xl font-bold text-accent-amber">{techStats.averageProficiency}%</span>
              <span className="ml-2 text-sm text-text-tertiary">Avg Proficiency</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <ScrollReveal variant={fadeInUp} delay={0.2}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {techStack.map((tech) => (
              <TechCard key={tech.id} tech={tech} />
            ))}
          </div>
        </ScrollReveal>

        {/* Footer Note */}
        <ScrollReveal variant={fadeInUp} delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-sm text-text-tertiary">
              💡 Always learning and exploring new technologies
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
