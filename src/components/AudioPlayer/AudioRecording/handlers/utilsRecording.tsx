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

export const resumeRecording = async (
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>,
  micStreamRef: MutableRefObject<MediaStream | null>,
  monitoringAudio: HTMLAudioElement,
  audioContext: AudioContext | null,
  dispatch: (action: any) => void,
  musicSource: AudioNode // Ensure `musicSource` is provided as an argument
) => {
  if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
    // Resume the recording
    mediaRecorderRef.current.resume();
    monitoringAudio.play(); // Resume monitoring audio (voice)

    if (audioContext) {
      if (audioContext.state === "suspended") {
        await audioContext.resume();
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
          musicSource.connect(recordingDestination); // Ensure `musicSource` is connected

          // Initialize a new MediaRecorder instance
          const newMediaRecorder = new MediaRecorder(
            recordingDestination.stream
          );

          // Setup event handlers for the new MediaRecorder instance
          newMediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              // Handle the recorded data (e.g., save to a blob or process)
            }
          };

          newMediaRecorder.onstop = () => {
            // Handle the stop event (e.g., finalize recording)
          };

          // Start recording with the new MediaRecorder instance
          newMediaRecorder.start();

          // Update the ref to the new MediaRecorder instance
          mediaRecorderRef.current = newMediaRecorder;

          // Update monitoring audio
          monitoringAudio.srcObject = micStream;
          monitoringAudio.play();
        }
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    }

    dispatch(playImport()); // Resume music playback
    dispatch(isRecording("play")); // Update Redux state to "play"
    console.log("Recording resumed, music and mic resumed");
  } else {
    console.warn("MediaRecorder not paused or not available");
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
