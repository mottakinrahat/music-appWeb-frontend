import RadioButton from "@/components/svg/RadioButton";
import { useDispatch, useSelector } from "react-redux";
import { isKaraokeRecord } from "@/redux/slice/karaoke/karaokeActionSlice";
import { RootState } from "@/redux/store";

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
            <RadioButton className="fill-accent" />
          </button>
        ) : (
          <button
            onClick={() => dispatch(isKaraokeRecord(true))}
            className="cursor-pointer"
          >
            <RadioButton className="fill-white group-hover:fill-accent" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
