"use client";
import { useDebouncedValue } from "@/hooks/useDebounceValue";
import { pauseSong, playImport } from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";
import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AudioControlsProps {
  src: string;
  onTimeUpdate?: React.ChangeEventHandler<HTMLAudioElement>;
  autoPlay?: boolean;
  onLoadedMetadata?: React.ReactEventHandler<HTMLAudioElement>;
  onEnded?: React.ReactEventHandler<HTMLAudioElement>;
  playbackRate: number;
  volume: number; // Volume should be between 0.0 and 1.0
}

const AudioControls = forwardRef<HTMLAudioElement, AudioControlsProps>(
  (
    {
      src,
      onTimeUpdate,
      autoPlay,
      onLoadedMetadata,
      onEnded,
      playbackRate,
      volume,
    },
    ref
  ) => {
    const playing = useSelector((state: RootState) => state.player.playing);
    const dispatch = useDispatch();

    // Set playback rate and handle play/pause based on "playing" state
    const [debouncedPlaybackRate, latedebouncedPlaybackRate] =
      useDebouncedValue(playbackRate, 500);

    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audioElement = ref.current;

        // Apply immediate playback rate
        if (playbackRate) {
          audioElement.playbackRate = playbackRate; // Apply the immediate playback rate
        }

        // Preserve pitch in all browsers
        (audioElement as any).preservesPitch = true;
        (audioElement as any).mozPreservesPitch = true; // For Firefox
        (audioElement as any).webkitPreservesPitch = true; // For Safari

        if (playing) {
          const playPromise = audioElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              dispatch(playImport());
              audioElement.play().catch(() => {
                // Handle playback issues here
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

    // Ensure volume is set correctly when the component mounts
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audioElement = ref.current;
        const clampedVolume = Math.max(0, Math.min(volume, 1));

        const setVolume = () => {
          audioElement.volume = clampedVolume;
        };

        const handleCanPlay = () => {
          // Set volume when the audio is ready to play
          setVolume();
        };

        if (audioElement.readyState >= 1) {
          // If the audio metadata is already loaded, set the volume immediately
          setVolume();
        } else {
          // For Safari and other browsers, ensure volume is set after the audio can play
          audioElement.addEventListener("canplay", handleCanPlay);
        }

        return () => {
          audioElement.removeEventListener("canplay", handleCanPlay);
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
