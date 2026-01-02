/**
 * Command Palette Component
 * Professional ⌘K command palette for navigation and quick actions
 */

'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';

/**
 * Command Item Definition
 */
interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  href?: string;
  action?: () => void;
  category?: string;
  keywords?: string[];
}

/**
 * Icon Component Mapping
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
  download: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  ),
  palette: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  ),
  github: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

/**
 * Fuzzy search implementation
 * Matches if all characters appear in order (case-insensitive)
 */
function fuzzyMatch(text: string, query: string): boolean {
  if (!query) return true;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  let queryIndex = 0;

  for (let i = 0; i < lowerText.length && queryIndex < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[queryIndex]) {
      queryIndex++;
    }
  }

  return queryIndex === lowerQuery.length;
}

/**
 * Command Palette Props
 */
export interface CommandPaletteProps {
  /**
   * Is palette open
   */
  isOpen: boolean;

  /**
   * Close callback
   */
  onClose: () => void;

  /**
   * Custom commands (in addition to navigation)
   */
  customCommands?: CommandItem[];
}

/**
 * Command Palette Component
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <CommandPalette
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 */
export function CommandPalette({ isOpen, onClose, customCommands = [] }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  // Portal mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Build command list from navigation items + custom commands
  const allCommands = useMemo((): CommandItem[] => {
    const navCommands: CommandItem[] = NAV_ITEMS.map((item) => ({
      id: item.href,
      label: item.label,
      description: item.description,
      icon: item.icon,
      href: item.href,
      category: 'Navigation',
      keywords: [item.label.toLowerCase()],
    }));

    const quickActions: CommandItem[] = [
      {
        id: 'download-resume',
        label: 'Download Resume',
        description: 'Download resume as PDF',
        icon: 'download',
        category: 'Actions',
        action: () => {
          // TODO: Implement resume download
          console.log('Download resume');
        },
      },
      {
        id: 'toggle-theme',
        label: 'Toggle Theme',
        description: 'Switch between light and dark mode',
        icon: 'palette',
        category: 'Actions',
        action: () => {
          // TODO: Implement theme toggle
          console.log('Toggle theme');
        },
      },
      {
        id: 'view-github',
        label: 'View GitHub Profile',
        description: 'Open GitHub in new tab',
        icon: 'github',
        category: 'Links',
        action: () => {
          window.open('https://github.com/JohnMarkCapones', '_blank');
        },
      },
      {
        id: 'view-linkedin',
        label: 'View LinkedIn Profile',
        description: 'Open LinkedIn in new tab',
        icon: 'linkedin',
        category: 'Links',
        action: () => {
          window.open('https://www.linkedin.com/in/john-mark-capones-66b6b8255/', '_blank');
        },
      },
    ];

    return [...navCommands, ...quickActions, ...customCommands];
  }, [customCommands]);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query) return allCommands;

    return allCommands.filter((command) => {
      // Check label
      if (fuzzyMatch(command.label, query)) return true;

      // Check description
      if (command.description && fuzzyMatch(command.description, query)) return true;

      // Check keywords
      if (command.keywords?.some((keyword) => fuzzyMatch(keyword, query))) return true;

      return false;
    });
  }, [query, allCommands]);

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};

    filteredCommands.forEach((command) => {
      const category = command.category || 'Other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category]!.push(command);
    });

    return groups;
  }, [filteredCommands]);

  // Reset selected index when filtered commands change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useKeyboardShortcut({
    key: 'ArrowDown',
    enabled: isOpen,
    preventDefault: true,
    callback: () => {
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    },
  });

  useKeyboardShortcut({
    key: 'ArrowUp',
    enabled: isOpen,
    preventDefault: true,
    callback: () => {
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    },
  });

  useKeyboardShortcut({
    key: 'Enter',
    enabled: isOpen,
    preventDefault: true,
    callback: () => {
      const selected = filteredCommands[selectedIndex];
      if (selected) {
        handleCommandSelect(selected);
      }
    },
  });

  useKeyboardShortcut({
    key: 'Escape',
    enabled: isOpen,
    preventDefault: true,
    callback: onClose,
  });

  const handleCommandSelect = (command: CommandItem) => {
    // Execute action
    if (command.action) {
      command.action();
    }

    // Navigate to href
    if (command.href) {
      window.location.href = command.href;
    }

    // Close palette
    onClose();
  };

  // Prevent rendering on server
  if (!mounted || !isOpen) return null;

  const content = (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Command Palette */}
      <div className="fixed inset-0 z-[1001] flex items-start justify-center pt-[15vh] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-2xl rounded-2xl border border-surface-border/50 bg-surface-primary/95 shadow-2xl backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          {/* Animated glow effect */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -inset-[2px] -z-10 rounded-2xl bg-gradient-to-r from-primary/20 via-accent-green/10 to-primary/20 blur-2xl"
          />

          {/* Search Input */}
          <div className="border-b border-surface-border/50 p-5">
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Input */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-lg text-text-primary placeholder:text-text-tertiary outline-none"
              />

              {/* Shortcut Hint */}
              <kbd className="hidden sm:inline-flex h-7 select-none items-center gap-1 rounded-md border border-surface-border bg-surface-secondary px-2.5 font-mono text-xs text-text-tertiary">
                ESC
              </kbd>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[450px] overflow-y-auto p-3">
            {filteredCommands.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-secondary/50">
                    <svg className="h-8 w-8 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm font-medium text-text-secondary">No results found</p>
                <p className="mt-1 text-xs text-text-tertiary">Try searching for something else</p>
              </div>
            ) : (
              Object.entries(groupedCommands).map(([category, commands]) => (
                <div key={category} className="mb-6 last:mb-0">
                  {/* Category Header */}
                  <div className="mb-2 px-3 py-1.5">
                    <p className="text-[10px] font-semibold text-text-tertiary uppercase tracking-widest">
                      {category}
                    </p>
                  </div>

                  {/* Commands in Category */}
                  <div className="space-y-1">
                    {commands.map((command, cmdIndex) => {
                      const globalIndex = filteredCommands.indexOf(command);
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <motion.button
                          key={command.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: cmdIndex * 0.03 }}
                          onClick={() => handleCommandSelect(command)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            'w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200',
                            isSelected
                              ? 'bg-gradient-to-r from-primary/15 to-accent-green/10 text-primary shadow-sm'
                              : 'text-text-primary hover:bg-surface-secondary/50'
                          )}
                        >
                          {/* Icon */}
                          {command.icon && (
                            <div className={cn(
                              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                              isSelected
                                ? "bg-primary/20 text-primary"
                                : "bg-surface-secondary/50 text-text-secondary"
                            )}>
                              {IconMap[command.icon] || IconMap.file}
                            </div>
                          )}

                          {/* Label & Description */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{command.label}</p>
                            {command.description && (
                              <p className="text-xs text-text-tertiary truncate">
                                {command.description}
                              </p>
                            )}
                          </div>

                          {/* Arrow indicator when selected */}
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                            >
                              <svg
                                className="h-4 w-4 text-primary"
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
                            </motion.div>
                          )}

                          {/* Pulse effect on selected */}
                          {isSelected && (
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-primary/5"
                              animate={{ opacity: [0.5, 0, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-surface-border/50 bg-surface-secondary/30 p-4 rounded-b-2xl">
            <div className="flex items-center justify-between text-xs text-text-tertiary">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded-md border border-surface-border bg-surface-tertiary px-2 py-1 font-mono">↑↓</kbd>
                  <span className="hidden sm:inline">Navigate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded-md border border-surface-border bg-surface-tertiary px-2 py-1 font-mono">↵</kbd>
                  <span className="hidden sm:inline">Select</span>
                </span>
              </div>
              <span className="font-medium">
                {filteredCommands.length} {filteredCommands.length === 1 ? 'result' : 'results'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );

  // Render in portal
  return createPortal(content, document.getElementById('portal-root')!);
}

/**
 * Hook for managing command palette state
 *
 * @example
 * ```tsx
 * const { isOpen, open, close, toggle } = useCommandPalette();
 *
 * <CommandPalette isOpen={isOpen} onClose={close} />
 * ```
 */
export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  // ⌘K shortcut to toggle
  useKeyboardShortcut({
    key: 'k',
    ctrl: true,
    callback: toggle,
    preventDefault: true,
  });

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
