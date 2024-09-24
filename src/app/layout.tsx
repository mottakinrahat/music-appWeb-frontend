import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import { Toaster } from "sonner";
import { AudioProvider } from "@/lib/AudioProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X Mega Pro",
  description: "X Mega Pro. Your Daily Music Player.",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", url: "/favicon.ico", sizes: "16x16" },
    ],
  },
};

// Migrate themeColor to viewport export
export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<Providers>
    <html data-theme="light" lang="en">
      <body className={outfit.className}>
        <AudioProvider>

        {children}
        <Toaster position="bottom-center" />
        </AudioProvider>
      </body>
    </html>
  </Providers>
  );
}
