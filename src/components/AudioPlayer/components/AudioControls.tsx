"use client";
import React, { forwardRef, useEffect, RefObject } from "react";

interface AudioControlsProps {
  src: string;
  onTimeUpdate?: React.ChangeEventHandler<HTMLAudioElement>;
  autoPlay?: boolean;
  onLoadedMetadata?: React.ReactEventHandler<HTMLAudioElement>;
  onEnded?: React.ReactEventHandler<HTMLAudioElement>;
  playbackRate?: number;
  volume?: number; // Volume should be between 0.0 and 1.0
}

const AudioControls = forwardRef<HTMLAudioElement, AudioControlsProps>(
  (
    {
      src,
      onTimeUpdate,
      autoPlay,
      onLoadedMetadata,
      onEnded,
      playbackRate = 1.0,
      volume = 1.0, // Default volume is 1.0 (100%)
    },
    ref
  ) => {
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audioElement = ref.current;
        audioElement.playbackRate = playbackRate;
      }
    }, [playbackRate, ref]);

    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audioElement = ref.current;
        const clampedVolume = Math.max(0, Math.min(volume, 1));
        if (audioElement.volume !== clampedVolume) {
          // console.log(`Setting volume to ${clampedVolume}`);
          audioElement.volume = clampedVolume;
        }
      }
    }, [volume, ref]);

    return (
      <audio
        crossOrigin="anonymous"
        ref={ref}
        src={src}
        onTimeUpdate={onTimeUpdate}
        autoPlay={autoPlay}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      >
        Your browser does not support the audio element.
      </audio>
    );
  }
);

AudioControls.displayName = "AudioControls";

export default AudioControls;
