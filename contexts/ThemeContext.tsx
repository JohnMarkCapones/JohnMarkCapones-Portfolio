/**
 * Theme Context
 * Global theme state management
 */

'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type ThemeMode, getThemeById, applyTheme, getSavedTheme, saveTheme } from '@/lib/themes';

/**
 * Theme Context Type
 */
interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

/**
 * Theme Context
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme Provider Props
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme Provider Component
 *
 * Manages global theme state and persistence
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = getSavedTheme();
    setThemeState(savedTheme);
    setMounted(true);
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    if (!mounted) return;

    const themeConfig = getThemeById(theme);
    applyTheme(themeConfig);
    saveTheme(theme);
  }, [theme, mounted]);

  /**
   * Set theme with animation
   */
  const setTheme = (newTheme: ThemeMode) => {
    // Add transition class for smooth color changes
    document.documentElement.classList.add('theme-transition');

    setThemeState(newTheme);

    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  };

  /**
   * Toggle between themes (dark -> light -> matrix -> dark)
   */
  const toggleTheme = () => {
    const themeOrder: ThemeMode[] = ['dark', 'light', 'matrix'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex] || 'dark');
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Use Theme Hook
 *
 * Access theme context in components
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
