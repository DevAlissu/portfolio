import { memo } from 'react';

interface PauseOverlayProps {
  onResume: () => void;
  onQuit: () => void;
}

export const PauseOverlay = memo(function PauseOverlay({ onResume, onQuit }: PauseOverlayProps) {
  return (
    <div className="absolute inset-0 bg-[#0a1628]/90 backdrop-blur-sm rounded-lg flex items-center justify-center z-20">
      <div className="text-center space-y-5 p-4">
        <p className="font-['Fira_Code',sans-serif] text-[#c490f7] text-2xl font-bold">
          pausado
        </p>
        <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-xs">
          // pressione espaco para continuar
        </p>
        <div className="flex flex-col gap-2 items-center">
          <button onClick={onResume} className="snake-btn snake-btn-success w-40">
            continuar
          </button>
          <button onClick={onQuit} className="snake-btn snake-btn-ghost w-40">
            sair
          </button>
        </div>
      </div>
    </div>
  );
});
