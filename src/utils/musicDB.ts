import { openDB } from "idb";

export const initMusicDB = async () => {
  const db = await openDB("MusicDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("songs")) {
        db.createObjectStore("songs", { keyPath: "id", autoIncrement: true });
      }
    },
  });
  return db;
};
