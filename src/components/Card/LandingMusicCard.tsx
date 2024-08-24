/* eslint-disable @next/next/no-img-element */
import playBtn from "@/assets/icons/play_circle.png";

import Link from "next/link";

interface LandingMusicCardInterface {
  id: number;
  title: string;
  artist: string;
  album: string;
  artwork: string;
}

const LandingMusicCard = ({
  album,
  artist,
  artwork,
  title,
  id,
}: LandingMusicCardInterface) => {
  return (
    <div className="flex justify-between py-2 items-center max-w-lg">
      <div className="flex items-center gap-3">
        <div>
          <img
            // style={{ width: "auto", height: "auto" }}
            src={artwork}
            alt="Album Art"
            // height={80}
            // width={80}
            className="w-16 h-16 aspect-square rounded-lg"
          />
        </div>
        <div>
          <h2 className=" text-base md:text-2xl gap-2 font-semibold mb-1">
            {title}
          </h2>
          <div className="flex lg:items-center max-lg:flex-col flex-wrap ">
            {/* <p>{artist}</p> */}
            <div className="flex items-center max-md:hidden gap-2">
              <p>
                Album:{" "}
                <Link className="underline" href={`/album${id}`}>
                  {album}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={playBtn.src} alt="" />
      </div>
    </div>
  );
};

export default LandingMusicCard;
