/**
 * Page Transition Component
 * Smooth transitions between routes with Framer Motion
 */

'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Page Transition Props
 */
export interface PageTransitionProps {
  /**
   * Page content to animate
   */
  children: ReactNode;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Transition variant
   * @default 'fade'
   */
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'scale';
}

/**
 * Page transition variants
 */
const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

/**
 * Page Transition Component
 *
 * Wraps page content with smooth enter/exit animations
 *
 * @example
 * ```tsx
 * <PageTransition variant="slideUp">
 *   <YourPageContent />
 * </PageTransition>
 * ```
 */
export function PageTransition({
  children,
  className,
  variant = 'fade',
}: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[variant]}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
