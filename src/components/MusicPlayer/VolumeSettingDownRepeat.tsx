/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import DownloadIcon from "../../assets/icons/download.svg";
import QueueMusicIcon from "../../assets/icons/queue_music.svg";
import { DropDownBtn } from "./DropDownBtn";
import { Switch } from "@/components/ui/switch";
import { IoSettingsOutline } from "react-icons/io5";
import Volumn from "./Volumn";
const VolumeSettingDownRepeat = ({
  volume,
  handleVolumeChange,
  handlePlaybackSpeed,
  playbackSpeed,
  handleMute,
}: any) => {
  const [isEqOn, setEqOn] = useState(false);
  useEffect(() => {
    const eq = localStorage.getItem("isEqOn");
    if (!eq) {
      localStorage.setItem("isEqOn", JSON.stringify(!isEqOn));
    }
    if (eq) {
      setEqOn(JSON.parse(eq!));
    }
  }, [isEqOn]);

  const handleEq = () => {
    setEqOn(!isEqOn);
    localStorage.setItem("isEqOn", JSON.stringify(!isEqOn));
  };

  const settingContent = (
    <>
      <ul className="flex flex-col gap-[16px] p-[16px]">
        <li className="flex justify-between items-center">
          <span> Playback speed:</span>{" "}
          <span
            onClick={handlePlaybackSpeed}
            className="font-bold cursor-pointer"
          >
            x{playbackSpeed}
          </span>
        </li>
        <li className="flex justify-between items-center">
          Sound quality: <span className="font-bold">High</span>
        </li>
        <li className="flex justify-between items-center">
          EQ:{" "}
          <span>
            <Switch checked={isEqOn} onClick={handleEq} id="airplane-mode" />
          </span>
        </li>
      </ul>
    </>
  );
  return (
    <div>
      <div className="flex justify-center items-center gap-[24px]">
        <div className="max-md:hidden">
          <Volumn
            handleMute={handleMute}
            handleVolumeChange={handleVolumeChange}
            volume={volume}
          />
        </div>
        <div>
          <img src={DownloadIcon.src} alt="DownloadIcon" />
        </div>
        <div className={"group"}>
          <DropDownBtn
            dropDownContent={settingContent}
            buttonContent={
              <>
                <IoSettingsOutline className="active:text-accent group-hover:text-accent hover:text-accent focus-within:text-accent focus:text-accent focus-visible:text-accent text-2xl" />
              </>
            }
          />
        </div>
        <div>
          <img src={QueueMusicIcon.src} alt="QueueMusicIcon" />
        </div>
      </div>
    </div>
  );
};

export default VolumeSettingDownRepeat;
