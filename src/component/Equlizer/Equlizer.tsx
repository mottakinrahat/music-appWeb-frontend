import { useEffect } from "react";

const useJazzAudioProcessing = (audioElement: HTMLAudioElement | null) => {
  useEffect(() => {
    if (!audioElement) return;

    // Create Audio Context
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    // Check if the audio context is suspended and resume it if necessary
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // Create a MediaElementAudioSourceNode
    const source = audioContext.createMediaElementSource(audioElement);

    // Create a BiquadFilterNode for warmth
    const filter = audioContext.createBiquadFilter();
    filter.type = "peaking"; // Peaking filter for midrange enhancement
    filter.frequency.value = 1000; // Adjust frequency as needed
    filter.gain.value = 5; // Boost the gain to enhance warmth

    // Connect nodes
    source.connect(filter);
    filter.connect(audioContext.destination);

    // Log connection for debugging
    console.log("Audio processing setup complete.");

    // Cleanup on unmount
    return () => {
      filter.disconnect();
      source.disconnect();
      audioContext.close();
    };
  }, [audioElement]);
};

export default useJazzAudioProcessing;
