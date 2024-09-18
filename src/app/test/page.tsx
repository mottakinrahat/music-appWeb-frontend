"use client"
import { useEffect, useState } from "react";

// Define the type for the song data
interface Song {
  id: number;
  title: string;
  url: string;
}

const MusicList = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the list of songs from the API
    fetch("/api/music")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Music List</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <p>{song.title}</p>
            <button onClick={() => setSelectedSong(song.url)}>Play</button>
          </li>
        ))}
      </ul>

      {/* Audio Player */}
      {selectedSong && (
        <div>
          <h2>Now Playing</h2>
          <audio controls autoPlay>
            <source src={selectedSong} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default MusicList;
