import React from "react";
import bgImg from "@/assets/images/musicpagebg.png";
import bgImg2 from "@/assets/etc/banner/Decoration.png";
import Container from "@/components/common/container/Container";
import Heading from "@/components/ui/heading";
import image from "@/assets/images/img.png";
import LandingMusicCard from "@/components/Card/LandingMusicCard";
import Link from "next/link";
const BeltWithKaraoke = () => {
  const data = {
    id: 1,
    imageUrl: image.src,
    artistName: "Helen Khilar",
    title: "Love me babe",
    album: "Love Me Babe",
    artist: "Helen Khilar",
    artwork: image.src,
    songDuration: "3:45",
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="relative overflow-hidden py-20"
    >
      <div className="container">
        <img
          className="absolute w-[60%] -left-28 opacity-25 z-10 -top-[62%]"
          src={bgImg2.src}
        />
        <Heading
          className="text-white"
          type="secondary"
          heading="Belt Out Your Favorites with Karaoke"
        >
          You can belt out your favorite hits, challenge your friends to epic
          sing-offs, and experience the joy of karaoke anytime, anywhere.
        </Heading>
        <div className="flex flex-wrap gap-2 mt-20">
          <div className="font-semibold text-4xl text-white mt-4">Hot Now:</div>
          <div className="text-white">
            <LandingMusicCard
              album={data.album}
              artist={data.artist}
              artwork={data.imageUrl}
              id={data.id}
              title={data.title}
            ></LandingMusicCard>
            <Link
              className="underline flex justify-center lg:justify-start mx-auto: text-accent font-semibold text-base"
              href={"/"}
            >
              See what hot on karaoke
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeltWithKaraoke;
