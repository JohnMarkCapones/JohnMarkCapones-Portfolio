/**
 * Success State Component
 * Displays success message after form submission
 */

'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SuccessStateProps {
  name: string;
  messageId: string;
  onClose?: () => void;
}

export function SuccessState({ name, messageId, onClose }: SuccessStateProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="flex min-h-[350px] md:min-h-[500px] flex-col items-center justify-center p-8 text-center"
    >
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#00D9FF', '#00FF94', '#FFB800'][Math.floor(Math.random() * 3)],
              }}
              initial={{ y: -10, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 20,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeIn',
              }}
            />
          ))}
        </div>
      )}

      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent-green/20 to-accent-green/10"
      >
        <motion.svg
          className="h-12 w-12 text-accent-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="mb-4 font-heading text-4xl font-bold text-text-primary">
          Message Sent! 🚀
        </h2>
        <p className="mb-2 text-lg text-text-secondary">
          Thanks, <span className="text-primary">{name}</span>!
        </p>
        <p className="mb-8 text-text-tertiary">
          Your message has been successfully transmitted.
          <br />
          I'll get back to you within <span className="font-mono text-primary">24-48 hours</span>.
        </p>
      </motion.div>

      {/* Message Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-8 rounded-lg border border-surface-border bg-surface-secondary/30 p-6 font-mono text-sm"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-text-tertiary">Message ID:</span>
          <span className="text-primary">{messageId}</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-4">
          <span className="text-text-tertiary">Status:</span>
          <span className="text-accent-green">✓ Delivered</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-4">
          <span className="text-text-tertiary">Response ETA:</span>
          <span className="text-text-secondary">24-48 hours</span>
        </div>
      </motion.div>

      {/* Action Button */}
      {onClose && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onClose}
          className="rounded-lg border border-primary/30 bg-primary/10 px-6 py-3 font-medium text-primary transition-all hover:bg-primary/20 hover:border-primary/50"
        >
          Send Another Message
        </motion.button>
      )}

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-xs text-text-tertiary"
      >
        Check your spam folder if you don't receive a response
      </motion.p>
    </motion.div>
  );
}
