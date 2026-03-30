import { Folder, Notebook } from "lucide-react";
import NotesApp from "./app";
import Menu from "./menu";

import { App } from "@/types/app";

export const ContactsApp: App = {
  id: "contacts",
  name: "Contacts",
  title: "Contacts",
  content: <NotesApp />,
  x: Math.random() * 200,
  y: Math.random() * 200,
  width: 800,
  height: 600,
  z: 1,
  menu: [],
  minimized: false,
  maximized: false,
  topBar: {
    custom: <Menu />,
  },
  icon: "/contacts.webp",
};
