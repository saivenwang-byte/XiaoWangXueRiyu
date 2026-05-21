/** 第二関：会話 · 一场景一屏 · 三种说法同页 · 🔊/🎤/▶ 跟读 */
const DialogueGate = (() => {
  let lesson = null;
  let dialogues = [];
  let dialogue = null;
  let dialogueIndex = 0;
  let container = null;
  let state = null;
  let onComplete = null;
  let dialoguePassed = {};
  let branchChoiceId = null;

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function speakBtn(payload, attrs = "", rowId = "") {
    const id = rowId || `dg-${Math.random().toString(36).slice(2, 9)}`;
    if (typeof ShadowSpeak !== "undefined") {
      return ShadowSpeak.rowHtml(payload, id, attrs);
    }
    if (typeof SpeakUI !== "undefined" && SpeakUI.btnHtml) {
      return SpeakUI.btnHtml(payload, attrs);
    }
    const jp = typeof payload === "string" ? payload : payload?.japanese || payload?.jp || "";
    return `<button type="button" class="btn-speak-icon" data-jp="${escapeHtml(jp)}">🔊</button>`;
  }

  function linePayload(line) {
    if (!line) return "";
    return {
      jp: line.japanese || line.jp,
      kana: line.kana,
      ruby: line.japaneseRuby || line.ruby,
    };
  }

  function replyKeywords(reply) {
    if (reply?.keywords?.length) return reply.keywords;
    const jp = reply?.japanese || reply?.jp || "";
    if (typeof SpeechEngine !== "undefined" && SpeechEngine.extractKeywordsFromJapanese) {
      return SpeechEngine.extractKeywordsFromJapanese(jp);
    }
    return [];
  }

  function dialogueSpeakAttrs(reply) {
    const keys = replyKeywords(reply);
    const kw = keys.length ? ` data-ss-keywords="${escapeHtml(JSON.stringify(keys))}"` : "";
    return `class="dg-reply-speak" data-ss-dialogue="1" data-ss-score-below="1"${kw}`;
  }

  function showZh() {
    return state?.showChineseZh !== false;
  }

  function zhLine(text) {
    if (!text || !showZh()) return "";
    return `<p class="zh-annotation">${escapeHtml(text)}</p>`;
  }

  function senseiNotes(line, opts = {}) {
    if (!line?.noteJa && !(line?.noteZh && showZh())) return "";
    if (typeof SenseiTipCard !== "undefined") {
      return SenseiTipCard.fromNotes(line.noteJa, line.noteZh, opts);
    }
    let h = "";
    if (line.noteJa) h += `<p class="note-ja">${escapeHtml(line.noteJa)}</p>`;
    if (line.noteZh && showZh()) h += `<p class="zh-annotation">${escapeHtml(line.noteZh)}</p>`;
    return h;
  }

  function lineJapaneseHtml(line) {
    if (!line) return "";
    if (typeof RubyRender !== "undefined" && RubyRender.lineJapanese) {
      return RubyRender.lineJapanese(line);
    }
    return escapeHtml(line.japanese || line.jp || "");
  }

  /** 会話行：正文 + 右侧固定宽操作列（🔊🎤▶ 纵向对齐） */
  function renderDialogueLine({ speaker, line, speakAttrs = "", rowId = "", listenOnly = false, extraClass = "" }) {
    const actionsCol = listenOnly ? "dg-actions-col dg-actions-col--listen" : "dg-actions-col";
    return `
      <div class="dg-line-row ${extraClass}">
        <span class="dg-sp">${escapeHtml(speaker || "A")}</span>
        <div class="dg-line-content">
          <p class="jp">${lineJapaneseHtml(line)}</p>
          ${zhLine(line.chinese)}
          ${senseiNotes(line)}
        </div>
        <div class="${actionsCol}">
          ${speakBtn(linePayload(line), speakAttrs, rowId)}
        </div>
      </div>`;
  }

  function sceneBadge(d) {
    if (!d.sceneEmoji && !d.scenePlace) return "";
    return `<span class="dg-scene-badge">${escapeHtml(d.sceneEmoji || "")} ${escapeHtml(d.scenePlace || "")}</span>`;
  }

  function renderActionLegend() {
    return `<div class="dg-action-legend" aria-label="操作说明">
      <span class="dg-leg dg-leg-listen"><i class="dg-leg-ico">🔊</i>导读</span>
      <span class="dg-leg dg-leg-record"><i class="dg-leg-ico">🎤</i>录音</span>
      <span class="dg-leg dg-leg-replay"><i class="dg-leg-ico">▶</i>回放</span>
      <span class="dg-leg dg-leg-eval"><i class="dg-leg-ico">✓</i>评估</span>
    </div>`;
  }

  function renderSceneHeader(d) {
    const badge = sceneBadge(d);
    const title = escapeHtml(d.title || "");
    return `<div class="dg-scene-head">${badge ? `${badge} ` : ""}<h3 class="dg-scene-title">${title}</h3></div>`;
  }

  function collectWarmLines() {
    const lines = [];
    const push = (t) => {
      if (t && typeof SpeechEngine !== "undefined") {
        const l = SpeechEngine.prepareJaTtsLine(t);
        if (l) lines.push(l);
      }
    };
    dialogues.forEach((d) => {
      if (d.opener) push(d.opener.japanese || d.opener);
      d.userTurn?.replies?.forEach((r) => {
        push(r.japanese || r.jp);
        if (r.npcReaction) push(r.npcReaction.japanese);
      });
      if (d.isBranch && d.choice) {
        push(d.choice.japanese);
        d.choice.options?.forEach((o) => {
          push(o.japanese);
          if (o.npcReaction) push(o.npcReaction.japanese);
        });
      }
    });
    return lines;
  }

  function allDialoguesPassed() {
    return dialogues.every((d, i) => dialoguePassed[i]);
  }

  function mount(el, lessonId, options) {
    container = el;
    state = options.state;
    onComplete = options.onComplete;
    lesson = getLessonMvp(lessonId);
    dialogues =
      typeof getLessonDialogues === "function"
        ? getLessonDialogues(lessonId)
        : lesson.dialogues || [];
    if (!dialogues.length) {
      container.innerHTML = `<p class="hint-ja">会話データがありません。</p>`;
      return;
    }
    dialogueIndex = 0;
    dialogue = dialogues[0];
    branchChoiceId = null;
    dialoguePassed = {};
    if (typeof SpeechEngine !== "undefined" && SpeechEngine.warmPhrases) {
      SpeechEngine.warmPhrases(collectWarmLines());
    }
    render();
  }

  function switchDialogue(idx) {
    if (idx < 0 || idx >= dialogues.length || idx === dialogueIndex) return;
    dialogueIndex = idx;
    dialogue = dialogues[idx];
    branchChoiceId = null;
    render();
  }

  function renderLegacyLink() {
    const lid = lesson.lessonId;
    return `
      <div class="dg-legacy-box dg-legacy-compact">
        <a class="btn secondary" href="legacy.html#l${lid}">选修：24课情景库</a>
      </div>`;
  }

  function renderReplyList(replies) {
    const marks = ["①", "②", "③"];
    return `<div class="dg-reply-list">
      ${replies
        .map((reply, i) => {
          const jp =
            typeof RubyRender !== "undefined" && RubyRender.lineJapanese
              ? RubyRender.lineJapanese(reply)
              : escapeHtml(reply.japanese || "");
          const reaction = reply.npcReaction;
          return `
          <div class="dg-reply-block">
            <div class="dg-reply-head dg-line-row dg-line-row--reply">
              <span class="dg-reply-num">${marks[i] || i + 1}</span>
              <div class="dg-line-content">
                <p class="jp dg-reply-jp">${jp}</p>
                ${zhLine(reply.chinese)}
                ${senseiNotes(reply)}
                <div class="dg-score-slot dg-score-slot--inline" data-dg-score-for="dg-r-${dialogueIndex}-${i}" aria-live="polite" hidden></div>
              </div>
              <div class="dg-actions-col">
                ${speakBtn(linePayload(reply), dialogueSpeakAttrs(reply), `dg-r-${dialogueIndex}-${i}`)}
              </div>
            </div>
            ${
              reaction
                ? renderDialogueLine({
                    speaker: "A",
                    line: reaction,
                    speakAttrs: 'class="dg-react-speak"',
                    rowId: `dg-rr-${dialogueIndex}-${i}`,
                    listenOnly: true,
                    extraClass: "dg-line-row--npc dg-line-row--reaction",
                  })
                : ""
            }
          </div>`;
        })
        .join("")}
    </div>`;
  }

  function renderBranch() {
    const opener = dialogue.opener;
    const tabs = renderTabs();
    let body = `
      <div class="dg-wrap dg-simple">
        ${tabs}
        <p class="dg-label dg-label-compact">② 会話 · 分岐</p>
        ${renderActionLegend()}
        ${renderSceneHeader(dialogue)}
        ${renderDialogueLine({
          speaker: opener.speaker,
          line: opener,
          speakAttrs: 'class="dg-play-a"',
          rowId: `dg-op-${dialogueIndex}`,
          listenOnly: true,
          extraClass: "dg-line-row--npc",
        })}
        <p class="dg-your-turn dg-your-turn-compact">B · 选一种回答</p>
        <p class="jp dg-choice-prompt">${escapeHtml(dialogue.choice.japanese)}</p>
        ${zhLine(dialogue.choice.chinese)}
        <div class="dg-choice-list">
          ${dialogue.choice.options
            .map(
              (opt) => `
            <div class="dg-choice-row ${branchChoiceId === opt.id ? "selected" : ""}" data-choice="${escapeHtml(opt.id)}">
              <div class="dg-choice-body">
                <p class="jp">${escapeHtml(opt.japanese)}</p>
                ${zhLine(opt.chinese)}
              </div>
              <div class="dg-actions-col dg-actions-col--listen">
                ${speakBtn(linePayload(opt), "", `dg-opt-${dialogueIndex}-${opt.id}`)}
              </div>
            </div>`
            )
            .join("")}
        </div>
    `;
    if (branchChoiceId) {
      const opt = dialogue.choice.options.find((o) => o.id === branchChoiceId);
      if (opt?.npcReaction) {
        body += renderDialogueLine({
          speaker: "A",
          line: opt.npcReaction,
          speakAttrs: 'class="dg-react-speak"',
          rowId: `dg-br-${dialogueIndex}`,
          listenOnly: true,
          extraClass: "dg-line-row--npc",
        });
      }
    }
    body += `${renderFooter()}${renderLegacyLink()}</div>`;
    container.innerHTML = body;
    bindTabs();
    bindSpeak();
    container.querySelectorAll(".dg-choice-row").forEach((row) => {
      row.addEventListener("click", (e) => {
        if (e.target.closest(".btn-speak-icon")) return;
        branchChoiceId = row.dataset.choice;
        render();
      });
    });
    bindFooter();
  }

  function renderFooter() {
    const hasNext = dialogueIndex < dialogues.length - 1;
    return `
      <div class="dg-footer-actions">
        <button type="button" class="btn primary" id="dg-scene-done">本场景听完 ✓</button>
        ${hasNext ? `<button type="button" class="btn secondary" id="dg-next-scene">下一场景 →</button>` : ""}
      </div>
      <p class="hint-ja dg-hint-compact">切换场景标签 · 听完点「本场景听完」</p>`;
  }

  function bindFooter() {
    container.querySelector("#dg-scene-done")?.addEventListener("click", markSceneDone);
    container.querySelector("#dg-next-scene")?.addEventListener("click", () => {
      dialoguePassed[dialogueIndex] = true;
      const next = dialogueIndex + 1;
      if (next < dialogues.length) switchDialogue(next);
    });
  }

  function markSceneDone() {
    dialoguePassed[dialogueIndex] = true;
    if (allDialoguesPassed()) {
      setGateDone(state, lesson.lessonId, 2);
      onComplete?.();
      return;
    }
    const next = dialogues.findIndex((_, i) => !dialoguePassed[i]);
    if (next >= 0) switchDialogue(next);
    else render();
  }

  function render() {
    if (dialogue.isBranch) {
      renderBranch();
      return;
    }

    const opener = dialogue.opener;
    const replies = dialogue.userTurn?.replies || [];

    container.innerHTML = `
      <div class="dg-wrap dg-simple">
        ${renderTabs()}
        <p class="dg-label dg-label-compact">② 会話 · 三种说法</p>
        ${renderActionLegend()}
        ${renderSceneHeader(dialogue)}

        ${renderDialogueLine({
          speaker: opener.speaker || "A",
          line: opener,
          speakAttrs: 'class="dg-play-a"',
          rowId: `dg-op-${dialogueIndex}`,
          listenOnly: true,
          extraClass: "dg-line-row--npc",
        })}

        <p class="dg-your-turn dg-your-turn-compact">B · 三种回答（录完点 ✓ 评估）</p>
        ${renderReplyList(replies)}
        ${renderFooter()}
        ${renderLegacyLink()}
      </div>
    `;

    bindTabs();
    bindSpeak();
    bindFooter();
  }

  function renderTabs() {
    if (dialogues.length <= 1) return "";
    return `<div class="dg-dialogue-tabs" role="tablist">
      ${dialogues
        .map((d, i) => {
          const tag = d.isBranch ? "分岐" : d.scenePlace || `场景${i + 1}`;
          return `<button type="button" class="dg-dtab ${i === dialogueIndex ? "active" : ""} ${dialoguePassed[i] ? "done" : ""}"
            data-didx="${i}" role="tab">${dialoguePassed[i] ? "✓ " : ""}${escapeHtml(d.sceneEmoji || "")} ${escapeHtml(tag)}</button>`;
        })
        .join("")}
    </div>`;
  }

  function bindTabs() {
    container.querySelectorAll(".dg-dtab").forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        switchDialogue(Number(btn.dataset.didx));
      };
    });
  }

  function bindSpeak() {
    if (typeof SenseiTipCard !== "undefined") SenseiTipCard.bind(container);
    if (typeof ShadowSpeak !== "undefined") ShadowSpeak.bind(container);
    else if (typeof SpeakUI !== "undefined") SpeakUI.bind(container);
  }

  return { mount };
})();
