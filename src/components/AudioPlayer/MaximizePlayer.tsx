"use client";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import AudioPlayerEqualizer from "@/components/AudioPlayer/components/AudioPlayerEqulizer";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Playlist from "./components/Playlist";
import useLocalSongData from "@/hooks/useLocalSongData";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { detectBPM } from "@/utils/bpmdetection";
import { useAudio } from "@/lib/AudioProvider";
import baseApiHandler from "@/utils/baseApiHandler";

interface PlayerInterface {
  params?: {
    id: any;
  };
}

const MaximizePlayer: React.FC<PlayerInterface> = ({ params }) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null
  );
  const [eqOpen, setEqOpen] = useState(0);
  const [playlistOpen, setPlaylistOpen] = useState(0);
  const [tracks, setTraks] = useState<any>([]);
  const [width, setWidth] = useState(0); // Initial width
  const [listWidth, setListWidth] = useState(0); // Initial width
  const resizingRef = useRef<HTMLDivElement | null>(null);
  const resizingPlayListRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [playListStartX, setPlayListStartX] = useState<number>(0);
  const [startWidth, setStartWidth] = useState<number>(0);
  const [playListWidth, setPlayListWidth] = useState<number>(0);
  const importedSong = useSelector((state: RootState) => state.musicData);
  const [bpm, setBpm] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { audioContext: musicContext, audioRef } = useAudio();
  const router = useRouter();
  const apiUrl = baseApiHandler();

  const startResizing = useCallback(
    (e: MouseEvent | TouchEvent) => {
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

  const resizingPlayList = useCallback(
    (e: MouseEvent | TouchEvent) => {
      // e.preventDefault();

      // Determine the starting X position and width
      const x2 = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      setPlayListStartX(x2);
      setPlayListWidth(listWidth);

      const onMouseMove2 = (e: MouseEvent | TouchEvent) => {
        const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const newWidth2 = Math.max(playListWidth - (x - playListStartX), 0); // Ensure minimum width
        setListWidth(newWidth2);
      };

      const stopResizing2 = () => {
        document.removeEventListener("mousemove", onMouseMove2);
        document.removeEventListener("mouseup", stopResizing2);
        document.removeEventListener("touchmove", onMouseMove2);
        document.removeEventListener("touchend", stopResizing2);
      };

      document.addEventListener("mousemove", onMouseMove2);
      document.addEventListener("mouseup", stopResizing2);
      document.addEventListener("touchmove", onMouseMove2);
      document.addEventListener("touchend", stopResizing2);
    },
    [listWidth, playListWidth, playListStartX]
  );

  const handleMouseDownPlayList = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    resizingPlayList(e.nativeEvent);
  };

  const handleTouchStartPlayList = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    resizingPlayList(e.nativeEvent);
  };

  useEffect(() => {
    axios.get(`${apiUrl}/songs`).then((data) => setTraks(data.data.data.songs));
  }, [apiUrl]);

  const [currentSong, setCurrentSong] = useState<any>(tracks[0]);

  // if (!currentSong?.songLink) return <Loading />;
  useEffect(() => {
    const fetchBPM = async () => {
      try {
        const url = currentSong?.songLink;

        if (url) {
          const detectedBPM = await detectBPM(url);
          if (detectedBPM === null) {
            setError(
              "Unable to detect BPM. Please check the audio file and detection logic."
            );
          } else {
            setBpm(detectedBPM);
          }
        }
      } catch (error) {
        console.error("Error fetching or processing audio:", error);
        setError("Failed to detect BPM");
      } finally {
        setLoading(false);
      }
    };

    fetchBPM();
  }, [currentSong]);

  useEffect(() => {
    const initialTrackIndex = tracks?.findIndex(
      (track: any) => track?._id === params?.id
    );
    if (initialTrackIndex !== -1) {
      setCurrentTrackIndex(initialTrackIndex);
    }
    setCurrentSong(tracks[initialTrackIndex]);
  }, [musicContext, params?.id, tracks]);

  const songData = useLocalSongData();
  useEffect(() => {
    if (currentTrackIndex !== null && songData?.play === true) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [currentSong, currentTrackIndex, songData?.play]);
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
      setListWidth(0);
    }
  }, [currentSong?._id, pathname, showPlayer]);

  const repeat = useSelector((state: RootState) => state.player.repeat);

  const handlePrev = () => {
    if (currentTrackIndex !== null) {
      let newIndex = currentTrackIndex - 1;
      if (newIndex < 0) {
        if (repeat === "repeat-all") {
          newIndex = tracks.length - 1;
        } else if (repeat === "repeat-off") {
          return; // Stop if no repeat is set and we are at the first track.
        }
      }
      if (repeat === "shuffle") {
        newIndex = Math.floor(Math.random() * tracks.length);
      }

      setCurrentTrackIndex(newIndex);
      setCurrentSong(tracks[newIndex]);
      if (showPlayer) router.push(`/music/${tracks[newIndex]?._id}`);
    }
  };
  // Handles next track
  const handleNext = () => {
    if (currentTrackIndex !== null) {
      let newIndex = currentTrackIndex + 1;

      if (newIndex >= tracks.length) {
        if (repeat === "repeat-all") {
          newIndex = 0;
        } else if (repeat === "repeat-off") {
          return; // Stop if no repeat is set and we are at the last track.
        }
      }

      if (repeat === "shuffle") {
        newIndex = Math.floor(Math.random() * tracks.length);
      }

      setCurrentTrackIndex(newIndex);
      setCurrentSong(tracks[newIndex]);
      if (showPlayer) router.push(`/music/${tracks[newIndex]?._id}`);
    }
  };
  const handleRandom = () => {
    if (currentTrackIndex) {
      const newIndex =
        currentTrackIndex + Math.floor(Math.random() * tracks.length - 1);
      if (
        currentTrackIndex !== null &&
        currentTrackIndex !== undefined &&
        currentTrackIndex < tracks.length - 1 &&
        currentTrackIndex !== newIndex
      ) {
        setCurrentTrackIndex(newIndex);
        setCurrentSong(tracks[newIndex]);
        if (showPlayer) router.push(`/music/${tracks[newIndex]?._id}`);
      } else if (currentTrackIndex === newIndex) {
        handleRandom();
      }
    }
  };

  // Sync localStorage and routing with currentSong updates
  useEffect(() => {
    if (currentSong) {
      localStorage.setItem(
        "songData",
        JSON.stringify({ play: false, id: currentSong._id })
      );
      // router.replace(`/music/${currentSong._id}`);
    }
  }, [currentSong, router]);
  const [backgroundImage, setBackgroundImage] = useState(
    "https://res.cloudinary.com/dse4w3es9/image/upload/v1723971237/i7vujjbuvidfqpmoqfpz.png"
  );

  useEffect(() => {
    if (
      currentSong?.artwork &&
      currentSong?.artwork !== "" &&
      importedSong.fileData === null
    ) {
      setBackgroundImage(currentSong.artwork);
    } else {
      setBackgroundImage(
        "https://res.cloudinary.com/dse4w3es9/image/upload/v1723971237/i7vujjbuvidfqpmoqfpz.png"
      );
    }
  }, [currentSong?.artwork, importedSong.fileData]);

  if (!currentSong) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  const screenWidth = window.innerWidth;
  const handleOpenEqualizer = () => {
    if (width <= 0) {
      if (screenWidth < 480) {
        setWidth(300);
      } else if (screenWidth < 768) {
        setWidth(400);
      } else {
        setWidth(500);
      }
    } else {
      setWidth(0);
    }
    setListWidth(0);
  };
  // PlayListOperations
  const handleOpenPlayList = () => {
    if (listWidth <= 0) {
      if (screenWidth < 480) {
        setListWidth(290);
      } else if (screenWidth < 768) {
        setListWidth(400);
      } else {
        setListWidth(700);
      }
    } else {
      setListWidth(0);
    }
    setWidth(0);
  };

  return (
    <div
      className="flex flex-col select-none h-screen overflow-hidden w-full bg-cover bg-center transition-background-image duration-1000"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute w-full h-screen bg-black opacity-60 "></div>

      <div className="flex z-10 flex-grow relative">
        <div className="flex-1 transition-all">
          <AudioPlayer
            play={playing}
            handleNext={handleNext}
            handlePrev={handlePrev}
            id={params?.id}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            handleOpenEqualizer={handleOpenEqualizer}
            handleOpenPlayList={handleOpenPlayList}
            handleRandom={handleRandom}
            loading={loading}
          />
        </div>
        {playlistOpen <= 0 && listWidth > 0 ? (
          <div
            onClick={handleOpenPlayList}
            className={`${
              playlistOpen <= 0
                ? "fixed transition-colors duration-1000 bg-gradient-to-t from-black/90 h-full w-full top-0"
                : "bg-transparent"
            } `}
          ></div>
        ) : (
          ""
        )}
        <div
          className={`bg-white 2xl:relative h-full mt-[96px] top-[-2rem] md:top-[-1rem] lg:top-0  absolute transition-all duration-500 ${
            playlistOpen <= 0
              ? "max-w-3xl w-[400px] lg:w-[500px] right-0 bottom-0"
              : "w-0 -right-full bottom-0"
          }`}
          style={{ width: listWidth }}
          ref={resizingPlayListRef}
        >
          {playlistOpen <= 0 && listWidth <= 0 && (
            <div
              className="absolute left-0 top-0 h-full  w-2 bg-white z-[99999] cursor-ew-resize"
              onMouseDown={handleMouseDownPlayList}
              onTouchStart={handleTouchStartPlayList}
            ></div>
          )}
          <Playlist setPlaying={setPlaying} playing={playing} tracks={tracks} />
        </div>
        {eqOpen <= 0 && width > 0 && listWidth <= 0 ? (
          <div
            onClick={() => {
              handleOpenEqualizer();
            }}
            className={`${
              eqOpen <= 0
                ? "fixed transition-colors duration-1000  bg-gradient-to-t from-black/90 h-full w-full top-0"
                : "bg-transparent"
            } `}
          ></div>
        ) : (
          ""
        )}
        <div
          className={`bg-white 2xl:relative h-full mt-[96px] top-[-2rem] md:top-[-1rem] lg:top-0  absolute transition-all duration-500 ${
            eqOpen <= 0 ? " right-0 bottom-0" : "w-0 -right-full bottom-0"
          }`}
          style={{ width }}
          ref={resizingRef}
        >
          {eqOpen <= 0 && (
            <div
              className="absolute left-0 top-0 h-full w-2 bg-white z-[999] cursor-ew-resize"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            ></div>
          )}
          <AudioPlayerEqualizer audioRef={audioRef} />
        </div>
      </div>
    </div>
  );
};

export default MaximizePlayer;
