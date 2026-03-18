import { SIDEBAR_SECTIONS, COLLAPSED_SECTIONS } from '../constants';
import { FileItem, FolderItem } from './FileExplorerItem';
import type { AboutSection, AboutTab } from '../types';

interface FileExplorerProps {
  expandedSections: AboutSection[];
  expandedSubSections: string[];
  activeTab: AboutTab;
  onToggleSection: (section: AboutSection) => void;
  onToggleSubSection: (subSection: string) => void;
  onSelectTab: (tab: AboutTab) => void;
}

export function FileExplorer({
  expandedSections,
  expandedSubSections,
  activeTab,
  onToggleSection,
  onToggleSubSection,
  onSelectTab,
}: FileExplorerProps) {
  return (
    <div className="p-4 space-y-2">
      {SIDEBAR_SECTIONS.map((section) => (
        <div key={section.key}>
          <FolderItem
            label={section.label}
            iconColor={section.iconColor}
            isExpanded={expandedSections.includes(section.key as AboutSection)}
            onClick={() => onToggleSection(section.key as AboutSection)}
            isRoot
          />

          {expandedSections.includes(section.key as AboutSection) && (
            <div className="ml-6 space-y-1 mt-2">
              {section.files?.map((file) => (
                <FileItem
                  key={file.key}
                  label={file.label}
                  iconColor={file.iconColor}
                  isActive={activeTab === file.key}
                  onClick={() => onSelectTab(file.key as AboutTab)}
                />
              ))}

              {section.subFolders?.map((subFolder) => (
                <div key={subFolder.key}>
                  <FolderItem
                    label={subFolder.label}
                    iconColor={subFolder.iconColor}
                    isExpanded={expandedSubSections.includes(subFolder.key)}
                    onClick={() => onToggleSubSection(subFolder.key)}
                  />

                  {expandedSubSections.includes(subFolder.key) && (
                    <div className="ml-6 space-y-1 mt-1">
                      {subFolder.files?.map((file) => (
                        <FileItem
                          key={file.key}
                          label={file.label}
                          iconColor={file.iconColor}
                          isActive={activeTab === file.key}
                          onClick={() => onSelectTab(file.key as AboutTab)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {COLLAPSED_SECTIONS.map((section) => {
        const isOpen = expandedSections.includes(section.key as AboutSection);
        return (
          <div key={section.key}>
            <FolderItem
              label={section.label}
              iconColor={section.iconColor}
              isExpanded={isOpen}
              onClick={() => onToggleSection(section.key as AboutSection)}
              isRoot
            />
            {isOpen && section.files && (
              <div className="ml-6 space-y-1 mt-1">
                {section.files.map((file) => (
                  <FileItem
                    key={file.key}
                    label={file.label}
                    iconColor={file.iconColor}
                    isActive={activeTab === file.key}
                    onClick={() => onSelectTab(file.key as AboutTab)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
