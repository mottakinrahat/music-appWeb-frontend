import React, { useState, useRef, useEffect } from "react";
import placeHolder from "@/assets/etc/png/song.jpg";
import LyricsIcon from "@/assets/icons/lyrics.svg";
import { formatTime } from "@/utils/FormatTime";
import AudioControls from "./components/AudioControls";
import RepeatActionButton from "./components/RepeatActionButton";
import PlayButtons from "./components/PlayButtons";
import MusicControls from "./components/MusicControls";
import axios from "axios";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import MiniPlayer from "./MiniPlayer";
import { Slider } from "../ui/slider";
import VolumeSettingDownRepeat from "./components/VolumeSettingDownRepeat";
import KaraokeAirFriendEtc from "./components/KaraokeAirFriendEtc";
import { DropDownBtn } from "./components/DropDownBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  audioVolume,
  pauseSong,
  PlayerState,
  playImport,
  playSong,
} from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";
import ThreeDotContent from "./components/ThreeDotContent";
import ImportSong from "./components/ImportSong";
import Lyrics from "./components/Lyrics";
import {
  handleEnd,
  handleMute,
  handleNextTenSeconds,
  handleOpenLyrics,
  handlePlayPause,
  handlePreviousTenSecond,
  handleProgress,
  toggleRepeat,
} from "./handlers/audioControls";
import { handleFavorite } from "./handlers/handleFavorite";
import { useIsFavouriteMutation } from "@/redux/api/audioPlayerApi";
import { useAudio } from "@/lib/AudioProvider";
import RecordingControlls from "./AudioRecording/RecordingControlls";
import AudioRecordSlider from "./AudioRecording/AudioRecordSlider";
import { OnProgressProps } from "react-player/base";
import ReactPlayer from "react-player";

