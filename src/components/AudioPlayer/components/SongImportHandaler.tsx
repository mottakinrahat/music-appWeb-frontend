import React, { useState, DragEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  setMusicData,
  clearMusicData,
} from "@/redux/slice/music/musicDataSlice";
import { initDB } from "@/utils/initDB";
import ImportDevice from "@/components/svg/ImportDevice";
import { karaoke } from "@/redux/slice/karaoke/karaokeActionSlice";
import ImportModal from "./ImportModal";
import { TbDeviceIpadX } from "react-icons/tb";
import { RootState } from "@/redux/store";
import { showLyric } from "@/redux/slice/music/musicActionSlice";

interface SongImportModalHandlerProps {
  musicData: { fileData: string | null };
}

const SongImportModalHandler: React.FC<SongImportModalHandlerProps> = ({
  musicData,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();
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
    dispatch(showLyric());
  };

  const handleFileSelect = async (file: File) => {
    // Check if the file is an audio file
    if (!file.type.startsWith("audio/")) {
      toast.error("Please select a valid audio file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      const title = file.name; // Use the file name as the title
      await saveFileToIndexedDB(base64Data, title);
      toast.success("Song Imported Successfully");
      setShowModal(false);
    };
    reader.readAsDataURL(file);
    if (isKaraoke) {
      dispatch(karaoke());
    }
  };

  const handleDeleteSong = async () => {
    await deleteExistingSongFromIndexedDB();
    dispatch(clearMusicData());
    toast.success("Song Removed Successfully from Imported Songs");
  };

  const handleFileDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];

    // Check if the dropped file is an audio file
    if (file && file.type.startsWith("audio/")) {
      handleFileSelect(file);
    } else {
      toast.error("Please drop a valid audio file.");
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

  return (
    <>
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

      {showModal && (
        <ImportModal
          dispatch={dispatch}
          dragging={dragging}
          handleFileDrop={handleFileDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          setShowModal={setShowModal}
          handleFileSelect={handleFileSelect}
        />
      )}
    </>
  );
};

export default SongImportModalHandler;
