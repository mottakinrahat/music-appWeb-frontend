/* eslint-disable @next/next/no-img-element */
import micOnIcon from "../../assets/icons/mic_external_on.svg";
import MusicControls from "./MusicControls";

const KaraokeAirFriendEtc = ({
  karaokeOn,
  SetKaraokeOn,
  handleOpenEqualizer,
}: any) => {
  return (
    <div className="flex items-center gap-3 ">
      <div
        className="text-white cursor-pointer"
        onClick={() => SetKaraokeOn(!karaokeOn)}
      >
        {karaokeOn ? (
          <div className="flex gap-[8px]">
            <img src={micOnIcon.src} alt="micOnIcon" />
            <h2>Karaoke mode (on)</h2>
          </div>
        ) : (
          <div className="flex  items-center gap-[8px]">
            <img src={micOnIcon.src} alt="micOnIcon" />
            <h2>Karaoke mode (Off)</h2>
          </div>
        )}
      </div>
      <div className="max-md:hidden">
        <MusicControls handleOpenEqualizer={handleOpenEqualizer} />
      </div>
    </div>
  );
};

export default KaraokeAirFriendEtc;
