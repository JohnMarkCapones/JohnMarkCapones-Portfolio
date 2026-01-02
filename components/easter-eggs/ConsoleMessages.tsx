/**
 * Console Messages Component
 * Client component to display console messages on mount
 */

'use client';

import { useEffect } from 'react';
import { printConsoleMessages, exposeConsoleCommands } from '@/lib/console-art';

/**
 * Console Messages Component
 *
 * Displays fun messages in browser console when app loads
 */
export function ConsoleMessages() {
  useEffect(() => {
    // Print welcome messages
    printConsoleMessages();

    // Expose console commands
    exposeConsoleCommands();
  }, []);

  // This component doesn't render anything
  return null;
}
