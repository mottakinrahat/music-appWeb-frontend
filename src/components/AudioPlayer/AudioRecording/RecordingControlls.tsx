import { useAudio } from "@/lib/AudioProvider";
import {
  isRecording,
  playRecording,
  setRecordedUrl,
} from "@/redux/slice/karaoke/karaokeActionSlice";
import { pauseSong } from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";
import { openDB } from "idb";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startRecording } from "./handlers/startRecording";
import { pauseRecording, resumeRecording } from "./handlers/utilsRecording";
import RecordingControlDesign from "./RecordingControlDesign";

interface RecordingProps {
  songDuration: number | any;
}

const RecordingControlls: React.FC<RecordingProps> = ({ songDuration }) => {
  const [isRecordingOn, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const micStreamRef = useRef<MediaStream | null>(null);
  const dispatch = useDispatch();
  const { audioRef, audioContext, musicSource } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);
  const recordedAudioRef = useRef<HTMLAudioElement | null>(null);
  const recordedUrl = useSelector(
    (state: RootState) => state.karaoke.recordedUrl
  );
  const getIsRecordingState = useSelector(
    (state: RootState) => state.karaoke.isRecording
  );
  const playRecord = useSelector(
    (state: RootState) => state.karaoke.playRecording
  );
  const getSongLink = useSelector(
    (state: RootState) => state.karaoke.recordedUrl
  );
  const [recordingTime, setRecordingTime] = useState(0);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined; // Initialize timer as undefined

    if (getIsRecordingState === true || getIsRecordingState === "play") {
      timer = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1); // Increment the time every second
      }, 1000);
    } else if (getIsRecordingState === "pause") {
      if (timer !== undefined) {
        clearInterval(timer); // Clear the timer only if it's set
      }
    }

    return () => {
      if (timer !== undefined) {
        clearInterval(timer); // Clear the timer on cleanup
      }
    };
  }, [getIsRecordingState]);

  useEffect(() => {
    if (audioURL) {
      dispatch(setRecordedUrl(audioURL));
    } else {
      dispatch(setRecordedUrl(""));
    }
  }, [audioURL, dispatch]);

  const monitoringAudio = new Audio();

  // Helper function to fetch reverb impulse response buffer (optional)
  async function fetchReverbBuffer(audioContext: AudioContext) {
    const response = await fetch("/path/to/reverb-impulse-response.wav");
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
  }

  const handleRecordingState = () => {
    if (getIsRecordingState === false) {
      dispatch(isRecording(true));
      startRecording({
        audioContext,
        audioRef,
        chunksRef,
        dispatch,
        fetchReverbBuffer,
        mediaRecorderRef,
        micStreamRef,
        monitoringAudio,
        saveToIndexedDB,
        setAudioURL,
        setIsRecording,
      });
    } else if (getIsRecordingState === true || getIsRecordingState === "play") {
      dispatch(isRecording("pause"));
      pauseRecording(
        mediaRecorderRef,
        micStreamRef,
        monitoringAudio,
        audioRef,
        dispatch,
        pauseSong
      );
    } else {
      dispatch(isRecording("play"));
      resumeRecording(
        mediaRecorderRef,
        micStreamRef,
        monitoringAudio,
        audioContext,
        dispatch,
        musicSource
      );
    }
  };

  const saveToIndexedDB = async (blob: Blob) => {
    const db = await openDB("audio-db", 1, {
      upgrade(db) {
        db.createObjectStore("audio", { keyPath: "id", autoIncrement: true });
      },
    });
    await db.put("audio", { blob });
  };

  const togglePlayPause = () => {
    if (recordedAudioRef.current) {
      if (isPlaying) {
        recordedAudioRef.current.pause();
      } else {
        recordedAudioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="absolute bottom-[6.5rem] min-[310px]:bottom-[6.5rem] min-[340px]:bottom-[7rem] min-[347px]:bottom-[6.5rem] min-[370px]:bottom-[5.5rem] min-[420px]:bottom-[5rem] min-[768px]:bottom-[7.5rem] min-[860px]:bottom-[5rem] min-[1024px]:bottom-[10rem] w-full left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 max-lg:gap-2">
      <RecordingControlDesign
        audioRef={audioRef}
        getIsRecordingState={getIsRecordingState}
        handleRecordingState={handleRecordingState}
        playRecord={playRecord}
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
        mediaRecorderRef={mediaRecorderRef}
        micStreamRef={micStreamRef}
        monitoringAudio={monitoringAudio}
        getSongLink={getSongLink}
      />
      <div className="flex items-center text-white max-lg:items-center">
        <p className="">{formatTime(recordingTime)}</p>
        <span className="mx-1"> / </span>
        <p>{formatTime(parseInt(songDuration))}</p>
      </div>
      {recordedUrl && (
        <audio
          className="hidden"
          controls
          autoPlay={playRecord}
          src={recordedUrl}
          ref={recordedAudioRef}
          onEnded={() => dispatch(playRecording())}
        />
      )}
    </div>
  );
};

export default RecordingControlls;
