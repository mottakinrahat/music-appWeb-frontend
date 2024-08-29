import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X Mega Pro",
  description: "X Mega Pro. Your Daily Music Player.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html data-theme="light" lang="en">
        <body className={outfit.className}>{children}</body>
      </html>
    </Providers>
  );
}
