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

  function showZh() {
    return state?.showChineseZh !== false;
  }

  function zhLine(text) {
    if (!text || !showZh()) return "";
    return `<p class="zh-annotation">${escapeHtml(text)}</p>`;
  }

  function sceneBadge(d) {
    if (!d.sceneEmoji && !d.scenePlace) return "";
    return `<span class="dg-scene-badge">${escapeHtml(d.sceneEmoji || "")} ${escapeHtml(d.scenePlace || "")}</span>`;
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
      <div class="dg-legacy-box">
        <p class="hint-ja"><strong>选修</strong>：更长情景练习（24 课库）</p>
        <a class="btn secondary" href="legacy.html#l${lid}">打开旧版情景库</a>
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
            <div class="dg-reply-head">
              <span class="dg-reply-num">${marks[i] || i + 1}</span>
              <p class="jp dg-reply-jp">${jp}</p>
              ${speakBtn(linePayload(reply), 'class="dg-reply-speak"', `dg-r-${dialogueIndex}-${i}`)}
            </div>
            ${zhLine(reply.chinese)}
            ${reply.noteJa ? `<p class="note-ja">${escapeHtml(reply.noteJa)}</p>` : ""}
            ${reply.noteZh && showZh() ? `<p class="zh-annotation">${escapeHtml(reply.noteZh)}</p>` : ""}
            ${
              reaction
                ? `<div class="dg-bubble npc dg-reaction-inline">
                <span class="dg-sp">A</span>
                <p class="jp">${escapeHtml(reaction.japanese || "")}</p>
                ${zhLine(reaction.chinese)}
                ${speakBtn(linePayload(reaction), 'class="dg-react-speak"', `dg-rr-${dialogueIndex}-${i}`)}
              </div>`
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
        <p class="dg-label">② 会話 · 分岐（选一种说法，点 🔊 听）</p>
        ${sceneBadge(dialogue)}
        <h3>${escapeHtml(dialogue.title)}</h3>
        <div class="dg-bubble npc">
          <span class="dg-sp">${escapeHtml(opener.speaker)}</span>
          <p class="jp">${typeof RubyRender !== "undefined" ? RubyRender.lineJapanese(opener) : escapeHtml(opener.japanese)}</p>
          ${zhLine(opener.chinese)}
          ${speakBtn(linePayload(opener), 'class="dg-play-a"')}
        </div>
        <p class="dg-your-turn">── 选一种回答 ──</p>
        <p class="jp">${escapeHtml(dialogue.choice.japanese)}</p>
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
              ${speakBtn(linePayload(opt))}
            </div>`
            )
            .join("")}
        </div>
    `;
    if (branchChoiceId) {
      const opt = dialogue.choice.options.find((o) => o.id === branchChoiceId);
      if (opt?.npcReaction) {
        body += `
          <div class="dg-bubble npc">
            <span class="dg-sp">A</span>
            <p class="jp">${escapeHtml(opt.npcReaction.japanese)}</p>
            ${zhLine(opt.npcReaction.chinese)}
            ${speakBtn(linePayload(opt.npcReaction))}
          </div>`;
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
      <p class="hint-ja">上方可切换场景标签；听完点「本场景听完」</p>`;
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
        <p class="dg-label">② 会話 · 同一场景 · 三种说法（点 🔊 听读音）</p>
        ${sceneBadge(dialogue)}
        <h3>${escapeHtml(dialogue.title)}</h3>

        <div class="dg-bubble npc">
          <span class="dg-sp">${escapeHtml(opener.speaker || "A")}</span>
          <p class="jp">${typeof RubyRender !== "undefined" ? RubyRender.lineJapanese(opener) : escapeHtml(opener.japanese)}</p>
          ${zhLine(opener.chinese)}
          ${speakBtn(linePayload(opener), 'class="dg-play-a"', `dg-op-${dialogueIndex}`)}
        </div>

        <p class="dg-your-turn">── B 的三种回答（都在下面）──</p>
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
    if (typeof ShadowSpeak !== "undefined") ShadowSpeak.bind(container);
    else if (typeof SpeakUI !== "undefined") SpeakUI.bind(container);
  }

  return { mount };
})();
