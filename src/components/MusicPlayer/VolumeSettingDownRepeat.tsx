/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import DownloadIcon from "../../assets/icons/download.svg";
import QueueMusicIcon from "../../assets/icons/queue_music.svg";
import { DropDownBtn } from "./DropDownBtn";
import { Switch } from "@/components/ui/switch";
import { IoSettingsOutline } from "react-icons/io5";
import Volumn from "./Volumn";

interface VolumeSettingDownRepeatProps {
  volume: number;
  handleVolumeChange: any;
  handleMute: () => void;
}

const VolumeSettingDownRepeat: React.FC<VolumeSettingDownRepeatProps> = ({
  volume,
  handleVolumeChange,
  handleMute,
}: any) => {
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [quality, setQuality] = useState<any>("high");
  const [isEqOn, setEqOn] = useState(false);
  useEffect(() => {
    const eq = localStorage.getItem("isEqOn");
    if (!eq) {
      localStorage.setItem("isEqOn", JSON.stringify(!isEqOn));
    }
    if (eq) {
      setEqOn(JSON.parse(eq!));
    }
    const playbackRate = localStorage.getItem("speed");
    if (!playbackRate) {
      localStorage.setItem("speed", "1");
    }
    if (playbackRate) {
      const getPlayBackRate: number = parseFloat(playbackRate!);
      setPlaybackSpeed(parseFloat(getPlayBackRate.toFixed(2)));
    }
  }, [isEqOn]);

  // toggle quality
  const toggleQuality = () => {
    if (quality === "high") {
      setQuality("medium");
      localStorage.setItem("quality", "medium");
    } else if (quality === "medium") {
      setQuality("low");
      localStorage.setItem("quality", "low");
    } else if (quality === "low") {
      setQuality("high");
      localStorage.setItem("quality", "high");
    }
  };

  // handle palyback speed
  const handlePlaybackSpeed = () => {
    if (playbackSpeed === 1) {
      setPlaybackSpeed(1.5);
      localStorage.setItem("speed", "1.5");
    } else if (playbackSpeed === 1.5) {
      setPlaybackSpeed(2);
      localStorage.setItem("speed", "2");
    } else if (playbackSpeed === 2) {
      setPlaybackSpeed(0.25);
      localStorage.setItem("speed", "0.25");
    } else if (playbackSpeed === 0.25) {
      setPlaybackSpeed(0.5);
      localStorage.setItem("speed", "0.5");
    } else if (playbackSpeed === 0.75) {
      setPlaybackSpeed(0.75);
      localStorage.setItem("speed", "0.75");
    } else {
      setPlaybackSpeed(1);
      localStorage.setItem("speed", "1");
    }
  };

  const settingContent = (
    <>
      <ul className="flex flex-col gap-[16px] p-[16px]">
        <li className="flex justify-between items-center">
          <span>169 BPM</span>
        </li>
        <li className="flex justify-between items-center">
          <span> Playback speed:</span>{" "}
          <span
            onClick={() => handlePlaybackSpeed()}
            className="font-semibold select-none cursor-pointer"
          >
            {playbackSpeed.toFixed(2)}
          </span>
        </li>
        <li className="flex justify-between items-center">
          Sound quality:{" "}
          <span
            onClick={toggleQuality}
            className="font-semibold select-none cursor-pointer"
          >
            {quality === "high"
              ? "High"
              : quality === "medium"
              ? "Medium"
              : "Low"}
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
