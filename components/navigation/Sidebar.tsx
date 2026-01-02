/**
 * Sidebar Navigation Component
 * Fixed left sidebar for desktop navigation
 */

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCommandPaletteState, useTheme } from '@/contexts';
import { NAV_ITEMS } from '@/lib/constants';
import { socialLinks } from '@/data/personal';
import { cn } from '@/lib/utils';

/**
 * Sidebar Component
 *
 * Fixed sidebar navigation for desktop (hidden on mobile)
 */
export function Sidebar() {
  const pathname = usePathname();
  const { open } = useCommandPaletteState();
  const { theme, setTheme } = useTheme();

  const isActive = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) || false;
  };

  const cycleTheme = () => {
    const themes = ['dark', 'light', 'matrix'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex] || 'dark');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-surface-border bg-surface-primary lg:flex">
      {/* Logo Section */}
      <div className="flex h-20 items-center justify-center border-b border-surface-border">
        <Link href="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent-green/20 ring-2 ring-primary/30"
          >
            <span className="text-2xl font-bold text-primary">JM</span>
          </motion.div>
          <div className="flex flex-col">
            <span className="font-heading text-sm font-bold leading-tight">John Mark</span>
            <span className="text-xs text-text-tertiary">Capones</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all',
                    active
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
                  )}
                >
                  {/* Icon */}
                  <span className="text-lg">{item.icon}</span>

                  {/* Label */}
                  <span className="flex-1">{item.label}</span>

                  {/* Active Indicator */}
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 h-8 w-1 rounded-r-full bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Hover Arrow */}
                  {!active && (
                    <svg
                      className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <div className="my-6 border-t border-surface-border" />

        {/* Quick Actions */}
        <div className="space-y-2">
          {/* Search */}
          <button
            onClick={open}
            className="group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-text-secondary transition-all hover:bg-surface-secondary hover:text-text-primary"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="flex-1 text-left">Search</span>
            <kbd className="rounded border border-surface-border bg-surface-tertiary px-2 py-0.5 font-mono text-xs">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={cycleTheme}
            className="group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-text-secondary transition-all hover:bg-surface-secondary hover:text-text-primary"
          >
            <span className="text-lg">
              {theme === 'dark' && '🌙'}
              {theme === 'light' && '☀️'}
              {theme === 'matrix' && '💚'}
            </span>
            <span className="flex-1 text-left">
              {theme === 'dark' && 'Dark Mode'}
              {theme === 'light' && 'Light Mode'}
              {theme === 'matrix' && 'Matrix Mode'}
            </span>
          </button>
        </div>
      </nav>

      {/* Social Links Footer */}
      <div className="border-t border-surface-border p-4">
        <p className="mb-3 text-xs font-medium text-text-tertiary">Connect</p>
        <div className="flex items-center gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-secondary text-text-tertiary transition-all hover:bg-surface-tertiary hover:text-primary hover:shadow-glow-sm"
              aria-label={social.name}
              title={social.name}
            >
              {social.name === 'GitHub' && (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              )}
              {social.name === 'LinkedIn' && (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              )}
              {social.name === 'Email' && (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
