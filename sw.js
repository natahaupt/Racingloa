const CACHE_NAME = 'racingloa-online-only-v1';

self.addEventListener('install', event => {
  self.skipWaiting(); // Se instala al instante
});

self.addEventListener('activate', event => {
  // Borra absolutamente todos los cachés antiguos de tu celular y PC
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Exige siempre usar internet, cero memoria temporal
  event.respondWith(fetch(event.request));
});
