import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideRepeat, LucideRepeat1 } from "lucide-react";
import React from "react";
import { PiShuffle } from "react-icons/pi";
import PlayLIstIcon from "./PlayLIstIcon";
import { FaRegHeart } from "react-icons/fa6";

// inrerface
export interface RepeatActionButtonProps {
  toggleRepeat: any;
  src: string;
  repeat: "repeat-all" | "repeat-one" | "repeat-off";
  handlePlayListOpen: () => void;
  isfavorite: boolean;
  handleAddToFavorites: () => void;
}

const RepeatActionButton: React.FC<RepeatActionButtonProps> = ({
  toggleRepeat,
  src,
  repeat,
  handlePlayListOpen,
  isfavorite,
  handleAddToFavorites,
}) => {
  return (
    <div>
      <div className="text-white text-2xl mx-2 ">
        <div className="flex justify-start items-center gap-[24px]">
          <div>
            {
              <FaRegHeart
                onClick={handleAddToFavorites}
                className="cursor-pointer"
              />
            }
          </div>
          <div className="hidden lg:block">
            <PlayLIstIcon handlePlayListOpen={handlePlayListOpen} />
          </div>
          <TooltipProvider>
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
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default RepeatActionButton;
