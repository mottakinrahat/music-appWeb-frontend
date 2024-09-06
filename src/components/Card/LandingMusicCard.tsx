"use client";
/* eslint-disable @next/next/no-img-element */

import placeHolder from "@/assets/etc/png/song.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaPause, FaPlay } from "react-icons/fa6"; // Import the cross icon
import { RxCross2 } from "react-icons/rx";
import CurrentPlayingUsers from "../AudioPlayer/components/CurrentPlayingUsers";
import useLocalSongData from "@/hooks/useLocalSongData";

interface LandingMusicCardInterface {
  id: any;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  albumCard?: boolean;
  playing?: boolean;
  setPlaying?: (playing: boolean) => void;
  handleRemoveFromPlaylist?: (id: any) => void;
}

const LandingMusicCard = ({
  album,
  artist,
  artwork,
  title,
  id,
  albumCard,
  handleRemoveFromPlaylist,
  playing,
  setPlaying,
}: LandingMusicCardInterface) => {
  const [currentId, setCurrenId] = useState("");
  const [play, setPlay] = useState(playing);

  // useEffect(() => {
  //   const currentSongDataFromLocalStroage = JSON.parse(
  //     localStorage.getItem("songData")!
  //   );
  //   if (!currentSongDataFromLocalStroage) {
  //     localStorage.setItem(
  //       "songData",
  //       JSON.stringify({ play: true, id: id ? id : null })
  //     );
  //   } else {
  //     setCurrenId(currentSongDataFromLocalStroage.id);
  //   }
  // }, [currentId, id]);
  // useLocalSongData({play: true, id: id ? id : null});

  return (
    <div className="flex justify-between gap-4 py-2 items-center max-w-xl">
      <div className="flex items-center gap-3">
        <div>
          <img
            src={artwork ? artwork : placeHolder.src}
            alt="Album Art"
            className="w-16 h-16 object-cover aspect-square rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-base md:text-xl sm:text-2xl gap-2 font-semibold mb-1">
            {albumCard
              ? album
              : title.length > 16
              ? `${title.slice(0, 16)}...`
              : title}
          </h2>
          <div className="flex lg:items-center max-lg:flex-col flex-wrap">
            <div className="flex  text-xs sm:text-sm items-center gap-2">
              {!albumCard ? (
                <p>
                  Album:{" "}
                  <Link className="underline" href={`/album${id}`}>
                    {album}
                  </Link>
                </p>
              ) : (
                <p>{artist}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!albumCard && (
          <>
            {playing && id === currentId ? (
              <Button
                onClick={() => {
                  if (setPlaying) {
                    setPlaying(!playing);
                  }
                }}
                className="rounded-full w-11 h-11"
              >
                <FaPause className="text-3xl" />
              </Button>
            ) : (
              <Link
                href={`/music/${id}`}
                onClick={() =>
                  localStorage.setItem(
                    "songData",
                    JSON.stringify({ play: true, id: id ? id : null })
                  )
                }
              >
                <Button
                  // Check if setPlaying is defined
                  className="rounded-full w-11 h-11"
                >
                  <FaPlay className="text-3xl" />
                </Button>
              </Link>
            )}
          </>
        )}
        {handleRemoveFromPlaylist && (
          <div className="flex gap-2">
            <button
              onClick={() => handleRemoveFromPlaylist(id)} // Check if handleRemoveFromPlaylist is defined
              className="rounded-full w-8 h-8 md:w-11 md:h-11"
            >
              <RxCross2 className=" text-xl sm:text-2xl" /> {/* Cross button */}
            </button>
            <CurrentPlayingUsers
              addFriends={false}
              className="text-black hidden md:flex"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingMusicCard;
