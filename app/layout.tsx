/**
 * Root Layout
 * Main layout component that wraps all pages
 * Configures fonts, metadata, and global providers
 */

import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';
import { NavigationProvider, ThemeProvider } from '@/contexts';
import { NavigationWrapper, MinimalTopBar } from '@/components/navigation';
import { ThemeSwitcher } from '@/components/theme';
import { ConsoleMessages, KonamiCodeEasterEgg } from '@/components/easter-eggs';

/**
 * Font Configurations
 * Using next/font for optimal font loading and performance
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
});

/**
 * Metadata Configuration
 * SEO and social media metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [
    {
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
    },
  ],
  creator: SITE_CONFIG.author.name,
  publisher: SITE_CONFIG.author.name,

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: '/og-image.png', // We'll create this later
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: ['/og-image.png'],
    creator: '@JohnMarkCapones', // Update if you have a Twitter handle
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  // Manifest
  manifest: '/site.webmanifest',

  // Verification (add when you have the tokens)
  // verification: {
  //   google: 'google-site-verification-token',
  // },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/**
 * Viewport Configuration
 * Responsive and mobile-optimized viewport settings
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#0A0A0A' },
  ],
  colorScheme: 'dark',
};

/**
 * Root Layout Component
 *
 * @param children - Child components to render
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for potential external resources */}
        <link rel="dns-prefetch" href="https://api.github.com" />
      </head>
      <body className="relative min-h-screen antialiased">
        <ThemeProvider>
          <NavigationProvider>
            {/* Noise overlay for texture */}
            <div className="noise-overlay fixed inset-0 -z-10" />

            {/* Grid background */}
            <div className="grid-background fixed inset-0 -z-10 opacity-10" />

            {/* Minimal Top Bar (Desktop) */}
            <MinimalTopBar />

            {/* Main content */}
            <div className="relative z-0">{children}</div>

            {/* Navigation system (Command Palette + Mobile Dock) */}
            <NavigationWrapper />

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Easter Eggs */}
            <ConsoleMessages />
            <KonamiCodeEasterEgg />

            {/* Portal for modals, toasts, etc. */}
            <div id="portal-root" />
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
