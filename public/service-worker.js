const CACHE_NAME = "offline-cache";
const OFFLINE_URL = "/offline/:id"; // Define your offline fallback page

// Assets to cache
const ASSETS_TO_CACHE = [
  "/",
  OFFLINE_URL,
  // Add other assets like JS, CSS, and images
];

// Install Service Worker and cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching offline resources");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch from cache if offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
        })
      );
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Clearing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
