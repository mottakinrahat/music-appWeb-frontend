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
import { handleMinimize } from "@/redux/slice/music/musicAsyncTunk";
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
  artwork: string;
  songArtist: string;
  songAlbum: string;
  songId: number;
  bpmLoading: boolean;
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
  artwork,
  bpmLoading,
  songAlbum,
  songArtist,
  songId,
}) => {
  const router = useRouter();

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [quality, setQuality] = useState<any>("high");
  const [isEqOn, setEqOn] = useState(false);
  const [currentBpm, setCurrentBpm] = useState<number>(bpm);

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

  useEffect(() => {
    setCurrentBpm(bpm * playbackSpeed);
  }, [playbackSpeed, bpm]);

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

  // handle playback speed
  const handlePlaybackSpeed = () => {
    // Displayed values
    const displaySpeedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    // Actual speed values
    // const actualSpeedOptions = [0.45, 0.65, 0.8, 1, 1.25, 1.5, 1.75, 2];

    // Find the next index based on the current displayed speed
    const nextIndex =
      (displaySpeedOptions.indexOf(playbackSpeed) + 1) %
      displaySpeedOptions.length;

    // Get the new display speed and the actual speed
    const newDisplaySpeed = displaySpeedOptions[nextIndex];
    // const newActualSpeed = actualSpeedOptions[nextIndex];

    // Update the state with the new display speed
    setPlaybackSpeed(newDisplaySpeed);

    // Store the actual speed in localStorage
    localStorage.setItem("speed", newDisplaySpeed.toString());

    // Set the actual playback speed in the audio element
    if (audioRef.current) {
      audioRef.current.playbackRate = newDisplaySpeed;
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
          <span>{bpmLoading ? "Loading" : currentBpm?.toFixed(2)} BPM</span>
        </li>
        <li className="flex justify-between gap-4 md:gap-10 items-center">
          <span> Playback speed:</span>{" "}
          <span
            onClick={() => handlePlaybackSpeed()}
            className="font-semibold select-none cursor-pointer"
          >
            {playbackSpeed.toFixed(2)}x
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
      <div className="flex justify-center items-center gap-3 sm:gap-[24px]">
        <div className="max-md:hidden">
          <Volumn
            handleMute={handleMute}
            handleVolumeChange={handleVolumeChange}
            volume={volume}
          />
        </div>
        <div>
          <DownloadOffline
            artwork={artwork}
            songAlbum={songAlbum}
            songArtist={songArtist}
            songId={songId}
            songName={songName}
            songUrl={songUrl}
          />
        </div>
        <div className={"group flex justify-center"}>
          <DropDownBtn
            dropDownContent={settingContent}
            buttonContent={
              <>
                <IoSettingsOutline className="active:text-accent group-hover:text-accent transition hover:text-accent focus-within:text-accent focus:text-accent focus-visible:text-accent  text-xl sm:text-2xl" />
              </>
            }
          />
        </div>
        <div
          className="text-white cursor-pointer active:text-accent group-hover:text-accent transition hover:text-accent focus-within:text-accent focus:text-accent focus-visible:text-accent "
          onClick={onMinimize}
        >
          <LucideMinimize2 className="p-[2px] sm:p-0 sm:text-2xl" />
        </div>
        <div
          className="text-white cursor-pointer active:text-accent group-hover:text-accent transition hover:text-accent focus-within:text-accent focus:text-accent focus-visible:text-accent  text-xl sm:text-2xl"
          onClick={handleOpenPlayList}
        >
          <PiPlaylistBold />
        </div>
      </div>
    </div>
  );
};

export default VolumeSettingDownRepeat;
