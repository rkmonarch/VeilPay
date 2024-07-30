"use client";

import { UnifiedWalletButton, useWallet } from "@jup-ag/wallet-adapter";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useProfileStore } from "@/store";
import formatAddress from "@/app/utils/formatAddress";
import { useRouter } from "next/navigation";

export default function ConnectButton() {
  const { connected, disconnect, publicKey } = useWallet();
  const { profile, setProfile } = useProfileStore();
  const router = useRouter();

  async function getProfile() {
    try {
      const res = await fetch(`/api/get?address=${publicKey}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data?.error) {
        router.push("/create");
        return;
      }
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (connected) {
      getProfile();
    }
  }, [connected]);

  if (connected && profile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="w-8 h-8">
            <AvatarImage src={profile.avatar} alt={profile?.username} />
            <AvatarFallback>
              {profile?.username.substring(1, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuLabel>
            {formatAddress(profile?.address)}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              router.push("/edit");
            }}
          >
            Edit profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={disconnect}>
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <UnifiedWalletButton
      currentUserClassName="!focus:outline-none !hover:bg-blue-800 !focus:ring-4 !px-5 !py-3 !text-lg font-normal border border-black !border-opacity-[12%] !rounded-md"
      buttonClassName="!text-white !bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
      "
    />
  );
}
