const CACHE_NAME = 'hackathon-project-v1';

const URLS_TO_CACHE = [
  '/Hackathon-Project-Droyd/',
  '/Hackathon-Project-Droyd/index.html',
  '/Hackathon-Project-Droyd/styles.css',
  '/Hackathon-Project-Droyd/scripts.js',
  '/Hackathon-Project-Droyd/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});