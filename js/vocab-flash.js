/** 気軽に · 単語フラッシュ（每课独立词表） */
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

  function frontHtml(v) {
    if (v.ruby?.length && RubyRender.fromSegments) {
      return RubyRender.fromSegments(v.jp, v.ruby);
    }
    if (v.kana && v.kana !== v.jp) {
      return `<ruby>${escapeHtml(v.jp)}<rt>${escapeHtml(v.kana)}</rt></ruby>`;
    }
    return escapeHtml(v.jp);
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
    render();
  }

  function render() {
    const list = vocabList();
    const L = getLessonMvp(lessonId);
    const v = list[index];
    const seen = state.flashProgress?.[lessonId]?.seen?.length || 0;
    const themeZh =
      showZh() && L?.themeZh ? `<span class="zh-annotation">（${escapeHtml(L.themeZh)}）</span>` : "";

    container.innerHTML = `
      <div class="vf-wrap">
        <button type="button" class="btn-back" id="vf-back">← 戻る</button>
        <h2>第${lessonId}課 · 単語フラッシュ</h2>
        <p class="lc-theme">${escapeHtml(L?.theme || "")}${themeZh}</p>
        <p class="vf-progress">${index + 1} / ${list.length} · わかった ${seen} 枚</p>

        <div class="vf-card ${flipped ? "flipped" : ""}" id="vf-card">
          <div class="vf-face vf-front">
            <p class="vf-label">日本語 · タップで意味</p>
            <p class="vf-jp jp">${frontHtml(v)}</p>
            <button type="button" class="btn-speak-round vf-speak" id="vf-speak-jp" aria-label="日本語で読む" data-jp="">🔊</button>
          </div>
          <div class="vf-face vf-back">
            <p class="vf-label">意味</p>
            <p class="vf-mean jp">${escapeHtml(v.meaningJa || "")}</p>
            ${v.meaningZh && showZh() ? `<p class="zh-annotation">${escapeHtml(v.meaningZh)}</p>` : ""}
            ${v.example ? `<p class="vf-ex jp">${escapeHtml(v.example)}</p>` : ""}
            <button type="button" class="btn secondary btn-sm" id="vf-speak-ex">🔊 例文</button>
          </div>
        </div>

        <div class="vf-actions">
          <button type="button" class="btn secondary" id="vf-again">もう一回 🔊</button>
          <button type="button" class="btn primary" id="vf-ok">わかった！</button>
        </div>
        <p class="hint-ja vf-hint">失敗なし · 気軽にどうぞ</p>
      </div>
    `;

    container.querySelector("#vf-back").onclick = () => {
      if (typeof window.AppNav !== "function") return;
      if (fromLesson) window.AppNav("lesson", lessonId, 2);
      else window.AppNav("home");
    };

    const card = container.querySelector("#vf-card");
    card.onclick = (e) => {
      if (e.target.closest("button")) return;
      flipped = !flipped;
      card.classList.toggle("flipped", flipped);
    };

    const btnJp = container.querySelector("#vf-speak-jp");
    if (btnJp) btnJp.dataset.jp = v.jp;
    const btnSpeakEx = container.querySelector("#vf-speak-ex");
    if (btnSpeakEx && v.example) btnSpeakEx.dataset.jp = v.example;
    container.querySelector("#vf-again")?.setAttribute("data-jp", v.jp);

    container.querySelector("#vf-ok").onclick = () => {
      markFlashSeen(state, lessonId, v.id);
      if (index < list.length - 1) {
        index++;
        flipped = false;
        render();
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
      SpeakUI.speakFromButton(btnJp || container.querySelector("#vf-speak-jp"));
    } else {
      SpeechEngine.speakJa(v);
    }
  }

  return { mount };
})();
