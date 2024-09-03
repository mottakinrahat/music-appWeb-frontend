"use client";
import React, { useState } from "react";
import {
  PlusCircleIcon,
  HeartIcon,
  ShareIcon,
  CircleStackIcon,
  UserCircleIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import placeHolder from "@/assets/etc/png/song.jpg";
import { useRouter } from "next/navigation";
import ShareCard from "@/components/Card/ShareCard";

interface SongType {
  songName: string;
  bpm: number;
  artwork: string;
  songAlbum: any;
  _id: string;
}

// Define the props for the component
interface SongPropsType {
  currentSong: SongType;
}

const ThreeDotContent: React.FC<SongPropsType> = ({ currentSong }) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [share, setShare] = useState<boolean>(false);

  const router = useRouter();

  const { songName, artwork, songAlbum, _id: songId } = currentSong;

  // handle playlist add
  const handleAddtoPlayList = async () => {
    const user = JSON.parse(localStorage?.getItem("user")!);
    const userId = user?._id;
    const playListData = {
      id: songId,
      userId: userId,
    };

    if (!userId) {
      toast.warning("please login first");
      router.push("/login");
    }
    toast("Please wait, adding to playlist... ", {
      duration: 1000,
    });
    await axios
      .put(
        `https://music-app-web.vercel.app/api/v1/songs/play-list/${songId}/${userId}`,
        playListData
      )
      .then((res) => {
        if (res.data)
          toast.success(
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image
                src={artwork ? artwork : placeHolder.src}
                alt={songName}
                width={40}
                height={40}
                style={{
                  borderRadius: "8px",
                  marginRight: "8px",
                }}
              />
              <div>
                <div style={{ fontWeight: "bold" }}>Playlist Added</div>
                <div>{`${songName}, ${songAlbum?.albumName}`}</div>
              </div>
            </div>
          );
      })
      .catch((err) => {
        if (err) {
          toast.error("Failed to add to playlist");
        }
      });
  };

  const handleAddtoFavourite = async () => {
    const user = JSON.parse(localStorage?.getItem("user")!);
    const userId = user?._id;
    const playListData = {
      id: songId,
      userId: userId,
    };
    if (!userId) {
      toast.warning("Please login first!");
    } else {
      await axios
        .put(
          `https://music-app-web.vercel.app/api/v1/favourite/${songId}/${userId}`,
          playListData
        )
        .then((res) => {
          setFavorite((prev: boolean) => !prev);
          toast.success(
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image
                src={artwork ? artwork : placeHolder.src} // Replace this with the image URL
                alt={songName}
                width={40}
                height={40}
                style={{
                  borderRadius: "8px",
                  marginRight: "8px",
                }}
              />
              <div>
                {favorite ? (
                  <div style={{ fontWeight: "bold" }}>
                    Favorites Removed Successfully
                  </div>
                ) : (
                  <div style={{ fontWeight: "bold" }}>
                    Favorites Added Successfully
                  </div>
                )}
                <div>{`${songName}, ${songAlbum?.albumName}`}</div>
              </div>
            </div>
          );
        })
        .catch((err) => {
          if (err) {
            toast.error("Failed to add to favourite list");
          }
        });
    }
  };

  return (
    <div className="font-bold text-textSecondary w-52  select-none px-[16px] py-[24px] flex flex-col gap-[24px]">
      <ShareCard
        open={share}
        setOpen={setShare}
        shareUrl={`https://music-web-liangu.vercel.app//music/66c99c0a36fe71b995557d6b`}
      />
      <h2
        onClick={handleAddtoPlayList}
        className="flex hover:text-textPrimary transition cursor-pointer justify-start items-center gap-2"
      >
        <PlusCircleIcon className="h-6 w-6" />
        <span>Add to playlist</span>
      </h2>
      <h2
        onClick={handleAddtoFavourite}
        className="flex hover:text-textPrimary transition cursor-pointer justify-start items-center gap-2"
      >
        <HeartIcon className="h-6 w-6" />
        <span>Add to favorites</span>
      </h2>
      <h2
        onClick={() => setShare(!share)}
        className="flex hover:text-textPrimary transition cursor-pointer justify-start items-center gap-2"
      >
        <ShareIcon className="h-6 w-6" />
        <span>Share</span>
      </h2>
      <h2 className="flex hover:text-textPrimary transition cursor-pointer justify-start items-center gap-2">
        <CircleStackIcon className="h-6 w-6" />
        <span>Go album</span>
      </h2>
      <h2 className="flex hover:text-textPrimary transition cursor-pointer justify-start items-center gap-2">
        <UserCircleIcon className="h-6 w-6" />
        <span>Go artist</span>
      </h2>
      <h2 className="flex hover:text-textPrimary transition cursor-pointer justify-start items-center gap-2">
        <MusicalNoteIcon className="h-6 w-6" />
        <span>Song credit</span>
      </h2>
    </div>
  );
};

export default ThreeDotContent;
