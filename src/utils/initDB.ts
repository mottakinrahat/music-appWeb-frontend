import { openDB } from "idb";

export const initDB = async (
  dbName: string,
  dbVersion: number,
  objectStoreName: string
) => {
  const db = await openDB(dbName, dbVersion, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(objectStoreName)) {
        db.createObjectStore(objectStoreName, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
  return db;
};
