"use client";
import { useAudio } from "@/lib/AudioProvider";
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
    const isKaraokeRecord = useSelector(
      (state: RootState) => state.karaoke.isKaraokeRecord
    );
    const dispatch = useDispatch();

    // Use a ref to force updates only on volume changes
    // const audioRef = useRef<HTMLAudioElement | null>(null);
    const { setAudioRef } = useAudio();

    useEffect(() => {
      setAudioRef(ref);
      const audioElement = ref && "current" in ref ? ref.current : null;

      if (audioElement) {
        // Apply immediate playback rate
        if (playbackRate) {
          audioElement.playbackRate = playbackRate;
        }

        // Set the necessary pitch properties
        (audioElement as any).preservesPitch = true;
        (audioElement as any).mozPreservesPitch = true;
        (audioElement as any).webkitPreservesPitch = true;

        // Handle playback status
        if (playing && !isKaraokeRecord) {
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
        } else if (isKaraokeRecord) {
          audioElement.pause();
          dispatch(pauseSong());
        } else {
          audioElement.pause();
          dispatch(pauseSong());
        }
      }
    }, [
      ref,
      playing,
      dispatch,
      src,
      playbackRate,
      setAudioRef,
      isKaraokeRecord,
    ]);

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
          audioElement.addEventListener("loadedmetadata", handleMetadataLoaded);
          audioElement.addEventListener("canplaythrough", handleMetadataLoaded); // Added for Safari
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
