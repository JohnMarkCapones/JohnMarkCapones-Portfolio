/**
 * Navigation Context
 * Global navigation state management for Command Palette and Mobile Dock
 */

'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

/**
 * Navigation State Interface
 */
interface NavigationState {
  /**
   * Command Palette state
   */
  commandPalette: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  };

  /**
   * Mobile Dock state
   */
  mobileDock: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    toggle: () => void;
  };

  /**
   * Navigation settings
   */
  settings: {
    autoHideDock: boolean;
    setAutoHideDock: (value: boolean) => void;
    enableCommandPalette: boolean;
    setEnableCommandPalette: (value: boolean) => void;
  };
}

/**
 * Create Navigation Context
 */
const NavigationContext = createContext<NavigationState | undefined>(undefined);

/**
 * Navigation Provider Props
 */
interface NavigationProviderProps {
  children: ReactNode;
  /**
   * Initial auto-hide setting for mobile dock
   */
  initialAutoHideDock?: boolean;
  /**
   * Enable/disable command palette globally
   */
  initialEnableCommandPalette?: boolean;
}

/**
 * Navigation Provider Component
 *
 * Provides global navigation state to the entire app.
 * Manages Command Palette and Mobile Dock state in one place.
 *
 * @example
 * ```tsx
 * <NavigationProvider>
 *   <App />
 * </NavigationProvider>
 * ```
 */
export function NavigationProvider({
  children,
  initialAutoHideDock = true,
  initialEnableCommandPalette = true,
}: NavigationProviderProps) {
  // Command Palette state
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Mobile Dock state
  const [mobileDockVisible, setMobileDockVisible] = useState(true);

  // Settings state
  const [autoHideDock, setAutoHideDock] = useState(initialAutoHideDock);
  const [enableCommandPalette, setEnableCommandPalette] = useState(initialEnableCommandPalette);

  // Command Palette actions
  const openCommandPalette = useCallback(() => {
    if (enableCommandPalette) {
      setCommandPaletteOpen(true);
    }
  }, [enableCommandPalette]);

  const closeCommandPalette = useCallback(() => {
    setCommandPaletteOpen(false);
  }, []);

  const toggleCommandPalette = useCallback(() => {
    if (enableCommandPalette) {
      setCommandPaletteOpen((prev) => !prev);
    }
  }, [enableCommandPalette]);

  // Mobile Dock actions
  const showMobileDock = useCallback(() => {
    setMobileDockVisible(true);
  }, []);

  const hideMobileDock = useCallback(() => {
    setMobileDockVisible(false);
  }, []);

  const toggleMobileDock = useCallback(() => {
    setMobileDockVisible((prev) => !prev);
  }, []);

  // Context value
  const value: NavigationState = {
    commandPalette: {
      isOpen: commandPaletteOpen,
      open: openCommandPalette,
      close: closeCommandPalette,
      toggle: toggleCommandPalette,
    },
    mobileDock: {
      isVisible: mobileDockVisible,
      show: showMobileDock,
      hide: hideMobileDock,
      toggle: toggleMobileDock,
    },
    settings: {
      autoHideDock,
      setAutoHideDock,
      enableCommandPalette,
      setEnableCommandPalette,
    },
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

/**
 * Hook to access navigation context
 *
 * @throws Error if used outside NavigationProvider
 *
 * @example
 * ```tsx
 * const { commandPalette, mobileDock } = useNavigation();
 *
 * // Open command palette
 * commandPalette.open();
 *
 * // Hide mobile dock
 * mobileDock.hide();
 * ```
 */
export function useNavigation(): NavigationState {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }

  return context;
}

/**
 * Hook to access only Command Palette state
 *
 * @example
 * ```tsx
 * const { isOpen, open, close } = useCommandPaletteState();
 * ```
 */
export function useCommandPaletteState() {
  const { commandPalette } = useNavigation();
  return commandPalette;
}

/**
 * Hook to access only Mobile Dock state
 *
 * @example
 * ```tsx
 * const { isVisible, show, hide } = useMobileDockState();
 * ```
 */
export function useMobileDockState() {
  const { mobileDock } = useNavigation();
  return mobileDock;
}

/**
 * Hook to access navigation settings
 *
 * @example
 * ```tsx
 * const { autoHideDock, setAutoHideDock } = useNavigationSettings();
 * ```
 */
export function useNavigationSettings() {
  const { settings } = useNavigation();
  return settings;
}
