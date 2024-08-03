import Link from "next/link";
import ConnectButton from "./ConnectButton";
import { useTokenStore } from "@/store";
import getJupTokens from "@/app/utils/geJupTokens";
import { useEffect } from "react";

export default function Navbar() {
  const { setTokens } = useTokenStore();

  async function handleTokens() {
    try {
      const tokens = await getJupTokens();
      setTokens(tokens);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleTokens();
  }, []);

  return (
    <nav className="flex w-full items-center justify-between px-4 md:px-6 py-4 border-black border-opacity-10 bg-transparent">
      <Link href={"/"}>VeilPay</Link>
      <div className="flex items-center gap-2">
        <ConnectButton />
      </div>
    </nav>
  );
}
