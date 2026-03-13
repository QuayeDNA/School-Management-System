import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarExpanded: true,
  sidebarVisible: true,
  setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
  setSidebarVisible: (visible) => set({ sidebarVisible: visible }),
  toggleSidebar: () =>
    set((state) => ({
      sidebarExpanded: !state.sidebarExpanded,
      sidebarVisible: true,
    })),
  closeSidebar: () => set({ sidebarVisible: false }),
  openSidebar: () => set({ sidebarVisible: true }),
}));
