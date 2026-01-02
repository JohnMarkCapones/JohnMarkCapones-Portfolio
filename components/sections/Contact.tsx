/**
 * Contact Section Component
 * Contact information and collaboration opportunities
 */

'use client';

import type { JSX } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { personalInfo, currentStatus, socialLinks } from '@/data/personal';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/animations';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

/**
 * Social Icon Component
 */
function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    GitHub: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    LinkedIn: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    Email: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  return icons[name] || icons.Email;
}

/**
 * Contact Section
 *
 * Contact information and collaboration details
 * Availability status and ways to connect
 *
 * Features:
 * - Availability status indicator
 * - Social links with icons
 * - What I'm open to
 * - Career interests
 * - Current focus areas
 */
export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-surface-secondary py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-blue/5" />

      <div className="container-custom relative">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <ScrollReveal variant={fadeInUp}>
            <div className="mb-12 text-center">
              <Badge variant="success" className="mb-4">
                Let's Connect
              </Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Get In Touch
              </h2>
              <p className="text-text-secondary">
                Open for collaboration, freelance opportunities, and interesting projects
              </p>
            </div>
          </ScrollReveal>

          {/* Main Content Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px', amount: 0.2 }}
            variants={staggerContainer}
            className="grid gap-8 lg:grid-cols-2"
          >
            {/* Left Column - Contact Info */}
            <motion.div variants={staggerItem} className="space-y-6">
              {/* Availability Card */}
              <Card className="border-accent-green/20 bg-accent-green/5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-3 w-3 items-center justify-center">
                      <span className="absolute h-3 w-3 animate-ping rounded-full bg-accent-green opacity-75"></span>
                      <span className="relative h-2 w-2 rounded-full bg-accent-green"></span>
                    </div>
                    <CardTitle className="text-lg">Currently Available</CardTitle>
                  </div>
                  <CardDescription>{currentStatus.availability}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="font-medium text-text-primary">Status</p>
                        <p className="text-sm text-text-secondary">{currentStatus.role}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-medium text-text-primary">Expected Graduation</p>
                        <p className="text-sm text-text-secondary">{currentStatus.expectedGraduation}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Methods */}
              <Card variant="hover">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Let's start a conversation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target={social.name !== 'Email' ? '_blank' : undefined}
                        rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                        className={cn(
                          'group flex items-center gap-4 rounded-lg border border-surface-border bg-surface-tertiary p-4 transition-all',
                          'hover:border-primary/50 hover:bg-surface-secondary hover:shadow-glow-sm'
                        )}
                      >
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                          <SocialIcon name={social.name} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-text-primary group-hover:text-primary">{social.name}</p>
                          <p className="text-sm text-text-tertiary">{social.username}</p>
                        </div>
                        <svg className="h-5 w-5 text-text-tertiary transition-transform group-hover:translate-x-1 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - What I'm Open To */}
            <motion.div variants={staggerItem} className="space-y-6">
              {/* Open To */}
              <Card variant="hover">
                <CardHeader>
                  <CardTitle>Open For</CardTitle>
                  <CardDescription>Opportunities I'm interested in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentStatus.openTo.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-text-secondary">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Career Interests */}
              <Card variant="hover">
                <CardHeader>
                  <CardTitle>Career Interests</CardTitle>
                  <CardDescription>Roles I'm targeting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {currentStatus.careerInterests.map((interest) => (
                      <Badge key={interest} variant="primary" size="sm">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Focus */}
              <Card variant="hover">
                <CardHeader>
                  <CardTitle>Currently Working On</CardTitle>
                  <CardDescription>My current focus areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentStatus.currentFocus.map((focus, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <p className="text-sm text-text-secondary">{focus}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <ScrollReveal variant={fadeInUp} delay={0.2}>
            <Card glass className="mt-12 text-center">
            <CardContent className="p-8">
              <h3 className="mb-3 text-2xl font-bold">Ready to collaborate?</h3>
              <p className="mb-6 text-text-secondary">
                Whether it's a freelance project, internship opportunity, or just to chat about tech—I'd love to hear from you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 8px 20px rgba(var(--color-primary-rgb), 0.3)',
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 },
                  }}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-surface-primary shadow-glow-sm transition-all hover:bg-primary/90 hover:shadow-glow-md"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </motion.a>
                <motion.a
                  href={socialLinks.find((s) => s.name === 'LinkedIn')?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 },
                  }}
                  className="inline-flex items-center gap-2 rounded-md border border-surface-border bg-surface-secondary px-6 py-3 font-medium transition-colors hover:bg-surface-tertiary"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect on LinkedIn
                </motion.a>
              </div>
            </CardContent>
          </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
