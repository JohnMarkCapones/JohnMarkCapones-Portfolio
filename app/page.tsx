/**
 * Homepage
 * Main landing page with all sections
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Hero, MetricsDashboard, TechStack } from '@/components/sections';
import { HeroProjectCard } from '@/components/projects/HeroProjectCard';
import { EnhancedProjectCard } from '@/components/projects/EnhancedProjectCard';
import { PageTransition } from '@/components/animations';
import { allProjects, getFeaturedProject } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'John Mark Capones - Aspiring Software Developer specializing in DevOps, Cloud Engineering, and Full-Stack Development',
};

export default function HomePage() {
  const featuredProject = getFeaturedProject();
  const otherProjects = allProjects.slice(1, 4); // Get 3 other projects

  return (
    <PageTransition variant="fade">
      <main className="relative min-h-screen">
        {/* Hero Section with Terminal */}
        <Hero showBootSequence={false} />

        {/* Flagship Project Hero Card */}
        <section id="projects" className="section-spacing-lg">
          <div className="container-custom">
            <div className="mb-12 text-center">
              <Badge variant="primary" className="mb-4">
                Flagship Project
              </Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                CampusConnect: Transforming Education
              </h2>
              <p className="text-text-secondary">
                My most ambitious project - a comprehensive platform serving 3,000+ students and teachers
              </p>
            </div>

            <HeroProjectCard project={featuredProject} />
          </div>
        </section>

        {/* Decorative Divider */}
        <div className="section-separator" />

        {/* Other Featured Projects */}
        <section className="section-spacing">
          <div className="container-custom">
            <div className="mb-12 text-center">
              <Badge variant="success" className="mb-4">
                Other Projects
              </Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                More of My Work
              </h2>
              <p className="text-text-secondary">
                E-commerce platforms, pharmacy systems, and cloud solutions
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project, index) => (
                <EnhancedProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {/* View All Projects CTA */}
            <div className="mt-12 text-center">
              <Link href="/projects">
                <AnimatedButton variant="outline" size="lg">
                  View All Projects
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <div className="section-separator" />

        {/* Quick Stats Section */}
        <section className="section-alt-bg section-spacing">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="success" className="mb-4">
                Development Stats
              </Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                By The Numbers
              </h2>
              <p className="mb-12 text-text-secondary">
                A quick overview of my development journey
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-surface-border bg-surface-secondary/50 p-6 backdrop-blur-sm">
                  <p className="mb-2 text-4xl font-bold text-primary">15+</p>
                  <p className="text-sm text-text-tertiary">Projects Completed</p>
                </div>
                <div className="rounded-lg border border-surface-border bg-surface-secondary/50 p-6 backdrop-blur-sm">
                  <p className="mb-2 text-4xl font-bold text-accent-green">25+</p>
                  <p className="text-sm text-text-tertiary">Technologies</p>
                </div>
                <div className="rounded-lg border border-surface-border bg-surface-secondary/50 p-6 backdrop-blur-sm">
                  <p className="mb-2 text-4xl font-bold text-accent-amber">3,000+</p>
                  <p className="text-sm text-text-tertiary">Users Served</p>
                </div>
                <div className="rounded-lg border border-surface-border bg-surface-secondary/50 p-6 backdrop-blur-sm">
                  <p className="mb-2 text-4xl font-bold text-accent-blue">3+</p>
                  <p className="text-sm text-text-tertiary">Years Experience</p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/stats">
                  <AnimatedButton variant="ghost" size="lg">
                    View Detailed Stats
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <div className="section-separator" />

        {/* Tech Stack Bento Grid */}
        <TechStack />

        {/* Decorative Divider */}
        <div className="section-separator" />

        {/* Metrics Dashboard */}
        <MetricsDashboard />

        {/* Call to Action Section */}
        <section className="section-spacing-lg">
          <div className="container-custom">
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-surface-secondary to-surface-secondary p-8 md:p-12 lg:p-16">
              {/* Background decoration */}
              <div className="absolute inset-0 -z-10 opacity-30">
                <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-accent-green/20 blur-3xl" />
              </div>

              <div className="relative z-10 mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-8 text-center">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/10 px-4 py-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-accent-green" />
                    <span className="text-sm font-medium text-accent-green">Available for Opportunities</span>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                    Let's Build Something Amazing Together
                  </h2>
                  <p className="mx-auto max-w-2xl text-lg text-text-secondary md:text-xl">
                    I'm actively seeking full-time opportunities in software development, DevOps, and cloud engineering.
                    Let's discuss how I can contribute to your team's success.
                  </p>
                </div>

                {/* What I'm Looking For */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg border border-surface-border bg-surface-secondary/50 p-4 text-center backdrop-blur-sm">
                    <div className="mb-2 flex justify-center">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-text-primary">Full-time Roles</p>
                  </div>
                  <div className="rounded-lg border border-surface-border bg-surface-secondary/50 p-4 text-center backdrop-blur-sm">
                    <div className="mb-2 flex justify-center">
                      <svg className="h-6 w-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-text-primary">Freelance Projects</p>
                  </div>
                  <div className="rounded-lg border border-surface-border bg-surface-secondary/50 p-4 text-center backdrop-blur-sm">
                    <div className="mb-2 flex justify-center">
                      <svg className="h-6 w-6 text-accent-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-text-primary">Collaborations</p>
                  </div>
                  <div className="rounded-lg border border-surface-border bg-surface-secondary/50 p-4 text-center backdrop-blur-sm">
                    <div className="mb-2 flex justify-center">
                      <svg className="h-6 w-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-text-primary">Consulting</p>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="mb-8 flex flex-wrap justify-center gap-4">
                  <a
                    href="mailto:johnmarkcapones1@gmail.com"
                    className="group flex items-center gap-3 rounded-lg border border-surface-border bg-surface-secondary/50 px-6 py-3 transition-all hover:border-primary/50 hover:bg-surface-border"
                  >
                    <svg className="h-5 w-5 text-text-secondary transition-colors group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-text-primary">Email Me</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/john-mark-capones-66b6b8255/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-surface-border bg-surface-secondary/50 px-6 py-3 transition-all hover:border-primary/50 hover:bg-surface-border"
                  >
                    <svg className="h-5 w-5 text-text-secondary transition-colors group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="text-sm font-medium text-text-primary">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/JohnMarkCapones"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-surface-border bg-surface-secondary/50 px-6 py-3 transition-all hover:border-primary/50 hover:bg-surface-border"
                  >
                    <svg className="h-5 w-5 text-text-secondary transition-colors group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-sm font-medium text-text-primary">GitHub</span>
                  </a>
                </div>

                {/* Primary CTAs */}
                <div className="mb-6 flex flex-wrap justify-center gap-4">
                  <Link href="/contact">
                    <AnimatedButton variant="primary" size="lg" className="group">
                      Send Me a Message
                      <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </AnimatedButton>
                  </Link>
                  <Link href="/about">
                    <AnimatedButton variant="outline" size="lg">
                      Learn More About Me
                    </AnimatedButton>
                  </Link>
                </div>

                {/* Response Promise */}
                <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
                  <svg className="h-4 w-4 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>I typically respond within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
