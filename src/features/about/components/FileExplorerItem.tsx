import { ChevronDown, ChevronRight, Folder, File } from 'lucide-react';

interface FileItemProps {
  label: string;
  iconColor: string;
  isActive?: boolean;
  onClick: () => void;
}

export function FileItem({ label, iconColor, isActive, onClick }: FileItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 py-1.5 px-2 w-full text-left rounded transition-colors font-['Fira_Code',sans-serif] text-sm ${
        isActive ? 'bg-[#1d293d] text-[#f8fafc]' : 'text-[#90a1b9] hover:text-[#f8fafc]'
      }`}
    >
      <File size={14} style={{ color: iconColor }} />
      {label}
    </button>
  );
}

interface FolderItemProps {
  label: string;
  iconColor: string;
  isExpanded: boolean;
  onClick: () => void;
  isRoot?: boolean;
}

export function FolderItem({ label, iconColor, isExpanded, onClick, isRoot }: FolderItemProps) {
  const textClass = isRoot
    ? 'text-[#f8fafc] hover:text-[#43D9AD]'
    : 'text-[#90a1b9] hover:text-[#f8fafc]';

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full text-left ${isRoot ? 'py-2' : 'py-1.5 px-2'} ${textClass} transition-colors font-['Fira_Code',sans-serif] ${isRoot ? '' : 'text-sm'}`}
    >
      {isExpanded ? (
        <ChevronDown size={isRoot ? 16 : 14} />
      ) : (
        <ChevronRight size={isRoot ? 16 : 14} />
      )}
      <Folder size={isRoot ? 16 : 14} style={{ color: iconColor }} />
      <span>{label}</span>
    </button>
  );
}
