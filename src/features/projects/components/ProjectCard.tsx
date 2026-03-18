import { ExternalLink, Lock } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <div className="group transition-all duration-200">
      <div className="mb-4">
        <p className="font-['Fira_Code',sans-serif] text-[#9d4edd] text-[16px] mb-2">
          <span className="text-[#9d4edd]">Project {index + 1}</span>{' '}
          <span className="text-[#90a1b9]">// {project.tag}</span>
        </p>
      </div>

      <div className="bg-[#1d293d] rounded-lg overflow-hidden border border-[#314158] group-hover:border-[#9d4edd]/50 transition-all">
        {project.image ? (
          <div className="relative h-[175px] bg-[#0a1628] overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
          </div>
        ) : (
          <div className="h-[145px] bg-[#0a1628] flex items-center justify-center">
            <p className="font-['Fira_Code',sans-serif] text-[#314158] text-sm">{project.title}</p>
          </div>
        )}

        <div className="p-6 space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-[14px] font-medium">
              {project.title}
            </h3>
            {project.isPrivate && (
              <Lock size={12} className="text-[#ffb86a] shrink-0" />
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="ml-auto shrink-0 flex items-center gap-1 text-[10px] font-['Fira_Code',sans-serif] text-[#43D9AD] hover:text-[#43D9AD]/80 transition-colors truncate max-w-[140px]"
                title={project.liveUrl}
              >
                <ExternalLink size={10} className="shrink-0" />
                {project.liveUrl.replace('https://', '').replace('http://', '')}
              </a>
            )}
          </div>
          <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[13px] leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="font-['Fira_Code',sans-serif] text-[10px] text-[#43D9AD] bg-[#43D9AD]/10 px-1.5 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="font-['Fira_Code',sans-serif] text-[10px] text-[#607088] px-1.5 py-0.5">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
          <button
            onClick={() => onSelect(project)}
            className="bg-[#1d293d] border border-[#90a1b9] hover:border-[#f8fafc] transition-colors px-4 py-2 rounded-lg font-['Fira_Code',sans-serif] text-[#f8fafc] text-[13px] cursor-pointer"
          >
            ver-detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
