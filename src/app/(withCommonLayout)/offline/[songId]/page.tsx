"use client";

import React, { useState, useEffect } from "react";
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

// Function to retrieve a song Blob from IndexedDB
const retrieveSongFromIndexedDB = async (id: string | number) => {
  try {
    const db = await initDB();
    const song = await db.get("offlineSongs", id);

    if (song && song.data) {
      const blob = song.data;
      const url = URL.createObjectURL(blob); // Create a URL for the Blob
      return { url, name: song.name };
    } else {
      throw new Error("Song not found");
    }
  } catch (error) {
    console.error("Failed to retrieve the song:", error);
  }
};

interface PlayOfflineSongProps {
  params: {
    songId: number | string;
  };
}

const PlayOfflineSong: React.FC<PlayOfflineSongProps> = ({ params }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [songName, setSongName] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine); // Track online status

  const songId = params?.songId;
  console.log("Received songId:", songId);

  useEffect(() => {
    const id = typeof songId === "string" ? parseInt(songId, 10) : songId;

    if (!id) {
      console.error("Invalid song ID.");
      return;
    }

    const fetchSong = async () => {
      const song = await retrieveSongFromIndexedDB(id);
      console.log("Fetched song from IndexedDB:", song);
      if (song) {
        setAudioUrl(song.url);
        setSongName(song.name);
      }
    };

    fetchSong();
  }, [songId]);

  // Update online/offline status
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div>
      <p>Status: {isOnline ? "Online" : "Offline"}</p>
      {audioUrl ? (
        <>
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          {songName && <p>Playing: {songName}</p>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlayOfflineSong;
