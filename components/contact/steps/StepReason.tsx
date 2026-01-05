/**
 * Step 3: Reason Selection
 */

'use client';

import { motion } from 'framer-motion';
import { ContactReason, contactReasons } from '@/lib/validations/contact';

interface StepReasonProps {
  value?: ContactReason;
  error?: string;
  onChange: (value: ContactReason) => void;
  onBack: () => void;
}

export function StepReason({ value, error, onChange, onBack }: StepReasonProps) {
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
        💼
      </motion.div>

      {/* Question */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 text-center font-heading text-3xl font-bold text-text-primary md:text-4xl"
      >
        What brings you here today?
      </motion.h2>

      {/* Reason Options */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {contactReasons.map((reason, index) => (
          <motion.button
            key={reason.value}
            type="button"
            onClick={() => onChange(reason.value)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative overflow-hidden rounded-xl border p-6 text-left transition-all ${
              value === reason.value
                ? 'border-primary bg-primary/10'
                : 'border-surface-border bg-surface-secondary/50 hover:border-primary/50 hover:bg-surface-secondary'
            }`}
          >
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-green/5 opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="mb-3 text-4xl">{reason.icon}</div>

              {/* Label */}
              <div className="mb-1 font-heading text-xl font-bold text-text-primary">
                {reason.label}
              </div>

              {/* Description */}
              <div className="text-sm text-text-tertiary">{reason.description}</div>
            </div>

            {/* Selected Indicator */}
            {value === reason.value && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-sm text-accent-red"
        >
          {error}
        </motion.p>
      )}

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onBack}
        className="mt-8 rounded-lg border border-surface-border bg-surface-secondary/50 px-6 py-3 font-medium text-text-secondary transition-all hover:bg-surface-secondary hover:text-text-primary"
      >
        ← Back
      </motion.button>

      {/* Helper Text */}
      <p className="mt-4 text-center text-xs text-text-tertiary">
        Select an option to continue automatically
      </p>
    </motion.div>
  );
}
