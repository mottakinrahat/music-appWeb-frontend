import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

interface AudioVisualizerProps {
  audioUrl: string;
  currentTime: number;
  handleSeek: (value: number[]) => void;
}

const AudioRecordSlider: React.FC<AudioVisualizerProps> = ({
  audioUrl,
  currentTime,
  handleSeek,
}) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

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

      waveSurferInstance.load(audioUrl);
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
  }, [audioUrl]); // Recreate WaveSurfer instance when audioUrl changes

  useEffect(() => {
    if (waveSurfer && waveSurfer.getDuration()) {
      waveSurfer.seekTo(currentTime / waveSurfer.getDuration());
    }
  }, [currentTime, waveSurfer]);

  return (
    <div className="w-full h-5 relative overflow-hidden">
      {/*for development mode */}
      <div className="-mt-5" ref={waveformRef} />
      {/*for production mode */}
      {/* <div ref={waveformRef} /> */}
    </div>
  );
};

export default AudioRecordSlider;
