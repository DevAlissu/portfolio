import { memo, useState } from 'react';
import type { GameStatus, GameMode, LeaderboardEntry } from '../types';
import { DIFFICULTY_LABELS } from '../constants';

const MEDALS = ['#FFD700', '#C0C0C0', '#CD7F32'] as const;

interface GameOverlayProps {
  status: GameStatus;
  score: number;
  mode: GameMode;
  leaderboard: LeaderboardEntry[];
  onStart: () => void;
  onSaveScore: (name: string) => void;
}

export const GameOverlay = memo(function GameOverlay({
  status,
  score,
  mode,
  leaderboard,
  onStart,
  onSaveScore,
}: GameOverlayProps) {
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);

  if (status !== 'game-over' && status !== 'victory') return null;

  const isCompetitive = mode === 'competitive';
  const showNameInput = isCompetitive && status === 'game-over' && !saved;
  const showLeaderboard = isCompetitive && (saved || status === 'game-over');

  const handleSave = () => {
    if (playerName.trim()) {
      onSaveScore(playerName);
      setSaved(true);
    }
  };

  const handleRestart = () => {
    setSaved(false);
    setPlayerName('');
    onStart();
  };

  return (
    <div className="absolute inset-0 bg-[#0a1628]/90 rounded-lg flex items-center justify-center z-20 overflow-y-auto">
      <div className="text-center space-y-4 relative z-30 p-4 max-h-full">
        <p className="font-['Fira_Code',sans-serif] text-[#43D9AD] text-2xl font-bold">
          {status === 'victory' ? 'PARABENS!' : 'GAME OVER!'}
        </p>

        {isCompetitive && (
          <p className="font-['Fira_Code',sans-serif] text-[#ffb86a] text-lg">
            pontos: {score}
          </p>
        )}

        {showNameInput && (
          <div className="space-y-3">
            <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-xs">
              salve seu nome no ranking:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                maxLength={20}
                placeholder="seu nome"
                className="bg-[#020618] border border-[#314158] rounded px-3 py-1.5 font-['Fira_Code',sans-serif] text-[#f8fafc] text-sm focus:border-[#43D9AD] focus:outline-none w-32"
              />
              <button
                onClick={handleSave}
                disabled={!playerName.trim()}
                className="bg-[#43D9AD] hover:bg-[#43D9AD]/80 disabled:opacity-40 px-3 py-1.5 rounded font-['Fira_Code',sans-serif] text-[#020618] text-sm transition-colors"
              >
                salvar
              </button>
            </div>
          </div>
        )}

        {showLeaderboard && leaderboard.length > 0 && (
          <div className="space-y-2 mt-2">
            <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-xs">
              // ranking
            </p>
            <div className="space-y-1 text-left">
              {leaderboard.slice(0, 5).map((entry, i) => {
                const medal = i < 3 ? MEDALS[i] : null;
                const isCurrentPlayer =
                  saved &&
                  i ===
                    leaderboard.findIndex(
                      (e) => e.date === entry.date && e.name === entry.name,
                    );

                const dateLabel = new Date(entry.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                });

                return (
                  <div
                    key={`${entry.name}-${entry.date}`}
                    className={`flex items-center gap-2 font-['Fira_Code',sans-serif] text-xs px-2 py-1 rounded ${
                      isCurrentPlayer ? 'bg-[#43D9AD]/10 text-[#43D9AD]' : 'text-[#90a1b9]'
                    }`}
                  >
                    <span className="w-4 text-center">
                      {medal ? (
                        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 inline-block">
                          <circle cx="8" cy="6" r="5" fill={medal} opacity="0.9" />
                          <path d="M6 11L8 14L10 11" fill={medal} opacity="0.7" />
                        </svg>
                      ) : (
                        <span>{i + 1}.</span>
                      )}
                    </span>
                    <span className="flex-1 truncate">{entry.name}</span>
                    <span className="text-[#607088] shrink-0 hidden sm:inline">
                      {dateLabel}
                    </span>
                    <span className="text-[#607088] shrink-0">
                      {DIFFICULTY_LABELS[entry.difficulty]}
                    </span>
                    <span className="shrink-0 tabular-nums">{entry.score}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={handleRestart}
          className="font-['Fira_Code',sans-serif] text-[#90a1b9] hover:text-[#f8fafc] transition-colors underline text-sm focus-visible:outline-2 focus-visible:outline-[#ffb86a]"
        >
          {status === 'victory' ? 'jogar-novamente' : 'tentar-novamente'}
        </button>
      </div>
    </div>
  );
});
