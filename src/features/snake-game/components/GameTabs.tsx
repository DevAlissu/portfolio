import { memo } from 'react';
import type { Difficulty, GameMode } from '../types';
import { DIFFICULTY_LABELS, MODE_LABELS } from '../constants';

interface GameTabsProps {
  difficulty: Difficulty;
  mode: GameMode;
  disabled: boolean;
  onDifficulty: (d: Difficulty) => void;
  onMode: (m: GameMode) => void;
}

const DIFFICULTIES: Difficulty[] = ['easy', 'normal', 'hard'];
const MODES: GameMode[] = ['casual', 'competitive'];

export const GameTabs = memo(function GameTabs({
  difficulty,
  mode,
  disabled,
  onDifficulty,
  onMode,
}: GameTabsProps) {
  return (
    <div className="flex gap-1 font-['Fira_Code',sans-serif] text-xs">
      {DIFFICULTIES.map((d) => (
        <button
          key={d}
          onClick={() => onDifficulty(d)}
          disabled={disabled}
          className={`px-2.5 py-1.5 rounded transition-colors ${
            difficulty === d
              ? 'bg-[#43D9AD] text-[#020618]'
              : 'text-[#90a1b9] hover:text-[#f8fafc] disabled:opacity-40'
          }`}
        >
          {DIFFICULTY_LABELS[d]}
        </button>
      ))}
      <div className="w-px bg-[#314158] mx-1" />
      {MODES.map((m) => (
        <button
          key={m}
          onClick={() => onMode(m)}
          disabled={disabled}
          className={`px-2.5 py-1.5 rounded transition-colors ${
            mode === m
              ? 'bg-[#9d4edd] text-[#f8fafc]'
              : 'text-[#90a1b9] hover:text-[#f8fafc] disabled:opacity-40'
          }`}
        >
          {MODE_LABELS[m]}
        </button>
      ))}
    </div>
  );
});
