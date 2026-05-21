const CACHE = "hyouga-mvp-v11";
const PRECACHE = [
  "./",
  "./index.html",
  "./share.html",
  "./legacy.html",
  "./css/app.css",
  "./css/mvp.css",
  "./manifest.json",
  "./icons/icon.svg",
];

function isMutableAsset(url) {
  const p = url.pathname;
  return p.includes("/js/") || p.includes("/css/") || p.endsWith(".html");
}

function isTtsCache(url) {
  return url.pathname.includes("/tts-cache/");
}

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  if (isMutableAsset(url) || isTtsCache(url)) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => {
      const net = fetch(e.request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || net;
    })
  );
});
