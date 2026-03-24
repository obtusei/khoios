import { useComputerStore } from "@/store/computer.store";
import { App } from "@/types/app";

export default function DesktopIcon({ app }: { app: App }) {
  const { openApp } = useComputerStore((s) => s);
  let clickTimeout: NodeJS.Timeout | null = null;

  const handleClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
      openApp(app); // double click
    } else {
      clickTimeout = setTimeout(() => {
        clickTimeout = null;
      }, 250);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="text-white text-center cursor-pointer select-none"
    >
      <div className="w-16 h-16 bg-white/30 flex items-center justify-center rounded mb-1">
        <app.icon.IconComponent className="w-6 h-6 m-auto" />
      </div>
      <span className="text-sm">{app.title}</span>
    </div>
  );
}
