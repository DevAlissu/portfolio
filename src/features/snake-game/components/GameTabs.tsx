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
    <div className="flex gap-1 items-center">
      {DIFFICULTIES.map((d) => (
        <button
          key={d}
          onClick={() => onDifficulty(d)}
          disabled={disabled}
          className={`snake-tab ${difficulty === d ? 'snake-tab-active-green' : ''}`}
        >
          {DIFFICULTY_LABELS[d]}
        </button>
      ))}
      <div className="w-px h-5 bg-[#314158] mx-1" />
      {MODES.map((m) => (
        <button
          key={m}
          onClick={() => onMode(m)}
          disabled={disabled}
          className={`snake-tab ${mode === m ? 'snake-tab-active-purple' : ''}`}
        >
          {MODE_LABELS[m]}
        </button>
      ))}
    </div>
  );
});
