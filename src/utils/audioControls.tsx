import { karaoke } from "@/redux/slice/karaoke/karaokeActionSlice";
import { pauseSong, playSong } from "@/redux/slice/music/musicActionSlice";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

interface AudioControlsProps {
  dispatch: Dispatch<any>;
  playing: boolean;
  songId: string;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  setPlayed: Dispatch<SetStateAction<number>>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  duration: number;
  repeat: "repeat-all" | "repeat-one" | "repeat-off" | "shuffle";
  handleNext: () => void;
  handleRandom: () => void;
}

export const handlePlayPause = async ({
  dispatch,
  playing,
  songId,
  setUserClickedPlay,
  audioElement,
}: {
  dispatch: Dispatch<any>;
  playing: boolean;
  songId: string;
  setUserClickedPlay: Dispatch<SetStateAction<boolean>>;
  audioElement: HTMLAudioElement | null;
}) => {
  setUserClickedPlay((state) => !state);

  try {
    if (playing) {
      dispatch(pauseSong());
      localStorage.setItem(
        "songData",
        JSON.stringify({ play: false, id: songId })
      );
    } else {
      if (audioElement) {
        await audioElement.play();
      }

      dispatch(playSong(songId));
      localStorage.setItem(
        "songData",
        JSON.stringify({ play: true, id: songId })
      );
    }
  } catch (error) {
    console.clear();
  }
};

export const handleOpenLyrics = (dispatch: Dispatch<any>) => {
  dispatch(karaoke());
};

// export const handleVolumeChange = (
//   value: number[],
//   setVolume: (value: number) => void
// ) => {
//   const newVolume = value[0];
//   console.log("Type of setVolume:", typeof setVolume); // Should be 'function'
//   console.log("setVolume:", setVolume); // Should be the state setter function

//   localStorage.setItem("volume", JSON.stringify(newVolume));
//   if (typeof setVolume === "function") {
//     setVolume(newVolume);
//   } else {
//     console.error("setVolume is not a function");
//   }
// };

export const handleMute = (
  volume: number,
  setVolume: (value: number) => void
) => {
  console.log("setVolume:", setVolume); // Debugging line

  const getVolume = localStorage.getItem("volume");

  if (getVolume && parseFloat(getVolume) > 0) {
    localStorage.setItem("previousVolume", volume.toString());
    localStorage.setItem("volume", (0).toString());
    setVolume(0);
  } else {
    const previousVolume = localStorage.getItem("previousVolume");
    if (previousVolume) {
      localStorage.setItem("volume", previousVolume);
      setVolume(parseFloat(previousVolume));
    } else {
      localStorage.setItem("volume", (0).toString());
      setVolume(0);
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

export const handleEnd = (
  audioRef: MutableRefObject<HTMLAudioElement | null>,
  repeat: string,
  handleNext: () => void,
  handleRandom: () => void
) => {
  const audioElement = audioRef.current;

  if (repeat === "repeat-all") {
    handleNext();
  } else if (repeat === "repeat-one") {
    if (audioElement) {
      audioElement.currentTime = 0; // Restart the track
      audioElement.play(); // Play the track again
    }
  } else if (repeat === "repeat-off" || repeat === "shuffle") {
    handleRandom();
  }
};

export const handlePreviousTenSecond = (
  audioElement: HTMLAudioElement | null,
  duration: number
) => {
  if (audioElement) {
    const wasPlaying = !audioElement.paused; // Check if audio is playing

    if (wasPlaying) {
      audioElement.pause(); // Pause the audio
    }

    // Skip the current time by 10 seconds, or to the end if duration is exceeded
    audioElement.currentTime = Math.min(
      audioElement.currentTime - 10,
      duration
    );

    // Resume playback if it was playing before the skip
    if (wasPlaying) {
      audioElement.play();
    }
  }
};

export const handleNextTenSecond = (
  audioElement: HTMLAudioElement | null,
  duration: number
) => {
  if (audioElement) {
    const wasPlaying = !audioElement.paused; // Check if audio is playing

    if (wasPlaying) {
      audioElement.pause(); // Pause the audio
    }

    // Skip the current time by 10 seconds, or to the end if duration is exceeded
    audioElement.currentTime = Math.min(
      audioElement.currentTime + 10,
      duration
    );

    // Resume playback if it was playing before the skip
    if (wasPlaying) {
      audioElement.play();
    }
  }
};
