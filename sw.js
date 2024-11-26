const CACHE_NAME = 'Type it or Mash it' // Define cache name as "Type it or Mash it"
const urlsToCache = [
    '/',
    '/index.html',
    'mashing-test.html',
    'speedtype-test.html',
    'typingstyle.css',
    'mashing-script.js',
    'typing-script.js',
    'manifest.json',
    'kick-him.gif',
    'type.gif',
    'Type it or Mash it PWA logo.png'
];

// Install event into SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);

            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return the response from the cached version
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});