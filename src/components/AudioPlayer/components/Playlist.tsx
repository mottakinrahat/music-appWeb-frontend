"use client";
import React, { useEffect, useState } from "react";
import CurrentPlayingUsers from "./CurrentPlayingUsers";
import { Button } from "@/components/ui/button";
import { MdAddCircleOutline } from "react-icons/md";
import LandingMusicCard from "@/components/Card/LandingMusicCard";

interface PlayListOpenProps {
  tracks?: any[];
  playing: boolean;
  setPlaying: (value: boolean) => void;
}

const Playlist = ({ tracks, playing, setPlaying }: PlayListOpenProps) => {
  const [currentTracks, setCurrentTracks] = useState<any[]>();

  useEffect(() => {
    setCurrentTracks(tracks);
  }, [tracks]);

  const handleRemoveFromPlaylist = (id: string) => {
    const updatedTracks = tracks?.filter((track) => track._id !== id);
    setCurrentTracks(updatedTracks);
    console.log(`Removing song with id: ${id}`);
  };
  console.log(tracks);
  return (
    <div className="p-2 xl:p-6 2xl:p-8">
      {/* play list */}
      <div className="flex  justify-between">
        <h2 className="text-3xl font-semibold">Next Queue</h2>
        <CurrentPlayingUsers addFriends={false} className="text-black" />
      </div>
      <div>
        <button className=" w-full bg-[#F7F7F7] rounded-md border border-[#e6e6e6] flex justify-center items-center py-3 my-6">
          <MdAddCircleOutline /> Add to the queue
        </button>
      </div>
      <div className="font-semibold mt-6 mb-10 text-accent text-center">
        Song credit
      </div>
      <div className="">
        <div className="overflow-y-scroll">
          {currentTracks?.map((track: any, idx) => (
            <div key={idx} className="gap-2 w-full items-center mb-4">
              <LandingMusicCard
                album={track?.songAlbum.albumName}
                artist={track?.songArtist}
                artwork={track?.artwork}
                id={track?._id}
                title={track?.songName}
                playing={playing}
                setPlaying={() => setPlaying(playing)}
                handleRemoveFromPlaylist={handleRemoveFromPlaylist}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
