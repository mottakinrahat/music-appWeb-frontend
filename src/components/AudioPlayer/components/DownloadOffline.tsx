import React from "react";
import { LucideDownload } from "lucide-react";
import { openDB } from "idb";

// Function to initialize IndexedDB
const initDB = async () => {
  const db = await openDB("OfflineDB", 1, {
    upgrade(db) {
      db.createObjectStore("offlineSongs", {
        keyPath: "id",
        autoIncrement: true,
      });
    },
  });
  return db;
};

// Function to save the song data to IndexedDB
const saveSongToIndexedDB = async (songUrl: string, songName: string) => {
  try {
    console.log(`Fetching song from URL: ${songUrl}`);
    const response = await fetch(songUrl);

    console.log(response);

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
