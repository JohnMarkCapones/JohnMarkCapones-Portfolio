/**
 * Animation Utilities
 * Reusable animation variants and configurations for Framer Motion
 */

import type { Variants } from 'framer-motion';

/**
 * Easing curves for smooth animations
 */
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  spring: { type: 'spring', stiffness: 100, damping: 15 },
  springBounce: { type: 'spring', stiffness: 300, damping: 20 },
} as const;

/**
 * Default transition configurations
 */
export const transitions = {
  fast: { duration: 0.2, ease: easings.easeOut },
  normal: { duration: 0.3, ease: easings.easeInOut },
  slow: { duration: 0.5, ease: easings.easeInOut },
  verySlow: { duration: 0.8, ease: easings.easeInOut },
  spring: easings.spring,
  springBounce: easings.springBounce,
} as const;

/**
 * Fade In Animation Variants
 * Simple fade in from opacity 0 to 1
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.normal,
  },
};

/**
 * Fade In Up Animation Variants
 * Fade in with upward movement
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

/**
 * Fade In Down Animation Variants
 * Fade in with downward movement
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

/**
 * Fade In Left Animation Variants
 * Fade in from left
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.slow,
  },
};

/**
 * Fade In Right Animation Variants
 * Fade in from right
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.slow,
  },
};

/**
 * Scale In Animation Variants
 * Scale from 0.8 to 1 with fade
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.slow,
  },
};

/**
 * Slide In Up Animation Variants
 * Slide in from bottom (full height)
 */
export const slideInUp: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: transitions.verySlow,
  },
};

/**
 * Stagger Container Variants
 * Parent container for staggered children animations
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger Container (Fast) Variants
 * Faster stagger timing
 */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

/**
 * Stagger Item Variants
 * Child items for stagger animations
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};

/**
 * Draw Line Animation (for SVG paths)
 */
export const drawLine: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, ease: 'easeInOut' },
      opacity: { duration: 0.3 },
    },
  },
};

/**
 * Hover Scale Animation
 * For interactive elements
 */
export const hoverScale = {
  scale: 1.05,
  transition: transitions.fast,
};

/**
 * Hover Lift Animation
 * Slight upward movement on hover
 */
export const hoverLift = {
  y: -4,
  transition: transitions.fast,
};

/**
 * Tap Scale Animation
 * For click/tap feedback
 */
export const tapScale = {
  scale: 0.95,
  transition: transitions.fast,
};

/**
 * Rotate In Animation Variants
 * Rotate and fade in
 */
export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: transitions.slow,
  },
};

/**
 * Blur In Animation Variants
 * Fade in with blur effect (CSS filter)
 */
export const blurIn: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: transitions.slow,
  },
};

/**
 * Get stagger transition
 * Helper to create custom stagger timing
 */
export function getStaggerTransition(staggerDelay: number = 0.1, childDelay: number = 0.1) {
  return {
    staggerChildren: staggerDelay,
    delayChildren: childDelay,
  };
}

/**
 * Get viewport config for scroll animations
 * Standard settings for InView trigger
 */
export const scrollViewport = {
  once: true, // Only animate once
  margin: '-100px', // Trigger 100px before entering viewport
  amount: 0.3, // Trigger when 30% visible
} as const;

/**
 * Viewport config for immediate trigger
 */
export const scrollViewportImmediate = {
  once: true,
  margin: '0px',
  amount: 0.1,
} as const;

/**
 * Card Hover Animation
 * Complete hover state for cards
 */
export const cardHoverAnimation = {
  scale: 1.02,
  y: -4,
  boxShadow: '0 20px 40px rgba(var(--color-primary-rgb), 0.15)',
  transition: transitions.normal,
};

/**
 * Button Hover Animation
 * Standard button hover state
 */
export const buttonHoverAnimation = {
  scale: 1.05,
  boxShadow: '0 8px 20px rgba(var(--color-primary-rgb), 0.3)',
  transition: transitions.fast,
};

/**
 * Button Tap Animation
 * Standard button press state
 */
export const buttonTapAnimation = {
  scale: 0.95,
  transition: transitions.fast,
};
