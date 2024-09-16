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
    const dispatch = useDispatch();
    const { setAudioRef } = useAudio();

    useEffect(() => {
      setAudioRef(ref);
      const audioElement = ref && "current" in ref ? ref.current : null;

      const applyPlaybackRate = () => {
        if (
          audioElement &&
          playbackRate &&
          audioElement.playbackRate !== playbackRate
        ) {
          audioElement.playbackRate = playbackRate;
        }
      };

      const applyVolume = () => {
        const clampedVolume = Math.max(0, Math.min(volume, 1));
        if (audioElement && !audioElement.muted) {
          audioElement.volume = clampedVolume;
        }
      };

      const handleInteraction = () => {
        audioElement
          ?.play()
          .then(() => {
            applyPlaybackRate();
            applyVolume();
            removeInteractionListeners(); // Remove the listeners after successful playback
          })
          .catch(() => dispatch(pauseSong())); // Pause if play still fails
      };

      const addInteractionListeners = () => {
        document.addEventListener("click", handleInteraction, { once: true });
        document.addEventListener("touchstart", handleInteraction, {
          once: true,
        });
      };

      const removeInteractionListeners = () => {
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("touchstart", handleInteraction);
      };

      if (audioElement) {
        if (playing) {
          const playPromise = audioElement.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                applyPlaybackRate();
                applyVolume();
              })
              .catch(() => {
                // Add listeners to resume playback on interaction
                addInteractionListeners();
              });
          }
        } else {
          audioElement.pause();
          dispatch(pauseSong());
        }
      }

      return () => {
        removeInteractionListeners(); // Cleanup listeners on unmount or when no longer needed
      };
    }, [ref, playing, dispatch, src, playbackRate, setAudioRef, volume]);

    useEffect(() => {
      const audioElement = ref && "current" in ref ? ref.current : null;

      if (audioElement) {
        const handleLoadedMetadata = () => {
          // Set volume and playbackRate when metadata is loaded
          const clampedVolume = Math.max(0, Math.min(volume, 1));
          if (!audioElement.muted) {
            audioElement.volume = clampedVolume;
          }

          if (playbackRate && audioElement.playbackRate !== playbackRate) {
            audioElement.playbackRate = playbackRate;
          }
        };

        if (audioElement.readyState >= 1) {
          handleLoadedMetadata();
        } else {
          audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
        }

        return () => {
          audioElement.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
        };
      }
    }, [volume, playbackRate, ref]);

    return (
      <audio
        crossOrigin="anonymous"
        ref={ref}
        src={src}
        onTimeUpdate={onTimeUpdate}
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
