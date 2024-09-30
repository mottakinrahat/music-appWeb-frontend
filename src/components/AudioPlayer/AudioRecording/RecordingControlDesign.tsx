// MediaControls.tsx
import RadioButton from "@/components/svg/RadioButton";
import RecordingSVG from "@/components/svg/RecordingSVG";
import { playRecording } from "@/redux/slice/karaoke/karaokeActionSlice";
import React from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { stopRecording } from "./handlers/utilsRecording";
import * as Tone from "tone";

interface MediaControlsProps {
  getSongLink: string;
  getIsRecordingState: string | boolean;
  isPlaying: boolean;
  playRecord: boolean;
  recordedUrl?: string;
  togglePlayPause: () => void;
  handleRecordingState: () => void;
  mediaRecorderRef: React.RefObject<Tone.Recorder>;
  micStreamRef: React.RefObject<MediaStream>;
  monitoringAudio: HTMLAudioElement;
  audioRef: React.RefObject<ReactPlayer>;
}

const RecordingControlDesign: React.FC<MediaControlsProps> = ({
  getSongLink,
  getIsRecordingState,
  isPlaying,
  playRecord,
  recordedUrl,
  togglePlayPause,
  handleRecordingState,
  mediaRecorderRef,
  micStreamRef,
  monitoringAudio,
  audioRef,
}) => {
  const dispatch = useDispatch();
  

  return (
    <div className="flex gap-6 items-center">
      <div
        className={`${
          getSongLink.length > 1 && !getIsRecordingState
            ? "cursor-pointer text-white"
            : "text-[#aaaaaa] cursor-not-allowed"
        }`}
        title={getSongLink.length > 1 ? "Play/Pause" : "Start recording first."}
        onClick={() =>
          getSongLink.length > 1 &&
          !getIsRecordingState &&
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
        title="Stop recording"
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
  );
};

export default RecordingControlDesign;
