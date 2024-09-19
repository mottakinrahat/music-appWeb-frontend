import RadioButton from "@/components/svg/RadioButton";
import RecordingSVG from "@/components/svg/RecordingSVG";
import { useAudio } from "@/lib/AudioProvider";
import {
  isKaraokeRecord,
  isRecording,
  playRecording,
  setRecordedUrl,
} from "@/redux/slice/karaoke/karaokeActionSlice";
import { pauseSong, playImport } from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";
import { openDB } from "idb";
import React, { useEffect, useRef, useState } from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { startRecording } from "./handlers/startRecording";
import { pauseRecording, stopRecording } from "./handlers/utilsRecording";

interface RecordingProps {
  songDuration: number | any;
}

const RecordingControlls: React.FC<RecordingProps> = ({ songDuration }) => {
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

  //   dispatch(isRecording(true));

  //   try {
  //     playBeep();

  //     // Get microphone stream with minimal noise suppression, focusing only on voice clarity
  //     const micStream = await navigator.mediaDevices.getUserMedia({
  //       audio: {
  //         sampleRate: 48000, // High-quality studio rate
  //         channelCount: 2, // Stereo input for better sound
  //         echoCancellation: true, // Echo cancellation to minimize feedback loops
  //         noiseSuppression: false, // Disable aggressive noise suppression
  //         autoGainControl: false, // Manual gain control for better handling
  //       },
  //     });

  //     micStreamRef.current = micStream;

  //     if (!audioRef.current) {
  //       console.warn("No audio element available.");
  //       return;
  //     }

  //     const mediaElement = audioRef.current;
  //     if (mediaElement) {
  //       dispatch(playImport());
  //     }

  //     if (audioContext) {
  //       await audioContext.resume();

  //       // Create audio nodes
  //       const recordingDestination =
  //         audioContext.createMediaStreamDestination();
  //       const monitoringDestination =
  //         audioContext.createMediaStreamDestination();

  //       const micSource = audioContext.createMediaStreamSource(micStream);

  //       // Gain Node for moderate volume boost
  //       const gainNode = audioContext.createGain();
  //       gainNode.gain.value = 3.5; // Boost microphone volume to improve vocal capture

  //       // EQ Node to slightly enhance vocal clarity (1kHz band boost)
  //       const eqNode = audioContext.createBiquadFilter();
  //       eqNode.type = "peaking";
  //       eqNode.frequency.setValueAtTime(1000, audioContext.currentTime); // Boost vocal frequencies around 1kHz
  //       eqNode.gain.setValueAtTime(5, audioContext.currentTime); // Small boost for clarity

  //       // Reverb Node for depth (optional, not affecting noise)
  //       const convolver = audioContext.createConvolver();
  //       try {
  //         convolver.buffer = await fetchReverbBuffer(audioContext); // Pre-recorded reverb buffer
  //       } catch (error) {
  //         console.error("Error fetching or decoding reverb buffer:", error);
  //         // Handle error, maybe disable reverb if needed
  //       }

  //       // Light Compressor to balance volume and handle subtle noise
  //       const compressor = audioContext.createDynamicsCompressor();
  //       compressor.threshold.setValueAtTime(-40, audioContext.currentTime); // Allow softer sounds through
  //       compressor.knee.setValueAtTime(40, audioContext.currentTime); // Smooth knee for natural compression
  //       compressor.ratio.setValueAtTime(3, audioContext.currentTime); // Low ratio to maintain vocal dynamics
  //       compressor.attack.setValueAtTime(0.05, audioContext.currentTime); // Slightly slower attack for sustained sounds
  //       compressor.release.setValueAtTime(0.75, audioContext.currentTime); // Moderate release to preserve sound trails

  //       // High-pass Filter to remove low-frequency hum (around 60Hz to remove background voltage noise)
  //       const highPassFilter = audioContext.createBiquadFilter();
  //       highPassFilter.type = "highpass";
  //       highPassFilter.frequency.setValueAtTime(60, audioContext.currentTime); // Removes low-end hums like voltage noise

  //       // Low-pass Filter to slightly roll off very high frequencies (prevent extreme high-pitched noises)
  //       const lowPassFilter = audioContext.createBiquadFilter();
  //       lowPassFilter.type = "lowpass";
  //       lowPassFilter.frequency.setValueAtTime(14000, audioContext.currentTime); // Allow vocal clarity but remove ultra-high noise

  //       // Limiter to prevent clipping or distortion of loud sounds
  //       const limiter = audioContext.createDynamicsCompressor();
  //       limiter.threshold.setValueAtTime(-3, audioContext.currentTime); // Keep peaks from distorting
  //       limiter.ratio.setValueAtTime(15, audioContext.currentTime); // High ratio for limiting loud peaks
  //       limiter.attack.setValueAtTime(0.05, audioContext.currentTime); // Slow attack for smooth limiting
  //       limiter.release.setValueAtTime(0.5, audioContext.currentTime); // Moderate release for natural fading

  //       // Connect the audio nodes: mic -> gain -> EQ -> compressor -> high-pass filter -> low-pass filter -> limiter -> destinations
  //       micSource
  //         .connect(gainNode)
  //         .connect(eqNode)
  //         .connect(compressor)
  //         .connect(highPassFilter)
  //         .connect(lowPassFilter)
  //         .connect(limiter)
  //         .connect(recordingDestination); // For recording

  //       // Ensure monitoring stream does not include recorded audio
  //       micSource.connect(monitoringDestination); // Live monitoring

  //       // Check if recordingDestination.stream is available
  //       if (!recordingDestination.stream) {
  //         throw new Error("Recording destination stream is not available.");
  //       }

  //       // Initialize MediaRecorder
  //       mediaRecorderRef.current = new MediaRecorder(
  //         recordingDestination.stream
  //       );

  //       mediaRecorderRef.current.ondataavailable = (event) => {
  //         if (event.data.size > 0) {
  //           chunksRef.current.push(event.data);
  //         }
  //       };

  //       mediaRecorderRef.current.onstop = async () => {
  //         const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
  //         const audioUrl = URL.createObjectURL(audioBlob);
  //         setAudioURL(audioUrl);
  //         saveToIndexedDB(audioBlob);
  //       };

  //       mediaRecorderRef.current.start();
  //       setIsRecording(true);

  //       // Monitor live audio during recording
  //       monitoringAudio.srcObject = monitoringDestination.stream;
  //       monitoringAudio.play();
  //     } else {
  //       throw new Error("Audio context is not initialized.");
  //     }
  //   } catch (err) {
  //     console.error("Error accessing microphone or system audio:", err);
  //     // Handle additional cleanup if needed
  //     dispatch(isRecording(false)); // Reset recording state in case of error
  //   }
  // };

  // Helper function to fetch reverb impulse response buffer (optional)
  async function fetchReverbBuffer(audioContext: AudioContext) {
    const response = await fetch("/path/to/reverb-impulse-response.wav");
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
  }

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
        dispatch(playImport()); // Resume music playback
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
            {isPlaying && playRecord ? (
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
          <RadioButton
            onClick={() =>
              stopRecording(
                mediaRecorderRef,
                micStreamRef,
                monitoringAudio,
                audioRef,
                dispatch,
                getIsRecordingState
              )
            }
            className="w-6 h-6 text-white"
          />
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
