const GrammarNetwork = (() => {
  let lesson = null;
  let cardIndex = 0;
  let flipped = false;
  let onGateComplete = null;
  let container = null;
  let state = null;

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function showZh() {
    return state?.showChineseZh !== false;
  }

  function speakJp(textOrNode) {
    if (typeof SpeechEngine === "undefined") return;
    const src =
      textOrNode && typeof textOrNode === "object"
        ? {
            title: textOrNode.title,
            japanese: textOrNode.japanese,
            jp: textOrNode.jp,
            example: textOrNode.example,
            explain: textOrNode.explain,
          }
        : textOrNode;
    SpeechEngine.speakJa(src);
  }

  function titleSpeakPayload(node) {
    const speakJp = node.titleSpeak || node.title;
    const kana =
      node.titleKana ||
      (node.titleRuby && typeof RubyRender !== "undefined"
        ? RubyRender.toKanaReading(speakJp, node.titleRuby)
        : speakJp.replace(/（[^）]+）/g, "").replace(/〜/g, "").trim() || "なる");
    return { jp: speakJp, kana, ruby: node.titleRuby };
  }

  function exampleSpeakPayload(node) {
    const parts = (node.example || "").split(/[/／]/).map((s) => s.trim()).filter(Boolean);
    const first = parts[0] || node.example;
    const kana =
      typeof RubyRender !== "undefined" && node.exampleRuby
        ? RubyRender.toKanaReading(first, node.exampleRuby)
        : first;
    return { jp: first, kana, ruby: node.exampleRuby, example: node.example };
  }

  function warmNodePhrases(node) {
    if (typeof SpeechEngine === "undefined" || !SpeechEngine.warmPhrases) return;
    const lines = [titleSpeakPayload(node)];
    (node.example || "")
      .split(/[/／]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((part) => {
        lines.push({
          jp: part,
          kana:
            typeof RubyRender !== "undefined" && node.exampleRuby
              ? RubyRender.toKanaReading(part, node.exampleRuby)
              : part,
          ruby: node.exampleRuby,
        });
      });
    if (node.explanation) lines.push({ jp: node.explanation });
    SpeechEngine.warmPhrases(lines);
  }

  function heroRow(node) {
    const speak =
      typeof SpeakUI !== "undefined"
        ? SpeakUI.btnHtml(titleSpeakPayload(node), 'class="gn-hero-speak" title="听文型名"')
        : "";
    return `<div class="gn-hero-row">
      <div class="gn-hero-text">
        <h3 class="gn-hero-title jp">${titleHtml(node, true)}</h3>
      </div>
      ${speak}
    </div>`;
  }

  function explainBlock(node) {
    const zh = node.explanationZh || node.explainZh || (showZh() ? node.titleZh : "");
    let html = `<p class="gn-section-label">日文说明</p>
      <p class="gn-explain-ja jp">${escapeHtml(node.explanation)}</p>`;
    if (showZh() && zh) {
      html += `<p class="gn-section-label gn-label-zh">中文说明 · 怎么用</p>
        <p class="gn-explain-zh zh-annotation">${escapeHtml(zh)}</p>`;
    }
    return html;
  }

  function titleHtml(node, hero = false) {
    const ruby =
      node.titleRuby && RubyRender.fromSegments
        ? RubyRender.fromSegments(node.title, node.titleRuby)
        : escapeHtml(node.title);
    if (hero && node.titleZh && showZh()) {
      return `${ruby}<p class="gn-hero-zh zh-annotation">${escapeHtml(node.titleZh)}</p>`;
    }
    const zh =
      node.titleZh && showZh()
        ? `<span class="zh-annotation title-zh">（${escapeHtml(node.titleZh)}）</span>`
        : "";
    return `${ruby}${zh}`;
  }

  function linkClass(type) {
    return `gn-link gn-link-${type}`;
  }

  function lessonModalEl() {
    let el = document.getElementById("lesson-modal");
    if (!el) {
      el = document.createElement("div");
      el.id = "lesson-modal";
      el.className = "mvp-backdrop";
      el.hidden = true;
      document.getElementById("app")?.appendChild(el);
    }
    return el;
  }

  const NUM_MARKS = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];

  function depthHints() {
    return typeof DEPTH_PARSE_HINTS !== "undefined" ? DEPTH_PARSE_HINTS : {};
  }

  function splitParenZh(raw) {
    const s = (raw || "").trim();
    const m = s.match(/^(.+?)[（(]([^）)]+)[）)]\s*$/);
    if (m && /[\u4e00-\u9fff]/.test(m[2])) {
      return { jp: m[1].trim(), zh: m[2].trim() };
    }
    return { jp: s, zh: "" };
  }

  function jpHtml(text, ruby) {
    if (!text) return "";
    if (ruby?.length && typeof RubyRender !== "undefined") {
      return RubyRender.fromSegments(text, ruby);
    }
    return escapeHtml(text);
  }

  function denseSpeakLine(jp, kana) {
    const pick = (s) => {
      const t = (s || "").trim();
      if (!t) return "";
      if (/→/.test(t)) {
        const tail = t.split(/→/).pop().trim();
        return tail.replace(/。$/, "");
      }
      return t.replace(/。$/, "");
    };
    if (kana) return pick(kana);
    return pick(jp);
  }

  function denseSpeakPayload(jp, kana, ruby) {
    const line = denseSpeakLine(jp, kana);
    const kanaLine =
      kana ||
      (ruby?.length && typeof RubyRender !== "undefined"
        ? RubyRender.toKanaReading(line, ruby)
        : line);
    return { jp: line, kana: kanaLine, ruby };
  }

  function speakMini(jp, kana, ruby) {
    if (typeof SpeakUI === "undefined") return "";
    return SpeakUI.btnHtml(denseSpeakPayload(jp, kana, ruby), 'class="gn-dense-speak" title="听这句"');
  }

  function renderDenseItem(item, index) {
    const num = item.num || NUM_MARKS[index] || `${index + 1}.`;
    const hints = depthHints();
    const hintKey = typeof item === "string" ? item : item.jp || item.line || "";
    const hint = typeof item === "object" && item.ruby ? item : hints[hintKey] || (typeof item === "object" ? item : {});
    const parsed = typeof item === "string" ? splitParenZh(item) : {};
    const jp =
      typeof item === "object" ? item.jp || item.line || "" : parsed.jp || hintKey;
    const zh = item.zh || parsed.zh || hint.zh || "";
    const kana = item.kana || hint.kana || "";
    const ruby = item.ruby || hint.ruby;
    const label = item.label || "";
    const labelHtml = label
      ? `<span class="gn-dense-label">${escapeHtml(label)}</span>`
      : "";
    const kanaHtml = kana
      ? `<p class="gn-dense-kana">${escapeHtml(kana)}</p>`
      : "";
    const zhHtml =
      showZh() && zh ? `<p class="gn-dense-zh zh-annotation">${escapeHtml(zh)}</p>` : "";

    return `<li class="gn-dense-item">
      <span class="gn-dense-num">${escapeHtml(num)}</span>
      <div class="gn-dense-body">
        ${labelHtml}
        <p class="gn-dense-jp jp">${jpHtml(jp, ruby)}</p>
        ${kanaHtml}
        ${zhHtml}
      </div>
      ${speakMini(jp, kana, ruby)}
    </li>`;
  }

  function renderDensePair(bad, good, badZh, goodZh, badRuby, goodRuby) {
    const b = splitParenZh(bad);
    const g = splitParenZh(good);
    return `<div class="gn-dense-pair">
      <div class="gn-dense-pair-row bad">
        <span class="gn-dense-pair-mark">❌</span>
        <div class="gn-dense-body">
          <p class="gn-dense-jp jp">${jpHtml(bad, badRuby)}</p>
          ${showZh() && (badZh || b.zh) ? `<p class="gn-dense-zh zh-annotation">${escapeHtml(badZh || b.zh)}</p>` : ""}
        </div>
        ${speakMini(bad, b.jp, badRuby)}
      </div>
      <div class="gn-dense-pair-row good">
        <span class="gn-dense-pair-mark">✅</span>
        <div class="gn-dense-body">
          <p class="gn-dense-jp jp">${jpHtml(good, goodRuby)}</p>
          ${showZh() && (goodZh || g.zh) ? `<p class="gn-dense-zh zh-annotation">${escapeHtml(goodZh || g.zh)}</p>` : ""}
        </div>
        ${speakMini(good, g.jp, goodRuby)}
      </div>
    </div>`;
  }

  function renderDepthBlock(b) {
    if (!b) return "";
    if (b.type === "text") {
      const p = splitParenZh(b.text);
      return `<p class="gn-depth-text jp">${jpHtml(p.jp, b.ruby)}</p>
        ${showZh() && (b.zh || p.zh) ? `<p class="gn-dense-zh zh-annotation">${escapeHtml(b.zh || p.zh)}</p>` : ""}`;
    }
    if (b.type === "pair") {
      return renderDensePair(b.bad, b.good, b.badZh, b.goodZh, b.badRuby, b.goodRuby);
    }
    if (b.type === "denseList" || b.type === "list") {
      const items = b.items || [];
      return `<ol class="gn-dense-list">${items.map((it, i) => renderDenseItem(it, i)).join("")}</ol>`;
    }
    if (b.type === "table" && b.rows) {
      return `<div class="gn-table gn-table-dense">${b.rows
        .map((r, i) => {
          const zh0 = r[2] || "";
          return `<div class="gn-table-row">
            <span class="gn-dense-num">${NUM_MARKS[i] || i + 1}</span>
            <div class="gn-dense-body">
              <span class="jp">${escapeHtml(r[0])}</span>
              <span class="jp">${escapeHtml(r[1])}</span>
              ${showZh() && zh0 ? `<p class="gn-dense-zh zh-annotation">${escapeHtml(zh0)}</p>` : ""}
            </div>
          </div>`;
        })
        .join("")}</div>`;
    }
    return "";
  }

  function collectDepthWarmLines(sections) {
    const lines = [];
    const hints = depthHints();
    (sections || []).forEach((sec) => {
      (sec.blocks || []).forEach((b) => {
        if (b.type === "denseList" || b.type === "list") {
          (b.items || []).forEach((it) => {
            const jp = typeof it === "object" ? it.jp || it.line || "" : it;
            const kana = typeof it === "object" ? it.kana : hints[it]?.kana;
            const line = denseSpeakLine(jp, kana);
            if (line) lines.push({ jp: line, kana: line });
          });
        }
        if (b.type === "pair") {
          [b.bad, b.good].forEach((t) => {
            const line = denseSpeakLine(t, "");
            if (line) lines.push({ jp: line, kana: line });
          });
        }
      });
    });
    return lines;
  }

  function exampleBlockHtml(node) {
    const parts = (node.example || "").split(/[/／]/).map((s) => s.trim()).filter(Boolean);
    const zhParts = (node.exampleZh || "").split(/[/／]/).map((s) => s.trim());
    if (parts.length <= 1) {
      const speak =
        typeof SpeakUI !== "undefined"
          ? SpeakUI.btnHtml(exampleSpeakPayload(node), 'class="gn-ex-speak-inline" title="听例句"')
          : "";
      return `<div class="gn-example-line">
        <div class="gn-example-line-top">
          <p class="gn-example jp">${RubyRender.nodeExample(node)}</p>
          ${speak}
        </div>
        ${node.exampleZh && showZh() ? `<p class="gn-example-zh zh-annotation">${escapeHtml(node.exampleZh)}</p>` : ""}
      </div>`;
    }
    const marks = ["①", "②", "③"];
    return parts
      .map((part, i) => {
        const zh = zhParts[i] || "";
        const jpHtml =
          node.exampleRuby && RubyRender.fromSegments
            ? RubyRender.fromSegments(part, node.exampleRuby)
            : escapeHtml(part);
        const speak =
          typeof SpeakUI !== "undefined"
            ? SpeakUI.btnHtml(
                {
                  jp: part,
                  kana:
                    typeof RubyRender !== "undefined" && node.exampleRuby
                      ? RubyRender.toKanaReading(part, node.exampleRuby)
                      : part,
                  ruby: node.exampleRuby,
                },
                `class="gn-ex-speak-inline" title="例句${marks[i] || i + 1}"`
              )
            : "";
        return `<div class="gn-example-line">
          <div class="gn-example-line-top">
            <span class="gn-ex-num">${marks[i] || i + 1}</span>
            <p class="gn-example jp">${jpHtml}</p>
            ${speak}
          </div>
          ${zh && showZh() ? `<p class="gn-example-zh zh-annotation">${escapeHtml(zh)}</p>` : ""}
        </div>`;
      })
      .join("");
  }

  function renderDepthHtml(sections) {
    if (!sections?.length) return "";
    return sections
      .map((sec) => {
        const body = (sec.blocks || []).map((b) => renderDepthBlock(b)).join("");
        return `<section class="gn-depth-sec"><h4 class="gn-depth-h">${escapeHtml(sec.heading)}</h4>${body}</section>`;
      })
      .join("");
  }

  function mount(el, lessonId, options) {
    container = el;
    state = options.state;
    onGateComplete = options.onComplete;
    lesson = getLessonMvp(lessonId);
    cardIndex = 0;
    flipped = false;
    render();
    warmNodePhrases(lesson.grammarNodes[0]);
  }

  function currentNode() {
    return lesson.grammarNodes[cardIndex];
  }

  function render() {
    const node = currentNode();
    const total = lesson.grammarNodes.length;
    const required = lesson.grammarNodes.filter((n) => !n.supplement);
    const reqTotal = required.length;
    const reqIdx = required.findIndex((n) => n.id === node.id);
    const progressLabel = node.supplement
      ? `補充カード · ${cardIndex + 1}/${total}`
      : `必学 ${reqIdx >= 0 ? reqIdx + 1 : "?"}/${reqTotal} · 全体 ${cardIndex + 1}/${total}`;
    warmNodePhrases(node);
    if (node.depthSections?.length && typeof SpeechEngine !== "undefined" && SpeechEngine.warmPhrases) {
      SpeechEngine.warmPhrases(collectDepthWarmLines(node.depthSections));
    }
    const depthBtn = node.depthSections?.length
      ? `<button type="button" class="btn secondary btn-sm" id="gn-depth">📖 先生の補足</button>`
      : "";
    container.innerHTML = `
      <div class="gn-wrap gn-compact">
        <p class="gn-progress">${progressLabel}${node.core ? " · ★コア" : ""}</p>
        <div class="gn-card ${flipped ? "flipped" : ""}" id="gn-flip">
          <div class="gn-face gn-front">
            ${heroRow(node)}
            <p class="gn-hint">点卡片翻面 · 有「先生の補足」可看高密度讲解</p>
          </div>
          <div class="gn-face gn-back">
            ${heroRow(node)}
            ${explainBlock(node)}
            <div class="gn-example-block">
              <p class="gn-example-label">例句</p>
              ${exampleBlockHtml(node)}
            </div>
            <div class="gn-ext-wrap">${RubyRender.extensionsHtml(node.extensions)}</div>
            <div class="gn-speak-row gn-speak-row-compact">
              ${depthBtn}
            </div>
          </div>
        </div>
        <div class="gn-links" id="gn-links"></div>
        <div class="gn-tags">${(node.tags || []).map((t) => `<span class="gn-tag">${escapeHtml(t)}</span>`).join("")}</div>
        <div class="gn-nav">
          <button type="button" class="btn secondary" id="gn-prev" ${cardIndex === 0 ? "disabled" : ""}>前へ</button>
          <button type="button" class="btn primary" id="gn-next">${cardIndex >= total - 1 ? "第1関クリア" : "次へ"}</button>
        </div>
      </div>
    `;

    const flip = container.querySelector("#gn-flip");
    flip.onclick = (e) => {
      if (e.target.closest("button")) return;
      flipped = !flipped;
      flip.classList.toggle("flipped", flipped);
    };

    const depthEl = container.querySelector("#gn-depth");
    if (depthEl) {
      depthEl.onclick = (e) => {
        e.stopPropagation();
        if (typeof SpeechEngine !== "undefined" && SpeechEngine.warmPhrases) {
          SpeechEngine.warmPhrases(collectDepthWarmLines(node.depthSections));
        }
        showModal(renderDepthHtml(node.depthSections));
      };
    }

    const linksEl = container.querySelector("#gn-links");
    (node.links || []).forEach((link) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = linkClass(link.type);
      btn.textContent = link.label;
      btn.onclick = () => handleLink(link, node);
      linksEl.appendChild(btn);
    });

    container.querySelector("#gn-prev").onclick = () => {
      if (cardIndex > 0) {
        cardIndex--;
        flipped = false;
        render();
        warmNodePhrases(currentNode());
      }
    };
    container.querySelector("#gn-next").onclick = () => {
      if (cardIndex < total - 1) {
        cardIndex++;
        flipped = false;
        render();
        warmNodePhrases(currentNode());
      } else {
        setGateDone(state, lesson.lessonId, 1);
        onGateComplete?.();
      }
    };
    if (typeof SpeakUI !== "undefined") SpeakUI.bind(container);
  }

  function showModal(html, onReady) {
    const modal = lessonModalEl();
    modal.innerHTML = `<div class="gn-modal-inner gn-depth-modal"><p class="gn-depth-modal-title">📖 先生の補足 · 高密度</p><div class="gn-depth-scroll">${html}</div><button type="button" class="btn ghost gn-close">閉じる</button></div>`;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    modal.style.removeProperty("display");
    modal.style.removeProperty("pointer-events");
    const hideModal = () => {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
      modal.style.display = "none";
      modal.style.pointerEvents = "none";
    };
    modal.querySelector(".gn-close").onclick = hideModal;
    modal.onclick = (e) => {
      if (e.target === modal) hideModal();
    };
    onReady?.(modal);
    if (typeof SpeakUI !== "undefined") SpeakUI.bind(modal);
  }

  function showMiniCard(link) {
    const key =
      typeof miniCardKeyFromLink === "function" ? miniCardKeyFromLink(link) : link.miniCardKey;
    const card = typeof getMiniCard === "function" ? getMiniCard(key) : null;
    if (!card) {
      showModal(
        `<p class="jp">${escapeHtml(link.label)}</p><p class="hint-ja">ミニカード準備中です。</p>`
      );
      return;
    }
    const ex =
      card.exampleRuby && RubyRender.fromSegments
        ? RubyRender.fromSegments(card.example, card.exampleRuby)
        : escapeHtml(card.example);
    const titleRuby =
      card.titleRuby && RubyRender.fromSegments
        ? RubyRender.fromSegments(card.title, card.titleRuby)
        : escapeHtml(card.title);
    showModal(
      `
      <p class="mini-label">ミニカード · 約10秒</p>
      <div class="mini-head">
        <h3 class="jp">${titleRuby}</h3>
        ${typeof SpeakUI !== "undefined" ? SpeakUI.btnHtml(card.title, 'id="mini-speak-title"') : ""}
      </div>
      <p class="gn-explain">${escapeHtml(card.explain)}</p>
      <div class="mini-ex-row">
        <p class="jp">${ex}</p>
        ${typeof SpeakUI !== "undefined" ? SpeakUI.btnHtml(card.example, 'id="mini-speak-ex"') : ""}
      </div>
    `
    );
  }

  function handleLink(link, node) {
    if (link.type === "contrast") {
      openContrast(link, node);
      return;
    }
    if (link.targetNodeId) {
      const target = findNodeAcrossLessons(link.targetNodeId);
      if (target && target.lesson.lessonId === lesson.lessonId) {
        const idx = target.lesson.grammarNodes.findIndex((n) => n.id === link.targetNodeId);
        if (idx >= 0) {
          cardIndex = idx;
          flipped = true;
          render();
          return;
        }
      }
    }
    showMiniCard(link);
  }

  function openContrast(link, node) {
    let preset = null;
    if (link.contrastWith && node.id) {
      const key = [link.contrastWith, node.id].sort().join("+");
      preset = CONTRAST_PRESETS[key];
    }
    if (!preset && link.targetNodeId) {
      const key = [node.id, link.targetNodeId].sort().join("+");
      preset = CONTRAST_PRESETS[key];
    }
    if (preset) {
      const zh = (col) =>
        col.exampleZh && showZh()
          ? `<p class="zh-annotation">${escapeHtml(col.exampleZh)}</p>`
          : "";
      showModal(
        `
        <h3>${escapeHtml(preset.title)}</h3>
        <div class="gn-contrast-grid">
          <div class="gn-contrast-col">
            <h4>${escapeHtml(preset.left.label)}</h4>
            <p><strong>文型</strong> ${escapeHtml(preset.left.pattern)}</p>
            <p class="gn-timeline">${escapeHtml(preset.left.timeline)}</p>
            <p class="jp">${escapeHtml(preset.left.example)}</p>
            ${zh(preset.left)}
            <p class="gn-mistake">${escapeHtml(preset.left.mistake)}</p>
            ${typeof SpeakUI !== "undefined" ? SpeakUI.btnHtml(preset.left.example, 'class="gn-contrast-speak"') : `<button type="button" class="btn-speak-icon gn-contrast-speak" data-jp="${escapeHtml(preset.left.example)}">🔊</button>`}
          </div>
          <div class="gn-contrast-col">
            <h4>${escapeHtml(preset.right.label)}</h4>
            <p><strong>文型</strong> ${escapeHtml(preset.right.pattern)}</p>
            <p class="gn-timeline">${escapeHtml(preset.right.timeline)}</p>
            <p class="jp">${escapeHtml(preset.right.example)}</p>
            ${zh(preset.right)}
            <p class="gn-mistake">${escapeHtml(preset.right.mistake)}</p>
            ${typeof SpeakUI !== "undefined" ? SpeakUI.btnHtml(preset.right.example, 'class="gn-contrast-speak"') : `<button type="button" class="btn-speak-icon gn-contrast-speak" data-jp="${escapeHtml(preset.right.example)}">🔊</button>`}
          </div>
        </div>
      `);
      return;
    }
    if (link.contrastPair) {
      showModal(`
        <h3>⚠️ 比べてみよう</h3>
        <ul class="gn-pair-list">
          ${link.contrastPair.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}
        </ul>
      `);
    }
  }

  return { mount };
})();
