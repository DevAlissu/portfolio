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
import { HighScoreBadge } from './components/HighScoreBadge';
import { ComboBadge } from './components/ComboBadge';
import { Countdown } from './components/Countdown';
import { PauseOverlay } from './components/PauseOverlay';
import { useSwipe } from './hooks/useSwipe';

interface SnakeGameProps {
  className?: string;
}

export function SnakeGame({ className = '' }: SnakeGameProps) {
  const {
    status,
    score,
    highScore,
    food,
    gridSize,
    difficulty,
    mode,
    leaderboard,
    combo,
    particles,
    shakeKey,
    actions,
  } = useSnakeGame();

  const { setDirection, beginCountdown } = actions;

  const handleDirectionClick = useCallback(
    (direction: Direction) => setDirection(direction),
    [setDirection],
  );

  const handleStartClick = useCallback(() => beginCountdown(), [beginCountdown]);

  const swipeHandlers = useSwipe({
    onSwipe: handleDirectionClick,
    enabled: status === 'playing',
  });

  const isPlaying = status === 'playing' || status === 'paused' || status === 'countdown';

  return (
    <div
      className={`backdrop-blur-[32px] content-stretch flex flex-col lg:flex-row gap-4 sm:gap-6 items-start p-4 sm:p-6 relative rounded-lg min-w-0 max-w-full ${className}`}
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

      <div className="relative flex flex-col gap-3 w-full lg:w-auto">
        <GameTabs
          difficulty={difficulty}
          mode={mode}
          disabled={isPlaying}
          onDifficulty={actions.setDifficulty}
          onMode={actions.setMode}
        />

        <div className="relative" {...swipeHandlers}>
          <GameCanvas
            food={food}
            gridSize={gridSize}
            particles={particles}
            shakeKey={shakeKey}
          />
          <GameOverlay
            status={status}
            score={score}
            mode={mode}
            leaderboard={leaderboard}
            onStart={handleStartClick}
            onSaveScore={actions.saveToLeaderboard}
          />

          {status === 'countdown' && <Countdown onFinish={actions.startGame} />}

          {status === 'paused' && (
            <PauseOverlay onResume={actions.resumeGame} onQuit={actions.resetGame} />
          )}

          {status === 'idle' && (
            <>
              {highScore > 0 && (
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6 pointer-events-none">
                  <HighScoreBadge highScore={highScore} />
                </div>
              )}
              <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2">
                <button
                  onClick={handleStartClick}
                  className="bg-[#ffb86a] hover:bg-[#ffb86a]/90 transition-colors px-6 py-2.5 rounded-lg font-['Fira_Code',sans-serif] font-[450] text-[#020618] text-sm focus-visible:outline-2 focus-visible:outline-[#f8fafc] focus-visible:outline-offset-2"
                >
                  iniciar
                </button>
              </div>
            </>
          )}

          {status === 'playing' && combo > 1 && (
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 pointer-events-none">
              <ComboBadge combo={combo} />
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
          className="border border-[#f8fafc] hover:bg-[#f8fafc]/10 transition-colors px-3 py-2.5 rounded-lg font-['Fira_Code',sans-serif] text-[#f8fafc] text-sm w-full focus-visible:outline-2 focus-visible:outline-[#ffb86a] focus-visible:outline-offset-2"
        >
          pular
        </button>
      </div>
    </div>
  );
}
