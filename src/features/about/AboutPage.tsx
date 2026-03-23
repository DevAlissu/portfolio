import { useFileExplorer } from './hooks/useFileExplorer';
import { FileExplorer } from './components/FileExplorer';
import { TabItem } from './components/TabItem';
import { TabContent } from './components/TabContent';
import { ABOUT_CONTENT } from './constants';

export function AboutPage() {
  const {
    expandedSections,
    expandedSubSections,
    activeTab,
    openTabs,
    toggleSection,
    toggleSubSection,
    selectTab,
    closeTab,
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
    <div className="h-full flex flex-col lg:flex-row min-w-0">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[clamp(220px,20vw,320px)] border-r border-[#314158] bg-[#020618]">
        <FileExplorer {...explorerProps} />
      </aside>

      {/* Mobile inline accordion */}
      <div className="lg:hidden border-b border-[#314158] bg-[#020618]">
        <FileExplorer {...explorerProps} />
      </div>

      <main className="flex-1 min-w-0 overflow-auto flex flex-col">
        {/* Desktop tab bar */}
        <div className="hidden lg:flex border-b border-[#314158] bg-[#020618] overflow-x-auto">
          {openTabs.map((tab) => (
            <TabItem
              key={tab}
              tab={tab}
              isActive={activeTab === tab}
              canClose={openTabs.length > 1}
              onSelect={selectTab}
              onClose={closeTab}
            />
          ))}
        </div>

        <div className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
            <div key={activeTab} className="max-w-3xl animate-tab-fade-in">
              <TabContent content={content} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
