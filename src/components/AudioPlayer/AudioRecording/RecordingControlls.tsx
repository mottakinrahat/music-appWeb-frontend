"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useAudio } from "@/lib/AudioProvider";
import {
  playRecording,
  setRecordedUrl,
} from "@/redux/slice/karaoke/karaokeActionSlice";
import { pauseSong, playImport } from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";
import { openDB } from "idb";
import { useDispatch, useSelector } from "react-redux";
import * as Tone from "tone";
import RecordingControlDesign from "@/components/AudioPlayer/AudioRecording/RecordingControlDesign";
import { encodeAndSaveAudio } from "./handlers/encodeRecordingAudio";

interface RecordingProps {
  songDuration: number | any;
}

const AdvancedAudioRecorder: React.FC<RecordingProps> = ({ songDuration }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const recorderRef = useRef<Tone.Recorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sourceNodeRef = useRef<Tone.UserMedia | null>(null);
  const gainNodeRef = useRef<Tone.Gain | null>(null);
  const reverbNodeRef = useRef<Tone.Reverb | null>(null);
  const echoNodeRef = useRef<Tone.FeedbackDelay | null>(null);
  const distortionNodeRef = useRef<Tone.Distortion | null>(null);
  const recordedAudioRef = useRef<HTMLAudioElement | null>(null);

  const dispatch = useDispatch();
  const { audioRef, currentSongBlob } = useAudio();
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

  // Recording logic
  const startRecording = useMemo(
    () => async () => {
      if (!isRecording) {
        setIsRecording(true);
        setRecordedAudioUrl(null);
        await initializeAudioNodes();
        dispatch(playImport());

        if (sourceNodeRef.current) {
          await sourceNodeRef.current.open();
          recorderRef.current = new Tone.Recorder();
          gainNodeRef.current?.connect(echoNodeRef.current!);
          echoNodeRef.current?.connect(reverbNodeRef.current!);
          reverbNodeRef.current?.connect(distortionNodeRef.current!);
          distortionNodeRef.current?.connect(recorderRef.current);
          await recorderRef.current.start();
        }
      }
    },
    [dispatch, isRecording]
  );

  const stopRecording = useMemo(
    () => async () => {
      if (isRecording && recorderRef.current) {
        dispatch(pauseSong());
        try {
          const recording = await recorderRef.current.stop();
          setIsRecording(false);
          // const url = URL.createObjectURL(recording);
          // setRecordedAudioUrl(url);
          const startTime = 0; // Set the actual start time of the recording
          const endTime = 10;
          if (currentSongBlob) {
            await encodeAndSaveAudio(
              recording,
              currentSongBlob,
              setRecordedAudioUrl,
              startTime,
              endTime
            );
          }
        } catch (error) {
          console.error("Error stopping the recorder:", error);
        }
      }
    },
    [currentSongBlob, dispatch, isRecording]
  );

  useEffect(() => {
    if (getIsRecordingState) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [getIsRecordingState, startRecording, stopRecording]);

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
    if (recordedAudioUrl) {
      dispatch(setRecordedUrl(recordedAudioUrl));
    } else {
      dispatch(setRecordedUrl(""));
    }
  }, [recordedAudioUrl, dispatch]);

  // const encodeAndSaveAudio = async (recording: Blob) => {
  //   const arrayBuffer = await recording.arrayBuffer();

  //   // *********************** Needed audio blob ************************* //
  //   const audioBlob = new Blob([arrayBuffer], { type: "audio/wav" });

  //   const url = URL.createObjectURL(audioBlob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "recorded_audio.wav";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link); // Clean up the link element
  // };

  // encodeAndSaveAudio(recording)

  const initializeAudioNodes = async () => {
    await Tone.start(); // Ensure Tone.js is started
    sourceNodeRef.current = new Tone.UserMedia();
    gainNodeRef.current = new Tone.Gain(1).toDestination();
    reverbNodeRef.current = new Tone.Reverb({ decay: 1.0 }).toDestination();
    echoNodeRef.current = new Tone.FeedbackDelay(0.2, 0.5).toDestination();
    distortionNodeRef.current = new Tone.Distortion(0.8).toDestination();
    sourceNodeRef.current
      .connect(gainNodeRef.current)
      .connect(echoNodeRef.current)
      .connect(reverbNodeRef.current)
      .connect(distortionNodeRef.current);
  };

  const disconnectAudioNodes = () => {
    sourceNodeRef.current?.disconnect();
    gainNodeRef.current?.disconnect();
    reverbNodeRef.current?.disconnect();
    echoNodeRef.current?.disconnect();
    distortionNodeRef.current?.disconnect();
    sourceNodeRef.current?.close();
  };

  useEffect(() => {
    // Cleanup function to stop recording and disconnect nodes
    return () => {
      if (isRecording) stopRecording();
      disconnectAudioNodes();
    };
  }, [isRecording, stopRecording]);

  return (
    <div className="absolute bottom-[6.5rem] min-[310px]:bottom-[6.5rem] min-[340px]:bottom-[7rem] min-[347px]:bottom-[6.5rem] min-[370px]:bottom-[5.5rem] min-[420px]:bottom-[5rem] min-[768px]:bottom-[7.5rem] min-[860px]:bottom-[5rem] min-[1024px]:bottom-[10rem] w-full left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 max-lg:gap-2">
      <RecordingControlDesign
        audioRef={audioRef}
        getSongLink={getSongLink} // New prop added
        getIsRecordingState={getIsRecordingState}
        handleRecordingState={isRecording ? stopRecording : startRecording}
        playRecord={playRecord}
        togglePlayPause={() => {
          if (recordedAudioRef.current) {
            recordedAudioRef.current.paused
              ? recordedAudioRef.current.play()
              : recordedAudioRef.current.pause();
          }
        }}
        isPlaying={!!recordedAudioUrl}
        recordedUrl={recordedUrl}
        mediaRecorderRef={recorderRef} // New prop added
        micStreamRef={mediaStreamRef} // New prop added
        monitoringAudio={recordedAudioRef.current!} // New prop added
      />
      <div className="flex items-center text-white max-lg:items-center">
        <p>{formatTime(recordingTime)}</p>
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

export default AdvancedAudioRecorder;
