"use client";
import { pauseSong } from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";
import React, { forwardRef, useEffect, RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    const dispatch = useDispatch();
    const playing = useSelector((state: RootState) => state.player.playing);

    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audioElement = ref.current;
        audioElement.playbackRate = playbackRate;

        if (playing) {
          audioElement?.play().catch((err) => {
            if (err) {
              audioElement?.pause();
              dispatch(pauseSong());
            }
          });
        } else if (!playing) {
          audioElement?.pause();
        }
      }
    }, [playbackRate, ref, playing, dispatch]);

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
        autoPlay={playing}
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
