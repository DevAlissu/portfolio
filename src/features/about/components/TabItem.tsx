import { X } from 'lucide-react';
import { TAB_LABELS } from '../constants';
import type { AboutTab } from '../types';

interface TabItemProps {
  tab: AboutTab;
  isActive: boolean;
  canClose: boolean;
  onSelect: (tab: AboutTab) => void;
  onClose: (tab: AboutTab) => void;
}

export function TabItem({ tab, isActive, canClose, onSelect, onClose }: TabItemProps) {
  return (
    <div
      className={`group relative flex items-center gap-2 px-4 py-3 border-r border-[#314158] cursor-pointer shrink-0 transition-colors ${
        isActive ? 'text-[#f8fafc]' : 'text-[#90a1b9] hover:text-[#f8fafc]'
      }`}
      onClick={() => onSelect(tab)}
    >
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ffb86a]" />
      )}
      <span className="font-['Fira_Code',sans-serif] text-sm whitespace-nowrap">
        {TAB_LABELS[tab]}
      </span>
      {canClose && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(tab);
          }}
          className="opacity-0 group-hover:opacity-100 hover:text-[#f8fafc] transition-opacity ml-1"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
