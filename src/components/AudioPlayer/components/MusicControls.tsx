/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import addDevice from "@/assets/icons/add-device-svgrepo-com 2.svg";
import { FiSliders } from "react-icons/fi";
import AirPlayButton from "./AirPlayButton";
import { MdDevices } from "react-icons/md";

interface MusicControlsFace {
  handleOpenEqualizer: () => void;
}

const MusicControls = ({ handleOpenEqualizer }: MusicControlsFace) => {
  return (
    <div className="flex justify-between items-center gap-6 lg:gap-12">
      <div>
        <div
          onClick={() => handleOpenEqualizer()}
          className="cursor-pointer text-xl select-none text-white"
        >
          <FiSliders width={24} height={24} />
        </div>
      </div>
      <div className="flex items-center">
        <AirPlayButton />
      </div>
      <div>
        <MdDevices className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default MusicControls;
