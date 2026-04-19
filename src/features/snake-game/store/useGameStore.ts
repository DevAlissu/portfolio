import { create } from 'zustand';
import type {
  GameStore,
  Position,
  Direction,
  Difficulty,
  GameMode,
  LeaderboardEntry,
  Food,
  FoodType,
  Particle,
} from '../types';
import {
  GRID_SIZE,
  FOOD_TO_WIN_CASUAL,
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  OPPOSITE_DIRECTIONS,
  MAX_LEADERBOARD_ENTRIES,
  FOOD_TYPES,
  COMBO_WINDOW_MS,
  PARTICLE_LIFETIME_MS,
} from '../constants';

function pickFoodType(): FoodType {
  const totalWeight = Object.values(FOOD_TYPES).reduce((s, t) => s + t.weight, 0);
  let r = Math.random() * totalWeight;
  for (const [type, cfg] of Object.entries(FOOD_TYPES)) {
    r -= cfg.weight;
    if (r <= 0) return type as FoodType;
  }
  return 'function';
}

function generateRandomFood(snake: Position[]): Food | null {
  const totalCells = GRID_SIZE * GRID_SIZE;
  if (snake.length >= totalCells) return null;

  const availableCells: Position[] = [];
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (!snake.some((seg) => seg.x === x && seg.y === y)) {
        availableCells.push({ x, y });
      }
    }
  }
  const pos = availableCells[Math.floor(Math.random() * availableCells.length)];
  return pos ? { ...pos, type: pickFoodType() } : null;
}

function getStoredHighScore(): number {
  if (typeof window === 'undefined') return 0;
  try {
    return parseInt(localStorage.getItem('snakeHighScore') || '0');
  } catch {
    return 0;
  }
}

function saveHighScore(score: number) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('snakeHighScore', score.toString());
  } catch {
    // localStorage full or disabled
  }
}

function getStoredLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('snakeLeaderboard');
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as LeaderboardEntry[]) : [];
  } catch {
    return [];
  }
}

function saveLeaderboard(entries: LeaderboardEntry[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('snakeLeaderboard', JSON.stringify(entries));
  } catch {
    // localStorage full or disabled
  }
}

let particleIdSeq = 0;

function spawnParticles(x: number, y: number, color: string, count = 8): Particle[] {
  const now = performance.now();
  return Array.from({ length: count }, () => ({
    id: ++particleIdSeq,
    x,
    y,
    color,
    createdAt: now,
  }));
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
  combo: 0,
  lastEatTime: 0,
  particles: [],
  shakeKey: 0,

  setDifficulty: (difficulty: Difficulty) => {
    const { status } = get();
    if (status === 'playing' || status === 'paused' || status === 'countdown') return;
    set({ difficulty });
  },

  setMode: (mode: GameMode) => {
    const { status } = get();
    if (status === 'playing' || status === 'paused' || status === 'countdown') return;
    set({ mode });
  },

  beginCountdown: () => {
    set({
      status: 'countdown',
      score: 0,
      snake: INITIAL_SNAKE,
      prevSnake: INITIAL_SNAKE,
      lastTickTime: 0,
      direction: INITIAL_DIRECTION,
      nextDirection: INITIAL_DIRECTION,
      directionQueue: [],
      food: generateRandomFood(INITIAL_SNAKE),
      combo: 0,
      lastEatTime: 0,
      particles: [],
    });
  },

  startGame: () => {
    set({
      status: 'playing',
      lastTickTime: performance.now(),
    });
  },

  pauseGame: () => {
    if (get().status === 'playing') set({ status: 'paused' });
  },

  resumeGame: () => {
    if (get().status === 'paused') set({ status: 'playing', lastTickTime: performance.now() });
  },

  gameOver: () => {
    const { score, highScore, shakeKey } = get();
    const newHighScore = Math.max(score, highScore);
    if (newHighScore > highScore) saveHighScore(newHighScore);
    set({ status: 'game-over', highScore: newHighScore, combo: 0, shakeKey: shakeKey + 1 });
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
      combo: 0,
      lastEatTime: 0,
      particles: [],
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

  clearParticle: (id: number) => {
    set({ particles: get().particles.filter((p) => p.id !== id) });
  },

  moveSnake: () => {
    const { snake, direction, directionQueue, food, status, mode, combo, lastEatTime, particles, shakeKey } = get();
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

    if (food && newHead.x === food.x && newHead.y === food.y) {
      const { score, highScore } = get();
      const foodCfg = FOOD_TYPES[food.type];
      const withinCombo = tickTime - lastEatTime < COMBO_WINDOW_MS && lastEatTime > 0;
      const newCombo = withinCombo ? combo + 1 : 1;
      const comboMultiplier = Math.min(newCombo, 5);
      const newScore = score + foodCfg.points * comboMultiplier;
      const newFood = generateRandomFood(newSnake);
      const newParticles = [...particles, ...spawnParticles(food.x, food.y, foodCfg.color, 10)];

      if (!newFood || (mode === 'casual' && newScore >= FOOD_TO_WIN_CASUAL)) {
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
          combo: newCombo,
          lastEatTime: tickTime,
          particles: newParticles,
          shakeKey: shakeKey + 1,
        });
      } else {
        set({
          ...dirUpdate,
          score: newScore,
          snake: newSnake,
          prevSnake: snake,
          lastTickTime: tickTime,
          food: newFood,
          combo: newCombo,
          lastEatTime: tickTime,
          particles: newParticles,
          shakeKey: shakeKey + 1,
        });
      }
    } else {
      newSnake.pop();
      // break combo if window expired
      const comboExpired = lastEatTime > 0 && tickTime - lastEatTime > COMBO_WINDOW_MS;
      set({
        ...dirUpdate,
        snake: newSnake,
        prevSnake: snake,
        lastTickTime: tickTime,
        combo: comboExpired ? 0 : combo,
      });
    }

    // cleanup old particles
    const livingParticles = get().particles.filter((p) => tickTime - p.createdAt < PARTICLE_LIFETIME_MS);
    if (livingParticles.length !== get().particles.length) {
      set({ particles: livingParticles });
    }
  },
}));
