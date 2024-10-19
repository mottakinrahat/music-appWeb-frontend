import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import Head from "next/head";
import { Toaster } from "sonner";
import "core-js/features/array/reverse";
import "core-js/features/promise/finally";
import "core-js";
import Script from "next/script";
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
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <Script
          src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"
          strategy="beforeInteractive"
        />
        <body className={outfit.className}>
          {children}
          <Toaster position="bottom-center" />
        </body>
      </html>
    </Providers>
  );
}
