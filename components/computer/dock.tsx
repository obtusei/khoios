"use client";

import React, { PropsWithChildren, useRef } from "react";
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

export interface AppleDockProps extends VariantProps<typeof appleDockVariants> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  disableMagnification?: boolean;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;
const DEFAULT_DISABLEMAGNIFICATION = false;

const appleDockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md",
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
  magnification?: number;
  disableMagnification?: boolean;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const AppleDockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
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
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-3xl",
        disableMagnification && "hover:bg-muted-foreground transition-colors",
        className,
      )}
      {...props}
    >
      <div>{children}</div>
    </motion.div>
  );
};

AppleDockIcon.displayName = "AppleDockIcon";

export default function Dock() {
  type IconData = {
    IconComponent: LucideIcon;
    bgColor: string;
    textColor: string;
    label: string;
  };

  const dockIcons: IconData[] = [
    {
      IconComponent: Folder,
      bgColor: "bg-blue-100",
      textColor: "text-blue-500",
      label: "Folder",
    },
    {
      IconComponent: Search,
      bgColor: "bg-orange-100",
      textColor: "text-orange-400",
      label: "Search",
    },
    {
      IconComponent: Inbox,
      bgColor: "bg-teal-100",
      textColor: "text-teal-500",
      label: "Inbox",
    },
    {
      IconComponent: Settings,
      bgColor: "bg-red-100",
      textColor: "text-red-500",
      label: "Settings",
    },
    {
      IconComponent: Command,
      bgColor: "bg-amber-100",
      textColor: "text-amber-500",
      label: "Command",
    },
    {
      IconComponent: Compass,
      bgColor: "bg-sky-100",
      textColor: "text-sky-500",
      label: "Compass",
    },
  ];

  const { openApps, updateApps, dockApps } = useComputerStore((s) => s);

  return (
    <div className="">
      <div className="flex items-center fixed bottom-4 z-30 inset-x-0 justify-center">
        <div className="relative  h-fit">
          <AppleDock
            className="bg-background/40 backdrop-blur-2xl"
            iconMagnification={60}
            iconDistance={140}
          >
            {dockIcons.map(({ IconComponent, bgColor, textColor, label }) => (
              <AppleDockIcon
                key={label}
                className={cn(bgColor, textColor)}
                aria-label={label}
              >
                <IconComponent className="w-6 h-6" />
              </AppleDockIcon>
            ))}
            {openApps.length > 0 && <ButtonGroupSeparator className="mx-1" />}
            {openApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col gap-0 items-center justify-center"
              >
                <AppleDockIcon
                  className={cn(app.icon.bgColor, app.icon.textColor)}
                  aria-label="Open Apps Indicator"
                >
                  <app.icon.IconComponent className="w-6 h-6" />
                </AppleDockIcon>
                <Dot className="w-4 h-4 " />
              </div>
            ))}
          </AppleDock>
        </div>
      </div>
    </div>
  );
}
