const CACHE_NAME = 'hsah-2026-pwa-v3';
const CORE = ['./', './index.html', './manifest.webmanifest'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE).catch(()=>{}))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))); self.clients.claim(); });
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(fetch(req).then(response => { const copy=response.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(req,copy)); return response; }).catch(()=>caches.match(req).then(cached=>cached || caches.match('./'))));
});
