// "use client";
// import { useAudio } from "@/lib/AudioProvider";
// import { pauseSong, playImport } from "@/redux/slice/music/musicActionSlice";
// import { RootState } from "@/redux/store";
// import React, { forwardRef, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ReactPlayer from "react-player";

// interface AudioControlsProps {
//   src?: string;
//   onTimeUpdate: React.ChangeEventHandler<HTMLAudioElement>;
//   onLoadedMetadata?: React.ReactEventHandler<HTMLAudioElement>;
//   onEnded?: React.ReactEventHandler<HTMLAudioElement>;
//   playbackRate?: number;
//   volume?: number;
// }

// const AudioControls = forwardRef<HTMLAudioElement, AudioControlsProps>(
//   (
//     { src, onTimeUpdate, onLoadedMetadata, onEnded, playbackRate, volume },
//     ref
//   ) => {
//     const playing = useSelector((state: RootState) => state.player.playing);
//     const audioVolume = useSelector(
//       (state: RootState) => state.player.audioVolume
//     );
//     const dispatch = useDispatch();
//     const { setAudioRef, audioRef } = useAudio();

//     // Check for Mac/Safari-specific quirks
//     const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
//     const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

//     // Safari and DuckDuckGo need a user gesture to enable playback
//     useEffect(() => {
//       setAudioRef(ref);
//       const audioElement = ref && "current" in ref ? ref.current : null;

//       const applyVolume = () => {
//         const clampedVolume = Math.max(0, Math.min(volume!, 1));
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

//     useEffect(() => {
//       const audioElement = ref && "current" in ref ? ref.current : null;
//       if (audioElement) audioElement.preservesPitch = true;

//       const applyPlaybackRate = () => {
//         if (
//           audioElement &&
//           playbackRate &&
//           audioElement.playbackRate !== playbackRate
//         ) {
//           audioElement.playbackRate = playbackRate;
//         }
//       };

//       if (audioElement) {
//         if (isSafari) {
//           audioElement.preservesPitch = true;
//           const handleUserInteraction = () => {
//             applyPlaybackRate();
//             audioElement.removeEventListener("play", handleUserInteraction);
//           };

//           audioElement.addEventListener("play", handleUserInteraction);
//           audioElement.addEventListener("loadedmetadata", applyPlaybackRate);
//         } else {
//           applyPlaybackRate();
//         }
//       }

//       return () => {
//         if (audioElement) {
//           audioElement.removeEventListener("loadedmetadata", applyPlaybackRate);
//         }
//       };
//     }, [playbackRate, isSafari, ref]);

//     useEffect(() => {
//       const audioElement = ref && "current" in ref ? ref.current : null;

//       // Update volume and playback rate on each change
//       const updateVolumeAndPlaybackRate = () => {
//         if (!audioElement) return;

//         // Safari fix: Force the volume setting with a small delay
//         setTimeout(() => {
//           audioElement.volume = audioVolume;
//         }, 0);
//       };

//       if (audioElement) {
//         // Apply volume and playbackRate if audio is already loaded
//         updateVolumeAndPlaybackRate();

//         // Apply volume/playbackRate whenever metadata is loaded
//         audioElement.addEventListener(
//           "loadedmetadata",
//           updateVolumeAndPlaybackRate
//         );
//       }

//       return () => {
//         if (audioElement) {
//           audioElement.removeEventListener(
//             "loadedmetadata",
//             updateVolumeAndPlaybackRate
//           );
//         }
//       };
//     }, [audioVolume, ref]);

//     return (
//       <audio
//          crossOrigin="anonymous"
//         ref={ref}
//         src={src}
//          onTimeUpdate={onTimeUpdate}
//         onLoadedMetadata={onLoadedMetadata}
//         onEnded={onEnded}
//         muted={audioVolume <= 0}
//       >
//         Your browser does not support the audio element.
//       </audio>
//
//     );
//   }
// );

// AudioControls.displayName = "AudioControls";

// export default AudioControls;

"use client";

import { useAudio } from "@/lib/AudioProvider";
import { RootState } from "@/redux/store";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

interface AudioControlsProps {
  onTimeUpdate: (state: OnProgressProps) => void;
  onLoadedMetadata: (duration: number) => void;
  onEnded?: () => void;
  playbackRate?: number;
  volume?: number;
  src: string;
}

const AudioControls = forwardRef<ReactPlayer, AudioControlsProps>(
  ({ onTimeUpdate, onLoadedMetadata, onEnded, playbackRate, volume }, ref) => {
    const playing = useSelector((state: RootState) => state.player.playing);
    const audioVolume = useSelector(
      (state: RootState) => state.player.audioVolume
    );
    const dispatch = useDispatch();
    const { setAudioRef, audioRef } = useAudio(); // Assuming this provides a ref

    const [songs, setSongs] = useState<
      { id: number; title: string; url: string }[]
    >([]);
    const [currentSongUrl, setCurrentSongUrl] = useState<string | null>(null);

    useEffect(() => {
      // Fetch the list of songs from the API
      fetch("/api/music")
        .then((res) => res.json())
        .then((data) => {
          setSongs(data);
          if (data.length > 0) {
            setCurrentSongUrl(data[0].url); // Set the URL of the first song or any default song
          }
        })
        .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
      if (audioRef?.current) {
        const internalPlayer = audioRef.current.getInternalPlayer();
        if (internalPlayer && playbackRate !== undefined) {
          internalPlayer.playbackRate = playbackRate;
        }
      }
    }, [audioRef, playbackRate]);

    return (
      <div className="hidden">
        {currentSongUrl && (
          <ReactPlayer
            ref={audioRef}
            url={currentSongUrl} // Use the URL from the state
            playing={playing}
            volume={volume}
            onDuration={onLoadedMetadata}
            onProgress={onTimeUpdate}
            onEnded={onEnded}
          />
        )}
      </div>
    );
  }
);

AudioControls.displayName = "AudioControls";

export default AudioControls;
