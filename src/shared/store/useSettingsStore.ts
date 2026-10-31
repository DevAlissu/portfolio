import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BackgroundTheme = 'waves' | 'matrix' | 'dust';

interface SettingsState {
  background: BackgroundTheme;
  setBackground: (background: BackgroundTheme) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      background: 'waves',
      setBackground: (background) => set({ background }),
    }),
    { name: 'devalissu-settings' },
  ),
);
