/**
 * Matrix Rain Component
 * Animated Matrix-style falling characters
 */

'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Matrix Rain Props
 */
export interface MatrixRainProps {
  /**
   * Show/hide the rain
   */
  show: boolean;

  /**
   * Duration in milliseconds
   * @default 5000
   */
  duration?: number;

  /**
   * Callback when animation ends
   */
  onComplete?: () => void;
}

/**
 * Matrix Rain Component
 *
 * Full-screen Matrix code rain animation
 */
export function MatrixRain({ show, duration = 5000, onComplete }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!show) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to use (Matrix katakana + numbers)
    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z:.="*+-<>¦';
    const charArray = chars.split('');

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Array to track Y position of each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start above screen
    }

    // Draw function
    function draw() {
      if (!ctx || !canvas) return;

      // Black background with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      ctx.fillStyle = '#00FF00';
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const dropY = drops[i] ?? 0;
        const y = dropY * fontSize;

        if (char) {
          ctx.fillText(char, x, y);
        }

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i] = dropY + 1;
      }
    }

    // Animation loop
    const interval = setInterval(draw, 50);

    // Auto-stop after duration
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onComplete?.();
    }, duration);

    // Cleanup
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [show, duration, onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      >
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Message overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative z-10 text-center"
        >
          <p className="mb-4 text-4xl font-bold text-[#00FF00] md:text-6xl">
            Wake up, Neo...
          </p>
          <p className="text-xl text-[#00FF00] md:text-2xl">
            The Matrix has you.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="mt-8 font-mono text-sm text-[#00FF00]"
          >
            Achievement Unlocked: The One
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
