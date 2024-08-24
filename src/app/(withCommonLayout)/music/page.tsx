"use client";
import React, { useEffect, useState } from "react";
import NewReleases from "@/components/pageComponents/music/NewReleases";

const AudioList = () => {
  const [tracks, setTraks] = useState([]);
  useEffect(() => {
    fetch("/tracks.json")
      .then((data) => data.json())
      .then((tracks) => setTraks(tracks));
  }, []);

  return <NewReleases tracks={tracks} />;
};

export default AudioList;
