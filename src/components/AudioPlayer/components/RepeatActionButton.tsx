import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbRepeatOff } from "react-icons/tb";
import { LucideRepeat, LucideRepeat1, LucideRepeat2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { IoMdRepeat } from "react-icons/io";

// inrerface
export interface RepeatActionButtonProps {
  toggleRepeat: any;
  src: string;
  repeat: "repeat-all" | "repeat-one" | "repeat-off";
}

const RepeatActionButton: React.FC<RepeatActionButtonProps> = ({
  toggleRepeat,
  src,
  repeat,
}) => {
  return (
    <div>
      <div className="text-white text-2xl mx-2 active:text-gray-300">
        <div className="flex justify-start items-center gap-[24px]">
          <div className="hidden lg:block">
            <Image
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
              src={src}
              alt="LyricsIcon"
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div onClick={toggleRepeat}>
                  {repeat === "repeat-one" ? (
                    <LucideRepeat1 />
                  ) : repeat === "repeat-all" ? (
                    <LucideRepeat />
                  ) : (
                    <TbRepeatOff />
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
