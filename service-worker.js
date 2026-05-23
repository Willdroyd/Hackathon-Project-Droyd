const CACHE_NAME = 'hackathon-project-v3';

const URLS_TO_CACHE = [
  '/Hackathon-Project-Droyd/',
  '/Hackathon-Project-Droyd/index.html',
  '/Hackathon-Project-Droyd/styles.css',
  '/Hackathon-Project-Droyd/scripts.js',
  '/Hackathon-Project-Droyd/manifest.json',
  '/Hackathon-Project-Droyd/photos/error.png',
  '/Hackathon-Project-Droyd/photos/pwa-icon-192.png',
  '/Hackathon-Project-Droyd/photos/pwa-icon-512.png',
  '/Hackathon-Project-Droyd/photos/pwa-icon-maskable-512.png',
  '/Hackathon-Project-Droyd/photos/apple-touch-icon.png'
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