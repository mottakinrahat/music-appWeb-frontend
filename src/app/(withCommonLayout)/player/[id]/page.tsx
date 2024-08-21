"use client";
import AudioPlayer from "@/component/AudioPlayer/AudioPlayer";
import AudioPlayerEqualizer from "@/component/AudioPlayer/AudioPlayerEqulizer";
import React, { useEffect, useState } from "react";
import { tracks2 } from "../page";
import LoadingAnimation from "@/component/LoadingAnimation/LoadingAnimation";

interface PlayerInterface {
  params: {
    id: any;
  };
}

const Player: React.FC<PlayerInterface> = ({ params }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [repeat, setRepeat] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null
  );

  // song loading start
  useEffect(() => {
    // Find the track based on the ID
    const initialTrackIndex = tracks2.findIndex(
      (track) => track.id === params.id
    );
    if (initialTrackIndex !== -1) {
      setCurrentTrackIndex(initialTrackIndex);
    }
  }, [params.id]);

  useEffect(() => {
    if (currentTrackIndex !== null) {
      setPlaying(true);
      // router.push(`/music/${tracks[currentTrackIndex].id}`);
    }
  }, [currentTrackIndex]);

  // Get current song details
  const currentSong = tracks2[1];
  console.log(currentSong);
  if (!currentSong) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    ); // Optionally handle loading state
  }

  const { title, url, artwork, artist, album } = currentSong;

  const handleAudioContextReady = (
    audioContext: AudioContext,
    audioElement: HTMLAudioElement
  ) => {
    setAudioContext(audioContext);
    setAudioElement(audioElement);
  };

  return (
    <div>
      <AudioPlayer
        id={params?.id}
        currentSong={currentSong}
        onAudioContextReady={handleAudioContextReady}
      />
      <AudioPlayerEqualizer
        audioContext={audioContext}
        audioElement={audioElement}
      />
    </div>
  );
};

export default Player;
