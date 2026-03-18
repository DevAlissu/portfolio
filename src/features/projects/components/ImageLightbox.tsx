import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  startIndex: number;
  onClose: (lastIndex: number) => void;
}

export function ImageLightbox({ images, startIndex, onClose }: ImageLightboxProps) {
  const [index, setIndex] = useState(startIndex);

  const prev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  }, [images.length]);

  const close = useCallback(() => onClose(index), [onClose, index]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [close, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
      onClick={close}
    >
      <button
        onClick={close}
        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 p-2"
      >
        <X size={24} />
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-['Fira_Code',sans-serif] text-white/50 text-sm z-10">
        {index + 1} / {images.length}
      </div>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-10 p-2 rounded-full hover:bg-white/10"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      <img
        src={images[index]}
        alt={`Screenshot ${index + 1}`}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-10 p-2 rounded-full hover:bg-white/10"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
}
