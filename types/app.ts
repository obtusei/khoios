import { LucideIcon } from "lucide-react";

export type App = {
  id: string;
  name: string;
  title: string;
  icon: string;
  content: React.ReactNode;
  topBar?: {
    title?: string;
    custom?: React.ReactNode;
  };
  x: number;
  y: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  width: number;
  height: number;
  menu: {
    label: string;
    onClick: () => void;
    subMenu?: {
      label: string;
      shortcut?: string;
      onClick: () => void;
    }[];
  }[];
};
