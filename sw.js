/** Service Worker · 语音包全量预缓存 + 离线播放 */
const CACHE_NAME = 'hyouga-tts-v281';
const TTS_CACHE_DIR = 'tts-cache/';

// 安装时：预缓存所有 tts-cache/*.mp3
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Fetch the list of MP3 files from our registry
      return fetch('tts-cache/index.json')
        .then((res) => res.json())
        .then((list) => {
          const urls = list.map((f) => TTS_CACHE_DIR + f);
          console.log('[SW] Pre-caching ' + urls.length + ' MP3s...');
          return cache.addAll(urls);
        })
        .catch(() => {
          // Fallback: cache all known MP3 filenames
          console.log('[SW] Progressive cache mode');
          return cache.addAll([]);
        });
    })
  );
});

// 激活时：清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n.startsWith('hyouga-tts-') && n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    )
  );
});

// 请求拦截：tts-cache/*.mp3 → 优先缓存，缓存未命中才走网络
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.includes('/tts-cache/') && url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        // 缓存未命中：网络获取 → 存入缓存 → 返回
        return fetch(event.request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return res;
        });
      })
    );
  }
});
