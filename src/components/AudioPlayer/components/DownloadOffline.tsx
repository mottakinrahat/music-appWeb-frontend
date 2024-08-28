/* eslint-disable @next/next/no-img-element */
import React from "react";

import { LucideDownload } from "lucide-react";
// import { saveSong } from "@/utils/offlineDB";

interface DownloadButtonProps {
  songUrl: string;
  songName: string;
}

const DownloadOffline: React.FC<DownloadButtonProps> = ({
  songUrl,
  songName,
}) => {
  const handleSaveSong = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent default anchor behavior

    // Fetch and save the song to IndexedDB
    const response = await fetch(songUrl);
    const blob = await response.blob();
    // await saveSong(songName, blob);

    // Create a hidden link element for downloading
    const link = document.createElement("a");
    link.href = songUrl;
    link.download = songName;
    link.style.display = "none"; // Hide the link
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  };

  return (
    <a onClick={handleSaveSong} href={songUrl} download={songName}>
      <LucideDownload className="active:text-accent group-hover:text-accent hover:text-accent text-white focus-within:text-accent focus:text-accent focus-visible:text-accent text-2xl" />
    </a>
  );
};

export default DownloadOffline;
