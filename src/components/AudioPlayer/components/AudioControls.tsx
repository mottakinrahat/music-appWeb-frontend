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
//     const [error, setError] = useState<string | null>(null);
//     const importedUrl = useSelector(
//       (state: RootState) => state.musicData.fileData
//     );

//     useEffect(() => {
//       if (!audioRef) {
//         setAudioRef(ref);
//       }

//       const fetchMusic = async () => {
//         try {
//           const res = await fetch("/api/music");
//           const data = await res.json();
//           if (data?.length > 0) {
//             setCurrentSongUrl(data[0].url);
//           }
//         } catch (err) {
//           console.error("Failed to fetch music:", err);
//           setError("Failed to fetch music. Please try again later.");
//         }
//       };

//       fetchMusic();
//     }, [audioRef, ref, setAudioRef]);

//     useEffect(() => {
//       if (audioRef?.current) {
//         const internalPlayer = audioRef.current.getInternalPlayer();
//         if (internalPlayer) {
//           // Set playback rate and volume
//           internalPlayer.playbackRate = playbackRate ?? 1;
//           internalPlayer.volume = audioVolume ?? 1;
//         }
//       }
//     }, [audioRef, playbackRate, audioVolume]);

//     const handleError = (e: any) => {
//       console.error("Error loading audio:", e);
//       const corsProxy = "https://cors-anywhere.herokuapp.com/";
//       const fallbackUrl = corsProxy + (src || currentSongUrl);
//       setCurrentSongUrl(fallbackUrl);
//       setError("Error loading audio. Trying a fallback URL.");
//     };

//     return (
//       <div className="hidden">
//         {error && <div className="error-message">{error}</div>}
//         {currentSongUrl && (
//           <ReactPlayer
//             ref={audioRef}
//             url={importedUrl ? importedUrl : src}
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
//             onError={handleError}
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
//     const [error, setError] = useState<string | null>(null);
//     const importedUrl = useSelector(
//       (state: RootState) => state.musicData.fileData
//     );

//     useEffect(() => {
//       if (!audioRef) {
//         setAudioRef(ref);
//       }

//       const fetchMusic = async () => {
//         try {
//           const res = await fetch("/api/music");
//           const data = await res.json();
//           if (data?.length > 0) {
//             setCurrentSongUrl(data[0].url);
//           }
//         } catch (err) {
//           console.error("Failed to fetch music:", err);
//           setError("Failed to fetch music. Please try again later.");
//         }
//       };

//       fetchMusic();
//     }, [audioRef, ref, setAudioRef]);

//     // Apply volume and playbackRate after initializing the player
//     useEffect(() => {
//       if (audioRef?.current) {
//         const internalPlayer = audioRef.current.getInternalPlayer();
//         if (internalPlayer) {
//           // Safari workaround: ensure volume and playbackRate are set explicitly
//           internalPlayer.volume = audioVolume ?? 1;
//           internalPlayer.playbackRate = playbackRate ?? 1;
//         }
//       }
//     }, [audioRef, playbackRate, audioVolume]);

//     const handleError = (e: any) => {
//       console.error("Error loading audio:", e);
//       const corsProxy = "https://cors-anywhere.herokuapp.com/";
//       const fallbackUrl = corsProxy + (src || currentSongUrl);
//       setCurrentSongUrl(fallbackUrl);
//       setError("Error loading audio. Trying a fallback URL.");
//     };

//     // Function to detect if the browser is Safari
//     const isSafari = () => {
//       const ua = navigator.userAgent;
//       return ua.includes("Safari") && !ua.includes("Chrome");
//     };

//     // Conditionally set crossOrigin attribute based on browser
//     const crossOriginValue = isSafari() ? undefined : "anonymous";

//     return (
//       <div className="hidden">
//         {error && <div className="error-message">{error}</div>}
//         {currentSongUrl && (
//           <ReactPlayer
//             ref={audioRef}
//             url={importedUrl ? importedUrl : src}
//             playing={playing}
//             volume={audioVolume}
//             playbackRate={playbackRate} // Explicitly set playbackRate
//             onDuration={onLoadedMetadata}
//             onProgress={onTimeUpdate}
//             onEnded={onEnded}
//             config={{
//               file: {
//                 attributes: {
//                   crossOrigin: "anonymous", // Keep crossOrigin for CORS handling
//                 },
//               },
//             }}
//             onError={handleError}
//           />
//         )}
//       </div>
//     );
//   }
// );

// AudioControls.displayName = "AudioControls";

// export default AudioControls;
import { useAudio } from "@/lib/AudioProvider";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Howl } from "howler";

interface AudioControlsProps {
  onTimeUpdate: (currentTime: number, duration: number) => void; // Time update handler
  onLoadedMetadata: (duration: number) => void; // Metadata loaded handler
  onEnded?: () => void; // Optional handler for when playback ends
  playbackRate?: number; // Playback rate
  volume?: number; // Volume level
  src: string;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  onTimeUpdate,
  onLoadedMetadata,
  onEnded,
  playbackRate,
  volume,
  src,
}) => {
  const playing = useSelector((state: RootState) => state.player.playing);
  const audioVolume = useSelector(
    (state: RootState) => state.player.audioVolume
  );
  const { howl, setHowl } = useAudio();
  const [currentSongUrl, setCurrentSongUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch music and set Howl source if not initialized
  useEffect(() => {
    const updateTime = () => {
      if (howl) {
       
        const currentTime = howl.seek(); // Get current playback time
        const duration = howl.duration(); // Get total duration
        onTimeUpdate(currentTime, duration); // Notify parent with current time and duration
        requestAnimationFrame(updateTime); // Keep updating
      }
    };
    const fetchMusic = async () => {
      try {
        const res = await fetch("/api/music");
        const data = await res.json();
        if (data?.length > 0) {
          setCurrentSongUrl(data[0].url);

          if (!howl) {
            const newHowl = new Howl({
              src: [data[0].url],
              volume: audioVolume ?? 1,
              rate: playbackRate ?? 1,
              onload: () => {
                console.log("Audio loaded");
                onLoadedMetadata(newHowl.duration()); // Set duration on load
              },
              onplay: () => {
                console.log("Audio playing");
                requestAnimationFrame(updateTime); // Start updating time
              },
              onend: () => {
                console.log("Audio ended");
                if (onEnded) onEnded();
              },
              onloaderror: (id, error) => {
                console.error("Load error:", error);
                setError("Error loading audio. Please try again.");
              },
            });

            setHowl(newHowl); // Set the new Howl instance
            newHowl.play(); // Start playback
          }
        }
      } catch (err) {
        console.error("Failed to fetch music:", err);
        setError("Failed to fetch music. Please try again later.");
      }
    };

    fetchMusic();
  }, [
    howl,
    setHowl,
    audioVolume,
    playbackRate,
    onLoadedMetadata,
    onEnded,
    onTimeUpdate,
    src,
  ]);

  // Update volume and playbackRate whenever howl changes
  // useEffect(() => {
  //   if (howl) {
  //     howl?.volume(audioVolume ?? 1);
  //     howl?.rate(playbackRate ?? 1);
  //   }
  // }, [howl, playbackRate, audioVolume]);

  // Function to update the current time

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      {currentSongUrl && (
        <div>
          {/* Display current song information */}
          <p>Now Playing: {currentSongUrl}</p>
          <p>Volume: {audioVolume}</p>
          <p>Playback Rate: {playbackRate}</p>
        </div>
      )}
    </div>
  );
};

export default AudioControls;
