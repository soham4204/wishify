// src/components/birthday/ConfettiAnimation.js
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiAnimation = () => {
  useEffect(() => {
    const duration = 7 * 1000; // 7 seconds
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      // Launch a burst from left + right
      confetti({
        particleCount: 12,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      // Stop once duration is done
      if (Date.now() > end) clearInterval(interval);
    }, 250); // fire every 0.25s

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default ConfettiAnimation;
