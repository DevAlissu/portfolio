interface HighScoreBadgeProps {
  highScore: number;
}

export function HighScoreBadge({ highScore }: HighScoreBadgeProps) {
  return (
    <div className="font-['Fira_Code',sans-serif] text-[11px] text-[#ffb86a] bg-[#020618]/80 border border-[#ffb86a]/40 px-2 py-1 rounded">
      best: {highScore}
    </div>
  );
}
