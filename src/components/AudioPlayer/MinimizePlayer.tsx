"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MaximizePlayer from "./MaximizePlayer";

const MinimizePlayer = () => {
  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState(true);
  const [playMusicById, setPlayMusicById] = useState(
    "66c9c030a88974f63b01510b"
  );
  const [readyPlayer, setReadyPlayer] = useState(false);

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
      className={showPlayer ? "block" : "h-28 border-t min-w-0"}
      style={{ minHeight: 0, minWidth: 0 }}
    >
      <MaximizePlayer play params={{ id: playMusicById }} />
    </div>
  );
};

export default MinimizePlayer;
