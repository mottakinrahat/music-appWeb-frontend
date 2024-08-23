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
  handleVolumeChange: any;
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
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        className="w-1/2 mx-2 accent-white"
        onChange={handleVolumeChange}
      />
    </div>
  );
}
