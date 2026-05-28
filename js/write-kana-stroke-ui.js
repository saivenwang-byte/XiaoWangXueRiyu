/**
 * 五十音描红笔顺 · P0.5 静态一览（分色 + 起点数字·小箭头 + 笔间虚线）
 * 参考：happylilac カラー書き順 / 粉色笔顺标注表 · 数据 KANA_STROKE_GUIDE（animCJK · LGPL）
 */
const WriteKanaStrokeUI = (function () {
  const STROKE_COLORS = ["#E53935", "#1E88E5", "#43A047", "#8E24AA", "#FB8C00"];
  const FLY_COLOR = "rgba(233, 30, 99, 0.55)";
  const ARROW_LEN = { normal: 52, emphasis: 68 };

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

  function lastPt(pts) {
    return pts[pts.length - 1];
  }

  function svgDefs() {
    return `<defs>${STROKE_COLORS.map(
      (c, i) =>
        `<marker id="write-arr-${i}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">` +
        `<path d="M0,0 L10,5 L0,10 Z" fill="${c}"/></marker>`
    ).join("")}</defs>`;
  }

  function strokePath(pts, color, opacity, width) {
    const d = pointsToD(pts);
    return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"/>`;
  }

  /** 笔间抬笔移笔 · 虚线 */
  function flyLine(fromPts, toPts) {
    const a = lastPt(fromPts);
    const b = toPts[0];
    return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${FLY_COLOR}" stroke-width="14" stroke-dasharray="18 22" stroke-linecap="round" opacity="0.75"/>`;
  }

  /** 起点：笔序数字 + 起笔处短箭头（无空心圆、无笔划内长线） */
  function startMarker(pts, num, color, emphasis) {
    if (!pts.length) return "";
    const [sx, sy] = pts[0];
    const fs = emphasis ? 46 : 36;
    const nx = sx - fs * 0.95;
    const ny = sy - fs * 1.05;
    const fw = num === 1 ? 800 : 700;
    const idx = STROKE_COLORS.indexOf(color);
    const marker = idx >= 0 ? `url(#write-arr-${idx})` : "";
    const arrowW = emphasis ? 18 : 14;
    let arrowPart = "";
    if (pts.length >= 2) {
      const dx = pts[1][0] - sx;
      const dy = pts[1][1] - sy;
      const len = Math.hypot(dx, dy) || 1;
      const al = emphasis ? ARROW_LEN.emphasis : ARROW_LEN.normal;
      const ex = sx + (dx / len) * al;
      const ey = sy + (dy / len) * al;
      arrowPart = `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${color}" stroke-width="${arrowW}" stroke-linecap="round" marker-end="${marker}" opacity="0.95"/>`;
    }
    return (
      `<text x="${nx}" y="${ny + fs * 0.35}" font-size="${fs}" font-weight="${fw}" fill="${color}" text-anchor="middle" class="write-stroke-num">${num}</text>` +
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

  function strokeOpacity(i) {
    if (viewMode === "overview") return 0.92;
    if (i < stepIndex) return 0.35;
    if (i === stepIndex) return 1;
    return 0;
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
      const op = strokeOpacity(i);
      const w = emph ? 96 : 72;
      parts.push(strokePath(pts, color, op, w));
      parts.push(startMarker(pts, i + 1, color, emph));
      if (viewMode === "overview" && i < n - 1) {
        parts.push(flyLine(pts, guide.strokes[i + 1]));
      }
      if (viewMode === "focus" && i === stepIndex && i < n - 1) {
        parts.push(flyLine(pts, guide.strokes[i + 1]));
      }
    }

    svgEl.innerHTML = parts.join("");
  }

  function updateLabels() {
    if (!wrapEl || !guide) return;
    const stepEl = wrapEl.querySelector(".write-l0-stroke-step");
    const tipEl = wrapEl.querySelector(".write-l0-stroke-tip");
    const total = guide.strokes.length;
    if (stepEl) {
      if (viewMode === "overview") {
        stepEl.textContent = total ? `共 ${total} 笔 · 按数字顺序写` : "";
      } else {
        stepEl.textContent = total ? `专注 · 第 ${stepIndex + 1} / ${total} 笔` : "";
      }
    }
    if (tipEl && guideOn) {
      const pts = guide.strokes[viewMode === "focus" ? stepIndex : 0];
      const dir = pts ? deriveStrokeTip(pts) : "";
      tipEl.textContent =
        viewMode === "overview"
          ? "先看全笔颜色与箭头，再在格内摹写"
          : dir
            ? `第 ${stepIndex + 1} 笔：起笔后 ${dir}`
            : "";
    } else if (tipEl) {
      tipEl.textContent = "";
    }
    wrapEl.querySelectorAll(".write-l0-view-toggle button").forEach((btn) => {
      const m = btn.getAttribute("data-mode");
      btn.classList.toggle("is-on", m === viewMode);
    });
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
    const nav = wrapEl.querySelector(".write-l0-stroke-nav--focus-only");
    if (nav) nav.classList.toggle("is-visible", viewMode === "focus");
  }

  function setGuideEnabled(on) {
    guideOn = !!on;
    if (svgEl) svgEl.classList.toggle("is-hidden", !guideOn);
    if (wrapEl) wrapEl.classList.toggle("is-off", !guideOn);
    renderSvg();
    updateLabels();
  }

  function mount(mizigeEl, kana) {
    destroy();
    guide = hasGuide(kana) ? KANA_STROKE_GUIDE[kana] : null;
    if (!guide || !mizigeEl) return false;

    stepIndex = 0;
    guideOn = true;
    viewMode = "overview";

    wrapEl = document.createElement("div");
    wrapEl.className = "write-l0-stroke-bar";
    wrapEl.innerHTML = `
      <label class="write-l0-stroke-toggle">
        <input type="checkbox" id="write-stroke-guide-cb" checked />
        <span>笔顺提示</span>
      </label>
      <div class="write-l0-view-toggle" role="group" aria-label="查看模式">
        <button type="button" class="btn ghost btn-sm is-on" data-mode="overview">一览</button>
        <button type="button" class="btn ghost btn-sm" data-mode="focus">专注</button>
      </div>
      <span class="write-l0-stroke-step" aria-live="polite"></span>
      <div class="write-l0-stroke-nav write-l0-stroke-nav--focus-only">
        <button type="button" class="btn ghost btn-sm" id="write-stroke-prev" title="上一笔">‹</button>
        <button type="button" class="btn ghost btn-sm" id="write-stroke-next" title="下一笔">›</button>
      </div>
      <p class="write-l0-stroke-legend zh-annotation">
        <span class="write-l0-swatch" style="background:#E53935"></span>①
        <span class="write-l0-swatch" style="background:#1E88E5"></span>②
        <span class="write-l0-swatch" style="background:#43A047"></span>③ …
        数字=笔序 · 小箭头=起笔方向 · 虚线=抬笔移笔
      </p>
      <p class="write-l0-stroke-tip zh-annotation" aria-live="polite"></p>`;

    svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.setAttribute("class", "write-l0-stroke-svg");
    svgEl.setAttribute("viewBox", "0 0 1024 1024");
    svgEl.setAttribute("aria-hidden", "true");

    const canvas = mizigeEl.querySelector(".write-l0-canvas");
    mizigeEl.insertBefore(svgEl, canvas);

    const sheet = mizigeEl.closest(".write-l0-sheet");
    const hint = sheet && sheet.querySelector(".write-l0-hint");
    if (hint && hint.parentNode) {
      hint.parentNode.insertBefore(wrapEl, hint.nextSibling);
    }

    wrapEl.querySelector("#write-stroke-guide-cb").addEventListener("change", (e) => {
      setGuideEnabled(e.target.checked);
    });
    wrapEl.querySelectorAll(".write-l0-view-toggle button").forEach((btn) => {
      btn.addEventListener("click", () => setViewMode(btn.getAttribute("data-mode")));
    });
    wrapEl.querySelector("#write-stroke-prev").addEventListener("click", () => {
      setViewMode("focus");
      setStep(stepIndex - 1);
    });
    wrapEl.querySelector("#write-stroke-next").addEventListener("click", () => {
      setViewMode("focus");
      setStep(stepIndex + 1);
    });

    renderSvg();
    updateLabels();
    syncFocusNavVisibility();
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
