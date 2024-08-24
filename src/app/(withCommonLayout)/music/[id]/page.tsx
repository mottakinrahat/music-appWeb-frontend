"use client";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import AudioPlayerEqualizer from "@/components/AudioPlayer/components/AudioPlayerEqulizer";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import axios from "axios";
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
    axios
      .get("https://music-app-web.vercel.app/api/v1/songs")
      .then((data) => setTraks(data.data.data.songs));
  }, []);

  const [currentSong, setCurrentSong] = useState<any>(tracks[0]);

  // console.log(currentSong);
  // song loading start
  useEffect(() => {
    // Find the track based on the ID
    const initialTrackIndex = tracks?.findIndex(
      (track: any) => track?._id === params?.id
    );
    console.log(initialTrackIndex);
    if (initialTrackIndex !== -1) {
      setCurrentTrackIndex(initialTrackIndex);
    }
    setCurrentSong(tracks[initialTrackIndex]);
  }, [params.id, tracks]);

  useEffect(() => {
    if (currentTrackIndex !== null) {
      setPlaying(true);
      // router.push(`/music/${tracks[currentTrackIndex].id}`);
    }
  }, [currentTrackIndex, tracks]);

  const handlePrev = () => {
    if (currentTrackIndex !== null && currentTrackIndex > 0) {
      const newIndex = currentTrackIndex - 1;
      setCurrentTrackIndex(newIndex);
      setCurrentSong(tracks[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
      const newIndex = currentTrackIndex + 1;
      setCurrentTrackIndex(newIndex);
      setCurrentSong(tracks[newIndex]);
    }
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
  };

  return (
    <div className="flex overflow-hidden w-full">
      <div className="flex-1 transition-all ">
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
        className={`h-full bg-white max-h-screen overflow-hidden max-lg:absolute  duration-500 transition-all ${
          eqOpen
            ? "max-w-3xl w-[400px] lg:w-[500px] overflow-hidden right-[0]"
            : "w-0 -right-full "
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
