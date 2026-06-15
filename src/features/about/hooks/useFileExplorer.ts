import { useState } from 'react';
import { useSearchParams } from 'react-router';
import type { AboutSection, AboutTab } from '../types';
import { ABOUT_CONTENT } from '../constants';

const VALID_TABS = new Set(Object.keys(ABOUT_CONTENT));

export function useFileExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('f');
  const activeTab: AboutTab =
    tabParam && VALID_TABS.has(tabParam) ? (tabParam as AboutTab) : 'bio';

  const [expandedSections, setExpandedSections] = useState<AboutSection[]>(['personal-info']);
  const [expandedSubSections, setExpandedSubSections] = useState<string[]>(['education']);
  const [openTabs, setOpenTabs] = useState<AboutTab[]>(() =>
    activeTab !== 'bio' ? ['bio', activeTab] : ['bio'],
  );

  const setActiveTabUrl = (tab: AboutTab) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (tab === 'bio') next.delete('f');
        else next.set('f', tab);
        return next;
      },
      { replace: true },
    );
  };

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
    setOpenTabs((prev) => (prev.includes(tab) ? prev : [...prev, tab]));
    setActiveTabUrl(tab);
  };

  const closeTab = (tab: AboutTab) => {
    const next = openTabs.filter((t) => t !== tab);
    if (next.length === 0) return;
    setOpenTabs(next);
    if (activeTab === tab) {
      const idx = openTabs.indexOf(tab);
      const newActive = next[Math.min(idx, next.length - 1)]!;
      setActiveTabUrl(newActive);
    }
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
