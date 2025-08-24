"use client";
import { useDispatch, useSelector } from "react-redux";
import CurrentPlayingUsers from "./CurrentPlayingUsers";
import MusicControls from "./MusicControls";
import { MdOutlineMicExternalOn } from "react-icons/md";
import { RootState } from "@/redux/store";
import { karaoke } from "@/redux/slice/karaoke/karaokeActionSlice";
import { FiSliders } from "react-icons/fi";
import SongImportModalHandler from "./SongImportHandaler";
import { showLyric } from "@/redux/slice/music/musicActionSlice";
import MicSVG from "@/components/svg/MicSVG";
import EqualizerSVG from "@/components/svg/EqualizerSVG";
import ArtistSVG from "@/components/svg/ArtistSVG";
import AirPlayButton from "./AirPlayButton";
import ImportDevice from "@/components/svg/ImportDevice";

const KaraokeAirFriendEtc = ({ handleOpenEqualizer }: any) => {
  const dispatch = useDispatch();
  const isKaraoke = useSelector((state: RootState) => state.karaoke.karaoke);
  const musicData = useSelector((state: RootState) => state.musicData);
  const isRecording = useSelector(
    (state: RootState) => state.karaoke.isKaraokeRecord
  );

  const karaokeHandler = () => {
    dispatch(karaoke());
    dispatch(showLyric());
  };
  return (
    <div className="flex flex-wrap items-center gap-3 ">
      <div
        className="text-white cursor-pointer"
        onClick={() => karaokeHandler()}
      >
        {isKaraoke ? (
          <button disabled={isRecording} className="flex gap-[8px] text-accent">
            <MicSVG />
            <h2 className="hidden sm:block">Karaoke mode (On)</h2>
          </button>
        ) : (
          <button
            disabled={musicData.fileData ? true : false}
            className={`flex ${
              musicData.fileData && "text-white/70"
            }  items-center gap-[8px]`}
          >
            <MicSVG />
            <h2 className="hidden sm:block">Karaoke mode (Off)</h2>
          </button>
        )}
      </div>
      <div className="sm:hidden flex gap-3 items-center">
        <div
          onClick={handleOpenEqualizer}
          className="cursor-pointer text-xl select-none text-white"
        >
          <EqualizerSVG />
        </div>
        <div className="sm:text-2xl items-center hidden sm:block">
          <AirPlayButton />
        </div>
        <div title="Import Song" className="cursor-pointer">
          <SongImportModalHandler musicData={musicData} />
        </div>
        <ArtistSVG />
      </div>
      <div>
        <CurrentPlayingUsers addFriends />
      </div>
      <div className="max-md:hidden ">
        <MusicControls handleOpenEqualizer={handleOpenEqualizer} />
      </div>
    </div>
  );
};

export default KaraokeAirFriendEtc;
