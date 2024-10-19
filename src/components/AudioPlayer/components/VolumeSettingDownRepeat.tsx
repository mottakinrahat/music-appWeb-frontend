"use client";
import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { LucideMinimize2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Volumn from "@/components/AudioPlayer/components/Volumn";
import { DropDownBtn } from "@/components/AudioPlayer/components/DropDownBtn";
import DownloadOffline from "./DownloadOffline";
import { useDispatch, useSelector } from "react-redux";
import { handleMinimize } from "@/redux/slice/music/musicAsyncTunk";
import { AppDispatch, RootState } from "@/redux/store";
import { PiPlaylistBold } from "react-icons/pi";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import AddSVG from "@/components/svg/AddSVG";

interface VolumeSettingDownRepeatProps {
  volume: number;
  handleVolumeChange: (value: number[]) => void;

  handleMute: () => void;
  songName: string;
  songUrl: string;
  bpm: number;
  handleOpenPlayList: () => void;
  artwork: string;
  songArtist: string;
  songAlbum: string;
  songId: number;
  bpmLoading: boolean;
  isfavorite: boolean;
  handleAddToFavorites: () => void;
}

const VolumeSettingDownRepeat: React.FC<VolumeSettingDownRepeatProps> = ({
  volume,
  handleVolumeChange,
  handleMute,
  songName,
  songUrl,
  bpm,
  handleOpenPlayList,
  artwork,
  bpmLoading,
  songAlbum,
  songArtist,
  songId,
  isfavorite,
  handleAddToFavorites,
}) => {
  const router = useRouter();
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [quality, setQuality] = useState<any>("low");
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
      quality === "low" ? "medium" : quality === "medium" ? "high" : "low";
    setQuality(newQuality);
    localStorage.setItem("quality", newQuality);
  };

  // handle playback speed
  const handlePlaybackSpeed = () => {
    const displaySpeedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const nextIndex =
      (displaySpeedOptions.indexOf(playbackSpeed) + 1) %
      displaySpeedOptions.length;
    // Get the new display speed and the actual speed
    const newDisplaySpeed = displaySpeedOptions[nextIndex];
    // Update the state with the new display speed
    setPlaybackSpeed(newDisplaySpeed);
    // Store the actual speed in localStorage
    localStorage.setItem("speed", newDisplaySpeed.toString());
  };

  const dispatch: AppDispatch = useDispatch();
  const isKaraoke = useSelector((state: RootState) => state.karaoke.karaoke);

  const onMinimize = () => {
    dispatch(handleMinimize({ router: router }));
  };

  const settingContent = (
    <>
      <ul className="flex flex-col gap-[16px] p-[16px]">
        <li className="flex justify-between items-center">
          <span>
            {bpm ? Math.round(bpm * playbackSpeed) : 180 * playbackSpeed} BPM
          </span>
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
            {quality === "low"
              ? "low"
              : quality === "medium"
              ? "Medium"
              : "High"}
          </span>
        </li>
      </ul>
    </>
  );

  return (
    <div>
      <div className="flex justify-center items-center gap-3 sm:gap-[24px]">
        {isKaraoke ? (
          <>
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
            <AddSVG />
            <div
              onClick={handleAddToFavorites}
              className="cursor-pointer hidden min-[340px]:block transition text-white hover:text-accent"
            >
              {isfavorite ? (
                <FaHeart className="p-[2px] sm:p-0 w-6 h-6" />
              ) : (
                <FaRegHeart className="p-[2px] sm:p-0 w-6 h-6" />
              )}
            </div>
          </>
        ) : (
          <>
            <div className="max-lg:hidden">
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
          </>
        )}
      </div>
    </div>
  );
};

export default VolumeSettingDownRepeat;
