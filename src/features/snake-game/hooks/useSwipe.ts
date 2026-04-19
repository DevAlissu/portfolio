import { useRef } from 'react';
import type { Direction } from '../types';

interface UseSwipeOptions {
  onSwipe: (direction: Direction) => void;
  enabled: boolean;
  threshold?: number;
}

export function useSwipe({ onSwipe, enabled, threshold = 30 }: UseSwipeOptions) {
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    if (!enabled) return;
    const t = e.touches[0];
    if (!t) return;
    startRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!enabled || !startRef.current) return;
    const t = e.changedTouches[0];
    if (!t) return;

    const dx = t.clientX - startRef.current.x;
    const dy = t.clientY - startRef.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) < threshold) {
      startRef.current = null;
      return;
    }

    if (absDx > absDy) {
      onSwipe(dx > 0 ? 'RIGHT' : 'LEFT');
    } else {
      onSwipe(dy > 0 ? 'DOWN' : 'UP');
    }
    startRef.current = null;
  };

  return { onTouchStart, onTouchEnd };
}
