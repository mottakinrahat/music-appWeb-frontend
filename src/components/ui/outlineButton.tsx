import React from "react";

const OutlineButton: React.FC<any> = ({ children }) => {
  return (
    <button className="bg-btn-gradient rounded-[10px] p-[1px]">
      <div className="bg-white text-textPrimary font-semibold rounded-[9px] py-2 px-6">
        {children}
      </div>
    </button>
  );
};

export default OutlineButton;
