const cacheName = "Link Hospitality-Traine-1.1";
const contentToCache = [
    "Build/v1.16.loader.js",
    "Build/v1.16.framework.js",
    "Build/v1.16.data",
    "Build/v1.16.wasm",
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
