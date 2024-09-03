// utils/idb.js
import { openDB } from "idb";

export const getSongsFromIDB = async () => {
  const db = await openDB("OfflineDB", 6, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("offlineSongs")) {
        db.createObjectStore("offlineSongs", { keyPath: "id" });
      }
    },
  });

  return db.getAll("offlineSongs");
};

export const deleteSongFromIDB = async (id: number) => {
  const db = await openDB("OfflineDB", 6, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("offlineSongs")) {
        db.createObjectStore("offlineSongs", { keyPath: "id" });
      }
    },
  });

  await db.delete("offlineSongs", id);
};
