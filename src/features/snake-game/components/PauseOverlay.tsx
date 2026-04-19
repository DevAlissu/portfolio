import { memo } from 'react';

interface PauseOverlayProps {
  onResume: () => void;
  onQuit: () => void;
}

export const PauseOverlay = memo(function PauseOverlay({ onResume, onQuit }: PauseOverlayProps) {
  return (
    <div className="absolute inset-0 bg-[#0a1628]/90 backdrop-blur-sm rounded-lg flex items-center justify-center z-20">
      <div className="text-center space-y-5 p-4">
        <p className="font-['Fira_Code',sans-serif] text-[#ffb86a] text-2xl font-bold">
          pausado
        </p>
        <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-xs">
          // pressione espaco para continuar
        </p>
        <div className="flex flex-col gap-2 items-center">
          <button
            onClick={onResume}
            className="bg-[#43D9AD] hover:bg-[#43D9AD]/80 transition-colors px-6 py-2 rounded-lg font-['Fira_Code',sans-serif] text-[#020618] text-sm w-40 focus-visible:outline-2 focus-visible:outline-[#ffb86a] focus-visible:outline-offset-2"
          >
            continuar
          </button>
          <button
            onClick={onQuit}
            className="border border-[#90a1b9] hover:border-[#f8fafc] hover:text-[#f8fafc] transition-colors px-6 py-2 rounded-lg font-['Fira_Code',sans-serif] text-[#90a1b9] text-sm w-40 focus-visible:outline-2 focus-visible:outline-[#ffb86a] focus-visible:outline-offset-2"
          >
            sair
          </button>
        </div>
      </div>
    </div>
  );
});
