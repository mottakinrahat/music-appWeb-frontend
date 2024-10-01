import { useSelector } from "react-redux";
import { FiSliders } from "react-icons/fi";
import AirPlayButton from "./AirPlayButton";
import FXFunctionality from "../FXFunctionality/FXFunctionality";
import MixerFunctionality from "../MixerFunctionality/MixerFunctionality";
import AudioRecorder from "../AudioRecording/AudioRecorder";
import SongImportModalHandler from "./SongImportHandaler";
import { RootState } from "@/redux/store";
import EqualizerSVG from "@/components/svg/EqualizerSVG";
import ArtistSVG from "@/components/svg/ArtistSVG";
import PlayListSVG from "@/components/svg/PlayListSVG";

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
        <div title="EQ"
          onClick={handleOpenEqualizer}
          className="cursor-pointer max-sm:hidden"
        >
          <EqualizerSVG />
        </div>
        <div title="Air Play" className="flex sm:text-2xl items-center">
          <AirPlayButton />
        </div>
        <div title="Import Song" className="hidden sm:block cursor-pointer">
          <SongImportModalHandler musicData={musicData} />
        </div>
        <button title="Artist" className="cursor-pointer hidden sm:block">
          <ArtistSVG />
        </button>
        <button title="Play List" className="cursor-pointer hidden sm:block">
          <PlayListSVG />
        </button>
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
