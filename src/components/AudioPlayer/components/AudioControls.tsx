// "use client";
// import { useDebouncedValue } from "@/hooks/useDebounceValue";
// import { pauseSong, playImport } from "@/redux/slice/music/musicActionSlice";
// import { RootState } from "@/redux/store";
// import React, { forwardRef, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// interface AudioControlsProps {
//   src: string;
//   onTimeUpdate?: React.ChangeEventHandler<HTMLAudioElement>;
//   autoPlay?: boolean;
//   onLoadedMetadata?: React.ReactEventHandler<HTMLAudioElement>;
//   onEnded?: React.ReactEventHandler<HTMLAudioElement>;
//   playbackRate: number;
//   volume: number; // Volume should be between 0.0 and 1.0
// }

// const AudioControls = forwardRef<HTMLAudioElement, AudioControlsProps>(
//   (
//     {
//       src,
//       onTimeUpdate,
//       autoPlay,
//       onLoadedMetadata,
//       onEnded,
//       playbackRate,
//       volume,
//     },
//     ref
//   ) => {
//     const playing = useSelector((state: RootState) => state.player.playing);
//     const dispatch = useDispatch();

//     // Set playback rate and handle play/pause based on "playing" state
//     const [debouncedPlaybackRate, latedebouncedPlaybackRate] =
//       useDebouncedValue(playbackRate, 500);

//     useEffect(() => {
//       if (ref && "current" in ref && ref.current) {
//         const audioElement = ref.current;

//         // Apply immediate playback rate
//         if (playbackRate) {
//           audioElement.playbackRate = playbackRate; // Apply the immediate playback rate
//         }

//         // Preserve pitch in all browsers
//         (audioElement as any).preservesPitch = true;
//         (audioElement as any).mozPreservesPitch = true; // For Firefox
//         (audioElement as any).webkitPreservesPitch = true; // For Safari

//         if (playing) {
//           const playPromise = audioElement.play();
//           if (playPromise !== undefined) {
//             playPromise.catch(() => {
//               dispatch(playImport());
//               audioElement.play().catch(() => {
//                 // Handle playback issues here
//                 dispatch(playImport());
//               });
//             });
//           }
//         } else {
//           audioElement.pause();
//           dispatch(pauseSong());
//         }
//       }
//     }, [playbackRate, ref, playing, dispatch, src]);

//     useEffect(() => {
//       if (ref && "current" in ref && ref.current) {
//         const audioElement = ref.current;
//         const clampedVolume = Math.max(0, Math.min(volume, 1));

//         const setVolume = () => {
//           if (!audioElement.muted) {
//             audioElement.volume = clampedVolume;
//           }
//         };

//         const handleMetadataLoaded = () => {
//           // Set volume when the metadata is loaded
//           setVolume();
//         };

//         const handleVolumeChange = () => {
//           if (!audioElement.muted) {
//             audioElement.volume = clampedVolume;
//           }
//         };

//         // If metadata is already loaded, set the volume immediately
//         if (audioElement.readyState >= 1) {
//           setVolume();
//         } else {
//           // For Safari, ensure volume is set after metadata is loaded
//           audioElement.addEventListener("loadedmetadata", handleMetadataLoaded);
//         }

//         // Additional user interaction for Safari: ensure volume updates on user play event
//         audioElement.addEventListener("play", handleVolumeChange);

//         return () => {
//           audioElement.removeEventListener(
//             "loadedmetadata",
//             handleMetadataLoaded
//           );
//           audioElement.removeEventListener("play", handleVolumeChange);
//         };
//       }
//     }, [volume, ref]);

//     return (
//       <audio
//         crossOrigin="anonymous"
//         ref={ref}
//         src={src}
//         onTimeUpdate={onTimeUpdate}
//         autoPlay={playing}
//         onLoadedMetadata={onLoadedMetadata}
//         onEnded={onEnded}
//       >
//         Your browser does not support the audio element.
//       </audio>
//     );
//   }
// );

// AudioControls.displayName = "AudioControls";

// export default AudioControls;
import React, { useEffect, useRef, forwardRef } from "react";

interface AudioControlsProps {
  src: string;
  volume: number;
  autoPlay: boolean;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onEnded: () => void;
  playbackRate: number;
}

const AudioControls = forwardRef<HTMLAudioElement, AudioControlsProps>(
  (
    {
      src,
      volume,
      autoPlay,
      onTimeUpdate,
      onLoadedMetadata,
      onEnded,
      playbackRate,
    },
    ref
  ) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
      const audioElement = audioRef.current;

      if (audioElement) {
        // Clamp volume between 0 and 1
        const clampedVolume = Math.max(0, Math.min(volume, 1));

        const setVolume = () => {
          if (!audioElement.muted) {
            audioElement.volume = clampedVolume;
          }
        };

        const handleMetadataLoaded = () => {
          // Set volume when the metadata is loaded (Safari needs this)
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
          document.removeEventListener("click", handleUserInteraction);
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
    }, [volume]);

    // Handle autoPlay and playback rate changes
    useEffect(() => {
      const audioElement = audioRef.current;
      if (audioElement) {
        audioElement.playbackRate = playbackRate;

        if (autoPlay && !audioElement.muted) {
          audioElement.play().catch((err) => {
            // Catch autoplay restrictions for Safari
            console.log("Autoplay restriction error:", err);
          });
        }
      }
    }, [autoPlay, playbackRate]);

    return (
      <audio
        ref={(instance) => {
          audioRef.current = instance;
          if (typeof ref === "function") {
            ref(instance);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLAudioElement | null>).current =
              instance;
          }
        }}
        src={src}
        autoPlay={autoPlay}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        preload="auto"
        controls
        muted={!autoPlay && volume === 0} // Mute when volume is 0
        playsInline
      />
    );
  }
);

AudioControls.displayName = "AudioControls";

export default AudioControls;
