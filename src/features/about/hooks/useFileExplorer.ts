import { useState } from 'react';
import type { AboutSection, AboutTab } from '../types';

export function useFileExplorer() {
  const [expandedSections, setExpandedSections] = useState<AboutSection[]>(['personal-info']);
  const [expandedSubSections, setExpandedSubSections] = useState<string[]>(['education']);
  const [activeTab, setActiveTab] = useState<AboutTab>('bio');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSection = (section: AboutSection) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section],
    );
  };

  const toggleSubSection = (subSection: string) => {
    setExpandedSubSections((prev) =>
      prev.includes(subSection) ? prev.filter((s) => s !== subSection) : [...prev, subSection],
    );
  };

  const selectTab = (tab: AboutTab) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  };

  const toggleMobileSidebar = () => setMobileSidebarOpen((prev) => !prev);
  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  return {
    expandedSections,
    expandedSubSections,
    activeTab,
    mobileSidebarOpen,
    toggleSection,
    toggleSubSection,
    selectTab,
    toggleMobileSidebar,
    closeMobileSidebar,
  };
}
