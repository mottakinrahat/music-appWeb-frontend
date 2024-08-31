import React from "react";
import { LucideDownload } from "lucide-react";
import { openDB } from "idb";

// Function to initialize IndexedDB
const initDB = async () => {
  const db = await openDB("OfflineDB", 6, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("offlineSongs")) {
        db.createObjectStore("offlineSongs", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
  return db;
};

// Function to check if a song already exists in IndexedDB
const checkIfSongExists = async (songName: string) => {
  const db = await initDB();
  const tx = db.transaction("offlineSongs", "readonly");
  const store = tx.objectStore("offlineSongs");

  const allSongs = await store.getAll(); // Get all songs from IndexedDB

  // Check if the song with the given name already exists
  const existingSong = allSongs.find((song) => song.name === songName);

  return !!existingSong; // Returns true if the song exists, false otherwise
};

// Function to save the song data to IndexedDB
const saveSongToIndexedDB = async (songUrl: string, songName: string) => {
  try {
    const songExists = await checkIfSongExists(songName);

    if (songExists) {
      console.log(`Song "${songName}" already exists in IndexedDB.`);
      return; // Exit the function if the song already exists
    }

    console.log(`Fetching song from URL: ${songUrl}`);
    const response = await fetch(songUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob(); // Convert the response to a Blob object
    console.log(`Blob received with size: ${blob.size} bytes`);

    const db = await initDB();
    // Save the song Blob to IndexedDB
    await db.put("offlineSongs", { name: songName, data: blob });
    console.log(`Song "${songName}" saved successfully.`);
  } catch (error) {
    console.error("Failed to save the song:", error);
  }
};

interface DownloadButtonProps {
  songUrl: string;
  songName: string;
}

const DownloadOffline: React.FC<DownloadButtonProps> = ({
  songUrl,
  songName,
}) => {
  const handleDownload = () => {
    // Call function to save song data to IndexedDB
    saveSongToIndexedDB(songUrl, songName);
  };

  return (
    <a
      onClick={handleDownload}
      className="cursor-pointer"
      role="button"
      aria-label={`Download ${songName}`}
    >
      <LucideDownload className="active:text-accent group-hover:text-accent transition hover:text-accent text-white focus-within:text-accent focus:text-accent focus-visible:text-accent text-2xl" />
    </a>
  );
};

export default DownloadOffline;
