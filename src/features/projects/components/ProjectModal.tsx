import { useEffect, useState } from 'react';
import { X, ExternalLink, Github, Lock, Maximize2, Minimize2 } from 'lucide-react';
import type { Project } from '../types';
import { TECH_ICONS } from '../constants/tech-icons';
import { ImageLightbox } from './ImageLightbox';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const allImages = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : [];

  // reset slide index when project changes to avoid out-of-bounds
  useEffect(() => {
    setActiveSlide(0);
  }, [project.id]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === 'Escape') {
        if (expanded) setExpanded(false);
        else onClose();
      }
      if (allImages.length > 1) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setActiveSlide((i) => (i > 0 ? i - 1 : allImages.length - 1));
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setActiveSlide((i) => (i < allImages.length - 1 ? i + 1 : 0));
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, expanded, lightboxOpen, allImages.length]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const imgMaxH = expanded ? 'max-h-[70vh]' : 'max-h-[300px]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={() => { if (!lightboxOpen) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        style={{
          width: expanded ? 'calc(100% - 2rem)' : 'min(56rem, 100%)',
          height: expanded ? 'calc(100% - 2rem)' : 'min(85vh, 100%)',
          borderRadius: expanded ? '12px' : '8px',
          transition: 'width 400ms cubic-bezier(0.32,0.72,0,1), height 400ms cubic-bezier(0.32,0.72,0,1), border-radius 400ms cubic-bezier(0.32,0.72,0,1)',
        }}
        className="relative bg-[#0a1628] border border-[#314158] overflow-y-auto max-sm:!w-full max-sm:!h-full max-sm:!rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0a1628] border-b border-[#314158] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <h2 className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-base sm:text-lg font-medium truncate">
              {project.title}
            </h2>
            {project.isPrivate && (
              <span className="flex items-center gap-1 text-[10px] font-['Fira_Code',sans-serif] text-[#ffb86a] bg-[#ffb86a]/10 px-2 py-0.5 rounded shrink-0">
                <Lock size={10} />
                privado
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setExpanded((p) => !p)}
              aria-label={expanded ? 'Reduzir modal' : 'Expandir modal'}
              className="hidden sm:flex text-[#90a1b9] hover:text-[#f8fafc] transition-colors p-1.5 rounded hover:bg-[#1d293d] focus-visible:outline-2 focus-visible:outline-[#ffb86a]"
            >
              {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              onClick={onClose}
              aria-label="Fechar modal"
              className="text-[#90a1b9] hover:text-[#f8fafc] transition-colors p-1.5 rounded hover:bg-[#1d293d] focus-visible:outline-2 focus-visible:outline-[#ffb86a]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`px-4 sm:px-6 py-5 space-y-5 ${expanded ? 'max-w-5xl mx-auto' : ''}`}>
          {/* Images */}
          {allImages.length > 0 ? (
            <div className="space-y-3">
              {/* Active slide */}
              <button
                type="button"
                aria-label="Ampliar imagem"
                className="rounded-md overflow-hidden bg-[#1d293d] group/img relative w-full focus-visible:outline-2 focus-visible:outline-[#ffb86a]"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={allImages[activeSlide]}
                  alt={`${project.title} ${activeSlide + 1}`}
                  loading="lazy"
                  className={`w-full h-auto ${imgMaxH} object-contain group-hover/img:brightness-110 transition-all`}
                />
                {allImages.length > 1 && (
                  <div className="absolute bottom-2 right-2 font-['Fira_Code',sans-serif] text-[10px] text-white/70 bg-black/50 px-2 py-0.5 rounded">
                    {activeSlide + 1} / {allImages.length}
                  </div>
                )}
              </button>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Ir para imagem ${i + 1}`}
                      aria-current={i === activeSlide}
                      className={`shrink-0 rounded overflow-hidden transition-all w-16 h-12 sm:w-20 sm:h-14 focus-visible:outline-2 focus-visible:outline-[#ffb86a] ${
                        i === activeSlide
                          ? 'ring-2 ring-[#9d4edd] opacity-100'
                          : 'opacity-50 hover:opacity-80'
                      }`}
                      onClick={() => setActiveSlide(i)}
                    >
                      <img
                        src={img}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-[140px] sm:h-[180px] bg-[#1d293d] rounded-md flex items-center justify-center">
              <p className="font-['Fira_Code',sans-serif] text-[#314158] text-sm">
                // sem imagens ainda por enquanto
              </p>
            </div>
          )}

          {/* Tag */}
          <p className="font-['Fira_Code',sans-serif] text-[#9d4edd] text-sm">
            {project.tag}
          </p>

          {/* Description */}
          <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-sm leading-relaxed whitespace-pre-line">
            {project.details || project.description}
          </p>

          {/* Technologies */}
          <div className="space-y-2">
            <p className="font-['Fira_Code',sans-serif] text-[#607088] text-xs">
              // tecnologias
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-1.5 font-['Fira_Code',sans-serif] text-[11px] text-[#43D9AD] bg-[#43D9AD]/10 px-2 py-1 rounded"
                >
                  {TECH_ICONS[tech] ?? null}
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-['Fira_Code',sans-serif] text-sm border border-[#90a1b9] text-[#f8fafc] hover:border-[#f8fafc] transition-colors"
              >
                <Github size={16} />
                repositorio
                {project.isPrivate && <Lock size={12} className="text-[#ffb86a]" />}
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-['Fira_Code',sans-serif] text-sm bg-[#43D9AD] text-[#020618] hover:bg-[#43D9AD]/80 transition-colors"
              >
                <ExternalLink size={16} />
                ver online
              </a>
            )}
          </div>
        </div>
      </div>

      {lightboxOpen && allImages.length > 0 && (
        <ImageLightbox
          images={allImages}
          startIndex={activeSlide}
          onClose={(lastIndex) => {
            setLightboxOpen(false);
            setActiveSlide(lastIndex);
          }}
        />
      )}
    </div>
  );
}
