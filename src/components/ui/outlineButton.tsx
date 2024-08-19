import React from "react";

const OutlineButton: React.FC<any> = ({ children }) => {
  return (
    <button className="bg-btn-gradient rounded-[12px] p-[1px]">
      <div className="bg-white rounded-[11px] py-2 px-8">{children}</div>
    </button>
  );
};

export default OutlineButton;
