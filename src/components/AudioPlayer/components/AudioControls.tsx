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
    const { setAudioRef, audioRef, setCurrentSongBlob } = useAudio();
    const [currentSong, setCurrentSongUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const importedUrl = useSelector(
      (state: RootState) => state.musicData.fileData
    );

    useEffect(() => {
      if (!audioRef) {
        setAudioRef(ref);
      }

      const fetchMusic = async () => {
        if (src)
          try {
            // Fetch the raw audio data from the music URL
            const res = await fetch(src);

            // Ensure the response is OK
            if (!res.ok) {
              throw new Error("Failed to fetch the music file");
            }

            // Retrieve the data as a blob
            const blob = await res.blob();
            setCurrentSongBlob(blob);

            // You can now set the Blob URL for playback or further processing
            const musicUrl = URL.createObjectURL(blob);

            setCurrentSongUrl(musicUrl);
          } catch (err) {
            console.error("Failed to fetch music:", err);
            setError("Failed to fetch music. Please try again later.");
          }
      };

      fetchMusic();
    }, [audioRef, ref, setAudioRef, setCurrentSongBlob, src]);

    console.log(currentSong);

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
        {currentSong && (
          <ReactPlayer
            ref={audioRef}
            url={importedUrl ? importedUrl : currentSong}
            playing={playing}
            volume={audioVolume}
            onDuration={onLoadedMetadata}
            onProgress={onTimeUpdate}
            onEnded={onEnded}
            // config={{
            //   file: {
            //     attributes: {
            //       crossOrigin: "anonymous",
            //     },
            //   },
            // }}
            // onError={handleError}
          />
        )}
      </div>
    );
  }
);

AudioControls.displayName = "AudioControls";

export default AudioControls;
