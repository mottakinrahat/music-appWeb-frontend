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

    useEffect(() => {
      if (!audioRef) {
        setAudioRef(ref);
      }
      // Fetch the song list from the API
      const fetchMusic = async () => {
        try {
          const res = await fetch("/api/music");
          const data = await res.json();
          if (data.length > 0) {
            // Set the src of the first song in the list
            setCurrentSongUrl(data[0].url);
          }
        } catch (err) {
          console.error("Failed to fetch music:", err);
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

    return (
      <div className="hidden">
        {currentSongUrl && (
          <ReactPlayer
            ref={audioRef}
            
            url={src} // Use the URL from the state
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
          />
        )}
      </div>
    );
  }
);

AudioControls.displayName = "AudioControls";

export default AudioControls;
