import { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';

export function useProjectFilter() {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const filteredProjects = useMemo(() => {
    if (selectedTech.length === 0) return PROJECTS;
    return PROJECTS.filter((project) =>
      project.technologies.some((tech) => selectedTech.includes(tech)),
    );
  }, [selectedTech]);

  return { selectedTech, toggleTech, filteredProjects };
}
