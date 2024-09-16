// "use client";
// import { useAudio } from "@/lib/AudioProvider";
// import { pauseSong, playImport } from "@/redux/slice/music/musicActionSlice";
// import { RootState } from "@/redux/store";
// import React, { forwardRef, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";

// interface AudioControlsProps {
//   src: string;
//   onTimeUpdate?: React.ChangeEventHandler<HTMLAudioElement>;
//   onLoadedMetadata?: React.ReactEventHandler<HTMLAudioElement>;
//   onEnded?: React.ReactEventHandler<HTMLAudioElement>;
//   playbackRate: number;
//   volume: number;
// }

// const AudioControls = forwardRef<HTMLAudioElement, AudioControlsProps>(
//   (
//     { src, onTimeUpdate, onLoadedMetadata, onEnded, playbackRate, volume },
//     ref
//   ) => {
//     const playing = useSelector((state: RootState) => state.player.playing);
//     const dispatch = useDispatch();
//     const { setAudioRef } = useAudio();

//     useEffect(() => {
//       setAudioRef(ref);
//       const audioElement = ref && "current" in ref ? ref.current : null;

//       const applyVolume = () => {
//         const clampedVolume = Math.max(0, Math.min(volume, 1));
//         if (audioElement && !audioElement.muted) {
//           audioElement.volume = clampedVolume;
//         }
//       };

//       const handleInteraction = () => {
//         audioElement
//           ?.play()
//           .then(() => {
//             applyVolume();
//             removeInteractionListeners(); // Remove the listeners after successful playback
//           })
//           .catch(() => dispatch(pauseSong())); // Pause if play still fails
//       };

//       const addInteractionListeners = () => {
//         document.addEventListener("click", handleInteraction, { once: true });
//         document.addEventListener("touchstart", handleInteraction, {
//           once: true,
//         });
//       };

//       const removeInteractionListeners = () => {
//         document.removeEventListener("click", handleInteraction);
//         document.removeEventListener("touchstart", handleInteraction);
//       };

//       if (audioElement) {
//         if (playing) {
//           const playPromise = audioElement.play();
//           if (playPromise !== undefined) {
//             playPromise
//               .then(() => {
//                 applyVolume();
//               })
//               .catch(() => {
//                 // Add listeners to resume playback on interaction
//                 addInteractionListeners();
//               });
//           }
//         } else {
//           audioElement.pause();
//           dispatch(pauseSong());
//         }
//       }

//       return () => {
//         removeInteractionListeners(); // Cleanup listeners on unmount or when no longer needed
//       };
//     }, [ref, playing, dispatch, src, setAudioRef, volume]);

//     // Separate useEffect for handling playbackRate
//     useEffect(() => {
//       const audioElement = ref && "current" in ref ? ref.current : null;

//       const applyPlaybackRate = () => {
//         if (
//           audioElement &&
//           playbackRate &&
//           audioElement.playbackRate !== playbackRate
//         ) {
//           // Ensure playback rate is only applied after interaction in Safari
//           setTimeout(() => {
//             audioElement.playbackRate = playbackRate;
//           }, 100); // Adding a delay for Safari
//         }
//       };

//       if (audioElement && playing) {
//         applyPlaybackRate();
//       }
//     }, [ref, playbackRate, playing]);

//     useEffect(() => {
//       const audioElement = ref && "current" in ref ? ref.current : null;

//       if (audioElement) {
//         const handleLoadedMetadata = () => {
//           // Set volume and playbackRate when metadata is loaded
//           const clampedVolume = Math.max(0, Math.min(volume, 1));
//           if (!audioElement.muted) {
//             audioElement.volume = clampedVolume;
//           }

//           if (playbackRate && audioElement.playbackRate !== playbackRate) {
//             audioElement.playbackRate = playbackRate;
//           }
//         };

//         if (audioElement.readyState >= 1) {
//           handleLoadedMetadata();
//         } else {
//           audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
//         }

//         return () => {
//           audioElement.removeEventListener(
//             "loadedmetadata",
//             handleLoadedMetadata
//           );
//         };
//       }
//     }, [volume, playbackRate, ref]);

//     return (
//       <audio
//         crossOrigin="anonymous"
//         ref={ref}
//         src={src}
//         onTimeUpdate={onTimeUpdate}
//         onLoadedMetadata={onLoadedMetadata}
//         onEnded={onEnded}
//         muted={volume <= 0}
//       >
//         Your browser does not support the audio element.
//       </audio>
//     );
//   }
// );

// AudioControls.displayName = "AudioControls";

// export default AudioControls;
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

    // Check for Mac/Safari-specific quirks
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Safari and DuckDuckGo need a user gesture to enable playback
    useEffect(() => {
      setAudioRef(ref);
      const audioElement = ref && "current" in ref ? ref.current : null;

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
    }, [ref, playing, dispatch, src, setAudioRef, volume]);

    // Separate useEffect for handling playbackRate with Safari-specific adjustments
    // useEffect(() => {
    //   const audioElement = ref && "current" in ref ? ref.current : null;

    //   const applyPlaybackRate = () => {
    //     if (
    //       audioElement &&
    //       playbackRate &&
    //       audioElement.playbackRate !== playbackRate
    //     ) {
    //       // Ensure playback rate is only applied after interaction in Safari
    //       if (isSafari) {
    //         setTimeout(() => {
    //           audioElement.playbackRate = playbackRate;
    //         }, 100); // Adding a delay for Safari
    //       } else {
    //         audioElement.playbackRate = playbackRate;
    //       }
    //     }
    //   };

    //   if (audioElement && playing) {
    //     applyPlaybackRate();
    //   }
    // }, [ref, playbackRate, playing, isSafari]);
    useEffect(() => {
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

      if (audioElement) {
        // Handle the Safari-specific behavior
        if (isSafari) {
          const handleUserInteraction = () => {
            applyPlaybackRate();
            audioElement.removeEventListener("play", handleUserInteraction);
          };

          // Wait for the user to interact with the audio (e.g., play button click)
          audioElement.addEventListener("play", handleUserInteraction);

          // Additionally, wait for metadata to be loaded before applying the rate
          audioElement.addEventListener("loadedmetadata", applyPlaybackRate);
        } else {
          // Non-Safari browsers: Apply rate immediately
          applyPlaybackRate();
        }
      }

      return () => {
        if (audioElement) {
          audioElement.removeEventListener("loadedmetadata", applyPlaybackRate);
        }
      };
    }, [playbackRate, isSafari, ref]);

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
