/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import LyricsIcon from "@/assets/icons/lyrics.svg";

import KaraokeAirFriendEtc from "@/components/MusicPlayer/KaraokeAirFriendEtc";
import VolumeSettingDownRepeat from "@/components/MusicPlayer/VolumeSettingDownRepeat";
import { formatTime } from "@/utils/FormatTime";
import { DropDownBtn } from "@/components/MusicPlayer/DropDownBtn";
import {
  PlusCircleIcon,
  HeartIcon,
  ShareIcon,
  CircleStackIcon,
  UserCircleIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";

import AudioControls from "./components/AudioControls";
import RepeatActionButton from "./components/RepeatActionButton";
import PlayButtons from "./components/PlayButtons";
import MusicControls from "../MusicPlayer/MusicControls";
import Volumn from "../MusicPlayer/Volumn";
import axios from "axios";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import Link from "next/link";

// import { tracks } from "@/app/(withCommonLayout)/music/page";

interface AudioPlayerProps {
  onAudioContextReady: (
    audioContext: AudioContext,
    audioElement: HTMLAudioElement
  ) => void;
  id?: any;
  handleNext: any;
  currentSong?: any;
  handleOpenEqualizer: any;
  handlePrev: any;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  onAudioContextReady,
  id,
  currentSong: songData,
  handleOpenEqualizer,
  handleNext,
  handlePrev,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [played, setPlayed] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [karaokeOn, setKaraokeOn] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null
  );

  const [currentSong, setCurrentSong] = useState<any>(songData);

  useEffect(() => {
    const volume = localStorage.getItem("volume");
    if (!volume) {
      localStorage.setItem("volume", "0.8");
      setVolume(0.8);
    }
    if (volume) {
      setVolume(parseFloat(volume));
    }
    setCurrentSong(songData);
  }, [currentSong, songData]);
  // Main Song
  const {
    songName,
    songLink,
    artwork,
    songArtist,
    songAlbum,
    _id: songId,
  } = currentSong;

  useEffect(() => {
    const handleInteraction = () => {
      if (!audioContextRef.current) {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;
        onAudioContextReady(audioContext, audioRef.current as HTMLAudioElement);
      } else if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
    };

    document.addEventListener("click", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
    };
  }, [onAudioContextReady]);

  // console.log(volume);
  // console.log(currentSong);

  const handlePlayPause = () => {
    if (playing) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setPlaying(!playing);
  };

  // devJibon
  // handle palyback Speed
  const handlePlaybackSpeed = (speed: number) => {
    if (playbackSpeed === 1) {
      setPlaybackSpeed(1.5);
    } else if (playbackSpeed === 1.5) {
      setPlaybackSpeed(2);
    } else if (playbackSpeed === 2) {
      setPlaybackSpeed(0.25);
    } else if (playbackSpeed === 0.25) {
      setPlaybackSpeed(0.5);
    } else if (playbackSpeed === 0.75) {
      setPlaybackSpeed(0.5);
    } else {
      setPlaybackSpeed(1);
    }
  };
  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    localStorage.setItem("volume", JSON.stringify(newVolume));
    const oldVolume = localStorage.getItem("volume");
    if (oldVolume) {
      setVolume(parseFloat(oldVolume));
    }
  };

  // handle Mute
  const handleMute = () => {
    const getVolume = localStorage.getItem("volume");
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(getVolume ? parseFloat(getVolume) : 0.8);
    }
  };

  const handleProgress = (currentTime: number, duration: number) => {
    // Calculate the played percentage and set it
    const playedPercentage = duration ? currentTime / duration : 0;
    setPlayed(playedPercentage);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleEnded = () => {
    const audioElement = audioRef.current;

    if (audioElement) {
      if (repeat) {
        audioElement.currentTime = 0; // Restart the track
        audioElement.play(); // Play the track again
      } else {
        // You can handle what happens when the track ends and repeat is not enabled (e.g., stop playback)
        audioElement.pause(); // Pause the track
      }
    }
  };

  const handlePreviousTenSecond = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
  };

  const handleNextTenSecond = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        duration
      );
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const handleAddtoPlayList = async () => {
    const user = JSON.parse(localStorage?.getItem("user")!);
    const userId = user?._id;
    const playListData = {
      id: songId,
      userId: userId,
    };

    toast("Please wait, adding to playlist... ", {
      duration: 1000,
    });
    await axios
      .put(
        `https://music-app-web.vercel.app/api/v1/songs/play-list/${songId}/${userId}`,
        playListData
      )
      .then((res) => {
        if (res.data)
          toast(
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={artwork} // Replace this with the image URL
                alt={songName}
                style={{
                  width: "40px", // Adjust the size as needed
                  height: "40px",
                  borderRadius: "8px",
                  marginRight: "8px",
                }}
              />
              <div>
                <div style={{ fontWeight: "bold" }}>Playlist Added</div>
                <div>{`${songName}, ${songAlbum?.albumName}`}</div>
              </div>
            </div>,
            {
              action: {
                label: "Undo",
                onClick: () => console.log(),
              },
            }
          );
      });
  };

  const threeDotContent = (
    <div className="font-bold select-none px-[16px] py-[24px] flex flex-col gap-[24px]">
      <h2
        onClick={handleAddtoPlayList}
        className="flex cursor-pointer justify-start items-center gap-2"
      >
        <PlusCircleIcon className="h-6 w-6" />
        <span>Add to playlist</span>
      </h2>
      <h2 className="flex cursor-pointer justify-start items-center gap-2">
        <HeartIcon className="h-6 w-6" />
        <span>Add to favorites</span>
      </h2>
      <h2 className="flex cursor-pointer justify-start items-center gap-2">
        <ShareIcon className="h-6 w-6" />
        <span>Share</span>
      </h2>
      <h2 className="flex cursor-pointer justify-start items-center gap-2">
        <CircleStackIcon className="h-6 w-6" />
        <span>Go album</span>
      </h2>
      <h2 className="flex cursor-pointer justify-start items-center gap-2">
        <UserCircleIcon className="h-6 w-6" />
        <span>Go artist</span>
      </h2>
      <h2 className="flex cursor-pointer justify-start items-center gap-2">
        <MusicalNoteIcon className="h-6 w-6" />
        <span>Song credit</span>
      </h2>
    </div>
  );

  return (
    <div className="audio-controls relative">
      <Toaster position="top-right" />
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dse4w3es9/image/upload/v1723971237/i7vujjbuvidfqpmoqfpz.png)`,
        }}
      >
        {/* Dropdown section */}
        <div className="absolute p-4 xl:p-[120px] right-0 text-white">
          <DropDownBtn
            dropDownContent={threeDotContent}
            buttonContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            }
          />
        </div>
        <div className="flex flex-col justify-end h-full bg-black bg-opacity-10 gap-2 lg:gap-[24px] md:p-10 p-4  xl:px-[120px]">
          <div className="w-full flex justify-between items-center px-4 md:mb-4">
            <div className="text-white flex items-center gap-2">
              <img
                // style={{ width: "auto", height: "auto" }}
                src={artwork}
                alt="Album Art"
                // height={80}
                // width={80}
                className="w-10 h-10 md:h-16 md:w-24"
              />
              <div>
                <h2 className="text-white text-base md:text-xl gap-2 font-semibold mb-1">
                  {songName}
                </h2>
                <div className="flex lg:items-center max-lg:flex-col flex-wrap ">
                  <p>{songArtist}</p>
                  <div className="flex items-center max-md:hidden gap-2">
                    <div className="size-2 bg-white rounded-full ml-2"></div>
                    <p>
                      Album:{" "}
                      <Link href={"#"} className="underline">
                        {songAlbum.albumName}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden xl:block">
              <PlayButtons
                handleNext={handleNext}
                handleNextTenSecond={handleNextTenSecond}
                handlePlayPause={handlePlayPause}
                handlePreviousTenSecond={handlePreviousTenSecond}
                handlePrev={handlePrev}
                playing={playing}
              />
            </div>

            {/* repeat button component */}

            <RepeatActionButton
              toggleRepeat={toggleRepeat}
              src={LyricsIcon.src}
              repeat={repeat}
            />
          </div>

          <AudioControls
            volume={volume}
            ref={audioRef}
            src={songLink}
            playbackRate={playbackSpeed}
            onTimeUpdate={() => {
              const currentTime = audioRef.current?.currentTime || 0;
              const duration = audioRef.current?.duration || 0;
              handleProgress(currentTime, duration);
              setCurrentTime(currentTime);
            }}
            autoPlay={playing}
            onLoadedMetadata={() => {
              setDuration(audioRef.current?.duration || 0);
            }}
            onEnded={handleEnded}
          />

          <div className="w-full flex items-center">
            <input
              type="range"
              step="0.01"
              className="w-full mx-2 accent-white"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between gap-3 items-center px-3">
              <span className="text-white text-sm">
                {formatTime(currentTime)}
              </span>
              <span className="text-white text-sm">{formatTime(duration)}</span>
            </div>
          </div>
          <div className="flex w-full xl:hidden">
            <PlayButtons
              handleNext={handleNext}
              handleNextTenSecond={handleNextTenSecond}
              handlePlayPause={handlePlayPause}
              handlePreviousTenSecond={handlePreviousTenSecond}
              handlePrev={handlePrev}
              playing={playing}
            />
          </div>

          <div className="flex justify-between items-center">
            <KaraokeAirFriendEtc
              handleOpenEqualizer={handleOpenEqualizer}
              karaokeOn={karaokeOn}
              SetKaraokeOn={setKaraokeOn}
            />
            <VolumeSettingDownRepeat
              handlePlaybackSpeed={handlePlaybackSpeed}
              playbackSpeed={playbackSpeed}
              volume={volume}
              handleVolumeChange={handleVolumeChange}
              handleMute={handleMute}
            />
          </div>
          <div className="md:hidden flex justify-between">
            <Volumn
              handleMute={handleMute}
              handleVolumeChange={handleVolumeChange}
              volume={volume}
            />
            <MusicControls handleOpenEqualizer={handleOpenEqualizer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
