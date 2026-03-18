import { Menu } from 'lucide-react';
import { useFileExplorer } from './hooks/useFileExplorer';
import { FileExplorer } from './components/FileExplorer';
import { ABOUT_CONTENT } from './constants';

export function AboutPage() {
  const {
    expandedSections,
    expandedSubSections,
    activeTab,
    mobileSidebarOpen,
    toggleSection,
    toggleSubSection,
    selectTab,
    toggleMobileSidebar,
    closeMobileSidebar,
  } = useFileExplorer();

  const content = ABOUT_CONTENT[activeTab];

  const explorerProps = {
    expandedSections,
    expandedSubSections,
    activeTab,
    onToggleSection: toggleSection,
    onToggleSubSection: toggleSubSection,
    onSelectTab: selectTab,
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      <aside className="hidden lg:block w-[clamp(220px,20vw,320px)] border-r border-[#314158] bg-[#020618]">
        <FileExplorer {...explorerProps} />
      </aside>

      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-[#020618] border-r border-[#314158] transition-transform z-50 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <FileExplorer {...explorerProps} />
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
          <div className="max-w-3xl">
            <div className="font-['Fira_Code',sans-serif] text-sm sm:text-base">
              {content.format === 'comment' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-[#f8fafc] text-lg">/**</h3>
                    {content.lines.map((line, i) => (
                      <p key={i} className="text-[#90a1b9] leading-relaxed">
                        {line}
                      </p>
                    ))}
                    <h3 className="text-[#f8fafc] text-lg">*/</h3>
                  </div>
                </div>
              )}
              {content.format === 'list' && (
                <div className="space-y-4">
                  <p className="text-[#90a1b9] leading-relaxed">{content.title}</p>
                  <ul className="space-y-2 text-[#90a1b9]">
                    {content.lines.map((line, i) => (
                      <li key={i}>{`\u2022 ${line}`}</li>
                    ))}
                  </ul>
                </div>
              )}
              {content.format === 'text' && (
                <div className="space-y-4">
                  <p className="text-[#90a1b9] leading-relaxed">{content.title}</p>
                  {content.lines.map((line, i) => (
                    <p key={i} className="text-[#90a1b9] leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#020618] text-[#f8fafc] p-2 rounded-full shadow-lg"
      >
        <Menu size={24} />
      </button>

      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileSidebar}
        />
      )}
    </div>
  );
}
