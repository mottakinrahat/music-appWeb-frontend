
import micOnIcon from "../../assets/icons/mic_external_on.svg";
import instantMix from "../../assets/icons/instant_mix.svg";
import airPlay from "../../assets/icons/airplay.svg";
import addDevice from "../../assets/icons/add-device-svgrepo-com 2.svg";
const KaraokeAirFriendEtc = ({ karaokeOn, SetKaraokeOn }:any) => {
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
      <div>
        <img src={instantMix.src} alt="RepeatIcon" />
      </div>
      <div>
        <img src={airPlay.src} alt="RepeatIcon" />
      </div>
      <div>
        <img src={addDevice.src} alt="RepeatIcon" />
      </div>
    </div>
  );
};

export default KaraokeAirFriendEtc;
