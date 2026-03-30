"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type Props = {};

export default function SetupComputer({}: Props) {
  const [register, setRegister] = useState({
    osName: "",
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        name: register.fullName,
        email: register.email,
        password: register.password,
        image: "",
        callbackURL: "/login",
        osName: register.osName,
        username: register.username,
      },
      {
        onRequest: (ctx) => {
          //show loading
          setLoading(true);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          setLoading(false);
          toast.success(
            "Profile created successfully! Please check your email to verify your account.",
          );
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="inset-0 absolute backdrop-blur-2xl justify-center flex items-center">
      <Card className="bg-white relative max-w-1/2 rounded-3xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Setup</CardTitle>
          <CardDescription>
            Create a profile for user profile for khoios - your own browser OS
            that you can access it from anywhere. Your data is end-to-end
            encrypted and secure. Only you can access it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-12">
            <div className="flex flex-col w-full items-center justify-center gap-2">
              <Avatar className="size-24">
                <AvatarFallback>KHOI</AvatarFallback>
              </Avatar>
              <Button size={"sm"} variant={"ghost"} className="text-blue-700">
                Change Profile
              </Button>
            </div>
            <div className="grid grid-cols-2 space-y-4 w-full gap-4">
              <div className="space-y-2">
                <Label>Your OS Name</Label>
                <Input
                  className=" text-lg"
                  placeholder="Give a name to your os"
                  type="email"
                  value={register.osName}
                  onChange={(e) =>
                    setRegister({ ...register, osName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  className=" text-lg"
                  placeholder="Enter your email"
                  type="email"
                  value={register.fullName}
                  onChange={(e) =>
                    setRegister({ ...register, fullName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Username</Label>

                <Input
                  className=" text-lg"
                  placeholder="Enter an username"
                  type="email"
                  value={register.username}
                  onChange={(e) =>
                    setRegister({ ...register, username: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>

                <Input
                  className=" text-lg"
                  placeholder="Enter your email"
                  type="email"
                  value={register.email}
                  onChange={(e) =>
                    setRegister({ ...register, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>

                <Input
                  className=" text-lgring-amber-600"
                  placeholder="Enter your password"
                  type="password"
                  value={register.password}
                  onChange={(e) =>
                    setRegister({ ...register, password: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Confirm Password</Label>

                <Input
                  className=" text-lgring-amber-600"
                  placeholder="Confirm your password"
                  type="password"
                  value={register.confirmPassword}
                  onChange={(e) =>
                    setRegister({
                      ...register,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between items-center flex">
          <Button
            size={"lg"}
            asChild
            variant={"ghost"}
            className="rounded-full px-4"
            disabled={loading}
          >
            <Link href={"/login"}>
              <ChevronLeft /> Already have a profile
            </Link>
          </Button>
          <Button
            size={"lg"}
            className="rounded-full px-4"
            onClick={handleSubmit}
            disabled={loading}
          >
            Setup your profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
