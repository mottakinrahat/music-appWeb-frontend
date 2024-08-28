/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import addDevice from "@/assets/icons/add-device-svgrepo-com 2.svg";
import { FiSliders } from "react-icons/fi";
import AirPlayButton from "./AirPlayButton";

interface MusicControlsFace {
  handleOpenEqualizer: () => void;
}

const MusicControls = ({ handleOpenEqualizer }: MusicControlsFace) => {
  return (
    <div className="flex gap-12">
      <div>
        <div
          onClick={() => handleOpenEqualizer()}
          className="cursor-pointer text-xl select-none text-white"
        >
          <FiSliders width={30} height={30} />
        </div>
      </div>
      <div>
        <AirPlayButton />
      </div>
      <div>
        <img src={addDevice.src} alt="Add Device" />
      </div>
    </div>
  );
};

export default MusicControls;
