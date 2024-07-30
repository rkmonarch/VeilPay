"use client";

import { UnifiedWalletProvider } from "@jup-ag/wallet-adapter";
import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedWalletProvider
      wallets={[]}
      config={{
        autoConnect: true,
        env: "mainnet-beta",
        metadata: {
          name: "UnifiedWallet",
          description: "UnifiedWallet",
          url: "https://jup.ag",
          iconUrls: ["https://jup.ag/favicon.ico"],
        },
        walletlistExplanation: {
          href: "https://station.jup.ag/docs/additional-topics/wallet-list",
        },
      }}
    >
      <Navbar />
      {children}
    </UnifiedWalletProvider>
  );
}
