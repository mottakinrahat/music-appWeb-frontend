import React, { useState, useEffect } from "react";
import { LucideDownload, LucideCheckCircle } from "lucide-react";
import { openDB } from "idb";
import { toast } from "sonner";

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
const saveSongToIndexedDB = async (
  songUrl: string,
  songName: string,
  artwork: string,
  songAlbum: string,
  songArtist: string,
  onProgress: (percentage: number) => void,
  onCancel: () => boolean
) => {
  try {
    const songExists = await checkIfSongExists(songName);

    if (songExists) {
      toast.warning(`${songName} already exists in offline download.`);
      return; // Exit the function if the song already exists
    }

    const response = await fetch(songUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const contentLength = +response.headers.get("Content-Length")!; // Get the content length
    let receivedLength = 0;
    const chunks = [];

    while (true) {
      const { done, value } = await reader?.read()!;
      if (done || onCancel()) break;

      chunks.push(value);
      receivedLength += value.length;

      const percentage = Math.round((receivedLength / contentLength) * 100);
      onProgress(percentage); // Update progress
    }

    if (onCancel()) {
      toast("Download canceled.");
      return;
    }

    const blob = new Blob(chunks);
    const db = await initDB();

    // Save the song Blob to IndexedDB
    await db.put("offlineSongs", {
      name: songName,
      data: blob,
      artwork,
      songAlbum,
      songArtist,
    });

    toast.success(`${songName} downloaded successfully.`);
  } catch (error) {
    console.error("Failed to save the song:", error);
    toast.error("Download failed.");
  }
};

interface DownloadButtonProps {
  songUrl: string;
  songName: string;
  artwork: string;
  songId: number;
  songAlbum: string;
  songArtist: string;
}

const DownloadOffline: React.FC<DownloadButtonProps> = ({
  songUrl,
  songName,
  artwork,
  songAlbum,
  songArtist,
  songId,
}) => {
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDownloadId, setCurrentDownloadId] = useState<number | null>(
    null
  );
  const [progress, setProgress] = useState<number>(0);
  const [isCanceled, setIsCanceled] = useState<boolean>(false);

  useEffect(() => {
    const checkDownloadStatus = async () => {
      const songExists = await checkIfSongExists(songName);
      setIsDownloaded(songExists);
    };

    checkDownloadStatus();
  }, [songName]);

  const handleDownload = () => {
    if (isDownloaded) {
      toast.warning(`${songName} already exists in offline download.`);
    } else {
      setIsLoading(true);
      setCurrentDownloadId(songId);
      setIsCanceled(false);
      setProgress(0);

      const onCancel = () => isCanceled;
      const onProgress = (percentage: number) => setProgress(percentage);

      saveSongToIndexedDB(
        songUrl,
        songName,
        artwork,
        songAlbum,
        songArtist,
        onProgress,
        onCancel
      )
        .then(() => {
          if (!isCanceled) {
            setIsDownloaded(true);
            setIsLoading(false);
            setCurrentDownloadId(null);
            setProgress(100);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setCurrentDownloadId(null);
          setProgress(0);
        });
    }
  };

  const handleCancelDownload = () => {
    if (isLoading && currentDownloadId === songId) {
      setIsCanceled(true);
      setIsLoading(false);
      setCurrentDownloadId(null);
      setProgress(0);
    }
  };

  return (
    <a
      onClick={
        isLoading && currentDownloadId === songId
          ? handleCancelDownload
          : handleDownload
      }
      className="cursor-pointer relative"
      role="button"
      aria-label={`Download ${songName}`}
    >
      {isDownloaded ? (
        <LucideCheckCircle className="text-white  p-[2px] sm:p-0 text-xl sm:text-2xl" />
      ) : isLoading && currentDownloadId === songId ? (
        <div className="relative flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="absolute text-white text-[10px] sm:text-xs">
            {progress}%
          </span>
        </div>
      ) : (
        <LucideDownload className="active:text-accent group-hover:text-accent transition hover:text-accent text-white focus-within:text-accent focus:text-accent focus-visible:text-accent  p-[2px] sm:p-0 sm:text-2xl" />
      )}
    </a>
  );
};

export default DownloadOffline;
