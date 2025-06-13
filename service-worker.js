const CACHE_NAME = "hellprompts-cache-v4";
const ASSETS = [
  "/",
  "index.html",
  "styles.css",
  "app.js",
  "hellPrompts.en.json",
  "hellPrompts.tr.json",
];

function unique(array) {
  return Array.from(new Set(array));
}

async function detectPromptFiles() {
  try {
    const res = await fetch("./");
    const text = await res.text();
    const regex = /hellPrompts\.[^"'<>]+\.json/g;
    return unique(text.match(regex) || []);
  } catch (err) {
    console.error("Failed to detect prompt files", err);
    return [];
  }
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const promptFiles = await detectPromptFiles();
      await cache.addAll([...ASSETS, ...promptFiles]);
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (/hellPrompts\.[^/]+\.json$/.test(request.url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => response || fetch(request))
  );
});
