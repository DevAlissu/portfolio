interface ComboBadgeProps {
  combo: number;
}

export function ComboBadge({ combo }: ComboBadgeProps) {
  const multiplier = Math.min(combo, 5);
  return (
    <div
      key={combo}
      className="font-['Fira_Code',sans-serif] text-[11px] text-[#b14eff] bg-[#020618]/80 border border-[#b14eff]/40 px-2 py-1 rounded combo-pop"
    >
      combo x{multiplier}
    </div>
  );
}
