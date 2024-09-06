"use client";
import React, { useState } from "react";
import Image from "next/image";
import playBtn from "@/assets/icons/play_circle.png";
import Link from "next/link";
// import { IoHeartOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "@/redux/slice/music/musicActionSlice";
import { toast } from "sonner";
import { clearMusicData } from "@/redux/slice/music/musicDataSlice";
import { initDB } from "@/utils/initDB";
import { RootState } from "@/redux/store";
import { Skeleton } from "../ui/skeleton";

interface BaseCard {
  type: string;
  artistName: string;
  className?: string;
  isFavourite?: boolean;
  rating?: number;
  album?: string;
  musicId?: string;
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
  musicId,
  rating,
  title,
  className,
  isFavourite,
  album,
  albumRouteLink,
}) => {
  const location = usePathname();
  const dispatch = useDispatch();
  const importedSong = useSelector((state: RootState) => state.musicData);
  const [imageLoading, setImageLoading] = useState(true);

  const deleteExistingSongFromIndexedDB = async () => {
    const db = await initDB("MusicDB", 1, "songs");
    const tx = db.transaction("songs", "readwrite");
    const store = tx.objectStore("songs");
    const allSongs = await store.getAll();
    allSongs.forEach(async (song) => {
      await store.delete(song.id);
    });
    await tx.done;
    dispatch(clearMusicData()); // Dispatch Redux action to clear music data
  };
  const handleDeleteSong = async () => {
    await deleteExistingSongFromIndexedDB();
    dispatch(clearMusicData());
    toast.success("Imported song removed.");
  };

  const handleSetIdtoLocalStroage = () => {
    localStorage.setItem(
      "songData",
      JSON.stringify({ play: true, id: musicId })
    );
    localStorage.setItem("pathHistory", location);
    dispatch(playSong(musicId!));
    if (importedSong.fileData) handleDeleteSong();
  };

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
              className="rounded-lg"
              onLoadingComplete={() => setImageLoading(false)}
            />
            {/* Overlay */}
            {/* {imageLoading && (
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            )} */}
            <Link
              onClick={handleSetIdtoLocalStroage}
              href={musicId ? `/music/${musicId}` : "/"}
            >
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
              <div className="absolute w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center backdrop-blur-sm bg-white/10 rounded-md sm:rounded-lg top-2 right-2 sm:top-4 sm:right-4">
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
          <Link href={musicId ? `/music/${musicId}` : "/"} className="">
            <h2 className="text-xl lg:text-2xl sm:text-2xl text-textPrimary hover:text-textSecondary cursor-pointer font-semibold mb-2">
              {title.length > 22 ? `${title.slice(0, 22)}...` : title}
            </h2>
          </Link>
        )}
        {artistName && (
          <p className="text-sm text-textPrimary hover:text-textSecondary">
            {artistName}
          </p>
        )}

        {album && (
          <p className="text-sm text-textPrimary hover:text-textSecondary ">
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
              <div className="mt-2  text-xl sm:text-2xl">
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
