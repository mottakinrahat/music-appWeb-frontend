"use client";

import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading"; // Assuming you have a loading component
import { setSongId } from "@/redux/slice/music/musicSlice";

interface PlayerInterface {
  params?: {
    id: string | undefined;
  };
}

const Player: React.FC<PlayerInterface> = ({ params }) => {
  const playing = useSelector((state: RootState) => state.player.playing);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hasReloaded, setHasReloaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // Check if the code is running in the browser
    if (typeof window !== "undefined") {
      const songId = params?.id;
      const reloaded = localStorage.getItem("hasReloaded") === "true";
      if (songId) dispatch(setSongId(songId));

      if (songId && !reloaded) {
        // Store the song data in localStorage
        // localStorage.setItem(
        //   "songData",
        //   JSON.stringify({ play: playing, id: songId })
        // );
        setIsDataLoaded(true); // Mark as loaded

        // Trigger a page reload only once
        localStorage.setItem("hasReloaded", "true"); // Persist reload state
        setHasReloaded(true);
        window.location.reload(); // Reload the page
      } else if (reloaded) {
        setIsDataLoaded(true); // Mark as loaded if already reloaded
      }
    }
  }, [dispatch, params?.id, playing]);

  if (!isDataLoaded) {
    return <Loading />; // Display a loading component if data isn't loaded yet
  }

  return null; // No need to render anything once data is set and the reload is triggered
};

export default Player;
