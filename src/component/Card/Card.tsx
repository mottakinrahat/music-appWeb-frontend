import React from "react";
import Image from "next/image";
import playBtn from "@/assets/icons/play_circle.png";
import Link from "next/link";
import { Url } from "url";
// import { IoHeartOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

interface MusicCard {
  type: "music";
  musicRoute?: Url;
  artistType?: String;
  imageUrl: string;
  title: string;
  artistName: string;
  rating?: number;
  isFavourite?: boolean;
  className?: string;
}

interface ArtistCard {
  type: "artist";
  artistType: string;
  musicRoute?: string;
  imageUrl?: string;
  title?: string;
  artistName?: string;
  rating?: number;
  isFavourite?: boolean;
  className?: string;
}

const Card: React.FC<MusicCard | ArtistCard> = ({
  type,
  artistName,
  artistType,
  imageUrl,
  musicRoute,
  rating,
  title,
  className,
  isFavourite,
}) => {
  return (
    <div className={`p-4 rounded-lg max-w-sm ${className ? className : ""}`}>
      {/* Image Container */}
      <div className="relative w-fit drop-shadow  mb-4">
        {imageUrl ? (
          <div className="rounded-xl relative cursor-pointer overflow-hidden group">
            <Image
              src={imageUrl}
              alt={title || "Card image"}
              width={200}
              height={200}
              style={{ width: "auto", height: "auto" }}
              className="rounded-lg"
            />
            {/* Overlay */}
            <Link href={musicRoute ? musicRoute : "/"}>
              <div className="absolute inset-0 bg-black flex justify-center items-center bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <Image
                  src={playBtn}
                  alt={playBtn.src || "Card image"}
                  width={100}
                  height={100}
                  style={{ width: "auto", height: "auto" }}
                  className="rounded-lg"
                />
              </div>
            </Link>
            {type === "music" && (
              <div className="absolute w-10 flex justify-center items-center h-10 backdrop-blur-sm bg-white/10 rounded-lg top-4 right-4">
                <button
                  className="text-background text-lg"
                  aria-label="Mark as favorite"
                >
                  {isFavourite ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full w-full bg-gray-200  flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="">
        {title && <h2 className="text-2xl font-semibold mb-2">{title}</h2>}
        {artistName && <p className="text-sm text-gray-600">{artistName}</p>}
        {type === "artist" && artistType && (
          <p className="text-base text-textPrimary ">{artistType}</p>
        )}
        {rating !== undefined && (
          <div className="flex justify-center items-center mt-2">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm">{rating}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
