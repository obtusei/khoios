import { LucideIcon } from "lucide-react";

export type App = {
  id: string;
  name: string;
  title: string;
  icon: IconData;
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

type IconData = {
  IconComponent: LucideIcon;
  bgColor: string;
  textColor: string;
  label: string;
};
