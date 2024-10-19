"use client";
import VolumeMiddle from "@/components/svg/VolumeMiddle";
import VolumeMuted from "@/components/svg/VolumeMuted";
import VolumeUp from "@/components/svg/VolumeUp";
import {
  GradientRange,
  Slider,
  VolumeRange,
  VolumeRange2,
} from "@/components/ui/slider";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  RxSpeakerLoud,
  RxSpeakerModerate,
  RxSpeakerOff,
  RxSpeakerQuiet,
} from "react-icons/rx";

interface VolumnFace {
  volume: number;
  handleMute: () => void;
  handleVolumeChange: (value: number[]) => void;
}
export default function Volumn({
  handleMute,
  handleVolumeChange,
  volume,
}: VolumnFace) {
  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState(true);

  useEffect(() => {
    // Show the player only if the path matches `/music/:id`
    if (pathname.startsWith("/music/")) {
      setShowPlayer(true);
    } else {
      setShowPlayer(false);
    }
  }, [pathname]);
  return (
    <div className="flex  items-center ">
      {volume === 0 ? (
        <button
          onClick={handleMute}
          className={`${
            !showPlayer
              ? "text-[#262626] font-bold"
              : "text-white hover:text-gray-300"
          } text-xl mx-2 transition `}
        >
          <VolumeMuted />
        </button>
      ) : volume < 0.3 ? (
        <button
          onClick={handleMute}
          className={`${
            !showPlayer
              ? "text-[#262626] font-bold"
              : "text-white hover:text-gray-300"
          } text-xl mx-2 transition `}
        >
          <VolumeMiddle />
        </button>
      ) : volume < 0.5 ? (
        <button
          onClick={handleMute}
          className={`${
            !showPlayer
              ? "text-[#262626] font-bold"
              : "text-white hover:text-gray-300"
          } text-xl mx-2 transition `}
        >
          <VolumeMiddle />
        </button>
      ) : (
        <button
          onClick={handleMute}
          className={`${
            !showPlayer
              ? "text-[#262626] font-bold"
              : "text-white hover:text-gray-300"
          } text-xl mx-2 transition `}
        >
          <VolumeUp />
        </button>
      )}
      {/* volume slider */}
      {showPlayer ? (
        <VolumeRange2
          defaultValue={[volume]}
          max={1}
          min={0}
          value={[volume]}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-20 mx-2 accent-white"
        />
      ) : (
        <VolumeRange
          defaultValue={[volume]}
          max={1}
          min={0}
          value={[volume]}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-20 mx-2 "
        />
      )}
    </div>
  );
}
