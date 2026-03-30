import { create } from "zustand";

type NotesStore = {
  sidebarOpen: boolean;
  setSidebarOpen: () => void;
};

export const useNoteStore = create<NotesStore>((set, get) => ({
  sidebarOpen: false,
  setSidebarOpen: () => set({ sidebarOpen: get().sidebarOpen ? false : true }),
}));
