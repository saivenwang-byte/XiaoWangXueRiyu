/** 第二関：多场景会話 + 分岐（档位1/2）· 録音 */
const DialogueGate = (() => {
  let lesson = null;
  let dialogues = [];
  let dialogue = null;
  let dialogueIndex = 0;
  let container = null;
  let state = null;
  let onComplete = null;
  let replyIndex = 0;
  let branchChoiceId = null;
  let recordings = {};
  let dialoguePassed = {};
  let activeRecordUrl = null;
  let mediaRecorder = null;
  let recordChunks = [];
  let recordStream = null;
  let recTimer = null;

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function showZh() {
    return state?.showChineseZh !== false;
  }

  function zhLine(text) {
    if (!text || !showZh()) return "";
    return `<p class="zh-annotation">${escapeHtml(text)}</p>`;
  }

  function noteHtml(reply) {
    let html = `<p class="note-ja">${escapeHtml(reply.noteJa || "")}</p>`;
    if (reply.noteZh && showZh()) {
      html += `<p class="zh-annotation note-zh">${escapeHtml(reply.noteZh)}</p>`;
    }
    return html;
  }

  function sceneBadge(d) {
    if (!d.sceneEmoji && !d.scenePlace) return "";
    return `<span class="dg-scene-badge">${escapeHtml(d.sceneEmoji || "")} ${escapeHtml(d.scenePlace || "")}</span>`;
  }

  function pickMime() {
    if (typeof MediaRecorder === "undefined") return "";
    const types = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];
    return types.find((t) => MediaRecorder.isTypeSupported(t)) || "";
  }

  function recKey() {
    return `${dialogueIndex}-${branchChoiceId || "n"}-${replyIndex}`;
  }

  function currentReply() {
    if (dialogue.isBranch && branchChoiceId) {
      const opt = dialogue.choice.options.find((o) => o.id === branchChoiceId);
      return opt || dialogue.choice.options[0];
    }
    return dialogue.userTurn.replies[replyIndex];
  }

  function loadRecording() {
    const prev = recordings[recKey()];
    if (prev?.url) {
      activeRecordUrl = prev.url;
      return true;
    }
    activeRecordUrl = null;
    return false;
  }

  function allDialoguesPassed() {
    return dialogues.every((d, i) => d.isBranch || dialoguePassed[i]);
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
    replyIndex = 0;
    branchChoiceId = null;
    recordings = {};
    dialoguePassed = {};
    render();
  }

  function switchDialogue(idx) {
    if (idx < 0 || idx >= dialogues.length || idx === dialogueIndex) return;
    dialogueIndex = idx;
    dialogue = dialogues[idx];
    replyIndex = 0;
    branchChoiceId = null;
    render();
  }

  function renderLegacyLink() {
    const lid = lesson.lessonId;
    return `
      <div class="dg-legacy-box">
        <p class="hint-ja"><strong>24課・完整情景库</strong>：分支路线、综合长对话、游戏式闯关（旧版引擎，内容更全）</p>
        <a class="btn secondary" href="legacy.html#l${lid}">🎬 打开 legacy 情景 · 第${lid}課起</a>
      </div>`;
  }

  function renderBranch() {
    const opener = dialogue.opener;
    const hasRec = branchChoiceId && loadRecording();
    const tabs = renderTabs();

    let body = `
      <div class="dg-wrap dg-branch">
        ${tabs}
        <p class="dg-label">② 会話 · <span class="dg-branch-tag">分岐練習</span>（第14課）</p>
        ${sceneBadge(dialogue)}
        <h3>${escapeHtml(dialogue.title)}</h3>
        <div class="dg-bubble npc">
          <span class="dg-sp">${escapeHtml(opener.speaker)}</span>
          <p class="jp">${RubyRender.lineJapanese(opener)}</p>
          ${zhLine(opener.chinese)}
          <button type="button" class="btn-ghost-sm dg-play-a">🔊</button>
        </div>
        <p class="dg-your-turn">── 返事を選んでください ──</p>
        <p class="jp dg-choice-prompt">${escapeHtml(dialogue.choice.japanese)}</p>
        ${zhLine(dialogue.choice.chinese)}
        <div class="dg-choice-list" id="dg-choices">
          ${dialogue.choice.options
            .map(
              (opt) =>
                `<button type="button" class="btn secondary dg-choice-opt ${branchChoiceId === opt.id ? "selected" : ""}" data-choice="${escapeHtml(opt.id)}">
                  <span class="jp">${escapeHtml(opt.japanese)}</span>
                  ${opt.chinese && showZh() ? `<span class="zh-annotation">${escapeHtml(opt.chinese)}</span>` : ""}
                </button>`
            )
            .join("")}
        </div>
    `;

    if (branchChoiceId) {
      const opt = dialogue.choice.options.find((o) => o.id === branchChoiceId);
      body += `
        <div class="dg-bubble npc dg-reaction">
          <span class="dg-sp">A</span>
          <p class="jp">${escapeHtml(opt.npcReaction?.japanese || "")}</p>
          ${zhLine(opt.npcReaction?.chinese)}
          <button type="button" class="btn-ghost-sm dg-play-react" data-speak="${escapeHtml(opt.npcReaction?.japanese || "")}">🔊</button>
        </div>
        <div class="dg-reply-card selected">
          <p class="dg-reply-label">あなたのセリフ</p>
          <p class="jp dg-target">${escapeHtml(opt.japanese)}</p>
          ${zhLine(opt.chinese)}
        </div>
        ${renderRecordBlock(hasRec)}
        ${renderRateBlock(hasRec)}
      `;
    }

    body += `${renderLegacyLink()}</div>`;
    container.innerHTML = body;
    bindTabs();
    bindSpeak();

    container.querySelectorAll(".dg-choice-opt").forEach((btn) => {
      btn.onclick = () => {
        branchChoiceId = btn.dataset.choice;
        replyIndex = 0;
        render();
      };
    });

    if (branchChoiceId) {
      bindRecord(currentReply());
      bindRate();
    }
  }

  function renderTabs() {
    if (dialogues.length <= 1) return "";
    return `<div class="dg-dialogue-tabs" role="tablist">
      ${dialogues
        .map((d, i) => {
          const tag = d.isBranch ? "分岐" : d.scenePlace || `会話${i + 1}`;
          return `<button type="button" class="dg-dtab ${i === dialogueIndex ? "active" : ""} ${dialoguePassed[i] ? "done" : ""} ${d.isBranch ? "branch" : ""}"
            data-didx="${i}" role="tab">${dialoguePassed[i] ? "✅ " : ""}${escapeHtml(d.sceneEmoji || "")} ${escapeHtml(tag)}<br>
            <span class="dg-dtab-title">${escapeHtml(d.title)}</span></button>`;
        })
        .join("")}
    </div>`;
  }

  function renderRecordBlock(hasRec) {
    return `
      <div class="dg-record-panel" id="dg-rec-panel" data-state="${hasRec ? "done" : "idle"}">
        <div class="dg-rec-buttons">
          <button type="button" class="btn primary dg-rec-start" id="dg-start-rec">🎤 録音スタート</button>
          <button type="button" class="btn dg-rec-stop" id="dg-stop-rec" hidden>⏹ 停止</button>
        </div>
        <p class="dg-rec-timer" id="dg-timer" hidden>🔴 00:00</p>
        <p id="dg-rec-status" class="hint-ja">${hasRec ? "録音済み" : "まず「録音スタート」を押してください"}</p>
        <div class="dg-record-actions">
          <button type="button" class="btn secondary" id="dg-playback" ${hasRec ? "" : "disabled"}>▶ 再生する</button>
          <button type="button" class="btn secondary" id="dg-model" data-speak="">🔊 お手本</button>
        </div>
      </div>`;
  }

  function renderRateBlock(hasRec) {
    return `
      <div class="dg-self-rate" id="dg-rate" ${hasRec ? "" : "hidden"}>
        <p class="hint-ja">自分でチェック：</p>
        <button type="button" class="btn ghost" data-rate="again">もう少し練習</button>
        <button type="button" class="btn primary" data-rate="ok">できた！</button>
      </div>`;
  }

  function render() {
    if (dialogue.isBranch) {
      renderBranch();
      return;
    }

    const opener = dialogue.opener;
    const reply = currentReply();
    const total = dialogue.userTurn.replies.length;
    const hasRec = loadRecording();
    const reaction = reply.npcReaction;

    container.innerHTML = `
      <div class="dg-wrap dg-multi">
        ${renderTabs()}
        <p class="dg-label">② 会話練習 · シーンを選んで録音</p>
        ${sceneBadge(dialogue)}
        <h3>${escapeHtml(dialogue.title)}</h3>

        <div class="dg-bubble npc">
          <span class="dg-sp">${escapeHtml(opener.speaker)}</span>
          <p class="jp">${RubyRender.lineJapanese(opener)}</p>
          ${zhLine(opener.chinese)}
          <button type="button" class="btn-ghost-sm dg-play-a">🔊</button>
        </div>

        <p class="dg-your-turn">── あなたの番です ──</p>

        <div class="dg-reply-card selected">
          <p class="dg-reply-label">Bの返事${["①", "②", "③"][replyIndex] || replyIndex + 1}</p>
          <p class="jp dg-target">${RubyRender.lineJapanese(reply)}</p>
          ${zhLine(reply.chinese)}
          <div class="dg-notes">${noteHtml(reply)}</div>
        </div>

        ${
          reaction
            ? `<div class="dg-bubble npc dg-reaction">
            <span class="dg-sp">A · 相手の反応</span>
            <p class="jp">${escapeHtml(reaction.japanese)}</p>
            ${zhLine(reaction.chinese)}
            <button type="button" class="btn-ghost-sm dg-play-react" data-speak="${escapeHtml(reaction.japanese)}">🔊</button>
          </div>`
            : ""
        }

        <button type="button" class="btn secondary dg-cycle" id="dg-cycle">🔄 他の返事を見る（${total}種類）</button>

        ${renderRecordBlock(hasRec)}
        ${renderRateBlock(hasRec)}
        <p class="hint-ja dg-pass-hint">各シーンで「できた！」→ 全シーン完了で第2関クリア</p>
        ${renderLegacyLink()}
      </div>
    `;

    bindTabs();
    bindSpeak();

    const modelBtn = container.querySelector("#dg-model");
    if (modelBtn) {
      modelBtn.dataset.speak = JSON.stringify(reply);
    }

    container.querySelector("#dg-cycle").onclick = () => {
      replyIndex = (replyIndex + 1) % total;
      render();
    };

    container.querySelector("#dg-playback")?.addEventListener("click", () => {
      if (!activeRecordUrl) return;
      const a = new Audio(activeRecordUrl);
      a.play().catch(() => {});
    });

    bindRecord(reply);
    bindRate();
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
    const opener = dialogue?.opener;
    const playA = container.querySelector(".dg-play-a");
    if (playA && opener) playA.dataset.jp = opener.japanese || "";
    const model = container.querySelector("#dg-model");
    if (model) {
      const r = currentReply();
      model.dataset.jp = r.japanese || r.jp || "";
    }
    if (typeof SpeakUI !== "undefined") SpeakUI.bind(container);
  }

  function bindRate() {
    const rateBox = container.querySelector("#dg-rate");
    if (!rateBox) return;
    rateBox.querySelectorAll("[data-rate]").forEach((btn) => {
      btn.onclick = () => {
        if (btn.dataset.rate === "ok") {
          dialoguePassed[dialogueIndex] = true;
          if (allDialoguesPassed()) {
            setGateDone(state, lesson.lessonId, 2);
            onComplete?.();
            return;
          }
          const next = dialogues.findIndex((_, i) => !dialoguePassed[i]);
          if (next >= 0) switchDialogue(next);
        }
      };
    });
  }

  function bindRecord(reply) {
    const status = container.querySelector("#dg-rec-status");
    const panel = container.querySelector("#dg-rec-panel");
    const btnStart = container.querySelector("#dg-start-rec");
    const btnStop = container.querySelector("#dg-stop-rec");
    const timerEl = container.querySelector("#dg-timer");
    const rateBox = container.querySelector("#dg-rate");
    if (!btnStart) return;
    const hadRec = loadRecording();
    const line = reply.japanese || reply.jp || "";

    const setRecUi = (mode) => {
      panel.dataset.state = mode;
      if (mode === "recording") {
        btnStart.hidden = true;
        btnStop.hidden = false;
        timerEl.hidden = false;
      } else if (mode === "done") {
        btnStart.hidden = false;
        btnStop.hidden = true;
        timerEl.hidden = true;
        btnStart.textContent = "🎤 もう一度録音";
      } else {
        btnStart.hidden = false;
        btnStop.hidden = true;
        timerEl.hidden = true;
        btnStart.textContent = "🎤 録音スタート";
      }
    };

    const stopTimer = () => {
      if (recTimer) {
        clearInterval(recTimer);
        recTimer = null;
      }
    };

    const startTimer = () => {
      const recStart = Date.now();
      recTimer = setInterval(() => {
        const s = Math.floor((Date.now() - recStart) / 1000);
        const m = String(Math.floor(s / 60)).padStart(2, "0");
        const sec = String(s % 60).padStart(2, "0");
        timerEl.textContent = `🔴 ${m}:${sec}`;
      }, 200);
    };

    btnStart.onclick = async () => {
      try {
        if (!recordStream) {
          recordStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }
        recordChunks = [];
        const mime = pickMime();
        mediaRecorder = mime
          ? new MediaRecorder(recordStream, { mimeType: mime })
          : new MediaRecorder(recordStream);
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size) recordChunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
          stopTimer();
          const blob = new Blob(recordChunks, { type: mediaRecorder.mimeType || "audio/webm" });
          const key = recKey();
          if (recordings[key]?.url) URL.revokeObjectURL(recordings[key].url);
          const url = URL.createObjectURL(blob);
          recordings[key] = { url, jp: line };
          activeRecordUrl = url;
          const pb = container.querySelector("#dg-playback");
          if (pb) pb.disabled = false;
          status.textContent = "録音できました。▶ と 🔊 をくらべてみましょう。";
          if (rateBox) rateBox.hidden = false;
          setRecUi("done");
        };
        mediaRecorder.start();
        status.textContent = "録音中… 終わったら「停止」を押してください。";
        setRecUi("recording");
        startTimer();
      } catch (e) {
        status.textContent = "マイクが使えません。ブラウザでマイクを許可してください。";
        setRecUi("idle");
      }
    };

    btnStop.onclick = () => {
      if (mediaRecorder && mediaRecorder.state === "recording") mediaRecorder.stop();
    };

    setRecUi(hadRec ? "done" : "idle");
    if (hadRec && rateBox) rateBox.hidden = false;
  }

  return { mount };
})();
