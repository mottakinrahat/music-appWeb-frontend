"use client";
import { pauseSong, playImport } from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";
import React, { forwardRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AudioControlsProps {
  src: string;
  onTimeUpdate?: React.ChangeEventHandler<HTMLAudioElement>;
  onLoadedMetadata?: React.ReactEventHandler<HTMLAudioElement>;
  onEnded?: React.ReactEventHandler<HTMLAudioElement>;
  playbackRate: number;
  volume: number;
}

const AudioControls = forwardRef<HTMLAudioElement, AudioControlsProps>(
  (
    { src, onTimeUpdate, onLoadedMetadata, onEnded, playbackRate, volume },
    ref
  ) => {
    const playing = useSelector((state: RootState) => state.player.playing);
    const dispatch = useDispatch();

    // Use a ref to force updates only on volume changes
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
      const audioElement = ref && "current" in ref ? ref.current : null;

      if (audioElement) {
        // Apply immediate playback rate
        if (playbackRate) {
          audioElement.playbackRate = playbackRate;
        }

        // Set the necessary pitch properties
        (audioElement as any).preservesPitch = true;
        (audioElement as any).mozPreservesPitch = true; // For Firefox
        (audioElement as any).webkitPreservesPitch = true; // For Safari

        // Handle playback status
        if (playing) {
          const playPromise = audioElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Ensure the dispatch is called if playback fails
              dispatch(playImport());
              audioElement.play().catch(() => {
                dispatch(playImport());
              });
            });
          }
        } else {
          audioElement.pause();
          dispatch(pauseSong());
        }
      }
    }, [playbackRate, ref, playing, dispatch, src]);

    useEffect(() => {
      const audioElement = ref && "current" in ref ? ref.current : null;

      if (audioElement) {
        const clampedVolume = Math.max(0, Math.min(volume, 1));

        const setVolume = () => {
          if (!audioElement.muted) {
            audioElement.volume = clampedVolume;
          }
        };

        const handleMetadataLoaded = () => {
          setVolume(); // Set volume when metadata is loaded
        };

        const handlePlay = () => {
          setVolume(); // Ensure volume is set on play
        };

        // Set the volume immediately if metadata is already loaded
        if (audioElement.readyState >= 1) {
          setVolume();
        } else {
          // For Safari, ensure volume is set after metadata is loaded
          audioElement.addEventListener("loadedmetadata", handleMetadataLoaded);
        }

        // Safari-specific volume handling on play
        audioElement.addEventListener("play", handlePlay);

        return () => {
          audioElement.removeEventListener(
            "loadedmetadata",
            handleMetadataLoaded
          );
          audioElement.removeEventListener("play", handlePlay);
        };
      }
    }, [volume, ref]);

    return (
      <audio
        crossOrigin="anonymous"
        ref={(node) => {
          audioElementRef.current = node;
          if (ref && "current" in ref) {
            ref.current = node;
          }
        }}
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
