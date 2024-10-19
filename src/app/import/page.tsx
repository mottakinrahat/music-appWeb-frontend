"use client";

import { useEffect, useState } from "react";

const SongsList = () => {
  const [songs, setSongs] = useState<{ filename: string; url: string }[]>([]);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/importSongs/mysongs/66d02a5092d5d279d1ebe0af"
        );
        const data = await response.json();
        if (data.success) {
          setSongs(data.data);
        } else {
          console.error("Failed to fetch songs");
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);

  return (
    <div>
      <h1>Available Songs</h1>
      <ul>
        {songs.map((song: any) => (
          <li key={song._id}>
            <button onClick={() => setSelectedSong(song.songLink)}>
              Play {song.songLink}
            </button>
          </li>
        ))}
      </ul>
      {selectedSong && (
        <audio controls>
          <source src={selectedSong} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default SongsList;
