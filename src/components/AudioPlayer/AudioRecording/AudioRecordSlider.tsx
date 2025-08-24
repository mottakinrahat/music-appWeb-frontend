import { RootState } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";

interface AudioVisualizerProps {
  audioUrl: string;
  currentTime: number;
}

const AudioRecordSlider: React.FC<AudioVisualizerProps> = ({
  audioUrl,
  currentTime,
}) => {
  const recordedUrl = useSelector(
    (state: RootState) => state.karaoke.recordedUrl
  );
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
  const [urlToLoad, setUrlToLoad] = useState<string>(audioUrl);

  useEffect(() => {
    if (recordedUrl) {
      // Use recordedUrl from Redux if available
      setUrlToLoad(recordedUrl);
    } else {
      // Fallback to audioUrl from props
      setUrlToLoad(audioUrl);
    }
  }, [recordedUrl, audioUrl]);

  useEffect(() => {
    let waveSurferInstance: WaveSurfer | null = null;

    if (waveformRef.current) {
      // Create a new WaveSurfer instance
      waveSurferInstance = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "gray",
        progressColor: "white",
        barWidth: 2,
        barRadius: 2,
        height: 20,
        barGap: 5,
        cursorWidth: 1,
        normalize: true,
      });

      waveSurferInstance?.load(urlToLoad);
      setWaveSurfer(waveSurferInstance); // Store the instance in state
    }

    // Cleanup function
    return () => {
      if (waveSurferInstance && waveSurferInstance.getDuration()) {
        try {
          waveSurferInstance.destroy();
        } catch (error) {
          console.error("Error destroying WaveSurfer instance:", error);
        }
      }
    };
  }, [urlToLoad]); // Recreate WaveSurfer instance when urlToLoad changes

  useEffect(() => {
    if (waveSurfer && waveSurfer.getDuration() && waveSurfer?.seekTo) {
      waveSurfer?.seekTo(currentTime / waveSurfer.getDuration());
    }
  }, [currentTime, waveSurfer]);

  return (
    <>
      <div className="w-full h-5 relative overflow-hidden">
        <div ref={waveformRef} />
      </div>
    </>
  );
};

export default AudioRecordSlider;
