import { useCallback } from 'react';
import { useSnakeGame } from './hooks/useSnakeGame';
import { BOLT_VARIANTS } from './constants';
import type { Direction } from './types';
import { GameCanvas } from './components/GameCanvas';
import { GameOverlay } from './components/GameOverlay';
import { GameControls } from './components/GameControls';
import { ScoreDisplay } from './components/ScoreDisplay';
import { DecorativeBolt } from './components/DecorativeBolt';
import { GameTabs } from './components/GameTabs';

interface SnakeGameProps {
  className?: string;
}

export function SnakeGame({ className = '' }: SnakeGameProps) {
  const { status, score, food, gridSize, difficulty, mode, leaderboard, actions } =
    useSnakeGame();

  const handleDirectionClick = useCallback(
    (direction: Direction) => actions.setDirection(direction),
    [actions.setDirection],
  );

  const handleStartClick = useCallback(() => actions.startGame(), [actions.startGame]);

  const isPlaying = status === 'playing' || status === 'paused';

  return (
    <div
      className={`backdrop-blur-[32px] content-stretch flex flex-col lg:flex-row gap-4 sm:gap-6 items-start p-4 sm:p-8 relative rounded-lg min-w-0 ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(152.11deg, rgba(52, 3, 78, 0.7) 1.7049%, rgba(33, 2, 60, 0.09) 81.819%)',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#314158] border-solid inset-[-1px] pointer-events-none rounded-[9px]"
      />

      {BOLT_VARIANTS.map((variant) => (
        <DecorativeBolt key={variant.filterId} variant={variant} />
      ))}

      <div className="absolute inset-[-1px] pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.3)]" />

      <div className="relative flex flex-col gap-3">
        <GameTabs
          difficulty={difficulty}
          mode={mode}
          disabled={isPlaying}
          onDifficulty={actions.setDifficulty}
          onMode={actions.setMode}
        />

        <div className="relative">
          <GameCanvas food={food} gridSize={gridSize} />
          <GameOverlay
            status={status}
            score={score}
            mode={mode}
            leaderboard={leaderboard}
            onStart={handleStartClick}
            onSaveScore={actions.saveToLeaderboard}
          />

          {status === 'idle' && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
              <button
                onClick={handleStartClick}
                className="bg-[#ffb86a] hover:bg-[#ffb86a]/90 transition-colors px-6 py-2.5 rounded-lg font-['Fira_Code',sans-serif] font-[450] text-[#020618] text-sm"
              >
                iniciar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between w-full lg:w-[180px] gap-6">
        <div className="flex flex-col gap-6 w-full">
          <GameControls status={status} onDirection={handleDirectionClick} />
          <ScoreDisplay score={score} mode={mode} />
        </div>

        <button
          onClick={actions.resetGame}
          className="border border-[#f8fafc] hover:bg-[#f8fafc]/10 transition-colors px-3 py-2.5 rounded-lg font-['Fira_Code',sans-serif] text-[#f8fafc] text-sm w-full"
        >
          pular
        </button>
      </div>
    </div>
  );
}
