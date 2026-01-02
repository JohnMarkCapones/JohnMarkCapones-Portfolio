/**
 * Application Constants
 * Centralized configuration and constant values
 */

import type { NavItem, SocialLink } from '@/types';

/**
 * Site metadata
 */
export const SITE_CONFIG = {
  name: 'John Mark Capones',
  title: 'John Mark Capones | Aspiring Developer & Cloud Engineer',
  description:
    'Professional portfolio of John Mark Capones - Aspiring Software Developer specializing in DevOps, Cloud Engineering, and Full-Stack Development',
  url: 'https://capdev.tech',
  author: {
    name: 'John Mark Capones',
    email: 'johnmarkcapones1@gmail.com',
    url: 'https://capdev.tech',
  },
  keywords: [
    'John Mark Capones',
    'Software Developer',
    'DevOps Engineer',
    'Cloud Engineer',
    'Full-Stack Developer',
    'Next.js',
    'React',
    'Laravel',
    'AWS',
    'Docker',
    'Kubernetes',
  ],
} as const;

/**
 * Navigation items
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: 'home',
    description: 'Back to home',
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: 'folder',
    description: 'View my work',
  },
  {
    label: 'System Info',
    href: '/system-info',
    icon: 'file',
    description: 'Skills and resume',
  },
  {
    label: 'Stats',
    href: '/stats',
    icon: 'chart',
    description: 'Metrics dashboard',
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: 'mail',
    description: 'Get in touch',
  },
];

/**
 * Social media links
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/JohnMarkCapones',
    icon: 'github',
    username: 'JohnMarkCapones',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/john-mark-capones-66b6b8255/',
    icon: 'linkedin',
    username: 'john-mark-capones',
  },
  {
    name: 'Email',
    url: 'mailto:johnmarkcapones1@gmail.com',
    icon: 'mail',
    username: 'johnmarkcapones1@gmail.com',
  },
];

/**
 * Animation durations (in seconds)
 */
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.6,
  verySlow: 1.0,
} as const;

/**
 * Breakpoints (matches Tailwind config)
 */
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  xl: 1440,
} as const;

/**
 * Easter egg codes
 */
export const EASTER_EGGS = {
  konami: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
} as const;

/**
 * Feature flags for progressive rollout
 */
export const FEATURES = {
  particleSystem: true,
  terminalLanding: true,
  commandPalette: true,
  easterEggs: true,
  metricsEstimated: true, // Use estimated metrics vs. real
  soundEffects: false, // Disabled by default
} as const;

/**
 * API endpoints (for GitHub integration, etc.)
 */
export const API_ENDPOINTS = {
  github: {
    user: 'https://api.github.com/users/JohnMarkCapones',
    repos: 'https://api.github.com/users/JohnMarkCapones/repos',
    contribution: (username: string) =>
      `https://github-contributions-api.jogruber.de/v4/${username}`,
  },
} as const;

/**
 * Performance thresholds
 */
export const PERFORMANCE = {
  particleCount: {
    mobile: 1000,
    tablet: 3000,
    desktop: 10000,
  },
  imageLazyLoadOffset: 100, // pixels
  scrollThrottleMs: 16, // ~60fps
} as const;

/**
 * Contact information
 */
export const CONTACT_INFO = {
  email: 'johnmarkcapones1@gmail.com',
  phone: '09512858784',
  location: 'Rodriguez, Rizal, Philippines',
  timezone: 'Asia/Manila',
} as const;

/**
 * Analytics and monitoring (configure based on deployment)
 */
export const ANALYTICS = {
  enabled: process.env.NODE_ENV === 'production',
  vercel: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true',
} as const;
