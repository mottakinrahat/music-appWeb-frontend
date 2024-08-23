import React from "react";
import Image from "next/image";
import Link from "next/link";
import { tracks } from "@/utils/SongObject";

const AudioList = () => {
  return (
    <div className=" h-screen mx-[120px] mt-10">
      <h2 className="text-3xl font-bold">New release</h2>
      <p className="text-[16px] max-w-[588px]">
        Get your ears on the hottest new tracks, from chart-topping anthems to
        underground gems bubbling up from the scene.
      </p>
      <div className="flex flex-wrap justify-between gap-[24px] items-center mt-[48px]">
        {tracks.map((track, index) => (
          <Link key={index} href={`music/${track?.id}`}>
            <div className="min-w-[282px]">
              <Image
                src={track?.artwork}
                height={282}
                width={282}
                className="h-[282px] w-[282px]  rounded-xl object-fill"
                alt="w"
              />
              <h2 className="text-[20px] font-bold">{track?.title}</h2>
              <h5 className="text-[16px]">{track?.artist}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AudioList;
