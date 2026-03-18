import { useState } from 'react';
import { ChevronDown, ChevronRight, Folder } from 'lucide-react';
import { TECH_CATEGORIES } from '../constants';
import { TECH_ICONS } from '../constants/tech-icons';

interface TechFilterProps {
  selectedTech: string[];
  onToggle: (tech: string) => void;
}

export function TechFilter({ selectedTech, onToggle }: TechFilterProps) {
  const [expandedCats, setExpandedCats] = useState<string[]>(['frontend']);
  const [expandedSubs, setExpandedSubs] = useState<string[]>(['frameworks']);

  const toggleCat = (label: string) => {
    setExpandedCats((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label],
    );
  };

  const toggleSub = (label: string) => {
    setExpandedSubs((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label],
    );
  };

  return (
    <aside className="hidden lg:block w-[clamp(200px,18vw,311px)] border-r border-[#314158] shrink-0 overflow-y-auto max-h-[calc(100vh-120px)]">
      <div className="border-b border-[#314158]">
        <div className="w-full px-6 py-3 flex items-center gap-3">
          <div className="w-4 h-4">
            <svg viewBox="0 0 8 4" className="w-full h-full">
              <path d="M4 4L0 0H8L4 4Z" fill="#F8FAFC" />
            </svg>
          </div>
          <span className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-[16px]">
            projetos
          </span>
        </div>

        <div className="px-4 pb-4 space-y-0.5">
          {TECH_CATEGORIES.map((cat) => {
            const isCatOpen = expandedCats.includes(cat.label);
            return (
              <div key={cat.label}>
                {/* Category folder */}
                <button
                  onClick={() => toggleCat(cat.label)}
                  className="flex items-center gap-2 w-full text-left py-1.5 text-[#f8fafc] hover:text-[#43D9AD] transition-colors font-['Fira_Code',sans-serif] text-sm"
                >
                  {isCatOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <Folder size={14} style={{ color: cat.iconColor }} />
                  <span>{cat.label}</span>
                </button>

                {isCatOpen && (
                  <div className="ml-5 space-y-0.5 mt-0.5">
                    {cat.subCategories.map((sub) => {
                      const isSubOpen = expandedSubs.includes(sub.label);
                      const isSingleGroup = sub.label === 'all';

                      if (isSingleGroup) {
                        return (
                          <div key={sub.label} className="space-y-0.5">
                            {sub.techs.map((tech) => (
                              <TechCheckbox
                                key={tech}
                                tech={tech}
                                checked={selectedTech.includes(tech)}
                                onToggle={onToggle}
                              />
                            ))}
                          </div>
                        );
                      }

                      return (
                        <div key={sub.label}>
                          <button
                            onClick={() => toggleSub(sub.label)}
                            className="flex items-center gap-2 w-full text-left py-1 text-[#90a1b9] hover:text-[#f8fafc] transition-colors font-['Fira_Code',sans-serif] text-xs"
                          >
                            {isSubOpen ? (
                              <ChevronDown size={12} />
                            ) : (
                              <ChevronRight size={12} />
                            )}
                            <Folder size={12} style={{ color: sub.iconColor }} />
                            <span>{sub.label}</span>
                          </button>

                          {isSubOpen && (
                            <div className="ml-5 space-y-0.5 mt-0.5">
                              {sub.techs.map((tech) => (
                                <TechCheckbox
                                  key={tech}
                                  tech={tech}
                                  checked={selectedTech.includes(tech)}
                                  onToggle={onToggle}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function TechCheckbox({
  tech,
  checked,
  onToggle,
}: {
  tech: string;
  checked: boolean;
  onToggle: (t: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 py-1 px-2 cursor-pointer group rounded hover:bg-[#1d293d]/40 transition-colors">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(tech)}
          className="peer sr-only"
        />
        <div className="w-3.5 h-3.5 border border-[#62748E] rounded-sm bg-[#020618] peer-checked:bg-[#62748E] peer-checked:border-[#62748E] transition-colors flex items-center justify-center">
          <svg
            className="w-2 h-2 text-[#020618] opacity-0 peer-checked:opacity-100"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {TECH_ICONS[tech] ?? null}
      <span className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[12px] group-hover:text-[#f8fafc] transition-colors">
        {tech}
      </span>
    </label>
  );
}
