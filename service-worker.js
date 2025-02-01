const CACHE_NAME = 'cache-v1.5';
const STATIC_ASSETS = [
    './',
    './index.html',
    './scripts/app.js',
];

// Install Event: Cache Files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Caching files...");
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

// Fetch event: Serve cached files when offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone()); // Cache new response
                    return networkResponse;
                });
            });
        }).catch(() => {
            // Fallback to index.html for navigation requests (SPA support)
            if (event.request.mode === "navigate") {
                return caches.match("/index.html");
            }
        })
    );
});

// Activate Event: Clean Old Caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log(`Deleting old cache: ${key}`);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Claim clients to activate immediately
    );
});

