"use client";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";

import Navbar from "@/components/common/navigation/Navbar";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Playlist from "./components/Playlist";
import AudioPlayerEqualizer from "./components/AudioPlayerEqulizer";

interface PlayerInterface {
  params?: {
    id: any;
  };
  play: boolean;
}

const MaximizePlayer: React.FC<PlayerInterface> = ({ params, play }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [playing, setPlaying] = useState<boolean>(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null
  );
  const [eqOpen, setEqOpen] = useState(0);
  const [playlistOpen, setPlaylistOpen] = useState(0);
  const [tracks, setTraks] = useState<any>([]);

  // resize ref
  const [eqWidth, setEqWidth] = useState(0); // Initial width for equalizer
  const [playlistWidth, setPlaylistWidth] = useState(0); // Initial width for playlist
  const resizingEqRef = useRef<HTMLDivElement | null>(null);
  const resizingPlaylistRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [startEqWidth, setStartEqWidth] = useState<number>(0);
  const [startPlaylistWidth, setStartPlaylistWidth] = useState<number>(0);

  // Equalizer resize logic
  const startResizingEq = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      setStartX(x);
      setStartEqWidth(eqWidth);

      const onMouseMove = (e: MouseEvent | TouchEvent) => {
        const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const newWidth = Math.max(startEqWidth - (x - startX), 0); // Ensure minimum width
        setEqWidth(newWidth);
      };

      const stopResizing = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopResizing);
        document.removeEventListener("touchmove", onMouseMove);
        document.removeEventListener("touchend", stopResizing);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", stopResizing);
      document.addEventListener("touchmove", onMouseMove);
      document.addEventListener("touchend", stopResizing);
    },
    [eqWidth, startX, startEqWidth]
  );

  const handleMouseDownEq = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    startResizingEq(e as unknown as MouseEvent);
  };

  const handleTouchStartEq = (e: React.TouchEvent<HTMLDivElement>) => {
    startResizingEq(e as unknown as TouchEvent);
  };

  // Playlist resize logic
  const startResizingPlaylist = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      setStartX(x);
      setStartPlaylistWidth(playlistWidth);

      const onMouseMove = (e: MouseEvent | TouchEvent) => {
        const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const newWidth = Math.max(startPlaylistWidth - (x - startX), 0); // Ensure minimum width
        setPlaylistWidth(newWidth);
      };

      const stopResizing = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopResizing);
        document.removeEventListener("touchmove", onMouseMove);
        document.removeEventListener("touchend", stopResizing);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", stopResizing);
      document.addEventListener("touchmove", onMouseMove);
      document.addEventListener("touchend", stopResizing);
    },
    [playlistWidth, startX, startPlaylistWidth]
  );

  const handleMouseDownPlaylist = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    startResizingPlaylist(e as unknown as MouseEvent);
  };

  const handleTouchStartPlaylist = (e: React.TouchEvent<HTMLDivElement>) => {
    startResizingPlaylist(e as unknown as TouchEvent);
  };

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

  useEffect(() => {
    if (currentTrackIndex !== null) {
      setPlaying(true);
    }
  }, [currentTrackIndex, tracks]);

  // show controls
  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/music/")) {
      setShowPlayer(true);
    } else {
      setShowPlayer(false);
    }
    if (showPlayer) {
      setEqWidth(0);
      setPlaylistWidth(0);
    }
  }, [pathname, showPlayer]);

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
    );
  }

  const handleAudioContextReady = (
    audioContext: AudioContext,
    audioElement: HTMLAudioElement
  ) => {
    setAudioContext(audioContext);
    setAudioElement(audioElement);
  };

  const handleOpenEqualizer = () => {
    if (eqWidth <= 0) {
      setEqOpen(0);
      setEqWidth(500);
      setPlaylistWidth(0); // Close playlist when opening equalizer
    } else {
      setEqOpen(eqWidth);
      setEqWidth(0);
    }
  };

  const handleOpenPlaylist = () => {
    if (playlistWidth <= 0) {
      setPlaylistOpen(0);
      setPlaylistWidth(500);
      setEqWidth(0); // Close equalizer when opening playlist
    } else {
      setPlaylistOpen(playlistWidth);
      setPlaylistWidth(0);
    }
  };

  return (
    <div
      className="flex flex-col select-none h-screen overflow-hidden w-full"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dse4w3es9/image/upload/v1723971237/i7vujjbuvidfqpmoqfpz.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute w-full h-screen bg-black opacity-10 z-10"></div>
      <div className="flex z-20 flex-grow relative">
        {showPlayer && <Navbar blur />}
        <div className="flex-1 transition-all">
          <AudioPlayer
            play
            handleNext={handleNext}
            handlePrev={handlePrev}
            id={params?.id}
            currentSong={currentSong}
            onAudioContextReady={handleAudioContextReady}
            handleOpenEqualizer={handleOpenEqualizer}
            handleOpenPlayList={handleOpenPlaylist}
          />
        </div>

        <div
          className={`bg-white relative h-full z-50 mt-[96px] max-lg:absolute transition-all duration-500 ${
            eqWidth <= 0
              ? "max-w-3xl w-[400px] lg:w-[500px] right-0 bottom-0"
              : "w-0"
          }`}
          ref={resizingEqRef}
          style={{ width: eqWidth }}
        >
          {eqWidth > 0 && (
            <>
              <AudioPlayerEqualizer
                audioContext={audioContext}
                audioElement={audioElement}
              />
              <div
                className="absolute left-0 top-0 h-full w-2.5 cursor-col-resize"
                onMouseDown={handleMouseDownEq}
                onTouchStart={handleTouchStartEq}
              />
            </>
          )}
        </div>

        <div
          className={`bg-white relative z-50 h-full mt-[96px] max-lg:absolute transition-all duration-500 ${
            playlistWidth <= 0
              ? "max-w-3xl w-[400px] lg:w-[500px] right-0 bottom-0"
              : "w-0"
          }`}
          ref={resizingPlaylistRef}
          style={{ width: playlistWidth }}
        >
          {playlistWidth > 0 && (
            <>
              <Playlist tracks={tracks} />
              <div
                className="absolute left-0 top-0 h-full w-2.5 cursor-col-resize"
                onMouseDown={handleMouseDownPlaylist}
                onTouchStart={handleTouchStartPlaylist}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaximizePlayer;
