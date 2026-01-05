/**
 * Project Tech Stack - Asymmetric Bento Grid
 * Dynamic layout mixing horizontal, vertical, and square tech cards
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TechUsage {
  name: string;
  icon: string; // simple-icons slug
  color: string;
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'cloud' | 'mobile' | 'desktop';
  layout: 'horizontal' | 'vertical' | 'square'; // Card shape
  usage: string; // How you used it in THIS project
  features: string[]; // Specific features built with this tech
  highlight?: string; // Key achievement with this tech
}

interface ProjectTechStackProps {
  techStack: string[];
  projectTitle: string;
}

/**
 * Tech Icon Component
 */
function TechIcon({ icon, color, size = 'md' }: { icon: string; color: string; size?: 'sm' | 'md' | 'lg' }) {
  const iconUrl = `https://cdn.simpleicons.org/${icon}/${color.replace('#', '')}`;

  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className={cn('relative', sizes[size])}>
      <img
        src={iconUrl}
        alt={`${icon} logo`}
        className="h-full w-full object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = `<div class="flex ${sizes[size]} items-center justify-center rounded-lg bg-primary/10 text-2xl font-bold text-primary">${icon.charAt(0).toUpperCase()}</div>`;
        }}
      />
    </div>
  );
}

/**
 * Tech Detail Modal
 */
