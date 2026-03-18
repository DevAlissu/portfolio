export type GameStatus = 'idle' | 'playing' | 'paused' | 'game-over' | 'victory';

export type Position = {
  x: number;
  y: number;
};

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type Difficulty = 'easy' | 'normal' | 'hard';

export type GameMode = 'casual' | 'competitive';

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
  food: Position;
  gridSize: number;
  difficulty: Difficulty;
  mode: GameMode;
  leaderboard: LeaderboardEntry[];
}

export interface GameActions {
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  gameOver: () => void;
  resetGame: () => void;
  setDirection: (direction: Direction) => void;
  moveSnake: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setMode: (mode: GameMode) => void;
  saveToLeaderboard: (name: string) => void;
}

export type GameStore = GameState & GameActions;
