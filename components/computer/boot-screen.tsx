"use client";
import { useState, useEffect } from "react";
import { Progress } from "../ui/progress";
import Grainient from "../Grainient";
import GradientText from "../GradientText";

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
    <div className="absolute inset-0 z-50 bg-black">
      <div className=" absolute inset-0 flex justify-center flex-col items-center gap-4">
        <GradientText
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          animationSpeed={8}
          showBorder={false}
          className="text-6xl font-extrabold "
        >
          khoios
        </GradientText>
        <br />
        <Progress
          className="w-1/5 [&>div]:rounded-l-full [&>div]:bg-linear-to-r [&>div]:from-[##5227FF] [&>div]:via-[#FF9FFC] [&>div]:to-[#B19EEF]"
          value={progress}
        />
      </div>
    </div>
  );
}
