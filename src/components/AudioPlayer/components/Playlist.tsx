"use client";
import React, { useCallback, useRef, useState } from "react";

interface PlayListOpenProps {
  tracks: any;
}

const Playlist = ({ tracks }: PlayListOpenProps) => {
  console.log(tracks);
  return (
    <div>
      {/* play list */}
      <div>This is the playList</div>
    </div>
  );
};

export default Playlist;
