import Background from "@/components/computer/background";
import LockScreen from "@/components/computer/lock-screen";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <div>
      <LockScreen />
      <Button
        size={"sm"}
        variant={"outline"}
        className=" bg-transparent border-black z-50 absolute bottom-5 right-5"
        asChild
      >
        <Link href={"/setup"}>Setup </Link>
      </Button>
    </div>
  );
}
