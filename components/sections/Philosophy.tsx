/**
 * Philosophy Section Component
 * Developer manifesto and principles
 */

'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { personalInfo } from '@/data/personal';
import { ScrollReveal } from '@/components/animations';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

/**
 * Philosophy Section
 *
 * Displays developer manifesto and core principles
 * Editorial style with emphasis on typography
 *
 * Features:
 * - Large quote-style manifesto text
 * - Core principles grid
 * - Visual hierarchy with typography
 * - Responsive layout
 */
export function Philosophy() {
  const principles = [
    {
      icon: '🎯',
      title: 'Build Systems That Scale',
      description: 'Design for growth from day one. Systems should handle today\'s needs and tomorrow\'s demands.',
    },
    {
      icon: '⚡',
      title: 'Performance First',
      description: 'Every millisecond matters. Fast applications create better user experiences.',
    },
    {
      icon: '🔒',
      title: 'Security is Essential',
      description: 'Build secure systems by default. Security isn\'t optional, it\'s fundamental.',
    },
    {
      icon: '♿',
      title: 'Accessibility Matters',
      description: 'Technology should be usable by everyone. Inclusive design is good design.',
    },
    {
      icon: '🛠️',
      title: 'Best Practices Always',
      description: 'Follow industry standards and proven patterns. Quality code is maintainable code.',
    },
    {
      icon: '🚀',
      title: 'Ship Real Solutions',
      description: 'Demos are easy, production is hard. Build things that endure, not things that break.',
    },
  ];

  return (
    <section id="philosophy" className="container-custom section-spacing">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <ScrollReveal variant={fadeInUp}>
          <div className="mb-12 text-center">
            <Badge variant="primary" className="mb-4">
              Philosophy
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              What Drives Me
            </h2>
            <p className="text-text-secondary">
              My approach to software development and problem-solving
            </p>
          </div>
        </ScrollReveal>

        {/* Manifesto Card */}
        <ScrollReveal variant={fadeInUp} delay={0.2}>
          <Card glass className="mb-12">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                    💭
                  </div>
                </div>
                <div className="flex-1">
                  <CardTitle className="mb-2 text-xl">Developer Manifesto</CardTitle>
                  <blockquote className="border-l-4 border-primary pl-4 text-lg leading-relaxed text-text-secondary">
                    {personalInfo.manifesto}
                  </blockquote>
                </div>
              </div>
            </CardHeader>
          </Card>
        </ScrollReveal>

        {/* Core Principles Grid */}
        <div>
          <ScrollReveal variant={fadeInUp} delay={0.1}>
            <h3 className="mb-6 text-center text-2xl font-bold">Core Principles</h3>
          </ScrollReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px', amount: 0.1 }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {principles.map((principle, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card
                  variant="hover"
                  className="group h-full transition-all duration-300 hover:border-primary/50"
                >
                  <CardContent className="p-6">
                    <div className="mb-3 text-4xl">{principle.icon}</div>
                    <h4 className="mb-2 font-bold text-text-primary group-hover:text-primary">
                      {principle.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Currently Learning */}
        <ScrollReveal variant={fadeInUp} delay={0.2}>
          <Card className="mt-12 border-accent-green/20 bg-accent-green/5">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent-green/10 text-2xl">
                  📚
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="mb-2 font-bold text-text-primary">
                    Currently Expanding My Knowledge
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                    {personalInfo.currentlyLearning.map((item) => (
                      <Badge key={item} variant="success" size="sm">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-accent-green/10 px-4 py-2 text-sm font-medium text-accent-green">
                    In Progress
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
