/**
 * Scroll Reveal Component
 * Animate elements when they scroll into view
 */

'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeInUp, scrollViewport } from '@/lib/animations';

/**
 * Scroll Reveal Props
 */
export interface ScrollRevealProps {
  /**
   * Children to animate
   */
  children: ReactNode;

  /**
   * Animation variant to use
   * @default fadeInUp
   */
  variant?: Variants;

  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;

  /**
   * Custom className for the wrapper
   */
  className?: string;

  /**
   * Viewport configuration
   * @default scrollViewport
   */
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number;
  };

  /**
   * Disable animation
   * @default false
   */
  disabled?: boolean;
}

/**
 * Scroll Reveal Component
 *
 * Wraps children and animates them when they enter viewport
 *
 * @example
 * ```tsx
 * <ScrollReveal variant={fadeInUp} delay={0.2}>
 *   <div>Content here</div>
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  variant = fadeInUp,
  delay = 0,
  className,
  viewport = scrollViewport,
  disabled = false,
}: ScrollRevealProps) {
  // If disabled, render children without animation
  if (disabled) {
    return <>{children}</>;
  }

  // Apply delay to variant if provided
  const variantWithDelay = delay > 0
    ? {
        ...variant,
        visible: {
          ...variant.visible,
          transition: {
            ...(typeof variant.visible === 'object' && 'transition' in variant.visible
              ? variant.visible.transition
              : {}),
            delay,
          },
        },
      }
    : variant;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variantWithDelay}
      className={className}
    >
      {children}
    </motion.div>
  );
}
