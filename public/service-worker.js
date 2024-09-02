const CACHE_NAME = "offline-cache";
const OFFLINE_URL = "/offline"; // Define your offline fallback page

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
      return Promise.all(
        ASSETS_TO_CACHE.map((url) =>
          fetch(url)
            .then((response) => {
              if (response.ok) {
                return cache.put(url, response);
              }
              // If the response is not OK, just skip this asset
              return Promise.resolve();
            })
            .catch(() => {
              // If the fetch fails, just skip this asset
              return Promise.resolve();
            })
        )
      );
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
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
