"use client";
import { useDispatch, useSelector } from "react-redux";
import CurrentPlayingUsers from "./CurrentPlayingUsers";
import MusicControls from "./MusicControls";
import { MdOutlineMicExternalOn } from "react-icons/md";
import { AppDispatch, RootState } from "@/redux/store";
import { karaoke } from "@/redux/slice/karaoke/karaokeActionSlice";
import ImportDevice from "@/components/svg/ImportDevice";
import { TbDeviceIpadX } from "react-icons/tb";

const KaraokeAirFriendEtc = ({ handleOpenEqualizer }: any) => {
  const dispatch = useDispatch();
  const isKaraoke = useSelector((state: RootState) => state.karaoke.karaoke);
  const musicData = useSelector((state: RootState) => state.musicData);

  const karaokeHandler = () => {
    dispatch(karaoke());
  };
  return (
    <div className="flex flex-wrap items-center gap-3 ">
      <div
        className="text-white cursor-pointer"
        onClick={() => karaokeHandler()}
      >
        {isKaraoke ? (
          <div className="flex gap-[8px] text-accent">
            <MdOutlineMicExternalOn className="text-2xl" />
            <h2 className="hidden sm:block">Karaoke mode (On)</h2>
          </div>
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
      {/* <div className="sm:hidden block"></div> */}
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
