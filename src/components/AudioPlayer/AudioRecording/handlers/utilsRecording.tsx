import { isRecording } from "@/redux/slice/karaoke/karaokeActionSlice";
import { pauseSong, playImport } from "@/redux/slice/music/musicActionSlice";
import { MutableRefObject, RefObject } from "react";
import ReactPlayer from "react-player";

// audioUtils.ts
export async function fetchReverbBuffer(audioContext: AudioContext) {
  const response = await fetch("/path/to/reverb-impulse-response.wav");
  const arrayBuffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
}

export const pauseRecording = (
  mediaRecorderRef: React.RefObject<MediaRecorder>,
  micStreamRef: MutableRefObject<MediaStream | null>,
  monitoringAudio: HTMLAudioElement,
  audioRef: React.RefObject<ReactPlayer | null>,
  dispatch: (action: any) => void,
  pauseSong: () => void
) => {
  if (!mediaRecorderRef.current) {
    console.warn("MediaRecorder is not initialized");
    return;
  }

  if (mediaRecorderRef.current.state === "recording") {
    // Pause the recording
    mediaRecorderRef.current.pause();
    monitoringAudio.pause(); // Pause monitoring audio (voice)

    if (audioRef.current) {
      dispatch(pauseSong()); // Pause music playback
    }

    // Stop the mic stream (pause the mic)
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }

    dispatch(isRecording("pause")); // Update Redux state to "pause"
    console.log("Recording paused, music, and mic paused");
  } else if (mediaRecorderRef.current.state === "paused") {
    console.warn("MediaRecorder is already paused");
  } else {
    console.warn("MediaRecorder is not in a recording state");
  }
};

// Define the function and its parameters
export const resumeRecording = async (
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>,
  micStreamRef: MutableRefObject<MediaStream | null>,
  monitoringAudio: HTMLAudioElement,
  audioContext: AudioContext | null,
  dispatch: (action: any) => void,
  musicSource: AudioNode
) => {
  if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
    // Resume the recording
    mediaRecorderRef.current.resume();
    monitoringAudio.play(); // Resume monitoring audio (voice)

    // Resume music playback
    dispatch(playImport());

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

        // Create a new MediaRecorder instance
        const newMediaRecorder = new MediaRecorder(recordingDestination.stream);
        newMediaRecorder.start(); // Restart recording

        // Update mediaRecorderRef
        mediaRecorderRef.current = newMediaRecorder;

        monitoringAudio.srcObject = micStream; // Update monitoring audio
        monitoringAudio.play();
      }
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }

    // Update Redux state to "play"
    dispatch(isRecording("play"));
    console.log("Recording resumed, music and mic resumed");
  } else {
    console.warn("MediaRecorder not paused");
  }
};

export const stopRecording = (
  mediaRecorderRef: React.RefObject<MediaRecorder>,
  micStreamRef: MutableRefObject<MediaStream | null>,
  monitoringAudio: HTMLAudioElement,
  audioRef: React.RefObject<ReactPlayer | null>,
  dispatch: (action: any) => void,
  getIsRecordingState: boolean | string
) => {
  if (
    getIsRecordingState === true ||
    getIsRecordingState === "pause" ||
    getIsRecordingState === "play"
  ) {
    dispatch(isRecording(false));
    dispatch(pauseSong());
    if (audioRef.current) {
      dispatch(pauseSong());
    }

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      monitoringAudio.pause();
      isRecording(false);
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
  }
};
