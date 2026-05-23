const CACHE_NAME = 'hackathon-project-v4';

const APP_SHELL_ASSETS = [
  '/Hackathon-Project-Droyd/',
  '/Hackathon-Project-Droyd/index.html',
  '/Hackathon-Project-Droyd/styles.css',
  '/Hackathon-Project-Droyd/scripts.js',
  '/Hackathon-Project-Droyd/project-category-filter.js',
  '/Hackathon-Project-Droyd/manifest.json',
  '/Hackathon-Project-Droyd/photos/error.png',
  '/Hackathon-Project-Droyd/photos/pwa-icon-192.png',
  '/Hackathon-Project-Droyd/photos/pwa-icon-512.png',
  '/Hackathon-Project-Droyd/photos/pwa-icon-maskable-512.png',
  '/Hackathon-Project-Droyd/photos/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  // Always try network first for HTML navigation so page updates appear immediately.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/Hackathon-Project-Droyd/index.html')))
    );
    return;
  }

  // For static assets, serve from cache first and refresh in background.
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || networkFetch;
    })
  );
});