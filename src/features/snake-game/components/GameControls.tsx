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
    'bg-[#0a0a0a] border border-[#314158] hover:border-[#43D9AD] disabled:hover:border-[#314158] disabled:opacity-50 transition-colors rounded-lg w-12 h-12 flex items-center justify-center';

  return (
    <div className="bg-[#1d293d] rounded-lg p-3">
      <p className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-sm leading-relaxed mb-0">
        // use o teclado
      </p>
      <p className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-sm leading-relaxed">
        // setas para jogar
      </p>

      <div className="flex flex-col gap-2 items-center mt-3">
        <button onClick={() => onDirection('UP')} disabled={disabled} className={buttonClass}>
          <svg className="w-[18px] h-[18px] rotate-180" fill="none" viewBox="0 0 32 32">
            <path d={ARROW_PATH} fill="#F8FAFC" />
          </svg>
        </button>
        <div className="flex gap-2">
          {ROW_BUTTONS.map(({ direction, rotation }) => (
            <button
              key={direction}
              onClick={() => onDirection(direction)}
              disabled={disabled}
              className={buttonClass}
            >
              <svg className={`w-[18px] h-[18px] ${rotation}`} fill="none" viewBox="0 0 32 32">
                <path d={ARROW_PATH} fill="#F8FAFC" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
