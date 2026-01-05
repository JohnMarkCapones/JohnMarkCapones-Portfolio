/**
 * Animated Input Components
 * Form inputs with animations (floating labels, focus glow, validation states)
 */

'use client';

import { useState, InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Animated Input Props
 */
export interface AnimatedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input label
   */
  label?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Success state
   */
  success?: boolean;

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Icon (left side)
   */
  icon?: React.ReactNode;
}

/**
 * Animated Input Component
 * Features: floating label, focus glow, validation states
 *
 * @example
 * ```tsx
 * <AnimatedInput
 *   label="Email"
 *   type="email"
 *   error={errors.email}
 * />
 * ```
 */
export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, success, size = 'md', icon, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const sizeClasses = {
      sm: 'h-10 text-sm',
      md: 'h-12 text-base',
      lg: 'h-14 text-lg',
    };

    const hasError = !!error;
    const isFloating = isFocused || hasValue || props.value;

    return (
      <div className="relative w-full">
        {/* Input container */}
        <div className="relative">
          {/* Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              'peer w-full rounded-lg border bg-surface-secondary px-4 transition-all duration-200',
              'outline-none',
              // Padding for icon
              icon && 'pl-10',
              // Size
              sizeClasses[size],
              // States
              !hasError &&
                !success &&
                'border-surface-border focus:border-primary focus:shadow-glow-sm',
              hasError && 'border-accent-red focus:border-accent-red focus:shadow-glow-red',
              success && 'border-accent-green focus:border-accent-green',
              // Disabled
              props.disabled && 'cursor-not-allowed opacity-50',
              className
            )}
            {...props}
          />

          {/* Floating Label */}
          {label && (
            <motion.label
              animate={{
                top: isFloating ? 0 : '50%',
                y: isFloating ? '-50%' : '-50%',
                scale: isFloating ? 0.85 : 1,
                left: isFloating ? (icon ? 12 : 16) : icon ? 40 : 16,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={cn(
                'pointer-events-none absolute origin-left px-1 transition-colors duration-200',
                'bg-surface-secondary',
                isFocused && !hasError && 'text-primary',
                !isFocused && !hasError && 'text-text-tertiary',
                hasError && 'text-accent-red'
              )}
            >
              {label}
            </motion.label>
          )}

          {/* Focus ring animation */}
          <AnimatePresence>
            {isFocused && !hasError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-primary/20"
              />
            )}
          </AnimatePresence>

          {/* Success checkmark */}
          {success && !hasError && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-green"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          )}
        </div>

        {/* Error message */}
        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <motion.p
                initial={{ x: -10 }}
                animate={{ x: [0, -5, 5, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
                className="mt-2 flex items-center gap-1 text-sm text-accent-red"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedInput.displayName = 'AnimatedInput';

/**
 * Animated Textarea Props
 */
export interface AnimatedTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  error?: string;
  success?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Animated Textarea Component
 */
export const AnimatedTextarea = forwardRef<HTMLTextAreaElement, AnimatedTextareaProps>(
  ({ label, error, success, size = 'md', className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const sizeClasses = {
      sm: 'min-h-[80px] text-sm',
      md: 'min-h-[120px] text-base',
      lg: 'min-h-[160px] text-lg',
    };

    const hasError = !!error;
    const isFloating = isFocused || hasValue || props.value;

    return (
      <div className="relative w-full">
        <div className="relative">
          <textarea
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              'peer w-full rounded-lg border bg-surface-secondary px-4 py-3 transition-all duration-200',
              'outline-none resize-y',
              sizeClasses[size],
              !hasError &&
                !success &&
                'border-surface-border focus:border-primary focus:shadow-glow-sm',
              hasError && 'border-accent-red focus:border-accent-red',
              success && 'border-accent-green focus:border-accent-green',
              props.disabled && 'cursor-not-allowed opacity-50',
              className
            )}
            {...props}
          />

          {label && (
            <motion.label
              animate={{
                top: isFloating ? 12 : 24,
                scale: isFloating ? 0.85 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={cn(
                'pointer-events-none absolute left-4 origin-top-left px-1 transition-colors duration-200',
                'bg-surface-secondary',
                isFocused && !hasError && 'text-primary',
                !isFocused && !hasError && 'text-text-tertiary',
                hasError && 'text-accent-red'
              )}
            >
              {label}
            </motion.label>
          )}
        </div>

        <AnimatePresence>
          {hasError && (
            <motion.p
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="mt-2 text-sm text-accent-red"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedTextarea.displayName = 'AnimatedTextarea';
