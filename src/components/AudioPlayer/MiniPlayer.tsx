/* eslint-disable @next/next/no-img-element */
"use client";
import { usePathname } from "next/navigation";
import PlayButtons from "./components/PlayButtons";
import { useEffect, useState } from "react";
import { FiMaximize2 } from "react-icons/fi";
import Link from "next/link";
import placeHolder from "@/assets/etc/png/song.jpg";
import { GradientRange } from "../ui/slider";
import { formatTime } from "@/utils/FormatTime";
import Volumn from "./components/Volumn";
import AirPlayButton from "./components/AirPlayButton";
import PlayLIstIcon from "./components/PlayLIstIcon";

interface MiniPlayerProps {
  handleNext: () => void;
  handleNextTenSecond?: () => void;
  handlePreviousTenSecond?: () => void;
  handlePlayPause: () => void;
  handlePrev: () => void;
  playing: boolean;
  handleVolumeChange: (value: number[]) => void;
  album: any;
  artist: string;
  handleMute: () => void;
  artwork: string;
  id: any;
  title: string;
  volume: number;
  duration: number;
  currentTime: number;
  handleSeek: (value: number[]) => void;
}

const MiniPlayer = ({
  handleNext,
  handleNextTenSecond,
  handlePreviousTenSecond,
  handlePlayPause,
  handlePrev,
  handleVolumeChange,
  album,
  playing,
  artist,
  artwork,
  handleMute,
  id,
  title,
  volume,
  currentTime,
  duration,

  handleSeek,
}: MiniPlayerProps) => {
  const [artWork, setArtwork] = useState(artwork);
  const pathname = usePathname();
  const [showControl, setShowControl] = useState(true);
  //   console.log(artwork);

  useEffect(() => {
    // Show the player only if the path matches `/music/:id`
    if (pathname.startsWith("/music/")) {
      setShowControl(true);
    } else {
      setShowControl(false);
    }

    if (artwork.length > 0) {
      setArtwork(artwork);
    } else {
      setArtwork(placeHolder.src);
    }
  }, [pathname, artWork, artwork]);

  if (!showControl)
    return (
      <div className="h-28 bg-[#E8E8E8] w-full ">
        <div className="container h-full justify-between flex items-center  ">
          <div>
            <div className="flex flex-col justify-end h-full gap-2 lg:gap-[24px]  ">
              <div className="w-full flex justify-between items-center">
                <div className=" flex items-center gap-2">
                  <img
                    // style={{ width: "auto", height: "auto" }}
                    src={artwork ? artwork : placeHolder.src}
                    alt="Album Art"
                    // height={80}
                    // width={80}
                    className="w-10 h-10 md:h-16 md:w-16 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-base md:text-xl gap-2 font-semibold mb-1">
                      {title}
                    </h2>
                    <div className="flex lg:items-center max-lg:flex-col flex-wrap ">
                      <p>{artist}</p>
                      <div className="flex items-center max-md:hidden gap-2">
                        <div className="size-2 bg-black rounded-full ml-2"></div>
                        <p>
                          Album:{" "}
                          <Link href={"#"} className="underline">
                            {album}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div>
              <PlayButtons
                handleNext={handleNext}
                handleNextTenSecond={handleNextTenSecond}
                handlePlayPause={handlePlayPause}
                handlePreviousTenSecond={handlePreviousTenSecond}
                handlePrev={handlePrev}
                playing={playing}
              />
            </div>
            <div className="lg:absolute w-1/2 flex-col max-w-sm justify-center xl:-translate-y-6 max-lg:w-full flex top-[5.8rem] lg:left-1/2 lg:-translate-x-1/2 items-center">
              <GradientRange
                defaultValue={[currentTime]}
                max={duration}
                min={0}
                value={[currentTime]}
                onValueChange={handleSeek}
                className="w-full max-w-sm"
              />
              <div className="w-full">
                <div className="flex justify-between mt-1 gap-3 items-center font-semibold">
                  <span className="text-textSecondary text-sm">
                    {formatTime(currentTime)}
                  </span>
                  <span className="text-textSecondary text-sm">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <div>
              <Volumn
                handleMute={handleMute}
                handleVolumeChange={handleVolumeChange}
                volume={volume}
              />
            </div>

            <PlayLIstIcon />

            <AirPlayButton />

            <Link
              href={`/music/${id}`}
              className="h-10 w-10 flex z-50 hover:text-textPrimary justify-center items-center cursor-pointer"
            >
              <FiMaximize2 />
            </Link>
          </div>
        </div>
      </div>
    );
  else return <></>;
};

export default MiniPlayer;
