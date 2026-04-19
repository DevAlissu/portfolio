import { memo, useRef, useEffect } from 'react';
import type { Position, Food, Particle } from '../types';
import { useGameStore } from '../store/useGameStore';
import { gridToSvg, getSnakeDimensions } from '../utils/grid';
import { DIFFICULTY_SPEEDS, FOOD_TYPES, PARTICLE_LIFETIME_MS } from '../constants';

interface GameCanvasProps {
  food: Food | null;
  gridSize: number;
  particles: Particle[];
  shakeKey: number;
}

export const GameCanvas = memo(function GameCanvas({ food, gridSize, particles, shakeKey }: GameCanvasProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const { snakeStrokeWidth } = getSnakeDimensions(gridSize);
  const foodPos = food ? gridToSvg(food.x, food.y, gridSize) : null;
  const foodColor = food ? FOOD_TYPES[food.type].color : '#46ECD5';
  const containerRef = useRef<HTMLDivElement>(null);

  // trigger shake animation on key change
  useEffect(() => {
    if (!containerRef.current || shakeKey === 0) return;
    const el = containerRef.current;
    el.classList.remove('snake-shake');
    void el.offsetWidth;
    el.classList.add('snake-shake');
  }, [shakeKey]);

  useEffect(() => {
    let animId: number;

    const animate = () => {
      const { snake, prevSnake, lastTickTime, status, difficulty } = useGameStore.getState();
      const len = snake.length;
      const lastIdx = len - 1;
      const speed = DIFFICULTY_SPEEDS[difficulty];

      let renderSnake: Position[];

      if (status === 'playing' && lastTickTime > 0) {
        const progress = Math.min((performance.now() - lastTickTime) / speed, 1);

        renderSnake = snake.map((pos, i) => {
          if (i === 0) {
            const prev = prevSnake[0];
            if (prev) {
              return {
                x: prev.x + (pos.x - prev.x) * progress,
                y: prev.y + (pos.y - prev.y) * progress,
              };
            }
          }
          return pos;
        });

        const prevTail = prevSnake[lastIdx];
        const currTail = snake[lastIdx]!;
        if (prevTail && (prevTail.x !== currTail.x || prevTail.y !== currTail.y)) {
          renderSnake.push({
            x: currTail.x + (prevTail.x - currTail.x) * (1 - progress),
            y: currTail.y + (prevTail.y - currTail.y) * (1 - progress),
          });
        }
      } else {
        renderSnake = snake;
      }

      if (pathRef.current) {
        const points = renderSnake.map((s) => gridToSvg(s.x, s.y, gridSize));
        if (points.length > 0) {
          const first = points[0]!;
          let d = `M${first.x},${first.y}`;
          for (let i = 1; i < points.length; i++) {
            d += ` L${points[i]!.x},${points[i]!.y}`;
          }
          pathRef.current.setAttribute('d', d);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [gridSize]);

  return (
    <div ref={containerRef} className="bg-[#1d293d] rounded-lg shadow-[inset_1px_5px_11px_0px_rgba(2,18,27,0.71)] p-3 sm:p-6 w-full">
      <div className="relative bg-[#0a1628] rounded-sm overflow-hidden w-full max-w-[400px] aspect-square mx-auto">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            stroke="#43D9AD"
            strokeWidth={snakeStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {foodPos && (
            <g>
              <circle cx={foodPos.x} cy={foodPos.y} r="10.3456" fill={foodColor} opacity="0.1" />
              <circle cx={foodPos.x} cy={foodPos.y} r="7.34558" fill={foodColor} opacity="0.2" />
              <circle cx={foodPos.x} cy={foodPos.y} r="4" fill={foodColor} />
            </g>
          )}

          {particles.map((p) => {
            const pos = gridToSvg(p.x, p.y, gridSize);
            const angle = (p.id * 137.5) % 360;
            const rad = (angle * Math.PI) / 180;
            const dist = 18;
            const dx = Math.cos(rad) * dist;
            const dy = Math.sin(rad) * dist;
            return (
              <circle
                key={p.id}
                className="snake-particle"
                style={{
                  ['--px' as string]: `${dx}px`,
                  ['--py' as string]: `${dy}px`,
                  animationDuration: `${PARTICLE_LIFETIME_MS}ms`,
                }}
                cx={pos.x}
                cy={pos.y}
                r="3"
                fill={p.color}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
});
