/**
 * Contact Page
 * Get in touch and connect
 */

'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { socialLinks } from '@/data/personal';
import { CONTACT_INFO } from '@/lib/constants';

// Lazy load ContactWizard - heavy component with reCAPTCHA and Framer Motion
const ContactWizard = dynamic(
  () => import('@/components/contact/ContactWizard').then((mod) => ({ default: mod.ContactWizard })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
          <p className="text-text-secondary">Loading contact form...</p>
        </div>
      </div>
    ),
  }
);

export default function ContactPage() {
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
            Let's Connect
          </h1>
          <p className="mt-6 text-xl text-text-secondary">
            Have a project in mind? Let's make it happen
          </p>
        </motion.div>

        {/* Contact Wizard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <ContactWizard />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-surface-border" />
          <span className="text-sm text-text-tertiary">Or reach out directly</span>
          <div className="h-px flex-1 bg-surface-border" />
        </motion.div>

        {/* Contact Methods */}
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          {/* Email */}
          <motion.a
            href={`mailto:${CONTACT_INFO.email}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-surface-border bg-surface-secondary/50 p-8 backdrop-blur-sm transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-green/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent-green/20 text-primary transition-all group-hover:scale-110">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-text-primary">Email</h3>
              <p className="text-text-secondary group-hover:text-primary transition-colors">{CONTACT_INFO.email}</p>
            </div>
            <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
          </motion.a>

          {/* Phone */}
          <motion.a
            href={`tel:${CONTACT_INFO.phone}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-surface-border bg-surface-secondary/50 p-8 backdrop-blur-sm transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 to-accent-purple/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-green/20 to-accent-purple/20 text-accent-green transition-all group-hover:scale-110">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-text-primary">Phone</h3>
              <p className="text-text-secondary group-hover:text-accent-green transition-colors">{CONTACT_INFO.phone}</p>
            </div>
            <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-r from-accent-green/0 via-accent-green/20 to-accent-green/0 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
          </motion.a>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-surface-border bg-surface-secondary/50 p-8 backdrop-blur-sm transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple/20 to-primary/20 text-accent-purple transition-all group-hover:scale-110">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-text-primary">Location</h3>
              <p className="text-text-secondary">{CONTACT_INFO.location}</p>
            </div>
          </motion.div>

          {/* Timezone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-surface-border bg-surface-secondary/50 p-8 backdrop-blur-sm transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/10 to-accent-green/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-yellow/20 to-accent-green/20 text-accent-yellow transition-all group-hover:scale-110">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-text-primary">Timezone</h3>
              <p className="text-text-secondary">{CONTACT_INFO.timezone}</p>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="rounded-2xl border border-surface-border bg-surface-secondary/30 p-12 backdrop-blur-sm"
        >
          <h2 className="mb-8 text-center font-heading text-3xl font-bold text-text-primary">
            Connect on Social Media
          </h2>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.0 + index * 0.1 }}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex h-16 w-16 items-center justify-center rounded-xl border border-surface-border bg-surface-secondary/50 text-text-secondary backdrop-blur-sm transition-all hover:border-primary/30 hover:text-primary"
                aria-label={social.name}
                title={social.name}
              >
                {social.name === 'GitHub' && (
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                )}
                {social.name === 'LinkedIn' && (
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )}
                {social.name === 'Email' && (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                )}
                <div className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-r from-primary/20 to-accent-green/20 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
