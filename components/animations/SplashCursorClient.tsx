/**
 * Client-only wrapper for SplashCursor.
 * Uses dynamic import with ssr: false so it can run in a Server Component layout.
 */

'use client';

import dynamic from 'next/dynamic';

const SplashCursor = dynamic(
  () => import('@/components/animations').then((mod) => ({ default: mod.SplashCursor })),
  { ssr: false }
);

export function SplashCursorClient() {
  return <SplashCursor className="-z-[1]" />;
}
