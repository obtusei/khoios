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

export default function FilesApp() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  const sidebar = [
    {
      title: "Favorites",
      items: [
        {
          title: "Applications",
          icon: File,
        },
        {
          title: "Desktops",
          icon: Dock,
        },
        {
          title: "Documents",
          icon: File,
        },
        {
          title: "Downloads",
          icon: Download,
        },

        {
          title: "Movies",
          icon: Clapperboard,
        },
        {
          title: "Pictures",
          icon: Image,
        },
      ],
    },
    {
      title: "Locations",
      items: [
        {
          title: "Google Drive",
          icon: HardDrive,
        },
        {
          title: "Network",
          icon: Globe,
        },
        {
          title: "External",
          icon: File,
        },
      ],
    },
    {
      title: "Tags",
      items: [
        {
          title: "Red",
          icon: () => <div className="w-3 h-3 rounded-full bg-red-500" />,
        },
        {
          title: "Green",
          icon: () => <div className="w-3 h-3 rounded-full bg-green-500" />,
        },
        {
          title: "Blue",
          icon: () => <div className="w-3 h-3 rounded-full bg-blue-500" />,
        },
        {
          title: "Yellow",
          icon: () => <div className="w-3 h-3 rounded-full bg-yellow-500" />,
        },
      ],
    },
  ];
  return (
    <div className="flex h-full">
      <div className="p-2">
        <div className="w-52  overflow-y-auto bg-muted/50 h-full space-y-2 rounded-lg p-2">
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
                <AccordionContent className=" mt-0">
                  {section.items.map((item) => (
                    <Button
                      key={item.title}
                      size={"sm"}
                      variant={"ghost"}
                      className="px-2 py-1 w-full justify-start cursor-pointer"
                    >
                      <item.icon className="w-4 h-4 inline mr-2" />
                      {item.title}
                    </Button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <Sortable value={items} onValueChange={setItems}>
        <SortableContent className="grid grid-cols-4">
          {items.map((item) => (
            <SortableItem
              className="flex flex-col items-center p-2 hover:bg-muted gap-2 h-fit rounded cursor-pointer"
              key={item}
              value={item}
            >
              <img src="/folder.webp" alt="folder" className="w-full h-16" />
              <p className="text-center selection:bg-transparentx text-xs">
                {item}
              </p>
            </SortableItem>
          ))}
        </SortableContent>
      </Sortable>
    </div>
  );
}
