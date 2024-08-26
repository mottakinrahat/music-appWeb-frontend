import React from "react";

const OutlineButton: React.FC<any> = ({ children, onClick, textColor }) => {
  return (
    <button onClick={onClick}>
      <div
        className={`bg-transparent border border-accent active:scale-[0.98] ${
          textColor ? textColor : "text-textPrimary"
        } font-semibold rounded-[7px] py-2 px-6`}
      >
        {children}
      </div>
    </button>
  );
};

export default OutlineButton;
