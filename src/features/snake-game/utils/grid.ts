import type { Position } from '../types';
import { SVG_CANVAS_SIZE } from '../constants';

export function gridToSvg(x: number, y: number, gridSize: number) {
  const cellSize = SVG_CANVAS_SIZE / gridSize;
  return {
    x: x * cellSize + cellSize / 2,
    y: y * cellSize + cellSize / 2,
  };
}

export function getSnakeDimensions(gridSize: number) {
  const cellSize = SVG_CANVAS_SIZE / gridSize;
  return {
    cellSize,
    snakeRadius: cellSize * 0.35,
    snakeStrokeWidth: cellSize * 0.75,
  };
}

export function createSnakePath(snake: Position[], gridSize: number) {
  if (snake.length === 0) return '';

  const points = snake.map((segment) => gridToSvg(segment.x, segment.y, gridSize));
  const first = points[0]!;
  let path = `M${first.x},${first.y}`;

  for (let i = 1; i < points.length; i++) {
    const pt = points[i]!;
    path += ` L${pt.x},${pt.y}`;
  }

  return path;
}
