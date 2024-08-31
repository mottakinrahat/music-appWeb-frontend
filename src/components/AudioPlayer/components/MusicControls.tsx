"use client";
import React, { useState, useEffect } from "react";
import { FiSliders } from "react-icons/fi";
import { MdDevices } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { TbDeviceIpadX } from "react-icons/tb";
import AirPlayButton from "./AirPlayButton";
import { initDB } from "@/utils/initDB";

interface MusicControlsFace {
  handleOpenEqualizer: () => void;
}

const MusicControls = ({ handleOpenEqualizer }: MusicControlsFace) => {
  const [showModal, setShowModal] = useState(false);
  const [hasSong, setHasSong] = useState(false);
  const [songTitle, setSongTitle] = useState<string | null>(null);

  // Save file to IndexedDB
  const saveFileToIndexedDB = async (fileData: string, title: string) => {
    await deleteExistingSongFromIndexedDB(); // Delete old song
    const db = await initDB("MusicDB", 1, "songs");
    await db.put("songs", { id: 1, fileData, title }); // Save new song with title
    setHasSong(true);
    setSongTitle(title);
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
    setHasSong(false); // Update state when song is deleted
    setSongTitle(null); // Clear song title
  };

  // Retrieve file from IndexedDB
  const retrieveFileFromIndexedDB = async () => {
    const db = await initDB("MusicDB", 1, "songs");
    const song = await db.get("songs", 1);
    if (song) {
      setHasSong(true);
      setSongTitle(song.title);
    }
  };

  useEffect(() => {
    retrieveFileFromIndexedDB(); // Retrieve song data on component mount
  }, []);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const title = file.name; // Use the file name as the title
        await saveFileToIndexedDB(base64Data, title);
        console.log("File saved to IndexedDB");
      };
      reader.readAsDataURL(file);
      setShowModal(false);
    }
  };

  const handleDeleteSong = async () => {
    await deleteExistingSongFromIndexedDB();
  };

  return (
    <>
      {/* Controls Component */}
      <div className="flex justify-between items-center gap-2 lg:gap-4">
        <div
          onClick={handleOpenEqualizer}
          className="cursor-pointer text-xl select-none text-white"
        >
          <FiSliders className="hover:text-accent transition text-2xl cursor-pointer" />
        </div>
        <div className="flex items-center">
          <AirPlayButton />
        </div>
        <div>
          {hasSong ? (
            <TbDeviceIpadX
              onClick={handleDeleteSong}
              className="text-white hover:text-accent transition text-2xl cursor-pointer"
            />
          ) : (
            <MdDevices
              onClick={() => setShowModal(true)}
              className="text-white hover:text-accent transition text-2xl cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* File Import Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="relative bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-sm md:max-w-md">
            {/* Close Icon */}
            <IoMdClose
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-2xl text-gray-600 cursor-pointer hover:text-gray-800"
            />
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
              Import File
            </h2>
            <div className="flex items-center justify-center mb-4">
              {/* Input with Accent Border */}
              <label className="flex flex-col items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg tracking-wide uppercase border-2 border-transparent hover:border-blue-500 transition-colors cursor-pointer">
                <FaUpload className="text-2xl mb-2" />
                <span className="text-sm md:text-base leading-normal">
                  Select a file
                </span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileSelect}
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
