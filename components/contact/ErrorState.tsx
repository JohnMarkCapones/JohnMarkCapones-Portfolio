/**
 * Error State Component
 * Displays error message when form submission fails
 */

'use client';

import { motion } from 'framer-motion';
import { CONTACT_INFO } from '@/lib/constants';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  onClose?: () => void;
}

export function ErrorState({ error, onRetry, onClose }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-[500px] flex-col items-center justify-center p-8 text-center"
    >
      {/* Error Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
        transition={{
          scale: { type: 'spring', stiffness: 200 },
          rotate: { duration: 0.5, delay: 0.2 },
        }}
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent-red/20 to-accent-red/10"
      >
        <svg
          className="h-12 w-12 text-accent-red"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </motion.div>

      {/* Error Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="mb-4 font-heading text-4xl font-bold text-text-primary">
          Transmission Failed
        </h2>
        <p className="mb-2 text-lg text-accent-red">
          Error Code: MESSAGE_SEND_FAILED
        </p>
        <p className="mb-8 max-w-md text-text-secondary">
          {error || 'An unexpected error occurred while sending your message. Please try again.'}
        </p>
      </motion.div>

      {/* Error Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-8 w-full max-w-md rounded-lg border border-accent-red/30 bg-accent-red/5 p-6"
      >
        <h3 className="mb-4 font-mono text-sm font-bold text-text-primary">
          Alternative Contact Methods:
        </h3>

        <div className="space-y-3 text-left">
          <div>
            <div className="mb-1 text-xs text-text-tertiary">Email Directly:</div>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="block font-mono text-sm text-primary hover:underline"
            >
              {CONTACT_INFO.email}
            </a>
          </div>

          <div>
            <div className="mb-1 text-xs text-text-tertiary">Call/Text:</div>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="block font-mono text-sm text-primary hover:underline"
            >
              {CONTACT_INFO.phone}
            </a>
          </div>

          <div>
            <div className="mb-1 text-xs text-text-tertiary">GitHub:</div>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-mono text-sm text-primary hover:underline"
            >
              @yourusername
            </a>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex gap-4"
      >
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-lg bg-gradient-to-r from-primary to-accent-green px-6 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
          >
            Retry Sending
          </button>
        )}

        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg border border-surface-border bg-surface-secondary/50 px-6 py-3 font-medium text-text-secondary transition-all hover:bg-surface-secondary hover:text-text-primary"
          >
            Close
          </button>
        )}
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 text-xs text-text-tertiary"
      >
        If the problem persists, please contact me directly via email
      </motion.p>
    </motion.div>
  );
}
