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
import ShowLyricsIcon from "@/components/AudioPlayer/components/PlayLIstIcon";
import RepeatShuffleButton from "@/components/AudioPlayer/components/ReapetShuffleButton";
import { Slider } from "@/components/ui/slider";
import { initDB } from "@/utils/initDB";
import SongMarquee from "@/components/AudioPlayer/components/SongMarquee";
import { useAudio } from "@/lib/AudioProvider";

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

const PlayOfflinePage: React.FC = () => {
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

  // const audioRef = useRef<HTMLAudioElement | null>(null);
  const { audioRef } = useAudio();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const ids = await getAllSongIds();

        if (ids && ids.length > 0) {
          setSongIds(ids);
          const currentIndex = 0; // Start with the first song
          setCurrentSongIndex(currentIndex);

          const songId = ids[currentIndex];
          const song = await retrieveSongFromIndexedDB(songId);
          if (song) {
            setAudioUrl(song.url);
            setSongName(song.name);
            setArtwork(song.artwork);
            setSongAlbum(song.album);
            setSongArtist(song.songAritst);
          }
        } else {
          console.error("No songs found.");
          setSongIds([]);
        }
      } catch (error) {
        console.error("An error occurred while fetching song IDs:", error);
        setSongIds([]);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setPlaying(true);
    }
  }, [audioRef, audioUrl]);

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
  }, [audioRef, audioUrl]);

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
    const newTime = value[0];

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div
      className="flex flex-col select-none lg:gap-[10px] md:p-10 p-4 xl:px-[120px] h-screen min-h-screen overflow-hidden justify-end pb-10 w-full bg-cover bg-center transition-background-image duration-1000"
      style={{
        backgroundImage: `url(${
          artwork
            ? artwork
            : "https://res.cloudinary.com/dse4w3es9/image/upload/v1723971237/i7vujjbuvidfqpmoqfpz.png"
        })`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-40"></div>
      <div className="relative flex justify-between gap-2 ">
        <div className="text-white flex flex-col lg:flex-row items-center mb-4 gap-4 lg:gap-8">
          <Image
            src={artwork ? artwork : placeHolder.src}
            alt="song"
            width={50}
            height={50}
            className="object-cover rounded-lg"
          />
          <div className="text-center lg:text-left">
            <h2 className="text-white text-base md:text-xl font-semibold mb-1 lg:text-xl sm:text-2xl">
              <SongMarquee songName={songName} />
            </h2>
            <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2">
              <p>{songArtist}</p>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full ml-2"></div>
                <p>
                  Album:{" "}
                  <a href="#" className="underline">
                    {songAlbum || "Unknown Album"}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:flex mb-8 mr-16">
          <div className="flex absolute left-1/2 top-4 -translate-x-1/2 justify-center items-center gap-4">
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
              />
              <span className="text-xs hidden group-hover:inline">10s</span>
            </button>
            <button
              onClick={handlePrev}
              className="text-white group text-3xl mx-2 transition hover:text-gray-300"
            >
              <MdOutlineSkipPrevious />
            </button>
            <button
              onClick={handlePlayPause}
              className="text-white text-5xl mx-2 transition hover:text-gray-300"
            >
              {playing ? (
                <MdPauseCircle className="text-3xl" />
              ) : (
                <IoMdPlayCircle className="text-3xl" />
              )}
            </button>
            <button
              onClick={handleNext}
              className="text-white group text-3xl mx-2 transition hover:text-gray-300"
            >
              <MdOutlineSkipNext />
            </button>
            <button
              onClick={handleNextTenSecond}
              className="text-white group text-3xl mx-2 transition hover:text-gray-300 flex items-center gap-1"
            >
              <Image
                width={100}
                height={100}
                style={{ width: "auto", height: "auto" }}
                src={NextIcon.src}
                alt="NextIcon"
                className="group-hover:opacity-70"
              />
              <span className="text-xs hidden group-hover:inline">10s</span>
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 mb-4 text-white">
          <ShowLyricsIcon className="text-3xl cursor-pointer" />
          <RepeatShuffleButton className="text-3xl" />
        </div>
      </div>

      <div className="relative">
        <audio
          ref={audioRef}
          controls
          className="w-full hidden"
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration);
            }
          }}
        >
          Your browser does not support the <code>audio</code> element.
        </audio>

        <div className="flex justify-between items-center mt-4">
          <Slider
            defaultValue={[currentTime]}
            max={duration}
            min={0}
            value={[currentTime]}
            onValueChange={handleSeek}
            className="flex-grow"
          />
        </div>
        <div className="text-white text-sm mt-4 w-full flex justify-between">
          <p>
            {Math.floor(currentTime / 60)}:
            {Math.floor(currentTime % 60)
              .toString()
              .padStart(2, "0")}
          </p>
          <p>
            {Math.floor(duration / 60)}:
            {Math.floor(duration % 60)
              .toString()
              .padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayOfflinePage;
