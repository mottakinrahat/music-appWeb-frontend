"use client";
import { pauseSong } from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";
import React, { forwardRef, useEffect } from "react";
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
      onLoadedMetadata,
      onEnded,
      playbackRate = 1.0,
      volume = 1.0,
    },
    ref
  ) => {
    const playing = useSelector((state: RootState) => state.player.playing);

    // Set playback rate and handle play/pause based on "playing" state

    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audioElement = ref.current;

        audioElement.playbackRate = playbackRate;

        if (playing) {
          const playPromise = audioElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              audioElement.muted = true;
              audioElement.play().catch(() => {
                // Optional: Handle further autoplay issues
              });
            });
          }
        } else {
          audioElement.pause();
        }
      }
    }, [playbackRate, ref, playing]);

    // Ensure volume is set correctly when the component mounts
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audioElement = ref.current;
        const clampedVolume = Math.max(0, Math.min(volume, 1));

        const setVolume = () => {
          audioElement.volume = clampedVolume;
        };

        if (audioElement.readyState >= 1) {
          // If metadata is already loaded, set volume immediately
          setVolume();
        } else {
          // Set volume once the metadata is loaded
          audioElement.addEventListener("loadedmetadata", setVolume);
        }

        return () => {
          audioElement.removeEventListener("loadedmetadata", setVolume);
        };
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
