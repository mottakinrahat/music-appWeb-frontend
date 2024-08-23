import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import React from "react";
import { IoMdRepeat } from "react-icons/io";

// inrerface
interface RepeatActionButtonProps {
  toggleRepeat: any;
  src: string;
  repeat: boolean;
}

const RepeatActionButton: React.FC<RepeatActionButtonProps> = ({
  toggleRepeat,
  src,
  repeat,
}) => {
  return (
    <div>
      <div className="text-white text-2xl mx-2 hover:text-gray-300">
        <div className="flex justify-start items-center gap-[24px]">
          <Image
            width={100}
            height={100}
            style={{ width: "auto", height: "auto" }}
            src={src}
            alt="LyricsIcon"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="active:text-accent transition-colors"
                  onClick={toggleRepeat}
                >
                  {repeat ? (
                    <IoMdRepeat />
                  ) : (
                    <IoMdRepeat className="text-accent  " />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{`Repeat ${!repeat ? "on" : "off"}`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default RepeatActionButton;
