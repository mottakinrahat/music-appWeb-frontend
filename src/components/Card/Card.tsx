"use client";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import playBtn from "@/assets/icons/play_circle.png";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { usePathname, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "@/redux/slice/music/musicActionSlice";
import { toast } from "sonner";
import { clearMusicData } from "@/redux/slice/music/musicDataSlice";
import { initDB } from "@/utils/initDB";
import { RootState } from "@/redux/store";
import { useAudio } from "@/lib/AudioProvider";
import CardLoading from "../common/loading/CardLoading";
import { handleFavorite } from "../AudioPlayer/handlers/handleFavorite";
import { useIsFavouriteUserMutation } from "@/redux/api/songApi";

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
  refetch?: () => void;
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
  const pathname = usePathname();
  const dispatch = useDispatch();
  // const query = useSearchParams();
  const importedSong = useSelector((state: RootState) => state.musicData);

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
  const { audioContext, audioRef } = useAudio();
  const handleDeleteSong = async () => {
    await deleteExistingSongFromIndexedDB();
    dispatch(clearMusicData());
    toast.success("Imported song removed.");
  };

  const [isFavouriteFn] = useIsFavouriteUserMutation();

  const handleAddtoFavourite = async () => {
    const user = JSON.parse(localStorage?.getItem("user")!);
    const userId = user?._id;
    if (!userId) {
      toast.warning("Please login first!");
    } else {
      handleFavorite(
        isFavouriteFn,
        isFavourite,
        musicId ? musicId : "", // songId
        userId, // userId
        imageUrl, // Replace with dynamic artwork URL
        title ? title : "" // Replace with dynamic placeholder URL
      );
    }
  };

  const handleSetIdtoLocalStorage = () => {
    // Store the song ID and play state in localStorage
    localStorage.setItem(
      "songData",
      JSON.stringify({ play: true, id: musicId })
    );
    localStorage.setItem("pathHistory", `${pathname}`);

    if (musicId) {
      dispatch(playSong(musicId));

      // Check if AudioContext and audioRef are available and play the audio
      if (audioContext && audioContext.state === "suspended") {
        audioContext.resume().then(() => {
          if (audioRef?.current) {
            dispatch(playSong(musicId));
          }
        });
      } else if (audioRef?.current) {
        dispatch(playSong(musicId));
      }
    }

    if (importedSong.fileData) {
      handleDeleteSong(); // Ensure this handles song deletion if necessary
    }
  };

  return (
    <>
      {!imageUrl ? (
        <CardLoading />
      ) : (
        <div
          className={`rounded-lg mx-auto max-w-md ${
            className ? className : ""
          }`}
        >
          {/* Image Container */}
          <div className="relative w-fit drop-shadow  mb-4">
            {imageUrl ? (
              <div className="rounded-xl flex w-full h-full relative cursor-pointer overflow-hidden group">
                <Image
                  priority
                  src={imageUrl}
                  alt={title || "Card image"}
                  width={280}
                  height={280}
                  style={{
                    width: "280px",
                    height: "auto",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                  }}
                  className="rounded-lg"
                />

                <Link
                  onClick={handleSetIdtoLocalStorage}
                  href={musicId ? `/music/${musicId}` : "/"}
                >
                  <div className="absolute inset-0 rounded-xl bg-black flex justify-center items-center bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    {type !== "freelancer" && (
                      <Image
                        priority
                        src={playBtn}
                        alt={playBtn.src || "Card image"}
                        width={100}
                        height={100}
                        style={{ width: "40px", height: "40px" }}
                        className="rounded-lg"
                      />
                    )}
                  </div>
                </Link>
                {type !== "freelancer" && (
                  <div className="absolute w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center hover:bg-black/20 transition-colors bg-black/10 backdrop-blur-sm  rounded-md sm:rounded-lg top-2 right-2 sm:top-4 sm:right-4">
                    <button
                      onClick={handleAddtoFavourite}
                      className="text-background text-xl"
                      aria-label="Mark as favorite"
                    >
                      {isFavourite ? (
                        <FaHeart className="text-accent" />
                      ) : (
                        <FaRegHeart />
                      )}
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
                  {title.length > 22 ? `${title.slice(0, 20)}...` : title}
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
      )}
    </>
  );
};

export default Card;
