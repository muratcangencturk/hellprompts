const CACHE_NAME = 'hellprompts-cache-v1';
const ASSETS = [
  '/',
  'index.html',
  'styles.css',
  'app.js',
  'hellPrompts.en.json',
  'hellPrompts.tr.json'
];
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
