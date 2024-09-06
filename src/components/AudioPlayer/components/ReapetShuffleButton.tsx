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
  className?: string;
}

const RepeatShuffleButton: React.FC<RepeatShuffleProps> = ({ className }) => {
  const dispatch = useDispatch();
  const repeat = useSelector((state: RootState) => state.player.repeat);

  const handleToggleRepeat = () => {
    dispatch(toggleRepeat());
  };
  return (
    <div className={`${className} flex items-center justify-center`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className=" transition flex items-center justify-center"
              onClick={handleToggleRepeat}
            >
              {repeat === "repeat-one" ? (
                <LucideRepeat1 className="text-xs p-[2px] sm:p-0" />
              ) : repeat === "repeat-all" ? (
                <LucideRepeat className="text-sm p-[2px] sm:p-0" />
              ) : repeat === "shuffle" ? (
                <PiShuffle className=" text-xl sm:text-2xl " />
              ) : (
                <TbRepeatOff className=" text-xl sm:text-2xl " />
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
