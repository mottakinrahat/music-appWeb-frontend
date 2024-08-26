import React from "react";

const OutlineButton: React.FC<any> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="bg-btn-gradient rounded-lg p-[1px]">
      <div className="bg-white text-textPrimary font-semibold rounded-[7px] py-2 px-6">
        {children}
      </div>
    </button>
  );
};

export default OutlineButton;
