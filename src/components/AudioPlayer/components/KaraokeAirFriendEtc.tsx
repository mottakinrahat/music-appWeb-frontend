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
            <MdOutlineMicExternalOn className="text-2xl" />
            <h2 className="hidden sm:block">Karaoke mode (On)</h2>
          </button>
        ) : (
          <button
            disabled={musicData.fileData ? true : false}
            className={`flex ${
              musicData.fileData && "text-white/70"
            }  items-center gap-[8px]`}
          >
            <MdOutlineMicExternalOn className="text-2xl" />
            <h2 className="hidden sm:block">Karaoke mode (Off)</h2>
          </button>
        )}
      </div>
      <div className="sm:hidden flex gap-3 items-center">
        <div
          onClick={handleOpenEqualizer}
          className="cursor-pointer text-xl select-none text-white"
        >
          <FiSliders className="hover:text-accent transition p-[2px] sm:p-0 text-xl sm:text-2xl cursor-pointer" />
        </div>
        <SongImportModalHandler musicData={musicData} />
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
