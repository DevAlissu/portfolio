import { useEffect, useRef } from 'react';

const CHARS = ['0', '1'];
const FONT_SIZE = 14;
const COLUMN_WIDTH = 20;
const TRAIL_LENGTH = 6;
const COLOR_RGB = '70, 236, 213';
const SPEED_PX_PER_SEC = 220;

interface Column {
  headY: number; // continuous pixel position
  lastSlot: number;
  chars: string[];
}

interface CodeRainProps {
  className?: string;
}

export function CodeRain({ className = '' }: CodeRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let lastFrame = 0;
    let cols: Column[] = [];
    let columnCount = 0;
    let dpr = 1;

    const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]!;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columnCount = Math.floor(rect.width / COLUMN_WIDTH);
      cols = Array.from({ length: columnCount }, () => {
        const startY = Math.random() * -rect.height;
        return {
          headY: startY,
          lastSlot: Math.floor(startY / FONT_SIZE),
          chars: Array.from({ length: TRAIL_LENGTH }, randChar),
        };
      });
      ctx.font = `${FONT_SIZE}px 'Fira Code', monospace`;
      ctx.textBaseline = 'top';
    };

    const animate = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const dt = lastFrame === 0 ? 0 : (now - lastFrame) / 1000;
      lastFrame = now;

      ctx.clearRect(0, 0, rect.width, rect.height);

      for (let i = 0; i < columnCount; i++) {
        const col = cols[i]!;
        col.headY += SPEED_PX_PER_SEC * dt;

        // advance char stack when crossing a slot boundary
        const currentSlot = Math.floor(col.headY / FONT_SIZE);
        const slotsCrossed = currentSlot - col.lastSlot;
        if (slotsCrossed > 0) {
          for (let s = 0; s < slotsCrossed; s++) {
            col.chars.pop();
            col.chars.unshift(randChar());
          }
          col.lastSlot = currentSlot;
        }

        const x = i * COLUMN_WIDTH;
        for (let t = 0; t < TRAIL_LENGTH; t++) {
          const y = col.headY - t * FONT_SIZE;
          if (y < -FONT_SIZE || y > rect.height) continue;
          const alpha = ((TRAIL_LENGTH - t) / TRAIL_LENGTH) * 0.9;
          ctx.fillStyle = `rgba(${COLOR_RGB}, ${alpha})`;
          ctx.fillText(col.chars[t]!, x, y);
        }

        // respawn above the viewport once the trail has fully passed
        if (col.headY - TRAIL_LENGTH * FONT_SIZE > rect.height && Math.random() > 0.985) {
          col.headY = -FONT_SIZE * TRAIL_LENGTH;
          col.lastSlot = Math.floor(col.headY / FONT_SIZE);
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    resize();
    rafId = requestAnimationFrame(animate);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none w-full h-full opacity-[0.07] ${className}`}
    />
  );
}
