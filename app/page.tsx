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
      id: "photopea",
      name: "Photopea",
      title: "Photopea",
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
      icon: {
        IconComponent: Folder,
        bgColor: "bg-blue-100",
        textColor: "text-blue-500",
        label: "Folder",
      },
    },
    {
      id: "google",
      name: "Google",
      title: "Google",
      content: <iframe src="https://google.com" className="w-full h-full" />,
      x: Math.random() * 200,
      y: Math.random() * 200,
      width: 800,
      height: 600,
      z: 1,
      menu: [],
      minimized: false,
      maximized: false,
      icon: {
        IconComponent: Settings,
        bgColor: "bg-blue-100",
        textColor: "text-blue-500",
        label: "Folder",
      },
    },
    FileApp,
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
      <div className="p-4 flex flex-col gap-4 w-24">
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
