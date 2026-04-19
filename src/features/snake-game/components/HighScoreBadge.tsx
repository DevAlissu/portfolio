interface HighScoreBadgeProps {
  highScore: number;
}

export function HighScoreBadge({ highScore }: HighScoreBadgeProps) {
  return (
    <div className="font-['Fira_Code',sans-serif] text-[11px] text-[#46ECD5] bg-[#020618]/80 border border-[#46ECD5]/40 px-2 py-1 rounded whitespace-nowrap shrink-0">
      best: {highScore}
    </div>
  );
}
