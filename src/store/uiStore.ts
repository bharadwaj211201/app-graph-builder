import { create } from 'zustand';

type Tab = 'config' | 'runtime';

type UIState = {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: Tab;

  setSelectedAppId: (id: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  toggleMobilePanel: () => void;
  setActiveTab: (tab: Tab) => void;
};

export const useUIStore = create<UIState>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',

  setSelectedAppId: (id) => set({ selectedAppId: id }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  toggleMobilePanel: () =>
    set((s) => ({ isMobilePanelOpen: !s.isMobilePanelOpen })),
  setActiveTab: (tab) => set({ activeInspectorTab: tab })
}));