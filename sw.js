var CACHE_NAME = 'zoli-bazar-v1';
var ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/favicon.ico',
  '/icons/icon-192.png',
  '/icons/apple-touch-icon.png'
];

// Installation : mise en cache des assets statiques essentiels
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation : nettoyage des anciens caches éventuels
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interception des requêtes : Stratégie Network First pour garantir l'instantanéité des mises à jour
self.addEventListener('fetch', function (event) {
  // On ne gère pas les requêtes non-GET ou externes (comme Lemon Squeezy) via le cache
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(function (networkResponse) {
        // Si le réseau répond, on met à jour le cache en arrière-plan et on renvoie la réponse
        var responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      })
      .catch(function () {
        // Si le réseau est absent, on bascule sur le cache (Mode Hors-ligne)
        return caches.match(event.request);
      })
  );
});
