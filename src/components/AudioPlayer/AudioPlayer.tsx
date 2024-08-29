/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import placeHolder from "@/assets/etc/png/song.jpg";
import LyricsIcon from "@/assets/icons/lyrics.svg";

import { formatTime } from "@/utils/FormatTime";

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
import MusicControls from "./components/MusicControls";
import Volumn from "./components/Volumn";
import axios from "axios";
import { toast } from "sonner";
// import { Toaster } from "../ui/sonner";
import Link from "next/link";
import ShareCard from "../Card/ShareCard";
import { usePathname, useRouter } from "next/navigation";
import MiniPlayer from "./MiniPlayer";
import { Slider } from "../ui/slider";
import VolumeSettingDownRepeat from "./components/VolumeSettingDownRepeat";
import KaraokeAirFriendEtc from "./components/KaraokeAirFriendEtc";
import { DropDownBtn } from "./components/DropDownBtn";

// import { tracks } from "@/app/(withCommonLayout)/music/page";

interface AudioPlayerProps {
  onAudioContextReady: (
    audioContext: AudioContext,
    audioElement: HTMLAudioElement
  ) => void;
  id?: any;
  handleNext: () => void;
  currentSong?: any;
  handleOpenEqualizer: () => void;
  handlePrev: () => void;
  play: boolean;
  handleOpenPlayList: () => void;
  handleRandom: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  onAudioContextReady,
  id,
  currentSong: songData,
  handleOpenEqualizer,
  handleNext,
  handlePrev,
  play,
  handleOpenPlayList,
  handleRandom,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [repeat, setRepeat] = useState<any>("repeat-all");
  const [playing, setPlaying] = useState<boolean>(play);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [played, setPlayed] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [playbackSpeed, setPlaybackSpeed] = useState<any>(1);
  const [karaokeOn, setKaraokeOn] = useState<boolean>(false);

  // const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
  //   null
  // );

  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState<boolean>(false);

  useEffect(() => {
    // Show the player only if the path matches `/music/:id`
    if (pathname.startsWith("/music/")) {
      setShowPlayer(true);
    } else {
      setShowPlayer(false);
    }
  }, [pathname]);

  const [currentSong, setCurrentSong] = useState<any>(songData);
  const [share, setShare] = useState<boolean>(false);

