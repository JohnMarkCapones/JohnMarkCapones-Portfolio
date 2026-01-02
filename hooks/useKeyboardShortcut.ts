/**
 * useKeyboardShortcut Hook
 * Professional keyboard shortcut handling with modifier keys
 */

import { useEffect, useCallback, useRef } from 'react';

/**
 * Keyboard event with modifier keys
 */
export interface KeyboardShortcutHandler {
  (event: KeyboardEvent): void;
}

/**
 * Shortcut configuration
 */
export interface ShortcutConfig {
  /**
   * Key to listen for (e.g., 'k', 'Escape', 'Enter')
   */
  key: string;

  /**
   * Require Ctrl key (Cmd on Mac)
   */
  ctrl?: boolean;

  /**
   * Require Shift key
   */
  shift?: boolean;

  /**
   * Require Alt key (Option on Mac)
   */
  alt?: boolean;

  /**
   * Callback when shortcut is triggered
   */
  callback: KeyboardShortcutHandler;

  /**
   * Enable shortcut
   */
  enabled?: boolean;

  /**
   * Prevent default browser behavior
   */
  preventDefault?: boolean;
}

/**
 * Detect if user is on Mac (for Cmd vs Ctrl)
 */
const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

/**
 * Check if modifier keys match
 */
function modifiersMatch(
  event: KeyboardEvent,
  config: ShortcutConfig
): boolean {
  const ctrlKey = isMac ? event.metaKey : event.ctrlKey;

  return (
    (!config.ctrl || ctrlKey) &&
    (!config.shift || event.shiftKey) &&
    (!config.alt || event.altKey)
  );
}

/**
 * Hook for handling keyboard shortcuts
 *
 * @example
 * ```tsx
 * useKeyboardShortcut({
 *   key: 'k',
 *   ctrl: true,
 *   callback: () => openCommandPalette(),
 *   preventDefault: true,
 * });
 * ```
 */
export function useKeyboardShortcut(config: ShortcutConfig) {
  const { key, callback, enabled = true, preventDefault = true } = config;
  const callbackRef = useRef(callback);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Check if shortcut is enabled
      if (!enabled) return;

      // Check if key matches (case-insensitive)
      const keyMatches = event.key.toLowerCase() === key.toLowerCase();
      if (!keyMatches) return;

      // Check if modifiers match
      if (!modifiersMatch(event, config)) return;

      // Prevent default if configured
      if (preventDefault) {
        event.preventDefault();
      }

      // Execute callback
      callbackRef.current(event);
    },
    [key, enabled, preventDefault, config]
  );

  useEffect(() => {
    if (!enabled) return;

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled]);
}

/**
 * Hook for handling multiple keyboard shortcuts
 *
 * @example
 * ```tsx
 * useKeyboardShortcuts([
 *   { key: 'k', ctrl: true, callback: openPalette },
 *   { key: 'Escape', callback: closePalette },
 * ]);
 * ```
 */
export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  shortcuts.forEach((shortcut) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useKeyboardShortcut(shortcut);
  });
}

/**
 * Get readable shortcut string for display
 *
 * @example
 * ```tsx
 * getShortcutString({ key: 'k', ctrl: true }) // "⌘K" on Mac, "Ctrl+K" on Windows
 * ```
 */
export function getShortcutString(config: Pick<ShortcutConfig, 'key' | 'ctrl' | 'shift' | 'alt'>): string {
  const parts: string[] = [];

  if (config.ctrl) {
    parts.push(isMac ? '⌘' : 'Ctrl');
  }
  if (config.shift) {
    parts.push('⇧');
  }
  if (config.alt) {
    parts.push(isMac ? '⌥' : 'Alt');
  }

  parts.push(config.key.toUpperCase());

  return parts.join(isMac ? '' : '+');
}
