import AppleDockDemo from "@/components/computer/dock";
import TopMenu from "@/components/computer/menu-bar";

import BootScreen from "@/components/computer/boot-screen";
import Background from "@/components/computer/background";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Background />
    </div>
  );
}
