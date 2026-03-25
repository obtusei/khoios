import { useComputerStore } from "@/store/computer.store";
import { App } from "@/types/app";
import { ChevronsUpDown, Minus, X } from "lucide-react";
import React from "react";

type Props = {
  win: App;
};

export default function TrafficLights({ win }: Props) {
  const { updateApps } = useComputerStore((s) => s);
  return (
    <div className="flex gap-2 group absolute left-3">
      {/* close */}
      <button
        onClick={() =>
          updateApps((prev) => prev.filter((w) => w.id !== win.id))
        }
        className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center  border-red-600 border-[1.5px]"
      >
        <X className="size-3 text-red-900 hidden group-hover:block" />
      </button>
      {/* minimize */}
      <button
        onClick={() =>
          updateApps((prev) =>
            prev.map((w) => (w.id === win.id ? { ...w, minimized: true } : w)),
          )
        }
        className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center border-yellow-600 border[1.5px]"
      >
        <Minus className="size-3 hidden group-hover:block text-yellow-900" />
      </button>

      {/* maximize */}
      <button
        onClick={() =>
          updateApps((prev) =>
            prev.map((w) =>
              w.id === win.id ? { ...w, maximized: !w.maximized } : w,
            ),
          )
        }
        className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-green-600 border[1.5px]"
      >
        <ChevronsUpDown className="size-3 hidden group-hover:block text-green-900 -rotate-45" />
      </button>
    </div>
  );
}
