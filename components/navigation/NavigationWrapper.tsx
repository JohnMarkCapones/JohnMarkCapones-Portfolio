/**
 * Navigation Wrapper Component
 * Client component wrapper for navigation state and components
 */

'use client';

import { CommandPalette } from './CommandPalette';
import { MobileDock } from './MobileDock';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { useCommandPaletteState, useTheme } from '@/contexts';
import { themes } from '@/lib/themes';

/**
 * Navigation Wrapper Component
 *
 * Manages keyboard shortcuts and renders navigation components.
 * Separated from root layout to maintain server component compatibility.
 */
export function NavigationWrapper() {
  const { isOpen, open, close } = useCommandPaletteState();
  const { setTheme } = useTheme();

  /**
   * Theme switching commands
   */
  const themeCommands = themes.map((theme) => ({
    id: `theme-${theme.id}`,
    label: `Switch to ${theme.name} theme`,
    description: theme.description,
    icon: theme.icon,
    action: () => setTheme(theme.id),
    category: 'Theme',
    keywords: ['theme', 'appearance', 'color', theme.name.toLowerCase()],
  }));

  /**
   * Global keyboard shortcut: ⌘K to open Command Palette
   */
  useKeyboardShortcut({
    key: 'k',
    ctrl: true,
    callback: open,
    preventDefault: true,
  });

  return (
    <>
      {/* Command Palette (Desktop + Mobile) */}
      <CommandPalette isOpen={isOpen} onClose={close} customCommands={themeCommands} />

      {/* Mobile Dock (Mobile only) */}
      <MobileDock autoHide={true} />
    </>
  );
}
