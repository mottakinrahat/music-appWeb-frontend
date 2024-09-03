"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import placeHolder from "@/assets/etc/png/song.jpg";
import { IoMdPlayCircle } from "react-icons/io";
import PreviousIcon from "@/assets/icons/arrow_back (1).svg";
import NextIcon from "@/assets/icons/arrow_back.svg";
import {
  MdOutlineSkipNext,
  MdOutlineSkipPrevious,
  MdPauseCircle,
} from "react-icons/md";
import { initDB } from "@/utils/initDB";
import Link from "next/link";
import SongMarquee from "@/components/AudioPlayer/components/SongMarquee";
import { Slider } from "@/components/ui/slider";
import { usePathname } from "next/navigation";

// Function to retrieve a song Blob from IndexedDB
const retrieveSongFromIndexedDB = async (id: string | number) => {
  try {
    const db = await initDB("OfflineDB", 6, "offlineSongs");
    const song = await db.get("offlineSongs", id);

    if (song && song.data) {
      const blob = song.data;
      const url = URL.createObjectURL(blob); // Create a URL for the Blob
      return {
        url,
        name: song.name,
        songAritst: song.songArtist,
        album: song.songAlbum.albumName,
        artwork: song.artwork,
      };
    } else {
      throw new Error("Song not found");
    }
  } catch (error) {
    console.error("Failed to retrieve the song:", error);
  }
};

// Function to get all song IDs from IndexedDB
const getAllSongIds = async () => {
  try {
    const db = await initDB("OfflineDB", 6, "offlineSongs");
    const allSongs = await db.getAll("offlineSongs");
    return allSongs.map((song) => song.id); // Return an array of song IDs
  } catch (error) {
    console.error("Failed to retrieve song IDs:", error);
  }
};

interface PlayOfflinePageProps {
  params: {
    songId: number | string;
  };
}

