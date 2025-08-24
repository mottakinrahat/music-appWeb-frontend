import Image from "next/image";
import PreviousIcon from "@/assets/icons/arrow_back (1).svg";
import NextIcon from "@/assets/icons/arrow_back.svg";
import { IoMdPlayCircle } from "react-icons/io";
import {
  MdOutlineSkipNext,
  MdOutlineSkipPrevious,
  MdPauseCircle,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface PlayButtonsFace {
  handlePreviousTenSecond?: () => void;
  handleNextTenSecond?: () => void;
  handlePrev: () => void;
  handlePlayPause: () => void;
  handleNext: () => void;
  playing: boolean;
}

const PlayButtons = ({
  handleNext,
  handlePlayPause,
  handlePrev,
  handlePreviousTenSecond,
  handleNextTenSecond,
}: PlayButtonsFace) => {
  const pathname = usePathname();
  const [showControl, setShowControl] = useState(true);
  const play = useSelector((state: RootState) => state.player.playing);
  const importSong = useSelector(
    (state: RootState) => state.musicData.fileData
  );

  useEffect(() => {
    // Show the player only if the path matches `/music/:id`
    if (pathname.startsWith("/music/")) {
      setShowControl(true);
    } else if (pathname.startsWith("/offline")) {
      setShowControl(true);
    } else {
      setShowControl(false);
    }
  }, [pathname]);

  return (
    <div
      className={`absolute justify-center -translate-y-6  ${
        !showControl
          ? "top-8 sm:top-10 absolute "
          : "-translate-y-[60px] lg:-translate-y-12"
      } max-lg:w-full flex left-1/2 -translate-x-1/2 items-center`}
    >
      <div className="flex md:gap-4 justify-center items-center">
        {showControl && (
          <button
            onClick={handlePreviousTenSecond}
            className="text-white group gap-1 text-3xl mx-4 sm:mx-2 transition active:text-gray-300 flex items-center"
          >
            <Image
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
              src={PreviousIcon.src}
              alt="PreviousIcon"
              className="group-active:opacity-70"
            />{" "}
            <span className="text-[16px]">10s</span>
          </button>
        )}
        <button
          disabled={importSong ? true : false}
          onClick={handlePrev}
          className={` text-lg disabled:text-gray-400 ${
            showControl
              ? "text-white transition active:text-gray-300"
              : "text-[#828282] transition active:text-textPrimary"
          }`}
        >
          <MdOutlineSkipPrevious className="h-7 w-7" />
        </button>
        <button
          onClick={handlePlayPause}
          className={` text-lg  flex items-center justify-center mx-5 sm:mx-4  ${
            showControl
              ? "text-white transition active:text-gray-300"
              : "text-[#828282] transition active:text-textPrimary"
          }`}
        >
          {play ? (
            <MdPauseCircle className="h-12 w-12 sm:h-10 sm:w-10" />
          ) : (
            <IoMdPlayCircle className="h-12 w-12 sm:h-10 sm:w-10" />
          )}
        </button>
        <button
          disabled={importSong ? true : false}
          onClick={handleNext}
          className={` text-lg disabled:text-gray-400 ${
            showControl
              ? "text-white transition active:text-gray-300"
              : "text-[#828282] transition active:text-textPrimary"
          }`}
        >
          <MdOutlineSkipNext className="h-7 w-7" />
        </button>
        {showControl && (
          <button
            onClick={handleNextTenSecond}
            className="text-white group gap-1 text-3xl mx-4 sm:mx-2 transition active:text-gray-300 flex items-center"
          >
            <span className="text-[16px]">10s</span>{" "}
            <Image
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
              src={NextIcon.src}
              alt="NextIcon"
              className="group-active:opacity-70"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayButtons;
