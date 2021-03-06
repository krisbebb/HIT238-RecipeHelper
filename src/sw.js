var CACHE_TITLE = 'recipe-cache';
var CACHE_VERSION = 'v1';
var CACHE_NAME = CACHE_TITLE + '-' + CACHE_VERSION;
// const { assets } = global.serviceWorkerOption
var urlsToCache = [
  '/',
  '/favicon.ico',
  // './sw.js',
  '/images/icons/Cooking-icon128.png',
  '/images/icons/Cooking-icon512.png',
  '/css/edit.css',
  '/css/index.css',
  '/index.html',
  '/edit.html',
  '/js/index-bundle.js',
  '/js/edit-bundle.js',
  '/manifest.json',
  '/images/icons/Cooking-icon128.png'
];


self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
        
      }
    )
  );
});

self.addEventListener('activate', function(event) {

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
                    if(cacheName !== CACHE_NAME && cacheName.indexOf(CACHE_TITLE) === 0) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
