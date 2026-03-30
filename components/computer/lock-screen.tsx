"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

export default function LockScreen({}: Props) {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState({
    email: "email",
    password: "password",
  });

  const [hideLock, setHideLock] = useState(false);
  function handlePassword() {
    if (password == "abhishek") {
      setHideLock(true);
    } else {
      alert("Wrong Password");
    }
  }
  if (hideLock) return null;
  return (
    <div className="absolute inset-0 z-20 bg-white/30 backdrop-blur-3xl flex items-center flex-col gap-4 justify-center">
      {/* <Avatar className="size-32 ">
        <AvatarFallback className="text-2xl">CN</AvatarFallback>
        <AvatarImage src={"https://github.com/obtusei.png"} />
      </Avatar>
      <p className="text-xl text-white text-shadow-2xs">Abhishek Bhatta</p> */}
      <Input
        className=" placeholder:text-white/50 max-w-xs text-lg text-white "
        placeholder="Enter your email"
        type="email"
        value={login.email}
        onChange={(e) => setLogin({ ...login, email: e.target.value })}
      />
      <Input
        className=" placeholder:text-white/50 max-w-xs text-lg text-white ring-amber-600"
        placeholder="Enter your password"
        type="password"
        value={login.password}
        onChange={(e) => setLogin({ ...login, password: e.target.value })}
        onKeyDown={(e) => {
          if (e.key == "Enter" && password != "") {
            handlePassword();
          }
        }}
      />
      <Button size={"lg"} className="w-xs bg-white text-blue-700">
        Login
      </Button>

      <Button variant={"ghost"} size={"xs"}>
        Change User
      </Button>
    </div>
  );
}
