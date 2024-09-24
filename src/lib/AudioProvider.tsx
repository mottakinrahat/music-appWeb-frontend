import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useState,
  useEffect,
} from "react";
import ReactPlayer from "react-player";

interface AudioContextProps {
  audioContext: AudioContext | null;
  audioRef: React.RefObject<ReactPlayer>;
  musicSource: MediaElementAudioSourceNode | null | any;
  setMusicSource: (source: MediaElementAudioSourceNode | null | any) => void;
  setAudioRef: (value: ReactPlayer | null | any) => void;
}

const CombinedAudioContext = createContext<AudioContextProps | undefined>(
  undefined
);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null); // New ref for HTML audio element
  const [audioRef, setAudioRef] = useState<ReactPlayer | null | any>(null);
  const [musicSource, setMusicSource] =
    useState<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    const initializeAudioContext = async () => {
      const AudioCtx = (window.AudioContext ||
        (window as any).webkitAudioContext) as typeof AudioContext;
      const context = new AudioCtx();
      setAudioContext(context);

      // Cleanup function
      return () => {
        context.close();
      };
    };

    const cleanup = initializeAudioContext();

    return () => {
      if (cleanup instanceof Promise) {
        cleanup.then(() => {});
      }
    };
  }, []);

  useEffect(() => {
    if (audioContext && audioElementRef.current) {
      const newMusicSource = audioContext.createMediaElementSource(
        audioElementRef.current // Using the native <audio> element
      );
      setMusicSource(newMusicSource);

      return () => {
        if (newMusicSource) {
          newMusicSource.disconnect();
        }
      };
    }
  }, [audioContext]);

  return (
    <CombinedAudioContext.Provider
      value={{
        audioContext,
        audioRef,
        musicSource,
        setAudioRef,
        setMusicSource,
      }}
    >
      <audio ref={audioElementRef} style={{ display: "none" }} />
      {children}
    </CombinedAudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(CombinedAudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
