import React from "react";

const PlayerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row  ">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default PlayerLayout;
