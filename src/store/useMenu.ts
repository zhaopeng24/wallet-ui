import { create } from "zustand";

interface MyStore {
  currentMenu: string;
  showMenu: boolean;
  setMenu: (menu: string) => void;
}

export const useMenu = create<MyStore>((set) => ({
  currentMenu: "",
  showMenu: false,
  setMenu: (menu) => set((state) => ({ currentMenu: menu })),
}));
