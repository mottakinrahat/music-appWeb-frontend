import RadioButton from "@/components/svg/RadioButton";
import RecordingSVG from "@/components/svg/RecordingSVG";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { useSelector } from "react-redux";

interface RecordingProps {
  songDuration: number | any;
}

const RecordingControlls: React.FC<RecordingProps> = ({ songDuration }) => {
  const isRecording = useSelector(
    (state: RootState) => state.karaoke.isKaraokeRecord
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
    let timer!: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1); // Increment the time every second
      }, 1000);
    } else {
      clearInterval(timer); // Clear timer when not recording
    }
    return () => clearInterval(timer); // Cleanup timer when component unmounts
  }, [isRecording]);
  return (
    <div className="absolute justify-center -translate-y-12 max-lg:w-full left-1/2 -translate-x-1/2 items-center">
      <div className="flex gap-6 items-center">
        <FaCirclePlay className="w-6 h-6 text-white" />
        <RecordingSVG />
        <RadioButton className="w-6 h-6 text-white" />
      </div>
      <div className="flex justify-center text-white">
        <p>{formatTime(recordingTime)}</p>
        <span className="mx-1"> / </span>
        <p>{formatTime(parseInt(songDuration))}</p>
      </div>
    </div>
  );
};

export default RecordingControlls;
