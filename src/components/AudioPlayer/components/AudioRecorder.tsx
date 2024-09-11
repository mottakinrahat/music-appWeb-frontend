"use client";
import { useState, useRef, useEffect } from "react";
import { openDB } from "idb";
import RadioButton from "@/components/svg/RadioButton";
import { useDispatch } from "react-redux";
import { setRecordedUrl } from "@/redux/slice/karaoke/karaokeActionSlice";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (audioURL) {
      dispatch(setRecordedUrl(audioURL));
    } else {
      dispatch(setRecordedUrl(""));
    }
  }, [audioURL, dispatch]);

  // Request user media and start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        saveToIndexedDB(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone", err);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Save audio blob to IndexedDB
  const saveToIndexedDB = async (blob: Blob) => {
    const db = await openDB("audio-db", 1, {
      upgrade(db) {
        db.createObjectStore("audio", { keyPath: "id", autoIncrement: true });
      },
    });
    await db.put("audio", { blob });
  };

  return (
    <div>
      <div className="flex items-center">
        {isRecording ? (
          <button onClick={stopRecording} className="cursor-pointer">
            <RadioButton className="fill-red-500" />
          </button>
        ) : (
          <button onClick={startRecording} className="cursor-pointer">
            <RadioButton className="fill-accent" />
          </button>
        )}
      </div>
      {audioURL && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Recorded Audio:</h2>
          <audio controls src={audioURL} className="mt-2" />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
