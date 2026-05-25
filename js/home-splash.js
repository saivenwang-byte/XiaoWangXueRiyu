/**
 * P0 开机页 · 品牌 + 探索地图（与课文目录分离）+ 开始学习
 */
const HomeSplash = (function () {
  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function cacheVer() {
    return typeof ShareWechat !== "undefined" && ShareWechat.CACHE_VER
      ? ShareWechat.CACHE_VER
      : "";
  }

  function mapBlock(state) {
    if (typeof JourneyHome !== "undefined" && JourneyHome.renderSplashMap) {
      return JourneyHome.renderSplashMap(state);
    }
    const v = cacheVer();
    const mapSrc = v
      ? `assets/splash/japan-map-splash.png?v=${v}`
      : "assets/splash/japan-map-splash.png";
    return `<div class="journey-map-core journey-map-core--splash">
      <img class="splash-map-fallback" src="${escapeHtml(mapSrc)}" alt="日本列岛学习路径" width="240" height="360" decoding="async" />
    </div>`;
  }

  function render(options) {
    const root = document.getElementById("splash-root");
    if (!root) return;
    const state =
      options?.state || (typeof loadMvpState === "function" ? loadMvpState() : null);
    const v = cacheVer();
    const iconSrc = v ? `icons/icon.svg?v=${v}` : "icons/icon.svg";
    root.innerHTML = `
      <div class="splash-screen splash-screen--cover">
        <header class="splash-brand">
          <div class="splash-logo" aria-hidden="true">
            <span class="splash-logo-bg"></span>
            <img src="${escapeHtml(iconSrc)}" alt="" width="36" height="36" decoding="async" />
          </div>
          <h1 class="splash-title">标日 あと学習</h1>
          <p class="splash-path jp">学習の道</p>
          <p class="splash-sub zh-annotation">新幹線 24 駅 · 探索型学习</p>
        </header>
        <div class="splash-map-host" aria-label="日本列岛学习路径">
          ${mapBlock(state)}
        </div>
        <footer class="splash-cta">
          <button type="button" class="btn primary splash-btn-start" id="btn-splash-start">开始学习</button>
          <p class="splash-cta-hint zh-annotation">注音 · 五十音在底栏「注音」</p>
        </footer>
      </div>`;
  }

  function bind(onStart) {
    const btn = document.getElementById("btn-splash-start");
    if (!btn) return;
    btn.onclick = () => {
      if (typeof onStart === "function") onStart();
    };
  }

  return { render, bind };
})();