  const speed = localStorage.getItem("speed");
  useEffect(() => {
    if (!speed) {
      localStorage.setItem("speed", "1");
      setPlaybackSpeed(1);
    }

    if (speed) {
      setPlaybackSpeed(parseFloat(speed));
    }

    const volume = localStorage.getItem("volume");
    if (!volume) {
      localStorage.setItem("volume", "0.8");
      setVolume(0.8);
    }
    if (volume) {
      setVolume(parseFloat(volume));
    }
    setCurrentSong(songData);
    const getRepeat = localStorage.getItem("repeat");
    if (!getRepeat) {
      localStorage.setItem("repeat", repeat);
    }
    if (volume) {
      setRepeat(getRepeat);
    }
  }, [currentSong, repeat, songData, speed, volume]);
  // Main Song
  const {
    songName,
    songLink,
    artwork,
    songArtist,
    songAlbum,
    _id: songId,
  } = currentSong;
  const router = useRouter();
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

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    localStorage.setItem("volume", JSON.stringify(newVolume));
    const oldVolume = localStorage.getItem("volume");
    if (oldVolume) {
      setVolume(parseFloat(oldVolume));
    }
  };

  // handle Mute
  const handleMute = () => {
    const getVolume = localStorage.getItem("volume");

    if (parseFloat(getVolume!) > 0) {
      localStorage.setItem("previousVolume", volume.toString());
      localStorage.setItem("volume", (0).toString());
      setVolume(0);
    } else {
      const previousVolume = localStorage.getItem("previousVolume");
      localStorage.setItem("volume", previousVolume!);

      setVolume(parseFloat(previousVolume!));
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
    if (repeat === "repeat-all") {
      handleNext();
    } else if (repeat === "repeat-one") {
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
    } else if (repeat === "repeat-off") {
      handleRandom();
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

  const handleSeek = (value: number[]) => {
    const newTime = value[0]; // Get the first (and only) value from the array

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  //  repeat toggle
  const toggleRepeat = () => {
    if (repeat === "repeat-all") {
      setRepeat("repeat-one");
      localStorage.setItem("repeat", "repeat-one");
    } else if (repeat === "repeat-one") {
      setRepeat("repeat-off");
      localStorage.setItem("repeat", "repeat-off");
    } else if (repeat === "repeat-off") {
      setRepeat("repeat-all");
      localStorage.setItem("repeat", "repeat-all");
    }
  };

  // handle playlist add
  const handleAddtoPlayList = async () => {
    const user = JSON.parse(localStorage?.getItem("user")!);
    const userId = user?._id;
    const playListData = {
      id: songId,
      userId: userId,
    };
    if (!userId) {
      toast("please login first");
      router.push("/login");
    }
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
                src={artwork ? artwork : placeHolder.src} // Replace this with the image URL
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
            </div>
          );
      })
      .catch((err) => {
        if (err) {
          toast.error("Failed to add to playlist");
        }
      });
  };

  // Three dot menu operations

  const handleAddtoFavourite = async () => {
    const user = JSON.parse(localStorage?.getItem("user")!);
    const userId = user?._id;
    const playListData = {
      id: songId,
      userId: userId,
    };
    if (!userId) {
      toast("please login first");
      router.push("/login");
    }
    toast("Please wait, adding to favorites... ", {
      duration: 1000,
    });
    await axios
      .put(
        `https://music-app-web.vercel.app/api/v1/favourite/${songId}/${userId}`,
        playListData
      )
      .then((res) => {
        if (res.data)
          toast(
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={artwork ? artwork : placeHolder.src} // Replace this with the image URL
                alt={songName}
                style={{
                  width: "40px", // Adjust the size as needed
                  height: "40px",
                  borderRadius: "8px",
                  marginRight: "8px",
                }}
              />
              <div>
                <div style={{ fontWeight: "bold" }}>Favorites Added</div>
                <div>{`${songName}, ${songAlbum?.albumName}`}</div>
              </div>
            </div>
          );
      })
      .catch((err) => {
        if (err) {
          toast.error("Failed to add to playlist");
        }
      });
  };

  const threeDotContent = (
    <div className="font-bold text-textSecondary w-52  select-none px-[16px] py-[24px] flex flex-col gap-[24px]">
      <h2
        onClick={handleAddtoPlayList}
        className="flex hover:text-textPrimary transition cursor-pointer justify-start items-center gap-2"
      >
        <PlusCircleIcon className="h-6 w-6" />
        <span>Add to playlist</span>
      </h2>
      <h2
        onClick={handleAddtoFavourite}
        className="flex hover:text-textPrimary transition cursor-pointer justify-start items-center gap-2"
      >
        <HeartIcon className="h-6 w-6" />
        <span>Add to favorites</span>
      </h2>
      <h2
        onClick={() => setShare(!share)}
        className="flex hover:text-textPrimary transition cursor-pointer justify-start items-center gap-2"
      >
        <ShareIcon className="h-6 w-6" />
        <span>Share</span>
      </h2>
      <h2 className="flex hover:text-textPrimary transition cursor-pointer justify-start items-center gap-2">
        <CircleStackIcon className="h-6 w-6" />
        <span>Go album</span>
      </h2>
      <h2 className="flex hover:text-textPrimary transition cursor-pointer justify-start items-center gap-2">
        <UserCircleIcon className="h-6 w-6" />
        <span>Go artist</span>
      </h2>
      <h2 className="flex hover:text-textPrimary transition cursor-pointer justify-start items-center gap-2">
        <MusicalNoteIcon className="h-6 w-6" />
        <span>Song credit</span>
      </h2>
    </div>
  );

  return (
    <div className="audio-controls relative">
      <ShareCard
        open={share}
        setOpen={setShare}
        shareUrl={`https://music-web-liangu.vercel.app//music/66c99c0a36fe71b995557d6b`}
      />
      <div className="absolute top-0 w-full ">
        <MiniPlayer
          currentTime={currentTime}
          duration={duration}
          handleSeek={handleSeek}
          handleNext={handleNext}
          handleNextTenSecond={handleNextTenSecond}
          handlePlayPause={handlePlayPause}
          handlePreviousTenSecond={handlePreviousTenSecond}
          handlePrev={handlePrev}
          playing={playing}
          handleVolumeChange={handleVolumeChange}
          album={currentSong.songAlbum.albumName}
          artist={currentSong.songArtist}
          artwork={currentSong.artwork}
          handleMute={handleMute}
          id={currentSong?._id}
          title={currentSong.songName}
          volume={volume}
        />
      </div>
      <div
        className={`${
          !showPlayer ? "hidden" : "w-full h-screen  bg-cover bg-center"
        } `}
      >
        {/* Dropdown section */}
        <div
          className={`${
            !showPlayer
              ? "hidden"
              : "absolute p-4 xl:py-16 xl:px-[120px] right-0 top-16 text-white"
          } `}
        >
          <DropDownBtn
            dropDownContent={threeDotContent}
            buttonContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                strokeWidth={1.5}
                stroke="white"
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
        <div className="flex flex-col justify-end h-full gap-2 lg:gap-[24px] md:p-10 p-4  xl:px-[120px]">
          <div className="w-full flex justify-between items-center px-4 md:mb-4">
            <div className="text-white flex items-center gap-2">
              <img
                // style={{ width: "auto", height: "auto" }}
                src={artwork ? artwork : placeHolder.src}
                alt="Album Art"
                // height={80}
                // width={80}
                className="w-10 h-10 md:h-16 md:w-16 rounded-lg object-cover"
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
              handlePlayListOpen={handleOpenPlayList}
              handleAddToFavorites={handleAddtoFavourite}
              isfavorite={true}
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

          <div className="w-full cursor-pointer py-1 flex items-center">
            <Slider
              defaultValue={[currentTime]}
              max={duration}
              min={0}
              value={[currentTime]}
              onValueChange={handleSeek}
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
              songName={songName}
              songUrl={songLink}
              audioRef={audioRef}
              volume={volume}
              handleVolumeChange={handleVolumeChange}
              handleMute={handleMute}
            />
          </div>
          {/* <div className="md:hidden flex justify-between">
            <MusicControls handleOpenEqualizer={handleOpenEqualizer} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
