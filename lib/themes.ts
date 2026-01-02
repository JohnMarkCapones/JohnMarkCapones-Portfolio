/**
 * Theme Configuration
 * Define all available themes with CSS variables
 */

export type ThemeMode = 'dark' | 'light' | 'matrix';

export interface Theme {
  id: ThemeMode;
  name: string;
  description: string;
  icon: string;
  colors: {
    // Surface colors
    'surface-primary': string;
    'surface-secondary': string;
    'surface-tertiary': string;
    'surface-border': string;

    // Text colors
    'text-primary': string;
    'text-secondary': string;
    'text-tertiary': string;

    // Brand colors
    primary: string;
    'primary-rgb': string;

    // Accent colors
    'accent-green': string;
    'accent-blue': string;
    'accent-amber': string;
    'accent-red': string;

    // Code editor
    'code-bg': string;
    'code-text': string;
  };
}

/**
 * Dark Theme (Default)
 */
export const darkTheme: Theme = {
  id: 'dark',
  name: 'Dark',
  description: 'Classic dark theme',
  icon: '🌙',
  colors: {
    'surface-primary': '#0A0A0A',
    'surface-secondary': '#111111',
    'surface-tertiary': '#1A1A1A',
    'surface-border': '#2A2A2A',

    'text-primary': '#FFFFFF',
    'text-secondary': '#A0A0A0',
    'text-tertiary': '#6B7280',

    primary: '#00D9FF',
    'primary-rgb': '0, 217, 255',

    'accent-green': '#00FF9F',
    'accent-blue': '#00D9FF',
    'accent-amber': '#FFB800',
    'accent-red': '#FF4757',

    'code-bg': '#0D1117',
    'code-text': '#E6EDF3',
  },
};

/**
 * Light Theme
 */
export const lightTheme: Theme = {
  id: 'light',
  name: 'Light',
  description: 'Professional light theme',
  icon: '☀️',
  colors: {
    'surface-primary': '#FFFFFF',
    'surface-secondary': '#F9FAFB',
    'surface-tertiary': '#F3F4F6',
    'surface-border': '#E5E7EB',

    'text-primary': '#111827',
    'text-secondary': '#4B5563',
    'text-tertiary': '#9CA3AF',

    primary: '#0EA5E9',
    'primary-rgb': '14, 165, 233',

    'accent-green': '#10B981',
    'accent-blue': '#3B82F6',
    'accent-amber': '#F59E0B',
    'accent-red': '#EF4444',

    'code-bg': '#F9FAFB',
    'code-text': '#1F2937',
  },
};

/**
 * Matrix Theme
 */
export const matrixTheme: Theme = {
  id: 'matrix',
  name: 'Matrix',
  description: 'Enter the Matrix',
  icon: '💚',
  colors: {
    'surface-primary': '#000000',
    'surface-secondary': '#001100',
    'surface-tertiary': '#002200',
    'surface-border': '#003300',

    'text-primary': '#00FF00',
    'text-secondary': '#00CC00',
    'text-tertiary': '#008800',

    primary: '#00FF00',
    'primary-rgb': '0, 255, 0',

    'accent-green': '#00FF00',
    'accent-blue': '#00DD00',
    'accent-amber': '#00FF00',
    'accent-red': '#00AA00',

    'code-bg': '#000000',
    'code-text': '#00FF00',
  },
};

/**
 * All available themes
 */
export const themes: Theme[] = [darkTheme, lightTheme, matrixTheme];

/**
 * Get theme by ID
 */
export function getThemeById(id: ThemeMode): Theme {
  return themes.find((theme) => theme.id === id) || darkTheme;
}

/**
 * Convert hex color to RGB values (for Tailwind opacity modifiers)
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;

  const r = parseInt(result[1] || '0', 16);
  const g = parseInt(result[2] || '0', 16);
  const b = parseInt(result[3] || '0', 16);

  return `${r} ${g} ${b}`;
}

/**
 * Apply theme to document
 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;

  // Apply each color as CSS variable
  Object.entries(theme.colors).forEach(([key, value]) => {
    // For Tailwind opacity modifiers to work, we need RGB format (e.g., "0 217 255")
    const rgbValue = hexToRgb(value);
    root.style.setProperty(`--color-${key}`, rgbValue);
  });

  // Update data-theme attribute for CSS selectors
  root.setAttribute('data-theme', theme.id);
}

/**
 * Get saved theme from localStorage
 */
export function getSavedTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';

  try {
    const saved = localStorage.getItem('theme');
    if (saved && ['dark', 'light', 'matrix'].includes(saved)) {
      return saved as ThemeMode;
    }
  } catch (error) {
    console.error('Failed to get saved theme:', error);
  }

  return 'dark';
}

/**
 * Save theme to localStorage
 */
export function saveTheme(theme: ThemeMode): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.error('Failed to save theme:', error);
  }
}
