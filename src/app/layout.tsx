import Layout from "@/components/Layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VeilPay",
  description:
    "VeilPay is a secure and private payment platform that allows users to receive and make donations in various cryptocurrencies. It provides a seamless way to support causes and individuals with the coin of your choice, ensuring confidentiality and ease of use.",
  openGraph: {
    images: "https://www.veilpay.xyz/veilpay.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Layout>
        <body className={inter.className}>{children}</body>
      </Layout>
    </html>
  );
}
