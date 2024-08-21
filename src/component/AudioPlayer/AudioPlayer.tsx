"use client";
import React, { useEffect, useRef, useState } from "react";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { tracks2 } from "@/app/(withCommonLayout)/player/page";

interface AudioPlayerProps {
  onAudioContextReady: (
    audioContext: AudioContext,
    audioElement: HTMLAudioElement
  ) => void;
  id: any;
  url: any;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  onAudioContextReady,
  id,
  url,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null
  );
  const [repeat, setRepeat] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(true);

  useEffect(() => {
    const handleInteraction = () => {
      if (!audioContextRef.current) {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;
        onAudioContextReady(audioContext, audioRef.current as HTMLAudioElement);
      } else if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
    };

    // Listen for a user interaction
    document.addEventListener("click", handleInteraction);

    // Cleanup event listener
    return () => {
      document.removeEventListener("click", handleInteraction);
    };
  }, [onAudioContextReady]);

  const [currentTime, setCurrentTime] = useState(0);
  //   const id = parseInt(params.id);
  // song loading start
  useEffect(() => {
    // Find the track based on the ID
    const initialTrackIndex = tracks2.findIndex((track) => track.id === id);
    if (initialTrackIndex !== -1) {
      setCurrentTrackIndex(initialTrackIndex);
    }
  }, [id]);

  useEffect(() => {
    if (currentTrackIndex !== null) {
      setPlaying(true);
      // router.push(`/music/${tracks[currentTrackIndex].id}`);
    }
  }, [currentTrackIndex]);

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleNext = () => {
    // Logic for next track (can be extended to handle multiple tracks)
    console.log("Next button clicked");
  };

  const handlePrevious = () => {
    // Logic for previous track (can be extended to handle multiple tracks)
    console.log("Previous button clicked");
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = parseFloat(event.target.value);
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <div className="audio-controls">
      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        controls
      >
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Custom controls */}
      <div className="controls">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleNext}>Next</button>
      </div>

      {/* Seek bar */}
      <input
        type="range"
        min="0"
        max={audioRef.current?.duration || 0}
        value={currentTime}
        onChange={handleSeek}
        className="seek-bar"
      />
    </div>
  );
};

export default AudioPlayer;
