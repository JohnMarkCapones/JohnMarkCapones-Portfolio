/**
 * Header Component
 * Main navigation header with logo and menu
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCommandPaletteState } from '@/contexts';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Header Component
 *
 * Sticky navigation header with logo, nav links, and command palette trigger
 */
export function Header() {
  const pathname = usePathname();
  const { open } = useCommandPaletteState();
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-surface-primary/80 backdrop-blur-lg border-b border-surface-border shadow-lg'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-2 ring-primary/20"
            >
              <span className="text-xl font-bold">JM</span>
            </motion.div>
            <span className="hidden font-heading text-lg font-bold sm:block">
              John Mark<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-md bg-primary/10 ring-1 ring-primary/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Command Palette Trigger */}
          <button
            onClick={open}
            className="flex items-center gap-2 rounded-md border border-surface-border bg-surface-secondary px-3 py-1.5 text-sm transition-colors hover:bg-surface-tertiary"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden sm:inline text-text-tertiary">Search</span>
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-surface-border bg-surface-tertiary px-1.5 font-mono text-xs text-text-tertiary">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
