import React from "react";
import { FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import DownloadIcon from "../../assets/icons/download.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import QueueMusicIcon from "../../assets/icons/queue_music.svg";
import VolumeIcon from "../../assets/icons/volume_up.svg";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { DropDownBtn } from "./DropDownBtn";
import { Switch } from "@/components/ui/switch";
const VolumeSettingDownRepeat = ({ volume, handleVolumeChange }: any) => {
  const [eq, setEq] = React.useState(false);
  const settingContent = (
    <>
      <ul className="flex flex-col gap-[16px] p-[16px]">
        <li className="flex justify-between items-center">
          <span> Playback speed:</span> <span className="font-bold">0.25</span>
        </li>
        <li className="flex justify-between items-center">
          Sound quality: <span className="font-bold">High</span>
        </li>
        <li className="flex justify-between items-center">
          EQ:{" "}
          <span>
            {" "}
            <Switch onClick={() => setEq(!eq)} id="airplane-mode" />
          </span>
        </li>
      </ul>
    </>
  );
  return (
    <div>
      <div className="flex justify-center items-center gap-[24px]">
        <div className="flex justify-end items-center ">
          {volume === 0 ? (
            <button className="text-white text-3xl mx-2 hover:text-gray-300">
              <FaVolumeMute />
            </button>
          ) : volume < 0.5 ? (
            <button className="text-white text-3xl mx-2 hover:text-gray-300">
              <FaVolumeDown />
            </button>
          ) : (
            <button className="text-white text-3xl mx-2 hover:text-gray-300">
              <img src={VolumeIcon.src} alt="VolumeIcon" />
            </button>
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            className="w-1/2 mx-2 accent-white"
            onChange={handleVolumeChange}
          />
        </div>
        <div>
          <img src={DownloadIcon.src} alt="DownloadIcon" />
        </div>
        <div>
          <DropDownBtn
            dropDownContent={settingContent}
            buttonContent={
              <>
                <img src={SettingsIcon.src}  alt="sdf" />
              </>
            }
          />
        </div>
        <div>
          <img src={QueueMusicIcon.src} alt="QueueMusicIcon" />
        </div>
      </div>
    </div>
  );
};

export default VolumeSettingDownRepeat;
