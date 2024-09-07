"use client";
import { useDispatch, useSelector } from "react-redux";
import CurrentPlayingUsers from "./CurrentPlayingUsers";
import MusicControls from "./MusicControls";
import { MdOutlineMicExternalOn } from "react-icons/md";
import { karaoke } from "@/redux/slice/music/musicActionSlice";
import { AppDispatch, RootState } from "@/redux/store";

const KaraokeAirFriendEtc = ({
  karaokeOn,
  SetKaraokeOn,
  handleOpenEqualizer,
}: any) => {
  const dispatch = useDispatch();
  const isKaraoke = useSelector((state: RootState) => state.player.karaoke);

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
            <h2>Karaoke mode (On)</h2>
          </div>
        ) : (
          <div className="flex  items-center gap-[8px]">
            <MdOutlineMicExternalOn className="text-2xl" />
            <h2>Karaoke mode (Off)</h2>
          </div>
        )}
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
