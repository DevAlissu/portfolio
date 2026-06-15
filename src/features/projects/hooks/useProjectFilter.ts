import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { PROJECTS } from '../constants';

export function useProjectFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const techParam = searchParams.get('tech');

  const selectedTech = useMemo(
    () => (techParam ? techParam.split(',').filter(Boolean) : []),
    [techParam],
  );

  const toggleTech = (tech: string) => {
    setSearchParams(
      (prev) => {
        const list = (prev.get('tech') || '').split(',').filter(Boolean);
        const nextList = list.includes(tech)
          ? list.filter((t) => t !== tech)
          : [...list, tech];
        const next = new URLSearchParams(prev);
        if (nextList.length) next.set('tech', nextList.join(','));
        else next.delete('tech');
        return next;
      },
      { replace: true },
    );
  };

  const clearTech = () => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('tech');
        return next;
      },
      { replace: true },
    );
  };

  const filteredProjects = useMemo(() => {
    if (selectedTech.length === 0) return PROJECTS;
    return PROJECTS.filter((project) =>
      project.technologies.some((tech) => selectedTech.includes(tech)),
    );
  }, [selectedTech]);

  return { selectedTech, toggleTech, clearTech, filteredProjects };
}
