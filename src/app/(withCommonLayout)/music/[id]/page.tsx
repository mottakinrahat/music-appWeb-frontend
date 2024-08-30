"use client";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import useLocalSongData from "@/hooks/useLocalSongData";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface PlayerInterface {
  params?: {
    id: any;
  };
}

const Player: React.FC<PlayerInterface> = ({ params }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  // const [repeat, setRepeat] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
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

  useEffect(() => {
    const initialTrackIndex = tracks?.findIndex(
      (track: any) => track?._id === params?.id
    );
    if (initialTrackIndex !== -1) {
      setCurrentTrackIndex(initialTrackIndex);
    }
    setCurrentSong(tracks[initialTrackIndex]);
  }, [params?.id, tracks]);

  // Changing Play state
  const songData = useLocalSongData();
  useEffect(() => {
    if (currentTrackIndex !== null && songData?.play === true) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [currentSong, currentTrackIndex, songData?.play]);

  // const handlePrev = () => {
  //   if (currentTrackIndex !== null && currentTrackIndex > 0) {
  //     const newIndex = currentTrackIndex - 1;
  //     setCurrentTrackIndex(newIndex);
  //     setCurrentSong(tracks[newIndex]);
  //   }
  // };

  // const handleNext = () => {
  //   if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
  //     const newIndex = currentTrackIndex + 1;
  //     setCurrentTrackIndex(newIndex);
  //     setCurrentSong(tracks[newIndex]);
  //   }
  // };

  if (!currentSong) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  // const handleAudioContextReady = (
  //   audioContext: AudioContext,
  //   audioElement: HTMLAudioElement
  // ) => {
  //   setAudioContext(audioContext);
  //   setAudioElement(audioElement);
  // };

  // const handleOpenEqualizer = () => {
  //   setEqOpen(!eqOpen);
  // };

  return (
    <div
    // className="flex flex-col h-screen overflow-hidden w-full"
    // style={{
    //   backgroundImage: `url(https://res.cloudinary.com/dse4w3es9/image/upload/v1723971237/i7vujjbuvidfqpmoqfpz.png)`,
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "cover",
    // }}
    >
      {/* <div className="absolute w-full h-screen bg-black opacity-10 z-10"></div>
      <div className="flex z-20 flex-grow relative">
        <Navbar blur />
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
          className={` bg-white h-full mt-[96px] max-lg:absolute transition-all duration-500 ${
            eqOpen
              ? "max-w-3xl w-[400px] lg:w-[500px] right-0 bottom-0"
              : "w-0 -right-full bottom-0"
          }`}
        >
          <AudioPlayerEqualizer
            audioContext={audioContext}
            audioElement={audioElement}
          />
        </div> *
       </div> */}
    </div>
  );
};

export default Player;
