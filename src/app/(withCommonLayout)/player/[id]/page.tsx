"use client";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import AudioPlayerEqualizer from "@/components/AudioPlayer/components/AudioPlayerEqulizer";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import React, { useEffect, useState } from "react";
// import { tracks2 } from "../page";

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

  const [currentSong, setCurrentSong] = useState<any>(tracks[0]);
  console.log(currentSong);

  console.log(tracks[0]);
  // song loading start
  useEffect(() => {
    // Find the track based on the ID
    const initialTrackIndex = tracks.findIndex(
      (track: any) => track.id === params.id
    );
    if (initialTrackIndex !== -1) {
      setCurrentTrackIndex(initialTrackIndex);
    }
    setCurrentSong(tracks[params.id]);
  }, [params.id, tracks]);

  useEffect(() => {
    if (currentTrackIndex !== null) {
      setPlaying(true);
      // router.push(`/music/${tracks[currentTrackIndex].id}`);
    }
  }, [currentTrackIndex]);

  const handlePrev = () => {
    setCurrentSong(parseInt(params.id) - 1);
  };

  const handleNext = () => {
    setCurrentSong(parseInt(params.id) + 1);
  };
  if (!currentSong) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    ); // Optionally handle loading state
  }

  // const { title, url, artwork, artist, album } = currentSong;

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
          handleNext={handleNext}
          handlePrev={handlePrev}
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
