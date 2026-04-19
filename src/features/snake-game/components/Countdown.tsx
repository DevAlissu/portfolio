import { useEffect, useState } from 'react';
import { COUNTDOWN_SECONDS } from '../constants';

interface CountdownProps {
  onFinish: () => void;
}

export function Countdown({ onFinish }: CountdownProps) {
  const [value, setValue] = useState<number | 'go'>(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (value === 'go') {
      const t = setTimeout(onFinish, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setValue((v) => (typeof v === 'number' && v > 1 ? v - 1 : 'go'));
    }, 700);
    return () => clearTimeout(t);
  }, [value, onFinish]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div
        key={String(value)}
        className="font-['Fira_Code',sans-serif] font-bold text-[#c490f7] text-7xl countdown-pop"
        style={{ textShadow: '0 0 24px rgba(196, 144, 247, 0.7)' }}
      >
        {value === 'go' ? 'GO!' : value}
      </div>
    </div>
  );
}
