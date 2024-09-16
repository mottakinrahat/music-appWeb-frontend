import RadioButton from "@/components/svg/RadioButton";
import RecordingSVG from "@/components/svg/RecordingSVG";
import { useAudio } from "@/lib/AudioProvider";
import {
  isKaraokeRecord,
  isRecording,
  playRecording,
  setRecordedUrl,
} from "@/redux/slice/karaoke/karaokeActionSlice";
import { pauseSong } from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";
import { openDB } from "idb";
import React, { useEffect, useRef, useState } from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

interface RecordingProps {
  songDuration: number | any;
}

const RecordingControlls: React.FC<RecordingProps> = ({ songDuration }) => {
  const isKaraokeRecording = useSelector(
    (state: RootState) => state.karaoke.isKaraokeRecord
  );
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

  const [isRecordingOn, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const micStreamRef = useRef<MediaStream | null>(null);
  const dispatch = useDispatch();
  const { audioRef, audioContext, musicSource } = useAudio();

  useEffect(() => {
    if (audioURL) {
      dispatch(setRecordedUrl(audioURL));
    } else {
      dispatch(setRecordedUrl(""));
    }
  }, [audioURL, dispatch]);

  const monitoringAudio = new Audio();

  const playBeep = () => {
    if (audioContext) {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    }
  };

  const startRecording = async () => {
    dispatch(isRecording(true));
    dispatch(pauseSong());
    try {
      playBeep();

      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      micStreamRef.current = micStream;

      if (!audioRef.current) {
        console.warn("No audio element available.");
        return;
      }

      const mediaElement = audioRef.current;
      if (mediaElement.paused) {
        await mediaElement.play();
      }

      if (audioContext) {
        await audioContext.resume();

        const recordingDestination =
          audioContext.createMediaStreamDestination();
        const monitoringDestination =
          audioContext.createMediaStreamDestination();
        const micSource = audioContext.createMediaStreamSource(micStream);

        micSource.connect(monitoringDestination);
        // musicSource.connect(monitoringDestination);

        micSource.connect(recordingDestination);
        musicSource.connect(recordingDestination);

        mediaRecorderRef.current = new MediaRecorder(
          recordingDestination.stream
        );

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(chunksRef.current, {
            type: "audio/webm",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
          saveToIndexedDB(audioBlob);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);

        monitoringAudio.srcObject = monitoringDestination.stream;
        monitoringAudio.play();
      }
    } catch (err) {
      console.error("Error accessing microphone or system audio:", err);
    }
  };
  // Pause recording, including mic input
  const pauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      // Pause the recording
      mediaRecorderRef.current.pause();
      monitoringAudio.pause(); // Pause monitoring audio (voice)

      if (audioRef.current) {
        audioRef.current.pause(); // Pause music playback
      }

      // Stop the mic stream (pause the mic)
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      dispatch(isRecording("pause")); // Update Redux state to "pause"
      console.log("Recording paused, music, and mic paused");
    } else {
      console.warn("MediaRecorder not recording");
    }
  };

  // Resume recording, including mic input
  const resumeRecording = async () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      // Resume the recording
      mediaRecorderRef.current.resume();
      monitoringAudio.play(); // Resume monitoring audio (voice)

      if (audioRef.current) {
        audioRef.current.play(); // Resume music playback
      }

      // Restart the mic stream (resume the mic)
      try {
        const micStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        micStreamRef.current = micStream;

        // Connect mic stream to the audio context and recording again
        if (audioContext) {
          const micSource = audioContext.createMediaStreamSource(micStream);
          const recordingDestination =
            audioContext.createMediaStreamDestination();
          micSource.connect(recordingDestination);
          musicSource.connect(recordingDestination);

          mediaRecorderRef.current = new MediaRecorder(
            recordingDestination.stream
          );
          mediaRecorderRef.current.start(); // Restart recording

          monitoringAudio.srcObject = micStream; // Update monitoring audio
          monitoringAudio.play();
        }
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }

      dispatch(isRecording("play")); // Update Redux state to "play"
      console.log("Recording resumed, music and mic resumed");
    } else {
      console.warn("MediaRecorder not paused");
    }
  };

  const stopRecording = () => {
    if (
      getIsRecordingState === true ||
      getIsRecordingState === "pause" ||
      getIsRecordingState === "play"
    ) {
      dispatch(isRecording(false));
      dispatch(pauseSong());
      const mediaElement = audioRef.current;
      if (mediaElement) {
        mediaElement.pause();
      }

      dispatch(isRecording(false));
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        monitoringAudio.pause();
        setIsRecording(false);
      }

      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
        micStreamRef.current = null;
      }
    }
  };

  const handleRecordingState = () => {
    if (getIsRecordingState === false) {
      dispatch(isRecording(true));
      startRecording();
    } else if (getIsRecordingState === true || getIsRecordingState === "play") {
      dispatch(isRecording("pause"));
      pauseRecording();
    } else {
      dispatch(isRecording("play"));
      resumeRecording();
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

  const [isPlaying, setIsPlaying] = useState(false);
  const recordedAudioRef = useRef<HTMLAudioElement | null>(null);

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
      <div className="flex gap-6 items-center">
        <div
          className={`${
            getSongLink.length > 1 && getIsRecordingState === false
              ? "cursor-pointer text-white"
              : "text-[#aaaaaa] cursor-not-allowed"
          }`}
          title={
            getSongLink.length > 1 ? "Play/Pause" : "Start recording first."
          }
          onClick={() =>
            getSongLink.length > 1 &&
            getIsRecordingState === false &&
            dispatch(playRecording())
          }
        >
          <button onClick={togglePlayPause} disabled={!recordedUrl}>
            {isPlaying ? (
              <FaCirclePause className="w-6 h-6" />
            ) : (
              <FaCirclePlay className="w-6 h-6" />
            )}
          </button>
        </div>
        <div title="Recording">
          <RecordingSVG onClick={handleRecordingState} />
        </div>
        <div
          className={`${
            getIsRecordingState ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          title="Start recording first."
        >
          <RadioButton onClick={stopRecording} className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex items-center text-white max-lg:items-center">
        <p className="">{formatTime(recordingTime)}</p>
        <span className="mx-1"> / </span>
        <p>{formatTime(parseInt(songDuration))}</p>
      </div>
      {recordedUrl && (
        <audio
          className="hidden"
          controls
          src={recordedUrl}
          ref={recordedAudioRef}
        />
      )}
    </div>
  );
};

export default RecordingControlls;
