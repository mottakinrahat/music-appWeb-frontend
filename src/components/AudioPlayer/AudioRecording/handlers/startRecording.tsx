import { isRecording } from "@/redux/slice/karaoke/karaokeActionSlice";
import { playImport } from "@/redux/slice/music/musicActionSlice";
import React, { MutableRefObject } from "react";
import ReactPlayer from "react-player";
import { playBeep } from "./playBeep";

export const startRecording = async ({
  audioContext,
  audioRef,
  monitoringAudio,
  dispatch,
  fetchReverbBuffer,
  saveToIndexedDB,
  setAudioURL,
  setIsRecording,
  micStreamRef,
  mediaRecorderRef,
  chunksRef,
}: {
  audioContext: AudioContext | null;
  audioRef: React.RefObject<ReactPlayer>;
  monitoringAudio: HTMLAudioElement;
  dispatch: (action: any) => void;
  fetchReverbBuffer: (audioContext: AudioContext) => Promise<AudioBuffer>;
  saveToIndexedDB: (audioBlob: Blob) => void;
  setAudioURL: (url: string) => void;
  setIsRecording: (isRecording: boolean) => void;
  micStreamRef: MutableRefObject<MediaStream | null>;
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>;
  chunksRef: MutableRefObject<Blob[]>;
}) => {
  dispatch(isRecording(true));

  try {
    playBeep(audioContext);

    // Get microphone stream with minimal noise suppression, focusing only on voice clarity
    const micStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 48000, // High-quality studio rate
        channelCount: 2, // Stereo input for better sound
        echoCancellation: true, // Echo cancellation to minimize feedback loops
        noiseSuppression: false, // Disable aggressive noise suppression
        autoGainControl: false, // Manual gain control for better handling
      },
    });

    micStreamRef.current = micStream;

    if (!audioRef.current) {
      console.warn("No audio element available.");
      return;
    }

    const mediaElement = audioRef.current;
    if (mediaElement) {
      dispatch(playImport());
    }

    if (audioContext) {
      await audioContext.resume();

      // Create audio nodes
      const recordingDestination = audioContext.createMediaStreamDestination();
      const monitoringDestination = audioContext.createMediaStreamDestination();

      const micSource = audioContext.createMediaStreamSource(micStream);

      // Gain Node for moderate volume boost
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 3.5; // Boost microphone volume to improve vocal capture

      // EQ Node to slightly enhance vocal clarity (1kHz band boost)
      const eqNode = audioContext.createBiquadFilter();
      eqNode.type = "peaking";
      eqNode.frequency.setValueAtTime(1000, audioContext.currentTime); // Boost vocal frequencies around 1kHz
      eqNode.gain.setValueAtTime(5, audioContext.currentTime); // Small boost for clarity

      // Reverb Node for depth (optional, not affecting noise)
      const convolver = audioContext.createConvolver();
      try {
        convolver.buffer = await fetchReverbBuffer(audioContext); // Pre-recorded reverb buffer
      } catch (error) {
        console.error("Error fetching or decoding reverb buffer:", error);
        // Handle error, maybe disable reverb if needed
      }

      // Light Compressor to balance volume and handle subtle noise
      const compressor = audioContext.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-40, audioContext.currentTime); // Allow softer sounds through
      compressor.knee.setValueAtTime(40, audioContext.currentTime); // Smooth knee for natural compression
      compressor.ratio.setValueAtTime(3, audioContext.currentTime); // Low ratio to maintain vocal dynamics
      compressor.attack.setValueAtTime(0.05, audioContext.currentTime); // Slightly slower attack for sustained sounds
      compressor.release.setValueAtTime(0.75, audioContext.currentTime); // Moderate release to preserve sound trails

      // High-pass Filter to remove low-frequency hum (around 60Hz to remove background voltage noise)
      const highPassFilter = audioContext.createBiquadFilter();
      highPassFilter.type = "highpass";
      highPassFilter.frequency.setValueAtTime(60, audioContext.currentTime); // Removes low-end hums like voltage noise

      // Low-pass Filter to slightly roll off very high frequencies (prevent extreme high-pitched noises)
      const lowPassFilter = audioContext.createBiquadFilter();
      lowPassFilter.type = "lowpass";
      lowPassFilter.frequency.setValueAtTime(14000, audioContext.currentTime); // Allow vocal clarity but remove ultra-high noise

      // Limiter to prevent clipping or distortion of loud sounds
      const limiter = audioContext.createDynamicsCompressor();
      limiter.threshold.setValueAtTime(-3, audioContext.currentTime); // Keep peaks from distorting
      limiter.ratio.setValueAtTime(15, audioContext.currentTime); // High ratio for limiting loud peaks
      limiter.attack.setValueAtTime(0.05, audioContext.currentTime); // Slow attack for smooth limiting
      limiter.release.setValueAtTime(0.5, audioContext.currentTime); // Moderate release for natural fading

      // Connect the audio nodes: mic -> gain -> EQ -> compressor -> high-pass filter -> low-pass filter -> limiter -> destinations
      micSource
        .connect(gainNode)
        .connect(eqNode)
        .connect(compressor)
        .connect(highPassFilter)
        .connect(lowPassFilter)
        .connect(limiter)
        .connect(recordingDestination); // For recording

      // Ensure monitoring stream does not include recorded audio
      micSource.connect(monitoringDestination); // Live monitoring

      // Check if recordingDestination.stream is available
      if (!recordingDestination.stream) {
        throw new Error("Recording destination stream is not available.");
      }

      // Initialize MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(recordingDestination.stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        saveToIndexedDB(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Monitor live audio during recording
      monitoringAudio.srcObject = monitoringDestination.stream;
      monitoringAudio.play();
    } else {
      throw new Error("Audio context is not initialized.");
    }
  } catch (err) {
    console.error("Error accessing microphone or system audio:", err);
    // Handle additional cleanup if needed
    dispatch(isRecording(false)); // Reset recording state in case of error
  }
};
