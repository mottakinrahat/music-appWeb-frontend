"use client";

import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading"; // Assuming you have a loading component

interface PlayerInterface {
  params?: {
    id: string | undefined;
  };
}

const Player: React.FC<PlayerInterface> = ({ params }) => {
  const playing = useSelector((state: RootState) => state.player.playing);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    // Check if both playing and songId are available
    const songId = params?.id;

    if (songId && typeof playing !== "undefined") {
      localStorage.setItem(
        "songData",
        JSON.stringify({ play: playing, id: songId })
      );
      setIsDataLoaded(true); // Mark as loaded once localStorage is set
    }
  }, [params?.id, playing]);

  if (!isDataLoaded) {
    // Display a loading spinner or some placeholder content
    return <Loading />;
  }

  return null; // Return nothing if localStorage is set
};

export default Player;
