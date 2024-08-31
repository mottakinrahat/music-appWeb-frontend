import React from "react";
import ShowLyricsIcon from "./PlayLIstIcon";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import ReapetShuffleButton from "./ReapetShuffleButton";

// inrerface
export interface RepeatActionButtonProps {
  toggleRepeat: any;
  src: string;
  repeat: "repeat-all" | "repeat-one" | "repeat-off" | "shuffle";
  handleOpenLyrics: () => void;
  isfavorite: boolean;
  handleAddToFavorites: () => void;
}

const RepeatActionButton: React.FC<RepeatActionButtonProps> = ({
  toggleRepeat,
  src,
  repeat,
  handleOpenLyrics,
  isfavorite,
  handleAddToFavorites,
}) => {
  return (
    <div>
      <div className="text-white text-2xl mx-2 ">
        <div className="flex justify-start items-center gap-[24px]">
          <div
            onClick={handleAddToFavorites}
            className="cursor-pointer transition text-white hover:text-accent"
          >
            {isfavorite ? <FaHeart /> : <FaRegHeart />}
          </div>
          <div className="hidden lg:block">
            <ShowLyricsIcon handleOpenLyrics={handleOpenLyrics} />
          </div>
          <ReapetShuffleButton repeat={repeat} toggleRepeat={toggleRepeat} />
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="active:text-gray-300 transition hover:text-accent"
                  onClick={toggleRepeat}
                >
                  {repeat === "repeat-one" ? (
                    <LucideRepeat1 />
                  ) : repeat === "repeat-all" ? (
                    <LucideRepeat />
                  ) : (
                    <PiShuffle />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{`Repeat ${
                  repeat === "repeat-one"
                    ? "on"
                    : repeat === "repeat-all"
                    ? "all"
                    : "off"
                }`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </div>
      </div>
    </div>
  );
};

export default RepeatActionButton;
