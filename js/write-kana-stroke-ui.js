/**
 * 五十音书写笔顺 · 标日教辅静态表对齐（一览分色 · 数字+小箭头）
 * 数据 KANA_STROKE_GUIDE（animCJK 清洗 · LGPL）
 */
const WriteKanaStrokeUI = (function () {
  /** 与教材笔顺表一致：①红 ②绿 ③蓝 ④紫 */
  const STROKE_COLORS = ["#E53935", "#43A047", "#1E88E5", "#8E24AA", "#7B1FA2"];
  const ARROW_STROKE = "#212121";
  const ARROW_LEN = { normal: 20, focus: 26 };
  const PATH_W = { overview: 14, focus: 18, dim: 11 };

  let wrapEl = null;
  let svgEl = null;
  let guide = null;
  let stepIndex = 0;
  let guideOn = true;
  /** @type {"overview"|"focus"} */
  let viewMode = "overview";

  function hasGuide(kana) {
    return typeof KANA_STROKE_GUIDE !== "undefined" && !!KANA_STROKE_GUIDE[kana];
  }

  function strokeColor(i) {
    return STROKE_COLORS[i % STROKE_COLORS.length];
  }

  function pointsToD(pts) {
    if (!pts.length) return "";
    const [first, ...rest] = pts;
    let d = `M ${first[0]} ${first[1]}`;
    rest.forEach((p) => {
      d += ` L ${p[0]} ${p[1]}`;
    });
    return d;
  }

  function svgDefs() {
    const colorMarkers = STROKE_COLORS.map(
      (c, i) =>
        `<marker id="write-arr-${i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">` +
        `<path d="M0,0 L10,5 L0,10 Z" fill="${ARROW_STROKE}"/></marker>`
    ).join("");
    return `<defs>${colorMarkers}
      <marker id="write-arr-dot" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M0,0 L10,5 L0,10 Z" fill="${ARROW_STROKE}"/>
      </marker></defs>`;
  }

  function strokePath(pts, color, width, opacity) {
    const d = pointsToD(pts);
    return `<path class="write-stroke-path" d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"/>`;
  }

  function startMarker(pts, num, color, emphasis) {
    if (!pts.length) return "";
    const [sx, sy] = pts[0];
    const fs = emphasis ? 22 : 18;
    const nx = sx + 4;
    const ny = sy - 5;
    const fw = num === 1 ? 800 : 700;
    let arrowPart = "";
    if (pts.length >= 2) {
      const dx = pts[1][0] - sx;
      const dy = pts[1][1] - sy;
      const len = Math.hypot(dx, dy) || 1;
      const al = emphasis ? ARROW_LEN.focus : ARROW_LEN.normal;
      const ex = sx + (dx / len) * al;
      const ey = sy + (dy / len) * al;
      arrowPart = `<line class="write-stroke-arrow" x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${ARROW_STROKE}" stroke-width="4" stroke-linecap="round" marker-end="url(#write-arr-dot)"/>`;
    }
    return (
      `<text class="write-stroke-num" x="${nx}" y="${ny + fs * 0.32}" font-size="${fs}" font-weight="${fw}" fill="${color}" text-anchor="middle" stroke="#fff" stroke-width="3" paint-order="stroke fill">${num}</text>` +
      arrowPart
    );
  }

  function deriveStrokeTip(pts) {
    if (!pts || pts.length < 2) return "";
    const a = pts[0];
    const b = pts[pts.length - 1];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    if (ady <= adx * 0.45) return dx >= 0 ? "从左向右" : "从右向左";
    if (adx <= ady * 0.45) return dy >= 0 ? "从上向下" : "从下向上";
    if (dx > 0 && dy > 0) return "从左上向右下";
    if (dx < 0 && dy > 0) return "从右上向左下";
    return "沿箭头方向";
  }

  function strokeVisible(i) {
    if (!guideOn) return false;
    if (viewMode === "overview") return true;
    return i <= stepIndex;
  }

  function strokeEmphasis(i) {
    if (viewMode === "overview") return true;
    return i === stepIndex;
  }

  function strokeStyle(i) {
    const emph = strokeEmphasis(i);
    if (viewMode === "overview") {
      return { width: PATH_W.overview, opacity: 1 };
    }
    if (i < stepIndex) return { width: PATH_W.dim, opacity: 0.28 };
    if (i === stepIndex) return { width: PATH_W.focus, opacity: 1 };
    return { width: PATH_W.dim, opacity: 0 };
  }

  function renderSvg() {
    if (!svgEl || !guide) return;
    const parts = [svgDefs()];
    const n = guide.strokes.length;

    for (let i = 0; i < n; i++) {
      if (!strokeVisible(i)) continue;
      const pts = guide.strokes[i];
      const color = strokeColor(i);
      const emph = strokeEmphasis(i);
      const { width, opacity } = strokeStyle(i);
      parts.push(strokePath(pts, color, width, opacity));
      parts.push(startMarker(pts, i + 1, color, emph));
    }

    svgEl.innerHTML = parts.join("");
  }

  function updateLabels() {
    if (!wrapEl || !guide) return;
    const stepEl = wrapEl.querySelector(".write-l0-stroke-step");
    const total = guide.strokes.length;
    if (stepEl) {
      if (viewMode === "overview") {
        stepEl.textContent = total ? `共 ${total} 笔` : "";
      } else {
        const pts = guide.strokes[stepIndex];
        const dir = pts ? deriveStrokeTip(pts) : "";
        stepEl.textContent = total
          ? `第 ${stepIndex + 1}/${total} 笔${dir ? " · " + dir : ""}`
          : "";
      }
    }
    wrapEl.querySelectorAll(".write-l0-view-toggle button").forEach((btn) => {
      const m = btn.getAttribute("data-mode");
      btn.classList.toggle("is-on", m === viewMode);
    });
    syncFocusNavVisibility();
  }

  function setStep(i) {
    if (!guide) return;
    stepIndex = Math.max(0, Math.min(guide.strokes.length - 1, i));
    renderSvg();
    updateLabels();
  }

  function setViewMode(mode) {
    viewMode = mode === "focus" ? "focus" : "overview";
    if (viewMode === "focus") stepIndex = 0;
    syncFocusNavVisibility();
    renderSvg();
    updateLabels();
  }

  function syncFocusNavVisibility() {
    if (!wrapEl) return;
    const nav = wrapEl.querySelector(".write-l0-stroke-nav");
    const stepEl = wrapEl.querySelector(".write-l0-stroke-step");
    if (nav) nav.classList.toggle("is-visible", viewMode === "focus");
    if (stepEl) stepEl.classList.toggle("is-focus", viewMode === "focus");
    wrapEl.classList.toggle("is-focus-mode", viewMode === "focus");
  }

  function setGuideEnabled(on) {
    guideOn = !!on;
    if (svgEl) svgEl.classList.toggle("is-hidden", !guideOn);
    if (wrapEl) wrapEl.classList.toggle("is-off", !guideOn);
    renderSvg();
    updateLabels();
  }

  /** 田字格内分色笔顺（无工具栏 · 默认一览） */
  function mount(mizigeEl, kana) {
    destroy();
    guide = hasGuide(kana) ? KANA_STROKE_GUIDE[kana] : null;
    if (!guide || !mizigeEl) return false;

    stepIndex = 0;
    guideOn = true;
    viewMode = "overview";
    wrapEl = null;

    svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.setAttribute("class", "write-l0-stroke-svg");
    svgEl.setAttribute("viewBox", "0 0 1024 1024");
    svgEl.setAttribute("aria-hidden", "true");

    const canvas = mizigeEl.querySelector(".write-l0-canvas");
    mizigeEl.insertBefore(svgEl, canvas);

    renderSvg();
    return true;
  }

  function destroy() {
    if (svgEl && svgEl.parentNode) svgEl.parentNode.removeChild(svgEl);
    if (wrapEl && wrapEl.parentNode) wrapEl.parentNode.removeChild(wrapEl);
    svgEl = null;
    wrapEl = null;
    guide = null;
    stepIndex = 0;
    viewMode = "overview";
  }

  return { mount, destroy, hasGuide, setStep, setGuideEnabled, setViewMode, deriveStrokeTip };
})();
