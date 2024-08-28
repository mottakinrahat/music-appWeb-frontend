"use client";
import { GradientRange, Slider } from "@/components/ui/slider";
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
              ? "text-textPrimary hover:text-textSecondary"
              : "text-white hover:text-gray-300"
          } text-xl mx-2 transition `}
        >
          <RxSpeakerOff />
        </button>
      ) : volume < 0.3 ? (
        <button
          onClick={handleMute}
          className={`${
            !showPlayer
              ? "text-textPrimary hover:text-textSecondary"
              : "text-white hover:text-gray-300"
          } text-xl mx-2 transition `}
        >
          <RxSpeakerQuiet />
        </button>
      ) : volume < 0.5 ? (
        <button
          onClick={handleMute}
          className={`${
            !showPlayer
              ? "text-textPrimary hover:text-textSecondary"
              : "text-white hover:text-gray-300"
          } text-xl mx-2 transition `}
        >
          <RxSpeakerModerate />
        </button>
      ) : (
        <button
          onClick={handleMute}
          className={`${
            !showPlayer
              ? "text-textPrimary hover:text-textSecondary"
              : "text-white hover:text-gray-300"
          } text-xl mx-2 transition `}
        >
          <RxSpeakerLoud />
        </button>
      )}
      {/* volume slider */}
      {showPlayer ? (
        <Slider
          defaultValue={[volume]}
          max={1}
          min={0}
          value={[volume]}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-20 mx-2 accent-white"
        />
      ) : (
        <GradientRange
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
