import type { Direction, Position, Difficulty, FoodType } from '../types';

export const GRID_SIZE = 15;
export const FOOD_TO_WIN_CASUAL = 15;
export const GAME_START_DELAY = 500;
export const SVG_CANVAS_SIZE = 400;
export const MAX_LEADERBOARD_ENTRIES = 10;
export const COUNTDOWN_SECONDS = 3;
export const COMBO_WINDOW_MS = 3000;
export const PARTICLE_LIFETIME_MS = 600;
export const MAX_DIRECTION_QUEUE = 2;
export const FAST_FORWARD_THRESHOLD = 0.35;

export const DIFFICULTY_SPEEDS: Record<Difficulty, number> = {
  easy: 170,
  normal: 140,
  hard: 80,
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'junior',
  normal: 'pleno',
  hard: 'senior',
};

export const FOOD_TYPES: Record<FoodType, { points: number; color: string; label: string; weight: number }> = {
  function: { points: 1, color: '#46ECD5', label: 'function()', weight: 70 },
  class: { points: 2, color: '#ffa1ad', label: 'class{}', weight: 22 },
  async: { points: 3, color: '#b14eff', label: 'async()', weight: 8 },
};

export const MODE_LABELS = {
  casual: 'casual',
  competitive: 'competitivo',
} as const;

export const INITIAL_SNAKE: Position[] = [
  { x: 7, y: 7 },
  { x: 7, y: 8 },
  { x: 7, y: 9 },
];

export const INITIAL_DIRECTION: Direction = 'UP';

export const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

export const BOLT_CROSS_PATH =
  'M5.73071 10.7947L11.2693 6.20529M5.73071 6.20529L11.2693 10.7947';

export interface BoltVariant {
  position: string;
  filterId: string;
  gradientId: string;
  dropShadowColor: string;
  innerShadowColor: string;
  gradientStart: string;
  gradientEnd: string;
  strokeColor: string;
}

export const BOLT_VARIANTS: BoltVariant[] = [
  {
    position: 'left-3 top-3',
    filterId: 'filter0_di_bolt1',
    gradientId: 'paint0_radial_bolt1',
    dropShadowColor: '0 0 0 0 0.0525 0 0 0 0 0.2625 0 0 0 0 0.255726 0 0 0 1 0',
    innerShadowColor: '0 0 0 0 0.12184 0 0 0 0 0.504167 0 0 0 0 0.464752 0 0 0 1 0',
    gradientStart: '#217D7A',
    gradientEnd: '#114B4A',
    strokeColor: '#0B4F4A',
  },
  {
    position: 'left-3 bottom-3',
    filterId: 'filter0_di_bolt2',
    gradientId: 'paint0_radial_bolt2',
    dropShadowColor: '0 0 0 0 0.0359028 0 0 0 0 0.177018 0 0 0 0 0.195833 0 0 0 1 0',
    innerShadowColor: '0 0 0 0 0.088125 0 0 0 0 0.391667 0 0 0 0 0.360374 0 0 0 1 0',
    gradientStart: '#164C51',
    gradientEnd: '#0D3A40',
    strokeColor: '#022F2E',
  },
  {
    position: 'right-3 bottom-3',
    filterId: 'filter0_di_bolt3',
    gradientId: 'paint0_radial_bolt3',
    dropShadowColor: '0 0 0 0 0.0709722 0 0 0 0 0.174244 0 0 0 0 0.304167 0 0 0 1 0',
    innerShadowColor: '0 0 0 0 0.170868 0 0 0 0 0.343622 0 0 0 0 0.554167 0 0 0 1 0',
    gradientStart: '#234B7C',
    gradientEnd: '#122E4F',
    strokeColor: '#163355',
  },
  {
    position: 'right-3 top-3',
    filterId: 'filter0_di_bolt4',
    gradientId: 'paint0_radial_bolt4',
    dropShadowColor: '0 0 0 0 0.0525 0 0 0 0 0.2625 0 0 0 0 0.255726 0 0 0 1 0',
    innerShadowColor: '0 0 0 0 0.12184 0 0 0 0 0.504167 0 0 0 0 0.464752 0 0 0 1 0',
    gradientStart: '#217D7A',
    gradientEnd: '#114B4A',
    strokeColor: '#0B4F4A',
  },
];
