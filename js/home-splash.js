/**
 * P0 开机页 · 整图 cover-base.png 全屏（地图+虚线+六圆均在图内）
 * 缺图时回退 kO3 锁定红列岛 + 开发叠层
 * 换图：install-cover-base.py → bump SPLASH_ASSET_VER
 */
const HomeSplash = (function () {
  const SPLASH_ASSET_VER = "8";
  const SPLASH_COVER_BASE = "assets/splash/cover-base.png";
  const SPLASH_MAP_BODY = "assets/splash/japan-map-ko3.png";

  const SPLASH_DEV_STOPS = [
    { code: "02", x: 95, y: 248 },
    { code: "04", x: 128, y: 168 },
    { code: "03", x: 138, y: 148 },
    { code: "01", x: 148, y: 128 },
    { code: "05", x: 152, y: 88 },
    { code: "06", x: 142, y: 38 },
  ];

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function coverQuery() {
    return SPLASH_ASSET_VER ? `?s=${encodeURIComponent(SPLASH_ASSET_VER)}` : "";
  }

  function devPathD() {
    return SPLASH_DEV_STOPS.map((p, i) => `${i === 0 ? "M" : " L"} ${p.x} ${p.y}`).join("");
  }

  function devOverlayHtml() {
    const circles = SPLASH_DEV_STOPS.map(
      (p) => `<g>
        <circle cx="${p.x}" cy="${p.y}" r="14" fill="#ffffff" stroke="#90a4ae" stroke-width="3"/>
        <text x="${p.x}" y="${p.y + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#546e7a" font-family="system-ui,sans-serif">${p.code}</text>
      </g>`
    ).join("");
    return `<div class="splash-dev-overlay-wrap" aria-hidden="true">
      <svg class="splash-dev-overlay" viewBox="0 0 240 360" preserveAspectRatio="xMidYMid meet">
        <path class="splash-dev-track" d="${devPathD()}" fill="none" stroke="#c9a227" stroke-width="2.5" stroke-dasharray="6 4" stroke-linecap="round" stroke-linejoin="round"/>
        ${circles}
      </svg>
    </div>`;
  }

  function render() {
    const root = document.getElementById("splash-root");
    if (!root) return;
    const q = coverQuery();
    root.innerHTML = `
      <div class="splash-screen splash-screen--base" role="button" tabindex="0" aria-label="标日 あと学習 · 学习の道 · 点击进入">
        <div class="splash-base-panel" id="splash-base-panel">
          <img
            class="splash-cover-full"
            id="splash-cover-img"
            src="${escapeHtml(SPLASH_COVER_BASE + q)}"
            alt="标日 あと学習 · 学习の道"
            width="390"
            height="844"
            decoding="async"
          />
        </div>
      </div>`;

    const img = root.querySelector("#splash-cover-img");
    const panel = root.querySelector("#splash-base-panel");
    if (!img || !panel) return;

    function useKo3Fallback() {
      panel.classList.add("is-splash-ko3", "is-splash-ko3-fallback");
      img.className = "splash-map-locked";
      img.id = "splash-map-body";
      img.src = SPLASH_MAP_BODY + q;
      img.alt = "日本列岛学习路径";
      img.width = 548;
      img.height = 625;
      panel.insertAdjacentHTML("beforeend", devOverlayHtml());
    }

    img.addEventListener("error", function onErr() {
      img.removeEventListener("error", onErr);
      useKo3Fallback();
    });
  }

  function bind(onStart) {
    const screen = document.querySelector(".splash-screen--base");
    if (!screen || typeof onStart !== "function") return;

    function go() {
      onStart();
    }

    screen.addEventListener("click", go);
    screen.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
  }

  return {
    render,
    bind,
    ASSET_VER: SPLASH_ASSET_VER,
    COVER_BASE: SPLASH_COVER_BASE,
    MAP_BODY: SPLASH_MAP_BODY,
  };
})();
