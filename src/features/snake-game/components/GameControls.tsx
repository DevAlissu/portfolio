import { memo } from 'react';
import type { Direction, GameStatus } from '../types';

interface GameControlsProps {
  status: GameStatus;
  onDirection: (direction: Direction) => void;
}

const ARROW_PATH = 'M16 21L9 12H23L16 21Z';

const ROW_BUTTONS: { direction: Direction; rotation: string }[] = [
  { direction: 'LEFT', rotation: 'rotate-90' },
  { direction: 'DOWN', rotation: '' },
  { direction: 'RIGHT', rotation: '-rotate-90' },
];

export const GameControls = memo(function GameControls({ status, onDirection }: GameControlsProps) {
  const disabled = status !== 'playing';

  const buttonClass =
    'snake-arrow-btn w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center';

  return (
    <div className="bg-[#1d293d] rounded-lg p-2.5">
      <p className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-[11px] leading-tight">
        // teclado ou swipe
      </p>

      <div className="flex flex-col gap-1.5 items-center mt-2">
        <button
          onPointerDown={(e) => {
            e.preventDefault();
            onDirection('UP');
          }}
          disabled={disabled}
          aria-label="Cima"
          className={buttonClass}
        >
          <svg className="w-[14px] h-[14px] rotate-180" fill="none" viewBox="0 0 32 32">
            <path d={ARROW_PATH} fill="#F8FAFC" />
          </svg>
        </button>
        <div className="flex gap-1.5">
          {ROW_BUTTONS.map(({ direction, rotation }) => (
            <button
              key={direction}
              onPointerDown={(e) => {
                e.preventDefault();
                onDirection(direction);
              }}
              disabled={disabled}
              aria-label={direction.toLowerCase()}
              className={buttonClass}
            >
              <svg className={`w-[14px] h-[14px] ${rotation}`} fill="none" viewBox="0 0 32 32">
                <path d={ARROW_PATH} fill="#F8FAFC" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
