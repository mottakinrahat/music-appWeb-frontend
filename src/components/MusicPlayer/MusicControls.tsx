/* eslint-disable @next/next/no-img-element */
import instantMix from "../../assets/icons/instant_mix.svg";
import airPlay from "../../assets/icons/airplay.svg";
import addDevice from "../../assets/icons/add-device-svgrepo-com 2.svg";
import React from "react";
interface MusicControlsFace {
  handleOpenEqualizer: () => void;
  // repeat: boolean;
}
const MusicControls = ({ handleOpenEqualizer }: MusicControlsFace) => {
  return (
    <div className="flex gap-12">
      <div>
        <img
          onClick={() => handleOpenEqualizer()}
          className="cursor-pointer"
          src={instantMix.src}
          alt="RepeatIcon"
        />
      </div>
      <div>
        <img src={airPlay.src} alt="RepeatIcon" />
      </div>
      <div>
        <img src={addDevice.src} alt="RepeatIcon" />
      </div>
    </div>
  );
};

export default MusicControls;
