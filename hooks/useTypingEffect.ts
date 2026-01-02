/**
 * useTypingEffect Hook
 * Creates realistic typing animation effect
 */

import { useState, useEffect, useRef } from 'react';

export interface TypingEffectOptions {
  /**
   * Text to type out
   */
  text: string;

  /**
   * Typing speed in milliseconds
   */
  speed?: number;

  /**
   * Delay before starting
   */
  delay?: number;

  /**
   * Whether to show cursor
   */
  showCursor?: boolean;

  /**
   * Callback when typing is complete
   */
  onComplete?: () => void;
}

/**
 * Hook for creating typing animation effect
 *
 * @example
 * ```tsx
 * const { displayText, isComplete } = useTypingEffect({
 *   text: 'Hello, World!',
 *   speed: 50,
 *   delay: 500,
 * });
 * ```
 */
export function useTypingEffect({
  text,
  speed = 50,
  delay = 0,
  onComplete,
}: TypingEffectOptions) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    // Initial delay
    const delayTimeout = setTimeout(() => {
      setCurrentIndex(0);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [delay]);

  useEffect(() => {
    if (currentIndex === 0 && !hasStarted.current) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return {
    displayText,
    isComplete,
    reset: () => {
      setDisplayText('');
      setCurrentIndex(0);
      setIsComplete(false);
      hasStarted.current = false;
    },
  };
}

/**
 * Hook for typing multiple lines sequentially
 */
export function useMultiLineTyping(lines: string[], speed = 50, lineDelay = 500) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const currentLine = lines[currentLineIndex] || '';

  const { displayText, isComplete } = useTypingEffect({
    text: currentLine,
    speed,
    delay: currentLineIndex === 0 ? 0 : lineDelay,
    onComplete: () => {
      if (currentLineIndex < lines.length - 1) {
        setCompletedLines((prev) => [...prev, currentLine]);
        setCurrentLineIndex((prev) => prev + 1);
      }
    },
  });

  const allLines = [...completedLines, displayText];
  const isAllComplete = currentLineIndex === lines.length - 1 && isComplete;

  return {
    lines: allLines,
    isComplete: isAllComplete,
    currentLineIndex,
  };
}
