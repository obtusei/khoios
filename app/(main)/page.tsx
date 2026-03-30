"use client";
import { FileApp } from "@/components/built-in-apps/files";
import Background from "@/components/computer/background";
import DesktopIcon from "@/components/computer/desktop-icon";
import Window from "@/components/computer/window";
import { useComputerStore } from "@/store/computer.store";
import { App } from "@/types/app";
import {
  Clapperboard,
  Dock,
  Download,
  File,
  Folder,
  Settings,
} from "lucide-react";
import { useState } from "react";

export default function Desktop() {
  const [windows, setWindows] = useState([]);
  const { openApps, updateApps } = useComputerStore((s) => s);
  const apps: App[] = [
    {
      id: "folder_1",
      name: "Folder 1",
      title: "Folder 1",
      content: (
        <iframe src="https://www.photopea.com/" className="w-full h-full" />
      ),
      x: 100,
      y: 100,
      width: 800,
      height: 600,
      z: 1,
      menu: [],
      minimized: false,
      maximized: false,
      icon: "/folder.webp",
    },
  ];
  // const openApp = (app: App) => {
  //   setWindows((prev) => [
  //     ...prev,
  //     {
  //       id: Date.now(),
  //       title: app.title,
  //       content: app.content,
  //       x: 150 + prev.length * 20,
  //       y: 120 + prev.length * 20,
  //       width: 600,
  //       height: 400,
  //       z: prev.length + 1,

  //     },
  //   ]);
  // };

  return (
    <div className="w-screen h-screen overflow-hidden relative text-black">
      {/* 🌄 Wallpaper */}
      <Background />

      {/* 🖥 Desktop Icons */}
      <div className="p-4 flex flex-col gap-4 mt-10 w-fit">
        {apps.map((app) => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>

      {/* 🪟 Windows */}
      {/* {windows.map((win) =>
        !win.minimized ? (
          <Window key={win.id} win={win} setWindows={setWindows} />
        ) : null,
      )} */}
      {openApps.map((app) => (
        <Window key={app.id} win={app} />
      ))}
    </div>
  );
}
