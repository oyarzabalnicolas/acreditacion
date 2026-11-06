var C = 'acred-v1';
self.addEventListener('install', function (e) { self.skipWaiting(); e.waitUntil(caches.open(C).then(function (c) { return c.addAll(['./', 'config.js', 'manifest.json', 'logo.png', 'estampa-1.jpg', 'estampa-2.jpg']); })); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) { var k = r.clone(); caches.open(C).then(function (c) { c.put(e.request, k); }); return r; }).catch(function () { return caches.match(e.request); }));
});
