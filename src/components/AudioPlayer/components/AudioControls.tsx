// import { useAudio } from "@/lib/AudioProvider";
// import { RootState } from "@/redux/store";
// import React, { forwardRef, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import ReactPlayer from "react-player";
// import { OnProgressProps } from "react-player/base";

// interface AudioControlsProps {
//   onTimeUpdate: (state: OnProgressProps) => void;
//   onLoadedMetadata: (duration: number) => void;
//   onEnded?: () => void;
//   playbackRate?: number;
//   volume?: number;
//   src?: string;
// }

// const AudioControls = forwardRef<ReactPlayer, AudioControlsProps>(
//   (
//     { onTimeUpdate, onLoadedMetadata, onEnded, playbackRate, volume, src },
//     ref
//   ) => {
//     const playing = useSelector((state: RootState) => state.player.playing);
//     const audioVolume = useSelector(
//       (state: RootState) => state.player.audioVolume
//     );

//     const { setAudioRef, audioRef } = useAudio();

//     const [currentSongUrl, setCurrentSongUrl] = useState<string | null>(null);

//     useEffect(() => {
//       if (!audioRef) {
//         setAudioRef(ref);
//       }
//       // Fetch the song list from the API
//       const fetchMusic = async () => {
//         try {
//           const res = await fetch("/api/music");
//           const data = await res.json();
//           if (data.length > 0) {
//             // Set the src of the first song in the list
//             setCurrentSongUrl(data[0].url);
//           }
//         } catch (err) {
//           console.error("Failed to fetch music:", err);
//         }
//       };

//       fetchMusic();
//     }, [audioRef, ref, setAudioRef]);

//     useEffect(() => {
//       if (audioRef?.current) {
//         const internalPlayer = audioRef.current.getInternalPlayer();
//         if (internalPlayer && playbackRate !== undefined) {
//           internalPlayer.playbackRate = playbackRate;
//         }
//       }
//     }, [audioRef, playbackRate]);

//     return (
//       <div className="hidden">
//         {currentSongUrl && (
//           <ReactPlayer
//             ref={audioRef}

//             url={src} // Use the URL from the state
//             playing={playing}
//             volume={audioVolume}
//             onDuration={onLoadedMetadata}
//             onProgress={onTimeUpdate}
//             onEnded={onEnded}
//             config={{
//               file: {
//                 attributes: {
//                   crossOrigin: "anonymous",
//                 },
//               },
//             }}
//           />
//         )}
//       </div>
//     );
//   }
// );

// AudioControls.displayName = "AudioControls";

// export default AudioControls;
// import { useAudio } from "@/lib/AudioProvider";
// import { RootState } from "@/redux/store";
// import React, { forwardRef, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import ReactPlayer from "react-player";
// import { OnProgressProps } from "react-player/base";

// interface AudioControlsProps {
//   onTimeUpdate: (state: OnProgressProps) => void;
//   onLoadedMetadata: (duration: number) => void;
//   onEnded?: () => void;
//   playbackRate?: number;
//   volume?: number;
//   src?: string;
// }

// const AudioControls = forwardRef<ReactPlayer, AudioControlsProps>(
//   (
//     { onTimeUpdate, onLoadedMetadata, onEnded, playbackRate, volume, src },
//     ref
//   ) => {
//     const playing = useSelector((state: RootState) => state.player.playing);
//     const audioVolume = useSelector(
//       (state: RootState) => state.player.audioVolume
//     );

//     const { setAudioRef, audioRef } = useAudio();
//     const [currentSongUrl, setCurrentSongUrl] = useState<string | null>(null);

//     useEffect(() => {
//       if (!audioRef) {
//         setAudioRef(ref);
//       }

//       // Fetch the song list from the API
//       const fetchMusic = async () => {
//         try {
//           const res = await fetch("/api/music");
//           const data = await res.json();
//           if (data.length > 0) {
//             // Set the src of the first song in the list
//             setCurrentSongUrl(data[0].url);
//           }
//         } catch (err) {
//           console.error("Failed to fetch music:", err);
//         }
//       };

//       fetchMusic();
//     }, [audioRef, ref, setAudioRef]);

