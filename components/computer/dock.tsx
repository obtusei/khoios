"use client";

import React, { PropsWithChildren, useEffect, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionProps } from "motion/react";
import {
  Folder,
  Search,
  Inbox,
  Settings,
  Command,
  Compass,
  LucideIcon,
  Dot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useComputerStore } from "@/store/computer.store";
import { ButtonGroupSeparator } from "../ui/button-group";
import FilesApp from "../built-in-apps/files/app";
import { FileApp } from "../built-in-apps/files";
import { NoteApp } from "../built-in-apps/notes";
import { WeatherApp } from "../built-in-apps/weather";
import { BookApp } from "../built-in-apps/books";
import { SettingsApp } from "../built-in-apps/settings";
import { ReminderApp } from "../built-in-apps/reminder";
import { PodcastsApp } from "../built-in-apps/podcasts";
import { PhotosApp } from "../built-in-apps/photos";

export interface AppleDockProps extends VariantProps<typeof appleDockVariants> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  disableMagnification?: boolean;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_SIZE = 68;
const DEFAULT_MAGNIFICATION = 84;
const DEFAULT_DISTANCE = 10;
const DEFAULT_DISABLEMAGNIFICATION = false;

const appleDockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex w-max items-center justify-center gap-2 rounded-xl border p-0 backdrop-blur-md",
);

const AppleDock = React.forwardRef<HTMLDivElement, AppleDockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (
          React.isValidElement<AppleDockIconProps>(child) &&
          child.type === AppleDockIcon
        ) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            size: iconSize,
            magnification: iconMagnification,
            disableMagnification: disableMagnification,
            distance: iconDistance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(appleDockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

AppleDock.displayName = "AppleDock";

export interface AppleDockIconProps extends Omit<
  MotionProps & React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  size?: number;
  src?: string;
  magnification?: number;
  disableMagnification?: boolean;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  alt?: string;
  props?: PropsWithChildren;
}

const AppleDockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  distance = DEFAULT_DISTANCE,
  mouseX,
  alt,
  src,
  ...props
}: AppleDockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const padding = Math.max(6, size * 0.2);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const targetSize = disableMagnification ? size : magnification;

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size],
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{
        width: scaleSize,
        height: scaleSize,
        backgroundImage: `url(${src})`,
      }}
      // src={src}
      className={cn(
        " aspect-square object-contain bg-cover p-2 cursor-pointer",
        disableMagnification && "hover:bg-muted-foreground transition-colors",
      )}
      {...props}
    />
  );
};

AppleDockIcon.displayName = "AppleDockIcon";

export default function Dock() {
  const { openApps, updateApps, dockApps, setDockApps } = useComputerStore(
    (s) => s,
  );

  useEffect(() => {
    setDockApps([
      FileApp,
      NoteApp,
      WeatherApp,
      BookApp,
      SettingsApp,
      ReminderApp,
      PodcastsApp,
      PhotosApp,
    ]);
  }, []);

  const allApps = [...dockApps, ...openApps].filter(
    (app, index, self) => index === self.findIndex((a) => a.id === app.id),
  );
  return (
    <div className="">
      <div className="flex items-center fixed bottom-4 z-30 inset-x-0 justify-center">
        <div className="relative  h-fit">
          <AppleDock
            className="bg-background/40 h-fit rounded-3xl p-2 backdrop-blur-2xl"
            iconMagnification={84}
            iconDistance={5}
          >
            {allApps.map((app) => (
              <AppleDockIcon
                key={app.id}
                aria-label={app.name}
                onClick={() => {
                  updateApps((prev) => [...prev, app]);
                }}
                src={app.icon}
                alt={app.name}
              />
            ))}
            {openApps.length > 0}
          </AppleDock>
        </div>
      </div>
    </div>
  );
}
