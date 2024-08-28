/* eslint-disable @next/next/no-img-element */
import instantMix from "@/assets/icons/instant_mix.svg";
import airPlay from "@/assets/icons/airplay.svg";
import addDevice from "@/assets/icons/add-device-svgrepo-com 2.svg";
import React from "react";
import { MdAirplay } from "react-icons/md";
import { DropDownBtn } from "./DropDownBtn";
import { Airplay } from "lucide-react";
import { FiSliders } from "react-icons/fi";
interface MusicControlsFace {
  handleOpenEqualizer: () => void;
  // repeat: boolean;
}
const MusicControls = ({ handleOpenEqualizer }: MusicControlsFace) => {
  return (
    <div className="flex gap-12">
      <div>
        <div
          onClick={() => handleOpenEqualizer()}
          className="cursor-pointer text-white"
        >
          <FiSliders width={24} hanging={24} />
        </div>
      </div>
      <div>
        <DropDownBtn
          dropDownContent={airplayControls}
          buttonContent={<Airplay className="text-white" />}
        ></DropDownBtn>
      </div>
      <div>
        <img src={addDevice.src} alt="RepeatIcon" />
      </div>
    </div>
  );
};

const airplayControls = (
  <>
    <div className="max-w-md min-h-40 bg-white"></div>
  </>
);

export default MusicControls;
