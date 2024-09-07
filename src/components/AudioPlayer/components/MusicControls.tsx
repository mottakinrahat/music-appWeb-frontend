"use client";
import React, { useState, useEffect, DragEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSliders } from "react-icons/fi";
import { MdDevices } from "react-icons/md";
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
import { playImport, playSong } from "@/redux/slice/music/musicActionSlice";
import FXSVG from "@/components/svg/FXSVG";
import Mixer from "@/components/svg/Mixer";
import RadioButton from "@/components/svg/RadioButton";
import AudioRecorder from "./AudioRecorder";
import ImportDevice from "@/components/svg/ImportDevice";

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
        ); // Update Redux state
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
        <div className="flex  sm:text-2xl items-center">
          <AirPlayButton />
        </div>
        <div>
          {musicData.fileData ? (
            <TbDeviceIpadX
              onClick={handleDeleteSong}
              className="text-white hover:text-accent transition  text-xl sm:text-2xl cursor-pointer"
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

      {/* File Import Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div
            className={`relative bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-sm md:max-w-md ${
              dragging ? "border-4 border-dashed border-accent" : ""
            }`}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {/* Close Icon */}
            <IoMdClose
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2  text-xl sm:text-2xl text-gray-600 cursor-pointer hover:text-gray-800"
            />
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
              Import Audio
            </h2>
            <div className="flex items-center justify-center mb-4">
              {/* Input with Accent Border */}
              <label
                htmlFor="importAudio"
                className="flex flex-col items-center w-full px-4 py-10 border-dashed text-black hover:text-textPrimary border-accent rounded-lg shadow-lg tracking-wide uppercase border-2 hover:border-secondary transition-colors cursor-pointer"
              >
                <FaUpload className=" text-xl sm:text-2xl mb-2" />
                <span className="text-sm md:text-base leading-normal">
                  Select a file
                </span>
                {/* Hidden file input */}
                <input
                  name="importAudio"
                  type="file"
                  id="importAudio"
                  accept="audio/*"
                  onChange={(e) => {
                    e.target.files && handleFileSelect(e.target.files[0]);
                    dispatch(playImport());
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicControls;
