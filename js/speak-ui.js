/** 统一 🔊：绑定、播放态、失败提示 */
const SpeakUI = (() => {
  let toastEl = null;
  let toastTimer = null;

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

  async function speakFromButton(btn) {
    if (!btn || btn.disabled) return false;
    if (typeof SpeechEngine === "undefined" || !SpeechEngine.speakJa) {
      showToast("音声モジュールが読み込めません");
      return false;
    }
    const payload = parsePayload(btn);
    btn.classList.add("is-speaking");
    const ok = await SpeechEngine.speakJa(payload);
    btn.classList.remove("is-speaking");
    if (!ok) {
      showToast("音声を再生できません（ネット接続または音声パックを確認）");
    }
    return ok;
  }

  function bind(root) {
    if (!root) return;
    const sel =
      "[data-speak], [data-jp], .btn-speak-round, .btn-speak, .dg-play-a, .dg-model, #dg-model, .gn-contrast-speak, .vf-speak, #vf-speak-jp, #vf-speak-ex, #vf-again, #lesson-speak-title, #gn-speak-title, #gn-speak-explain, #gn-speak-example, #mini-speak-title, #mini-speak-ex";
    root.querySelectorAll(sel).forEach((btn) => {
      if (btn.dataset.speakBound === "1") return;
      if (btn.tagName !== "BUTTON" && !btn.dataset.speak && !btn.dataset.jp) return;
      btn.dataset.speakBound = "1";
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        speakFromButton(btn);
      });
    });
  }

  function observe(container) {
    bind(container);
  }

  return { bind, observe, speakFromButton, showToast };
})();
