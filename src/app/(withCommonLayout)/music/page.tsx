"use client";
import React, { useEffect, useState } from "react";
import NewReleases from "@/components/pageComponents/music/NewReleases";
import Navbar from "@/components/common/navigation/Navbar";
import HotPlayLists from "@/components/pageComponents/music/HotPlayLists";
import Features from "@/components/pageComponents/Home/Features";
import Recomended from "@/components/pageComponents/Home/Recomended";

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
      <Recomended album />
      <Features />
    </>
  );
};

export default AudioList;