function TechModal({ tech, onClose, projectTitle }: { tech: TechUsage; onClose: () => void; projectTitle: string }) {
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
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-surface-border bg-surface-primary p-8 shadow-2xl"
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
          <div className="rounded-xl p-4" style={{ backgroundColor: `${tech.color}15` }}>
            <TechIcon icon={tech.icon} color={tech.color} size="lg" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-2xl font-bold text-text-primary">{tech.name}</h3>
            <p className="text-sm text-text-tertiary">Used in {projectTitle}</p>
            <Badge variant="secondary" className="mt-2">
              {tech.category}
            </Badge>
          </div>
        </div>

        {/* Usage Description */}
        <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm leading-relaxed text-text-secondary">{tech.usage}</p>
        </div>

        {/* Features Built */}
        <div className="mb-6">
          <h4 className="mb-3 font-semibold text-text-primary">What I Built With {tech.name}:</h4>
          <div className="space-y-2">
            {tech.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3"
              >
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-text-secondary">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Highlight Achievement */}
        {tech.highlight && (
          <div className="rounded-xl border border-accent-green/30 bg-accent-green/5 p-4">
            <h4 className="mb-2 flex items-center gap-2 font-semibold text-accent-green">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Key Achievement
            </h4>
            <p className="text-sm text-text-secondary">{tech.highlight}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * Get project-specific tech usage data
 */
function getTechUsageData(projectTitle: string): TechUsage[] {
  // CampusConnect tech stack
  if (projectTitle === 'CampusConnect') {
    return [
      {
        name: 'Next.js',
        icon: 'nextdotjs',
        color: '#000000',
        category: 'frontend',
        layout: 'horizontal',
        usage: 'Built the entire frontend with Next.js App Router, leveraging Server-Side Rendering for SEO optimization and improved performance.',
        features: [
          'App Router with nested layouts for modular page structure',
          'Server components for faster initial page loads',
          'API routes for backend integration',
          'Image optimization with next/image',
          'Middleware for authentication and authorization',
        ],
        highlight: 'Achieved 90+ Lighthouse score with SSR and optimizations',
      },
      {
        name: 'NestJS',
        icon: 'nestjs',
        color: '#E0234E',
        category: 'backend',
        layout: 'vertical',
        usage: 'Architected robust REST API backend handling 3,000+ concurrent users with comprehensive authentication, real-time features, and database operations.',
        features: [
          'RESTful API endpoints with full CRUD operations',
          'JWT-based authentication with role-based access control',
          'WebSocket gateway for real-time notifications',
          'Database integration with TypeORM and PostgreSQL',
          'File upload handling with validation',
        ],
        highlight: 'Handles 3,000+ concurrent users with sub-300ms API response times',
      },
      {
        name: 'PostgreSQL',
        icon: 'postgresql',
        color: '#4169E1',
        category: 'database',
        layout: 'square',
        usage: 'Designed comprehensive database schema with Row Level Security, complex relationships, and optimized queries for academic data management.',
        features: [
          'Complex schema with 50+ tables and relationships',
          'Row Level Security (RLS) for data isolation',
          'Indexed queries achieving sub-100ms response times',
          'Stored procedures for complex business logic',
          'Database migrations with version control',
        ],
        highlight: 'Optimized complex queries to under 100ms with proper indexing',
      },
      {
        name: 'Docker',
        icon: 'docker',
        color: '#2496ED',
        category: 'devops',
        layout: 'horizontal',
        usage: 'Containerized entire application stack with Docker Compose for consistent development and production environments.',
        features: [
          'Multi-container setup (frontend, backend, database)',
          'Docker Compose for local development',
          'Production-ready Dockerfiles with multi-stage builds',
          'Volume management for persistent data',
          'Environment-based configuration',
        ],
        highlight: 'Reduced deployment time from 45 minutes to 3 minutes',
      },
      {
        name: 'TypeScript',
        icon: 'typescript',
        color: '#3178C6',
        category: 'frontend',
        layout: 'square',
        usage: 'Used TypeScript across entire codebase for type safety, better IDE support, and reduced runtime errors.',
        features: [
          'Type-safe codebase with strict checking',
          'Custom type definitions for API contracts',
          'Interfaces for database models',
          'Generic types for reusable components',
        ],
      },
      {
        name: 'Supabase',
        icon: 'supabase',
        color: '#3FCF8E',
        category: 'backend',
        layout: 'square',
        usage: 'Leveraged Supabase for authentication, real-time subscriptions, and PostgreSQL database hosting.',
        features: [
          'Auth system with social providers',
          'Real-time data subscriptions',
          'PostgreSQL database hosting',
          'Storage for file uploads',
        ],
      },
      {
        name: 'TailwindCSS',
        icon: 'tailwindcss',
        color: '#06B6D4',
        category: 'frontend',
        layout: 'vertical',
        usage: 'Built entire design system with TailwindCSS utility classes, creating responsive and accessible UI components.',
        features: [
          'Custom design system with theme configuration',
          'Responsive design for all screen sizes',
          'Dark mode support',
          'Component library with reusable patterns',
          'Custom animations and transitions',
        ],
        highlight: 'Custom design system powering 100+ responsive components',
      },
      {
        name: 'React Native',
        icon: 'react',
        color: '#61DAFB',
        category: 'mobile',
        layout: 'square',
        usage: 'Developed cross-platform mobile app for iOS and Android with shared codebase.',
        features: [
          'Cross-platform iOS & Android app',
          'Offline-first architecture',
          'Push notifications',
          'Native device features integration',
        ],
      },
      {
        name: 'Cloudflare',
        icon: 'cloudflare',
        color: '#F38020',
        category: 'cloud',
        layout: 'square',
        usage: 'Leveraged Cloudflare for CDN, DDoS protection, and global content delivery.',
        features: [
          'CDN for fast global content delivery',
          'DDoS protection and security',
          'R2 object storage for media files',
          'DNS management',
        ],
      },
      {
        name: 'Render',
        icon: 'render',
        color: '#46E3B7',
        category: 'devops',
        layout: 'square',
        usage: 'Deployed production application on Render with automated deployments and scaling.',
        features: [
          'Automated deployments from GitHub',
          'Auto-scaling based on traffic',
          'Built-in SSL certificates',
          'Zero-downtime deployments',
        ],
      },
      {
        name: 'C# (Avalonia)',
        icon: 'csharp',
        color: '#239120',
        category: 'desktop',
        layout: 'horizontal',
        usage: 'Built cross-platform desktop application using C# and Avalonia UI framework for administrative tasks and offline functionality.',
        features: [
          'Cross-platform desktop app (Windows, macOS, Linux)',
          'Native desktop performance with Avalonia UI',
          'Offline-first architecture with local data sync',
          'Administrative tools and bulk operations',
          'Direct database access for advanced queries',
        ],
        highlight: 'Desktop app enables offline admin tasks with automatic cloud sync',
      },
    ];
  }

  // Generic fallback for other projects
  return [];
}

/**
 * Asymmetric Bento Grid Tech Stack
 */
export function ProjectTechStack({ projectTitle }: ProjectTechStackProps) {
  const [selectedTech, setSelectedTech] = useState<TechUsage | null>(null);
  const techUsageData = getTechUsageData(projectTitle);

  // If no specific data, don't render the bento grid
  if (techUsageData.length === 0) return null;

  return (
    <section className="border-y border-surface-border bg-gradient-to-br from-surface-secondary/50 to-surface-primary py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 text-center">
          <Badge variant="primary" className="mb-3">
            Tech Stack
          </Badge>
          <h2 className="mb-3 text-3xl font-bold">Built With</h2>
          <p className="text-text-secondary">
            Click any technology to see how I used it in this project
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid auto-rows-[160px] grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {techUsageData.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5, z: 50 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTech(tech)}
              className={cn(
                'group relative cursor-pointer overflow-hidden rounded-2xl border border-surface-border bg-gradient-to-br from-surface-secondary to-surface-tertiary p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-glow-md',
                // Asymmetric layout
                tech.layout === 'horizontal' && 'col-span-2',
                tech.layout === 'vertical' && 'row-span-2',
                tech.layout === 'square' && 'col-span-1 row-span-1'
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
                  background: `radial-gradient(circle at center, ${tech.color}15, transparent 70%)`,
                }}
              />

              {/* Content - Different layouts for horizontal, vertical, and square */}
              <div className="relative z-10 flex h-full flex-col justify-between">
                {/* HORIZONTAL LAYOUT */}
                {tech.layout === 'horizontal' && (
                  <>
                    {/* Top: Icon + Name/Category on LEFT, Description on RIGHT */}
                    <div className="flex gap-3">
                      {/* Left side */}
                      <div className="flex items-start gap-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="rounded-xl p-2"
                          style={{ backgroundColor: `${tech.color}15` }}
                        >
                          <TechIcon icon={tech.icon} color={tech.color} size="md" />
                        </motion.div>
                        <div>
                          <h3 className="font-bold text-text-primary text-lg">
                            {tech.name}
                          </h3>
                          <Badge variant="secondary" className="mt-1 w-fit text-xs">
                            {tech.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Right side - Description */}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed text-text-secondary line-clamp-3">
                          {tech.usage}
                        </p>
                      </div>
                    </div>

                    {/* Bottom: Green stats box (full width) */}
                    {tech.highlight && (
                      <div className="rounded-lg border border-accent-green/30 bg-accent-green/5 px-2 py-1.5">
                        <p className="text-xs font-medium leading-snug text-accent-green">
                          {tech.highlight}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* VERTICAL LAYOUT */}
                {tech.layout === 'vertical' && (
                  <>
                    <div className="space-y-2">
                      {/* Top: Icon + Name + Category */}
                      <div className="flex items-start gap-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="rounded-xl p-2"
                          style={{ backgroundColor: `${tech.color}15` }}
                        >
                          <TechIcon icon={tech.icon} color={tech.color} size="lg" />
                        </motion.div>
                        <div>
                          <h3 className="font-bold text-text-primary text-xl">
                            {tech.name}
                          </h3>
                          <Badge variant="secondary" className="mt-1 w-fit text-xs">
                            {tech.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Middle: Description (longer) */}
                      <div className="space-y-1">
                        <p className="text-sm leading-relaxed text-text-secondary line-clamp-6">
                          {tech.usage}
                        </p>
                      </div>
                    </div>

                    {/* Bottom: Green stats box */}
                    {tech.highlight && (
                      <div className="rounded-lg border border-accent-green/30 bg-accent-green/5 px-2 py-1.5">
                        <p className="text-xs font-medium leading-snug text-accent-green">
                          {tech.highlight}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* SQUARE LAYOUT (Small cards) */}
                {tech.layout === 'square' && (
                  <>
                    <div className="flex items-start gap-2">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-xl p-2"
                        style={{ backgroundColor: `${tech.color}15` }}
                      >
                        <TechIcon icon={tech.icon} color={tech.color} size="md" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-bold text-text-primary text-base">
                          {tech.name}
                        </h3>
                        <Badge variant="secondary" className="mt-1 w-fit text-xs">
                          {tech.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-text-secondary line-clamp-3">
                      {tech.features[0]}
                    </p>
                  </>
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
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTech && (
          <TechModal tech={selectedTech} onClose={() => setSelectedTech(null)} projectTitle={projectTitle} />
        )}
      </AnimatePresence>
    </section>
  );
}
