var CACHE_NAME = 'static-cache';

console.log('Registering service worker')
const DEBUG_MODE = true

const basePath = '/davincijs/dist/'
var urlsToCache = [
  'index.html',
  'index.min.css',
  'index.min.js',

  'static/onsenui/css/onsenui.min.css',
  'plugins/example/index.js',
  'static/manifest.json',
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache.map( (url) => basePath + url));
    })
  );

});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
