"use client";

import TokenModal from "@/components/modals/TokenModal";
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
import { useProfileStore, useTokenStore } from "@/store";
import { useWallet } from "@jup-ag/wallet-adapter";
import { useState } from "react";
import createProfile from "../utils/createProfile";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Create() {
  const { publicKey } = useWallet();
  const { profile } = useProfileStore();
  const [username, setUsername] = useState(profile?.username);
  const { selectedToken } = useTokenStore();
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(profile?.avatar);
  const router = useRouter();

  async function createUser() {
    try {
      setIsLoading(true);
      if (!publicKey || !selectedToken || !username || username?.length < 3)
        return;
      const profile = await createProfile({
        address: publicKey.toBase58(),
        token: selectedToken,
        username: username,
        avatar: `https://api.dicebear.com/9.x/lorelei/png?seed=${[
          publicKey?.toBase58(),
        ]}&flip=true`,
      });
      if (profile) {
        router.push("/requests");
      }
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-72px)]">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create profile</CardTitle>
          <CardDescription>
            Create your new profile in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center my-4">
            <Avatar className="size-24">
              <AvatarImage
                src={`https://api.dicebear.com/9.x/lorelei/png?seed=${[
                  publicKey?.toBase58(),
                ]}&flip=true`}
              />
              <AvatarFallback>
                {username?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  defaultValue={profile?.username}
                  placeholder="Enter your username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <TokenModal />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full" onClick={createUser}>
            {isLoading ? <Spinner /> : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
