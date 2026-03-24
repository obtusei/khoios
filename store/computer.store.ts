import { App } from "@/types/app";
import { create } from "zustand";

interface ComputerState {
  activeApp: App | null;
  openApps: App[];
  dockApps: App[];
  minimizedApps: App[];
  openApp: (app: App) => void;
  minimizeApp: (appId: string) => void;
  restoreApp: (appId: string) => void;
  closeApp: (appId: string) => void;
  updateApps: (updater: (prev: App[]) => App[]) => void;
  setDockApps: (apps: App[]) => void;
  removeFromDock: (appId: string) => void;
  setActiveApp: (app: App) => void;
}

export const useComputerStore = create<ComputerState>((set) => ({
  activeApp: null,
  openApps: [],
  dockApps: [],
  minimizedApps: [],
  openApp: (app) =>
    set((state) => {
      if (state.openApps.find((a) => a.id === app.id)) return state;
      return { openApps: [...state.openApps, app] };
    }),

  minimizeApp: (appId) =>
    set((state) => {
      const app = state.openApps.find((a) => a.id === appId);
      if (!app) return state;

      return {
        openApps: state.openApps.filter((a) => a.id !== appId),
        minimizedApps: [...state.minimizedApps, app],
      };
    }),

  restoreApp: (appId) =>
    set((state) => {
      const app = state.minimizedApps.find((a) => a.id === appId);
      if (!app) return state;

      return {
        minimizedApps: state.minimizedApps.filter((a) => a.id !== appId),
        openApps: [...state.openApps, app],
      };
    }),

  closeApp: (appId) =>
    set((state) => ({
      openApps: state.openApps.filter((a) => a.id !== appId),
      minimizedApps: state.minimizedApps.filter((a) => a.id !== appId),
    })),

  updateApps: (updater: (prev: App[]) => App[]) =>
    set((state) => ({
      openApps: updater(state.openApps),
    })),
  setDockApps: (apps) =>
    set((state) => ({
      dockApps: apps,
    })),
  removeFromDock: (appId) =>
    set((state) => ({
      dockApps: state.dockApps.filter((a) => a.id !== appId),
    })),
  setActiveApp: (app) =>
    set((state) => ({
      activeApp: app,
    })),
}));
