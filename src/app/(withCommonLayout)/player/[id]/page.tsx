"use client";
import AudioPlayer from "@/component/AudioPlayer/AudioPlayer";
import AudioPlayerEqualizer from "@/component/AudioPlayer/AudioPlayerEqulizer";
import React, { useEffect, useState } from "react";
// import { tracks2 } from "../page";
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
  const [eqOpen, setEqOpen] = useState(false);

  const [tracks, setTraks] = useState<any>([]);
  useEffect(() => {
    fetch("/tracks.json")
      .then((data) => data.json())
      .then((tracks) => setTraks(tracks));
  }, []);

  // song loading start
  useEffect(() => {
    // Find the track based on the ID
    const initialTrackIndex = tracks.findIndex(
      (track: any) => track.id === params.id
    );
    if (initialTrackIndex !== -1) {
      setCurrentTrackIndex(initialTrackIndex);
    }
  }, [params.id, tracks]);

  useEffect(() => {
    if (currentTrackIndex !== null) {
      setPlaying(true);
      // router.push(`/music/${tracks[currentTrackIndex].id}`);
    }
  }, [currentTrackIndex]);

  // Get current song details
  const currentSong = tracks[params.id];
  // console.log(currentSong);
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

  const handleOpenEqualizer = () => {
    setEqOpen(!eqOpen);
    console.log("clicked");
  };

  return (
    <div className="flex overflow-hidden w-full">
      <div className="flex-1 transition-all">
        <AudioPlayer
          id={params?.id}
          currentSong={currentSong}
          onAudioContextReady={handleAudioContextReady}
          handleOpenEqualizer={handleOpenEqualizer}
        />
      </div>
      <div
        className={`h-full max-h-screen  duration-500 transition-all ${
          eqOpen ? "max-w-3xl w-[500px] " : "w-0"
        }`}
      >
        <AudioPlayerEqualizer
          audioContext={audioContext}
          audioElement={audioElement}
        />
      </div>
    </div>
  );
};

export default Player;
