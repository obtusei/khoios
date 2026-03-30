import AppleDockDemo from "@/components/computer/dock";
import TopMenu from "@/components/computer/menu-bar";

import BootScreen from "@/components/computer/boot-screen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TopMenu />
      {children}
      <AppleDockDemo />

      <BootScreen />
    </div>
  );
}
