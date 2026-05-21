/** 先生のひとこと — 四关统一的「秘技」阅读小卡片 */
const SenseiTipCard = (() => {
  const TITLE = "先生のひとこと";
  const ICON = "💡";

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function showZh() {
    return document.documentElement.dataset.showZh !== "0";
  }

  /**
   * @param {{ bodyHtml: string, subtitle?: string, expanded?: boolean }} opts
   */
  function wrap(opts) {
    const bodyHtml = opts.bodyHtml || "";
    if (!bodyHtml.trim()) return "";
    const expanded = !!opts.expanded;
    const sub = opts.subtitle ? `<span class="sensei-tip-sub">${escapeHtml(opts.subtitle)}</span>` : "";
    return `<article class="sensei-tip${expanded ? " is-open" : ""}">
      <button type="button" class="sensei-tip-head" aria-expanded="${expanded}">
        <span class="sensei-tip-ico" aria-hidden="true">${ICON}</span>
        <span class="sensei-tip-title">${TITLE}</span>
        ${sub}
        <span class="sensei-tip-chevron" aria-hidden="true"></span>
      </button>
      <div class="sensei-tip-body">${bodyHtml}</div>
    </article>`;
  }

  function fromNotes(noteJa, noteZh, opts = {}) {
    let body = "";
    if (noteJa) body += `<p class="sensei-tip-ja jp">${escapeHtml(noteJa)}</p>`;
    if (noteZh && showZh()) {
      body += `<p class="sensei-tip-zh zh-annotation">${escapeHtml(noteZh)}</p>`;
    }
    if (!body) return "";
    return wrap({ bodyHtml: body, expanded: opts.expanded !== false, subtitle: opts.subtitle || "" });
  }

  function fromLines(lines, opts = {}) {
    const items = (lines || []).filter((l) => l && (l.ja || l.zh));
    if (!items.length) return "";
    const body = items
      .map((l) => {
        let h = "";
        if (l.ja) h += `<p class="sensei-tip-ja jp">${escapeHtml(l.ja)}</p>`;
        if (l.zh && showZh()) h += `<p class="sensei-tip-zh zh-annotation">${escapeHtml(l.zh)}</p>`;
        return h;
      })
      .join("");
    return wrap({
      bodyHtml: body,
      expanded: opts.expanded !== false,
      subtitle: opts.subtitle || "",
    });
  }

  function bind(root) {
    if (!root) return;
    root.querySelectorAll(".sensei-tip-head").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const card = btn.closest(".sensei-tip");
        if (!card) return;
        card.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", card.classList.contains("is-open") ? "true" : "false");
      };
    });
  }

  return { wrap, fromNotes, fromLines, bind, TITLE, ICON };
})();
