/**
 * Mobile Dock Component
 * Floating bottom navigation with glassmorphism and auto-hide on scroll
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Navigation Item Definition
 */
interface DockItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

/**
 * Mobile Dock Props
 */
export interface MobileDockProps {
  /**
   * Custom dock items (optional)
   */
  items?: DockItem[];

  /**
   * Auto-hide on scroll
   */
  autoHide?: boolean;

  /**
   * Hide delay in ms
   */
  hideDelay?: number;
}

/**
 * Default Navigation Items
 */
const DEFAULT_DOCK_ITEMS: DockItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
    ),
  },
  {
    id: 'system-info',
    label: 'System',
    href: '/system-info',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
  },
  {
    id: 'stats',
    label: 'Stats',
    href: '/stats',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/#contact',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

/**
 * Mobile Dock Component
 *
 * Features:
 * - Floating bottom navigation with glassmorphism
 * - Auto-hide on scroll down, show on scroll up
 * - Active state highlighting with glow effect
 * - Touch-optimized (48px tap targets)
 * - Smooth animations using Framer Motion
 *
 * @example
 * ```tsx
 * <MobileDock autoHide={true} />
 * ```
 */
export function MobileDock({ items = DEFAULT_DOCK_ITEMS, autoHide = true, hideDelay = 2000 }: MobileDockProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const lastScrollY = useRef(0);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  /**
   * Scroll Detection Logic
   * - Tracks scroll direction
   * - Hides dock when scrolling down
   * - Shows dock when scrolling up or at top
   * - Auto-shows after hideDelay when idle
   */
  useEffect(() => {
    if (!autoHide) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // At top of page - always show
      if (currentScrollY < 50) {
        setIsVisible(true);
        setIsScrollingUp(false);
        return;
      }

      // Detect scroll direction
      if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show dock
        setIsVisible(true);
        setIsScrollingUp(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - hide dock
        setIsVisible(false);
        setIsScrollingUp(false);
      }

      lastScrollY.current = currentScrollY;

      // Clear existing timeout
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }

      // Auto-show after idle
      hideTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, hideDelay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, [autoHide, hideDelay]);

  /**
   * Check if item is active
   */
  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href) || false;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 lg:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {/* Dock Container */}
          <div className="glass-strong rounded-full border border-white/20 px-3 py-2.5 shadow-glow-lg sm:px-4 sm:py-3">
            {/* Navigation Items */}
            <ul className="flex items-center gap-1 sm:gap-2">
              {items.map((item) => {
                const active = isActive(item.href);

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={cn(
                        'relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 sm:h-12 sm:w-12',
                        'active:scale-95', // Touch feedback
                        active
                          ? 'bg-primary/20 text-primary shadow-glow-sm'
                          : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                      )}
                      aria-label={item.label}
                      aria-current={active ? 'page' : undefined}
                    >
                      {/* Icon */}
                      <span className="relative z-10">{item.icon}</span>

                      {/* Active Indicator */}
                      {active && (
                        <motion.span
                          layoutId="dock-active-indicator"
                          className="absolute inset-0 rounded-full bg-primary/10"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      {/* Active Glow */}
                      {active && (
                        <span className="absolute inset-0 animate-pulse rounded-full bg-primary/5 blur-md" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Label Hint (shown when scrolling up) */}
          {isScrollingUp && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface-primary px-3 py-1.5 text-xs text-text-tertiary"
            >
              {items.find((item) => isActive(item.href))?.label || 'Navigation'}
            </motion.div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook for managing mobile dock state
 *
 * @example
 * ```tsx
 * const { isVisible, show, hide } = useMobileDock();
 * ```
 */
export function useMobileDock() {
  const [isVisible, setIsVisible] = useState(true);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  const toggle = () => setIsVisible((prev) => !prev);

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
}
