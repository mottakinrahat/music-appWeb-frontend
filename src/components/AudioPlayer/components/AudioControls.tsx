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

const AudioControls = (
  (
    { src, onTimeUpdate, onLoadedMetadata, onEnded, playbackRate, volume }:AudioControlsProps
   
  ) => {
    const playing = useSelector((state: RootState) => state.player.playing);
    const dispatch = useDispatch();
    const { audioRef } = useAudio();
    // Use a ref to force updates only on volume changes
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
      const audioElement =
        audioRef && "current" in audioRef ? audioRef.current : null;

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
    }, [audioRef, playing, dispatch, src, playbackRate]);

    useEffect(() => {
      const audioElement =
        audioRef && "current" in audioRef ? audioRef.current : null;

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
    }, [volume, audioRef]);

    return (
      <audio
        crossOrigin="anonymous"
        ref={audioRef}
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


export default AudioControls;