const PlayOfflinePage: React.FC<PlayOfflinePageProps> = ({ params }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [songName, setSongName] = useState<string | null>(null);
  const [artwork, setArtwork] = useState<string | null>(null);
  const [songAlbum, setSongAlbum] = useState<string | null>(null);
  const [songArtist, setSongArtist] = useState<string | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [songIds, setSongIds] = useState<number[] | string>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songId = params?.songId;

  useEffect(() => {
    const id = typeof songId === "string" ? parseInt(songId, 10) : songId;

    if (!id) {
      console.error("Invalid song ID.");
      return;
    }

    const fetchSong = async () => {
      const song = await retrieveSongFromIndexedDB(id);
      if (song) {
        setAudioUrl(song.url);
        setSongName(song.name);
        setArtwork(song.artwork);
        setSongAlbum(song.album);
        setSongArtist(song.songAritst);
      }
    };

    const fetchSongIds = async () => {
      try {
        const ids = await getAllSongIds();

        if (ids) {
          setSongIds(ids);
          const currentIndex = ids.indexOf(id);
          setCurrentSongIndex(currentIndex);
        } else {
          // Handle the case where ids is undefined
          console.error("Failed to retrieve song IDs.");
          setSongIds([]); // Optionally set an empty array or handle as needed
          setCurrentSongIndex(-1); // Optionally set to a default value if no song IDs are found
        }
      } catch (error) {
        console.error("An error occurred while fetching song IDs:", error);
        setSongIds([]);
        setCurrentSongIndex(-1);
      }
    };

    fetchSong();
    fetchSongIds();
  }, [songId]);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.play(); // Automatically play the song when URL changes
      setPlaying(true); // Set playing state to true
    }
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
        setDuration(audioRef.current?.duration || 0);
      };

      const audio = audioRef.current;
      audio.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleNext = async () => {
    if (songIds.length === 0) return;

    const nextIndex = (currentSongIndex + 1) % songIds.length;
    setCurrentSongIndex(nextIndex);

    const nextSongId = songIds[nextIndex];
    const song = await retrieveSongFromIndexedDB(nextSongId);
    if (song) {
      setAudioUrl(song.url);
      setSongName(song.name);
      setArtwork(song.artwork);
      setSongAlbum(song.album);
      setSongArtist(song.songAritst);
    }
  };

  const handlePrev = async () => {
    if (songIds.length === 0) return;

    const prevIndex = (currentSongIndex - 1 + songIds.length) % songIds.length;
    setCurrentSongIndex(prevIndex);

    const prevSongId = songIds[prevIndex];
    const song = await retrieveSongFromIndexedDB(prevSongId);
    if (song) {
      setAudioUrl(song.url);
      setSongName(song.name);
      setArtwork(song.artwork);
      setSongAlbum(song.album);
      setSongArtist(song.songAritst);
    }
  };

  const handleNextTenSecond = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const handlePreviousTenSecond = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0]; // Get the first (and only) value from the array

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    // Show the player only if the path matches `/music/:id`
    if (pathname.startsWith("/offline/")) {
      setShowPlayer(true);
      localStorage.setItem("songData", JSON.stringify({play: true, id: songId}));
    } else {
      setShowPlayer(false);
    }
  }, [pathname, showPlayer]);

  return (
    <div
      className="audio-controls relative  min-h-screen flex flex-col justify-center items-center p-4"
      style={{
        backgroundImage: `url(${
          artwork
            ? artwork
            : "https://res.cloudinary.com/dse4w3es9/image/upload/v1723971237/i7vujjbuvidfqpmoqfpz.png"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full flex flex-col items-center gap-4">
        <div className="text-white flex flex-row items-center mb-4  gap-8">
          <Image
            src={artwork ? artwork : placeHolder.src}
            alt="song"
            width={50}
            height={50}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <div className="text-center">
            <h2 className="text-white text-base md:text-xl gap-2 font-semibold mb-1 lg:text-2xl">
              <SongMarquee songName={songName} />
            </h2>
            <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2">
              <p>{songArtist}</p>
              <div className="flex items-center">
                <div className="size-2 bg-white rounded-full ml-2"></div>
                <p>
                  Album:{" "}
                  <Link href={"#"} className="underline">
                    {songAlbum || "Unknown Album"}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden xl:block mb-8">
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handlePreviousTenSecond}
              className="text-white group text-3xl mx-2 transition hover:text-gray-300 flex items-center gap-1"
            >
              <Image
                width={100}
                height={100}
                style={{ width: "auto", height: "auto" }}
                src={PreviousIcon.src}
                alt="PreviousIcon"
                className="group-hover:opacity-70"
              />{" "}
              <span className="text-[16px]">10s</span>
            </button>
            <button
              onClick={handlePrev}
              className={`text-lg ${"text-white transition hover:text-gray-300"}`}
            >
              <MdOutlineSkipPrevious className="h-7 w-7" />
            </button>
            <button
              onClick={handlePlayPause}
              className={`text-lg flex items-center justify-center mx-4 ${"text-white transition hover:text-gray-300"}`}
            >
              {playing ? (
                <MdPauseCircle className="h-10 w-10" />
              ) : (
                <IoMdPlayCircle className="h-10 w-10" />
              )}
            </button>
            <button
              onClick={handleNext}
              className={`text-lg ${"text-white transition hover:text-gray-300"}`}
            >
              <MdOutlineSkipNext className="h-7 w-7" />
            </button>
            <button
              onClick={handleNextTenSecond}
              className="text-white group text-3xl mx-2 transition hover:text-gray-300 flex items-center gap-1"
            >
              <span className="text-[16px]">10s</span>{" "}
              <Image
                width={100}
                height={100}
                style={{ width: "auto", height: "auto" }}
                src={NextIcon.src}
                alt="NextIcon"
                className="group-hover:opacity-70"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-4/5 lg:w-3/5 xl:w-2/5">
          <Slider
            defaultValue={[currentTime]}
            max={duration}
            min={0}
            value={[currentTime]}
            onValueChange={handleSeek}
          />
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default PlayOfflinePage;
