"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import ReactPlayer from "react-player";
import { FaPlay, FaPause } from "react-icons/fa";
import Image from "next/image";
import RepeatIcon from "../../../../assets/icons/repeat.svg";
import LyricsIcon from "../../../../assets/icons/lyrics.svg";
import SkipNextIcon from "../../../../assets/icons/skip_next.svg";
import SkipPreviousIcon from "../../../../assets/icons/skip_previous.svg";
import PauseIcon from "../../../../assets/icons/pauseIcon.svg";
import PreviousIcon from "../../../../assets/icons/arrow_back (1).svg";
import NextIcon from "../../../../assets/icons/arrow_back.svg";

import { tracks } from "../page"; // Adjust path as necessary
import { useRouter } from "next/navigation";
import KaraokeAirFriendEtc from "@/component/MusicPlayer/KaraokeAirFriendEtc";
import VolumeSettingDownRepeat from "@/component/MusicPlayer/VolumeSettingDownRepeat";
import { formatTime } from "@/utils/FormatTime";
import { DropDownBtn } from "@/component/MusicPlayer/DropDownBtn";
import {
  PlusCircleIcon,
  HeartIcon,
  ShareIcon,
  CircleStackIcon,
  UserCircleIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import LoadingAnimation from "@/component/LoadingAnimation/LoadingAnimation";

// Define types for track
interface Track {
  id: number;
  title: string;
  url: string;
  artwork: string;
  artist: string;
  album: string;
}

// Define props for the MusicPlayer component
interface MusicPlayerProps {
  params: {
    id: string;
  };
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ params }) => {
  const [playing, setPlaying] = useState<boolean>(true); // Start playing automatically
  const [duration, setDuration] = useState<number>(0);
  const [played, setPlayed] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [karaokeOn, setKaraokeOn] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null
  );
  const [repeat, setRepeat] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer | null>(null);

  const [context, setContext] = useState<AudioContext | null>(null);
  const [filterNode, setFilterNode] = useState<BiquadFilterNode | null>(null);

  const [tracks, setTraks] = useState([]);
  useEffect(() => {
    fetch("/tracks.json")
      .then((data) => data.json())
      .then((tracks) => setTraks(tracks));
  }, []);

  useEffect(() => {
    // Initialize the AudioContext
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    setContext(audioContext);

    // Cleanup function
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  useEffect(() => {
    if (context && playerRef.current) {
      // Ensure the media element is ready
      const mediaElement =
        playerRef.current.getInternalPlayer() as HTMLMediaElement;

      if (mediaElement && mediaElement instanceof HTMLMediaElement) {
        console.log("Media element:", mediaElement); // Debug: Check the media element

        // Create a MediaElementAudioSourceNode
        const source = context.createMediaElementSource(mediaElement);

        // Create a BiquadFilterNode for frequency manipulation
        const filter = context.createBiquadFilter();
        setFilterNode(filter);

        // Set filter type to 'lowpass' (or 'highpass', 'bandpass', etc. based on your needs)
        filter.type = "lowpass";
        filter.frequency.value = 1000; // Set the initial frequency

        // Connect the source node to the filter node and then to the context's destination
        source.connect(filter);
        filter.connect(context.destination);

        // Cleanup function
        return () => {
          if (source) source.disconnect();
          if (filter) filter.disconnect();
        };
      } else {
        console.error("The media element is not valid.");
      }
    }
  }, [context]);

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    if (filterNode) {
      filterNode.frequency.value = value;
    }
  };

  // Extract ID from params
  const id = parseInt(params.id);
  const router = useRouter();

  useEffect(() => {
    // Find the track based on the ID
    const initialTrackIndex = tracks.findIndex((track) => track.id === id);
    if (initialTrackIndex !== -1) {
      setCurrentTrackIndex(initialTrackIndex);
    }
  }, [id, tracks]);

  useEffect(() => {
    if (currentTrackIndex !== null) {
      setPlaying(true);
      // router.push(`/music/${tracks[currentTrackIndex].id}`);
    }
  }, [currentTrackIndex]);

  // Get current song details
  const currentSong = tracks[currentTrackIndex as number];
  if (!currentSong) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    ); // Optionally handle loading state
  }

  const { title, url, artwork, artist, album } = currentSong;

  const handlePlayPause = () => {
    if (repeat && !playing) {
      setPlaying(true);
    } else {
      setPlaying(!playing);
    }
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleEnded = () => {
    if (repeat) {
      playerRef.current?.seekTo(0);
      setPlaying(true);
    } else if (
      currentTrackIndex !== null &&
      currentTrackIndex < tracks.length - 1
    ) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const handlePreviousTenSecond = () => {
    const newPlayed = Math.max(played - 0.04, 0); // Ensure new position is not negative
    setPlayed(newPlayed);
    playerRef.current?.seekTo(newPlayed);
  };

  const handleNextTenSecond = () => {
    const newPlayed = Math.min(played + 0.04, 1); // Ensure new position is not over 1
    setPlayed(newPlayed);
    playerRef.current?.seekTo(newPlayed);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    playerRef.current?.seekTo(newPlayed);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const goToNextSong = () => {
    if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const goToPreviousSong = () => {
    if (currentTrackIndex !== null && currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const threeDotContent = (
    <>
      <div className="font-bold px-[16px] py-[24px] flex flex-col gap-[24px]">
        <h2 className="flex justify-start items-center gap-2">
          <PlusCircleIcon className="h-6 w-6" />
          <span> Add to playlist</span>
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
    </>
  );

  return (
    <div>
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dse4w3es9/image/upload/v1723971237/i7vujjbuvidfqpmoqfpz.png)`,
        }}
      >
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
          {/* Song Title and Controls */}
          <div className="w-full flex justify-between items-center px-4 mb-4">
            <div className="text-white flex items-center gap-2">
              <Image src={artwork} alt="Album Art" height={80} width={80} />
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

            {/* Control Buttons */}
            <div className="flex items-center">
              <button
                onClick={handlePreviousTenSecond}
                className="text-white text-3xl mx-2 hover:text-gray-300 flex items-center gap-1"
              >
                <img src={PreviousIcon.src} alt="PreviousIcon" />{" "}
                <span className="text-[16px]">10s</span>
              </button>
              <button
                onClick={goToPreviousSong}
                className="text-white text-3xl mx-2 hover:text-gray-300"
              >
                <img src={SkipPreviousIcon.src} alt="SkipPreviousIcon" />
              </button>
              <button
                onClick={handlePlayPause}
                className="text-white text-3xl mx-2 hover:text-gray-300"
              >
                {playing ? (
                  <FaPause color="white" className="z-999 text-black h-4 w-4" />
                ) : (
                  <FaPlay color="white" className="z-999 text-black h-4 w-4" />
                )}
              </button>
              <button
                onClick={goToNextSong}
                className="text-white text-3xl mx-2 hover:text-gray-300"
              >
                <img src={SkipNextIcon.src} alt="SkipNextIcon" />
              </button>
              <button
                onClick={handleNextTenSecond}
                className="text-white text-3xl mx-2 hover:text-gray-300 flex items-center gap-1"
              >
                <span className="text-[16px]">10s</span>{" "}
                <img src={NextIcon.src} alt="NextIcon" />
              </button>
            </div>

            <div>
              <button className="text-white text-3xl mx-2 hover:text-gray-300">
                <div className="flex justify-start items-center gap-[24px]">
                  <img src={LyricsIcon.src} alt="LyricsIcon" />
                  <div onClick={toggleRepeat}>
                    {repeat ? (
                      <img src={RepeatIcon.src} alt="RepeatIcon" />
                    ) : (
                      <img
                        src={RepeatIcon.src}
                        className="bg-red-200 h-4 w-4"
                        alt="RepeatIcon"
                      />
                    )}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* React Player */}
          <ReactPlayer
            ref={playerRef}
            url={url} // Use the correct audio URL
            playing={playing} // Start playing automatically
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleEnded}
            volume={volume}
            width="0"
            height="0"
          />

          {/* Slider Line */}
          <div className="w-full flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={played}
              className="w-full mx-2 accent-white"
              onChange={handleSeek}
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between gap-3 items-center px-3">
              <span className="text-white text-sm">
                {formatTime(played * duration)}
              </span>
              <span className="text-white text-sm">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex !justify-between items-center">
            <KaraokeAirFriendEtc
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
      <input
        type="range"
        min="20"
        max="20000"
        step="10"
        onChange={handleFrequencyChange}
        title="Adjust Frequency"
        defaultValue="100"
      />
    </div>
  );
};

export default MusicPlayer;
