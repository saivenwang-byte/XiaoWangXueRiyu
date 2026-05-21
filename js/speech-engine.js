/**
 * 日语朗读：本地 MP3（预加载）→ 手机本机日语 TTS → 在线 TTS（短超时，走用户流量）
 * 发音评分：语音识别 + 音量分析（微信内无识别时仍可评分）
 */
const SpeechEngine = (() => {
  let recognition = null;
  let listening = false;
  let cachedJaVoices = null;
  let currentAudio = null;
  /** 取消并发朗读（双重点击 / 重复绑定） */
  let speakToken = 0;
  /** 已预热的 MP3：hash → { audio, ready, failed } */
  const mp3Warm = new Map();

  const TTS_CACHE_DIR = "tts-cache/";
  /** 直链 Audio 兜底等待（微信已优先 fetch，不再傻等 4.5s） */
  const MP3_WAIT_MS = 900;
  const MP3_WAIT_WECHAT_MS = 1100;
  const FETCH_MP3_MS = 2800;
  const FETCH_MP3_MS_DESKTOP = 2200;
  let audioUnlocked = false;
  const ONLINE_TTS_MS = 2200;
  let loadingListener = null;
  const ONLINE_TTS_URLS = [
    "https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=ja&q=",
    "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ja&q=",
  ];

  const CHINESE_LESSON_RE =
    /动词|形容词|名词|语法|购物|百货|连接|变化|请求|进行|建议|做完|为了|现实|教材|课后|巩固|三个|关系|会话|测试|网络|上一|下一|关闭/;

  function ttsCacheKey(jp) {
    const s = (jp || "").trim();
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    }
    return (h >>> 0).toString(16);
  }

  function isWeChatBrowser() {
    return /MicroMessenger/i.test(navigator.userAgent || "");
  }

  function preferFetchMp3() {
    const ua = navigator.userAgent || "";
    return isWeChatBrowser() || /iPhone|iPad|iPod|Android/i.test(ua);
  }

  /** 微信内 Google 在线 TTS 几乎不可用，跳过以免拖到 1 分钟+ */
  function shouldUseOnlineTts() {
    return !isWeChatBrowser();
  }

  function notifyLoading(on) {
    try {
      loadingListener?.(!!on);
    } catch (_) {}
  }

  function setLoadingListener(fn) {
    loadingListener = typeof fn === "function" ? fn : null;
  }

  async function fetchMp3Blob(line, token) {
    if (token != null && token !== speakToken) return null;
    if (typeof location !== "undefined" && location.protocol === "file:") return null;
    const url = ttsMp3Url(line);
    const ms = preferFetchMp3() ? FETCH_MP3_MS : FETCH_MP3_MS_DESKTOP;
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timer = ctrl ? setTimeout(() => ctrl.abort(), ms) : null;
    try {
      const res = await fetch(url, {
        cache: "force-cache",
        credentials: "omit",
        signal: ctrl?.signal,
      });
      if (token != null && token !== speakToken) return null;
      if (!res.ok) return null;
      const blob = await res.blob();
      if (blob.size < 200) return null;
      return blob;
    } catch (_) {
      return null;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  /** 微信 / 手机：首次点击解锁音频（否则 play() 无声） */
  function unlockAudioOnce() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    try {
      const silent = new Audio(
        "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"
      );
      silent.volume = 0.01;
      const p = silent.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } catch (_) {}
  }

  function stopAllPlayback() {
    mp3Warm.forEach((entry) => {
      try {
        entry.audio.pause();
        entry.audio.currentTime = 0;
      } catch (_) {}
    });
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio.src = "";
      } catch (_) {}
      currentAudio = null;
    }
    try {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    } catch (_) {}
  }

  function refreshJapaneseVoices() {
    if (!window.speechSynthesis) return [];
    try {
      cachedJaVoices = window.speechSynthesis.getVoices().filter((v) => {
        const lang = (v.lang || "").toLowerCase();
        const name = (v.name || "").toLowerCase();
        if (lang.startsWith("zh") || lang.startsWith("cmn")) return false;
        if (/chinese|中文|mandarin|cantonese|xiaoxiao|yunxi|huihui|kangkang|ting-ting|meijia/.test(name)) {
          return false;
        }
        return lang.startsWith("ja");
      });
    } catch (_) {
      cachedJaVoices = [];
    }
    return cachedJaVoices;
  }

  function pickJapaneseVoice() {
    const list = cachedJaVoices?.length ? cachedJaVoices : refreshJapaneseVoices();
    if (!list.length) return null;
    const score = (v) => {
      const n = (v.name || "").toLowerCase();
      const lang = (v.lang || "").toLowerCase();
      let s = 0;
      if (lang.startsWith("ja-jp")) s += 12;
      else if (lang.startsWith("ja")) s += 8;
      if (/haruka|ichiro|ayumi|kyoko|nanami|keita|otoya|google.*japan|japanese|日本/.test(n)) s += 25;
      if (/microsoft/.test(n) && lang.startsWith("ja")) s += 15;
      if (/edge/.test(n) && lang.startsWith("ja")) s += 10;
      if (v.localService) s += 2;
      if (/chinese|中文|mandarin/.test(n)) s -= 100;
      return s;
    };
    return list.slice().sort((a, b) => score(b) - score(a))[0];
  }

  function hasReliableLocalJaVoice() {
    const v = pickJapaneseVoice();
    if (!v) return false;
    const lang = (v.lang || "").toLowerCase();
    const name = (v.name || "").toLowerCase();
    if (lang.startsWith("zh") || /chinese|中文|mandarin/.test(name)) return false;
    return lang.startsWith("ja");
  }

  if (typeof window !== "undefined" && window.speechSynthesis) {
    refreshJapaneseVoices();
    window.speechSynthesis.addEventListener("voiceschanged", refreshJapaneseVoices);
  }

  function getRecognition() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    if (!recognition) {
      recognition = new SR();
      recognition.lang = "ja-JP";
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;
    }
    return recognition;
  }

  function resolveJaText(input) {
    if (input == null) return "";
    if (typeof input === "object") {
      const o = input;
      return (
        o.japanese ||
        o.jp ||
        o.titleJa ||
        (o.title && !CHINESE_LESSON_RE.test(o.title) ? o.title : "") ||
        o.example ||
        o.explain ||
        o.explanation ||
        ""
      ).trim();
    }
    return String(input).trim();
  }

  function isChineseLearningText(s) {
    const t = (s || "").trim();
    if (!t) return true;
    if (/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]/.test(t) === false) return true;
    if (CHINESE_LESSON_RE.test(t) && !/[\u3040-\u309f\u30a0-\u30ff]/.test(t)) return true;
    if (/[\u3040-\u309f\u30a0-\u30ff]/.test(t)) {
      if (/^(动词|形容词|名词|语法|购物|百货)$/.test(t)) return true;
      return false;
    }
    const han = (t.match(/[\u4e00-\u9fff]/g) || []).length;
    const kana = (t.match(/[\u3040-\u309f\u30a0-\u30ff]/g) || []).length;
    if (han > 0 && kana === 0 && han / t.length > 0.85) return true;
    return false;
  }

  /** 只去掉纯中文括号注，保留含假名的日文括号（如「自然の変化」） */
  function stripChineseParens(line) {
    const stripIfChinese = (inner) => {
      const t = (inner || "").trim();
      if (!t) return true;
      if (/[\u3040-\u309f\u30a0-\u30ff]/.test(t)) return false;
      if (/[\u4e00-\u9fff]/.test(t) && !/[\u3040-\u309f\u30a0-\u30ff]/.test(t)) return true;
      return false;
    };
    return line
      .replace(/（([^）]*)）/g, (m, inner) => (stripIfChinese(inner) ? "" : m))
      .replace(/\(([^)]*)\)/g, (m, inner) => (stripIfChinese(inner) ? "" : m));
  }

  function splitExampleParts(text) {
    return (text || "")
      .split(/[/／]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function prepareJaTtsLine(raw) {
    let line = resolveJaText(raw);
    line = stripChineseParens(line);
    if (/[→⇔]/.test(line)) {
      line = line.split(/[→⇔]/)[0].trim();
    }
    if (!line || isChineseLearningText(line)) return "";
    return line;
  }

  function warmPhrase(line) {
    const key = ttsCacheKey(line);
    if (mp3Warm.has(key)) return mp3Warm.get(key);
    const url = `${TTS_CACHE_DIR}${key}.mp3`;
    const audio = new Audio(url);
    audio.setAttribute("playsinline", "true");
    audio.playsInline = true;
    audio.preload = "auto";
    const entry = { audio, ready: false, failed: false, key };
    const markReady = () => {
      entry.ready = true;
    };
    const markFail = () => {
      entry.failCount = (entry.failCount || 0) + 1;
      if (entry.failCount >= 2) entry.failed = true;
    };
    audio.addEventListener("canplaythrough", markReady, { once: true });
    audio.addEventListener("loadeddata", markReady, { once: true });
    audio.addEventListener("error", markFail, { once: true });
    try {
      audio.load();
    } catch (_) {}
    mp3Warm.set(key, entry);
    return entry;
  }

  function warmPhrases(lines) {
    const seen = new Set();
    (lines || []).forEach((raw) => {
      const candidates =
        raw && typeof raw === "object" ? fallbackLines(raw) : [prepareJaTtsLine(raw)];
      candidates.forEach((line) => {
        if (!line || seen.has(line)) return;
        seen.add(line);
        warmPhrase(line);
      });
    });
  }

  function ttsMp3Url(line) {
    const base =
      typeof location !== "undefined" && location.pathname.includes("/")
        ? location.pathname.replace(/[^/]*$/, "")
        : "./";
    return `${base}${TTS_CACHE_DIR}${ttsCacheKey(line)}.mp3`;
  }

  /** fetch→blob（带超时） */
  async function playBundledMp3Fetch(line, token) {
    const blob = await fetchMp3Blob(line, token);
    if (!blob) return false;
    const blobUrl = URL.createObjectURL(blob);
    const ok = await playAudioUrl(blobUrl, token);
    URL.revokeObjectURL(blobUrl);
    return ok;
  }

  /** 直链 MP3 短等待兜底 */
  function playBundledMp3Direct(line, token, waitMs) {
    return new Promise((resolve) => {
      warmPhrase(line);
      const url = ttsMp3Url(line);
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        resolve(!!ok);
      };
      const playNow = () => {
        if (token != null && token !== speakToken) {
          finish(false);
          return;
        }
        stopAllPlayback();
        const audio = new Audio(url);
        audio.setAttribute("playsinline", "true");
        audio.playsInline = true;
        audio.preload = "auto";
        currentAudio = audio;
        audio.onended = () => {
          if (currentAudio === audio) currentAudio = null;
          finish(true);
        };
        audio.onerror = () => finish(false);
        try {
          const p = audio.play();
          if (p && typeof p.catch === "function") p.catch(() => finish(false));
        } catch (_) {
          finish(false);
        }
      };
      playNow();
      setTimeout(() => {
        if (!settled) finish(false);
      }, waitMs);
    });
  }

  /** ① 嵌入语音包：手机/微信先 fetch（≤3s），再短兜底直链 */
  async function playBundledMp3(line, token) {
    if (preferFetchMp3()) {
      const ok = await playBundledMp3Fetch(line, token);
      if (ok) return true;
      return playBundledMp3Direct(
        line,
        token,
        isWeChatBrowser() ? MP3_WAIT_WECHAT_MS : MP3_WAIT_MS
      );
    }
    const okDirect = await playBundledMp3Direct(line, token, MP3_WAIT_MS);
    if (okDirect) return true;
    return playBundledMp3Fetch(line, token);
  }

  function isMostlyKana(line) {
    const t = (line || "").trim();
    if (!t) return false;
    const kana = (t.match(/[\u3040-\u309f\u30a0-\u30ff]/g) || []).length;
    return kana >= Math.max(1, t.length * 0.45);
  }

  function playAudioUrl(url, token) {
    return new Promise((resolve) => {
      if (token != null && token !== speakToken) {
        resolve(false);
        return;
      }
      stopAllPlayback();
      if (token != null && token !== speakToken) {
        resolve(false);
        return;
      }
      const audio = new Audio(url);
      audio.setAttribute("playsinline", "true");
      audio.playsInline = true;
      currentAudio = audio;
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        if (currentAudio === audio) currentAudio = null;
        resolve(!!ok);
      };
      audio.onended = () => finish(true);
      audio.onerror = () => finish(false);
      const p = audio.play();
      if (p && typeof p.catch === "function") p.catch(() => finish(false));
    });
  }

  async function playOnlineJapaneseWithTimeout(line, token) {
    if (!shouldUseOnlineTts()) return false;
    return Promise.race([
      playOnlineJapanese(line, 0, token),
      new Promise((r) => setTimeout(() => r(false), ONLINE_TTS_MS)),
    ]);
  }

  /** ③ 在线日语 TTS（仅桌面备用；微信内跳过） */
  async function playOnlineJapanese(line, urlIndex = 0, token) {
    if (!shouldUseOnlineTts()) return false;
    if (token != null && token !== speakToken) return false;
    if (typeof location !== "undefined" && location.protocol === "file:") return false;
    if (urlIndex >= ONLINE_TTS_URLS.length) return false;
    const src = ONLINE_TTS_URLS[urlIndex] + encodeURIComponent(line);
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timer = ctrl ? setTimeout(() => ctrl.abort(), ONLINE_TTS_MS) : null;
    try {
      const res = await fetch(src, { mode: "cors", credentials: "omit", signal: ctrl?.signal });
      if (token != null && token !== speakToken) return false;
      if (res.ok) {
        const blob = await res.blob();
        if (blob.size > 256) {
          const blobUrl = URL.createObjectURL(blob);
          const ok = await playAudioUrl(blobUrl, token);
          URL.revokeObjectURL(blobUrl);
          if (ok) return true;
        }
      }
    } catch (_) {
    } finally {
      if (timer) clearTimeout(timer);
    }
    return playOnlineJapaneseDirect(line, urlIndex, token);
  }

  function playOnlineJapaneseDirect(line, urlIndex = 0, token) {
    return new Promise((resolve) => {
      if (token != null && token !== speakToken) {
        resolve(false);
        return;
      }
      if (urlIndex >= ONLINE_TTS_URLS.length) {
        resolve(false);
        return;
      }
      stopAllPlayback();
      if (token != null && token !== speakToken) {
        resolve(false);
        return;
      }
      const audio = new Audio(ONLINE_TTS_URLS[urlIndex] + encodeURIComponent(line));
      audio.setAttribute("playsinline", "true");
      audio.playsInline = true;
      currentAudio = audio;
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        if (currentAudio === audio) currentAudio = null;
        resolve(!!ok);
      };
      audio.onended = () => finish(true);
      audio.onerror = () => playOnlineJapaneseDirect(line, urlIndex + 1, token).then(resolve);
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => playOnlineJapaneseDirect(line, urlIndex + 1, token).then(resolve));
      }
    });
  }

  /** ③ 本机日语（宽松：有 ja 就用） */
  function playLocalSynthesis(line, rate = 0.85, strict = true, token) {
    return new Promise((resolve) => {
      if (token != null && token !== speakToken) {
        resolve(false);
        return;
      }
      if (!window.speechSynthesis) {
        resolve(false);
        return;
      }
      if (strict && !hasReliableLocalJaVoice()) {
        resolve(false);
        return;
      }
      stopAllPlayback();
      if (token != null && token !== speakToken) {
        resolve(false);
        return;
      }
      refreshJapaneseVoices();
      const voice = pickJapaneseVoice();
      let started = false;
      let done = false;
      const finish = (ok) => {
        if (done) return;
        done = true;
        if (token != null && token !== speakToken) {
          resolve(false);
          return;
        }
        resolve(!!ok);
      };
      const u = new SpeechSynthesisUtterance(line);
      if (voice) {
        u.voice = voice;
        u.lang = voice.lang || "ja-JP";
      } else {
        u.lang = "ja-JP";
      }
      u.rate = rate;
      u.onstart = () => {
        started = true;
      };
      u.onend = () => finish(true);
      u.onerror = () => finish(false);
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
      try {
        window.speechSynthesis.speak(u);
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      } catch (_) {
        finish(false);
        return;
      }
      setTimeout(() => {
        if (token != null && token !== speakToken) {
          finish(false);
          return;
        }
        if (!started && !done && !window.speechSynthesis.speaking) finish(false);
      }, 900);
    });
  }

  function rubyKanaLine(text, segments) {
    if (!text || !segments?.length) return "";
    if (typeof RubyRender !== "undefined" && RubyRender.toKanaReading) {
      return RubyRender.toKanaReading(text, segments);
    }
    let s = text;
    segments.forEach(({ kanji, reading }) => {
      if (kanji && reading) s = s.split(kanji).join(reading);
    });
    return s;
  }

  function pushLine(lines, raw) {
    const line = prepareJaTtsLine(raw);
    if (line && !lines.includes(line)) lines.push(line);
  }

  async function trySpeakLine(line, rate = 0.85, token) {
    if (!line) return false;
    if (token != null && token !== speakToken) return false;
    unlockAudioOnce();
    if (await playBundledMp3(line, token)) {
      if (token != null && token !== speakToken) return false;
      return true;
    }
    if (token != null && token !== speakToken) return false;
    if (await playOnlineJapaneseWithTimeout(line, token)) {
      if (token != null && token !== speakToken) return false;
      return true;
    }
    if (token != null && token !== speakToken) return false;
    /* 中文 Windows 上无日语包时会把汉字读成中文，禁止宽松本机 TTS */
    if (hasReliableLocalJaVoice() && (await playLocalSynthesis(line, rate, true, token))) {
      if (token != null && token !== speakToken) return false;
      return true;
    }
    return false;
  }

  function fallbackLines(textOrObj) {
    const lines = [];
    if (textOrObj && typeof textOrObj === "object") {
      const jp = textOrObj.jp || textOrObj.japanese || textOrObj.title || "";
      const ruby =
        textOrObj.ruby || textOrObj.japaneseRuby || textOrObj.titleRuby || textOrObj.lessonTitleRuby;
      if (textOrObj.questionTts) pushLine(lines, textOrObj.questionTts);
      if (textOrObj.kana) pushLine(lines, textOrObj.kana);
      const fromRuby = rubyKanaLine(jp, ruby);
      if (fromRuby) pushLine(lines, fromRuby);
      if (!/[＿_]{2,}/.test(jp)) pushLine(lines, jp);
      if (textOrObj.example) {
        const parts = splitExampleParts(textOrObj.example);
        if (parts.length > 1) {
          parts.forEach((part) => pushLine(lines, { jp: part, ruby: textOrObj.exampleRuby }));
        } else {
          pushLine(lines, textOrObj.example);
        }
      }
    } else {
      const s = String(textOrObj || "");
      if (!/[＿_]{2,}/.test(s)) pushLine(lines, s);
    }
    return lines;
  }

  /**
   * 唯一朗读入口：MP3 → 在线 → 本机；单词失败时尝试例文
   */
  async function speakJa(textOrObj, rate = 0.85) {
    const token = ++speakToken;
    stopAllPlayback();
    notifyLoading(true);
    try {
      const candidates = fallbackLines(textOrObj);
      if (!candidates.length) return false;
      for (const line of candidates) {
        if (token !== speakToken) return false;
        if (await trySpeakLine(line, rate, token)) {
          if (token !== speakToken) return false;
          return true;
        }
      }
      return false;
    } finally {
      if (token === speakToken) notifyLoading(false);
    }
  }

  function speak(text, rate) {
    return speakJa(text, rate);
  }

  function normalizeJa(s) {
    return (s || "")
      .trim()
      .replace(/\s+/g, "")
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
      .replace(/[ァ-ン]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
      .toLowerCase();
  }

  const KEYWORD_STOP = new Set([
    "です",
    "ます",
    "ました",
    "でした",
    "ですか",
    "ません",
    "から",
    "けど",
    "でも",
    "とても",
    "ちょっと",
    "そう",
    "はい",
    "あの",
    "この",
    "その",
    "また",
    "もう",
    "まだ",
    "ので",
    "には",
    "では",
    "へ",
    "を",
    "に",
    "が",
    "は",
    "の",
    "と",
    "も",
    "て",
    "で",
    "い",
    "な",
    "だ",
    "する",
    "なる",
    "ある",
    "いる",
    "れる",
    "られる",
    "ください",
    "ましょう",
  ]);

  function textOverlapRatio(spoken, target) {
    const A = normalizeJa(spoken);
    const B = normalizeJa(target);
    if (!A || !B) return 0;
    let hit = 0;
    for (const ch of B) if (A.includes(ch)) hit++;
    return hit / B.length;
  }

  /** 从会话句自动提取关键词（② 会話评分用） */
  function extractKeywordsFromJapanese(jp, max = 6) {
    if (!jp) return [];
    const chunks = jp.match(/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fafー]{2,10}/g) || [];
    const out = [];
    for (const w of chunks) {
      const n = normalizeJa(w);
      if (n.length < 2 || KEYWORD_STOP.has(n)) continue;
      if (!out.includes(n)) out.push(n);
      if (out.length >= max) break;
    }
    return out;
  }

  function scoreBarHtml(label, got, max) {
    const pct = max ? Math.round((got / max) * 100) : 0;
    return `<div class="score-bar-row"><span>${label}</span><div class="score-bar-track"><div class="score-bar-fill" style="width:${pct}%"></div></div><span>${got}/${max}</span></div>`;
  }

  function renderDialogueScoreHtml(result) {
    const stars =
      result.score >= 90 ? "⭐⭐⭐" : result.score >= 75 ? "⭐⭐" : result.score >= 60 ? "⭐" : "";
    const bars = result.dims
      ? `<div class="score-bars">
            ${scoreBarHtml("关键词", result.dims.keyGot, result.dims.keyMax)}
            ${scoreBarHtml("清晰度", result.dims.clarityGot, result.dims.clarityMax)}
            ${scoreBarHtml("吻合度", result.dims.recogGot, result.dims.recogMax)}
          </div>`
      : "";
    const heard = result.heard
      ? `<p class="dg-score-heard">识别：${result.heard}</p>`
      : result.hasAudio
        ? `<p class="dg-score-heard">已录到声音（未识别文字时按音量分析）</p>`
        : "";
    return `<div class="dg-score-panel ${result.passed ? "pass" : "retry"}">
      <div class="dg-score-head">发音 ${result.score} 分 ${stars}</div>
      <p class="dg-score-tip">${result.feedback}</p>
      ${bars}
      ${heard}
    </div>`;
  }

  /**
   * ② 会話：关键词 40 + 清晰度 25 + 吻合度 35（与旧版 teacherEvaluate 一致）
   */
  async function evaluateDialogueDetailed({
    expected,
    heard = "",
    audioBlob = null,
    keywords = [],
    asrConfidence = 0,
  }) {
    const keys = (keywords.length ? keywords : extractKeywordsFromJapanese(expected)).map(normalizeJa);
    const heardNorm = normalizeJa(heard);
    const hasAudio = !!(audioBlob && audioBlob.size > 200);
    const matched = keys.filter((k) => heardNorm.includes(k) || k.includes(heardNorm));

    if (!hasAudio && !heardNorm) {
      return {
        score: 0,
        passed: false,
        feedback: isWeChatBrowser()
          ? "未录到声音。请允许麦克风，靠近手机清晰朗读后再评分。"
          : "未录到声音。请允许麦克风后重录。",
        heard: "",
        matched: [],
        dims: null,
        hasAudio: false,
      };
    }

    let audio = { ok: false };
    if (hasAudio) {
      try {
        audio = await analyzeAudioBlob(audioBlob);
      } catch (_) {}
    }

    const keyMax = 40;
    const keyGot = keys.length
      ? Math.round((matched.length / keys.length) * keyMax)
      : heardNorm
        ? 28
        : 0;

    const clarityMax = 25;
    let clarityGot = 0;
    if (audio.ok) {
      if (audio.tooQuiet) clarityGot = 4;
      else if (audio.tooShort) clarityGot = 8;
      else {
        clarityGot = 8 + Math.round(Math.min(12, audio.speechRatio * 14));
        if (audio.avgRms >= 0.02 && audio.avgRms <= 0.35) clarityGot += 5;
        if (audio.duration >= 0.7 && audio.duration <= 12) clarityGot += 3;
      }
      clarityGot = Math.min(clarityMax, clarityGot);
    } else if (hasAudio) clarityGot = 10;

    const recogMax = 35;
    const overlap = textOverlapRatio(heard, expected);
    let recogGot = Math.round(overlap * 22 + asrConfidence * 13);
    if (heardNorm && recogGot < 8) recogGot = 8;
    if (!heardNorm && audio.ok && !audio.tooQuiet && !audio.tooShort) {
      recogGot = Math.max(recogGot, keys.length ? 14 : 24);
    }
    recogGot = Math.min(recogMax, recogGot);

    let score = Math.min(100, keyGot + clarityGot + recogGot);
    if (audio.ok && audio.tooQuiet) score = Math.min(score, 55);
    if (!heardNorm && audio.ok && !audio.tooQuiet && !audio.tooShort && audio.duration >= 0.65) {
      score = Math.max(score, 62);
    }
    const passed = score >= 60;

    let feedback;
    if (audio.ok && audio.tooQuiet) {
      feedback = "声音偏小，请靠近麦克风、安静环境再录一次。";
    } else if (score >= 90) {
      feedback = "发音完整、清晰，与示范句吻合度高！";
    } else if (score >= 75) {
      feedback = `不错！关键词：${matched.join("、") || "—"}。可再听示范微调语调。`;
    } else if (score >= 60) {
      feedback = `及格。注意：${keys.slice(0, 4).join("、") || expected.slice(0, 12)}。先听示范再跟读。`;
    } else {
      feedback = `再练一次～目标词：${keys.slice(0, 4).join("、") || expected.slice(0, 12)}。`;
    }

    return {
      score,
      passed,
      feedback,
      heard: heard || "",
      matched,
      dims: { keyGot, keyMax, clarityGot, clarityMax, recogGot, recogMax },
      hasAudio,
    };
  }

  async function analyzeAudioBlob(blob) {
    if (!blob || !blob.size) return { ok: false, reason: "empty" };
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return { ok: false, reason: "no-ctx" };
      const ctx = new Ctx();
      const buf = await blob.arrayBuffer();
      const audioBuf = await ctx.decodeAudioData(buf.slice(0));
      const ch = audioBuf.getChannelData(0);
      const sr = audioBuf.sampleRate;
      const duration = audioBuf.duration;
      let i = 0;
      const frame = Math.floor(sr * 0.04);
      let rmsSum = 0;
      let voiced = 0;
      let frames = 0;
      while (i < ch.length) {
        const end = Math.min(i + frame, ch.length);
        let e = 0;
        for (let j = i; j < end; j++) e += ch[j] * ch[j];
        const rms = Math.sqrt(e / (end - i));
        frames++;
        rmsSum += rms;
        if (rms > 0.018) voiced++;
        i = end;
      }
      const avgRms = frames ? rmsSum / frames : 0;
      const speechRatio = frames ? voiced / frames : 0;
      try {
        ctx.close();
      } catch (_) {}
      return {
        ok: true,
        duration,
        avgRms,
        speechRatio,
        tooQuiet: avgRms < 0.012 || speechRatio < 0.12,
        tooShort: duration < 0.45,
      };
    } catch (_) {
      return { ok: false, reason: "decode" };
    }
  }

  /**
   * 综合评分：语音识别文本 + 录音音量（微信内无识别时仍可凭音量及格）
   */
  async function evaluatePronunciation({ expected, heard = "", audioBlob = null, keywords = [] }) {
    const textResult = scorePronunciation(expected, heard, keywords);
    let audio = { ok: false };
    if (audioBlob) {
      try {
        audio = await analyzeAudioBlob(audioBlob);
      } catch (_) {}
    }

    let score = textResult.score;
    let ok = textResult.ok;
    let tip = textResult.tip;

    if (audio.ok) {
      if (audio.tooQuiet) {
        score = Math.min(score, 48);
        ok = false;
        tip = tip || "声音偏小，请靠近麦克风再录一次。";
      } else if (audio.tooShort) {
        score = Math.min(score, 52);
        ok = false;
        tip = tip || "录音太短，请把整句说完。";
      } else if (!heard && audio.duration >= 0.65 && !audio.tooQuiet) {
        score = Math.max(score, 62);
        ok = true;
        tip = "音量清晰。若需更准，可再听示范跟读一遍。";
      } else if (heard && score < 55 && audio.duration >= 0.5) {
        score = Math.max(score, 58);
      }
    }

    if (!heard && !audio.ok && !audioBlob) {
      return {
        score: 0,
        ok: false,
        tip: "未录到声音。请允许麦克风后，按住「说话」或点「录音」。",
        heard: "",
        expected: textResult.expected,
        mode: "none",
      };
    }

    return {
      score: Math.min(100, score),
      ok,
      tip: ok ? (tip || "很棒！") : tip || textResult.tip,
      heard: textResult.heard,
      expected: textResult.expected,
      mode: heard ? (ok ? "speech" : "speech+audio") : audio.ok ? "audio" : "weak",
    };
  }

  function scorePronunciation(expected, heard, keywords = []) {
    const exp = normalizeJa(expected);
    const got = normalizeJa(heard);
    if (!got) return { score: 0, ok: false, tip: "聞き取れませんでした。もう一度、マイクに近づいてください。" };

    const keys = keywords.length ? keywords.map(normalizeJa) : [exp];
    let hit = 0;
    keys.forEach((k) => {
      if (got.includes(k) || k.includes(got) || similarity(got, k) > 0.55) hit++;
    });
    const keyScore = Math.round((hit / keys.length) * 100);
    const sim = similarity(got, exp);
    const total = Math.round(sim * 60 + keyScore * 0.4);
    const ok = total >= 55 || hit === keys.length;

    let tip = "";
    if (!ok) {
      if (got.length < exp.length * 0.4) tip = "短すぎます。文全体を言ってみましょう。";
      else if (sim < 0.35) tip = "🔊 お手本を聞いてから、もう一度。";
      else tip = "もう少し！イントネーションに気をつけて。";
    }

    return { score: Math.min(100, total), ok, tip, heard: got, expected: exp };
  }

  function similarity(a, b) {
    if (a === b) return 1;
    if (!a || !b) return 0;
    const longer = a.length > b.length ? a : b;
    const shorter = a.length > b.length ? b : a;
    if (!longer.length) return 1;
    const dist = levenshtein(longer, shorter);
    return (longer.length - dist) / longer.length;
  }

  function levenshtein(a, b) {
    const m = [];
    for (let i = 0; i <= b.length; i++) m[i] = [i];
    for (let j = 0; j <= a.length; j++) m[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        m[i][j] =
          b.charAt(i - 1) === a.charAt(j - 1)
            ? m[i - 1][j - 1]
            : Math.min(m[i - 1][j - 1], m[i][j - 1], m[i - 1][j]) + 1;
      }
    }
    return m[b.length][a.length];
  }

  let holdResolve = null;
  let holdText = "";

  function startHoldListen() {
    const rec = getRecognition();
    if (!rec) return Promise.reject(new Error("NO_SR"));
    if (listening) {
      try {
        rec.stop();
      } catch (_) {}
    }
    holdText = "";
    return new Promise((resolve, reject) => {
      holdResolve = { resolve, reject };
      listening = true;
      rec.onresult = (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
          holdText += e.results[i][0].transcript;
        }
      };
      rec.onerror = (e) => {
        listening = false;
        holdResolve = null;
        reject(e.error || "error");
      };
      rec.onend = () => {
        listening = false;
        if (holdResolve) {
          const r = holdResolve;
          holdResolve = null;
          r.resolve(holdText.trim());
        }
      };
      try {
        rec.start();
        rec.continuous = true;
        rec.interimResults = true;
      } catch (e) {
        listening = false;
        holdResolve = null;
        reject(e);
      }
    });
  }

  function stopHoldListen() {
    const rec = getRecognition();
    if (rec && listening) {
      try {
        rec.stop();
      } catch (_) {}
    }
  }

  function listenOnce() {
    return new Promise((resolve, reject) => {
      const rec = getRecognition();
      if (!rec) {
        reject(new Error("NO_SR"));
        return;
      }
      listening = true;
      let done = false;
      const finish = (result, err) => {
        if (done) return;
        done = true;
        listening = false;
        if (err) reject(err);
        else resolve(result);
      };
      rec.continuous = false;
      rec.interimResults = false;
      rec.onresult = (e) => finish(e.results[0][0].transcript);
      rec.onerror = (e) => finish(null, e.error || "error");
      rec.onend = () => {
        if (!done) finish("");
      };
      try {
        rec.start();
      } catch (e) {
        finish(null, e);
      }
    });
  }

  function bindHoldButton(btn, { onStart, onEnd, onResult, onError }) {
    const start = async (e) => {
      e.preventDefault();
      btn.classList.add("recording");
      onStart?.();
      try {
        const text = await listenOnce();
        onResult?.(text);
      } catch (err) {
        if (err?.message === "NO_SR") onError?.("not-supported");
        else onError?.(err);
      } finally {
        btn.classList.remove("recording");
        onEnd?.();
      }
    };
    btn.addEventListener("touchstart", start, { passive: false });
    btn.addEventListener("mousedown", (e) => {
      if (e.button === 0) start(e);
    });
  }

  return {
    speakJa,
    speak,
    prepareJaTtsLine,
    ttsCacheKey,
    warmPhrase,
    warmPhrases,
    listenOnce,
    startHoldListen,
    stopHoldListen,
    scorePronunciation,
    evaluatePronunciation,
    evaluateDialogueDetailed,
    extractKeywordsFromJapanese,
    renderDialogueScoreHtml,
    analyzeAudioBlob,
    normalizeJa,
    bindHoldButton,
    getRecognition,
    pickJapaneseVoice,
    unlockAudioOnce,
    isWeChatBrowser,
    stopAllPlayback,
    setLoadingListener,
  };
})();
