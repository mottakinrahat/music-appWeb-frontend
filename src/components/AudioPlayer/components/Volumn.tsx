import { Slider } from "@/components/ui/slider";
import React from "react";
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
  return (
    <div className="flex  items-center ">
      {volume === 0 ? (
        <button
          onClick={handleMute}
          className="text-white text-xl mx-2 hover:text-gray-300"
        >
          <RxSpeakerOff />
        </button>
      ) : volume < 0.3 ? (
        <button
          onClick={handleMute}
          className="text-white text-xl mx-2 hover:text-gray-300"
        >
          <RxSpeakerQuiet />
        </button>
      ) : volume < 0.5 ? (
        <button
          onClick={handleMute}
          className="text-white text-xl mx-2 hover:text-gray-300"
        >
          <RxSpeakerModerate />
        </button>
      ) : (
        <button
          onClick={handleMute}
          className="text-white text-xl mx-2 hover:text-gray-300"
        >
          <RxSpeakerLoud />
        </button>
      )}
      {/* volume slider */}
      <Slider
        defaultValue={[volume]}
        max={1}
        min={0}
        value={[volume]}
        step={0.01}
        onValueChange={handleVolumeChange}
        className="w-20 mx-2 accent-white"
      />
    </div>
  );
}
