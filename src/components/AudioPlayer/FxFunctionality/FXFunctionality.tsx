import FXSVG from "@/components/svg/FXSVG";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const FXFunctionality = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(!showModal)} className="">
        <FXSVG showModal={showModal} />
      </button>

      {showModal && (
        <div className="absolute top-[620px] left-[70px] md:left:[200px] lg:left-[510px] xl:left-[580px] w-[191px] bg-[#DBDAD9] rounded-[8px] py-6 px-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button>Concert Power</button>
            <FaCheck className="text-[#00CCD0]" />
          </div>
          <div className="flex items-center justify-between">
            <button>Studio</button>
          </div>
          <div className="flex items-center justify-between">
            <button>Juzz Club</button>
          </div>
          <div className="flex items-center justify-between">
            <button>Live Mix</button>
          </div>
          <div className="flex items-center justify-between">
            <button>Vocal Booth</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FXFunctionality;
