const CACHE_NAME = 'racing-loa-v3';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Ahora la app siempre buscará en internet primero. Si no hay internet, cargará el caché.
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});