const CACHE_NAME = "musculoprevent-v2";
const CORE_FILES = ["/", "/index.html", "/manifest.webmanifest", "/app-icon.svg", "/apple-touch-icon.png"];

async function cacheApplicationShell() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(CORE_FILES);

  // Vite gives each JS/CSS bundle a unique name. Reading the current HTML lets
  // us cache every bundle during installation, before the phone goes offline.
  const response = await fetch("/", { cache: "no-cache" });
  const html = await response.text();
  await cache.put("/", new Response(html, { headers: { "Content-Type": "text/html" } }));
  await cache.put("/index.html", new Response(html, { headers: { "Content-Type": "text/html" } }));
  const assets = [...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css)(?:\?[^"']*)?)["']/g)]
    .map(([, asset]) => new URL(asset, self.location.origin).pathname);
  await cache.addAll([...new Set(assets)]);
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheApplicationShell().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          const cache = await caches.open(CACHE_NAME);
          cache.put("/", response.clone());
          cache.put("/index.html", response.clone());
          return response;
        })
        .catch(() => caches.match("/").then((cached) => cached || caches.match("/index.html"))),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then(async (response) => {
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, response.clone());
        }
        return response;
      });
    }),
  );
});
