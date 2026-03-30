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
      className="text-white text-center flex gap-2 hover:bg-white/10 p-1 rounded items-center flex-col cursor-pointer select-none"
    >
      <img src={app.icon} alt={app.name} className="w-fit aspect-auto h-16" />
      <span className="text-sm">{app.title}</span>
    </div>
  );
}
