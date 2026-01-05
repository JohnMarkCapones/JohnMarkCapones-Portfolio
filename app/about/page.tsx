/**
 * About Page
 * Personal story, philosophy, and journey timeline
 */

import type { Metadata } from 'next';
import { PageTransition } from '@/components/animations';
import { Philosophy, JourneyTimeline, TechStack } from '@/components/sections';
import { Badge } from '@/components/ui/badge';
import { personalInfo } from '@/data/personal';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about John Mark Capones - my journey, philosophy, and what drives me as a developer',
};

export default function AboutPage() {
  return (
    <PageTransition variant="fade">
      <main className="min-h-screen py-20 lg:py-32">
        {/* Hero Section */}
        <section className="container-custom mb-20">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="primary" className="mb-4">
              About Me
            </Badge>
            <h1 className="font-heading text-5xl font-bold text-text-primary md:text-6xl lg:text-7xl">
              John Mark Capones
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              {personalInfo.title}
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-tertiary">
              {personalInfo.bio}
            </p>
          </div>
        </section>

        {/* Philosophy Section */}
        <Philosophy />

        {/* Tech Stack Bento Grid */}
        <TechStack />

        {/* Journey Timeline */}
        <JourneyTimeline />
      </main>
    </PageTransition>
  );
}
