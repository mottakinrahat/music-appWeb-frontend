import FXSVG from "@/components/svg/FXSVG";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { DropDownBtn } from "../components/DropDownBtn";

const FXFunctionality = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const dropdownContent = (
    <div className="w-[191px] bg-[#DBDAD9] rounded-[8px] py-6 px-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setSelectedOption("Concert Power")}>
          Concert Power
        </button>
        {selectedOption === "Concert Power" && (
          <FaCheck className="text-[#00CCD0]" />
        )}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={() => setSelectedOption("Studio")}>Studio</button>
        {selectedOption === "Studio" && <FaCheck className="text-[#00CCD0]" />}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={() => setSelectedOption("Juzz Club")}>
          Juzz Club
        </button>
        {selectedOption === "Juzz Club" && (
          <FaCheck className="text-[#00CCD0]" />
        )}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={() => setSelectedOption("Live Mix")}>Live Mix</button>
        {selectedOption === "Live Mix" && (
          <FaCheck className="text-[#00CCD0]" />
        )}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={() => setSelectedOption("Vocal Booth")}>
          Vocal Booth
        </button>
        {selectedOption === "Vocal Booth" && (
          <FaCheck className="text-[#00CCD0]" />
        )}
      </div>
    </div>
  );

  return (
    <div className={"group flex justify-center"}>
      <DropDownBtn
        dropDownContent={dropdownContent}
        buttonContent={
          <FXSVG showModal={true} /> // Ensure FXSVG is used as button content
        }
        className="relative"
      />
    </div>
  );
};

export default FXFunctionality;
