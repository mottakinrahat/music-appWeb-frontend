"use client";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import useLocalSongData from "@/hooks/useLocalSongData";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface PlayerInterface {
  params?: {
    id: any;
  };
}

const Player: React.FC<PlayerInterface> = ({ params }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null
  );
  // const [eqOpen, setEqOpen] = useState(false);
  const [tracks, setTracks] = useState<any>([]);
  const [currentSong, setCurrentSong] = useState<any>(null);

  // Fetch tracks on mount
  useEffect(() => {
    axios
      .get("https://music-app-web.vercel.app/api/v1/songs")
      .then((response) => {
        setTracks(response.data.data.songs);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error);
      });
  }, []);

  // Set the current track based on params.id
  useEffect(() => {
    if (tracks.length > 0 && params?.id) {
      const initialTrackIndex = tracks.findIndex(
        (track: any) => track._id === params?.id
      );

      if (initialTrackIndex !== -1) {
        setCurrentTrackIndex(initialTrackIndex);
        setCurrentSong(tracks[initialTrackIndex]);

        // Ensure the song data is set in localStorage
        const storedSongData = localStorage.getItem("songData");
        let songData;

        try {
          songData = JSON.parse(storedSongData!);
        } catch (error) {
          songData = null;
        }
      }
    }
  }, [params?.id, tracks]);

  // Synchronize play state with localStorage data
  const songData = useLocalSongData();

  // Display loading animation if current song is not set
  if (!currentSong) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  return <div>{/* Your player UI goes here */}</div>;
};

export default Player;