interface AudioPlayerProps {
  onAudioContextReady: (
    audioContext: AudioContext,
    audioElement: ReactPlayer
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
  audioContext: AudioContext;
  loading: boolean;
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
  audioContext,
  loading,
}) => {
  const audioRef = useRef<ReactPlayer | null>(null);
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
  const [userClickedPlay, setUserClickedPlay] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isShowLyrics = useSelector(
    (state: RootState) => state.player.showLyric
  );

  const userId = userData?._id;
  const importSongUrl = useSelector(
    (state: RootState) => state.musicData.fileData
  );

  const {
    songName,
    bpm,
    songLink,
    artwork,
    songArtist,
    songAlbum,
    _id: songId,
  } = currentSong;

  const isFavouriteUser = currentSong.favUsers.includes(userId);
  const { setAudioRef } = useAudio();

  useEffect(() => {
    setAudioRef(audioRef);
    setFavorite(isFavouriteUser);

    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, [currentSong.favUsers, userId, isFavouriteUser, setAudioRef]);

  const [currentLyrics, setCurrentLyrics] = useState<string | any>(null);
  useEffect(() => {
    const getLyrics = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/songs/${songData._id}/${currentTime}`
        );
        if (response.status === 404) {
          setCurrentLyrics(null);
        }
        setCurrentLyrics(response.data.data);
      } catch (error) {}
    };
    getLyrics();
  }, [currentTime, songData._id]);

  useEffect(() => {
    if (pathname.startsWith("/music/")) {
      setShowPlayer(true);
    } else {
      setShowPlayer(false);
    }
  }, [dispatch, pathname, songId]);

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
      dispatch(audioVolume(0.8));
    }
    if (volume) {
      setVolume(parseFloat(volume));
      dispatch(audioVolume(parseFloat(volume)));
    }
    setCurrentSong(songData);
    const getRepeat = localStorage.getItem("repeat");
    if (!getRepeat) {
      localStorage.setItem("repeat", repeat);
    }
  }, [currentSong, dispatch, repeat, songData, speed, volume]);

  // useEffect(() => {
  //   const handleInteraction = () => {
  //     if (!audioContextRef.current) {
  //       const audioContext = new (window.AudioContext ||
  //         (window as any).webkitAudioContext)();
  //       audioContextRef.current = audioContext;
  //       onAudioContextReady(audioContext, audioRef.current as ReactPlayer);
  //     } else if (audioContextRef.current.state === "suspended") {
  //       audioContextRef.current.resume();
  //     }
  //   };

  //   document.addEventListener("click", handleInteraction);

  //   return () => {
  //     document.removeEventListener("click", handleInteraction);
  //   };
  // }, [onAudioContextReady]);

  useEffect(() => {
    const storedRepeat = localStorage.getItem(
      "repeat"
    ) as PlayerState["repeat"];
    if (!storedRepeat) {
      localStorage.setItem("repeat", "repeat-all");
    }
    const storedSongData = localStorage.getItem("songData");
    if (storedSongData) {
      const { play, id } = JSON.parse(storedSongData);
      if (play && userClickedPlay) {
        dispatch(playSong(id));
      } else {
        dispatch(pauseSong());
      }
    }
  }, [dispatch, userClickedPlay]);

  useEffect(() => {
    if (playing && songId) {
      localStorage.setItem(
        "songData",
        JSON.stringify({ play: true, id: songId })
      );
      dispatch(playSong(songId));
    } else if (!playing && songId) {
      localStorage.setItem(
        "songData",
        JSON.stringify({ play: false, id: songId })
      );
      dispatch(pauseSong());
    }

    localStorage.setItem("repeat", repeat); // Save repeat mode
  }, [playing, songId, repeat, dispatch]);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    localStorage.setItem("volume", JSON.stringify(newVolume));
    dispatch(audioVolume(value[0]));

    // Retrieve the volume from local storage immediately after setting it
    const oldVolume = localStorage.getItem("volume");
    if (oldVolume !== null) {
      // Parse the volume correctly and set it
      setVolume(parseFloat(oldVolume));
      dispatch(audioVolume(parseFloat(oldVolume)));
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];

    if (audioRef.current) {
      const currentAudio = audioRef.current;
      const wasPlaying = currentAudio.props.playing; // Check if audio is playing

      if (wasPlaying) {
        dispatch(pauseSong()); // Pause the audio before seeking
      }

      // currentAudio.props.onDuration() = newTime; // Set the new time
      setCurrentTime(newTime); // Update the state with the new time

      if (wasPlaying) {
        // currentAudio.play(); // Resume playback if it was playing before
        dispatch(playImport());
      }
    }
  };
  const [isFavourite] = useIsFavouriteMutation();

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
      setFavorite((prev: boolean) => !prev);
      handleFavorite(
        isFavourite,
        favorite,
        songId, // songId
        userId, // userId
        playListData,
        artwork, // Replace with dynamic artwork URL
        songName,
        { albumName: songAlbum }, // Replace with dynamic album name
        { src: placeHolder.src } // Replace with dynamic placeholder URL
      );
    }
  };

  const threeDotContent = ThreeDotContent({
    currentSong,
    handleAddtoFavourite,
    favorite,
  });

  const isKaroke = useSelector((state: RootState) => state.karaoke.karaoke);
  const isRecording = useSelector(
    (state: RootState) => state.karaoke.isKaraokeRecord
  );

  return (
    <div className="audio-controls relative">
      {(isKaroke || isShowLyrics || !importSongUrl) && (
        <Lyrics
          songData={songData}
          currentLyrics={currentLyrics}
          setCurrentLyrics={setCurrentLyrics}
        />
      )}
      <div className="absolute top-0 w-full ">
        <MiniPlayer
          currentTime={currentTime}
          duration={duration}
          handleSeek={handleSeek}
          handleNext={handleNext}
          handleNextTenSecond={() =>
            handleNextTenSeconds(audioRef.current, duration, dispatch)
          }
          handlePlayPause={() =>
            handlePlayPause({
              dispatch,
              playing,
              songId,
              setUserClickedPlay,
              audioElement: audioRef.current,
            })
          }
          handlePreviousTenSecond={() =>
            handlePreviousTenSecond(audioRef.current, duration, dispatch)
          }
          handlePrev={handlePrev}
          playing={playing}
          handleVolumeChange={handleVolumeChange}
          album={currentSong.songAlbum.albumName}
          artist={currentSong.songArtist}
          artwork={currentSong.artwork}
          handleMute={() => {
            handleMute(volume, dispatch, setVolume);
            dispatch(audioVolume(volume));
          }}
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
        <div
          className={`${
            !showPlayer
              ? "hidden"
              : "absolute right-0 text-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-[120px] bottom-[calc(100%-23%)] lg:bottom-[calc(100%-25%)]"
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
        <div
          className={`flex flex-col justify-end h-full gap-2 ${
            isRecording ? "" : "lg:gap-[24px]"
          } md:p-10 p-4   xl:px-[120px]`}
        >
          <div className="w-full flex justify-between items-center">
            <ImportSong
              artwork={artwork}
              songName={songName}
              songAlbum={songAlbum}
              songArtist={songArtist}
            />

            {isRecording ? (
              <div className="hidden xl:mt-5 xl:block">
                <RecordingControlls songDuration={duration} />
              </div>
            ) : (
              <div className="hidden xl:mt-10 xl:block">
                <PlayButtons
                  handleNext={handleNext}
                  handleNextTenSecond={() =>
                    handleNextTenSeconds(audioRef.current, duration, dispatch)
                  }
                  handlePreviousTenSecond={() =>
                    handlePreviousTenSecond(
                      audioRef.current,
                      duration,
                      dispatch
                    )
                  }
                  handlePlayPause={() =>
                    handlePlayPause({
                      dispatch,
                      playing,
                      songId,
                      setUserClickedPlay,
                      audioElement: audioRef.current,
                    })
                  }
                  handlePrev={handlePrev}
                  playing={playing}
                />
              </div>
            )}

            <RepeatActionButton
              toggleRepeat={toggleRepeat}
              src={LyricsIcon.src}
              repeat={repeat}
              handleOpenLyrics={() => handleOpenLyrics(dispatch)}
              handleAddToFavorites={handleAddtoFavourite}
              isfavorite={favorite}
            />
          </div>

          <AudioControls
            volume={volume}
            ref={audioRef}
            src={importSongUrl ? importSongUrl : songLink}
            playbackRate={playbackSpeed}
            onTimeUpdate={(state: OnProgressProps) => {
              const currentTime = state.playedSeconds;
              const duration = state.loadedSeconds;
              handleProgress(currentTime, duration, setPlayed);
              setCurrentTime(currentTime);
            }}
            onLoadedMetadata={(state: number) => {
              setDuration(state || 0);
            }}
            onEnded={() =>
              handleEnd(audioRef, repeat, handleNext, handleRandom)
            }
          />

          <div className="w-full cursor-pointer  lg:mb-0 py-1 flex items-center">
            {isRecording ? (
              <AudioRecordSlider
                currentTime={currentTime}
                audioUrl={songLink}
              />
            ) : (
              <Slider
                defaultValue={[currentTime]}
                max={duration}
                min={0}
                step={0.01}
                value={[currentTime]}
                onValueChange={handleSeek}
              />
            )}
          </div>
          <div className="w-full">
            <div className="flex justify-between gap-3 mb-14 lg:mb-0 items-center ">
              <span className="text-white text-sm">
                {formatTime(currentTime)}
              </span>
              <span className="text-white text-sm">{formatTime(duration)}</span>
            </div>
          </div>
          {isRecording ? (
            <div className="xl:hidden">
              <RecordingControlls songDuration={duration} />
            </div>
          ) : (
            <div className="flex w-full xl:hidden">
              <PlayButtons
                handleNext={handleNext}
                handleNextTenSecond={() =>
                  handleNextTenSeconds(audioRef.current, duration, dispatch)
                }
                handlePreviousTenSecond={() =>
                  handlePreviousTenSecond(audioRef.current, duration, dispatch)
                }
                handlePlayPause={() =>
                  handlePlayPause({
                    dispatch,
                    playing,
                    songId,
                    setUserClickedPlay,
                    audioElement: audioRef.current,
                  })
                }
                handlePrev={handlePrev}
                playing={playing}
              />
            </div>
          )}

          <div className="flex justify-between items-center">
            <KaraokeAirFriendEtc
              handleOpenEqualizer={handleOpenEqualizer}
              karaokeOn={karaokeOn}
              SetKaraokeOn={setKaraokeOn}
            />
            <div className="flex flex-col gap-4 justify-between">
              <VolumeSettingDownRepeat
                artwork={artwork}
                songArtist={songArtist}
                songAlbum={songAlbum}
                songId={songId}
                bpm={bpm}
                bpmLoading={loading}
                songName={songName}
                songUrl={songLink}
                handleOpenPlayList={handleOpenPlayList}
                volume={volume}
                handleVolumeChange={handleVolumeChange}
                handleMute={() => {
                  handleMute(volume, dispatch, setVolume);
                  dispatch(audioVolume(volume));
                }}
                handleAddToFavorites={handleAddtoFavourite}
                isfavorite={favorite}
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
