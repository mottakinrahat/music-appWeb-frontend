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
    <div className="flex justify-between items-center gap-2 lg:gap-4">
      <div>
        <div
          onClick={() => handleOpenEqualizer()}
          className="cursor-pointer text-xl select-none text-white"
        >
          <FiSliders
            width={24}
            height={24}
            className="hover:text-accent transition text-2xl cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-center">
        <AirPlayButton />
      </div>
      <div>
        <MdDevices className="text-white hover:text-accent transition text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default MusicControls;
