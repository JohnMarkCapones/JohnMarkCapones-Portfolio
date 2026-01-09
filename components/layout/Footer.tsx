/**
 * Footer Component
 * Site-wide footer with links and social media
 */

'use client';

import Link from 'next/link';
import { SOCIAL_LINKS, NAV_ITEMS } from '@/lib/constants';
import { personalInfo } from '@/data/personal';

/**
 * Social Icon Component Mapping
 */
const SocialIcon: Record<string, React.ReactNode> = {
  github: (
    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  mail: (
    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
};

/**
 * Footer Component
 *
 * Features:
 * - Navigation links
 * - Social media links
 * - Copyright info
 * - Responsive layout
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-surface-border bg-surface-secondary/50 backdrop-blur-sm sm:mt-20 md:mt-24 lg:mt-32">
      <div className="container-custom py-8 sm:py-10 lg:py-16">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="text-center md:text-left lg:col-span-2">
            <Link href="/" className="inline-block">
              <h3 className="mb-3 font-heading text-xl font-bold text-gradient sm:text-2xl">
                {personalInfo.name}
              </h3>
            </Link>
            <p className="mb-4 mx-auto max-w-md text-xs leading-relaxed text-text-secondary sm:text-sm md:mx-0">
              Aspiring Software Developer specializing in DevOps, Cloud Engineering, and Full-Stack Development.
              Building systems that scale and solutions that matter.
            </p>
            <div className="flex justify-center gap-3 md:justify-start">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-lg bg-surface-tertiary text-text-secondary transition-all hover:bg-primary/10 hover:text-primary sm:h-10 sm:w-10"
                  aria-label={social.name}
                >
                  {SocialIcon[social.icon]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="mb-3 text-sm font-semibold text-text-primary sm:mb-4 sm:text-base">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-text-secondary transition-colors hover:text-primary sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="mb-3 text-sm font-semibold text-text-primary sm:mb-4 sm:text-base">Get in Touch</h4>
            <ul className="space-y-2 text-xs text-text-secondary sm:text-sm">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="break-all transition-colors hover:text-primary"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li>{personalInfo.location}</li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/20 sm:text-sm"
                >
                  <span>Send Message</span>
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-surface-border pt-6 sm:mt-10 sm:pt-8">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
            <p className="text-xs text-text-tertiary sm:text-sm">
              &copy; {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-xs text-text-tertiary sm:text-sm">
              Built with{' '}
              <span className="text-primary">Next.js</span>,{' '}
              <span className="text-primary">TypeScript</span> &{' '}
              <span className="text-primary">Tailwind</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
