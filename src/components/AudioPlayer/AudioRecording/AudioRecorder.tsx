"use client";
import { useState, useRef, useEffect } from "react";
import { openDB } from "idb";
import RadioButton from "@/components/svg/RadioButton";
import { useDispatch } from "react-redux";
import {
  isKaraokeRecord,
  setRecordedUrl,
} from "@/redux/slice/karaoke/karaokeActionSlice";
import { useAudio } from "@/lib/AudioProvider";
import { pauseSong } from "@/redux/slice/music/musicActionSlice";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  // const [audioURL, setAudioURL] = useState<string | null>(null);
  // const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // const chunksRef = useRef<Blob[]>([]);
  // const micStreamRef = useRef<MediaStream | null>(null);
  const dispatch = useDispatch();
  // const { audioRef, audioContext, musicSource } = useAudio();

  // useEffect(() => {
  //   if (audioURL) {
  //     dispatch(setRecordedUrl(audioURL));
  //   } else {
  //     dispatch(setRecordedUrl(""));
  //   }
  // }, [audioURL, dispatch]);

  // const monitoringAudio = new Audio();

  // const playBeep = () => {
  //   if (audioContext) {
  //     const oscillator = audioContext.createOscillator();
  //     const gainNode = audioContext.createGain();

  //     oscillator.type = "sine";
  //     oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
  //     gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

  //     oscillator.connect(gainNode);
  //     gainNode.connect(audioContext.destination);

  //     oscillator.start();
  //     oscillator.stop(audioContext.currentTime + 0.2);
  //   }
  // };

  // const startRecording = async () => {

  //   dispatch(pauseSong());
  //   try {
  //     playBeep();

  //     const micStream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //     });

  //     micStreamRef.current = micStream;

  //     if (!audioRef.current) {
  //       console.warn("No audio element available.");
  //       return;
  //     }

  //     const mediaElement = audioRef.current;
  //     if (mediaElement.paused) {
  //       await mediaElement.play();
  //     }

  //     if (audioContext) {
  //       await audioContext.resume();

  //       const recordingDestination =
  //         audioContext.createMediaStreamDestination();
  //       const monitoringDestination =
  //         audioContext.createMediaStreamDestination();
  //       const micSource = audioContext.createMediaStreamSource(micStream);

  //       micSource.connect(monitoringDestination);
  //       // musicSource.connect(monitoringDestination);

  //       micSource.connect(recordingDestination);
  //       musicSource.connect(recordingDestination);

  //       mediaRecorderRef.current = new MediaRecorder(
  //         recordingDestination.stream
  //       );

  //       mediaRecorderRef.current.ondataavailable = (event) => {
  //         if (event.data.size > 0) {
  //           chunksRef.current.push(event.data);
  //         }
  //       };

  //       mediaRecorderRef.current.onstop = async () => {
  //         const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
  //         const audioUrl = URL.createObjectURL(audioBlob);
  //         setAudioURL(audioUrl);
  //         saveToIndexedDB(audioBlob);
  //       };

  //       mediaRecorderRef.current.start();
  //       setIsRecording(true);

  //       monitoringAudio.srcObject = monitoringDestination.stream;
  //       monitoringAudio.play();
  //     }
  //   } catch (err) {
  //     console.error("Error accessing microphone or system audio:", err);
  //   }
  // };

  // const stopRecording = () => {
  //   dispatch(pauseSong());
  //   const mediaElement = audioRef.current;
  //   if (mediaElement) {
  //     mediaElement.pause();
  //   }

  //   dispatch(isKaraokeRecord(false));
  //   if (mediaRecorderRef.current) {
  //     mediaRecorderRef.current.stop();
  //     monitoringAudio.pause();
  //     setIsRecording(false);
  //   }

  //   if (micStreamRef.current) {
  //     micStreamRef.current.getTracks().forEach((track) => track.stop());
  //     micStreamRef.current = null;
  //   }
  // };

  // const saveToIndexedDB = async (blob: Blob) => {
  //   const db = await openDB("audio-db", 1, {
  //     upgrade(db) {
  //       db.createObjectStore("audio", { keyPath: "id", autoIncrement: true });
  //     },
  //   });
  //   await db.put("audio", { blob });
  // };

  return (
    <div>
      <div className="flex items-center group">
        {isRecording ? (
          <button
            onClick={() => dispatch(isKaraokeRecord(false))}
            className="cursor-pointer"
          >
            <RadioButton className="fill-accent" />
          </button>
        ) : (
          <button
            onClick={() => dispatch(isKaraokeRecord(true))}
            className="cursor-pointer"
          >
            <RadioButton className="fill-white group-hover:fill-accent" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
