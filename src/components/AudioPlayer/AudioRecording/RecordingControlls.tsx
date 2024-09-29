// import { useAudio } from "@/lib/AudioProvider";
// import {
//   isRecording,
//   playRecording,
//   setRecordedUrl,
// } from "@/redux/slice/karaoke/karaokeActionSlice";
// import { pauseSong } from "@/redux/slice/music/musicActionSlice";
// import { RootState } from "@/redux/store";
// import { openDB } from "idb";
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { startRecording } from "./handlers/startRecording";
// import { pauseRecording, resumeRecording } from "./handlers/utilsRecording";
// import RecordingControlDesign from "./RecordingControlDesign";

// interface RecordingProps {
//   songDuration: number | any;
// }

// const RecordingControlls: React.FC<RecordingProps> = ({ songDuration }) => {
//   const [isRecordingOn, setIsRecording] = useState(false);
//   const [audioURL, setAudioURL] = useState<string | null>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const chunksRef = useRef<Blob[]>([]);
//   const micStreamRef = useRef<MediaStream | null>(null);
//   const dispatch = useDispatch();
//   const { audioRef, audioContext, musicSource } = useAudio();
//   const [isPlaying, setIsPlaying] = useState(false);
//   const recordedAudioRef = useRef<HTMLAudioElement | null>(null);
//   const recordedUrl = useSelector(
//     (state: RootState) => state.karaoke.recordedUrl
//   );
//   const getIsRecordingState = useSelector(
//     (state: RootState) => state.karaoke.isRecording
//   );
//   const playRecord = useSelector(
//     (state: RootState) => state.karaoke.playRecording
//   );
//   const getSongLink = useSelector(
//     (state: RootState) => state.karaoke.recordedUrl
//   );
//   const [recordingTime, setRecordingTime] = useState(0);
//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   useEffect(() => {
//     let timer: NodeJS.Timeout | undefined; // Initialize timer as undefined

//     if (getIsRecordingState === true || getIsRecordingState === "play") {
//       timer = setInterval(() => {
//         setRecordingTime((prevTime) => prevTime + 1); // Increment the time every second
//       }, 1000);
//     } else if (getIsRecordingState === "pause") {
//       if (timer !== undefined) {
//         clearInterval(timer); // Clear the timer only if it's set
//       }
//     }

//     return () => {
//       if (timer !== undefined) {
//         clearInterval(timer); // Clear the timer on cleanup
//       }
//     };
//   }, [getIsRecordingState]);

//   useEffect(() => {
//     if (audioURL) {
//       dispatch(setRecordedUrl(audioURL));
//     } else {
//       dispatch(setRecordedUrl(""));
//     }
//   }, [audioURL, dispatch]);

//   const monitoringAudio = new Audio();

//   // Helper function to fetch reverb impulse response buffer (optional)
//   async function fetchReverbBuffer(audioContext: AudioContext) {
//     const response = await fetch("/path/to/reverb-impulse-response.wav");
//     const arrayBuffer = await response.arrayBuffer();
//     return await audioContext.decodeAudioData(arrayBuffer);
//   }

//   const handleRecordingState = () => {
//     if (getIsRecordingState === false) {
//       dispatch(isRecording(true));
//       startRecording({
//         audioContext,
//         audioRef,
//         chunksRef,
//         dispatch,
//         fetchReverbBuffer,
//         mediaRecorderRef,
//         micStreamRef,
//         monitoringAudio,
//         saveToIndexedDB,
//         setAudioURL,
//         setIsRecording,
//       });
//     } else if (getIsRecordingState === true || getIsRecordingState === "play") {
//       dispatch(isRecording("pause"));
//       pauseRecording(
//         mediaRecorderRef,
//         micStreamRef,
//         monitoringAudio,
//         audioRef,
//         dispatch,
//         pauseSong
//       );
//     } else {
//       dispatch(isRecording("play"));
//       resumeRecording(
//         mediaRecorderRef,
//         micStreamRef,
//         monitoringAudio,
//         audioContext,
//         dispatch,
//         musicSource
//       );
//     }
//   };

//   const saveToIndexedDB = async (blob: Blob) => {
//     const db = await openDB("audio-db", 1, {
//       upgrade(db) {
//         db.createObjectStore("audio", { keyPath: "id", autoIncrement: true });
//       },
//     });
//     await db.put("audio", { blob });
//   };

//   const togglePlayPause = () => {
//     if (recordedAudioRef.current) {
//       if (isPlaying) {
//         recordedAudioRef.current.pause();
//       } else {
//         recordedAudioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="absolute bottom-[6.5rem] min-[310px]:bottom-[6.5rem] min-[340px]:bottom-[7rem] min-[347px]:bottom-[6.5rem] min-[370px]:bottom-[5.5rem] min-[420px]:bottom-[5rem] min-[768px]:bottom-[7.5rem] min-[860px]:bottom-[5rem] min-[1024px]:bottom-[10rem] w-full left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 max-lg:gap-2">
//       <RecordingControlDesign
//         audioRef={audioRef}
//         getIsRecordingState={getIsRecordingState}
//         handleRecordingState={handleRecordingState}
//         playRecord={playRecord}
//         togglePlayPause={togglePlayPause}
//         isPlaying={isPlaying}
//         mediaRecorderRef={mediaRecorderRef}
//         micStreamRef={micStreamRef}
//         monitoringAudio={monitoringAudio}
//         getSongLink={getSongLink}
//         recordedUrl={recordedUrl}
//       />
//       <div className="flex items-center text-white max-lg:items-center">
//         <p className="">{formatTime(recordingTime)}</p>
//         <span className="mx-1"> / </span>
//         <p>{formatTime(parseInt(songDuration))}</p>
//       </div>
//       {recordedUrl && (
//         <audio
//           className="hidden"
//           controls
//           autoPlay={playRecord}
//           src={recordedUrl}
//           ref={recordedAudioRef}
//           onEnded={() => dispatch(playRecording())}
//         />
//       )}
//     </div>
//   );
// };

// export default RecordingControlls;
"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useAudio } from "@/lib/AudioProvider";
import {
  isRecording,
  playRecording,
  setRecordedUrl,
} from "@/redux/slice/karaoke/karaokeActionSlice";
import { pauseSong, playImport } from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";
import { openDB } from "idb";
import { useDispatch, useSelector } from "react-redux";
import * as Tone from "tone";
import RecordingControlDesign from "@/components/AudioPlayer/AudioRecording/RecordingControlDesign";

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
  const { audioRef, audioContext, musicSource } = useAudio();
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

        dispatch(pauseSong())
        try {
          const recording = await recorderRef.current.stop();
          setIsRecording(false);
          const url = URL.createObjectURL(recording);
          setRecordedAudioUrl(url);
          await encodeAndSaveAudio(recording);
        } catch (error) {
          console.error("Error stopping the recorder:", error);
        }
      }
    },
    [dispatch, isRecording]
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

  const encodeAndSaveAudio = async (recording: Blob) => {
    const arrayBuffer = await recording.arrayBuffer();
    const audioBlob = new Blob([arrayBuffer], { type: "audio/wav" });

    const url = URL.createObjectURL(audioBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "recorded_audio.wav";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the link element
  };

  const initializeAudioNodes = async () => {
    await Tone.start(); // Ensure Tone.js is started
    sourceNodeRef.current = new Tone.UserMedia();
    gainNodeRef.current = new Tone.Gain(1).toDestination();
    reverbNodeRef.current = new Tone.Reverb({ decay: 2.0 }).toDestination();
    echoNodeRef.current = new Tone.FeedbackDelay(0.4, 0.5).toDestination();
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
