import { memo } from 'react';
import { FOOD_TYPES } from '../constants';
import type { FoodType } from '../types';

const ORDER: FoodType[] = ['function', 'class', 'async'];

export const FoodLegend = memo(function FoodLegend() {
  return (
    <div className="w-full font-['Fira_Code',sans-serif] text-[10px] text-[#90a1b9] space-y-0.5">
      <p className="text-[#f8fafc] text-[11px]">// comidas</p>
      {ORDER.map((type) => {
        const { points, color, label } = FOOD_TYPES[type];
        return (
          <div key={type} className="flex items-center gap-1.5">
            <span className="shrink-0 w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="truncate">{label}</span>
            <span className="ml-auto tabular-nums text-[#f8fafc]">+{points}</span>
          </div>
        );
      })}
    </div>
  );
});
