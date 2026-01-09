/**
 * Step 2: Email Input
 */

'use client';

import { motion } from 'framer-motion';
import { UseFormRegister } from 'react-hook-form';
import { ContactFormData } from '@/lib/validations/contact';

interface StepEmailProps {
  register: UseFormRegister<ContactFormData>;
  error?: string;
  value?: string;
  onNext: () => void;
  onBack: () => void;
}

export function StepEmail({ register, error, value, onNext, onBack }: StepEmailProps) {
  const isValidEmail = value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValidEmail) {
      e.preventDefault();
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center p-8 rounded-2xl border border-surface-border bg-surface-secondary/30 backdrop-blur-sm"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mb-6 text-6xl"
      >
        📧
      </motion.div>

      {/* Question */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 text-center font-heading text-3xl font-bold text-text-primary md:text-4xl"
      >
        What's the best email to reach you?
      </motion.h2>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="relative">
          <input
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            autoFocus
            onKeyPress={handleKeyPress}
            className="w-full rounded-lg border border-surface-border bg-surface-secondary px-6 py-4 text-center text-lg text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />

          {/* Valid Checkmark */}
          {isValidEmail && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-green"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-center text-sm text-accent-red"
          >
            {error}
          </motion.p>
        )}

        {/* Helper Text */}
        {!error && (
          <p className="mt-2 text-center text-xs text-text-tertiary">
            We'll use this to respond to your message
          </p>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex gap-4"
      >
        <button
          onClick={onBack}
          className="rounded-lg border border-surface-border bg-surface-secondary/50 px-6 py-3 font-medium text-text-secondary transition-all hover:bg-surface-secondary hover:text-text-primary"
        >
          ← Back
        </button>

        <button
          onClick={onNext}
          disabled={!isValidEmail}
          className="rounded-lg bg-gradient-to-r from-primary to-accent-green px-8 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Next →
        </button>
      </motion.div>
    </motion.div>
  );
}
