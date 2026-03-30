import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sortable,
  SortableContent,
  SortableItem,
} from "@/components/ui/sortable";
import {
  Clapperboard,
  Download,
  File,
  Dock,
  Image,
  Globe,
  HardDrive,
  Folder,
} from "lucide-react";
import { useState } from "react";
import { useNoteStore } from "./store";

export default function NotesApp() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const store = useNoteStore((s) => s);
  const sidebar = [
    {
      title: "All Notes",
      items: [],
    },
  ];
  return (
    <div className="flex h-full">
      {store.sidebarOpen && (
        <div className="p-2">
          <div className="w-52  overflow-y-auto bg-muted/50 h-full space-y-2 rounded-lg p-2">
            <Button variant={"outline"} size={"sm"} className="w-full">
              <File className="mr-2" />
              New Note
            </Button>
            <Accordion
              defaultValue={sidebar.map((item) => item.title)}
              type="multiple"
            >
              {sidebar.map((section) => (
                <AccordionItem
                  defaultChecked
                  value={section.title}
                  key={section.title}
                >
                  <AccordionTrigger className="hover:no-underline text-sm text-muted-foreground h-fit py-1">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className=" mt-0"></AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      )}

      <div className="flex-1 p-4">
        <div
          className="h-full w-full rounded-lg border-2 border-dashed border-muted"
          contentEditable
        />
      </div>
    </div>
  );
}
