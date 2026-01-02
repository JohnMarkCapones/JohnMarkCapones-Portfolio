/**
 * Konami Code Easter Egg Component
 * Triggers Matrix rain animation when Konami code is entered
 */

'use client';

import { useState } from 'react';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { MatrixRain } from './MatrixRain';
import { logEasterEgg, logAchievement } from '@/lib/console-art';

/**
 * Konami Code Easter Egg Component
 *
 * Listens for Konami code and shows Matrix rain animation
 */
export function KonamiCodeEasterEgg() {
  const [showMatrix, setShowMatrix] = useState(false);

  useKonamiCode({
    onSuccess: () => {
      // Log to console
      logEasterEgg('Konami Code', 'You entered the classic cheat code!');
      logAchievement('The One - Entered the Konami Code');

      // Show Matrix rain
      setShowMatrix(true);

      // Play sound if available (optional)
      try {
        const audio = new Audio('/sounds/matrix.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {
          // Ignore audio errors (might be blocked by browser)
        });
      } catch {
        // Ignore
      }
    },
  });

  return (
    <MatrixRain
      show={showMatrix}
      duration={5000}
      onComplete={() => setShowMatrix(false)}
    />
  );
}
