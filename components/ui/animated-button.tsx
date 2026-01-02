/**
 * Animated Button Component
 * Button with built-in Framer Motion micro-interactions
 */

'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonHoverAnimation, buttonTapAnimation } from '@/lib/animations';

/**
 * Animated Button Variants
 */
export type AnimatedButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type AnimatedButtonSize = 'sm' | 'md' | 'lg';

/**
 * Animated Button Props
 */
export interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'whileHover' | 'whileTap'> {
  /**
   * Button variant style
   * @default 'primary'
   */
  variant?: AnimatedButtonVariant;

  /**
   * Button size
   * @default 'md'
   */
  size?: AnimatedButtonSize;

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Disable animations
   * @default false
   */
  disableAnimations?: boolean;
}

/**
 * Animated Button Component
 *
 * Professional button with hover and tap animations
 *
 * Features:
 * - Smooth hover scale and shadow effects
 * - Tap feedback animation
 * - Multiple variants (primary, secondary, outline, ghost, link)
 * - Consistent with design system
 *
 * @example
 * ```tsx
 * <AnimatedButton variant="primary" size="lg">
 *   Click Me
 * </AnimatedButton>
 * ```
 */
export function AnimatedButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disableAnimations = false,
  className,
  children,
  ...props
}: AnimatedButtonProps) {
  // Variant styles
  const variantStyles: Record<AnimatedButtonVariant, string> = {
    primary:
      'bg-primary text-surface-primary hover:bg-primary/90 shadow-glow-sm hover:shadow-glow-md border-transparent',
    secondary:
      'bg-surface-secondary text-text-primary hover:bg-surface-tertiary border border-surface-border',
    outline:
      'bg-transparent text-primary hover:bg-primary/10 border border-primary hover:border-primary/80',
    ghost:
      'bg-transparent text-text-primary hover:bg-surface-secondary border-transparent',
    link:
      'bg-transparent text-primary hover:text-primary/80 underline-offset-4 hover:underline border-transparent p-0 h-auto',
  };

  // Size styles
  const sizeStyles: Record<AnimatedButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Base button styles
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  return (
    <motion.button
      whileHover={!disableAnimations && variant !== 'link' ? buttonHoverAnimation : undefined}
      whileTap={!disableAnimations && variant !== 'link' ? buttonTapAnimation : undefined}
      className={cn(
        baseStyles,
        variantStyles[variant],
        variant !== 'link' && sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
