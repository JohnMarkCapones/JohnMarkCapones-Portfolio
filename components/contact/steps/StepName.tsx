/**
 * Step 1: Name Input
 */

'use client';

import { motion } from 'framer-motion';
import { UseFormRegister } from 'react-hook-form';
import { ContactFormData } from '@/lib/validations/contact';

interface StepNameProps {
  register: UseFormRegister<ContactFormData>;
  error?: string;
  value?: string;
  onNext: () => void;
}

export function StepName({ register, error, value, onNext }: StepNameProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value && value.length >= 2) {
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
      className="min-h-[400px] flex flex-col items-center justify-center p-8 rounded-2xl border border-surface-border bg-surface-secondary/30 backdrop-blur-sm"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mb-6 text-6xl"
      >
        👋
      </motion.div>

      {/* Question */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 text-center font-heading text-3xl font-bold text-text-primary md:text-4xl"
      >
        What's your name?
      </motion.h2>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md"
      >
        <input
          {...register('name')}
          type="text"
          placeholder="Your name"
          autoFocus
          onKeyPress={handleKeyPress}
          className="w-full rounded-lg border border-surface-border bg-surface-secondary px-6 py-4 text-center text-lg text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />

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
            Press <kbd className="rounded bg-surface-tertiary px-2 py-1 font-mono">Enter</kbd> to continue
          </p>
        )}
      </motion.div>

      {/* Next Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onNext}
        disabled={!value || value.length < 2}
        className="mt-8 rounded-lg bg-gradient-to-r from-primary to-accent-green px-8 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        Next →
      </motion.button>
    </motion.div>
  );
}
