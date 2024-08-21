"use client";
import AudioPlayer from "@/component/AudioPlayer/AudioPlayer";
import AudioPlayerEqualizer from "@/component/AudioPlayer/AudioPlayerEqulizer";
import React, { useState } from "react";

const Player: React.FC = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  const handleAudioContextReady = (
    audioContext: AudioContext,
    audioElement: HTMLAudioElement
  ) => {
    setAudioContext(audioContext);
    setAudioElement(audioElement);
  };

  return (
    <div>
      <AudioPlayer onAudioContextReady={handleAudioContextReady} />
      <AudioPlayerEqualizer
        audioContext={audioContext}
        audioElement={audioElement}
      />
    </div>
  );
};

export default Player;
