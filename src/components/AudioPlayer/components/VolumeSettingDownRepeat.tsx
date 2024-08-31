/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";

import { IoSettingsOutline } from "react-icons/io5";

import { LucideMinimize2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Volumn from "@/components/AudioPlayer/components/Volumn";

import { DropDownBtn } from "@/components/AudioPlayer/components/DropDownBtn";
import DownloadOffline from "./DownloadOffline";
import { useDispatch } from "react-redux";
import { handleMinimize } from "@/redux/slice/musicAsyncTunk";
import { AppDispatch } from "@/redux/store";
import { PiPlaylistBold } from "react-icons/pi";

interface VolumeSettingDownRepeatProps {
  volume: number;
  handleVolumeChange: any;
  handleMute: () => void;
  songName: string;
  songUrl: string;
  audioRef: any;
  bpm: number;
  handleOpenPlayList: () => void;
}

const VolumeSettingDownRepeat: React.FC<VolumeSettingDownRepeatProps> = ({
  volume,
  handleVolumeChange,
  handleMute,
  songName,
  songUrl,
  audioRef,
  bpm,
  handleOpenPlayList,
}: any) => {
  const router = useRouter();

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
    const newQuality =
      quality === "high" ? "medium" : quality === "medium" ? "low" : "high";
    setQuality(newQuality);
    localStorage.setItem("quality", newQuality);

    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  // handle palyback speed
  const handlePlaybackSpeed = () => {
    const speedOptions = [1, 1.5, 2, 0.5, 0.75];
    const nextIndex =
      (speedOptions.indexOf(playbackSpeed) + 1) % speedOptions.length;
    const newSpeed = speedOptions[nextIndex];
    setPlaybackSpeed(newSpeed);
    localStorage.setItem("speed", newSpeed.toString());

    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const dispatch: AppDispatch = useDispatch();

  const onMinimize = () => {
    dispatch(handleMinimize({ router: router }));
  };
  const settingContent = (
    <>
      <ul className="flex flex-col gap-[16px] p-[16px]">
        <li className="flex justify-between items-center">
          <span>{bpm} BPM</span>
        </li>
        <li className="flex justify-between gap-4 md:gap-10 items-center">
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
        {/* <div>
          <img src={DownloadIcon.src} alt="DownloadIcon" />
        </div> */}
        {/* Download button  */}
        <div>
          <DownloadOffline songName={songName} songUrl={songUrl} />
        </div>
        <div className={"group flex justify-center"}>
          <DropDownBtn
            dropDownContent={settingContent}
            buttonContent={
              <>
                <IoSettingsOutline className="active:text-accent group-hover:text-accent transition hover:text-accent focus-within:text-accent focus:text-accent focus-visible:text-accent text-2xl" />
              </>
            }
          />
        </div>
        <div
          className="text-white cursor-pointer active:text-accent group-hover:text-accent transition hover:text-accent focus-within:text-accent focus:text-accent focus-visible:text-accent text-2xl"
          onClick={onMinimize}
        >
          {/* <img src={QueueMusicIcon.src} alt="QueueMusicIcon" /> */}
          <LucideMinimize2 />
        </div>
        <div
          className="text-white cursor-pointer active:text-accent group-hover:text-accent transition hover:text-accent focus-within:text-accent focus:text-accent focus-visible:text-accent text-2xl"
          onClick={handleOpenPlayList}
        >
          {/* <img src={QueueMusicIcon.src} alt="QueueMusicIcon" /> */}
          <PiPlaylistBold />
        </div>
      </div>
    </div>
  );
};

export default VolumeSettingDownRepeat;
