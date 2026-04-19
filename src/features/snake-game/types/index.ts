export type GameStatus =
  | 'idle'
  | 'countdown'
  | 'playing'
  | 'paused'
  | 'game-over'
  | 'victory';

export type Position = {
  x: number;
  y: number;
};

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type Difficulty = 'easy' | 'normal' | 'hard';

export type GameMode = 'casual' | 'competitive';

export type FoodType = 'function' | 'class' | 'async';

export interface Food extends Position {
  type: FoodType;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  createdAt: number;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  difficulty: Difficulty;
  date: string;
}

export interface GameState {
  status: GameStatus;
  score: number;
  highScore: number;
  snake: Position[];
  prevSnake: Position[];
  lastTickTime: number;
  direction: Direction;
  nextDirection: Direction;
  directionQueue: Direction[];
  food: Food | null;
  gridSize: number;
  difficulty: Difficulty;
  mode: GameMode;
  leaderboard: LeaderboardEntry[];
  combo: number;
  lastEatTime: number;
  particles: Particle[];
  shakeKey: number;
}

export interface GameActions {
  startGame: () => void;
  beginCountdown: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  gameOver: () => void;
  resetGame: () => void;
  setDirection: (direction: Direction) => void;
  moveSnake: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setMode: (mode: GameMode) => void;
  saveToLeaderboard: (name: string) => void;
  clearParticle: (id: number) => void;
}

export type GameStore = GameState & GameActions;
