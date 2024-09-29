import { useDispatch, useSelector } from "react-redux";
import { isKaraokeRecord } from "@/redux/slice/karaoke/karaokeActionSlice";
import { RootState } from "@/redux/store";
import { PiRadioButtonLight } from "react-icons/pi";

const AudioRecorder = () => {
  const dispatch = useDispatch();
  const isKaraokeRecording = useSelector(
    (state: RootState) => state.karaoke.isKaraokeRecord
  );
  return (
    <div>
      <div className="flex items-center group">
        {isKaraokeRecording ? (
          <button
            onClick={() => dispatch(isKaraokeRecord(false))}
            className="cursor-pointer"
          >
            <PiRadioButtonLight className="text-white w-6 h-6 hover:text-accent" />
          </button>
        ) : (
          <button
            onClick={() => dispatch(isKaraokeRecord(true))}
            className="cursor-pointer"
          >
            <PiRadioButtonLight className="text-white w-6 h-6 hover:text-accent" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
