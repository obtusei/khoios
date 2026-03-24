import { Folder } from "lucide-react";
import FilesApp from "./app";

export const FileApp = {
  id: "files",
  name: "Files",
  title: "Files",
  content: <FilesApp />,
  x: Math.random() * 200,
  y: Math.random() * 200,
  width: 800,
  height: 600,
  z: 1,
  menu: [],
  minimized: false,
  maximized: false,
  icon: {
    IconComponent: Folder,
    bgColor: "bg-blue-100",
    textColor: "text-blue-500",
    label: "Folder",
  },
};
