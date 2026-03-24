import { useComputerStore } from "@/store/computer.store";
import { App } from "@/types/app";

export default function Window({
  win,
  // setWindows,
}: {
  win: App;
}) {
  const { openApps, updateApps } = useComputerStore((s) => s);
  const bringToFront = () => {
    // setWindows((prev) => {
    //   const maxZ = Math.max(...prev.map((w) => w.z), 0);
    //   return prev.map((w) => (w.id === win.id ? { ...w, z: maxZ + 1 } : w));
    // });
    // setWindows((prev: App[]) => {
    //   const maxZ = Math.max(...prev.map((w) => w.z), 0);
    //   return prev.map((w) => (w.id === win.id ? { ...w, z: maxZ + 1 } : w));
    // });
    updateApps((prev: App[]) => {
      const maxZ = Math.max(...prev.map((w) => w.z), 0);
      return prev.map((w) => (w.id === win.id ? { ...w, z: maxZ + 1 } : w));
    });
  };

  // 🟦 Drag
  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (win.maximized) return;

    bringToFront();

    const startX = e.clientX - win.x;
    const startY = e.clientY - win.y;

    const onMove = (e: any) => {
      updateApps((prev: App[]) =>
        prev.map((w) =>
          w.id === win.id
            ? {
                ...w,
                x: e.clientX - startX,
                y: e.clientY - startY,
              }
            : w,
        ),
      );
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // 🔳 Resize
  const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;

    const startW = win.width;
    const startH = win.height;

    const onMove = (e: any) => {
      updateApps((prev: App[]) =>
        prev.map((w) =>
          w.id === win.id
            ? {
                ...w,
                width: Math.max(300, startW + (e.clientX - startX)),
                height: Math.max(200, startH + (e.clientY - startY)),
              }
            : w,
        ),
      );
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div
      onMouseDown={bringToFront}
      className="absolute bg-white rounded-md shadow-xl overflow-hidden flex flex-col"
      style={{
        width: win.maximized ? "100%" : win.width,
        height: win.maximized ? "100%" : win.height,
        transform: win.maximized
          ? "translate(0,0)"
          : `translate(${win.x}px, ${win.y}px)`,
        zIndex: win.z,
      }}
    >
      {/* TITLE BAR */}
      <div
        onMouseDown={startDrag}
        className="flex items-center justify-between px-2 py-1 bg-gray-200 cursor-move"
      >
        <span className="text-sm">{win.title}</span>

        <div className="flex gap-2">
          {/* minimize */}
          <button
            onClick={() =>
              updateApps((prev) =>
                prev.map((w) =>
                  w.id === win.id ? { ...w, minimized: true } : w,
                ),
              )
            }
            className="w-3 h-3 bg-yellow-400 rounded-full"
          />

          {/* maximize */}
          <button
            onClick={() =>
              updateApps((prev) =>
                prev.map((w) =>
                  w.id === win.id ? { ...w, maximized: !w.maximized } : w,
                ),
              )
            }
            className="w-3 h-3 bg-green-500 rounded-full"
          />

          {/* close */}
          <button
            onClick={() =>
              updateApps((prev) => prev.filter((w) => w.id !== win.id))
            }
            className="w-3 h-3 bg-red-500 rounded-full"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-white overflow-hidden">{win.content}</div>

      {/* resize handle */}
      {!win.maximized && (
        <div
          onMouseDown={startResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-blue-500"
        />
      )}
    </div>
  );
}
