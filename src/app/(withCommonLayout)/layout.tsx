import React from "react";

import MinimizePlayer from "@/components/AudioPlayer/MinimizePlayer";
import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navigation/Navbar";
import Script from "next/script";

const PlayerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Script
          src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"
          strategy="beforeInteractive"
        />
      <Navbar />
      <div className="flex flex-row">
        <div className="w-full">
          <div className="z-0">{children}</div>
          <div className="fixed z-50 overflow-hidden bottom-0 w-full">
            <MinimizePlayer />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlayerLayout;
