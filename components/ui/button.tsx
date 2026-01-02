/**
 * Button Component
 * Reusable button with multiple variants and sizes
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Button Variants Configuration
 * Defines all possible button styles and sizes
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary',
  {
    variants: {
      variant: {
        // Primary button with glow effect
        primary:
          'bg-primary text-surface-primary shadow-glow-sm hover:bg-primary/90 hover:shadow-glow-md active:scale-95',

        // Secondary button with border
        secondary:
          'border border-surface-border bg-surface-secondary hover:bg-surface-tertiary active:scale-95',

        // Ghost button with minimal styling
        ghost: 'hover:bg-surface-secondary active:scale-95',

        // Outline button
        outline:
          'border border-primary text-primary hover:bg-primary/10 active:scale-95',

        // Destructive button
        destructive:
          'bg-accent-red text-white hover:bg-accent-red/90 active:scale-95',

        // Link-styled button
        link: 'text-primary underline-offset-4 hover:underline',

        // Glow button with strong effect
        glow: 'bg-primary text-surface-primary shadow-glow-md hover:shadow-glow-lg animate-glow',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        xl: 'h-14 rounded-lg px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

/**
 * Button Props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, renders as a Slot component for composition
   */
  asChild?: boolean;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Icon to display before children
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display after children
   */
  rightIcon?: React.ReactNode;
}

/**
 * Button Component
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">
 *   Click me
 * </Button>
 *
 * <Button variant="outline" leftIcon={<Icon />}>
 *   With Icon
 * </Button>
 *
 * <Button loading>
 *   Loading...
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
