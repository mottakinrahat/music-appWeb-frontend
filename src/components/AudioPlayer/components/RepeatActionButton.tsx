import React from "react";
import ShowLyricsIcon from "./PlayLIstIcon";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import ReapetShuffleButton from "./ReapetShuffleButton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
  handleOpenLyrics,
  isfavorite,
  handleAddToFavorites,
}) => {
  const isKaraoke = useSelector((state: RootState) => state.karaoke.karaoke);
  const importedUrl: any = useSelector(
    (state: RootState) => state.musicData.fileData
  );

  return (
    <div>
      <div className="text-white mt-4 min-[400px]:mt-0 text-2xl mx-2 ">
        <div className="flex justify-start items-center gap-4 sm:gap-[24px]">
          {isKaraoke ? (
            <>
              <ReapetShuffleButton />
            </>
          ) : (
            <>
              <button
                disabled={importedUrl}
                onClick={handleAddToFavorites}
                className={`hidden min-[340px]:block transition text-white disabled:text-gray-400 hover:text-accent ${
                  importedUrl ? "cursor-not-allowed" : "cursor-pointer "
                }`}
              >
                {isfavorite ? (
                  <FaHeart className="p-[2px] sm:p-0" />
                ) : (
                  <FaRegHeart className="p-[2px] sm:p-0" />
                )}
              </button>
              <button className="" disabled={importedUrl}>
                <ShowLyricsIcon handleOpenLyrics={handleOpenLyrics} />
              </button>
              <ReapetShuffleButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepeatActionButton;
