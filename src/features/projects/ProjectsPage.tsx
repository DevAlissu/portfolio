import { useState } from 'react';
import { useProjectFilter } from './hooks/useProjectFilter';
import { TechFilter } from './components/TechFilter';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import type { Project } from './types';

export function ProjectsPage() {
  const { selectedTech, toggleTech, filteredProjects } = useProjectFilter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col lg:flex-row">
      <TechFilter selectedTech={selectedTech} onToggle={toggleTech} />

      <main className="flex-1">
        <div className="border-b lg:border-l border-[#314158] px-6 py-3">
          <div className="flex items-center gap-2 text-[#90a1b9] font-['Fira_Code',sans-serif] text-[14px]">
            {selectedTech.length > 0 ? selectedTech.join('; ') : 'todos'}
            <button className="ml-2 hover:text-[#f8fafc] transition-colors">&times;</button>
          </div>
        </div>

        <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]">
              // Nenhum projeto encontrado com os filtros selecionados
            </p>
          </div>
        )}
      </main>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
