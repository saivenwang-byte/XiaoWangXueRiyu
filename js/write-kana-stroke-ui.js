/**
 * 五十音书写笔顺 · 平/片分轨 · 弧线描边 + 淡色字形底稿
 * 数据 KANA_STROKE_GUIDE（animCJK · LGPL）
 */
const WriteKanaStrokeUI = (function () {
  const STROKE_COLORS = ["#E53935", "#43A047", "#1E88E5", "#8E24AA", "#7B1FA2"];
  const ARROW_STROKE = "#212121";
  const ARROW_LEN = { normal: 18, focus: 22 };

  /** 平假名：柔弧；片假名：略利但仍曲线 */
  const STYLE = {
    hiragana: {
      tension: 0.42,
      pathW: { overview: 10, focus: 13, dim: 7.5 },
      lineJoin: "round",
    },
    katakana: {
      tension: 0.26,
      pathW: { overview: 9.5, focus: 12, dim: 7 },
      lineJoin: "round",
    },
  };

  let wrapEl = null;
  let svgEl = null;
  let ghostEl = null;
  let guide = null;
  let stepIndex = 0;
  let guideOn = true;
  let scriptMode = "hiragana";
  /** @type {"overview"|"focus"} */
  let viewMode = "overview";

  function stylePack() {
    return STYLE[scriptMode] || STYLE.hiragana;
  }

  function hasGuide(kana) {
    return typeof KANA_STROKE_GUIDE !== "undefined" && !!KANA_STROKE_GUIDE[kana];
  }

  function strokeColor(i) {
    return STROKE_COLORS[i % STROKE_COLORS.length];
  }

  /** Catmull-Rom → 三次贝塞尔，避免「折线笔顺」观感 */
  function pointsToSmoothD(pts, tension) {
    if (!pts || pts.length < 2) return "";
    if (pts.length === 2) {
      return `M ${pts[0][0]} ${pts[0][1]} L ${pts[1][0]} ${pts[1][1]}`;
    }
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];
      const c1x = p1[0] + (p2[0] - p0[0]) * tension;
      const c1y = p1[1] + (p2[1] - p0[1]) * tension;
      const c2x = p2[0] - (p3[0] - p1[0]) * tension;
      const c2y = p2[1] - (p3[1] - p1[1]) * tension;
      d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
    }
    return d;
  }

  function svgDefs() {
    const colorMarkers = STROKE_COLORS.map(
      (c, i) =>
        `<marker id="write-arr-${i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto">` +
        `<path d="M0,0 L10,5 L0,10 Z" fill="${ARROW_STROKE}"/></marker>`
    ).join("");
    return `<defs>${colorMarkers}
      <marker id="write-arr-dot" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto">
        <path d="M0,0 L10,5 L0,10 Z" fill="${ARROW_STROKE}"/>
      </marker></defs>`;
  }

  function strokePath(pts, color, width, opacity) {
    const pack = stylePack();
    const d = pointsToSmoothD(pts, pack.tension);
    return (
      `<path class="write-stroke-path" d="${d}" fill="none" stroke="${color}" stroke-width="${width}" ` +
      `stroke-linecap="round" stroke-linejoin="${pack.lineJoin}" opacity="${opacity}"/>`
    );
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
      arrowPart = `<line class="write-stroke-arrow" x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${ARROW_STROKE}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#write-arr-dot)"/>`;
    }
    return (
      `<text class="write-stroke-num" x="${nx}" y="${ny + fs * 0.32}" font-size="${fs}" font-weight="${fw}" fill="${color}" text-anchor="middle" stroke="#fff" stroke-width="2" paint-order="stroke fill">${num}</text>` +
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
    return "沿弧线方向";
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
    const pw = stylePack().pathW;
    const emph = strokeEmphasis(i);
    if (viewMode === "overview") {
      return { width: pw.overview, opacity: 1 };
    }
    if (i < stepIndex) return { width: pw.dim, opacity: 0.28 };
    if (i === stepIndex) return { width: pw.focus, opacity: 1 };
    return { width: pw.dim, opacity: 0 };
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

  /**
   * @param {HTMLElement} mizigeEl
   * @param {string} kana 笔顺数据键
   * @param {{ script?: string, displayChar?: string }} [opts]
   */
  function mount(mizigeEl, kana, opts) {
    destroy();
    guide = hasGuide(kana) ? KANA_STROKE_GUIDE[kana] : null;
    if (!guide || !mizigeEl) return false;

    scriptMode = opts && opts.script === "katakana" ? "katakana" : "hiragana";
    const display = (opts && opts.displayChar) || kana;

    stepIndex = 0;
    guideOn = true;
    viewMode = "overview";
    wrapEl = null;

    mizigeEl.classList.remove("is-hiragana", "is-katakana");
    mizigeEl.classList.add(scriptMode === "katakana" ? "is-katakana" : "is-hiragana");

    ghostEl = mizigeEl.querySelector(".write-l0-trace-char");
    if (!ghostEl) {
      ghostEl = document.createElement("div");
      ghostEl.className = "write-l0-trace-char";
      ghostEl.setAttribute("aria-hidden", "true");
      const canvas = mizigeEl.querySelector(".write-l0-canvas");
      mizigeEl.insertBefore(ghostEl, canvas);
    }
    ghostEl.textContent = display;
    ghostEl.classList.remove("is-hidden");

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
    ghostEl = null;
    guide = null;
    stepIndex = 0;
    viewMode = "overview";
  }

  return { mount, destroy, hasGuide, setStep, setGuideEnabled, setViewMode, deriveStrokeTip };
})();
