const CACHE_NAME = 'racingloa-cache-v2'; // Al cambiar a v2, obligamos al celular a actualizarse

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logoracingloa.png',
  './icono_app.png' // <-- Agregamos el nuevo ícono para el celular
];

// Instalar el Service Worker y guardar en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // Fuerza a que se active de inmediato
});

// Activar y borrar cachés antiguas (Esto elimina el rastro del ícono negro)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar peticiones para que funcione sin internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
