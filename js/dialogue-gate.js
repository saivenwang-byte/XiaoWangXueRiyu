/** 第二関：多场景会話 · 三条回复点读 + 展开跟读 + 发音评分 */
const DialogueGate = (() => {
  let lesson = null;
  let dialogues = [];
  let dialogue = null;
  let dialogueIndex = 0;
  let container = null;
  let state = null;
  let onComplete = null;
  let branchChoiceId = null;
  let recordings = {};
  let dialoguePassed = {};
  let replyPracticed = {};
  let expandedReplyIndex = null;
  let activeRecordUrl = null;
  let activeRecordBlob = null;
  let mediaRecorder = null;
  let recordChunks = [];
  let recordStream = null;
  let recTimer = null;
  let holdPromise = null;

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function speakBtn(payload, attrs = "") {
    if (typeof SpeakUI !== "undefined" && SpeakUI.btnHtml) {
      return SpeakUI.btnHtml(payload, attrs);
    }
    const jp = typeof payload === "string" ? payload : payload?.japanese || payload?.jp || "";
    return `<button type="button" class="btn-speak-icon" data-jp="${escapeHtml(jp)}" ${attrs}>🔊</button>`;
  }

  function showZh() {
    return state?.showChineseZh !== false;
  }

  function zhLine(text) {
    if (!text || !showZh()) return "";
    return `<p class="zh-annotation">${escapeHtml(text)}</p>`;
  }

  function readHint(reply) {
    const parts = [];
    if (reply.kana) parts.push(reply.kana);
    if (reply.noteJa) parts.push(reply.noteJa);
    if (!parts.length && reply.ruby) parts.push("(见上方假名)");
    return parts.join(" · ") || "先点喇叭听示范，再展开跟读";
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

  function recKey(ridx) {
    const ri = ridx != null ? ridx : expandedReplyIndex;
    return `${dialogueIndex}-${branchChoiceId || "n"}-${ri}`;
  }

  function collectWarmLines() {
    const lines = [];
    const push = (t) => {
      if (t && typeof SpeechEngine !== "undefined") {
        const l = SpeechEngine.prepareJaTtsLine(t);
        if (l) lines.push(l);
      }
    };
    if (dialogue?.opener) push(dialogue.opener.japanese || dialogue.opener);
    if (dialogue?.userTurn?.replies) {
      dialogue.userTurn.replies.forEach((r) => {
        push(r.japanese || r.jp || r);
        if (r.npcReaction) push(r.npcReaction.japanese);
      });
    }
    if (dialogue?.isBranch && dialogue.choice) {
      push(dialogue.choice.japanese);
      dialogue.choice.options?.forEach((o) => {
        push(o.japanese);
        if (o.npcReaction) push(o.npcReaction.japanese);
      });
    }
    return lines;
  }

  function warmDialogueAudio() {
    if (typeof SpeechEngine !== "undefined" && SpeechEngine.warmPhrases) {
      SpeechEngine.warmPhrases(collectWarmLines());
    }
  }

  function loadRecording(ridx) {
    const prev = recordings[recKey(ridx)];
    if (prev?.url) {
      activeRecordUrl = prev.url;
      activeRecordBlob = prev.blob || null;
      return true;
    }
    activeRecordUrl = null;
    activeRecordBlob = null;
    return false;
  }

  function allDialoguesPassed() {
    return dialogues.every((d, i) => d.isBranch || dialoguePassed[i]);
  }

  function sceneRepliesDone() {
    if (dialogue.isBranch && branchChoiceId) return !!replyPracticed[recKey(0)];
    const n = dialogue.userTurn?.replies?.length || 0;
    for (let i = 0; i < n; i++) {
      if (!replyPracticed[recKey(i)]) return false;
    }
    return n > 0;
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
    recordings = {};
    dialoguePassed = {};
    replyPracticed = {};
    expandedReplyIndex = null;
    render();
  }

  function switchDialogue(idx) {
    if (idx < 0 || idx >= dialogues.length || idx === dialogueIndex) return;
    dialogueIndex = idx;
    dialogue = dialogues[idx];
    branchChoiceId = null;
    expandedReplyIndex = null;
    render();
  }

  function renderLegacyLink() {
    const lid = lesson.lessonId;
    return `
      <div class="dg-legacy-box">
        <p class="hint-ja"><strong>选修 · 更长情景练习</strong>：标日 24 课完整对话库（分支路线、闯关），与当前「三关巩固」是两套入口。</p>
        <a class="btn secondary" href="legacy.html#l${lid}">打开 24 课情景库（第 ${lid} 课）</a>
      </div>`;
  }

  function renderPracticePanel(reply, ridx) {
    const key = recKey(ridx);
    const hasRec = !!recordings[key]?.url;
    const line = reply.japanese || reply.jp || "";
    return `
      <div class="dg-practice-panel" id="dg-practice-${ridx}">
        <p class="hint-ja">① 听示范 → ② 按住说话 或 录音 → ③ 比对 → ④ 发音评分</p>
        <div class="dg-practice-actions">
          ${speakBtn(reply, `class="dg-model-line" data-line="${ridx}"`)}
          <button type="button" class="dg-hold-mic" id="dg-hold-${ridx}">按住 说话</button>
          <button type="button" class="btn secondary dg-rec-start" id="dg-start-${ridx}">🎤 录音</button>
          <button type="button" class="btn dg-rec-stop" id="dg-stop-${ridx}" hidden>⏹ 停止</button>
        </div>
        <p class="dg-rec-timer" id="dg-timer-${ridx}" hidden>🔴 00:00</p>
        <p id="dg-rec-status-${ridx}" class="hint-ja">${hasRec ? "已录音，可回放或评分" : "说完后点「停止」或松开「按住说话」"}</p>
        <div class="dg-practice-actions">
          <button type="button" class="btn secondary" id="dg-playback-${ridx}" ${hasRec ? "" : "disabled"}>▶ 听自己</button>
          <button type="button" class="btn secondary" id="dg-compare-${ridx}">🔁 比对读音</button>
          <button type="button" class="btn primary" id="dg-score-${ridx}">🦉 发音评分</button>
        </div>
        <div id="dg-score-out-${ridx}" class="dg-score-box" hidden></div>
        <div class="dg-self-rate" id="dg-rate-${ridx}" ${replyPracticed[key] ? "" : "hidden"}>
          <button type="button" class="btn ghost" data-rate="again" data-ridx="${ridx}">再练这条</button>
          <button type="button" class="btn primary" data-rate="ok" data-ridx="${ridx}">这条练好了</button>
        </div>
      </div>`;
  }

  function renderReplyOptions(replies) {
    const marks = ["①", "②", "③"];
    return `<div class="dg-reply-options">
      ${replies
        .map((reply, i) => {
          const expanded = expandedReplyIndex === i;
          const done = !!replyPracticed[recKey(i)];
          const jpHtml =
            typeof RubyRender !== "undefined" && RubyRender.lineJapanese
              ? RubyRender.lineJapanese(reply)
              : escapeHtml(reply.japanese || reply.jp || "");
          return `
          <div class="dg-reply-row ${expanded ? "expanded" : ""} ${done ? "done" : ""}" data-ridx="${i}">
            <div class="dg-reply-row-head" data-expand="${i}">
              <span class="dg-reply-num">${marks[i] || i + 1}</span>
              <p class="jp">${jpHtml}</p>
              ${speakBtn(reply, `data-ridx-speak="${i}"`)}
            </div>
            <p class="dg-read-hint">读法：${escapeHtml(readHint(reply))}</p>
            ${zhLine(reply.chinese)}
            ${
              reactionHtml(reply.npcReaction)
                ? `<div class="dg-bubble npc dg-reaction-mini">${reactionHtml(reply.npcReaction)}</div>`
                : ""
            }
            <button type="button" class="btn secondary btn-sm dg-expand-btn" data-expand="${i}" style="margin:0 12px 8px">
              ${expanded ? "收起跟读" : "跟读 · 录音对比"}
            </button>
            ${expanded ? renderPracticePanel(reply, i) : ""}
          </div>`;
        })
        .join("")}
    </div>`;
  }

  function reactionHtml(reaction) {
    if (!reaction) return "";
    return `
      <span class="dg-sp">A</span>
      <p class="jp">${escapeHtml(reaction.japanese || "")}</p>
      ${zhLine(reaction.chinese)}
      ${speakBtn(reaction.japanese || "")}`;
  }

  function renderBranch() {
    const opener = dialogue.opener;
    const tabs = renderTabs();

    let body = `
      <div class="dg-wrap dg-branch">
        ${tabs}
        <p class="dg-label">② 会話 · <span class="dg-branch-tag">分岐</span></p>
        ${sceneBadge(dialogue)}
        <h3>${escapeHtml(dialogue.title)}</h3>
        <div class="dg-bubble npc">
          <span class="dg-sp">${escapeHtml(opener.speaker)}</span>
          <p class="jp">${typeof RubyRender !== "undefined" ? RubyRender.lineJapanese(opener) : escapeHtml(opener.japanese)}</p>
          ${zhLine(opener.chinese)}
          ${speakBtn(opener, 'class="dg-play-a"')}
        </div>
        <p class="dg-your-turn">── 返事を選んでください ──</p>
        <p class="jp dg-choice-prompt">${escapeHtml(dialogue.choice.japanese)}</p>
        ${zhLine(dialogue.choice.chinese)}
        <div class="dg-choice-list" id="dg-choices">
          ${dialogue.choice.options
            .map(
              (opt) =>
                `<div class="dg-choice-item ${branchChoiceId === opt.id ? "selected" : ""}" data-choice="${escapeHtml(opt.id)}">
                  <button type="button" class="btn secondary dg-choice-opt">
                    <span class="jp">${escapeHtml(opt.japanese)}</span>
                    ${opt.chinese && showZh() ? `<span class="zh-annotation">${escapeHtml(opt.chinese)}</span>` : ""}
                  </button>
                  ${speakBtn(opt.japanese)}
                </div>`
            )
            .join("")}
        </div>
    `;

    if (branchChoiceId) {
      const opt = dialogue.choice.options.find((o) => o.id === branchChoiceId);
      expandedReplyIndex = expandedReplyIndex ?? 0;
      body += `
        <div class="dg-bubble npc dg-reaction">
          ${reactionHtml(opt.npcReaction)}
        </div>
        <p class="dg-your-turn">── 跟读你选的这句 ──</p>
        <div class="dg-reply-row expanded done-branch">
          <div class="dg-reply-row-head">
            <span class="dg-reply-num">你</span>
            <p class="jp dg-target">${escapeHtml(opt.japanese)}</p>
            ${speakBtn(opt)}
          </div>
          <p class="dg-read-hint">读法：${escapeHtml(readHint(opt))}</p>
          ${zhLine(opt.chinese)}
          ${renderPracticePanel(opt, 0)}
        </div>
        ${sceneRepliesDone() ? renderSceneComplete() : ""}
      `;
    }

    body += `${renderLegacyLink()}</div>`;
    container.innerHTML = body;
    bindTabs();
    bindSpeak();
    warmDialogueAudio();

    container.querySelectorAll(".dg-choice-item").forEach((row) => {
      row.querySelector(".dg-choice-opt")?.addEventListener("click", () => {
        branchChoiceId = row.dataset.choice;
        expandedReplyIndex = 0;
        render();
      });
    });

    if (branchChoiceId) bindPracticeForReply(dialogue.choice.options.find((o) => o.id === branchChoiceId), 0);
  }

  function renderSceneComplete() {
    return `
      <div class="dg-pass-block">
        <p class="hint-ja">本分岐已练完，可标记本场景完成：</p>
        <button type="button" class="btn primary" id="dg-scene-done">本场景「できた！」</button>
      </div>`;
  }

  function render() {
    if (dialogue.isBranch) {
      renderBranch();
      return;
    }

    const opener = dialogue.opener;
    const replies = dialogue.userTurn.replies;
    const allDone = sceneRepliesDone();

    container.innerHTML = `
      <div class="dg-wrap dg-multi">
        ${renderTabs()}
        <p class="dg-label">② 会話 · 点每条听读音，再点「跟读」录音对比</p>
        ${sceneBadge(dialogue)}
        <h3>${escapeHtml(dialogue.title)}</h3>

        <div class="dg-bubble npc">
          <span class="dg-sp">${escapeHtml(opener.speaker)}</span>
          <p class="jp">${typeof RubyRender !== "undefined" ? RubyRender.lineJapanese(opener) : escapeHtml(opener.japanese)}</p>
          ${zhLine(opener.chinese)}
          ${speakBtn(opener, 'class="dg-play-a"')}
        </div>

        <p class="dg-your-turn">── 你的回复（三条都可点 🔊）──</p>
        ${renderReplyOptions(replies)}
        ${allDone ? renderSceneComplete() : `<p class="hint-ja dg-pass-hint">三条都点「这条练好了」→ 再点下方完成本场景</p>`}
        <p class="hint-ja dg-pass-hint">全部场景完成后，第 2 关自动过关</p>
        ${renderLegacyLink()}
      </div>
    `;

    bindTabs();
    bindSpeak();
    warmDialogueAudio();

    container.querySelectorAll("[data-expand]").forEach((el) => {
      el.onclick = (e) => {
        if (e.target.closest(".btn-speak-icon")) return;
        const i = Number(el.dataset.expand);
        expandedReplyIndex = expandedReplyIndex === i ? null : i;
        render();
      };
    });

    replies.forEach((reply, i) => {
      if (expandedReplyIndex === i) bindPracticeForReply(reply, i);
    });

    container.querySelector("#dg-scene-done")?.addEventListener("click", markSceneDone);
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

  function bindTabs() {
    container.querySelectorAll(".dg-dtab").forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        switchDialogue(Number(btn.dataset.didx));
      };
    });
  }

  function bindSpeak() {
    if (typeof SpeakUI !== "undefined") SpeakUI.bind(container);
  }

  function bindPracticeForReply(reply, ridx) {
    const line = reply.japanese || reply.jp || "";
    const keywords = reply.keywords || [];
    const status = container.querySelector(`#dg-rec-status-${ridx}`);
    const btnStart = container.querySelector(`#dg-start-${ridx}`);
    const btnStop = container.querySelector(`#dg-stop-${ridx}`);
    const timerEl = container.querySelector(`#dg-timer-${ridx}`);
    const scoreOut = container.querySelector(`#dg-score-out-${ridx}`);
    const rateBox = container.querySelector(`#dg-rate-${ridx}`);
    const holdBtn = container.querySelector(`#dg-hold-${ridx}`);
    let lastHeard = "";

    loadRecording(ridx);

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
        timerEl.textContent = `🔴 ${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
      }, 200);
    };

    const saveBlob = (blob) => {
      const key = recKey(ridx);
      if (recordings[key]?.url) URL.revokeObjectURL(recordings[key].url);
      const url = URL.createObjectURL(blob);
      recordings[key] = { url, blob, jp: line };
      activeRecordUrl = url;
      activeRecordBlob = blob;
      const pb = container.querySelector(`#dg-playback-${ridx}`);
      if (pb) pb.disabled = false;
      if (status) status.textContent = "录音好了。可「听自己」「比对读音」「发音评分」。";
    };

    if (btnStart) {
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
            saveBlob(blob);
            btnStart.hidden = false;
            btnStop.hidden = true;
            timerEl.hidden = true;
            btnStart.textContent = "🎤 重新录音";
          };
          mediaRecorder.start();
          btnStart.hidden = true;
          btnStop.hidden = false;
          timerEl.hidden = false;
          startTimer();
          if (status) status.textContent = "录音中… 说完点「停止」。";
        } catch (_) {
          if (status) {
            status.textContent = "请允许麦克风：微信点右上角 … → 设置 → 麦克风允许。";
          }
        }
      };
    }

    btnStop?.addEventListener("click", () => {
      if (mediaRecorder?.state === "recording") mediaRecorder.stop();
    });

    container.querySelector(`#dg-playback-${ridx}`)?.addEventListener("click", () => {
      if (!activeRecordUrl) return;
      new Audio(activeRecordUrl).play().catch(() => {});
    });

    container.querySelector(`#dg-compare-${ridx}`)?.addEventListener("click", async () => {
      if (typeof SpeechEngine === "undefined") return;
      await SpeechEngine.speakJa(reply);
      if (activeRecordUrl) {
        setTimeout(() => new Audio(activeRecordUrl).play().catch(() => {}), 400);
      } else if (status) {
        status.textContent = "请先录音或按住说话，再比对。";
      }
    });

    container.querySelector(`#dg-score-${ridx}`)?.addEventListener("click", async () => {
      if (typeof SpeechEngine === "undefined" || !SpeechEngine.evaluatePronunciation) return;
      scoreOut.hidden = false;
      scoreOut.className = "dg-score-box";
      scoreOut.textContent = "评分中…";
      const result = await SpeechEngine.evaluatePronunciation({
        expected: line,
        heard: lastHeard,
        audioBlob: activeRecordBlob,
        keywords,
      });
      scoreOut.classList.add(result.ok ? "ok" : "warn");
      scoreOut.innerHTML = `<strong>${result.score} 分</strong> · ${escapeHtml(result.tip || "")}${
        result.heard ? `<br><span class="hint-ja">识别：${escapeHtml(result.heard)}</span>` : ""
      }`;
      if (result.ok || result.score >= 55) {
        replyPracticed[recKey(ridx)] = true;
        if (rateBox) rateBox.hidden = false;
      }
    });

    rateBox?.querySelectorAll("[data-rate]").forEach((btn) => {
      btn.onclick = () => {
        if (btn.dataset.rate === "ok") {
          replyPracticed[recKey(ridx)] = true;
          const row = container.querySelector(`.dg-reply-row[data-ridx="${ridx}"]`);
          if (row) row.classList.add("done");
          if (sceneRepliesDone()) render();
        } else {
          expandedReplyIndex = ridx;
          render();
        }
      };
    });

    if (holdBtn && typeof SpeechEngine !== "undefined") {
      const onHoldStart = async (e) => {
        e.preventDefault();
        if (holdPromise) return;
        if (!SpeechEngine.getRecognition?.()) {
          if (status) status.textContent = "本机不支持语音识别，请用「录音」后点「发音评分」。";
          return;
        }
        holdBtn.classList.add("recording");
        holdBtn.textContent = "松开 结束";
        try {
          holdPromise = SpeechEngine.startHoldListen();
        } catch (_) {
          holdPromise = null;
          holdBtn.classList.remove("recording");
          holdBtn.textContent = "按住 说话";
        }
      };

      const onHoldEnd = async (e) => {
        e.preventDefault();
        if (!holdPromise) return;
        SpeechEngine.stopHoldListen();
        holdBtn.classList.remove("recording");
        holdBtn.textContent = "按住 说话";
        try {
          lastHeard = (await holdPromise) || "";
          holdPromise = null;
          if (status) status.textContent = lastHeard ? `听到：${lastHeard}` : "没听清，请再按住说一次。";
          const quick = SpeechEngine.scorePronunciation(line, lastHeard, keywords);
          if (quick.ok) {
            replyPracticed[recKey(ridx)] = true;
            if (rateBox) rateBox.hidden = false;
          }
        } catch (_) {
          holdPromise = null;
          if (status) status.textContent = "没听清，请再试或改用「录音」。";
        }
      };

      holdBtn.addEventListener("touchstart", onHoldStart, { passive: false });
      holdBtn.addEventListener("touchend", onHoldEnd);
      holdBtn.addEventListener("touchcancel", onHoldEnd);
      holdBtn.addEventListener("mousedown", onHoldStart);
      holdBtn.addEventListener("mouseup", onHoldEnd);
      holdBtn.addEventListener("mouseleave", onHoldEnd);
    }

    container.querySelector("#dg-scene-done")?.addEventListener("click", markSceneDone);
  }

  return { mount };
})();
