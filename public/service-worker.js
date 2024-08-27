// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open("music-cache").then((cache) => {
//       return cache.addAll([
//         "/songs/example.mp3", // Cache example song
//       ]);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });
