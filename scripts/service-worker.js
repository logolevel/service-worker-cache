const CACHE_NAME = 'cache-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/scripts/app.js',
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

// Fetch Event: Serve Cached Files when Offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => caches.match('/index.html'));
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

