"use client";
import DeleteModal from "@/components/AudioPlayer/components/DeleteModal";
import { deleteSongFromIDB, getSongsFromIDB } from "@/utils/getSongsIdb";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const OfflinePage = () => {
  interface Song {
    id: number;
    name: string;
  }

  const [songs, setSongs] = useState<Song[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songsFromIDB: Song[] = await getSongsFromIDB();
        setSongs(songsFromIDB);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSongs();
  }, []);

  const handleDelete = async (id: number) => {
    setSongToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (songToDelete === null) return;
    try {
      await deleteSongFromIDB(songToDelete);
      setSongs(songs.filter((song) => song.id !== songToDelete));
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelDelete = () => {
    setSongToDelete(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        You are Offline
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        It seems youre not connected to the internet. Here are the songs we have
        stored:
      </p>
      {songs.length > 0 ? (
        <ul className="w-full max-w-lg bg-white shadow-md rounded-lg divide-y divide-gray-200">
          <p className="text-xl text-center mb-2">Offline Playlist:</p>
          {songs.map((song) => (
            <li
              key={song.id}
              className="p-4 flex justify-between items-center hover:bg-gray-50"
            >
              <span className="text-lg font-medium text-gray-700">
                {song?.name.slice(0, 35)}
                {song?.name.length > 35 ? "..." : ""}
              </span>
              <div className="flex space-x-2">
                <Link href={`/offline/${song.id}`}>
                  <p className="border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-400 transition">
                    Play Song
                  </p>
                </Link>
                <button
                  onClick={() => handleDelete(song.id)}
                  className="border border-red-300 text-red-600 rounded-md px-2 py-1 hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600">Loading Offline Songs...</p>
      )}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this song?"
      />
    </div>
  );
};

export default OfflinePage;
