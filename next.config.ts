import type { NextConfig } from 'next';

/**
 * Next.js Configuration
 * Production-grade configuration with optimizations
 *
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 */
const nextConfig: NextConfig = {
  /* Core Settings */
  reactStrictMode: true,
  poweredByHeader: false,

  /* Performance Optimizations */
  compress: true,

  /* Image Optimization */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800, // 1 week (7 days)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add domains when using external images
    // domains: ['example.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },

  /* Experimental Features */
  experimental: {
    // Enable optimizations
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'gsap'],
  },

  /* TypeScript */
  typescript: {
    // Fail build on type errors in production
    ignoreBuildErrors: false,
  },

  /* Environment Variables */
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://capdev.tech',
  },

  /* Headers for Security and Performance */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security Headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Content Security Policy - Protect against XSS, clickjacking, and code injection
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://github.com https://raw.githubusercontent.com https://avatars.githubusercontent.com https://cdn.simpleicons.org https://*.vercel-insights.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://api.github.com https://*.vercel-insights.com https://vercel.live",
              "frame-src 'self' https://vercel.live",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          // HTTP Strict Transport Security - Force HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  /* Redirects (if needed) */
  async redirects() {
    return [
      // Example: Redirect /resume to /system-info
      {
        source: '/resume',
        destination: '/system-info',
        permanent: true,
      },
    ];
  },

  /* Rewrites (if needed for API proxy) */
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://api.example.com/:path*',
  //     },
  //   ];
  // },
};

export default nextConfig;
