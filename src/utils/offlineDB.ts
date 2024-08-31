import { openDB } from "idb";

// Function to initialize IndexedDB
export const initOfflineDB = async () => {
  const db = await openDB("OfflineDB", 6, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("offlineSongs")) {
        db.createObjectStore("offlineSongs", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
  return db;
};
