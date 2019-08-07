importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

console.log("Offline mode avaiable")

workbox.routing.registerRoute(
 /\.(?:js|css)$/,
 new workbox.strategies.StaleWhileRevalidate(),
);
