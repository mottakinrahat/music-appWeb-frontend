"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MaximizePlayer from "./MaximizePlayer";

const MinimizePlayer = () => {
  const [playMusicById, setPlayMusicById] = useState<string>();
  const [readyPlayer, setReadyPlayer] = useState(false);
  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState(true);

  useEffect(() => {
    // Show the player only if the path matches `/music/:id`
    if (pathname.startsWith("/music/")) {
      setShowPlayer(true);
    } else {
      setShowPlayer(false);
    }
    const getPriviousSongId = localStorage.getItem("songId");
    if (getPriviousSongId && getPriviousSongId !== "") {
      setPlayMusicById(getPriviousSongId);
      setReadyPlayer(true);
    } else {
      setReadyPlayer(false);
    }
  }, [pathname]);

  if (!readyPlayer) return <></>;

  return (
    <div
      className={`${
        showPlayer ? "block h-[100vh]" : "h-28 border-t min-w-0"
      } transition-all duration-300`}
      style={{ minHeight: 0, minWidth: 0 }}
    >
      <MaximizePlayer play params={{ id: playMusicById }} />
    </div>
  );
};

export default MinimizePlayer;
