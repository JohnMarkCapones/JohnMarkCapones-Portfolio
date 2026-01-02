/**
 * Homepage
 * Main landing page with all sections
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Hero, Philosophy, MetricsDashboard, JourneyTimeline, Contact } from '@/components/sections';
import { AnimatedProjectCard } from '@/components/projects/AnimatedProjectCard';
import { PageTransition } from '@/components/animations';
import { GitHubStats, ContributionGraph, GitHubRepos } from '@/components/github';
import { allProjects, getFeaturedProject } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'John Mark Capones - Aspiring Software Developer specializing in DevOps, Cloud Engineering, and Full-Stack Development',
};

export default function HomePage() {
  const featured = getFeaturedProject();

  return (
    <PageTransition variant="fade">
      <main className="relative min-h-screen">
        {/* Hero Section with Terminal */}
        <Hero showBootSequence={false} />

        {/* Philosophy Section */}
        <Philosophy />

        {/* Featured Project Preview */}
        <section id="projects" className="container-custom section-spacing">
          <div className="mb-12 text-center">
            <Badge variant="success" className="mb-4">
              Featured Project
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              {featured.title}
            </h2>
            <p className="text-text-secondary">{featured.tagline}</p>
          </div>

          <AnimatedProjectCard project={featured} variant="featured" />
        </section>

        {/* All Projects Preview */}
        <section className="container-custom section-spacing">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              More Projects
            </h2>
            <p className="text-text-secondary">
              {allProjects.length} projects across web, mobile, and cloud
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allProjects.slice(1).map((project) => (
              <AnimatedProjectCard key={project.id} project={project} variant="default" />
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
        </section>

        {/* GitHub Stats Section */}
        <section className="container-custom section-spacing bg-surface-secondary">
          <GitHubStats />
        </section>

        {/* GitHub Contribution Graph */}
        <section className="container-custom section-spacing">
          <div className="mx-auto max-w-5xl">
            <ContributionGraph />
          </div>
        </section>

        {/* GitHub Repositories */}
        <section className="container-custom section-spacing bg-surface-secondary">
          <GitHubRepos />
        </section>

        {/* Metrics Dashboard */}
        <MetricsDashboard />

        {/* Journey Timeline */}
        <JourneyTimeline />

        {/* Contact Section */}
        <Contact />
      </main>
    </PageTransition>
  );
}
