import { useState } from 'react';
import type { AboutSection, AboutTab } from '../types';

export function useFileExplorer() {
  const [expandedSections, setExpandedSections] = useState<AboutSection[]>(['personal-info']);
  const [expandedSubSections, setExpandedSubSections] = useState<string[]>(['education']);
  const [activeTab, setActiveTab] = useState<AboutTab>('bio');
  const [openTabs, setOpenTabs] = useState<AboutTab[]>(['bio']);

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
    setOpenTabs((prev) => (prev.includes(tab) ? prev : [...prev, tab]));
  };

  const closeTab = (tab: AboutTab) => {
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t !== tab);
      if (next.length === 0) return prev;
      if (activeTab === tab) {
        const idx = prev.indexOf(tab);
        const newActive = next[Math.min(idx, next.length - 1)]!;
        setActiveTab(newActive);
      }
      return next;
    });
  };

  return {
    expandedSections,
    expandedSubSections,
    activeTab,
    openTabs,
    toggleSection,
    toggleSubSection,
    selectTab,
    closeTab,
  };
}
