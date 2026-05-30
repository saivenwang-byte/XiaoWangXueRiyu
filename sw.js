/** Service Worker · P1 语音包分批预缓存（支持独立 TTS CDN） */
/* global self, caches, fetch */

const MANIFEST_URL = "tts-cache/sw-manifest.json";
const INDEX_URL = "tts-cache/index.json";
const DEFAULT_BATCH = 40;

function parseManifest(data) {
  if (!data || typeof data !== "object") return { cacheName: "hyouga-tts-v0", ttsBase: "", batchSize: DEFAULT_BATCH };
  const ver = String(data.cacheVer || "0").trim();
  const ttsBase = String(data.ttsBase || "").trim();
  const batchSize = Math.max(10, Math.min(80, Number(data.batchSize) || DEFAULT_BATCH));
  return {
    cacheName: "hyouga-tts-v" + ver,
    ttsBase: ttsBase.endsWith("/") ? ttsBase : ttsBase ? ttsBase + "/" : "",
    batchSize,
  };
}

function normalizeFileList(json) {
  if (Array.isArray(json)) return json.filter((f) => typeof f === "string" && f.endsWith(".mp3"));
  if (json && Array.isArray(json.keys)) {
    return json.keys.map((k) => String(k).replace(/\.mp3$/i, "") + ".mp3");
  }
  if (json && Array.isArray(json.files)) return json.files;
  return [];
}

async function loadPrecachePlan() {
  const cfgRes = await fetch(MANIFEST_URL, { cache: "no-store" });
  const cfg = parseManifest(cfgRes.ok ? await cfgRes.json() : {});
  const idxRes = await fetch(INDEX_URL, { cache: "no-store" });
  if (!idxRes.ok) return { ...cfg, urls: [] };
  const list = normalizeFileList(await idxRes.json());
  const urls = list.map((f) => cfg.ttsBase + f.replace(/^\//, ""));
  return { ...cfg, urls };
}

async function precacheUrls(cache, urls, batchSize) {
  let done = 0;
  const total = urls.length;
  for (let i = 0; i < urls.length; i += batchSize) {
    const chunk = urls.slice(i, i + batchSize);
    await Promise.all(
      chunk.map(async (url) => {
        try {
          const res = await fetch(url, { mode: "cors", credentials: "omit" });
          if (res.ok) await cache.put(url, res);
        } catch (_) {}
      })
    );
    done += chunk.length;
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    clients.forEach((c) => {
      try {
        c.postMessage({ type: "hyouga-tts-precache", done, total });
      } catch (_) {}
    });
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const plan = await loadPrecachePlan();
      const cache = await caches.open(plan.cacheName);
      if (plan.urls.length) {
        console.log("[SW] precache", plan.urls.length, "MP3 →", plan.cacheName);
        await precacheUrls(cache, plan.urls, plan.batchSize);
      }
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const plan = await loadPrecachePlan().catch(() => ({ cacheName: "hyouga-tts-v0" }));
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((n) => n.startsWith("hyouga-tts-") && n !== plan.cacheName)
          .map((n) => caches.delete(n))
      );
      await self.clients.claim();
    })()
  );
});

function isTtsMp3Request(url) {
  return url.pathname.includes("/tts-cache/") && url.pathname.endsWith(".mp3");
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (!isTtsMp3Request(url)) return;
  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      try {
        const res = await fetch(event.request, { mode: "cors", credentials: "omit" });
        if (res.ok) {
          const plan = await loadPrecachePlan().catch(() => ({ cacheName: "hyouga-tts-v0" }));
          const cache = await caches.open(plan.cacheName);
          await cache.put(event.request, res.clone());
        }
        return res;
      } catch (e) {
        const fallback = await caches.match(event.request);
        if (fallback) return fallback;
        return Response.error();
      }
    })()
  );
});
