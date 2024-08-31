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
const retrieveSongFromIndexedDB = async (id: number) => {
  try {
    const db = await initDB();
    console.log(db);
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

const PlayOfflineSong: React.FC<{ songId: number }> = ({ songId = 6 }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [songName, setSongName] = useState<string | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      const song = await retrieveSongFromIndexedDB(songId);
      if (song) {
        setAudioUrl(song.url);
        setSongName(song.name);
      }
    };

    fetchSong();
  }, [songId]);

  return (
    <div>
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
