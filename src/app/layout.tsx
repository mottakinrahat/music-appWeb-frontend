import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import Head from "next/head";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
        <Head>
          {/* Add favicon links */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body className={outfit.className}>
          {children}
          <Toaster position="bottom-center" />
        </body>
      </html>
    </Providers>
  );
}
