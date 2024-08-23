"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AudioList = () => {
  const [tracks, setTraks] = useState([]);
  useEffect(() => {
    fetch("/tracks.json")
      .then((data) => data.json())
      .then((tracks) => setTraks(tracks));
  }, []);

  return (
    <div className="bg-[#F7F7F7] h-screen mx-[120px] mt-10">
      <h2 className="text-3xl font-bold">New release</h2>
      <p className="text-[16px] max-w-[588px]">
        Get your ears on the hottest new tracks, from chart-topping anthems to
        underground gems bubbling up from the scene.
      </p>
      <div className="flex flex-wrap justify-between items-center mt-[48px]">
        {tracks?.map((track: any) => (
          <Link key={track?.id} href={`player/${track?.id}`}>
            <div className="max-w-[282px]">
              <Image
                src={track?.artwork}
                height={282}
                width={282}
                className="h-[282px] w-[282px] object-cover object-center rounded-xl"
                alt={track?.title || "Track Artwork"}
              />
              <h2 className="text-[24px] font-bold">{track?.title}</h2>
              <h5 className="text-[16px]">{track?.artist}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AudioList;
