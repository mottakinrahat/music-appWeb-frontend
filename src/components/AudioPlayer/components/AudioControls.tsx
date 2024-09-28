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
    const [error, setError] = useState<string | null>(null);
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
        if (internalPlayer) {
          // Set playback rate and volume
          internalPlayer.playbackRate = playbackRate ?? 1;
          internalPlayer.volume = audioVolume ?? 1;
        }
      }
    }, [audioRef, playbackRate, audioVolume]);

    // const handleError = (e: any) => {
    //   console.error("Error loading audio:", e);
    //   const corsProxy = "https://cors-anywhere.herokuapp.com/";
    //   const fallbackUrl = corsProxy + (src || currentSongUrl);
    //   setCurrentSongUrl(fallbackUrl);
    //   setError("Error loading audio. Trying a fallback URL.");
    // };

    return (
      <div className="hidden">
        {error && <div className="error-message">{error}</div>}
        {currentSongUrl && (
          <ReactPlayer
            ref={audioRef}
            url={importedUrl ? importedUrl : src}
            playing={playing}
            volume={audioVolume}
            onDuration={onLoadedMetadata}
            onProgress={onTimeUpdate}
            onEnded={onEnded}
            config={{
              file: {
                attributes: {
                  crossOrigin: "anonymous",
                },
              },
            }}
            // onError={handleError}
          />
        )}
      </div>
    );
  }
);

AudioControls.displayName = "AudioControls";

export default AudioControls;
