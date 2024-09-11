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
          // Set volume when the metadata is loaded
          setVolume();
        };

        const handleVolumeChange = () => {
          if (!audioElement.muted) {
            audioElement.volume = clampedVolume;
          }
        };

        // Ensure volume is set after user interaction (Safari fix)
        const handleUserInteraction = () => {
          setVolume();
          audioElement.play().catch(() => {
            // Handle any playback errors
            console.log("Playback was prevented.");
          });

          // Remove the listener after the first interaction
          document.removeEventListener("touchstart", handleUserInteraction);
        };

        // If metadata is already loaded, set the volume immediately
        if (audioElement.readyState >= 1) {
          setVolume();
        } else {
          // For Safari, ensure volume is set after metadata is loaded
          audioElement.addEventListener("loadedmetadata", handleMetadataLoaded);
        }

        // Additional user interaction for Safari: ensure volume updates on user play event
        audioElement.addEventListener("play", handleVolumeChange);

        // Listen for any user interaction to enable playback
        document.addEventListener("click", handleUserInteraction);
        document.addEventListener("touchstart", handleUserInteraction);

        return () => {
          audioElement.removeEventListener(
            "loadedmetadata",
            handleMetadataLoaded
          );
          audioElement.removeEventListener("play", handleVolumeChange);
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
      >
        Your browser does not support the audio element.
      </audio>
    );
  }
);

AudioControls.displayName = "AudioControls";

export default AudioControls;

// "use client";
// import React, { useEffect, useRef, forwardRef } from "react";

// interface AudioControlsProps {
//   volume: number;
//   src: string;
//   playbackRate: number;
//   autoPlay: boolean;
//   onTimeUpdate: () => void;
//   onLoadedMetadata: () => void;
//   onEnded: () => void;
// }

// const AudioControls = forwardRef<HTMLAudioElement, AudioControlsProps>(
//   (
//     {
//       volume,
//       src,
//       playbackRate,
//       autoPlay,
//       onTimeUpdate,
//       onLoadedMetadata,
//       onEnded,
//     },
//     ref
//   ) => {
//     const audioRef = useRef<HTMLAudioElement>(null);

//     // Sync the forwarded ref with the internal audioRef
//     useEffect(() => {
//       if (ref && typeof ref === "function") {
//         ref(audioRef.current);
//       } else if (ref) {
//         (ref as any).current = audioRef.current;
//       }
//     }, [ref]);

//     // Update volume when prop changes
//     useEffect(() => {
//       if (audioRef.current) {
//         audioRef.current.volume = volume;
//       }
//     }, [volume]);

//     // Update playback speed when prop changes
//     useEffect(() => {
//       if (audioRef.current) {
//         audioRef.current.playbackRate = playbackRate;
//       }
//     }, [playbackRate]);

//     // Prevent muting on click or touch in Safari
//     // useEffect(() => {
//     //   const preventMute = (e: Event) => {
//     //     if (audioRef.current) {
//     //       const wasMuted = audioRef.current.muted;
//     //       if (wasMuted) {
//     //         audioRef.current.muted = false;
//     //       }
//     //     }
//     //   };
//     //   window.addEventListener("click", preventMute);
//     //   window.addEventListener("touchstart", preventMute);

//     //   return () => {
//     //     window.removeEventListener("click", preventMute);
//     //     window.removeEventListener("touchstart", preventMute);
//     //   };
//     // }, []);

//     return (
//       <audio
//         ref={audioRef}
//         src={src}
//         autoPlay={autoPlay}
//         onTimeUpdate={onTimeUpdate}
//         onLoadedMetadata={onLoadedMetadata}
//         onEnded={onEnded}
//         muted={volume <= 0}
//         controls
//       />
//     );
//   }
// );

// AudioControls.displayName = "AudioControls";
// export default AudioControls;
