/**
 * Animated Link Component
 * Next.js Link with Framer Motion micro-interactions
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Animated Link Props
 */
export interface AnimatedLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  /**
   * Enable hover lift animation
   * @default false
   */
  hoverLift?: boolean;

  /**
   * Enable hover scale animation
   * @default true
   */
  hoverScale?: boolean;

  /**
   * Disable animations
   * @default false
   */
  disableAnimations?: boolean;
}

/**
 * Animated Link Component
 *
 * Next.js Link with smooth hover animations
 *
 * Features:
 * - Smooth scale on hover
 * - Optional lift effect (translateY)
 * - Tap feedback
 * - Maintains Next.js Link functionality
 *
 * @example
 * ```tsx
 * <AnimatedLink href="/projects" hoverLift>
 *   View Projects
 * </AnimatedLink>
 * ```
 */
export function AnimatedLink({
  hoverLift = false,
  hoverScale = true,
  disableAnimations = false,
  className,
  children,
  ...props
}: AnimatedLinkProps) {
  if (disableAnimations) {
    return (
      <Link className={className} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <Link className={cn('inline-block', className)} {...props}>
      <motion.span
        className="block"
        whileHover={{
          scale: hoverScale ? 1.02 : 1,
          y: hoverLift ? -2 : 0,
          transition: { duration: 0.2, ease: [0, 0, 0.2, 1] },
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 },
        }}
      >
        {children}
      </motion.span>
    </Link>
  );
}
