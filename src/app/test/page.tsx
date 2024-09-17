// components/AudioPlayer.tsx

"use client"; // Enabling client-side rendering for React hooks

import { useAudio } from "@/lib/AudioProvider";
import { playImport } from "@/redux/slice/music/musicActionSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const AudioPlayer = () => {
  // const { audioRef } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8); // Initial volume set to 50%
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const dispatch = useDispatch();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSrc =
    "https://res.cloudinary.com/dnzhxznox/video/upload/v1724405518/seg1edqe3t50ypfbrsr7.mp3"; // Replace with your audio source

  useEffect(() => {
    if (audioRef?.current) {
      const audio = audioRef.current;

      // Handle metadata loaded event
      const handleMetadataLoaded = () => {
        setDuration(audio.duration);
      };

      // Handle time update event
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      // Listen for Safari-specific user interactions
      const handleUserInteraction = () => {
        // if (audio.paused) {
        //   audio.play();
        //   dispatch(playImport());
        // }
        audio.volume = volume; // Set initial volume
        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
      };

      // audio.addEventListener("loadedmetadata", handleMetadataLoaded);
      // audio.addEventListener("timeupdate", handleTimeUpdate);

      // document.addEventListener("click", handleUserInteraction);
      // document.addEventListener("touchstart", handleUserInteraction);

      // return () => {
      //   audio.removeEventListener("loadedmetadata", handleMetadataLoaded);
      //   audio.removeEventListener("timeupdate", handleTimeUpdate);
      //   document.removeEventListener("click", handleUserInteraction);
      //   document.removeEventListener("touchstart", handleUserInteraction);
      // };
    }
  }, [audioRef, dispatch, volume]);

  const togglePlay = () => {
    if (audioRef?.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        dispatch(playImport());
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        crossOrigin="anonymous"
      />

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      {/* Seek Bar */}
      <input
        type="range"
        min={0}
        max={duration}
        step={0.01}
        value={currentTime}
        onChange={handleSeekChange}
        className="w-full mt-2"
      />

      {/* Volume Control */}
      <div className="flex items-center mt-2">
        <span className="mr-2">Volume:</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
