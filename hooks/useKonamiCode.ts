/**
 * Konami Code Hook
 * Detect the classic ↑↑↓↓←→←→BA sequence
 */

'use client';

import { useEffect, useRef } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/**
 * Konami Code Hook Options
 */
interface UseKonamiCodeOptions {
  /**
   * Callback when Konami code is entered
   */
  onSuccess: () => void;

  /**
   * Enable/disable the listener
   * @default true
   */
  enabled?: boolean;
}

/**
 * Use Konami Code Hook
 *
 * Listens for the Konami code sequence and triggers callback
 *
 * @example
 * ```tsx
 * useKonamiCode({
 *   onSuccess: () => {
 *     console.log('Konami code activated!');
 *   }
 * });
 * ```
 */
export function useKonamiCode({ onSuccess, enabled = true }: UseKonamiCodeOptions): void {
  const keysPressed = useRef<string[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Add key to sequence
      keysPressed.current.push(event.key);

      // Keep only last 10 keys (length of Konami code)
      if (keysPressed.current.length > KONAMI_CODE.length) {
        keysPressed.current.shift();
      }

      // Check if sequence matches
      const matches = KONAMI_CODE.every((key, index) => {
        return key.toLowerCase() === keysPressed.current[index]?.toLowerCase();
      });

      if (matches) {
        // Success! Reset and trigger callback
        keysPressed.current = [];
        onSuccess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, onSuccess]);
}
