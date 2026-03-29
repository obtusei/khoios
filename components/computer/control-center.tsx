import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Settings2, Wifi } from "lucide-react";

type Props = {};

export default function ControlCenter({}: Props) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"ghost"} className="rounded-full" size={"icon-sm"}>
            <Settings2 />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-white/40 backdrop-blur-3xl">
          <Button size={"icon"}>
            <Wifi />
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
