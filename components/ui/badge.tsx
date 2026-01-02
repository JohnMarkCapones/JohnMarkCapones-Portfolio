/**
 * Badge Component
 * Small label component with variants for different use cases
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Badge Variants Configuration
 */
const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        // Primary badge with cyan color
        primary: 'bg-primary/10 text-primary ring-1 ring-primary/20',

        // Secondary badge
        secondary: 'bg-surface-tertiary text-text-secondary ring-1 ring-surface-border',

        // Success badge (green)
        success: 'bg-accent-green/10 text-accent-green ring-1 ring-accent-green/20',

        // Warning badge (amber)
        warning: 'bg-accent-amber/10 text-accent-amber ring-1 ring-accent-amber/20',

        // Error/destructive badge (red)
        destructive: 'bg-accent-red/10 text-accent-red ring-1 ring-accent-red/20',

        // Outline badge
        outline: 'border border-surface-border bg-transparent text-text-primary',

        // Glow badge with animation
        glow: 'bg-primary/20 text-primary ring-2 ring-primary/30 shadow-glow-sm animate-pulse-slow',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/**
 * Badge Props
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Icon to display before text
   */
  icon?: React.ReactNode;

  /**
   * Dot indicator
   */
  dot?: boolean;

  /**
   * Dot color (inherits variant color if not specified)
   */
  dotColor?: string;
}

/**
 * Badge Component
 *
 * @example
 * ```tsx
 * <Badge variant="primary">Next.js</Badge>
 * <Badge variant="success" dot>Live</Badge>
 * <Badge variant="glow">Featured</Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, icon, dot, dotColor, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn('h-1.5 w-1.5 rounded-full', dotColor || 'bg-current')}
            aria-hidden="true"
          />
        )}
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
