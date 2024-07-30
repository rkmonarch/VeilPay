import Link from "next/link";
import ConnectButton from "./ConnectButton";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between px-4 md:px-6 py-4 border-black border-opacity-10">
      <Link href={"/"}>VeilPay</Link>
      <div className="flex items-center gap-2">
        <ConnectButton />
      </div>
    </nav>
  );
}
