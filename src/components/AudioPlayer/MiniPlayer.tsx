"use client";
import { usePathname } from "next/navigation";
import PlayButtons from "./components/PlayButtons";
import { useEffect, useState } from "react";
import LandingMusicCard from "../Card/LandingMusicCard";
import Link from "next/link";
import placeHolder from "@/assets/etc/png/song.jpg";

interface MiniPlayerProps {
  handleNext: () => void;
  handleNextTenSecond?: () => void;
  handlePreviousTenSecond?: () => void;
  handlePlayPause: () => void;
  handlePrev: () => void;
  playing: boolean;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  album: any;
  artist: string;
  handleMute: () => void;
  artwork: string;
  id: any;
  title: string;
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
}: MiniPlayerProps) => {
  const pathname = usePathname();
  const [showControl, setShowControl] = useState(true);
  const [artWork, setArtwork] = useState(artwork);
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
      <div className="h-28 bg-white w-full ">
        <div className="container h-full flex items-center  ">
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
            <PlayButtons
              handleNext={handleNext}
              handleNextTenSecond={handleNextTenSecond}
              handlePlayPause={handlePlayPause}
              handlePreviousTenSecond={handlePreviousTenSecond}
              handlePrev={handlePrev}
              playing={playing}
            />
          </div>
        </div>
      </div>
    );
  else return <></>;
};

export default MiniPlayer;
