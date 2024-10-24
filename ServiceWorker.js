const cacheName = "DefaultCompany-traine-1.0";
const contentToCache = [
    "Build/GuillaumeChich.github.io.loader.js",
    "Build/GuillaumeChich.github.io.framework.js",
    "Build/GuillaumeChich.github.io.data",
    "Build/GuillaumeChich.github.io.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    if (e.request.url.includes('.mp4') || e.request.url.includes('.webm')) {
        return;
    }
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
