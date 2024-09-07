"use client";
import React, { useState, useEffect, DragEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSliders } from "react-icons/fi";
import { FaUpload } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { TbDeviceIpadX } from "react-icons/tb";
import AirPlayButton from "./AirPlayButton";
import {
  clearMusicData,
  setMusicData,
} from "@/redux/slice/music/musicDataSlice";
import { RootState } from "@/redux/store";
import { initDB } from "@/utils/initDB";
import { toast } from "sonner";
import { playImport } from "@/redux/slice/music/musicActionSlice";
import FXSVG from "@/components/svg/FXSVG";
import Mixer from "@/components/svg/Mixer";
import AudioRecorder from "./AudioRecorder";
import ImportDevice from "@/components/svg/ImportDevice";
import { karaoke } from "@/redux/slice/karaoke/karaokeActionSlice";
import ImportModal from "./ImportModal";

interface MusicControlsFace {
  handleOpenEqualizer: () => void;
}

const MusicControls = ({ handleOpenEqualizer }: MusicControlsFace) => {
  const [showModal, setShowModal] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();
  const musicData = useSelector((state: RootState) => state.musicData);
  const isKaraoke = useSelector((state: RootState) => state.karaoke.karaoke);

  // Save file to IndexedDB
  const saveFileToIndexedDB = async (fileData: string, title: string) => {
    await deleteExistingSongFromIndexedDB(); // Delete old song
    const db = await initDB("MusicDB", 1, "songs");
    const id = 1; // Simplification for this example
    await db.put("songs", { id, fileData, title }); // Save new song with title
    dispatch(setMusicData({ id: id.toString(), fileData, title })); // Dispatch Redux action
  };

  // Delete existing song from IndexedDB
  const deleteExistingSongFromIndexedDB = async () => {
    const db = await initDB("MusicDB", 1, "songs");
    const tx = db.transaction("songs", "readwrite");
    const store = tx.objectStore("songs");
    const allSongs = await store.getAll();
    allSongs.forEach(async (song) => {
      await store.delete(song.id);
    });
    await tx.done;
    dispatch(clearMusicData()); // Dispatch Redux action to clear music data
  };

  // Retrieve file from IndexedDB
  useEffect(() => {
    const retrieveFileFromIndexedDB = async () => {
      const db = await initDB("MusicDB", 1, "songs");
      const song = await db.get("songs", 1);
      if (song) {
        dispatch(
          setMusicData({
            id: song.id.toString(),
            fileData: song.fileData,
            title: song.title,
          })
        );
      }
    };
    retrieveFileFromIndexedDB(); // Retrieve song data on component mount
  }, [dispatch]);

  const handleFileSelect = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      const title = file.name; // Use the file name as the title
      await saveFileToIndexedDB(base64Data, title);
      dispatch(karaoke()); // Turn off karaoke
      toast.success("Song Imported Successfully");
      setShowModal(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files.length > 0) {
      handleFileSelect(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDeleteSong = async () => {
    await deleteExistingSongFromIndexedDB();
    dispatch(clearMusicData());
    toast.success("Song Removed Successfully from Imported Songs");
  };

  return (
    <>
      {/* Controls Component */}
      <div className="flex justify-between items-center gap-2 lg:gap-4">
        <div
          onClick={handleOpenEqualizer}
          className="cursor-pointer text-xl select-none text-white"
        >
          <FiSliders className="hover:text-accent transition p-[2px] sm:p-0 text-xl sm:text-2xl cursor-pointer" />
        </div>
        <div className="flex sm:text-2xl items-center">
          <AirPlayButton />
        </div>
        <div>
          {/* className="hidden sm:block" */}
          {musicData.fileData ? (
            <TbDeviceIpadX
              onClick={handleDeleteSong}
              className="text-white hover:text-accent transition text-xl sm:text-2xl cursor-pointer"
            />
          ) : (
            <p onClick={() => setShowModal(true)}>
              <ImportDevice />
            </p>
          )}
        </div>
        {isKaraoke && (
          <>
            <FXSVG />
            <Mixer />
            <AudioRecorder />
          </>
        )}
      </div>
      
      {showModal && (
        <ImportModal
          dragging={dragging}
          handleFileDrop={handleFileDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          setShowModal={setShowModal}
          handleFileSelect={handleFileSelect}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default MusicControls;
