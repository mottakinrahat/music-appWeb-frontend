"use client";
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
  playing,
  handleNextTenSecond,
}: PlayButtonsFace) => {
  const pathname = usePathname();
  const [showControl, setShowControl] = useState(true);

  useEffect(() => {
    // Show the player only if the path matches `/music/:id`
    if (pathname.startsWith("/music/")) {
      setShowControl(true);
    } else {
      setShowControl(false);
    }
  }, [pathname]);

  return (
    <div className="lg:absolute justify-center xl:-translate-y-6 max-lg:w-full flex lg:left-1/2 lg:-translate-x-1/2 items-center">
      <div className="flex justify-center items-center">
        {showControl && (
          <button
            onClick={handlePreviousTenSecond}
            className="text-white group text-3xl mx-2 transition hover:text-gray-300 flex items-center gap-1"
          >
            <Image
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
              src={PreviousIcon.src}
              alt="PreviousIcon"
              className="group-hover:opacity-70"
            />{" "}
            <span className="text-[16px]">10s</span>
          </button>
        )}
        <button
          onClick={handlePrev}
          className={` text-lg  ${
            showControl
              ? "text-white transition hover:text-gray-300"
              : "text-gray-600 transition hover:text-black"
          }`}
        >
          <MdOutlineSkipPrevious className="h-7 w-7" />
        </button>
        <button
          onClick={handlePlayPause}
          className={` text-lg  flex items-center justify-center mx-4  ${
            showControl
              ? "text-white transition hover:text-gray-300"
              : "text-gray-600 transition hover:text-black"
          }`}
        >
          {playing ? (
            <MdPauseCircle className="h-10 w-10" />
          ) : (
            <IoMdPlayCircle className="h-10 w-10" />
          )}
        </button>
        <button
          onClick={handleNext}
          className={` text-lg  ${
            showControl
              ? "text-white transition hover:text-gray-300"
              : "text-gray-600 transition hover:text-black"
          }`}
        >
          <MdOutlineSkipNext className="h-7 w-7" />
        </button>
        {showControl && (
          <button
            onClick={handleNextTenSecond}
            className="text-white group text-3xl mx-2 transition hover:text-gray-300 flex items-center gap-1"
          >
            <span className="text-[16px]">10s</span>{" "}
            <Image
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
              src={NextIcon.src}
              alt="NextIcon"
              className="group-hover:opacity-70"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayButtons;
