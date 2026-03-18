import { create } from 'zustand';
import type { GameStore, Position, Direction, Difficulty, GameMode, LeaderboardEntry } from '../types';
import {
  GRID_SIZE,
  FOOD_TO_WIN_CASUAL,
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  OPPOSITE_DIRECTIONS,
  MAX_LEADERBOARD_ENTRIES,
} from '../constants';

function generateRandomFood(snake: Position[]): Position {
  let newFood: Position;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
}

function getStoredHighScore(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('snakeHighScore') || '0');
}

function saveHighScore(score: number) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('snakeHighScore', score.toString());
  }
}

function getStoredLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('snakeLeaderboard');
  if (!stored) return [];
  return JSON.parse(stored) as LeaderboardEntry[];
}

function saveLeaderboard(entries: LeaderboardEntry[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('snakeLeaderboard', JSON.stringify(entries));
  }
}

export const useGameStore = create<GameStore>((set, get) => ({
  status: 'idle',
  score: 0,
  highScore: getStoredHighScore(),
  snake: INITIAL_SNAKE,
  prevSnake: INITIAL_SNAKE,
  lastTickTime: 0,
  direction: INITIAL_DIRECTION,
  nextDirection: INITIAL_DIRECTION,
  directionQueue: [],
  food: generateRandomFood(INITIAL_SNAKE),
  gridSize: GRID_SIZE,
  difficulty: 'easy' as Difficulty,
  mode: 'casual' as GameMode,
  leaderboard: getStoredLeaderboard(),

  setDifficulty: (difficulty: Difficulty) => {
    const { status } = get();
    if (status !== 'idle') return;
    set({ difficulty });
  },

  setMode: (mode: GameMode) => {
    const { status } = get();
    if (status !== 'idle') return;
    set({ mode });
  },

  startGame: () => {
    set({
      status: 'playing',
      score: 0,
      snake: INITIAL_SNAKE,
      prevSnake: INITIAL_SNAKE,
      lastTickTime: performance.now(),
      direction: INITIAL_DIRECTION,
      nextDirection: INITIAL_DIRECTION,
      directionQueue: [],
      food: generateRandomFood(INITIAL_SNAKE),
    });
  },

  pauseGame: () => {
    if (get().status === 'playing') set({ status: 'paused' });
  },

  resumeGame: () => {
    if (get().status === 'paused') set({ status: 'playing' });
  },

  gameOver: () => {
    const { score, highScore } = get();
    const newHighScore = Math.max(score, highScore);
    if (newHighScore > highScore) saveHighScore(newHighScore);
    set({ status: 'game-over', highScore: newHighScore });
  },

  resetGame: () => {
    set({
      status: 'idle',
      score: 0,
      snake: INITIAL_SNAKE,
      prevSnake: INITIAL_SNAKE,
      lastTickTime: 0,
      direction: INITIAL_DIRECTION,
      nextDirection: INITIAL_DIRECTION,
      directionQueue: [],
      food: generateRandomFood(INITIAL_SNAKE),
    });
  },

  saveToLeaderboard: (name: string) => {
    const { score, difficulty, leaderboard } = get();
    const entry: LeaderboardEntry = {
      name: name.trim().slice(0, 20),
      score,
      difficulty,
      date: new Date().toISOString(),
    };
    const updated = [...leaderboard, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_LEADERBOARD_ENTRIES);
    saveLeaderboard(updated);
    set({ leaderboard: updated });
  },

  setDirection: (direction: Direction) => {
    const { direction: currentDirection, directionQueue, status } = get();
    if (status !== 'playing') return;

    const lastDirection =
      directionQueue.length > 0
        ? directionQueue[directionQueue.length - 1]
        : currentDirection;

    if (OPPOSITE_DIRECTIONS[direction] !== lastDirection && direction !== lastDirection) {
      set({ directionQueue: [...directionQueue, direction] });
    }
  },

  moveSnake: () => {
    const { snake, direction, directionQueue, food, status, mode } = get();
    if (status !== 'playing') return;

    let currentDirection = direction;
    let dirUpdate = {};
    if (directionQueue.length > 0) {
      const newQueue = [...directionQueue];
      currentDirection = newQueue.shift()!;
      dirUpdate = {
        direction: currentDirection,
        directionQueue: newQueue,
        nextDirection: currentDirection,
      };
    }

    const head = snake[0]!;
    let newHead: Position;

    switch (currentDirection) {
      case 'UP':
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case 'DOWN':
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case 'LEFT':
        newHead = { x: head.x - 1, y: head.y };
        break;
      case 'RIGHT':
        newHead = { x: head.x + 1, y: head.y };
        break;
    }

    if (
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE
    ) {
      get().gameOver();
      return;
    }

    if (snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
      get().gameOver();
      return;
    }

    const newSnake = [newHead, ...snake];
    const tickTime = performance.now();

    if (newHead.x === food.x && newHead.y === food.y) {
      const { score, highScore } = get();
      const newScore = score + 1;
      const newFood = generateRandomFood(newSnake);

      if (mode === 'casual' && newScore >= FOOD_TO_WIN_CASUAL) {
        const newHighScore = Math.max(newScore, highScore);
        if (newHighScore > highScore) saveHighScore(newHighScore);
        set({
          ...dirUpdate,
          status: 'victory',
          highScore: newHighScore,
          score: newScore,
          snake: newSnake,
          prevSnake: snake,
          lastTickTime: tickTime,
          food: newFood,
        });
      } else {
        set({
          ...dirUpdate,
          score: newScore,
          snake: newSnake,
          prevSnake: snake,
          lastTickTime: tickTime,
          food: newFood,
        });
      }
    } else {
      newSnake.pop();
      set({
        ...dirUpdate,
        snake: newSnake,
        prevSnake: snake,
        lastTickTime: tickTime,
      });
    }
  },
}));
