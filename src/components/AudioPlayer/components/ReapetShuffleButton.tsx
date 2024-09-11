import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toggleRepeat } from "@/redux/slice/music/musicActionSlice";
import { RootState } from "@/redux/store";
import { LucideRepeat, LucideRepeat1 } from "lucide-react";
import React from "react";
import { PiShuffle } from "react-icons/pi";
import { TbRepeatOff } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

export interface RepeatShuffleProps {
  // repeat: "repeat-one" | "repeat-all" | "repeat-off" | "shuffle";
  // toggleRepeat: () => void;
}

const RepeatShuffleButton = () => {
  const dispatch = useDispatch();
  const repeat = useSelector((state: RootState) => state.player.repeat);

  const handleToggleRepeat = () => {
    dispatch(toggleRepeat());
  };
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className=" transition " onClick={handleToggleRepeat}>
              {repeat === "repeat-one" ? (
                <LucideRepeat1 className="text-xs" width={24} />
              ) : repeat === "repeat-all" ? (
                <LucideRepeat className="text-sm" width={24} />
              ) : repeat === "shuffle" ? (
                <PiShuffle className="text-2xl" width={24} />
              ) : (
                <TbRepeatOff className="text-2xl" width={24} />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {repeat === "repeat-one"
                ? "Repeat one"
                : repeat === "repeat-all"
                ? "Repeat all"
                : repeat === "shuffle"
                ? "Shuffle"
                : "Repeat off"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default RepeatShuffleButton;
