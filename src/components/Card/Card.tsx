import React from "react";
import Image from "next/image";
import playBtn from "@/assets/icons/play_circle.png";
import Link from "next/link";
// import { IoHeartOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

interface BaseCard {
  type: string;
  artistName: string;
  className?: string;
  isFavourite?: boolean;
  rating?: number;
  album?: string;
  musicRoute?: string;
  albumRouteLink?: string;
  freelancerType?: string;
  freelancerName?: string;
}

interface MusicCard extends BaseCard {
  type: "music";
  imageUrl?: string;
  artistType?: string;
  title?: string;
}

interface FreelancerCard extends BaseCard {
  type: "freelancer";
  imageUrl?: string;
  title?: string;
  freelancerType: string;
  freelancerName: string;
  rating: number;
}

const Card: React.FC<MusicCard | FreelancerCard> = ({
  type,
  artistName,
  freelancerType,
  freelancerName,
  imageUrl,
  musicRoute,
  rating,
  title,
  className,
  isFavourite,
  album,
  albumRouteLink,
}) => {
  return (
    <div className={`rounded-lg max-w-md ${className ? className : ""}`}>
      {/* Image Container */}
      <div className="relative w-fit drop-shadow  mb-4">
        {imageUrl ? (
          <div className="rounded-xl flex w-full h-fit relative cursor-pointer overflow-hidden group">
            <Image
              priority
              src={imageUrl}
              alt={title || "Card image"}
              width={280}
              height={280}
              style={{
                width: "auto",
                height: "auto",
                aspectRatio: "1 / 1",
                objectFit: "cover",
              }}
              className="rounded-lg "
            />
            {/* Overlay */}
            <Link href={musicRoute ? musicRoute : "/"}>
              <div className="absolute inset-0 bg-black flex justify-center items-center bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                {type !== "freelancer" && (
                  <Image
                    src={playBtn}
                    alt={playBtn.src || "Card image"}
                    width={100}
                    height={100}
                    style={{ width: "auto", height: "auto" }}
                    className="rounded-lg"
                  />
                )}
              </div>
            </Link>
            {type !== "freelancer" && (
              <div className="absolute w-12 h-12 flex justify-center items-center backdrop-blur-sm bg-white/10 rounded-lg top-4 right-4">
                <button
                  className="text-background text-xl"
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
        {title && (
          <h2 className="text-xl lg:text-2xl font-semibold mb-2">{title}</h2>
        )}
        {artistName && <p className="text-sm text-gray-600">{artistName}</p>}

        {album && (
          <p className="text-sm text-gray-600 ">
            Album:{" "}
            <Link
              href={albumRouteLink ? albumRouteLink : "/"}
              className="underline"
            >
              {album}
            </Link>
          </p>
        )}
        {type === "freelancer" && freelancerType && (
          <>
            {rating !== undefined && (
              <div className="mt-2 text-2xl">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-sm">{rating}</span>
              </div>
            )}
            <p className="text-xl text-textSecondary font-semibold">
              {freelancerName}
            </p>
            <p className="text-base text-textPrimary ">{freelancerType}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