//     useEffect(() => {
//       if (audioRef?.current) {
//         const internalPlayer = audioRef.current.getInternalPlayer();
//         if (internalPlayer && playbackRate !== undefined) {
//           internalPlayer.playbackRate = playbackRate;
//         }
//       }
//     }, [audioRef, playbackRate]);

//     return (
//       <div className="hidden">
//         {currentSongUrl && (
//           <ReactPlayer
//             ref={audioRef}
//             url={src} // Use the URL from the props or fallback to fetched song
//             playing={playing}
//             volume={audioVolume}
//             onDuration={onLoadedMetadata}
//             onProgress={onTimeUpdate}
//             onEnded={onEnded}
//             config={{
//               file: {
//                 attributes: {
//                   crossOrigin: "anonymous",
//                 },
//               },
//             }}
//             onError={(e) => {
//               console.error("Error loading audio:", e); // Log any loading errors
//               // You can add fallback logic here, like notifying the user or trying another URL
//             }}
//           ></ReactPlayer>
//         )}
//       </div>
//     );
//   }
// );

// AudioControls.displayName = "AudioControls";

// export default AudioControls;
import { useAudio } from "@/lib/AudioProvider";
import { RootState } from "@/redux/store";
import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

interface AudioControlsProps {
  onTimeUpdate: (state: OnProgressProps) => void;
  onLoadedMetadata: (duration: number) => void;
  onEnded?: () => void;
  playbackRate?: number;
  volume?: number;
  src?: string;
}

const AudioControls = forwardRef<ReactPlayer, AudioControlsProps>(
  (
    { onTimeUpdate, onLoadedMetadata, onEnded, playbackRate, volume, src },
    ref
  ) => {
    const playing = useSelector((state: RootState) => state.player.playing);
    const audioVolume = useSelector(
      (state: RootState) => state.player.audioVolume
    );

    const { setAudioRef, audioRef } = useAudio();
    const [currentSongUrl, setCurrentSongUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); // State for handling errors
    const importedUrl = useSelector(
      (state: RootState) => state.musicData.fileData
    );

    useEffect(() => {
      if (!audioRef) {
        setAudioRef(ref);
      }

      const fetchMusic = async () => {
        try {
          const res = await fetch("/api/music");
          const data = await res.json();
          if (data?.length > 0) {
            // Set the src of the first song in the list
            setCurrentSongUrl(data[0].url);
          }
        } catch (err) {
          console.error("Failed to fetch music:", err);
          setError("Failed to fetch music. Please try again later.");
        }
      };

      fetchMusic();
    }, [audioRef, ref, setAudioRef]);

    useEffect(() => {
      if (audioRef?.current) {
        const internalPlayer = audioRef.current.getInternalPlayer();
        if (internalPlayer && playbackRate !== undefined) {
          internalPlayer.playbackRate = playbackRate;
        }
      }
    }, [audioRef, playbackRate]);

    // Fallback to a CORS proxy for the audio URL if needed
    const handleError = (e: any) => {
      console.error("Error loading audio:", e);
      // You can use a public CORS proxy here if necessary
      const corsProxy = "https://cors-anywhere.herokuapp.com/"; // Example proxy
      const fallbackUrl = corsProxy + (src || currentSongUrl);

      setCurrentSongUrl(fallbackUrl); // Attempt loading via proxy
      setError("Error loading audio. Trying a fallback URL.");
    };

    // Function to detect if the browser is Safari
    const isSafari = () => {
      const ua = navigator.userAgent;
      return ua.includes("Safari") && !ua.includes("Chrome");
    };

    // Conditionally set crossOrigin attribute based on browser
    const crossOriginValue = isSafari() ? undefined : "anonymous";

    return (
      <div className="hidden">
        {error && <div className="error-message">{error}</div>}
        {currentSongUrl && (
          <ReactPlayer
            ref={audioRef}
            url={importedUrl ? importedUrl : src} // Use the URL from the state
            playing={playing}
            volume={audioVolume}
            onDuration={onLoadedMetadata}
            onProgress={onTimeUpdate}
            onEnded={onEnded}
            config={{
              file: {
                attributes: {
                  crossOrigin: crossOriginValue, // Set crossOrigin based on browser
                },
              },
            }}
            onError={handleError} // Use the error handling function
          />
        )}
      </div>
    );
  }
);

AudioControls.displayName = "AudioControls";

export default AudioControls;
