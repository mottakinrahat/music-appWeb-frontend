const CACHE_NAME = "offline-cache-v1";
const OFFLINE_URL = "/offline"; // Static offline route
const OFFLINE_DYNAMIC_PATTERN = /^\/offline\/\d+$/; // Dynamic offline routes pattern

// Static assets to cache
const ASSETS_TO_CACHE = [
  "/", // Ensure home page is cached
  OFFLINE_URL, // Offline page
  // Add any additional static assets like JS, CSS, images
];

// Install event: Cache static resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching static assets");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Force the waiting service worker to become active
  self.skipWaiting();
});

// Fetch event: Handle requests and dynamic caching
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // Handle dynamic offline routes like /offline/1, /offline/123, etc.
  if (OFFLINE_DYNAMIC_PATTERN.test(requestUrl.pathname)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response; // Return cached response if available
        }
        return fetch(event.request)
          .then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone()); // Cache dynamic route
              return networkResponse;
            });
          })
          .catch(() => caches.match(OFFLINE_URL)); // Fallback to offline page if fetch fails
      })
    );
    return;
  }

  // Handle static offline page route
  if (requestUrl.pathname === OFFLINE_URL) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
    return;
  }

  // For navigation requests (HTML page loads), use network-first strategy with fallback to offline
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL)) // Fallback to offline page if offline
    );
  } else {
    // For other requests (JS, CSS, images), use cache-first strategy
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request); // Cache-first strategy
      })
    );
  }
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
  // Claim control of all pages as soon as activated
  self.clients.claim();
});
