import React, { useEffect, useRef, forwardRef } from "react";

interface AudioControlsProps {
  src: string;
  volume: number;
  autoPlay: boolean;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onEnded: () => void;
  playbackRate: number;
}

const AudioControls = forwardRef<HTMLAudioElement, AudioControlsProps>(
  (
    {
      src,
      volume,
      autoPlay,
      onTimeUpdate,
      onLoadedMetadata,
      onEnded,
      playbackRate,
    },
    ref
  ) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
      const audioElement = audioRef.current;

      if (audioElement) {
        // Clamp volume between 0 and 1
        const clampedVolume = Math.max(0, Math.min(volume, 1));

        const setVolume = () => {
          if (!audioElement.muted) {
            audioElement.volume = clampedVolume;
          }
        };

        const handleMetadataLoaded = () => {
          // Set volume when the metadata is loaded (Safari needs this)
          setVolume();
        };

        const handleVolumeChange = () => {
          if (!audioElement.muted) {
            audioElement.volume = clampedVolume;
          }
        };

        // Ensure volume is set after user interaction (Safari fix)
        const handleUserInteraction = () => {
          setVolume();
          audioElement.play().catch(() => {
            // Handle any playback errors
            console.log("Playback was prevented.");
          });

          // Remove the listener after the first interaction
          document.removeEventListener("touchstart", handleUserInteraction);
        };

        // If metadata is already loaded, set the volume immediately
        if (audioElement.readyState >= 1) {
          setVolume();
        } else {
          // For Safari, ensure volume is set after metadata is loaded
          // audioElement.addEventListener("loadedmetadata", handleMetadataLoaded);
        }

        // Additional user interaction for Safari: ensure volume updates on user play event
        audioElement.addEventListener("play", handleVolumeChange);

        // Listen for any user interaction to enable playback
        document.addEventListener("click", handleUserInteraction);
        document.addEventListener("touchstart", handleUserInteraction);

        return () => {
          audioElement.removeEventListener(
            "loadedmetadata",
            handleMetadataLoaded
          );
          audioElement.removeEventListener("play", handleVolumeChange);
          document.removeEventListener("click", handleUserInteraction);
          document.removeEventListener("touchstart", handleUserInteraction);
        };
      }
    }, [volume]);

    // Handle autoPlay and playback rate changes
    useEffect(() => {
      const audioElement = audioRef.current;
      if (audioElement) {
        audioElement.playbackRate = playbackRate;

        if (autoPlay && !audioElement.muted) {
          audioElement.play().catch((err) => {
            // Catch autoplay restrictions for Safari
            console.log("Autoplay restriction error:", err);
          });
        }
      }
    }, [autoPlay, playbackRate]);

    return (
      <audio
        className="hidden"
        ref={(instance) => {
          audioRef.current = instance;
          if (typeof ref === "function") {
            ref(instance);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLAudioElement | null>).current =
              instance;
          }
        }}
        src={src}
        crossOrigin="anonymous"
        autoPlay={autoPlay}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        preload="auto"
        controls
        muted={!autoPlay} // Mute when volume is 0
        playsInline
      />
    );
  }
);

AudioControls.displayName = "AudioControls";

export default AudioControls;
