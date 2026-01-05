/**
 * Timeline Sidebar Component
 * Google Photos-style timeline scrubber/navigator
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineSidebarProps {
  years: number[];
  currentYear: number | null;
  onYearClick: (year: number) => void;
}

export function TimelineSidebar({ years, currentYear, onYearClick }: TimelineSidebarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show sidebar after scrolling down a bit
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-12 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
        >
          <div className="relative">
            {/* Timeline Track */}
            <div className="relative h-80 w-1 rounded-full bg-surface-border">
              {/* Active Progress */}
              <motion.div
                className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-primary via-primary/70 to-primary/50"
                style={{
                  height: currentYear
                    ? `${((years.indexOf(currentYear) + 1) / years.length) * 100}%`
                    : '0%',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />

              {/* Year Markers */}
              {years.map((year, index) => {
                const position = (index / (years.length - 1)) * 100;
                const isActive = currentYear === year;
                const isHovered = hoveredYear === year;

                return (
                  <div
                    key={year}
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{ top: `${position}%` }}
                  >
                    {/* Dot */}
                    <motion.button
                      onClick={() => onYearClick(year)}
                      onMouseEnter={() => setHoveredYear(year)}
                      onMouseLeave={() => setHoveredYear(null)}
                      className={cn(
                        'group relative rounded-full border-2 border-surface-primary transition-all duration-300',
                        isActive
                          ? 'h-4 w-4 bg-primary shadow-lg shadow-primary/50'
                          : 'h-3 w-3 bg-surface-border hover:bg-primary/50',
                        isHovered && !isActive && 'scale-150'
                      )}
                      whileHover={{ scale: 1.5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* Year Label */}
                      <AnimatePresence>
                        {(isActive || isHovered) && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap"
                          >
                            <div
                              className={cn(
                                'rounded-lg border px-3 py-1.5 text-sm font-bold shadow-lg backdrop-blur-sm',
                                isActive
                                  ? 'border-primary/50 bg-primary/90 text-white'
                                  : 'border-surface-border bg-surface-secondary/90 text-text-primary'
                              )}
                            >
                              {year}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                );
              })}
            </div>

            {/* Scrubber Handle (Current Position) */}
            {currentYear && (
              <motion.div
                className="pointer-events-none absolute left-1/2 -translate-x-1/2"
                style={{
                  top: `${((years.indexOf(currentYear)) / (years.length - 1)) * 100}%`,
                }}
                initial={false}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-primary/30 blur-xl" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Helper Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-text-tertiary">Timeline</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
