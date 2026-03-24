import Dock from "@/components/computer/dock";
import { Clapperboard, Download, File } from "lucide-react";

export default function FilesApp() {
  return (
    <div className="flex">
      <div className="w-40 bg-muted h-full rounded p-2">
        {[
          {
            title: "Applications",
            icon: File,
          },
          {
            title: "Desktops",
            icon: Dock,
          },
          {
            title: "Documents",
            icon: File,
          },
          {
            title: "Downloads",
            icon: Download,
          },

          {
            title: "Downloads",
            icon: Clapperboard,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="px-2 py-1 hover:bg-white/10 cursor-pointer"
          >
            <item.icon className="w-4 h-4 inline mr-2" />
            {item.title}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4"></div>
    </div>
  );
}
