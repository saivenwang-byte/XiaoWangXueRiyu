/** 统一小喇叭：绑定、预加载、播放态 */
const SpeakUI = (() => {
  const SPEAKER_SVG = `<svg class="speak-icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;

  let toastEl = null;
  let toastTimer = null;

  function escAttr(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function ensureToast() {
    if (toastEl) return toastEl;
    toastEl = document.createElement("div");
    toastEl.id = "speak-toast";
    toastEl.className = "speak-toast";
    toastEl.setAttribute("role", "status");
    toastEl.hidden = true;
    document.getElementById("app")?.appendChild(toastEl);
    return toastEl;
  }

  function showToast(msg, ms = 2200) {
    const el = ensureToast();
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.hidden = true;
    }, ms);
  }

  function parsePayload(btn) {
    if (!btn) return "";
    if (btn.dataset.speak) {
      try {
        return JSON.parse(btn.dataset.speak);
      } catch {
        return btn.dataset.speak;
      }
    }
    if (btn.dataset.jp) return btn.dataset.jp;
    return "";
  }

  function collectLines(root) {
    const lines = [];
    if (!root) return lines;
    root.querySelectorAll("[data-jp],[data-speak]").forEach((el) => {
      const p = parsePayload(el);
      if (typeof SpeechEngine !== "undefined" && SpeechEngine.prepareJaTtsLine) {
        const line = SpeechEngine.prepareJaTtsLine(p);
        if (line) lines.push(line);
      } else if (typeof p === "string" && p) lines.push(p);
    });
    return lines;
  }

  function prefetchRoot(root) {
    if (typeof SpeechEngine === "undefined" || !SpeechEngine.warmPhrases) return;
    SpeechEngine.warmPhrases(collectLines(root));
  }

  /**
   * @param {string|object} payload
   * @param {string} extraAttrs 例如 id="gn-speak-title"
   */
  function btnHtml(payload, extraAttrs = "") {
    let dataAttr = "";
    if (typeof payload === "object" && payload !== null) {
      dataAttr = `data-speak="${escAttr(JSON.stringify(payload))}"`;
    } else {
      dataAttr = `data-jp="${escAttr(payload)}"`;
    }
    return `<button type="button" class="btn-speak-icon" aria-label="朗读" ${extraAttrs} ${dataAttr}>${SPEAKER_SVG}</button>`;
  }

  /** 行内：日文 + 小喇叭 */
  function lineHtml(jpText, payload, extraClass = "") {
    const p = payload != null ? payload : jpText;
    return `<span class="speak-line ${extraClass}"><span class="speak-line-text">${jpText}</span>${btnHtml(p)}</span>`;
  }

  async function speakFromButton(btn) {
    if (!btn || btn.disabled) return false;
    if (typeof SpeechEngine === "undefined" || !SpeechEngine.speakJa) {
      showToast("音声模块未加载");
      return false;
    }
    const payload = parsePayload(btn);
    btn.classList.add("is-speaking");
    const ok = await SpeechEngine.speakJa(payload);
    btn.classList.remove("is-speaking");
    if (!ok) {
      const wx = /MicroMessenger/i.test(navigator.userAgent || "");
      showToast(
        wx
          ? "朗读失败：微信内请连 WiFi/流量，或部署 Netlify 链接；也可稍后再点一次"
          : "朗读失败：请检查网络；首次加载语音包需稍等 1～2 秒"
      );
    }
    return ok;
  }

  function bind(root) {
    if (!root) return;
    const sel =
      "[data-speak], [data-jp], .btn-speak-icon, .btn-speak-round, .btn-speak, .dg-play-a, .dg-model, #dg-model, .gn-contrast-speak, .vf-speak, #vf-speak-jp, #vf-speak-ex, #vf-speak-repeat, #lesson-speak-title, #gn-speak-title, #gn-speak-explain, #gn-speak-example, #mini-speak-title, #mini-speak-ex";
    root.querySelectorAll(sel).forEach((btn) => {
      if (btn.dataset.speakBound === "1") return;
      if (btn.tagName !== "BUTTON" && !btn.dataset.speak && !btn.dataset.jp) return;
      btn.dataset.speakBound = "1";
      if (btn.classList.contains("btn-speak-round") && !btn.querySelector(".speak-icon-svg")) {
        btn.classList.remove("btn-speak-round");
        btn.classList.add("btn-speak-icon");
        btn.innerHTML = SPEAKER_SVG;
      }
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        speakFromButton(btn);
      });
    });
    prefetchRoot(root);
  }

  function observe(container) {
    bind(container);
  }

  return {
    bind,
    observe,
    speakFromButton,
    showToast,
    btnHtml,
    lineHtml,
    prefetchRoot,
    SPEAKER_SVG,
  };
})();
