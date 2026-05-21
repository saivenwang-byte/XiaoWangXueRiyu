/** 强制卸载旧版 Service Worker，避免微信内长期缓存旧页面/旧颜色 */
self.addEventListener("install", (e) => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: "window", includeUncontrolled: true }))
      .then((clients) => {
        clients.forEach((c) => {
          try {
            if (c.url && c.navigate) c.navigate(c.url);
          } catch (_) {}
        });
      })
  );
});

self.addEventListener("fetch", () => {});
