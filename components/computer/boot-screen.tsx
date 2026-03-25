"use client";
import { useState, useEffect } from "react";
import { Progress } from "../ui/progress";

export default function BootScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const intervalTime = 50; // update every 50ms
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  if (progress >= 100) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black text-white flex justify-center flex-col items-center gap-4">
      <h1 className="text-6xl font-extrabold bg-linear-to-r from-blue-200 via-purple-400 to-pink-300 bg-clip-text text-transparent">
        khoios
      </h1>
      <Progress className="w-64 cursor-progress" value={progress} />
    </div>
  );
}
