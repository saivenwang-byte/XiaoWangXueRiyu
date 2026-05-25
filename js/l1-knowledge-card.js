/** 第1課 · 知识卡 — 委托 SenseiTipCard 统一「提示」展示 */
const L1KnowledgeCard = (function () {
  const ARIA_LABEL = "提示";

  function html(tip, anchorId, lessonId) {
    if (!tip) return "";
    let payload = tip;
    if (typeof KnowledgeLink !== "undefined" && anchorId) {
      payload = KnowledgeLink.enrichTip(tip, anchorId, lessonId != null ? lessonId : 1);
    }
    if (typeof SenseiTipCard !== "undefined" && SenseiTipCard.fromTipPayload) {
      const l1Scope = lessonId == null || Number(lessonId) === 1;
      return SenseiTipCard.fromTipPayload(payload, { l1Scope });
    }
    return "";
  }

  function bind(root, opts) {
    if (!root) return;
    if (typeof SenseiTipCard !== "undefined") SenseiTipCard.bind(root);
    root.querySelectorAll(".l1-kcard-link, .hyouga-tip-links .l1-kcard-link").forEach((btn) => {
      if (btn.dataset.l1LinkBound === "1") return;
      btn.dataset.l1LinkBound = "1";
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const gate = btn.dataset.l1Gate;
        if (gate !== "" && opts?.switchGate) opts.switchGate(Number(gate));
      });
    });
  }

  return { html, bind, ARIA_LABEL };
})();
