/**
 * L0 五十音书写 · 清音 46+ん · 田字格 Canvas
 * 独立进度 state.write.kanaDone，不影响课内海星。
 */
const WriteKanaL0 = (function () {
  const STROKE_COLOR = "#37474F";
  const STROKE_WIDTH = 2.6;

  /** 假名种类切换 · 上行日文 / 下行中文（与注音 INTRO 一致） */
  const SCRIPT_LABELS = {
    hiragana: { jp: "ひらがな", zh: "平假名" },
    katakana: { jp: "カタカナ", zh: "片假名" },
  };

  /** 标日特殊读音标注（单字页副标题） */
  const BIAORI_READING_NOTE = {
    を: "读 o · 写作を",
    し: "读 shi",
    ち: "读 chi",
    つ: "读 tsu",
    ふ: "读 fu",
  };

  let hostEl = null;
  let stateRef = null;
  let persistFn = null;
  let screen = "grid";
  let currentEntry = null;
  let drawing = false;
  let canvasCtx = null;
  let canvasEl = null;
  let lastPoint = null;

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function ensureWriteState(state) {
    if (!state.write || typeof state.write !== "object") {
      state.write = { kanaDone: {}, script: "hiragana" };
    }
    if (!state.write.kanaDone || typeof state.write.kanaDone !== "object") {
      state.write.kanaDone = {};
    }
    if (!state.write.script) state.write.script = "hiragana";
    return state.write;
  }

  function toKatakana(hiragana) {
    return [...hiragana].map((ch) => {
      const c = ch.codePointAt(0);
      if (c >= 0x3041 && c <= 0x3096) return String.fromCodePoint(c + 0x60);
      return ch;
    }).join("");
  }

  function displayChar(entry) {
    const w = ensureWriteState(stateRef);
    if (w.script === "katakana") return toKatakana(entry.kana);
    return entry.kana;
  }

  function doneKey(entry) {
    return entry.kana;
  }

  function isDone(entry) {
    return !!ensureWriteState(stateRef).kanaDone[doneKey(entry)];
  }

  function setDone(entry, val) {
    const w = ensureWriteState(stateRef);
    if (val) w.kanaDone[doneKey(entry)] = true;
    else delete w.kanaDone[doneKey(entry)];
    if (persistFn) persistFn(stateRef);
  }

  function flatKanaList() {
    if (typeof INTRO_GOJUON_SEION !== "undefined" && Array.isArray(INTRO_GOJUON_SEION)) {
      const list = [];
      INTRO_GOJUON_SEION.forEach((row) => {
        (row.cells || []).forEach((c) => {
          if (c && c.kana) list.push({ kana: c.kana, row: row.row, romaji: c.romaji || "" });
        });
      });
      return list;
    }
    return [];
  }

  function progressCount() {
    const all = flatKanaList();
    const done = all.filter((e) => isDone(e)).length;
    return { done, total: all.length };
  }

  function speakBtnHtml(text) {
    if (typeof SpeakUI === "undefined") return "";
    const payload = { jp: text, kana: text, ttsLine: text };
    return SpeakUI.btnHtml(payload, 'class="btn-speak-icon write-l0-speak" title="听"');
  }

  function renderGrid() {
    if (typeof WriteKanaStrokeUI !== "undefined") WriteKanaStrokeUI.destroy();
    screen = "grid";
    const { done, total } = progressCount();
    const w = ensureWriteState(stateRef);
    const danHead = (typeof INTRO_GOJUON_DAN !== "undefined" ? INTRO_GOJUON_DAN : ["あ", "い", "う", "え", "お"])
      .map((d) => `<th class="write-l0-dan">${escapeHtml(d)}</th>`)
      .join("");

    function cellInner(c) {
      const entry = { kana: c.kana, row: "", romaji: c.romaji || "" };
      const doneCls = isDone(entry) ? " is-done" : "";
      const show = w.script === "katakana" ? toKatakana(c.kana) : c.kana;
      const pairBlock =
        w.script === "katakana"
          ? `<span class="write-l0-cell-hira">${escapeHtml(c.kana)}</span>`
          : "";
      return `<button type="button" class="write-l0-cell${doneCls}" data-kana="${escapeHtml(c.kana)}" aria-label="书写 ${escapeHtml(show)}${w.script === "katakana" ? " 平假名 " + c.kana : ""}">
        <span class="write-l0-cell-kana">${escapeHtml(show)}</span>
        <span class="write-l0-cell-roma">${escapeHtml(c.romaji || "")}</span>
        ${pairBlock}
      </button>`;
    }

    function cellHtml(c) {
      if (!c) return '<td class="write-l0-empty" aria-hidden="true"></td>';
      return `<td>${cellInner(c)}</td>`;
    }

    let body = "";
    if (typeof INTRO_GOJUON_SEION !== "undefined") {
      body = INTRO_GOJUON_SEION.map((row) => {
        const sparse = (row.cells || []).filter(Boolean).length < 5;
        const rowCls = sparse ? ' class="write-l0-row-sparse"' : "";
        if (row.row === "ん") {
          const c = row.cells[0];
          return `<tr class="write-l0-row-n"><td class="write-l0-row-label">${escapeHtml(row.row)}</td>${cellHtml(c)}<td colspan="4" class="write-l0-empty" aria-hidden="true"></td></tr>`;
        }
        const cells = row.cells.map((c) => cellHtml(c)).join("");
        return `<tr${rowCls}><td class="write-l0-row-label">${escapeHtml(row.row)}</td>${cells}</tr>`;
      }).join("");
    }

    const introHref =
      typeof ShareWechat !== "undefined" && ShareWechat.CACHE_VER
        ? `intro.html?v=${ShareWechat.CACHE_VER}`
        : "intro.html";

    hostEl.innerHTML = `
      <div class="write-l0-hero">
        <h2>五十音书写</h2>
        <p class="write-l0-sub zh-annotation">认在「注音」· 写在「书写」· 进度不计课内海星</p>
        <span class="write-l0-progress" aria-live="polite">已练 ${done} / ${total}</span>
      </div>
      <details class="write-l0-learn-path">
        <summary class="write-l0-learn-summary">
          <span class="write-l0-learn-chevron" aria-hidden="true"></span>
          <span class="write-l0-learn-summary-text">初学者怎么写（4 步）</span>
        </summary>
        <div class="write-l0-learn-body">
          <ol class="write-l0-learn-steps zh-annotation">
            <li><strong>认</strong>：底栏「注音」听清读音与行段</li>
            <li><strong>看</strong>：点假名 → 一览笔顺（分色·数字·箭头）</li>
            <li><strong>写</strong>：田字格内跟分色笔顺摹写</li>
            <li><strong>完成</strong>：点完成打勾，随时可重练</li>
          </ol>
          <p class="write-l0-learn-link zh-annotation">
            还不会读？先 <a href="${escapeHtml(introHref)}">去注音</a> 再回来写。
          </p>
        </div>
      </details>
      <div class="write-l0-toolbar">
        <div class="write-l0-script-toggle" role="group" aria-label="假名种类">
          <button type="button" data-script="hiragana" class="${w.script === "hiragana" ? "is-on" : ""}">
            <span class="write-l0-script-jp">${SCRIPT_LABELS.hiragana.jp}</span>
            <span class="write-l0-script-zh zh-annotation">${SCRIPT_LABELS.hiragana.zh}</span>
          </button>
          <button type="button" data-script="katakana" class="${w.script === "katakana" ? "is-on" : ""}">
            <span class="write-l0-script-jp">${SCRIPT_LABELS.katakana.jp}</span>
            <span class="write-l0-script-zh zh-annotation">${SCRIPT_LABELS.katakana.zh}</span>
          </button>
        </div>
      </div>
      <div class="write-l0-grid-wrap">
        <table class="write-l0-table" aria-label="清音书写表">
          <thead><tr><th class="write-l0-row-label">行</th>${danHead}</tr></thead>
          <tbody>${body}</tbody>
        </table>
      </div>
      <p class="write-l0-hint">点假名 · 按笔顺颜色跟写 · 写完点「完成」</p>`;

    hostEl.querySelectorAll(".write-l0-cell[data-kana]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const kana = btn.getAttribute("data-kana");
        const entry = flatKanaList().find((e) => e.kana === kana);
        if (entry) openSheet(entry);
      });
    });
    hostEl.querySelectorAll(".write-l0-script-toggle button").forEach((btn) => {
      btn.addEventListener("click", () => {
        w.script = btn.getAttribute("data-script") || "hiragana";
        if (persistFn) persistFn(stateRef);
        renderGrid();
      });
    });
  }

  function resizeCanvas() {
    if (!canvasEl || !canvasCtx) return;
    const box = canvasEl.parentElement;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    canvasEl.width = w;
    canvasEl.height = h;
    canvasEl.style.width = `${rect.width}px`;
    canvasEl.style.height = `${rect.height}px`;
    canvasCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvasCtx.lineCap = "round";
    canvasCtx.lineJoin = "round";
    canvasCtx.strokeStyle = STROKE_COLOR;
    canvasCtx.lineWidth = STROKE_WIDTH;
  }

  function clearCanvas() {
    if (!canvasEl || !canvasCtx) return;
    const rect = canvasEl.getBoundingClientRect();
    canvasCtx.clearRect(0, 0, rect.width, rect.height);
  }

  function pointFromEvent(ev) {
    const rect = canvasEl.getBoundingClientRect();
    const clientX = ev.clientX != null ? ev.clientX : (ev.touches && ev.touches[0] ? ev.touches[0].clientX : 0);
    const clientY = ev.clientY != null ? ev.clientY : (ev.touches && ev.touches[0] ? ev.touches[0].clientY : 0);
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function bindCanvas() {
    if (!canvasEl) return;
    const start = (ev) => {
      ev.preventDefault();
      drawing = true;
      lastPoint = pointFromEvent(ev);
    };
    const move = (ev) => {
      if (!drawing) return;
      ev.preventDefault();
      const p = pointFromEvent(ev);
      canvasCtx.beginPath();
      canvasCtx.moveTo(lastPoint.x, lastPoint.y);
      canvasCtx.lineTo(p.x, p.y);
      canvasCtx.stroke();
      lastPoint = p;
    };
    const end = () => {
      drawing = false;
      lastPoint = null;
    };
    canvasEl.addEventListener("pointerdown", start);
    canvasEl.addEventListener("pointermove", move);
    canvasEl.addEventListener("pointerup", end);
    canvasEl.addEventListener("pointercancel", end);
    canvasEl.addEventListener("pointerleave", end);
  }

  /** 单字顶栏：片假名模式显示 カタ + ひら 对照（笔顺数据为平假名） */
  function sheetTitleHtml(entry) {
    const w = ensureWriteState(stateRef);
    const hira = entry.kana;
    const row = entry.row || "清音";
    if (w.script === "katakana") {
      const kata = toKatakana(hira);
      return (
        `<span class="jp write-l0-sheet-kana">${escapeHtml(kata)}</span>` +
        `<span class="write-l0-sheet-pair jp" title="平假名">${escapeHtml(hira)}</span>` +
        `<span class="write-l0-sheet-meta"> · ${escapeHtml(row)}</span>` +
        `<span class="write-l0-sheet-stroke-note zh-annotation">笔顺按平假名（标日）</span>`
      );
    }
    return (
      `<span class="jp write-l0-sheet-kana">${escapeHtml(hira)}</span>` +
      `<span class="write-l0-sheet-meta"> · ${escapeHtml(row)}</span>`
    );
  }

  function openSheet(entry) {
    if (typeof WriteKanaStrokeUI !== "undefined") WriteKanaStrokeUI.destroy();
    screen = "sheet";
    currentEntry = entry;
    const readNote = BIAORI_READING_NOTE[entry.kana] || "";

    hostEl.innerHTML = `
      <div class="write-l0-sheet">
        <div class="write-l0-sheet-head">
          <button type="button" class="write-l0-back" id="write-l0-back">← 清音表</button>
          <h2 class="write-l0-sheet-title">
            ${sheetTitleHtml(entry)}
          </h2>
          ${speakBtnHtml(entry.kana)}
        </div>
        ${readNote ? `<p class="write-l0-biaori-note zh-annotation">${escapeHtml(readNote)}</p>` : ""}
        <p class="write-l0-hint write-l0-hint--sheet zh-annotation">田字格 · 分色笔顺 · 跟数字与箭头在格内摹写</p>
        <div class="write-l0-mizige-wrap">
          <div class="write-l0-mizige" id="write-l0-mizige">
            <div class="write-l0-mizige-gridlines" aria-hidden="true"></div>
            <canvas class="write-l0-canvas" id="write-l0-canvas" aria-label="书写区域"></canvas>
          </div>
        </div>
        <div class="write-l0-sheet-actions write-l0-sheet-actions--solo">
          <button type="button" class="btn primary" id="write-l0-done">完成 · 返回清音表</button>
        </div>
      </div>`;

    canvasEl = document.getElementById("write-l0-canvas");
    canvasCtx = canvasEl.getContext("2d");
    bindCanvas();
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const mizige = document.getElementById("write-l0-mizige");
    if (typeof WriteKanaStrokeUI !== "undefined" && mizige) {
      if (!WriteKanaStrokeUI.hasGuide(entry.kana)) {
        const hint = hostEl.querySelector(".write-l0-hint");
        if (hint) {
          hint.textContent = "在田字格内书写 · 该字笔顺数据准备中";
        }
      } else {
        WriteKanaStrokeUI.mount(mizige, entry.kana);
      }
    }

    function leaveSheet() {
      if (typeof WriteKanaStrokeUI !== "undefined") WriteKanaStrokeUI.destroy();
      window.removeEventListener("resize", resizeCanvas);
    }

    document.getElementById("write-l0-done").addEventListener("click", () => {
      setDone(entry, true);
      if (typeof touchStudyDay === "function") touchStudyDay(stateRef);
      leaveSheet();
      renderGrid();
    });
    document.getElementById("write-l0-back").addEventListener("click", () => {
      leaveSheet();
      renderGrid();
    });

    if (typeof SpeakUI !== "undefined") SpeakUI.bindAll(hostEl);
  }

  function render(root, state, onPersist) {
    if (!root) return;
    hostEl = root;
    stateRef = state;
    persistFn = onPersist;
    ensureWriteState(stateRef);
    if (flatKanaList().length === 0) {
      hostEl.innerHTML =
        '<p class="write-l0-hint">清音数据未加载，请刷新页面。</p>';
      return;
    }
    if (screen === "sheet" && currentEntry) openSheet(currentEntry);
    else renderGrid();
  }

  return { render, flatKanaList, progressCount };
})();
