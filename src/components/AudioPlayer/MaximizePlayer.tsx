"use client";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import AudioPlayerEqualizer from "@/components/AudioPlayer/components/AudioPlayerEqulizer";
import Navbar from "@/components/common/navigation/Navbar";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Playlist from "./components/Playlist";

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
  const [width, setWidth] = useState(0); // Initial width
  const [listWidth, setListWidth] = useState(0); // Initial width
  const resizingRef = useRef<HTMLDivElement | null>(null);
  const resizingPlayListRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [playListStartX, setPlayListStartX] = useState<number>(0);
  const [startWidth, setStartWidth] = useState<number>(0);
  const [playListWidth, setPlayListWidth] = useState<number>(0);

  const startResizing = useCallback(
    (e: MouseEvent | TouchEvent) => {
      // e.preventDefault();

      // Determine the starting X position and width
      const x =
        e instanceof MouseEvent
          ? e.clientX
          : e instanceof TouchEvent
          ? e.touches[0].clientX
          : 0;
      setStartX(x);
      setStartWidth(width);

      const onMouseMove = (e: MouseEvent | TouchEvent) => {
        const x =
          e instanceof MouseEvent
            ? e.clientX
            : e instanceof TouchEvent
            ? e.touches[0].clientX
            : 0;
        const newWidth = Math.max(startWidth - (x - startX), 0); // Ensure minimum width
        setWidth(newWidth);
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
    [width, startX, startWidth]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    startResizing(e as unknown as MouseEvent);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startResizing(e as unknown as TouchEvent);
  };

  // Play list Operations
  const resizingPlayList = useCallback(
    (e: MouseEvent | TouchEvent) => {
      // e.preventDefault();

      // Determine the starting X position and width
      const x =
        e instanceof MouseEvent
          ? e.clientX
          : e instanceof TouchEvent
          ? e.touches[0].clientX
          : 0;
      setPlayListStartX(x);
      setPlayListWidth(listWidth);

      const onMouseMove = (e: MouseEvent | TouchEvent) => {
        const x =
          e instanceof MouseEvent
            ? e.clientX
            : e instanceof TouchEvent
            ? e.touches[0].clientX
            : 0;
        const newWidth = Math.max(playListWidth - (x - playListStartX), 0); // Ensure minimum width
        setListWidth(newWidth);
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
    [listWidth, playListWidth, playListStartX]
  );

  const handleMouseDownPlayList = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    resizingPlayList(e as unknown as MouseEvent);
  };

  const handleTouchStartPlayList = (e: React.TouchEvent<HTMLDivElement>) => {
    resizingPlayList(e as unknown as TouchEvent);
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
    // Show the player only if the path matches `/music/:id`
    if (pathname.startsWith("/music/")) {
      setShowPlayer(true);
    } else {
      setShowPlayer(false);
    }
    if (showPlayer) {
      setWidth(0);
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
    if (width <= 0) {
      setEqOpen(0);
      setWidth(500);
    } else {
      setEqOpen(width);
      setWidth(0);
    }
  };
  // PlayListOperations
  const handleOpenPlayList = () => {
    if (listWidth <= 0) {
      setPlaylistOpen(0);
      setListWidth(500);
    } else {
      setPlaylistOpen(listWidth);
      setListWidth(0);
    }
  };

  console.log(listWidth);

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
            handleOpenPlayList={handleOpenPlayList}
          />
        </div>

        <div
          className={`bg-white relative h-full mt-[96px] max-lg:absolute transition-all duration-500 ${
            eqOpen <= 0
              ? "max-w-3xl w-[400px] lg:w-[500px] right-0 bottom-0"
              : "w-0 -right-full bottom-0"
          }`}
          style={{ width }}
          ref={resizingRef}
        >
          <div
            className="absolute left-0 top-0 h-full w-2 bg-white z-[99999] cursor-ew-resize"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          ></div>
          <AudioPlayerEqualizer
            audioContext={audioContext}
            audioElement={audioElement}
          />
        </div>
        {playlistOpen <= 0 && listWidth > 0 ? (
          <div
            onClick={() => {
              handleOpenPlayList();
            }}
            className={`${
              playlistOpen <= 0
                ? "fixed transition-colors duration-1000 bg-gradient-to-t from-black/40 h-full w-full top-0"
                : "bg-transparent"
            } `}
          ></div>
        ) : (
          ""
        )}
        {eqOpen <= 0 && width > 0 ? (
          <div
            onClick={() => {
              handleOpenEqualizer();
            }}
            className={`${
              eqOpen <= 0
                ? "fixed transition-colors duration-1000 bg-gradient-to-t from-black/40 h-full w-full top-0"
                : "bg-transparent"
            } `}
          ></div>
        ) : (
          ""
        )}
        <div
          className={`bg-white relative h-full mt-[96px] max-lg:absolute transition-all duration-500 ${
            playlistOpen <= 0
              ? "max-w-3xl w-[400px] lg:w-[500px] right-0 bottom-0"
              : "w-0 -right-full bottom-0"
          }`}
          style={{ width: listWidth }}
          ref={resizingPlayListRef}
        >
          <div
            className="absolute left-0 top-0 h-full w-2 bg-white z-[99999] cursor-ew-resize"
            onMouseDown={handleMouseDownPlayList}
            onTouchStart={handleTouchStartPlayList}
          ></div>
          <Playlist tracks={tracks} />
        </div>
      </div>
    </div>
  );
};

export default MaximizePlayer;
