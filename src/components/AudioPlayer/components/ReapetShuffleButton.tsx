import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideRepeat, LucideRepeat1 } from "lucide-react";
import React from "react";
import { PiShuffle } from "react-icons/pi";
import { TbRepeatOff } from "react-icons/tb";

export interface RepeatShuffleProps {
  repeat: "repeat-one" | "repeat-all" | "repeat-off" | "shuffle";
  toggleRepeat: () => void;
}

const RepeatShuffleButton = ({ repeat, toggleRepeat }: RepeatShuffleProps) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className=" transition " onClick={toggleRepeat}>
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
