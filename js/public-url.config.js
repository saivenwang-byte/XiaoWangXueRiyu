/**
 * 正式对外链接（微信人传人转发）
 * 改课后 push GitHub，约 1～2 分钟自动更新；链接域名不变。
 *
 * P0 语音加速：MP3 可与页面不同源（国内友好 CDN）。
 * 日后自有备案域名 / 腾讯云 COS：只改 HYOUGA_TTS_ORIGIN，并运行
 *   python scripts/sync-tts-sw-manifest.py
 */
window.HYOUGA_PUBLIC_ORIGIN = "https://saivenwang-byte.github.io/XiaoWangXueRiyu-v2";

/** 语音包静态根（不含 /tts-cache/）；留空 = 与当前页面同源 */
window.HYOUGA_TTS_ORIGIN =
  "https://cdn.jsdelivr.net/gh/saivenwang-byte/XiaoWangXueRiyu-v2@main";

/** 与 share-wechat.js CACHE_VER、tts-cache/sw-manifest.json 同步 */
window.HYOUGA_TTS_CACHE_VER = "359";
