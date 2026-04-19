import { memo } from 'react';
import { FOOD_TO_WIN_CASUAL, COMBO_WINDOW_MS } from '../constants';
import type { GameMode } from '../types';

interface ScoreDisplayProps {
  score: number;
  mode: GameMode;
  combo: number;
  lastEatTime: number;
}

export const ScoreDisplay = memo(function ScoreDisplay({
  score,
  mode,
  combo,
  lastEatTime,
}: ScoreDisplayProps) {
  if (mode === 'competitive') {
    const showCombo = combo > 1;
    const multiplier = Math.min(combo, 5);
    return (
      <div className="w-full">
        <p className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-sm mb-1">
          // pontuacao
        </p>
        <p className="font-['Fira_Code',sans-serif] text-[#43D9AD] text-2xl font-bold">
          {score}
        </p>
        <div className="h-8 mt-2">
          {showCombo && (
            <div
              key={lastEatTime}
              className="snake-combo font-['Fira_Code',sans-serif] text-[#b14eff] text-xs inline-flex items-center gap-1.5"
              style={{ animationDuration: `${COMBO_WINDOW_MS}ms` }}
            >
              <span>combo x{multiplier}</span>
              <span className="snake-combo-bar" style={{ animationDuration: `${COMBO_WINDOW_MS}ms` }} />
            </div>
          )}
        </div>
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
          const filled = index < Math.min(score, FOOD_TO_WIN_CASUAL);
          const o = filled ? 1 : 0.3;
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
