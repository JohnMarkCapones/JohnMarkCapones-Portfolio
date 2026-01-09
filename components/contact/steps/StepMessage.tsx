/**
 * Step 4: Message Input
 */

'use client';

import { motion } from 'framer-motion';
import { UseFormRegister } from 'react-hook-form';
import { ContactFormData } from '@/lib/validations/contact';

interface StepMessageProps {
  register: UseFormRegister<ContactFormData>;
  error?: string;
  value?: string;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function StepMessage({ register, error, value, onBack, isSubmitting }: StepMessageProps) {
  const charCount = value?.length || 0;
  const maxChars = 1000;
  const minChars = 10;
  const isValid = charCount >= minChars && charCount <= maxChars;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-[350px] md:min-h-[500px] flex flex-col items-center justify-center p-8 rounded-2xl border border-surface-border bg-surface-secondary/30 backdrop-blur-sm"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mb-6 text-6xl"
      >
        ✍️
      </motion.div>

      {/* Question */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-2 text-center font-heading text-3xl font-bold text-text-primary md:text-4xl"
      >
        Tell me more...
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8 text-center text-text-tertiary"
      >
        What would you like to discuss?
      </motion.p>

      {/* Textarea */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-2xl"
      >
        <textarea
          {...register('message')}
          placeholder="Type your message here..."
          autoFocus
          rows={8}
          maxLength={maxChars}
          className="w-full resize-none rounded-lg border border-surface-border bg-surface-secondary px-6 py-4 text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />

        {/* Character Counter */}
        <div className="mt-2 flex items-center justify-between text-xs">
          <div>
            {error && <span className="text-accent-red">{error}</span>}
            {!error && charCount > 0 && charCount < minChars && (
              <span className="text-text-tertiary">At least {minChars - charCount} more characters needed</span>
            )}
          </div>
          <span
            className={`font-mono ${
              charCount > maxChars
                ? 'text-accent-red'
                : charCount >= minChars
                ? 'text-accent-green'
                : 'text-text-tertiary'
            }`}
          >
            {charCount} / {maxChars}
          </span>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex gap-4"
      >
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="rounded-lg border border-surface-border bg-surface-secondary/50 px-6 py-3 font-medium text-text-secondary transition-all hover:bg-surface-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary to-accent-green px-8 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            <span>Send Message 🚀</span>
          )}

          {/* Animated Gradient Background */}
          {!isSubmitting && (
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent-green to-primary opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </button>
      </motion.div>

      {/* Helper Text */}
      {!isSubmitting && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-center text-xs text-text-tertiary"
        >
          Your message will be encrypted and sent securely
        </motion.p>
      )}
    </motion.div>
  );
}
