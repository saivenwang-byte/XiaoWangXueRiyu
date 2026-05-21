/**
 * 跟读行：🔊 示范 · 🎤 录音 · ▶ 回放（单词 / 会話 / 可扩展）
 */
const ShadowSpeak = (() => {
  const clips = new Map();
  let mediaRecorder = null;
  let recordStream = null;
  let recordChunks = [];
  let recordRowId = null;
  let recordMime = "";
  let activeRecordBtn = null;
  let playbackAudio = null;
  let playbackObjectUrl = null;
  let silenceCheckTimer = null;
  let recordMaxTimer = null;
  let lastSoundAt = 0;

  const SILENCE_MS = 3000;
  const MAX_RECORD_MS = 15000;

  function escAttr(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function isWeChat() {
    return /MicroMessenger/i.test(navigator.userAgent || "");
  }

  function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent || "");
  }

  /** 微信 / iPhone 优先 mp4，避免录 webm 却无法回放 */
  function pickRecordMime() {
    const iosFirst = isIOS() || isWeChat();
    const candidates = iosFirst
      ? ["audio/mp4", "audio/aac", "audio/webm;codecs=opus", "audio/webm", ""]
      : ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/aac", ""];
    for (const t of candidates) {
      if (!t) return "";
      if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t)) return t;
    }
    return "";
  }

  function blobMime() {
    if (recordMime) return recordMime;
    if (mediaRecorder?.mimeType) return mediaRecorder.mimeType;
    return isIOS() ? "audio/mp4" : "audio/webm";
  }

  function expectedLine(payload) {
    if (!payload) return "";
    if (typeof payload === "string") return payload;
    if (payload.kana) return payload.kana;
    if (typeof RubyRender !== "undefined" && payload.ruby && payload.jp) {
      return RubyRender.toKanaReading(payload.jp, payload.ruby);
    }
    return payload.jp || payload.japanese || "";
  }

  function parseKeywordsAttr(attrs) {
    const m = /data-ss-keywords=['"]([^'"]*)['"]/.exec(attrs || "");
    if (!m) return [];
    try {
      const arr = JSON.parse(m[1].replace(/&quot;/g, '"'));
      return Array.isArray(arr) ? arr : [];
    } catch (_) {
      return [];
    }
  }

  function isDialogueRow(rowId, extraAttrs) {
    if (/data-ss-dialogue/.test(extraAttrs || "")) return true;
    return /^dg-r-/.test(rowId || "");
  }

  function rowHtml(payload, rowId, extraAttrs = "") {
    const exp = expectedLine(payload);
    const speakBtn =
      typeof SpeakUI !== "undefined"
        ? SpeakUI.btnHtml(payload, `data-ss-play="1" ${extraAttrs}`)
        : `<button type="button" class="btn-speak-icon" data-ss-play="1" data-jp="${escAttr(exp)}">🔊</button>`;
    const mode = isDialogueRow(rowId, extraAttrs) ? "dialogue" : /^vf-/.test(rowId || "") ? "vocab" : "light";
    const kw = parseKeywordsAttr(extraAttrs);
    const kwAttr = kw.length ? ` data-ss-keywords="${escAttr(JSON.stringify(kw))}"` : "";
    const scoreSlot =
      mode === "dialogue"
        ? `<div class="dg-score-slot" data-dg-score-for="${escAttr(rowId)}"></div>`
        : "";
    return `<div class="ss-action-row" data-ss-row="${escAttr(rowId)}" data-ss-mode="${mode}">
      ${speakBtn}
      <button type="button" class="btn-ss-record" data-ss-record data-ss-row="${escAttr(rowId)}" data-ss-mode="${mode}" data-speak-expected="${escAttr(exp)}"${kwAttr} aria-label="录音" title="录音">🎤</button>
      <button type="button" class="btn-ss-replay" data-ss-replay data-ss-row="${escAttr(rowId)}" disabled aria-label="回放" title="回放">▶</button>
    </div>${scoreSlot}`;
  }

  function toast(msg) {
    if (typeof SpeakUI !== "undefined" && SpeakUI.showToast) SpeakUI.showToast(msg);
  }

  function clearRecordTimers() {
    if (silenceCheckTimer) {
      clearInterval(silenceCheckTimer);
      silenceCheckTimer = null;
    }
    if (recordMaxTimer) {
      clearTimeout(recordMaxTimer);
      recordMaxTimer = null;
    }
  }

  function revokePlaybackUrl() {
    if (playbackObjectUrl) {
      try {
        URL.revokeObjectURL(playbackObjectUrl);
      } catch (_) {}
      playbackObjectUrl = null;
    }
  }

  function stopPlayback() {
    if (playbackAudio) {
      try {
        playbackAudio.pause();
        playbackAudio.removeAttribute("src");
        playbackAudio.load();
      } catch (_) {}
      playbackAudio = null;
    }
    revokePlaybackUrl();
    if (typeof SpeechEngine !== "undefined" && SpeechEngine.stopAllPlayback) {
      SpeechEngine.stopAllPlayback();
    }
  }

  function releaseStream() {
    if (recordStream) {
      recordStream.getTracks().forEach((t) => t.stop());
      recordStream = null;
    }
  }

  function setupPlaybackAudio(audio, url) {
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");
    audio.playsInline = true;
    audio.preload = "auto";
    audio.volume = 1;
    audio.src = url;
  }

  async function playClip(rowId) {
    const blob = clips.get(rowId);
    if (!blob || blob.size < 80) {
      toast("还没有录音，请先点 🎤");
      return;
    }
    stopPlayback();
    if (typeof SpeechEngine !== "undefined" && SpeechEngine.unlockAudioOnce) {
      SpeechEngine.unlockAudioOnce();
    }
    playbackObjectUrl = URL.createObjectURL(blob);
    playbackAudio = new Audio();
    setupPlaybackAudio(playbackAudio, playbackObjectUrl);
    playbackAudio.onended = () => {
      stopPlayback();
    };
    try {
      await playbackAudio.play();
    } catch (err) {
      stopPlayback();
      const wx = isWeChat();
      toast(
        wx
          ? "回放失败：请再点一次 ▶；仍不行请右上角「···」→ 在浏览器中打开"
          : "回放失败：请再点一次 ▶"
      );
    }
  }

  function cleanupRecordUi() {
    clearRecordTimers();
    if (activeRecordBtn) {
      activeRecordBtn.classList.remove("is-recording");
      activeRecordBtn = null;
    }
    mediaRecorder = null;
    recordRowId = null;
    recordMime = "";
    recordChunks = [];
    releaseStream();
  }

  function enableReplay(btn) {
    const replay = btn.closest(".ss-action-row")?.querySelector("[data-ss-replay]");
    if (replay) {
      replay.disabled = false;
      replay.removeAttribute("aria-disabled");
    }
  }

  function showDialogueScore(rowId, html) {
    const slot = document.querySelector(`[data-dg-score-for="${rowId}"]`);
    if (slot) slot.innerHTML = html;
  }

  async function finishRecord(btn, rowId, evaluate) {
    const mime = blobMime();
    const blob = new Blob(recordChunks, { type: mime });
    const mode = btn?.dataset?.ssMode || btn?.closest(".ss-action-row")?.dataset?.ssMode || "light";
    cleanupRecordUi();
    if (blob.size < 200) {
      if (evaluate) toast("录音太短，请再说一次");
      return;
    }
    clips.set(rowId, blob);
    enableReplay(btn);
    if (!evaluate) return;

    const exp = btn?.dataset?.speakExpected || "";
    let keywords = [];
    try {
      if (btn?.dataset?.ssKeywords) keywords = JSON.parse(btn.dataset.ssKeywords);
    } catch (_) {}

    if (typeof SpeechEngine === "undefined") {
      toast("已录音，可点 ▶ 回放");
      return;
    }

    if (mode === "dialogue" && SpeechEngine.evaluateDialogueDetailed) {
      const slot = document.querySelector(`[data-dg-score-for="${rowId}"]`);
      if (slot) slot.innerHTML = '<p class="dg-score-loading">正在分析发音…</p>';
      const r = await SpeechEngine.evaluateDialogueDetailed({
        expected: exp,
        heard: "",
        audioBlob: blob,
        keywords,
      });
      if (SpeechEngine.renderDialogueScoreHtml) {
        showDialogueScore(rowId, SpeechEngine.renderDialogueScoreHtml(r));
      } else {
        toast(r.passed ? `会话跟读 ${r.score} 分 ✓` : r.feedback);
      }
      return;
    }

    if (SpeechEngine.evaluatePronunciation) {
      const r = await SpeechEngine.evaluatePronunciation({
        expected: exp,
        heard: "",
        audioBlob: blob,
        keywords,
      });
      if (mode === "vocab") {
        toast(r.ok ? `发音 OK（${r.score}分）` : r.tip || "再听一遍跟读");
      } else {
        toast(r.ok ? `跟读不错（${r.score}分）` : r.tip || "再听示范读一遍");
      }
    } else {
      toast("已录音，可点 ▶ 回放");
    }
  }

  function flushRecorder() {
    if (!mediaRecorder || mediaRecorder.state !== "recording") return;
    try {
      mediaRecorder.requestData();
    } catch (_) {}
  }

  function forceStopRecord(evaluate) {
    return new Promise((resolve) => {
      if (!mediaRecorder || mediaRecorder.state === "inactive") {
        cleanupRecordUi();
        resolve();
        return;
      }
      const btn = activeRecordBtn;
      const rowId = recordRowId;
      flushRecorder();
      mediaRecorder.onstop = async () => {
        releaseStream();
        if (btn && rowId != null) await finishRecord(btn, rowId, evaluate);
        else cleanupRecordUi();
        resolve();
      };
      try {
        mediaRecorder.stop();
      } catch (_) {
        cleanupRecordUi();
        resolve();
      }
    });
  }

  async function stopRecord(btn) {
    if (!mediaRecorder || recordRowId == null) return;
    await forceStopRecord(true);
  }

  function startSilenceWatch(btn) {
    lastSoundAt = Date.now();
    clearRecordTimers();
    silenceCheckTimer = setInterval(() => {
      if (!mediaRecorder || mediaRecorder.state !== "recording") return;
      if (Date.now() - lastSoundAt >= SILENCE_MS) {
        toast("3 秒无声音，录音已自动结束");
        forceStopRecord(true);
      }
    }, 400);
    recordMaxTimer = setTimeout(() => {
      if (mediaRecorder?.state === "recording") {
        toast("已达最长录音时间");
        forceStopRecord(true);
      }
    }, MAX_RECORD_MS);
  }

  async function startRecord(btn, rowId, payload) {
    if (mediaRecorder && recordRowId === rowId) {
      await stopRecord(btn);
      return;
    }
    if (mediaRecorder && recordRowId !== rowId) {
      await forceStopRecord(false);
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      toast("当前环境不支持录音，请用微信打开");
      return;
    }
    if (typeof SpeechEngine !== "undefined" && SpeechEngine.unlockAudioOnce) {
      SpeechEngine.unlockAudioOnce();
    }
    stopPlayback();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordStream = stream;
      recordChunks = [];
      recordRowId = rowId;
      activeRecordBtn = btn;
      recordMime = pickRecordMime();
      btn.dataset.speakExpected =
        typeof payload === "object" ? JSON.stringify(payload) : String(payload || "");
      const opts = recordMime ? { mimeType: recordMime } : undefined;
      mediaRecorder = opts ? new MediaRecorder(stream, opts) : new MediaRecorder(stream);
      if (!recordMime && mediaRecorder.mimeType) recordMime = mediaRecorder.mimeType;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          if (e.data.size > 80) lastSoundAt = Date.now();
          recordChunks.push(e.data);
        }
      };
      mediaRecorder.start(200);
      btn.classList.add("is-recording");
      startSilenceWatch(btn);
      toast("录音中… 再点 🎤 结束，静音 3 秒自动停");
    } catch (_) {
      cleanupRecordUi();
      toast("请允许麦克风权限");
    }
  }

  function bind(root) {
    if (!root) return;
    root.querySelectorAll("[data-ss-play]").forEach((btn) => {
      if (btn.dataset.ssPlayBound === "1") return;
      btn.dataset.ssPlayBound = "1";
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (typeof SpeakUI !== "undefined" && SpeakUI.speakFromButton) {
          SpeakUI.speakFromButton(btn);
        }
      });
    });
    root.querySelectorAll("[data-ss-record]").forEach((btn) => {
      if (btn.dataset.ssRecBound === "1") return;
      btn.dataset.ssRecBound = "1";
      const rowId = btn.dataset.ssRow;
      const row = btn.closest(".ss-action-row");
      const playBtn = row?.querySelector("[data-speak],[data-jp]");
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let payload = playBtn?.dataset.speak || playBtn?.dataset.jp || "";
        try {
          if (playBtn?.dataset.speak) payload = JSON.parse(playBtn.dataset.speak);
        } catch (_) {}
        await startRecord(btn, rowId, payload);
      });
    });
    root.querySelectorAll("[data-ss-replay]").forEach((btn) => {
      if (btn.dataset.ssReplayBound === "1") return;
      btn.dataset.ssReplayBound = "1";
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        e.preventDefault();
        await playClip(btn.dataset.ssRow);
      });
    });
    if (typeof SpeakUI !== "undefined") SpeakUI.bind(root);
  }

  return { rowHtml, bind, clips, stopReplay: stopPlayback };
})();
