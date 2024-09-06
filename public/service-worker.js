const CACHE_NAME = "offline-cache-v1";
const OFFLINE_URL = "/offline"; // Static route to cache
const OFFLINE_DYNAMIC_PATTERN = /^\/offline\/\d+$/; // Regular expression for dynamic routes like /offline/1, /offline/123, etc.

// Assets to cache
const ASSETS_TO_CACHE = [
  "/", // Ensure this is cached
  OFFLINE_URL, // Ensure offline page is cached
  // Add other static assets like JS, CSS, and images
];

// Install Service Worker and cache static resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch event handler
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // Handle dynamic routes like /offline/1, /offline/123, etc.
  if (OFFLINE_DYNAMIC_PATTERN.test(requestUrl.pathname)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          // Return cached response if available
          return response;
        }
        // Fetch from network if not cached and then cache the dynamic route
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Handle static offline route
  if (requestUrl.pathname === OFFLINE_URL) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
    return;
  }

  if (event.request.mode === "navigate") {
    // For navigation requests, try network first, fallback to offline page
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
  } else {
    // For other requests, use cache-first strategy
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Activate Service Worker and clean old caches
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
