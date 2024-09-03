"use client";

import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MaximizePlayer from "./MaximizePlayer";
import useLocalSongData from "@/hooks/useLocalSongData";
import { useDispatch } from "react-redux";
import { pauseSong } from "@/redux/slice/music/musicActionSlice";

const MinimizePlayer = () => {
  const [playMusicById, setPlayMusicById] = useState<string>();
  const [readyPlayer, setReadyPlayer] = useState(false);
  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState(true);
  // const [play, setPlay] = useState(true);
  const [height, setHeight] = useState(7); // Initial height
  const resizingRef = useRef<HTMLDivElement | null>(null);
  const [startY, setStartY] = useState<number>(0);
  const [startHeight, setStartHeight] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to update the height based on window width
    const updateHeight = () => {
      if (height > 0) {
        if (window.innerWidth < 768) {
          setHeight(6);
        } else {
          setHeight(7);
        }
      }
    };

    // Initial check
    updateHeight();

    window.addEventListener("resize", updateHeight);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", updateHeight);
  }, [height, pathname]);

  const startResizing = useCallback(
    (e: MouseEvent | TouchEvent) => {
      // Determine the starting Y position and height
      const y =
        e instanceof MouseEvent
          ? e.clientY
          : e instanceof TouchEvent
          ? e.touches[0].clientY
          : 0;
      setStartY(y);
      setStartHeight(height);

      const onMouseMove = (e: MouseEvent | TouchEvent) => {
        const y =
          e instanceof MouseEvent
            ? e.clientY
            : e instanceof TouchEvent
            ? e.touches[0].clientY
            : 0;
        const newHeight = Math.max(startHeight + (startY - y), 0); // Ensure minimum height
        setHeight(newHeight);
      };

      const stopResizing = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopResizing);
        document.removeEventListener("touchmove", onMouseMove);
        document.removeEventListener("touchend", stopResizing);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", stopResizing);
      document.addEventListener("touchmove", onMouseMove);
      document.addEventListener("touchend", stopResizing);
    },
    [height, startY, startHeight]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    startResizing(e as unknown as MouseEvent);
    dispatch(pauseSong());
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startResizing(e as unknown as TouchEvent);
    dispatch(pauseSong());
  };

  const isPlay = useLocalSongData();
  const play = isPlay?.play;

  useEffect(() => {
    // if (showPlayer === false) {
    //   setPlay(false);
    // } else {
    //   setPlay(true);
    // }
    // Show the player only if the path matches `/music/:id`
    if (pathname.startsWith("/music/")) {
      setShowPlayer(true);
      // document.body.classList.add("hide-scrollbar");
      setHeight(7);
    } else {
      // document.body.classList.remove("hide-scrollbar");
      setShowPlayer(false);
    }
    const getSongDataFromLocalStroage = JSON.parse(
      localStorage.getItem("songData")!
    );
    if (getSongDataFromLocalStroage && getSongDataFromLocalStroage !== null) {
      setPlayMusicById(getSongDataFromLocalStroage.id);
      setReadyPlayer(true);
    } else {
      setReadyPlayer(false);
    }

    if (window) {
      window.onload = () => {
        setReadyPlayer(false);
      };
    }

    // Clean up event listeners on unmount
    return () => {
      // Ensure cleanup only if functions are defined
      document.removeEventListener("mousemove", () => {});
      document.removeEventListener("mouseup", () => {});
      document.removeEventListener("touchmove", () => {});
      document.removeEventListener("touchend", () => {});
      // document.body.classList.remove("hide-scrollbar");
    };
  }, [pathname, showPlayer]);

  if (!readyPlayer) return <></>;

  return (
    <div
      className={`${
        showPlayer ? "block h-[100vh]" : "border-t min-w-0"
      } transition-all duration-300 relative overflow-hidden`}
      style={{
        minHeight: 0,
        minWidth: 0,
        height: `${!showPlayer ? `${height}rem` : "100vh"}`,
      }}
      ref={resizingRef}
    >
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="absolute w-full overflow-hidden h-4 z-50 top-0 bg-transparent cursor-ns-resize"
      ></div>
      <MaximizePlayer play={play!} params={{ id: playMusicById }} />
    </div>
  );
};

export default MinimizePlayer;
