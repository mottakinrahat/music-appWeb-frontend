"use client";
import React, { useEffect, useState } from "react";
import NewReleases from "@/components/pageComponents/music/NewReleases";
import Navbar from "@/components/common/navigation/Navbar";
import HotPlayLists from "@/components/pageComponents/music/HotPlayLists";
import Features from "@/components/pageComponents/Home/Features";
import Recomended from "@/components/pageComponents/Home/Recomended";
import RecentlyPlayed from "@/components/pageComponents/music/RecentlyPlayed";
import TopCharts from "@/components/pageComponents/music/TopCharts";
import TopAlbums from "@/components/pageComponents/music/TopAlbums";
import TrandingPlaylist from "@/components/pageComponents/music/TrandingPlaylist";
import Footer from "@/components/common/footer/Footer";
import BeltWithKaraoke from "@/components/pageComponents/music/BeltWithKaraoke";
import axios from "axios";

const AudioList = () => {
  const [tracks, setTraks] = useState([]);
  useEffect(() => {
    axios
      .get("https://music-app-web.vercel.app/api/v1/songs")
      .then((data) => setTraks(data.data.data.songs));
    // .then((tracks) => setTraks(tracks));
  }, []);

  return (
    <>
      <NewReleases tracks={tracks} />
      <HotPlayLists />
      <TopCharts />
      <TopAlbums />
      <RecentlyPlayed />
      <TrandingPlaylist />
      <BeltWithKaraoke />
      <Recomended album />
      <Features />
    </>
  );
};

export default AudioList;
