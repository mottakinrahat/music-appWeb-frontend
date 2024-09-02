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
// import Volumn from "./components/Volumn";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import ShareCard from "../Card/ShareCard";
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
import { pauseSong, playSong } from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";

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
  id,
  currentSong: songData,
  handleOpenEqualizer,
  handleNext,
  handlePrev,
  play,
  handleOpenPlayList,
  handleRandom,
  setCurrentSong: setCurrectSong,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [repeat, setRepeat] =
    useState<RepeatShuffleProps["repeat"]>("repeat-all");
  // const [playing, setPlaying] = useState<boolean>(play);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [played, setPlayed] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [playbackSpeed, setPlaybackSpeed] = useState<any>(1);
  const [karaokeOn, setKaraokeOn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();

  // const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
  //   null
  // );

  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<any>(songData);
  const [share, setShare] = useState<boolean>(false);
  const userId = userData?._id;
  const [hasSong, setHasSong] = useState<boolean>(false);
  const [idbSong, setIdbSong] = useState<any>(null);

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

  const isSongPlaying = useLocalSongData();
  // console.log(isSongPlaying);

  // const handlePlayPause = () => {
  //   if (playing) {
  //     audioRef.current?.pause();
  //     localStorage.setItem(
  //       "songData",
  //       JSON.stringify({ play: false, id: songId })
  //     );
  //   } else {
  //     audioRef.current?.play();
  //     localStorage.setItem(
  //       "songData",
  //       JSON.stringify({ play: true, id: songId })
  //     );
  //   }
  //   setPlaying(!playing);
  // };
  const dispatch = useDispatch();
  const playing = useSelector((state: RootState) => state.player.playing);

  const handlePlayPause = () => {
    if (playing) {
      audioRef.current?.pause();
      dispatch(pauseSong());
    } else {
      audioRef.current?.play();
      dispatch(playSong(songId));
    }
  };

  // Handle Open lyrics

  const handleOpenLyrics = () => {
    alert("Open lyrics");
  };
  // const isSongPlaying = useLocalSongData();
  // const dispatch: AppDispatch = useDispatch();

  // const onPlayPause = () => {
  //   dispatch(handlePlayPause({ audioRef, songId }));
  // };

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

  // const dispatch: AppDispatch = useDispatch();
  const handleEnd = () => {
    let currentRepeat: RepeatShuffleProps["repeat"] = repeat;
    const audioElement = audioRef.current;

    if (currentRepeat === "repeat-all") {
      handleNext();
    } else if (currentRepeat === "repeat-one") {
      if (audioElement) {
        audioElement.currentTime = 0; // Restart the track
        audioElement.play(); // Play the track again
      }
    } else if (currentRepeat === "repeat-off") {
      handleRandom();
    } else if (currentRepeat === "shuffle") {
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
  //  repeat toggle
  const toggleRepeat = () => {
    let newRepeat: RepeatShuffleProps["repeat"];
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

  // handle playlist add
  const handleAddtoPlayList = async () => {
    const user = JSON.parse(localStorage?.getItem("user")!);
    const userId = user?._id;
    const playListData = {
      id: songId,
      userId: userId,
    };

    if (!userId) {
      toast.warning("please login first");
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

  // console.log(currentSong);

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

  // Function to open IndexedDB database
  const initDB = async () => {
    const db = await openDB("MusicDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("songs")) {
          db.createObjectStore("songs", { keyPath: "id", autoIncrement: true });
        }
      },
    });
    return db;
  };

  // Retrieve file from IndexedDB

  useEffect(() => {
    const retrieveFileFromIndexedDB = async () => {
      const db = await initDB();
      const song = await db.get("songs", 1);
      if (song) {
        setHasSong(true);
        setIdbSong(song);
      }
    };
    retrieveFileFromIndexedDB();
  }, []);

  return (
    <div className="audio-controls relative">
      <ShareCard
        open={share}
        setOpen={setShare}
        shareUrl={`https://music-web-liangu.vercel.app//music/66c99c0a36fe71b995557d6b`}
      />
      <div className="absolute top-0 w-full ">
        <MiniPlayer
          currentSong={currentSong}
          repeat={repeat}
          toggleRepeat={toggleRepeat}
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
                // style={{ width: "auto", height: "auto" }}
                src={artwork ? artwork : placeHolder.src}
                alt="Album Art"
                // height={80}
                // width={80}
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

            {/* repeat button component */}

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
