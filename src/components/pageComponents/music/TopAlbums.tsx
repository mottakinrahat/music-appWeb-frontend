import React from "react";
import LandingMusicCard from "@/components/Card/LandingMusicCard";
import image from "@/assets/images/img.png";
import image1 from "@/assets/images/img2.png";
import image2 from "@/assets/images/img3.png";
import image3 from "@/assets/images/img4.png";
import Container from "@/components/common/container/Container";
import Heading from "@/components/ui/heading";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const TopAlbums = () => {
  const data = [
    {
      id: 1,
      imageUrl: image.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 2,
      imageUrl: image1.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 3,
      imageUrl: image2.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 4,
      imageUrl: image3.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 5,
      imageUrl: image2.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 6,
      imageUrl: image1.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 7,
      imageUrl: image3.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 8,
      imageUrl: image2.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 9,
      imageUrl: image3.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 10,
      imageUrl: image1.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 11,
      imageUrl: image2.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 12,
      imageUrl: image1.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 13,
      imageUrl: image3.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 14,
      imageUrl: image1.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
    {
      id: 15,
      imageUrl: image2.src,
      artistName: "Helen Khilar",
      title: "Love me babe",
      album: "The Run Way",
    },
  ];

  return (
    <Container>
      <Heading
        type="primary"
        route="/"
        linkText="See all of top chart"
        heading={`Top albums: Top ${data.length} Albums`}
      >
        Dive into the heart of what{"'"}s trending with our Top 100 chart.
      </Heading>
      <div className="justify-between lg:flex gap-5">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl mb-5 md:text-4xl max-w-md font-semibold">
            No.1 On charts
          </h2>
          <div className="rounded-xl relative flex w-full h-fit cursor-pointer overflow-hidden group">
            <Image
              priority
              src={data[0].imageUrl}
              alt={data[0].title || "Card image"}
              width={300}
              height={300}
              style={{
                width: "auto",
                height: "auto",
                aspectRatio: "1 / 1",
              }}
              className="rounded-lg max-w-sm"
            />
            <div className="absolute inset-0 bg-black flex justify-center items-center bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
            <div className="absolute w-12 h-12 flex  justify-center items-center backdrop-blur-sm bg-white/10 rounded-lg top-4 right-4">
              <button
                className="text-background text-xl"
                aria-label="Mark as favorite"
              >
                {/* <FaHeart /> */}
                <FaRegHeart />
              </button>
            </div>
          </div>
          <div className="text-xl font-semibold mt-4">{data[0].album}</div>
          <div>{data[0].artistName}</div>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  mt-10 gap-3">
          {data?.map((music, idx) => (
            <LandingMusicCard
              albumCard
              key={idx}
              artist={music.artistName}
              artwork={music.imageUrl}
              id={music.id}
              title={music.title}
              album={music.album}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default TopAlbums;
