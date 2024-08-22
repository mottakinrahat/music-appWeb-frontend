import Image from "next/image";
import React from "react";

// inrerface
interface RepeatActionButtonProps {
  toggleRepeat: any;
  src: string;
  repeat: boolean;
}

const RepeatActionButton: React.FC<RepeatActionButtonProps> = ({ toggleRepeat, src, repeat }) => {
  return (
    <div>
      <button className="text-white text-3xl mx-2 hover:text-gray-300">
        <div className="flex justify-start items-center gap-[24px]">
          <Image width={100} height={100} style={{ width: "auto", height: "auto" }} src={src} alt="LyricsIcon" />
          <div onClick={toggleRepeat}>
            {repeat ? (
              <Image width={100} height={100} style={{ width: "auto", height: "auto" }} src={src} alt="RepeatIcon" />
            ) : (
              <Image
                width={100}
                height={100}
                style={{ width: "auto", height: "auto" }}
                src={src}
                className="bg-red-200 h-4 w-4"
                alt="RepeatIcon"
              />
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default RepeatActionButton;
