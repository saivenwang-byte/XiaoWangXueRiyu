/** 気軽に · 単語フラッシュ（每课独立词表 · 左右切换 · 假名优先朗读） */
const VocabFlash = (() => {
  let lessonId = 14;
  let index = 0;
  let flipped = false;
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

  function current() {
    return vocabList()[index];
  }

  /** TTS 优先假名，避免汉字被读成中文 */
  function speakPayload(v) {
    if (!v) return "";
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

  function frontHtml(v) {
    if (v.ruby?.length && RubyRender.fromSegments) {
      return RubyRender.fromSegments(v.jp, v.ruby);
    }
    if (v.kana && v.kana !== v.jp) {
      return `<ruby>${escapeHtml(v.jp)}<rt>${escapeHtml(v.kana)}</rt></ruby>`;
    }
    return escapeHtml(v.jp);
  }

  function warmAllVocab(list) {
    if (typeof SpeechEngine === "undefined" || !SpeechEngine.warmPhrases) return;
    const lines = [];
    list.forEach((v) => {
      const p = speakPayload(v);
      if (p.kana) lines.push(p.kana);
      if (p.jp) lines.push(p.jp);
      if (p.example) lines.push(p.example);
    });
    SpeechEngine.warmPhrases(lines);
  }

  function mount(el, lid, options) {
    container = el;
    lessonId = Number(lid);
    state = options.state || loadMvpState();
    fromLesson = !!options.fromLesson;
    index = 0;
    flipped = false;
    const list = vocabList();
    if (!list.length) {
      container.innerHTML = `<p class="hint-ja">この課の単語リストは準備中です。</p>`;
      return;
    }
    warmAllVocab(list);
    render();
  }

  function goTo(i) {
    const list = vocabList();
    if (i < 0 || i >= list.length) return;
    index = i;
    flipped = false;
    render();
  }

  function render() {
    const list = vocabList();
    const L = getLessonMvp(lessonId);
    const v = list[index];
    const seen = state.flashProgress?.[lessonId]?.seen?.length || 0;
    const themeZh =
      showZh() && L?.themeZh ? `<span class="zh-annotation">（${escapeHtml(L.themeZh)}）</span>` : "";
    const payload = speakPayload(v);
    const speakBtn =
      typeof SpeakUI !== "undefined"
        ? SpeakUI.btnHtml(payload, 'id="vf-speak-jp" class="vf-speak"')
        : `<button type="button" class="btn-speak-icon vf-speak" id="vf-speak-jp" data-jp="${escapeHtml(v.kana || v.jp)}">🔊</button>`;

    container.innerHTML = `
      <div class="vf-wrap">
        <button type="button" class="btn-back" id="vf-back">← 戻る</button>
        <h2>第${lessonId}課 · 単語フラッシュ</h2>
        <p class="lc-theme">${escapeHtml(L?.theme || "")}${themeZh}</p>
        <p class="vf-progress">${index + 1} / ${list.length} · わかった ${seen} 枚</p>

        <div class="vf-nav">
          <button type="button" class="btn secondary" id="vf-prev" ${index === 0 ? "disabled" : ""}>← 前の単語</button>
          <button type="button" class="btn secondary" id="vf-next" ${index >= list.length - 1 ? "disabled" : ""}>次の単語 →</button>
        </div>

        <div class="vf-card ${flipped ? "flipped" : ""}" id="vf-card">
          <div class="vf-face vf-front">
            <p class="vf-label">日本語 · タップで意味 · 🔊＝听发音</p>
            <p class="vf-jp jp">${frontHtml(v)}</p>
            <div class="vf-speak-row">${speakBtn}</div>
            ${v.kana && v.kana !== v.jp ? `<p class="vf-kana-hint">読み：${escapeHtml(v.kana)}</p>` : ""}
          </div>
          <div class="vf-face vf-back">
            <p class="vf-label">意味</p>
            <p class="vf-mean jp">${escapeHtml(v.meaningJa || "")}</p>
            ${v.meaningZh && showZh() ? `<p class="zh-annotation">${escapeHtml(v.meaningZh)}</p>` : ""}
            ${v.example ? `<p class="vf-ex jp">${escapeHtml(v.example)}</p>` : ""}
            <div class="vf-speak-row" id="vf-speak-ex-wrap"></div>
          </div>
        </div>

        <div class="vf-actions">
          <div class="vf-replay">
            ${typeof SpeakUI !== "undefined" ? SpeakUI.btnHtml(payload, 'id="vf-speak-repeat"') : ""}
            <button type="button" class="btn secondary" id="vf-again">もう一回</button>
          </div>
          <button type="button" class="btn primary" id="vf-ok">わかった！（次へ）</button>
        </div>
        <p class="hint-ja vf-hint">左右切换只浏览；点「わかった」会记下并进入下一个</p>
      </div>
    `;

    container.querySelector("#vf-back").onclick = () => {
      if (typeof window.AppNav !== "function") return;
      if (fromLesson) window.AppNav("home");
      else window.AppNav("home");
    };

    container.querySelector("#vf-prev")?.addEventListener("click", () => goTo(index - 1));
    container.querySelector("#vf-next")?.addEventListener("click", () => goTo(index + 1));

    const card = container.querySelector("#vf-card");
    card.onclick = (e) => {
      if (e.target.closest("button")) return;
      flipped = !flipped;
      card.classList.toggle("flipped", flipped);
    };

    const exWrap = container.querySelector("#vf-speak-ex-wrap");
    if (exWrap && v.example) {
      exWrap.innerHTML =
        typeof SpeakUI !== "undefined"
          ? SpeakUI.btnHtml({ jp: v.example, kana: v.example }, 'id="vf-speak-ex"') +
            ` <span class="hint-ja">例文</span>`
          : `<button type="button" class="btn-speak-icon" id="vf-speak-ex" data-jp="${escapeHtml(v.example)}">🔊</button>`;
    }

    container.querySelector("#vf-again")?.addEventListener("click", (e) => {
      e.stopPropagation();
      const btn = container.querySelector("#vf-speak-repeat") || container.querySelector("#vf-speak-jp");
      if (typeof SpeakUI !== "undefined" && btn) SpeakUI.speakFromButton(btn);
      else if (typeof SpeechEngine !== "undefined") SpeechEngine.speakJa(payload);
    });

    container.querySelector("#vf-ok").onclick = () => {
      markFlashSeen(state, lessonId, v.id);
      if (index < list.length - 1) {
        goTo(index + 1);
      } else {
        touchStudyDay(state);
        container.innerHTML = `
          <div class="vf-wrap vf-done">
            <span class="big-emoji">🎉</span>
            <h3>第${lessonId}課 · 見終わり！</h3>
            <p class="hint-ja">${list.length}枚の単語を見ました。</p>
            <button type="button" class="btn primary" id="vf-to-lesson">② 会話練習へ</button>
            <button type="button" class="btn secondary" id="vf-home">ホームへ</button>
          </div>
        `;
        container.querySelector("#vf-to-lesson").onclick = () => {
          if (typeof window.AppNav === "function") window.AppNav("lesson", lessonId, 2);
        };
        container.querySelector("#vf-home").onclick = () => window.AppNav("home");
      }
    };

    if (typeof SpeakUI !== "undefined") {
      SpeakUI.bind(container);
    }
  }

  return { mount };
})();
