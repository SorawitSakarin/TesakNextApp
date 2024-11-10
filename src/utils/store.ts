import { create } from "zustand";

interface SideBarProps {
  showingSideBar: boolean;
  setShowingSideBar: (showingSideBar: boolean) => void;
}

export const useSideBarStore = create<SideBarProps>((set) => ({
  showingSideBar: false,
  setShowingSideBar: (showingSideBar: boolean) => set({ showingSideBar }),
}));
