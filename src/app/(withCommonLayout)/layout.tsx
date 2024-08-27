import React from "react";

import MinimizePlayer from "@/components/AudioPlayer/MinimizePlayer";

const PlayerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row  ">
      <div className="w-full">
        <div className="z-0">{children}</div>
        <div className="fixed z-50 bottom-0 w-full">
          <MinimizePlayer />
        </div>
      </div>
    </div>
  );
};

export default PlayerLayout;
