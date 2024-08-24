"use client";
import React, { useEffect, useState } from "react";
import NewReleases from "@/components/pageComponents/music/NewReleases";
import Navbar from "@/components/common/navigation/Navbar";
import HotPlayLists from "@/components/pageComponents/music/HotPlayLists";

const AudioList = () => {
  const [tracks, setTraks] = useState([]);
  useEffect(() => {
    fetch("/tracks.json")
      .then((data) => data.json())
      .then((tracks) => setTraks(tracks));
  }, []);

  return (
    <>
      <Navbar />
      <NewReleases tracks={tracks} />;
      <HotPlayLists />
    </>
  );
};

export default AudioList;
