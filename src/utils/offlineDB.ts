// // src/utils/db.ts
// import { openDB } from "idb";

// const dbPromise = openDB("music-store", 1, {
//   upgrade(db) {
//     db.createObjectStore("songs");
//   },
// });

// export async function saveSong(key: string, songBlob: Blob) {
//   const db = await dbPromise;
//   await db.put("songs", songBlob, key);
// }

// export async function getSong(key: string): Promise<Blob | null> {
//   const db = await dbPromise;
//   return await db.get("songs", key);
// }
