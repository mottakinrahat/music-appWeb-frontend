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
  // repeat,
  handleOpenLyrics,
  isfavorite,
  handleAddToFavorites,
}) => {
  return (
    <div>
      <div className="text-white mt-4 min-[400px]:mt-0 text-2xl mx-2 ">
        <div className="flex justify-start items-center gap-4 sm:gap-[24px]">
          <div
            onClick={handleAddToFavorites}
            className="cursor-pointer hidden min-[340px]:block transition text-white hover:text-accent"
          >
            {isfavorite ? (
              <FaHeart className="p-[2px] sm:p-0" />
            ) : (
              <FaRegHeart className="p-[2px] sm:p-0" />
            )}
          </div>
          <div className="">
            <ShowLyricsIcon handleOpenLyrics={handleOpenLyrics} />
          </div>
          <ReapetShuffleButton />
        </div>
      </div>
    </div>
  );
};

export default RepeatActionButton;
