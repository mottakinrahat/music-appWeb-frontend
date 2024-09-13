// context/AudioContext.tsx
import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface AudioContextProps {
  audioContext: AudioContext | null;
  audioRef: React.RefObject<HTMLAudioElement>;
  musicSource: MediaElementAudioSourceNode | null | any;
  setMusicSource: (source: MediaElementAudioSourceNode | null | any) => void;
  setAudioRef: (value: HTMLAudioElement | null | any) => void;
}

const CombinedAudioContext = createContext<AudioContextProps | undefined>(
  undefined
);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null | any>(null);

  const [musicSource, setMusicSource] =
    useState<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    const initializeAudioContext = async () => {
      const context = new AudioContext();
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
    if (audioContext && audioRef?.current) {
      const newMusicSource = audioContext.createMediaElementSource(
        audioRef?.current
      );
      setMusicSource(newMusicSource);

      return () => {
        if (newMusicSource) {
          newMusicSource.disconnect();
        }
      };
    }
  }, [audioContext, audioRef]);

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
