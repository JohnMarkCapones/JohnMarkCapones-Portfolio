/**
 * Laser Flow to Terminal
 * Wraps LaserFlow and positions it to flow into the terminal component
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { LaserFlow } from './LaserFlow';
import { cn } from '@/lib/utils';

export interface LaserFlowToTerminalProps {
  /**
   * Selector for the terminal element to target
   * @default '[data-terminal]'
   */
  terminalSelector?: string;
  /**
   * Laser color
   * @default '#00D9FF' (matches your primary color)
   */
  color?: string;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Calculates the offset needed to make the laser hit the center of the target element
 */
function calculateBeamOffset(
  containerRect: DOMRect,
  targetRect: DOMRect
): { horizontal: number; vertical: number } {
  // Get center of target relative to container
  const targetCenterX = targetRect.left + targetRect.width / 2 - containerRect.left;
  const targetCenterY = targetRect.top + targetRect.height / 2 - containerRect.top;

  // Convert to fraction (0-1) where 0.5 = center
  // Laser Flow uses offset where 0 = left/top, 1 = right/bottom
  // We want the beam to hit the center, so we calculate the offset needed
  const horizontal = targetCenterX / containerRect.width;
  const vertical = 1 - targetCenterY / containerRect.height; // Invert Y (0 = top, 1 = bottom)

  return { horizontal, vertical };
}

export function LaserFlowToTerminal({
  terminalSelector = '[data-terminal]',
  color = '#00D9FF',
  className
}: LaserFlowToTerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [beamOffset, setBeamOffset] = useState({ horizontal: 0.5, vertical: 0.5 });

  useEffect(() => {
    const updatePosition = () => {
      const container = containerRef.current;
      if (!container) return;

      const terminal = document.querySelector(terminalSelector);
      if (!terminal) return;

      const containerRect = container.getBoundingClientRect();
      const targetRect = terminal.getBoundingClientRect();

      const offset = calculateBeamOffset(containerRect, targetRect);
      setBeamOffset(offset);
    };

    // Initial calculation
    updatePosition();

    // Update on resize/scroll
    const resizeObserver = new ResizeObserver(updatePosition);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [terminalSelector]);

  return (
    <div
      ref={containerRef}
      className={cn('fixed inset-0 pointer-events-none z-40', className)}
    >
      <LaserFlow
        horizontalBeamOffset={beamOffset.horizontal}
        verticalBeamOffset={beamOffset.vertical}
        color={color}
        flowSpeed={0.5}
        verticalSizing={2.5}
        horizontalSizing={0.6}
        fogIntensity={0.7}
        wispIntensity={8.0}
        flowStrength={0.6}
      />
    </div>
  );
}
