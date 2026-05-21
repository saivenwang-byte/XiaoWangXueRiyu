/** 単語：一课一词表同屏 · 每词一行一个喇叭 */
const VocabFlash = (() => {
  let lessonId = 14;
  let container = null;
  let state = null;
  let fromLesson = false;

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function showZh() {
    return state?.showChineseZh !== false;
  }

  function vocabList() {
    return typeof getLessonVocab === "function" ? getLessonVocab(lessonId) : [];
  }

  function speakPayload(v) {
    const rubyLine =
      v.ruby?.length && typeof RubyRender !== "undefined"
        ? RubyRender.toKanaReading(v.jp, v.ruby)
        : "";
    return {
      jp: v.jp,
      kana: v.kana || rubyLine || v.jp,
      ruby: v.ruby,
      example: v.example,
    };
  }

  function rowHtml(v, i) {
    const jp =
      v.ruby?.length && RubyRender.fromSegments
        ? RubyRender.fromSegments(v.jp, v.ruby)
        : v.kana && v.kana !== v.jp
          ? `<ruby>${escapeHtml(v.jp)}<rt>${escapeHtml(v.kana)}</rt></ruby>`
          : escapeHtml(v.jp);
    const payload = speakPayload(v);
    const actions =
      typeof ShadowSpeak !== "undefined"
        ? ShadowSpeak.rowHtml(payload, `vf-${v.id}`, `data-vocab-id="${escapeHtml(v.id)}"`)
        : typeof SpeakUI !== "undefined"
          ? SpeakUI.btnHtml(payload, `data-vocab-id="${escapeHtml(v.id)}"`)
          : `<button type="button" class="btn-speak-icon" data-jp="${escapeHtml(v.kana || v.jp)}">🔊</button>`;
    const meanZh =
      v.meaningZh && showZh() ? `<span class="vf-mean-zh">${escapeHtml(v.meaningZh)}</span>` : "";
    return `
      <li class="vf-word-row" data-idx="${i}">
        <div class="vf-word-main">
          <span class="vf-num">${i + 1}</span>
          <div class="vf-word-text">
            <p class="vf-jp-line jp">${jp}</p>
            <p class="vf-mean-line">${escapeHtml(v.meaningJa || "")}${meanZh}</p>
            ${v.example ? `<p class="vf-ex-line hint-ja">例：${escapeHtml(v.example)}</p>` : ""}
          </div>
        </div>
        ${actions}
      </li>`;
  }

  function warmAllVocab(list) {
    if (typeof SpeechEngine === "undefined" || !SpeechEngine.warmPhrases) return;
    const lines = [];
    list.forEach((v) => {
      const p = speakPayload(v);
      if (p.kana) lines.push(p.kana);
      if (p.jp && p.jp !== p.kana) lines.push(p.jp);
    });
    SpeechEngine.warmPhrases(lines);
  }

  function mount(el, lid, options) {
    container = el;
    lessonId = Number(lid);
    state = options.state || loadMvpState();
    fromLesson = !!options.fromLesson;
    const list = vocabList();
    if (!list.length) {
      container.innerHTML = `<p class="hint-ja">この課の単語リストは準備中です。</p>`;
      return;
    }
    warmAllVocab(list);
    render(list);
  }

  function render(list) {
    const L = getLessonMvp(lessonId);
    const themeZh =
      showZh() && L?.themeZh ? `<span class="zh-annotation">（${escapeHtml(L.themeZh)}）</span>` : "";
    const seen = state.flashProgress?.[lessonId]?.seen?.length || 0;

    const titlePayload =
      L?.lessonTitle && typeof RubyRender !== "undefined"
        ? {
            jp: L.lessonTitle,
            kana: L.lessonTitleRuby
              ? RubyRender.toKanaReading(L.lessonTitle, L.lessonTitleRuby)
              : L.lessonTitle,
            ruby: L.lessonTitleRuby,
          }
        : "";
    const lessonSpeak =
      titlePayload && typeof ShadowSpeak !== "undefined"
        ? ShadowSpeak.rowHtml(titlePayload, "vf-lesson", 'id="vf-lesson-speak"')
        : titlePayload && typeof SpeakUI !== "undefined"
          ? SpeakUI.btnHtml(titlePayload, 'id="vf-lesson-speak"')
          : "";

    container.innerHTML = `
      <div class="vf-wrap vf-list-mode">
        <h2>第${lessonId}課 · 本课单词一览</h2>
        <p class="lc-theme">${escapeHtml(L?.theme || "")}${themeZh}</p>
        <div class="vf-lesson-bar">
          <div class="vf-lesson-text">
            <p class="vf-lesson-label">本课课文（点 🔊 听）</p>
            <p class="jp vf-lesson-jp">${typeof RubyRender !== "undefined" && L?.lessonTitleRuby ? RubyRender.fromSegments(L.lessonTitle, L.lessonTitleRuby) : escapeHtml(L?.lessonTitle || "")}</p>
          </div>
          ${lessonSpeak}
        </div>
        <p class="hint-ja vf-list-hint">共 ${list.length} 个词 · 点每行右侧 🔊 听该词${seen ? ` · 已浏览 ${seen} 个` : ""}</p>
        <ul class="vf-word-list">${list.map((v, i) => rowHtml(v, i)).join("")}</ul>
        <button type="button" class="btn primary" id="vf-done" style="width:100%;margin-top:16px">看完了 → ② 会話</button>
      </div>
    `;

    container.querySelector("#vf-done").onclick = () => {
      list.forEach((v) => markFlashSeen(state, lessonId, v.id));
      touchStudyDay(state);
      if (typeof window.AppNav === "function") {
        window.AppNav("lesson", lessonId, 2);
      }
    };

    if (typeof ShadowSpeak !== "undefined") ShadowSpeak.bind(container);
    else if (typeof SpeakUI !== "undefined") SpeakUI.bind(container);
  }

  return { mount };
})();
