import { Button } from "@/components/ui/button";
import { PenBox, SidebarIcon } from "lucide-react";
import React from "react";
import { useNoteStore } from "./store";

type Props = {};

export default function Menu({}: Props) {
  const state = useNoteStore((state) => state);
  return (
    <div className="w-full pl-24 flex justify-between">
      <Button
        onClick={() => {
          state.setSidebarOpen();
        }}
        variant={"ghost"}
        size={"icon-sm"}
      >
        <SidebarIcon />
      </Button>
      <Button className="rounded-full px-4">
        <PenBox /> New Note
      </Button>
    </div>
  );
}
