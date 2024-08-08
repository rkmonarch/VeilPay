"use client";

import OrbitingCircles from "@/components/magicui/orbiting-circles";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import GetRadius from "@/utils/getRadius";

export default function Home() {
  const { width } = useWindowDimensions();

  if (!width) return;

  return (
    <div className="container mx-auto relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-4xl sm:text-6xl md:text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
          VEILPAY
        </span>
      </div>
      <OrbitingCircles
        className="size-12 border-none bg-transparent"
        duration={40}
        delay={10}
        radius={GetRadius(width, 1)}
      >
        <img
          src={
            "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
          }
          className="aspect-square rounded-full"
        />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-12 border-none bg-transparent"
        duration={40}
        delay={30}
        radius={GetRadius(width, 1)}
      >
        <img
          src={
            "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
          }
          className="aspect-square rounded-full"
        />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        duration={20}
        radius={GetRadius(width, 2)}
        reverse
      >
        <img
          src={
            "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg"
          }
          className="aspect-square rounded-full"
        />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={GetRadius(width, 2)}
        reverse
      >
        <img
          src={"https://static.jup.ag/jup/icon.png"}
          className="aspect-square rounded-full"
        />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={GetRadius(width, 3)}
        duration={20}
        delay={20}
      >
        <img
          src={
            "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I?ext=png"
          }
          className="aspect-square rounded-full"
        />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={GetRadius(width, 3)}
        duration={20}
        delay={20}
      >
        <img
          src={
            "https://bafkreidvkvuzyslw5jh5z242lgzwzhbi2kxxnpkic5wsvyno5ikvpr7reu.ipfs.nftstorage.link"
          }
          className="aspect-square rounded-full"
        />
      </OrbitingCircles>
    </div>
  );
}
