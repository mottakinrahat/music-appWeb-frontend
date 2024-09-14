import { useSelector } from "react-redux";

import { FiSliders } from "react-icons/fi";
import AirPlayButton from "./AirPlayButton";
import FXFunctionality from "../FXFunctionality/FXFunctionality";
import MixerFunctionality from "../MixerFunctionality/MixerFunctionality";
import AudioRecorder from "../AudioRecording/AudioRecorder";
import SongImportModalHandler from "./SongImportHandaler";
import { RootState } from "@/redux/store";

interface MusicControlsFace {
  handleOpenEqualizer: () => void;
}

const MusicControls = ({ handleOpenEqualizer }: MusicControlsFace) => {
  const musicData = useSelector((state: RootState) => state.musicData);
  const isKaraoke = useSelector((state: RootState) => state.karaoke.karaoke);

  return (
    <>
      {/* Controls Component */}
      <div
        className={`flex  ${
          isKaraoke ? "justify-between" : "justify-end"
        } sm:justify-between items-center gap-2 lg:gap-4`}
      >
        <div
          onClick={handleOpenEqualizer}
          className="cursor-pointer max-sm:hidden text-xl select-none text-white"
        >
          <FiSliders className="hover:text-accent transition p-[2px] sm:p-0 text-xl sm:text-2xl cursor-pointer" />
        </div>
        <div className="flex sm:text-2xl items-center">
          <AirPlayButton />
        </div>
        <div className="hidden sm:block">
          <SongImportModalHandler musicData={musicData} />
        </div>
        {isKaraoke && (
          <>
            <FXFunctionality />
            <MixerFunctionality />
            <AudioRecorder />
          </>
        )}
      </div>
    </>
  );
};

export default MusicControls;
