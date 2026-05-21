/**
 * 跟读行：🔊 示范 · 🎤 录音 · ▶ 回放（单词 / 会話 / 可扩展）
 */
const ShadowSpeak = (() => {
  const clips = new Map();
  let mediaRecorder = null;
  let recordStream = null;
  let recordChunks = [];
  let recordRowId = null;
  let activeRecordBtn = null;
  let playbackAudio = null;
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

  function expectedLine(payload) {
    if (!payload) return "";
    if (typeof payload === "string") return payload;
    if (payload.kana) return payload.kana;
    if (typeof RubyRender !== "undefined" && payload.ruby && payload.jp) {
      return RubyRender.toKanaReading(payload.jp, payload.ruby);
    }
    return payload.jp || payload.japanese || "";
  }

  function rowHtml(payload, rowId, extraAttrs = "") {
    const speakBtn =
      typeof SpeakUI !== "undefined"
        ? SpeakUI.btnHtml(payload, `data-ss-play="1" ${extraAttrs}`)
        : `<button type="button" class="btn-speak-icon" data-ss-play="1" data-jp="${escAttr(expectedLine(payload))}">🔊</button>`;
    return `<div class="ss-action-row" data-ss-row="${escAttr(rowId)}">
      ${speakBtn}
      <button type="button" class="btn-ss-record" data-ss-record data-ss-row="${escAttr(rowId)}" aria-label="录音" title="录音">🎤</button>
      <button type="button" class="btn-ss-replay" data-ss-replay data-ss-row="${escAttr(rowId)}" disabled aria-label="回放" title="回放">▶</button>
    </div>`;
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

  function stopPlayback() {
    if (playbackAudio) {
      try {
        playbackAudio.pause();
      } catch (_) {}
      playbackAudio = null;
    }
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

  async function playClip(rowId) {
    const blob = clips.get(rowId);
    if (!blob) {
      toast("还没有录音，请先点 🎤");
      return;
    }
    stopPlayback();
    const url = URL.createObjectURL(blob);
    playbackAudio = new Audio(url);
    playbackAudio.onended = () => URL.revokeObjectURL(url);
    try {
      await playbackAudio.play();
    } catch (_) {
      toast("回放失败");
      URL.revokeObjectURL(url);
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
    recordChunks = [];
    releaseStream();
  }

  async function finishRecord(btn, rowId, evaluate) {
    const blob = new Blob(recordChunks, { type: "audio/webm" });
    cleanupRecordUi();
    if (blob.size < 200) {
      if (evaluate) toast("录音太短，请再说一次");
      return;
    }
    clips.set(rowId, blob);
    const replay = btn.closest(".ss-action-row")?.querySelector("[data-ss-replay]");
    if (replay) replay.disabled = false;
    if (!evaluate) return;

    let payload = btn.dataset.speakExpected || "";
    try {
      payload = JSON.parse(payload);
    } catch (_) {}
    const exp = expectedLine(payload);
    if (typeof SpeechEngine !== "undefined" && SpeechEngine.evaluatePronunciation) {
      const r = await SpeechEngine.evaluatePronunciation({
        expected: exp,
        heard: "",
        audioBlob: blob,
      });
      toast(r.ok ? `跟读不错（${r.score}分）` : r.tip || "再听示范读一遍");
    } else {
      toast("已录音，可点 ▶ 回放");
    }
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
      mediaRecorder.onstop = async () => {
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
    stopPlayback();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordStream = stream;
      recordChunks = [];
      recordRowId = rowId;
      activeRecordBtn = btn;
      btn.dataset.speakExpected =
        typeof payload === "object" ? JSON.stringify(payload) : String(payload || "");
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 80) lastSoundAt = Date.now();
        recordChunks.push(e.data);
      };
      mediaRecorder.onstop = () => releaseStream();
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
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        playClip(btn.dataset.ssRow);
      });
    });
    if (typeof SpeakUI !== "undefined") SpeakUI.bind(root);
  }

  return { rowHtml, bind, clips, stopReplay: stopPlayback };
})();
