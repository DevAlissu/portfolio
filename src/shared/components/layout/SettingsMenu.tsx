import { useEffect, useRef, useState } from 'react';
import { Settings } from 'lucide-react';
import { useSettingsStore, type BackgroundTheme } from '../../store/useSettingsStore';

const OPTIONS: { value: BackgroundTheme; label: string }[] = [
  { value: 'waves', label: 'ondas' },
  { value: 'matrix', label: 'matrix' },
  { value: 'dust', label: 'poeira' },
];

export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const background = useSettingsStore((s) => s.background);
  const setBackground = useSettingsStore((s) => s.setBackground);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Configurar tema de fundo"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center px-4 py-4 border-l border-[#314158] text-[#aeb9d0] hover:text-[#f8fafc] transition-colors focus-visible:outline-2 focus-visible:outline-[#ffb86a] focus-visible:outline-offset-[-2px]"
      >
        <Settings
          size={18}
          className={`transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-2 top-full z-50 mt-1 w-44 rounded-lg border border-[#314158] bg-[#15072e] shadow-xl p-1"
        >
          <p className="px-3 py-2 font-['Fira_Code',sans-serif] text-[#aeb9d0] text-xs">
            // fundo:
          </p>
          {OPTIONS.map((opt) => {
            const active = background === opt.value;
            return (
              <button
                key={opt.value}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setBackground(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded font-['Fira_Code',sans-serif] text-sm text-left transition-colors ${
                  active
                    ? 'bg-[#2c143b] text-[#f8fafc]'
                    : 'text-[#aeb9d0] hover:text-[#f8fafc] hover:bg-[#2c143b]/40'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    active ? 'bg-[#43D9AD]' : 'bg-[#314158]'
                  }`}
                />
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
