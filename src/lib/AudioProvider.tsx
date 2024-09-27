// "use client";
// import React, {
//   createContext,
//   useContext,
//   useRef,
//   ReactNode,
//   useState,
//   useEffect,
// } from "react";
// import ReactPlayer from "react-player";

// interface AudioContextProps {
//   audioContext: AudioContext | null;
//   audioRef: React.RefObject<ReactPlayer>;
//   musicSource: MediaElementAudioSourceNode | null | any;
//   setMusicSource: (source: MediaElementAudioSourceNode | null | any) => void;
//   setAudioRef: (value: ReactPlayer | null | any) => void;
//   setAudioContext: (value: AudioContext | null) => void;
// }

// const CombinedAudioContext = createContext<AudioContextProps | undefined>(
//   undefined
// );

// export const AudioProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
//   const audioElementRef = useRef<HTMLAudioElement | null>(null); // New ref for HTML audio element
//   const [audioRef, setAudioRef] = useState<ReactPlayer | null | any>(null);
//   const [musicSource, setMusicSource] =
//     useState<MediaElementAudioSourceNode | null>(null);

//   useEffect(() => {
//     const initializeAudioContext = async () => {
//       const AudioCtx = (window.AudioContext ||
//         (window as any).webkitAudioContext) as typeof AudioContext;
//       const context = new AudioCtx();
//       setAudioContext(context);

//       // Cleanup function
//       return () => {
//         context.close();
//       };
//     };

//     const cleanup = initializeAudioContext();

//     return () => {
//       if (cleanup instanceof Promise) {
//         cleanup.then(() => {});
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const initializeAudioContext = async () => {
//       const AudioCtx = (window.AudioContext ||
//         (window as any).webkitAudioContext) as typeof AudioContext;
//       const context = new AudioCtx();
//       setAudioContext(context);

//       // Resume the context if it's suspended
//       if (context.state === "suspended") {
//         await context.resume();
//       }

//       // Cleanup function
//       return () => {
//         context.close();
//       };
//     };

//     const cleanup = initializeAudioContext();

//     return () => {
//       if (cleanup instanceof Promise) {
//         cleanup.then(() => {});
//       }
//     };
//   }, []);

//   return (
//     <CombinedAudioContext.Provider
//       value={{
//         audioContext,
//         audioRef,
//         musicSource,
//         setAudioRef,
//         setMusicSource,
//         setAudioContext,
//       }}
//     >
//       <audio ref={audioElementRef} style={{ display: "none" }} />
//       {children}
//     </CombinedAudioContext.Provider>
//   );
// };

// export const useAudio = () => {
//   const context = useContext(CombinedAudioContext);
//   if (context === undefined) {
//     throw new Error("useAudio must be used within an AudioProvider");
//   }
//   return context;
// };
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Howl } from "howler";

interface AudioContextType {
  howl: Howl | null;
  setHowl: React.Dispatch<React.SetStateAction<Howl | null>>; // Set Howl instance directly
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [howl, setHowl] = useState<Howl | null>(null); // Keep track of the Howl instance
  const [src, setSrc] = useState<string | null>(null); // Keep track of the audio source

  // Load audio when src changes
  useEffect(() => {
    if (src) {
      const newHowl = new Howl({
        src: [src],
        volume: 1,
        rate: 1,
        onload: () => {
          console.log("Audio loaded");
        },
        onend: () => {
          console.log("Audio ended");
        },
        onloaderror: (id, error) => {
          console.error("Load error:", error);
        },
      });

      setHowl(newHowl); // Set the new Howl instance
      newHowl.load(); // Load the audio

      return () => {
        // Unload audio only if howl is defined
        newHowl.unload(); // Unload the current Howl instance
      };
    }
  }, [src]); // Dependency array, runs when src changes

  const updateSrc = (newSrc: string) => {
    setSrc(newSrc); // Set new source for the audio
  };

  return (
    <AudioContext.Provider value={{ howl, setHowl: (h) => setHowl(h) }}>
      {children}
    </AudioContext.Provider>
  );
};
