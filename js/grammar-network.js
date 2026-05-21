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

  function titleHtml(node) {
    const ruby =
      node.titleRuby && RubyRender.fromSegments
        ? RubyRender.fromSegments(node.title, node.titleRuby)
        : escapeHtml(node.title);
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

  function renderDepthHtml(sections) {
    if (!sections?.length) return "";
    return sections
      .map((sec) => {
        let body = "";
        (sec.blocks || []).forEach((b) => {
          if (b.type === "text") body += `<p>${escapeHtml(b.text)}</p>`;
          if (b.type === "pair")
            body += `<div class="gn-pair"><p class="bad">❌ ${escapeHtml(b.bad)}</p><p class="good">✅ ${escapeHtml(b.good)}</p></div>`;
          if (b.type === "list")
            body += `<ul>${b.items.map((it) => `<li>${escapeHtml(it)}</li>`).join("")}</ul>`;
          if (b.type === "table" && b.rows)
            body += `<div class="gn-table">${b.rows
              .map(
                (r) =>
                  `<div class="gn-table-row"><span>${escapeHtml(r[0])}</span><span>${escapeHtml(r[1])}</span></div>`
              )
              .join("")}</div>`;
        });
        return `<section class="gn-depth-sec"><h4>${escapeHtml(sec.heading)}</h4>${body}</section>`;
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
    const depthBtn = node.depthSections?.length
      ? `<button type="button" class="btn secondary btn-sm" id="gn-depth">📖 先生の補足</button>`
      : "";
    container.innerHTML = `
      <div class="gn-wrap">
        <p class="gn-progress">${progressLabel}${node.core ? " · ★コア" : ""}</p>
        <div class="gn-card ${flipped ? "flipped" : ""}" id="gn-flip">
          <div class="gn-face gn-front">
            <div class="gn-title-row">
              <h3>${titleHtml(node)}</h3>
              ${typeof SpeakUI !== "undefined" ? SpeakUI.btnHtml({ jp: node.title, ruby: node.titleRuby, titleRuby: node.titleRuby }, 'id="gn-speak-title" title="文型名のみ"') : `<button type="button" class="btn-speak-icon" id="gn-speak-title" data-jp="${escapeHtml(node.title)}">🔊</button>`}
            </div>
            <p class="gn-hint">タップでくわしく · 小喇叭＝朗读（优先本机/缓存）</p>
          </div>
          <div class="gn-face gn-back">
            <p class="gn-explain">${escapeHtml(node.explanation)}</p>
            <p class="gn-example jp">${RubyRender.nodeExample(node)}</p>
            <div class="gn-ext-wrap">${RubyRender.extensionsHtml(node.extensions)}</div>
            <div class="gn-speak-row">
              ${typeof SpeakUI !== "undefined" ? SpeakUI.btnHtml({ jp: node.example, ruby: node.exampleRuby }, 'id="gn-speak-example" class="btn-sm-inline"') : `<button type="button" class="btn-speak-icon" id="gn-speak-example" data-jp="${escapeHtml(node.example)}">🔊</button>`}
              <span class="hint-ja btn-sm-hint">例文</span>
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
        showModal(
          `<h3>${titleHtml(node)}</h3><p class="mini-label">先生の補足 · 教科書の外</p>${renderDepthHtml(node.depthSections)}`
        );
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
      }
    };
    container.querySelector("#gn-next").onclick = () => {
      if (cardIndex < total - 1) {
        cardIndex++;
        flipped = false;
        render();
      } else {
        setGateDone(state, lesson.lessonId, 1);
        onGateComplete?.();
      }
    };
    if (typeof SpeakUI !== "undefined") SpeakUI.bind(container);
  }

  function showModal(html, onReady) {
    const modal = lessonModalEl();
    modal.innerHTML = `<div class="gn-modal-inner">${html}<button type="button" class="btn ghost gn-close">閉じる</button></div>`;
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
