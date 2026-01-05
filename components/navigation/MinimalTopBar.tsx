/**
 * Floating Centered Nav Bar Component
 * Minimal floating pill navigation with icons
 */

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPaletteState } from '@/contexts';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Icon Component Mapping
 * Maps icon names to SVG components
 */
const IconMap: Record<string, React.ReactNode> = {
  home: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  user: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  terminal: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  folder: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    </svg>
  ),
  file: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  chart: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  mail: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
 * Floating Centered Nav Bar Component
 *
 * Features:
 * - Centered floating pill at top
 * - Icons only (labels on hover)
 * - Glassmorphism effect
 * - Hidden on mobile (uses MobileDock instead)
 */
export function MinimalTopBar() {
  const pathname = usePathname();
  const { open } = useCommandPaletteState();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  /**
   * Check if navigation item is active
   */
  const isActive = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) || false;
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
      className="fixed top-8 left-1/2 z-50 hidden -translate-x-1/2 lg:block"
    >
      {/* Floating Navigation Pill */}
      <nav className="relative rounded-full border border-surface-border/50 bg-surface-primary/60 px-4 py-3 shadow-2xl backdrop-blur-xl">
        {/* Subtle glow effect */}
        <div className="absolute -inset-[1px] -z-10 rounded-full bg-gradient-to-r from-primary/20 via-accent-green/10 to-primary/20 opacity-50 blur-xl" />

        <ul className="flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  aria-label={item.label}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300',
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
                    )}
                  >
                    {/* Icon */}
                    <span className="relative z-10">{item.icon ? IconMap[item.icon] : IconMap.file}</span>

                    {/* Active Indicator Ring */}
                    {active && (
                      <motion.div
                        layoutId="nav-active-indicator"
                        className="absolute -inset-0.5 rounded-xl border-2 border-primary/40"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover Label Tooltip */}
                    <AnimatePresence>
                      {hoveredItem === item.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                        >
                          <div className="rounded-lg border border-surface-border/50 bg-surface-primary/90 px-3 py-2 shadow-xl backdrop-blur-md">
                            <span className="text-xs font-medium text-text-primary">{item.label}</span>
                          </div>
                          {/* Arrow */}
                          <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-surface-border/50 bg-surface-primary/90" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </li>
            );
          })}

          {/* Elegant Divider */}
          <div className="mx-2 h-8 w-px bg-gradient-to-b from-transparent via-surface-border to-transparent" />

          {/* Search Button */}
          <li>
            <button
              onClick={open}
              onMouseEnter={() => setHoveredItem('search')}
              onMouseLeave={() => setHoveredItem(null)}
              aria-label="Search"
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex h-12 w-12 items-center justify-center rounded-xl text-text-secondary transition-all duration-300 hover:bg-surface-secondary hover:text-text-primary"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                {/* Hover Label Tooltip */}
                <AnimatePresence>
                  {hoveredItem === 'search' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-2 rounded-lg border border-surface-border/50 bg-surface-primary/90 px-3 py-2 shadow-xl backdrop-blur-md">
                        <span className="text-xs font-medium text-text-primary">Search</span>
                        <kbd className="rounded border border-surface-border bg-surface-tertiary px-1.5 py-0.5 font-mono text-[10px] text-text-tertiary">
                          ⌘K
                        </kbd>
                      </div>
                      {/* Arrow */}
                      <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-surface-border/50 bg-surface-primary/90" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </button>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
}
