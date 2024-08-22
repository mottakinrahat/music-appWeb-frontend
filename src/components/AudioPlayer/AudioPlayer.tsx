"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { FaPlay, FaPause } from "react-icons/fa";
import RepeatIcon from "@/assets/icons/repeat.svg";
import LyricsIcon from "@/assets/icons/lyrics.svg";
import SkipNextIcon from "@/assets/icons/skip_next.svg";
import SkipPreviousIcon from "@/assets/icons/skip_previous.svg";
import PreviousIcon from "@/assets/icons/arrow_back (1).svg";
import NextIcon from "@/assets/icons/arrow_back.svg";
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
import {
  MdOutlineSkipNext,
  MdOutlineSkipPrevious,
  MdPauseCircle,
} from "react-icons/md";
import { IoMdPlayCircle } from "react-icons/io";
import AudioControls from "./components/AudioControls";
import RepeatActionButton from "./components/RepeatActionButton";
// import { tracks } from "@/app/(withCommonLayout)/music/page";

interface AudioPlayerProps {
  onAudioContextReady: (
    audioContext: AudioContext,
    audioElement: HTMLAudioElement
  ) => void;
  id: any;
  currentSong?: any;
  handleOpenEqualizer: any;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  onAudioContextReady,
  id,
  currentSong,
  handleOpenEqualizer,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [played, setPlayed] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [karaokeOn, setKaraokeOn] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null
  );

  const { title, url, artwork, artist, album } = currentSong;

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

  // console.log(currentSong);

  const handlePlayPause = () => {
    if (playing) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setPlaying(!playing);
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
  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const threeDotContent = (
    <div className="font-bold px-[16px] py-[24px] flex flex-col gap-[24px]">
      <h2 className="flex justify-start items-center gap-2">
        <PlusCircleIcon className="h-6 w-6" />
        <span>Add to playlist</span>
      </h2>
      <h2 className="flex justify-start items-center gap-2">
        <HeartIcon className="h-6 w-6" />
        <span>Add to favorites</span>
      </h2>
      <h2 className="flex justify-start items-center gap-2">
        <ShareIcon className="h-6 w-6" />
        <span>Share</span>
      </h2>
      <h2 className="flex justify-start items-center gap-2">
        <CircleStackIcon className="h-6 w-6" />
        <span>Go album</span>
      </h2>
      <h2 className="flex justify-start items-center gap-2">
        <UserCircleIcon className="h-6 w-6" />
        <span>Go artist</span>
      </h2>
      <h2 className="flex justify-start items-center gap-2">
        <MusicalNoteIcon className="h-6 w-6" />
        <span>Song credit</span>
      </h2>
    </div>
  );

  return (
    <div className="audio-controls relative">
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${artwork})` }}
      >
        {/* Dropdown section */}
        <div className="absolute p-[120px] right-0 text-white">
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
        <div className="flex flex-col justify-end pb-[82px] h-full bg-black bg-opacity-10 gap-[24px] px-[120px]">
          <div className="w-full flex justify-between items-center px-4 mb-4">
            <div className="text-white flex items-center gap-2">
              <Image
                priority
                style={{ width: "auto", height: "auto" }}
                src={artwork}
                alt="Album Art"
                height={80}
                width={80}
              />
              <div>
                <h2 className="text-white text-xl font-semibold mb-1">
                  {title}
                </h2>
                <div className="flex items-center gap-2">
                  <p>{artist}</p>
                  <span className="size-2 bg-white rounded-xl"></span>
                  <p>Album: {album}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={handlePreviousTenSecond}
                className="text-white text-3xl mx-2 hover:text-gray-300 flex items-center gap-1"
              >
                <Image
                  width={100}
                  height={100}
                  style={{ width: "auto", height: "auto" }}
                  src={PreviousIcon.src}
                  alt="PreviousIcon"
                />{" "}
                <span className="text-[16px]">10s</span>
              </button>
              <button className="text-white text-lg hover:text-gray-300">
                <MdOutlineSkipPrevious className="h-7 w-7" />
              </button>
              <button
                onClick={handlePlayPause}
                className="text-white text-lg  flex items-center justify-center mx-2 hover:text-gray-300"
              >
                {playing ? (
                  <MdPauseCircle className="h-10 w-10" />
                ) : (
                  <IoMdPlayCircle className="h-10 w-10" />
                )}
              </button>
              <button className="text-white text-lg hover:text-gray-300">
                <MdOutlineSkipNext className="h-7 w-7" />
              </button>
              <button
                onClick={handleNextTenSecond}
                className="text-white text-3xl mx-2 hover:text-gray-300 flex items-center gap-1"
              >
                <span className="text-[16px]">10s</span>{" "}
                <Image
                  width={100}
                  height={100}
                  style={{ width: "auto", height: "auto" }}
                  src={NextIcon.src}
                  alt="NextIcon"
                />
              </button>
            </div>

            {/* repeat button component */}

            <RepeatActionButton
              toggleRepeat={toggleRepeat}
              src={LyricsIcon.src}
              repeat={repeat}
            />

            {/* <div>
              <button className="text-white text-3xl mx-2 hover:text-gray-300">
                <div className="flex justify-start items-center gap-[24px]">
                  <Image
                    width={100}
                    height={100}
                    style={{ width: "auto", height: "auto" }}
                    src={LyricsIcon.src}
                    alt="LyricsIcon"
                  />
                  <div onClick={toggleRepeat}>
                    {repeat ? (
                      <Image
                        width={100}
                        height={100}
                        style={{ width: "auto", height: "auto" }}
                        src={RepeatIcon.src}
                        alt="RepeatIcon"
                      />
                    ) : (
                      <Image
                        width={100}
                        height={100}
                        style={{ width: "auto", height: "auto" }}
                        src={RepeatIcon.src}
                        className="bg-red-200 h-4 w-4"
                        alt="RepeatIcon"
                      />
                    )}
                  </div>
                </div>
              </button>
            </div> */}
          </div>

          <AudioControls
            ref={audioRef}
            src={url}
            onTimeUpdate={() => {
              const currentTime = audioRef.current?.currentTime || 0;
              const duration = audioRef.current?.duration || 0;
              handleProgress(currentTime, duration);
              setCurrentTime(currentTime);
            }}
            autoPlay={true}
            onLoadedMetadata={() => {
              setDuration(audioRef.current?.duration || 0);
            }}
            onEnded={handleEnded}
          />

          {/* <audio
            ref={audioRef}
            src="/aud.mp3"
            onTimeUpdate={() => {
              const currentTime = audioRef.current?.currentTime || 0;
              const duration = audioRef.current?.duration || 0;
              handleProgress(currentTime, duration);
              setCurrentTime(currentTime);
            }}
            autoPlay={true}
            onLoadedMetadata={() => {
              setDuration(audioRef.current?.duration || 0);
            }}
            onEnded={handleEnded}
          >
            Your browser does not support the audio element.
          </audio> */}

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

          <div className="flex justify-between items-center">
            <KaraokeAirFriendEtc
              handleOpenEqualizer={handleOpenEqualizer}
              karaokeOn={karaokeOn}
              SetKaraokeOn={setKaraokeOn}
            />
            <VolumeSettingDownRepeat
              volume={volume}
              handleVolumeChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
