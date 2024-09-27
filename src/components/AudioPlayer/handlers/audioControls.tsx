import { karaoke } from "@/redux/slice/karaoke/karaokeActionSlice";
import {
  audioVolume,
  pauseSong,
  playImport,
  playSong,
} from "@/redux/slice/music/musicActionSlice";
import { AppDispatch } from "@/redux/store";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import ReactPlayer from "react-player";

export const handlePlayPause = async ({
  dispatch,
  playing,
  songId,
  setUserClickedPlay,
  howl, // Changed from audioElement to howl
}: {
  dispatch: Dispatch<any>;
  playing: boolean;
  songId: string;
  setUserClickedPlay: Dispatch<SetStateAction<boolean>>;
  howl: Howl | null; // Expecting howl instance instead of ReactPlayer
}) => {
  setUserClickedPlay((state) => !state);

  try {
    if (howl) {
      if (playing) {
        howl.pause(); // Pause playback with Howler
        dispatch(pauseSong());
        localStorage.setItem(
          "songData",
          JSON.stringify({ play: false, id: songId })
        );
      } else {
        howl.play(); // Play the song with Howler
        dispatch(playSong(songId));
        localStorage.setItem(
          "songData",
          JSON.stringify({ play: true, id: songId })
        );
      }
    } else {
      console.error("Howl instance is null.");
    }
  } catch (error) {
    console.error("Error during playback control:", error);
  }
};

export const toggleRepeat = (repeat: string) => {
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
  localStorage.setItem("repeat", newRepeat);
};

export const handleOpenLyrics = (dispatch: Dispatch<any>) => {
  dispatch(karaoke());
};

export const handleMute = (
  volume: number,
  dispatch: Dispatch<any>,
  setVolume: (value: number) => void
) => {
  const getVolume = localStorage.getItem("volume");

  if (getVolume && parseFloat(getVolume) > 0) {
    dispatch(audioVolume(0));
    localStorage.setItem("previousVolume", volume.toString());
    localStorage.setItem("volume", (0).toString());
    setVolume(0);
  } else {
    const previousVolume = localStorage.getItem("previousVolume");
    if (previousVolume) {
      localStorage.setItem("volume", previousVolume);
      setVolume(parseFloat(previousVolume));
      dispatch(audioVolume(parseFloat(previousVolume)));
    } else {
      localStorage.setItem("volume", (0).toString());
      setVolume(0);
      dispatch(audioVolume(0));
    }
  }
};

export const handleProgress = (
  currentTime: number,
  duration: number,
  setPlayed: Dispatch<SetStateAction<number>>
) => {
  const playedPercentage = duration ? currentTime / duration : 0;
  setPlayed(playedPercentage);
};

// export const handleEnd = (
//   audioRef: MutableRefObject<ReactPlayer | null>,
//   repeat: string,
//   handleNext: () => void,
//   handleRandom: () => void
// ) => {
//   const audioElement = audioRef.current;

//   if (audioElement) {
//     if (repeat === "repeat-all") {
//       handleNext(); // Move to the next track
//     } else if (repeat === "repeat-one") {
//       // Restart the track by seeking to the start and playing again
//       audioElement.seekTo(0, "seconds");
//     } else if (repeat === "repeat-off" || repeat === "shuffle") {
//       handleRandom(); // Handle random track selection or normal track progression
//     }
//   }
// };


export const handleEnd = (
  howl: Howl | null, // Expecting a Howl instance instead of audioRef
  repeat: string,
  handleNext: () => void,
  handleRandom: () => void
) => {
  if (howl) {
    if (repeat === "repeat-all") {
      handleNext(); // Move to the next track
    } else if (repeat === "repeat-one") {
      // Restart the track by seeking to the start and playing again
      howl.seek(0); // Seek to the start
      howl.play(); // Play the track again
    } else if (repeat === "repeat-off" || repeat === "shuffle") {
      handleRandom(); // Handle random track selection or normal track progression
    }
  } else {
    console.error("Howl instance is null.");
  }
};
// export const handlePreviousTenSecond = (
//   audioElement: ReactPlayer | null,
//   duration: number,
//   dispatch: AppDispatch
// ) => {
//   if (audioElement && audioElement.getCurrentTime && audioElement.seekTo) {
//     const currentTime = audioElement.getCurrentTime();
//     const wasPlaying = audioElement.props.playing;

//     // Skip the current time by 10 seconds, or to the end if duration is exceeded
//     const newTime = Math.min(currentTime - 10, duration);
//     audioElement.seekTo(newTime, "seconds");

//     // If the audio was playing, set the playback state accordingly
//     if (wasPlaying) {
//       dispatch(playImport()); // Continue playing
//     } else {
//       dispatch(pauseSong()); // Pause
//     }
//   }
// };

// export const handleNextTenSeconds = (
//   audioElement: ReactPlayer | null,
//   duration: number,
//   dispatch: AppDispatch
// ) => {
//   if (audioElement && audioElement.getCurrentTime && audioElement.seekTo) {
//     const currentTime = audioElement.getCurrentTime();
//     const wasPlaying = audioElement.props.playing;

//     // Skip the current time by 10 seconds, or to the end if duration is exceeded
//     const newTime = Math.min(currentTime + 10, duration);
//     audioElement.seekTo(newTime, "seconds");

//     // If the audio was playing, set the playback state accordingly
//     if (wasPlaying) {
//       dispatch(playImport()); // Continue playing
//     } else {
//       dispatch(pauseSong()); // Pause
//     }
//   }
// };

export const handlePreviousTenSecond = (
  howl: Howl | null,
  duration: number,
  dispatch: AppDispatch
) => {
  if (howl) {
    const currentTime = howl.seek(); // Get current playback time
    const wasPlaying = howl.playing(); // Check if the audio is currently playing

    // Skip the current time by 10 seconds, or to the end if duration is exceeded
    const newTime = Math.min(currentTime - 10, duration);
    howl.seek(newTime); // Seek to the new time

    // If the audio was playing, set the playback state accordingly
    if (wasPlaying) {
      dispatch(playImport()); // Continue playing
    } else {
      dispatch(pauseSong()); // Pause
    }
  } else {
    console.error("Howl instance is null.");
  }
};
export const handleNextTenSeconds = (
  howl: Howl | null,
  duration: number,
  dispatch: AppDispatch
) => {
  if (howl) {
    const currentTime = howl.seek(); // Get current playback time
    const wasPlaying = howl.playing(); // Check if the audio is currently playing

    // Skip the current time by 10 seconds, or to the end if duration is exceeded
    const newTime = Math.min(currentTime + 10, duration);
    howl.seek(newTime); // Seek to the new time

    // If the audio was playing, set the playback state accordingly
    if (wasPlaying) {
      dispatch(playImport()); // Continue playing
    } else {
      dispatch(pauseSong()); // Pause
    }
  } else {
    console.error("Howl instance is null.");
  }
};
