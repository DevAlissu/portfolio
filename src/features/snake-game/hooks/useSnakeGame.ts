import { useEffect, useCallback, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { FOOD_TO_WIN_CASUAL, DIFFICULTY_SPEEDS } from '../constants';
import type { Direction } from '../types';

export function useSnakeGame() {
  const status = useGameStore((s) => s.status);
  const score = useGameStore((s) => s.score);
  const highScore = useGameStore((s) => s.highScore);
  const food = useGameStore((s) => s.food);
  const gridSize = useGameStore((s) => s.gridSize);
  const difficulty = useGameStore((s) => s.difficulty);
  const mode = useGameStore((s) => s.mode);
  const leaderboard = useGameStore((s) => s.leaderboard);
  const combo = useGameStore((s) => s.combo);
  const particles = useGameStore((s) => s.particles);
  const shakeKey = useGameStore((s) => s.shakeKey);
  const startGame = useGameStore((s) => s.startGame);
  const beginCountdown = useGameStore((s) => s.beginCountdown);
  const pauseGame = useGameStore((s) => s.pauseGame);
  const resumeGame = useGameStore((s) => s.resumeGame);
  const resetGame = useGameStore((s) => s.resetGame);
  const setDirection = useGameStore((s) => s.setDirection);
  const setDifficulty = useGameStore((s) => s.setDifficulty);
  const setMode = useGameStore((s) => s.setMode);
  const saveToLeaderboard = useGameStore((s) => s.saveToLeaderboard);

  const statusRef = useRef(status);
  statusRef.current = status;

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === ' ' || key === 'spacebar') {
        if (statusRef.current === 'playing' || statusRef.current === 'paused') {
          event.preventDefault();
          if (statusRef.current === 'playing') pauseGame();
          else resumeGame();
        }
        return;
      }

      if (statusRef.current !== 'playing') return;
      event.preventDefault();

      const keyMap: Record<string, Direction> = {
        arrowup: 'UP',
        w: 'UP',
        arrowdown: 'DOWN',
        s: 'DOWN',
        arrowleft: 'LEFT',
        a: 'LEFT',
        arrowright: 'RIGHT',
        d: 'RIGHT',
      };

      const dir = keyMap[key];
      if (dir) setDirection(dir);
    },
    [setDirection, pauseGame, resumeGame],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const speed = DIFFICULTY_SPEEDS[difficulty];

  useEffect(() => {
    if (status !== 'playing') return;

    const gameInterval = setInterval(() => {
      useGameStore.getState().moveSnake();
    }, speed);

    return () => clearInterval(gameInterval);
  }, [status, speed]);

  const remainingFood = mode === 'casual' ? Math.max(0, FOOD_TO_WIN_CASUAL - score) : null;

  return {
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
    remainingFood,
    actions: {
      startGame,
      beginCountdown,
      pauseGame,
      resumeGame,
      resetGame,
      setDirection,
      setDifficulty,
      setMode,
      saveToLeaderboard,
    },
  };
}
