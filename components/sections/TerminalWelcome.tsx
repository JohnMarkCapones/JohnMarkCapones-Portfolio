/**
 * Terminal Welcome Component
 * Animated welcome message with typing effect
 */

'use client';

import { useMultiLineTyping } from '@/hooks/useTypingEffect';

/**
 * Terminal Welcome Props
 */
export interface TerminalWelcomeProps {
  /**
   * Lines to type out
   */
  lines: string[];

  /**
   * Typing speed in ms per character
   * @default 20
   */
  speed?: number;

  /**
   * Delay between lines in ms
   * @default 100
   */
  lineDelay?: number;
}

/**
 * Terminal Welcome Component
 *
 * Displays welcome messages with sequential typing animation
 *
 * @example
 * ```tsx
 * <TerminalWelcome
 *   lines={['Welcome!', 'Type help for commands']}
 *   speed={20}
 *   lineDelay={100}
 * />
 * ```
 */
export function TerminalWelcome({ lines, speed = 20, lineDelay = 100 }: TerminalWelcomeProps) {
  const { lines: displayLines, isComplete } = useMultiLineTyping(lines, speed, lineDelay);

  return (
    <div className="space-y-1">
      {displayLines.map((line, index) => {
        const isLastLine = index === displayLines.length - 1;
        const showCursor = !isComplete && isLastLine;

        return (
          <div key={`welcome-${index}`} className="font-mono text-xs sm:text-sm text-text-secondary whitespace-nowrap">
            {line}
            {showCursor && <span className="animate-pulse ml-0.5">▊</span>}
          </div>
        );
      })}
    </div>
  );
}
