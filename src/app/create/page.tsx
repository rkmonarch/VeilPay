"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useWallet } from "@jup-ag/wallet-adapter";
import { useState } from "react";

export default function Create() {
  const { publicKey } = useWallet();
  const [username, setUsername] = useState("");

  async function createUser() {
    try {
      const res = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          address: publicKey,
          username: username,
          avatar: "",
          tokenAddress: "",
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {}
  }

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create profile</CardTitle>
          <CardDescription>
            Create your new profile in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-4">
            <Avatar className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  placeholder="Enter your username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full">Submit</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
