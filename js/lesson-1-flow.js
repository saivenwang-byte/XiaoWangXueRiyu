/**
 * 第1課 · 课内五关（単語/会話/文法/作業/拡張）— 截图定稿交互
 * 仅 lessonId === 1 时由 app.js 调用
 */
const Lesson1Flow = (function () {
  const LESSON_ID = 1;

  const COCKPIT_TABS = [
    { k: 0, label: "単語", sub: "フラッシュ" },
    { k: 2, label: "会話", sub: "多场景" },
    { k: 1, label: "文法", sub: "ネット" },
    { k: 3, label: "作業", sub: "練習" },
    { k: 4, label: "拡張", sub: "まとめ" },
  ];

  function isLesson(lessonId) {
    return Number(lessonId) === LESSON_ID;
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function showZh(state) {
    return state?.showChineseZh !== false;
  }

  function renderLines(lines, showChinese) {
    return (lines || [])
      .map((ln) => {
        const s = String(ln || "").trim();
        if (!s) return "";
        const hasKana = /[\u3040-\u309f\u30a0-\u30ff]/.test(s);
        if (hasKana) return `<li class="l1-prose-line jp">${escapeHtml(s)}</li>`;
        if (!showChinese) return "";
        if (/\t/.test(s) && !hasKana) {
          const cells = s.split(/\t+/).map((c) => c.trim()).filter(Boolean);
          if (cells.length >= 2) {
            return `<li class="l1-prose-line l1-prose-tab zh-annotation">${cells
              .map((c) => `<span>${escapeHtml(c)}</span>`)
              .join("")}</li>`;
          }
        }
        const wrong = /^[×✕]/.test(s);
        const right = /^[○◯]/.test(s);
        const quiz = /^Q\d/.test(s);
        const ans = /^→/.test(s);
        const body = wrong || right ? s.replace(/^[×✕○◯]\s*/, "") : s;
        const extra = [
          "l1-prose-line",
          "zh-annotation",
          wrong ? "l1-prose-wrong" : "",
          right ? "l1-prose-right" : "",
          quiz ? "l1-prose-quiz" : "",
          ans ? "l1-prose-ans" : "",
        ]
          .filter(Boolean)
          .join(" ");
        const mark = wrong ? '<span class="l1-prose-mark" aria-hidden="true">×</span>' : right ? '<span class="l1-prose-mark" aria-hidden="true">○</span>' : "";
        if (wrong || right) {
          return `<li class="${extra}">${mark}<span class="l1-prose-text">${escapeHtml(body)}</span></li>`;
        }
        return `<li class="${extra}">${escapeHtml(s)}</li>`;
      })
      .filter(Boolean)
      .join("");
  }

  function stripEmojiTitle(title) {
    return (title || "").replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\u2600-\u27BF]+\s*/u, "").trim();
  }

  /** 五关递进：単語 → 会話 → 文法 → 作業 → 拡張 → 本单元 */
  const L1_CHAIN_STEPS = [
    { gate: 0, label: "単語", chainLabel: "单词" },
    { gate: 2, label: "会話", chainLabel: "会话" },
    { gate: 1, label: "文法", chainLabel: "文法" },
    { gate: 3, label: "作業", chainLabel: "作业" },
    { gate: 4, label: "拡張", chainLabel: "扩展" },
  ];

  const L1_CHAIN_META = {
    0: { done: "単語完了", next: "会話", hint: "读完单词表后，进入会話多场景。" },
    2: { done: "会話完了", next: "文法", hint: "每句展开听完后再进入文法网络。" },
    1: { done: "文法完了", next: "作業", hint: "四条文型都展开阅读后，做作业练习。" },
    3: { done: "作業完了", next: "拡張", hint: "题型练完点底部，进入まとめ与拡張。" },
    4: { done: "第1课完了", next: "本单元", hint: "本课五关已走完，返回单元继续下一课。" },
  };

  function chainButtonLabel(activeGate, opts = {}) {
    const meta = L1_CHAIN_META[activeGate] || L1_CHAIN_META[0];
    const done = Number(opts.done) || 0;
    const total = Number(opts.total) || 0;
    const ready = opts.ready === true || (total > 0 && done >= total);
    if (ready) return `${meta.done} → ${meta.next}`;
    if (total > 0) return `${meta.done}（${done}/${total}）`;
    return `${meta.done} → ${meta.next}`;
  }

  function chainRailHtml(activeGate, opts = {}) {
    const navigable = opts.navigable !== false;
    return L1_CHAIN_STEPS.map((s, i) => {
      const cur = s.gate === activeGate;
      const curCls = cur ? " is-current" : "";
      const arrow = i ? `<span class="l1-chain-arrow" aria-hidden="true">→</span>` : "";
      const inner = escapeHtml(s.chainLabel || s.label);
      if (navigable) {
        const curAttr = cur ? ' aria-current="step"' : "";
        return `${arrow}<button type="button" class="l1-chain-node${curCls}" data-l1-gate="${s.gate}"${curAttr}>${inner}</button>`;
      }
      return `${arrow}<span class="l1-chain-node${curCls}">${inner}</span>`;
    }).join("");
  }

  function chainFooterHtml(activeGate, opts = {}) {
    const meta = L1_CHAIN_META[activeGate] || L1_CHAIN_META[0];
    const btnId = opts.btnId || "l1-chain-done";
    const readyBtn = opts.ready === true;
    const dis = opts.disabled !== undefined ? !!opts.disabled : !readyBtn;
    const btnText =
      opts.buttonLabel ||
      chainButtonLabel(activeGate, {
        done: opts.done,
        total: opts.total,
        ready: opts.ready,
      });
    return `
      <footer class="l1-chain-footer gn-footer" data-l1-chain-gate="${activeGate}">
        <nav class="l1-chain-rail" aria-label="本课学习路径">${chainRailHtml(activeGate, opts)}</nav>
        <p class="l1-chain-hint hint-ja">${escapeHtml(opts.hint || meta.hint)}</p>
        <button type="button" class="btn primary l1-chain-btn" id="${escapeHtml(btnId)}"${dis ? " disabled" : ""}>${escapeHtml(btnText)}</button>
      </footer>`;
  }

  function updateChainFooterButton(btn, activeGate, opts = {}) {
    if (!btn) return;
    const ready = opts.ready === true;
    const done = Number(opts.done) || 0;
    const total = Number(opts.total) || 0;
    btn.textContent = chainButtonLabel(activeGate, { done, total, ready });
    btn.disabled = !ready && opts.forceEnabled !== true;
    if (opts.forceEnabled === true) btn.disabled = false;
  }

  function bindChainFooter(root, activeGate, callbacks = {}) {
    if (!root) return;
    const footer = root.querySelector(".l1-chain-footer") || root;
    footer.querySelectorAll("[data-l1-gate]").forEach((node) => {
      if (node.dataset.l1ChainBound === "1") return;
      node.dataset.l1ChainBound = "1";
      node.addEventListener("click", () => {
        const g = Number(node.dataset.l1Gate);
        if (Number.isNaN(g) || g === activeGate) return;
        callbacks.switchGate?.(g);
      });
    });
  }

  function vocabSeenCount(state, list) {
    const seen = state?.flashProgress?.[LESSON_ID]?.seen || [];
    return list.filter((v) => seen.includes(v.id)).length;
  }

  function l1GatePanelHtml(bodyHtml, activeGate, footerOpts = {}) {
    return `
      <div class="l1-gate-panel l1-lesson-scope" data-l1-active-gate="${activeGate}">
        ${bodyHtml}
        ${chainFooterHtml(activeGate, footerOpts)}
      </div>`;
  }

  /** 手风琴：同时只展开一条（与作業/拡張 gw-group 一致） */
  function bindSingleOpenAccordion(root, onOpen) {
    if (!root) return;
    const folds = root.querySelectorAll(
      ".gw-group, .l1-scene-fold, .l1-grammar-fold, .dg-scene-fold, .gn-node-fold"
    );
    folds.forEach((det) => {
      if (det.dataset.l1AccordionBound === "1") return;
      det.dataset.l1AccordionBound = "1";
      det.addEventListener("toggle", () => {
        if (!det.open) return;
        folds.forEach((other) => {
          if (other !== det) other.open = false;
        });
        if (typeof onOpen === "function") onOpen(det);
      });
    });
  }

  function bindGwGroups(root, callbacks) {
    bindSingleOpenAccordion(root);
    if (typeof L1KnowledgeCard !== "undefined") L1KnowledgeCard.bind(root, callbacks);
    if (typeof SenseiTipCard !== "undefined") SenseiTipCard.bind(root);
  }

  function kcardHtml(tip, anchorId) {
    if (!tip || typeof L1KnowledgeCard === "undefined") return "";
    return L1KnowledgeCard.html(tip, anchorId, LESSON_ID);
  }

  function gwGroupHtml({ icon, title, body, tip, attrs = "", seq }) {
    const card =
      typeof tip === "object" && tip?.lines
        ? kcardHtml(tip, tip._anchor)
        : tip
          ? kcardHtml({ lines: [{ zh: String(tip) }] })
          : "";
    const head =
      typeof seq === "number"
        ? `<span class="l1-seq-num" aria-hidden="true">${seq}</span><span class="gw-group-title-text">${icon ? `${icon} ` : ""}${escapeHtml(title)}</span>`
        : `<span class="gw-group-title-text">${icon ? `${icon} ` : ""}${escapeHtml(title)}</span>`;
    return `
      <details class="gw-group l1-gw-group" ${attrs}>
        <summary class="gw-group-summary">${head}</summary>
        <div class="gw-group-body">
          ${body}
          ${card}
        </div>
      </details>`;
  }

  /** @deprecated 第1課五关统一用 l1GatePanelHtml + chainFooter，不再用 h2 顶栏 */
  function l1Shell({ body, activeGate, footerId, footerDisabled, footerLabel, footerHint, done, total, ready }) {
    return l1GatePanelHtml(body, activeGate, {
      btnId: footerId,
      disabled: footerDisabled,
      buttonLabel: footerLabel,
      hint: footerHint,
      done,
      total,
      ready,
    });
  }

  function mountVocab(mountEl, state, callbacks) {
    const L = getLessonMvp(LESSON_ID);
    const list =
      typeof getLessonPrdVocab === "function"
        ? getLessonPrdVocab(LESSON_ID)
        : (typeof getLessonVocab === "function" ? getLessonVocab(LESSON_ID) : []).filter(
            (v) => v.from === "text"
          );
    if (!list.length) {
      mountEl.innerHTML = `<p class="hint-ja">単語リストは準備中です。</p>`;
      return;
    }

    const speakPayload = (v) => ({
      jp: v.jp,
      kana:
        v.ruby?.length && typeof RubyRender !== "undefined"
          ? RubyRender.toKanaReading(v.jp, v.ruby)
          : v.kana || v.jp,
      ruby: v.ruby,
    });

    const normKana = (s) => (s || "").trim().replace(/〜/g, "～");

    const wordRows = list
      .map((v, i) => {
        const colKana = normKana(v.kana || "");
        const colWord = normKana(v.jp || "");
        const colPitch = (v.pitch || "").trim();
        const colZh = showZh(state) && v.meaningZh ? v.meaningZh : "";
        const payload = speakPayload(v);
        const actions =
          typeof ShadowSpeak !== "undefined"
            ? ShadowSpeak.rowHtml(payload, `l1-vf-${v.id}`, `data-vocab-id="${escapeHtml(v.id)}"`)
            : typeof SpeakUI !== "undefined"
              ? SpeakUI.btnHtml(payload, `data-vocab-id="${escapeHtml(v.id)}"`)
              : "";
        const cell = (cls, text, extra = "") =>
          `<span class="${cls} ${extra}">${text ? escapeHtml(text) : ""}</span>`;
        const tip =
          typeof L1KnowledgeTips !== "undefined" ? L1KnowledgeTips.vocab(v) : null;
        const kcard = kcardHtml(tip, v.id);
        return `
        <li class="l1-vocab-grid-row" data-idx="${i}" data-vocab-id="${escapeHtml(v.id || "")}">
          <span class="l1-seq-num l1-vocab-seq" aria-label="第${i + 1}项">${i + 1}</span>
          ${cell("l1-col-jp jp", colWord)}
          ${cell("l1-col-kana jp", colKana)}
          ${cell("l1-col-pitch", colPitch)}
          ${cell("l1-col-zh zh-annotation", colZh)}
          <span class="l1-col-act">${actions}</span>
        </li>
        ${kcard ? `<li class="l1-vocab-kcard-row">${kcard}</li>` : ""}`;
      })
      .join("");

    const showZhCol = showZh(state);
    const total = list.length;
    const seen0 = vocabSeenCount(state, list);
    const vocabReady = seen0 >= total && total > 0;

    mountEl.innerHTML = l1GatePanelHtml(
      `<div class="l1-vocab-flat-wrap l1-scroll-panel${showZhCol ? "" : " l1-vocab-no-zh"}"><ul class="l1-vocab-grid l1-vocab-grid--no-head" role="list">
          ${wordRows}
        </ul></div>`,
      0,
      {
        btnId: "l1-vocab-done",
        done: seen0,
        total,
        ready: vocabReady,
        disabled: !vocabReady,
      }
    );

    const vocabPanel = mountEl.querySelector(".l1-gate-panel") || mountEl;
    const updateVocabFooter = () => {
      const seen = vocabSeenCount(state, list);
      const ready = seen >= total && total > 0;
      updateChainFooterButton(vocabPanel.querySelector("#l1-vocab-done"), 0, {
        done: seen,
        total,
        ready,
      });
    };

    mountEl.querySelector("#l1-vocab-done")?.addEventListener("click", () => {
      if (vocabSeenCount(state, list) < total) return;
      setGateDone(state, LESSON_ID, 0);
      saveMvpState(state);
      callbacks.switchGate?.(2);
    });

    mountEl.querySelectorAll("[data-vocab-id]").forEach((el) => {
      el.addEventListener("click", () => {
        const vid = el.getAttribute("data-vocab-id");
        if (vid && typeof markFlashSeen === "function") markFlashSeen(state, LESSON_ID, vid);
        updateVocabFooter();
      });
    });

    if (typeof ShadowSpeak !== "undefined") ShadowSpeak.bind(mountEl);
    else if (typeof SpeakUI !== "undefined") SpeakUI.bind(mountEl);
    bindChainFooter(vocabPanel, 0, callbacks);
    bindGwGroups(mountEl, callbacks);
    if (typeof L1KnowledgeCard !== "undefined") L1KnowledgeCard.bind(mountEl, callbacks);
    updateVocabFooter();
    if (typeof SpeechEngine !== "undefined" && SpeechEngine.warmPhrases) {
      const lines = list.map((v) => speakPayload(v));
      SpeechEngine.warmPhrases(lines);
    }
  }

  /** 日→中 + 中→日 两栏合并为一栏「翻訳問題」 */
  function mergeTranslationHomeworkSections(sections) {
    const out = [];
    for (let i = 0; i < sections.length; i++) {
      const cur = sections[i];
      const title = cur.title || "";
      const next = sections[i + 1];
      const isJa2Zh = /翻訳.*日\s*[→↔]\s*中/.test(title);
      const nextTitle = next?.title || "";
      const isZh2Ja = next && /翻訳.*中\s*[→↔]\s*日/.test(nextTitle);
      if (isJa2Zh && isZh2Ja) {
        out.push({
          title: "翻訳問題（日→中・中→日）",
          lines: ["【日→中】", ...(cur.lines || []), "【中→日】", ...(next.lines || [])],
        });
        i += 1;
        continue;
      }
      out.push(cur);
    }
    return out;
  }

  function mountHomework(mountEl, state, callbacks) {
    const L = getLessonMvp(LESSON_ID);
    let sections = (L?.homeworkSections || []).filter((s) => {
      const t = (s.lines || []).join(" ");
      return t.trim() && !/^（本课无/.test(t.trim());
    });
    sections = mergeTranslationHomeworkSections(sections);
    const show = showZh(state);
    const quizCount = (L?.quizQuestions || []).length;

    const HW_TIPS = {
      発音: "朗读时注意助词「は」读「わ」、长音与促音。",
      活用: "本课无动词活用时可跳过；后续课会逐课出现。",
      選択: "选择题先读日文题干，再在脑中用「は」提示词。",
      穴埋め: "填空题注意「です／ではありません」的敬体形式。",
      翻訳: "日译中、中译日都要对照课本句型，不要按中文语序硬写。",
      間違い: "改错题常考「さん」自称、缺少「です」等细节。",
      作文: "自我介绍建议含：寒暄、姓名、国籍/身份、礼貌结束。",
      聴解: "听力题需配合音频；暂无音频时可先看参考答案。",
      小テスト: "交互测验计入进度；可反复练习直到全对。",
    };

    function tipForTitle(title) {
      if (typeof L1KnowledgeTips !== "undefined") return L1KnowledgeTips.homeworkTitle(title);
      const key = Object.keys(HW_TIPS).find((k) => title.includes(k));
      return key ? { lines: [{ zh: HW_TIPS[key] }] } : { lines: [{ zh: "对照课本与文法栏，逐条完成本类练习。" }] };
    }

    const HW_ICONS = {
      発音: "🔊",
      活用: "🔄",
      選択: "✅",
      穴埋め: "✏️",
      翻訳: "🌐",
      間違い: "🔍",
      作文: "📝",
      聴解: "👂",
    };

    function iconForTitle(title) {
      const key = Object.keys(HW_ICONS).find((k) => title.includes(k));
      return key ? HW_ICONS[key] : "📋";
    }

    let hwSeq = 0;
    const folds = sections
      .map((s) => {
        const inner = renderLines(s.lines, show);
        if (!inner) return "";
        const title = stripEmojiTitle(
          (s.title || "作業").replace(/（日→中・中→日）/g, "").replace(/（[^）]+）/g, "").trim()
        );
        hwSeq += 1;
        return gwGroupHtml({
          seq: hwSeq,
          icon: iconForTitle(title),
          title,
          body: `<ul class="l1-prose-list">${inner}</ul>`,
          tip: tipForTitle(title),
        });
      })
      .filter(Boolean)
      .join("");

    const quizBlock = quizCount
      ? gwGroupHtml({
          seq: hwSeq + 1,
          icon: "🎯",
          title: "小テスト（交互）",
          body: `<div id="l1-hw-quiz"></div>`,
          tip: tipForTitle("小テスト"),
        })
      : "";

    const hwTotal = sections.length + (quizCount ? 1 : 0);
    const hwBody =
      folds || quizBlock
        ? `<div class="l1-hw-folds">${folds}${quizBlock}</div>`
        : `<p class="hint-ja">作業データがありません。</p>`;

    mountEl.innerHTML = l1GatePanelHtml(hwBody, 3, {
      btnId: "l1-hw-done",
      done: 0,
      total: hwTotal || 1,
      ready: hwTotal === 0,
      disabled: hwTotal > 0,
    });

    const hwPanel = mountEl.querySelector(".l1-gate-panel") || mountEl;
    const hwOpened = {};
    const updateHwFooter = () => {
      const done = Object.keys(hwOpened).length;
      const ready = hwTotal === 0 || done >= hwTotal;
      updateChainFooterButton(hwPanel.querySelector("#l1-hw-done"), 3, {
        done,
        total: hwTotal || 1,
        ready,
      });
    };
    hwPanel.querySelectorAll(".gw-group").forEach((det, i) => {
      det.addEventListener("toggle", () => {
        if (det.open) hwOpened[i] = true;
        updateHwFooter();
      });
    });
    bindChainFooter(hwPanel, 3, callbacks);
    updateHwFooter();

    const quizDetails = mountEl.querySelector("#l1-hw-quiz")?.closest("details");
    const mountQuiz = () => {
      const slot = mountEl.querySelector("#l1-hw-quiz");
      if (!slot || slot.dataset.mounted === "1") return;
      slot.dataset.mounted = "1";
      if (typeof QuizGate !== "undefined") {
        QuizGate.mount(slot, LESSON_ID, {
          state,
          onComplete: () => {
            setGateDone(state, LESSON_ID, 3);
            saveMvpState(state);
            callbacks.onRefreshCockpit?.();
          },
        });
      }
    };
    if (quizDetails?.open) mountQuiz();
    quizDetails?.addEventListener("toggle", () => {
      if (quizDetails.open) mountQuiz();
    });

    mountEl.querySelector("#l1-hw-done")?.addEventListener("click", () => {
      if (hwTotal > 0 && Object.keys(hwOpened).length < hwTotal) return;
      setGateDone(state, LESSON_ID, 3);
      saveMvpState(state);
      callbacks.switchGate?.(4);
    });
    bindGwGroups(mountEl, callbacks);
  }

  function mountExtension(mountEl, state, callbacks) {
    const L = getLessonMvp(LESSON_ID);
    const blocks = L?.summaryBlocks || [];
    const reviewExt = L?.reviewExtension || [];
    const keyPoints = L?.dialogueKeyPoints || [];
    const rolePlay = L?.rolePlayTasks || [];
    const show = showZh(state);

    const renderLn = (lines) => renderLines(lines, show);

    const groups = [];
    const pron = blocks.find((b) => b.key === "pronunciation");
    if (pron) {
      groups.push({
        icon: "🔊",
        title: "発音ポイント",
        body: `<ul class="l1-prose-list">${renderLn(pron.lines)}</ul>`,
        tip:
          typeof L1KnowledgeTips !== "undefined"
            ? L1KnowledgeTips.extensionKey("pronunciation")
            : { lines: [{ zh: "注意助词「は」读「わ」、长音拉长一拍、促音停顿等。" }] },
      });
    }
    const grammarNodes = L?.grammarNodes || [];
    if (grammarNodes.length) {
      const glines = grammarNodes
        .map((n) => `${n.title}：${n.explanationZh || n.titleZh || ""}`)
        .filter((l) => l.length > 3);
      groups.push({
        icon: "📖",
        title: "文法まとめ",
        body: `<ul class="l1-prose-list">${renderLn(glines)}</ul>`,
        tip:
          typeof L1KnowledgeTips !== "undefined"
            ? L1KnowledgeTips.extensionKey("grammar")
            : { lines: [{ zh: "以上为本课全部语法节点，建议逐条对照例句复习。" }] },
      });
    }
    const preview = blocks.find((b) => b.key === "preview");
    if (preview && !/本课无/.test((preview.lines || []).join(""))) {
      groups.push({
        icon: "🔮",
        title: "活用予告",
        body: `<ul class="l1-prose-list">${renderLn(preview.lines)}</ul>`,
        tip:
          typeof L1KnowledgeTips !== "undefined"
            ? L1KnowledgeTips.extensionKey("preview")
            : { lines: [{ zh: "提前了解后续课程的活用变化，心中有数。" }] },
      });
    }
    const honor = blocks.find((b) => b.key === "honorific");
    if (honor) {
      groups.push({
        icon: "🎩",
        title: "敬語レベル表示",
        body: `<ul class="l1-prose-list">${renderLn(honor.lines)}</ul>`,
        tip:
          typeof L1KnowledgeTips !== "undefined"
            ? L1KnowledgeTips.extensionKey("honorific")
            : { lines: [{ zh: "掌握敬体与简体的使用场景，避免失礼。" }] },
      });
    }
    const etym = blocks.find((b) => b.key === "etymology");
    if (etym) {
      groups.push({
        icon: "📜",
        title: "語源メモ",
        body: `<ul class="l1-prose-list">${renderLn(etym.lines)}</ul>`,
        tip:
          typeof L1KnowledgeTips !== "undefined"
            ? L1KnowledgeTips.extensionKey("etymology")
            : { lines: [{ zh: "了解词语来源有助于记忆。" }] },
      });
    }
    if (keyPoints.length) {
      groups.push({
        icon: "💬",
        title: "会話のキーポイント",
        body: `<ul class="l1-prose-list">${renderLn(keyPoints)}</ul>`,
        tip:
          typeof L1KnowledgeTips !== "undefined"
            ? L1KnowledgeTips.extensionKey("keyPoints")
            : { lines: [{ zh: "朗读对话时留意这些要点，模仿语调。" }] },
      });
    }
    if (rolePlay.length) {
      groups.push({
        icon: "🎭",
        title: "ロールプレイ課題",
        body: `<ul class="l1-prose-list">${renderLn(rolePlay)}</ul>`,
        tip:
          typeof L1KnowledgeTips !== "undefined"
            ? L1KnowledgeTips.extensionKey("rolePlay")
            : { lines: [{ zh: "找伙伴练习，或自己扮演两个角色轮流说。" }] },
      });
    }
    reviewExt.forEach((sec, si) => {
      groups.push({
        icon: "📌",
        title: stripEmojiTitle(sec.title || `まとめ ${si + 1}`),
        body: `<ul class="l1-prose-list">${renderLn(sec.lines)}</ul>`,
        tip:
          typeof L1KnowledgeTips !== "undefined"
            ? L1KnowledgeTips.extensionKey(null, sec.title)
            : { lines: [{ zh: "回顾本课核心内容，建立与前后课程的联系。" }] },
      });
    });
    if (L?.basicText?.length) {
      groups.push({
        icon: "📄",
        title: "基本课文（4句型）",
        body: `<ul class="l1-prose-list">${renderLn(L.basicText)}</ul>`,
        tip:
          typeof L1KnowledgeTips !== "undefined"
            ? L1KnowledgeTips.extensionKey("basicText")
            : { lines: [{ zh: "课本4个核心句型，务必朗读并记忆。" }] },
      });
    }

    const groupsHtml = groups
      .map((g, i) =>
        gwGroupHtml({ seq: i + 1, icon: g.icon, title: g.title, body: g.body, tip: g.tip })
      )
      .join("");

    const extTotal = groups.length;
    mountEl.innerHTML = l1GatePanelHtml(
      `<div class="l1-ext-folds">${groupsHtml || `<p class="hint-ja">まとめデータがありません。</p>`}</div>`,
      4,
      {
        btnId: "l1-sum-done",
        done: 0,
        total: extTotal || 1,
        ready: extTotal === 0,
        disabled: extTotal > 0,
      }
    );

    const extPanel = mountEl.querySelector(".l1-gate-panel") || mountEl;
    const extOpened = {};
    const updateExtFooter = () => {
      const done = Object.keys(extOpened).length;
      const ready = extTotal === 0 || done >= extTotal;
      updateChainFooterButton(extPanel.querySelector("#l1-sum-done"), 4, {
        done,
        total: extTotal || 1,
        ready,
      });
    };
    extPanel.querySelectorAll(".gw-group").forEach((det, i) => {
      det.addEventListener("toggle", () => {
        if (det.open) extOpened[i] = true;
        updateExtFooter();
      });
    });
    bindChainFooter(extPanel, 4, callbacks);
    updateExtFooter();

    mountEl.querySelector("#l1-sum-done")?.addEventListener("click", () => {
      if (extTotal > 0 && Object.keys(extOpened).length < extTotal) return;
      setGateDone(state, LESSON_ID, 4);
      saveMvpState(state);
      callbacks.onCompleteHome?.();
    });
    bindGwGroups(mountEl, callbacks);
    if (typeof L1KnowledgeCard !== "undefined") L1KnowledgeCard.bind(mountEl, callbacks);
  }

  function flowHeadHtml(L, activeGate, state) {
    const themeZh =
      showZh(state) && L.themeZh
        ? `<span class="zh-annotation">（${escapeHtml(L.themeZh)}）</span>`
        : "";
    const titleSpeakPayload = {
      jp: L.lessonTitle,
      kana:
        L.lessonTitleRuby && typeof RubyRender !== "undefined"
          ? RubyRender.toKanaReading(L.lessonTitle, L.lessonTitleRuby)
          : L.lessonTitle,
      ruby: L.lessonTitleRuby,
    };
    const titleRow =
      typeof RubyRender !== "undefined" && L.lessonTitleRuby
        ? RubyRender.fromSegments(L.lessonTitle, L.lessonTitleRuby)
        : escapeHtml(L.lessonTitle);

    /* 第1課五关：顶栏说明取消，改由底部传送链提示 */
    if (activeGate === 0 || activeGate === 1 || activeGate === 2 || activeGate === 3 || activeGate === 4) {
      return "";
    }
    return "";
  }

  return {
    LESSON_ID,
    isLesson,
    COCKPIT_TABS,
    L1_CHAIN_STEPS,
    mountVocab,
    mountHomework,
    mountExtension,
    flowHeadHtml,
    l1Shell,
    gwGroupHtml,
    chainFooterHtml,
    chainButtonLabel,
    chainRailHtml,
    updateChainFooterButton,
    bindChainFooter,
    l1GatePanelHtml,
    bindSingleOpenAccordion,
  };
})();
