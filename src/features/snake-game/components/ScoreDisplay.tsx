import { memo } from 'react';
import { FOOD_TO_WIN_CASUAL } from '../constants';
import type { GameMode } from '../types';

interface ScoreDisplayProps {
  score: number;
  mode: GameMode;
}

export const ScoreDisplay = memo(function ScoreDisplay({ score, mode }: ScoreDisplayProps) {
  if (mode === 'competitive') {
    return (
      <div className="w-full">
        <p className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-sm mb-1">
          // pontuacao
        </p>
        <p className="font-['Fira_Code',sans-serif] text-[#43D9AD] text-2xl font-bold">
          {score}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <p className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-sm mb-2">
        // pontos restantes
      </p>
      <svg
        className="w-full h-auto"
        viewBox="0 0 116 68"
        fill="none"
        preserveAspectRatio="xMinYMin meet"
      >
        {Array.from({ length: FOOD_TO_WIN_CASUAL }).map((_, index) => {
          const col = index % 5;
          const row = Math.floor(index / 5);
          const cx = col * 24 + 10;
          const cy = row * 24 + 10;
          const o = index < score ? 1 : 0.3;
          return (
            <g key={index} opacity={o}>
              <circle cx={cx} cy={cy} r="10" fill="#46ECD5" opacity="0.1" />
              <circle cx={cx} cy={cy} r="7" fill="#46ECD5" opacity="0.2" />
              <circle cx={cx} cy={cy} r="4" fill="#46ECD5" />
            </g>
          );
        })}
      </svg>
    </div>
  );
});
