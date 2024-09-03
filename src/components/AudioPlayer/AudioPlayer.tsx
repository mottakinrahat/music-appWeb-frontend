/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import placeHolder from "@/assets/etc/png/song.jpg";
import LyricsIcon from "@/assets/icons/lyrics.svg";
import { formatTime } from "@/utils/FormatTime";
import AudioControls from "./components/AudioControls";
import RepeatActionButton from "./components/RepeatActionButton";
import PlayButtons from "./components/PlayButtons";
import MusicControls from "./components/MusicControls";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MiniPlayer from "./MiniPlayer";
import { Slider } from "../ui/slider";
import VolumeSettingDownRepeat from "./components/VolumeSettingDownRepeat";
import KaraokeAirFriendEtc from "./components/KaraokeAirFriendEtc";
import { DropDownBtn } from "./components/DropDownBtn";
import { openDB } from "idb";
import useLocalSongData from "@/hooks/useLocalSongData";
import { RepeatShuffleProps } from "./components/ReapetShuffleButton";
import SongMarquee from "./components/SongMarquee";
import { useDispatch, useSelector } from "react-redux";
import {
  pauseSong,
  PlayerState,
  playSong,
  toggleRepeat,
} from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";
import ThreeDotContent from "./components/ThreeDotContent";

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
  setCurrentSong: (value: any) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  onAudioContextReady,
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

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [played, setPlayed] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [playbackSpeed, setPlaybackSpeed] = useState<any>(1);
  const [karaokeOn, setKaraokeOn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();
  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<any>(songData);
  const userId = userData?._id;
  const [repeats, setRepeat] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const isFavourite = currentSong.favUsers.includes(userId);
    setFavorite(isFavourite);

    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, [currentSong.favUsers, userId]);

  useEffect(() => {
    // Show the player only if the path matches `/music/:id`
    if (pathname.startsWith("/music/")) {
      setShowPlayer(true);
    } else {
      setShowPlayer(false);
    }
  }, [pathname]);

  const dispatch = useDispatch();

  // Seclectors
  const playing = useSelector((state: RootState) => state.player.playing);
  const repeat = useSelector((state: RootState) => state.player.repeat);

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
  }, [currentSong, repeat, songData, speed, volume]);
  // Main Song

  const {
    songName,
    bpm,
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

  const repeatStateIndex = (repeatState: PlayerState["repeat"]) => {
    switch (repeatState) {
      case "repeat-all":
        return 0;
      case "repeat-one":
        return 1;
      case "repeat-off":
        return 2;
      case "shuffle":
        return 3;
      default:
        return 0;
    }
  };
  useEffect(() => {
    // Load initial state from localStorage
    // const storedRepeat = localStorage.getItem(
    //   "repeat"
    // ) as PlayerState["repeat"];
    // if (!storedRepeat) {
    //   localStorage.setItem("repeat", "repeat-all");
    // } else {
    //   dispatch(toggleRepeat());
    // }

    const storedRepeat = localStorage.getItem(
      "repeat"
    ) as PlayerState["repeat"];
    if (!storedRepeat) {
      localStorage.setItem("repeat", "repeat-all");
      dispatch({ type: "player/toggleRepeat" });
    } else {
      if (storedRepeat !== "repeat-all") {
        for (let i = 0; i < repeatStateIndex(storedRepeat); i++) {
          dispatch({ type: "player/toggleRepeat" });
        }
      }
    }
    const storedSongData = localStorage.getItem("songData");
    if (storedSongData) {
      const { play, id } = JSON.parse(storedSongData);
      if (play) {
        dispatch(playSong(id));
      } else {
        dispatch(pauseSong());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // Save state to localStorage whenever it changes
    if (playing && songId) {
      localStorage.setItem(
        "songData",
        JSON.stringify({ play: true, id: songId })
      );
    } else if (!playing && songId) {
      localStorage.setItem(
        "songData",
        JSON.stringify({ play: false, id: songId })
      );
    }

    localStorage.setItem("repeat", repeat); // Save repeat mode
  }, [playing, songId, repeat]);

  // handle play pause song
  const handlePlayPause = async () => {
    try {
      if (playing) {
        // Pause the song
        dispatch(pauseSong());

        // Save play state to localStorage
        localStorage.setItem(
          "songData",
          JSON.stringify({ play: false, id: songId })
        );
      } else {
        // Play the song
        const audioElement = document.querySelector(
          "audio"
        ) as HTMLAudioElement;
        if (audioElement) {
          await audioElement.play(); // Try to play the audio element
        }

        dispatch(playSong(songId));

        // Save play state to localStorage
        localStorage.setItem(
          "songData",
          JSON.stringify({ play: true, id: songId })
        );
      }
    } catch (error) {
      console.error("Playback failed:", error);
    }
  };

  // Handle Open lyrics

  const handleOpenLyrics = () => {
    alert("Open lyrics");
  };

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

  const handleEnd = () => {
    const audioElement = audioRef.current;

    if (repeat === "repeat-all") {
      handleNext();
    } else if (repeat === "repeat-one") {
      if (audioElement) {
        audioElement.currentTime = 0; // Restart the track
        audioElement.play(); // Play the track again
      }
    } else if (repeat === "repeat-off") {
      handleRandom();
    } else if (repeat === "shuffle") {
      handleRandom(); // Assuming shuffle mode should also trigger a random track
    }
    // dispatch(handleEnded({ audioRef, handleNext, handleRandom }));
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

  const toggleRepeat = () => {
    let newRepeat;
    if (repeat === "repeat-all") {
      newRepeat = "repeat-one";
    } else if (repeat === "repeat-one") {
      newRepeat = "repeat-off";
    } else if (repeat === "repeat-off") {
      newRepeat = "shuffle";
    } else {
      newRepeat = "repeat-all";
    }
    setRepeat(newRepeat);
    localStorage.setItem("repeat", newRepeat);
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
      toast.warning("Please login first!");
    } else {
      await axios
        .put(
          `https://music-app-web.vercel.app/api/v1/favourite/${songId}/${userId}`,
          playListData
        )
        .then((res) => {
          setFavorite((prev: boolean) => !prev);
          toast.success(
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
                {favorite ? (
                  <div style={{ fontWeight: "bold" }}>
                    Favorites Removed Successfully
                  </div>
                ) : (
                  <div style={{ fontWeight: "bold" }}>
                    Favorites Added Successfully
                  </div>
                )}
                <div>{`${songName}, ${songAlbum?.albumName}`}</div>
              </div>
            </div>
          );
        })
        .catch((err) => {
          if (err) {
            toast.error("Failed to add to favourite list");
          }
        });
    }
  };

  const threeDotContent = ThreeDotContent({ currentSong });

  return (
    <div className="audio-controls relative">
      <div className="absolute top-0 w-full ">
        <MiniPlayer
          // currentSong={currentSong}
          // repeat={repeat}
          // toggleRepeat={handleToggleRepeat}
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
          !showPlayer
            ? "hidden"
            : "w-full h-screen  bg-cover overflow-hidden bg-center"
        } `}
      >
        {/* Dropdown section */}
        <div
          className={`${
            !showPlayer
              ? "hidden"
              : "absolute p-4 lg:py-20 xl:px-[120px] right-0 top-16 text-white"
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
        <div className="flex flex-col justify-end h-full gap-2 lg:gap-[24px] md:p-10 p-4   xl:px-[120px]">
          <div className="w-full flex justify-between items-center">
            <div className="text-white flex mb-4 items-center gap-4">
              <img
                src={artwork ? artwork : placeHolder.src}
                alt="Album Art"
                className="w-10 h-10 md:h-16 md:w-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-white text-base md:text-xl gap-2 font-semibold mb-1 lg:text-2xl">
                  <SongMarquee songName={songName} className="text-white" />
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

            <div className="hidden xl:mt-5 xl:block">
              <PlayButtons
                handleNext={handleNext}
                handleNextTenSecond={handleNextTenSecond}
                handlePlayPause={handlePlayPause}
                handlePreviousTenSecond={handlePreviousTenSecond}
                handlePrev={handlePrev}
                playing={playing}
              />
            </div>

            <RepeatActionButton
              toggleRepeat={toggleRepeat}
              src={LyricsIcon.src}
              repeat={repeat}
              handleOpenLyrics={handleOpenLyrics}
              handleAddToFavorites={handleAddtoFavourite}
              isfavorite={favorite}
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
            onEnded={handleEnd}
          />

          <div className="w-full cursor-pointer  lg:mb-0 py-1 flex items-center">
            <Slider
              defaultValue={[currentTime]}
              max={duration}
              min={0}
              value={[currentTime]}
              onValueChange={handleSeek}
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between gap-3 mb-14 lg:mb-0 items-center ">
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
            <div className="flex flex-col gap-4 justify-between">
              <VolumeSettingDownRepeat
                bpm={bpm}
                songName={songName}
                songUrl={songLink}
                audioRef={audioRef}
                handleOpenPlayList={handleOpenPlayList}
                volume={volume}
                handleVolumeChange={handleVolumeChange}
                handleMute={handleMute}
              />
              <div className="md:hidden">
                <MusicControls handleOpenEqualizer={handleOpenEqualizer} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
