"use client";
import React, { forwardRef, useEffect } from "react";

interface AudioControlsProps {
  src: string;
  onTimeUpdate?: React.ChangeEventHandler<HTMLAudioElement>;
  autoPlay?: boolean;
  onLoadedMetadata?: any;
  onEnded?: any;
  playbackRate?: number;
  volume?: number;
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
        ref.current.playbackRate = playbackRate;
      }
    }, [playbackRate, ref]);

    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        ref.current.volume = volume;
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
