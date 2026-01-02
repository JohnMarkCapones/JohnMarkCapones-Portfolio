/**
 * Theme Switcher Component
 * Floating button to switch between themes
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts';
import { themes } from '@/lib/themes';
import { cn } from '@/lib/utils';

/**
 * Theme Switcher Props
 */
export interface ThemeSwitcherProps {
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Theme Switcher Component
 *
 * Floating theme switcher with dropdown menu
 */
export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentTheme = themes.find((t) => t.id === theme);

  return (
    <div className={cn('fixed bottom-24 right-6 z-50 md:bottom-8', className)}>
      {/* Theme Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-2 overflow-hidden rounded-lg border border-surface-border bg-surface-secondary shadow-glow-lg backdrop-blur-md"
          >
            <div className="p-2">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => {
                    setTheme(themeOption.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'group flex w-full items-center gap-3 rounded-md px-4 py-3 text-left transition-all',
                    theme === themeOption.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
                  )}
                >
                  <span className="text-2xl">{themeOption.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium">{themeOption.name}</p>
                    <p className="text-xs opacity-75">{themeOption.description}</p>
                  </div>
                  {theme === themeOption.id && (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Switcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full border border-surface-border bg-surface-secondary shadow-glow-md backdrop-blur-md transition-colors',
          isOpen ? 'bg-primary/10 border-primary/30' : 'hover:bg-surface-tertiary'
        )}
        aria-label="Change theme"
        title={`Current theme: ${currentTheme?.name}`}
      >
        <span className="text-2xl">{currentTheme?.icon}</span>
      </motion.button>

      {/* Keyboard Hint */}
      {!isOpen && (
        <div className="absolute -left-2 top-0 hidden md:block">
          <div className="rounded-md bg-surface-tertiary px-2 py-1 text-xs text-text-tertiary opacity-0 transition-opacity group-hover:opacity-100">
            <kbd className="rounded bg-surface-border px-1.5 py-0.5 font-mono">⌘</kbd>
            <span className="mx-1">+</span>
            <kbd className="rounded bg-surface-border px-1.5 py-0.5 font-mono">T</kbd>
          </div>
        </div>
      )}
    </div>
  );
}
