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
  volume: number;
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

    const [debouncedPlaybackRate] = useDebouncedValue(playbackRate, 500);

    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audioElement = ref.current;

        // Apply playback rate
        if (debouncedPlaybackRate) {
          audioElement.playbackRate = debouncedPlaybackRate;
        }

        // Preserve pitch in Safari and Firefox
        (audioElement as any).preservesPitch = true;
        (audioElement as any).mozPreservesPitch = true;
        (audioElement as any).webkitPreservesPitch = true;

        if (playing) {
          const playPromise = audioElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
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
    }, [debouncedPlaybackRate, ref, playing, dispatch, src]);

    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        const audioElement = ref.current;
        const clampedVolume = Math.max(0, Math.min(volume, 1));

        const setVolume = () => {
          if (!audioElement.muted) {
            audioElement.volume = clampedVolume;
          }
        };

        const handleMetadataLoaded = () => {
          setVolume();
        };

        const handleUserInteraction = () => {
          setVolume();
          audioElement.play().catch(() => {
            console.log("Playback was prevented.");
          });

          document.removeEventListener("click", handleUserInteraction);
          document.removeEventListener("touchstart", handleUserInteraction);
        };

        if (audioElement.readyState >= 1) {
          setVolume();
        } else {
          audioElement.addEventListener("loadedmetadata", handleMetadataLoaded);
          audioElement.addEventListener("canplaythrough", handleMetadataLoaded); // Added for Safari
        }

        audioElement.addEventListener("play", setVolume);

        document.addEventListener("click", handleUserInteraction);
        document.addEventListener("touchstart", handleUserInteraction);

        return () => {
          audioElement.removeEventListener(
            "loadedmetadata",
            handleMetadataLoaded
          );
          audioElement.removeEventListener(
            "canplaythrough",
            handleMetadataLoaded
          ); // Added for Safari
          audioElement.removeEventListener("play", setVolume);
          document.removeEventListener("click", handleUserInteraction);
          document.removeEventListener("touchstart", handleUserInteraction);
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
        muted={volume <= 0}
      >
        Your browser does not support the audio element.
      </audio>
    );
  }
);

AudioControls.displayName = "AudioControls";

export default AudioControls;
