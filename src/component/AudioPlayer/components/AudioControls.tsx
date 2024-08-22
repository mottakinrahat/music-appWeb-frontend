import React, { forwardRef, Ref } from "react";

interface AudioControlsProps {
  src: string;
  onTimeUpdate?: React.ChangeEventHandler<HTMLAudioElement>;
  autoPlay?: boolean;
  onLoadedMetadata?: any;
  onEnded?: any;
}

const AudioControls = forwardRef<HTMLAudioElement, AudioControlsProps>(
  ({ src, onTimeUpdate, autoPlay = false, onLoadedMetadata, onEnded }, ref) => {
    return (
      <audio
        ref={ref}
        src={src}
        onTimeUpdate={onTimeUpdate}
        autoPlay={autoPlay}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      >
        Your browser does not support the audio element.
      </audio>
    );
  }
);

AudioControls.displayName = "AudioControls";

export default AudioControls;
