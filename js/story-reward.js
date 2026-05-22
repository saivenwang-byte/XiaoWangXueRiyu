/**
 * 单元完成 · 四格定格漫画（内测占位 + 首次自动弹出）
 * 真源：docs/story-art-brief-绘本参照.md
 */
const StoryReward = (function () {
  let modalEl = null;

  function storyDevMode() {
    try {
      if (/[?&]storyDev=1/.test(location.search || "")) return true;
      if (localStorage.getItem("hyouga_story_dev") === "1") return true;
      if (localStorage.getItem("hyouga_story_dev") === "0") return false;
    } catch (_) {
      /* ignore */
    }
    return typeof curriculumDevCatalogMode === "function" && curriculumDevCatalogMode();
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function ensureStory(state) {
    if (!state.story || typeof state.story !== "object") {
      state.story = { units: {}, pendingAuto: null };
    }
    if (!state.story.units || typeof state.story.units !== "object") {
      state.story.units = {};
    }
    return state.story;
  }

  function getUnitRecord(state, unitId) {
    ensureStory(state);
    const key = String(Number(unitId));
    if (!state.story.units[key]) {
      state.story.units[key] = {
        rewardSeen: false,
        stripUnlocked: [false, false, false, false],
      };
    }
    return state.story.units[key];
  }

  function lessonAllGatesDone(state, lessonId) {
    const g = state?.lessons?.[Number(lessonId)];
    return !!(g && g.gate0 && g.gate1 && g.gate2 && g.gate3);
  }

  function getHomeUnit(unitId) {
    if (typeof getCurriculumUnitsForHome !== "function") return null;
    return getCurriculumUnitsForHome().find((u) => u.id === Number(unitId)) || null;
  }

  function syncUnitStrip(state, unit) {
    if (!unit) return;
    const rec = getUnitRecord(state, unit.id);
    unit.lessons.forEach((L, i) => {
      if (lessonAllGatesDone(state, L.lessonId)) rec.stripUnlocked[i] = true;
    });
  }

  function syncAllStrips(state) {
    if (typeof getCurriculumUnitsForHome !== "function") return;
    getCurriculumUnitsForHome().forEach((u) => syncUnitStrip(state, u));
  }

  function isUnitComplete(state, unitId) {
    return (
      typeof curriculumUnitVisualState === "function" &&
      curriculumUnitVisualState(state, unitId) === "cleared"
    );
  }

  function shouldAutoShow(state, unitId) {
    return isUnitComplete(state, unitId) && !getUnitRecord(state, unitId).rewardSeen;
  }

  function findAutoUnitId(state) {
    ensureStory(state);
    const pending = state.story.pendingAuto;
    if (pending != null && shouldAutoShow(state, pending)) return Number(pending);
    if (pending != null) state.story.pendingAuto = null;
    if (typeof CURRICULUM_UNITS !== "undefined") {
      for (const u of CURRICULUM_UNITS) {
        if (shouldAutoShow(state, u.id)) return u.id;
      }
    }
    return null;
  }

  function markRewardSeen(state, unitId) {
    getUnitRecord(state, unitId).rewardSeen = true;
    if (state.story.pendingAuto === Number(unitId)) state.story.pendingAuto = null;
    if (typeof saveMvpState === "function") saveMvpState(state);
  }

  function gurumiPlaceholderSvg() {
    return `<svg class="story-gurumi-icon" viewBox="0 0 32 40" aria-hidden="true">
      <ellipse cx="16" cy="14" rx="11" ry="12" fill="currentColor" opacity="0.35"/>
      <rect x="13" y="24" width="6" height="12" rx="2" fill="currentColor" opacity="0.5"/>
      <circle cx="12" cy="12" r="1.5" fill="#fff"/>
      <circle cx="20" cy="12" r="1.5" fill="#fff"/>
    </svg>`;
  }

  function renderStripPanels(state, unit) {
    const theme = CURRICULUM_STAGE_THEMES[unit.id] || CURRICULUM_STAGE_THEMES[1];
    const rec = getUnitRecord(state, unit.id);
    const accent = theme.accent || "#e57373";
    const bg = theme.bg || theme.pageBg || "#fff5f5";

    return unit.lessons
      .map((L, i) => {
        const unlocked = rec.stripUnlocked[i] || lessonAllGatesDone(state, L.lessonId);
        const cls = unlocked ? "is-unlocked" : "is-locked";
        const slot = i + 1;
        return `<div class="story-reward-panel ${cls}" style="--panel-accent:${accent};--panel-bg:${bg}">
          <span class="story-reward-panel-slot">格${slot}</span>
          <span class="story-reward-panel-gurumi">${gurumiPlaceholderSvg()}</span>
          <span class="story-reward-panel-lesson">第${L.lessonId}課</span>
          <span class="story-reward-panel-caption jp">${escapeHtml(L.headline)}</span>
        </div>`;
      })
      .join("");
  }

  function renderModalContent(state, unitId) {
    const unit = getHomeUnit(unitId);
    if (!unit) return "";
    const theme = CURRICULUM_STAGE_THEMES[unit.id] || CURRICULUM_STAGE_THEMES[1];
    const allUnlocked = isUnitComplete(state, unit.id);

    return `
      <div class="story-reward-inner" style="--stage-accent:${theme.accent};--unit-border:${theme.border}">
        <header class="story-reward-head">
          <div>
            <p class="story-reward-eyebrow">グルミの観察日記 · 定格4格</p>
            <h2 class="story-reward-title">${escapeHtml(unit.titleJa)} <span class="zh-annotation">${escapeHtml(unit.titleZh)}</span></h2>
          </div>
          <button type="button" class="story-reward-close btn secondary" aria-label="閉じる">✕</button>
        </header>
        <p class="story-reward-narrator zh-annotation">グルミ＝小李 · 本单元四段旅程（美工稿见 storyboard-P1 等）</p>
        <div class="story-reward-strip${allUnlocked ? " is-unit-complete" : ""}" role="img" aria-label="单元四格漫画">
          ${renderStripPanels(state, unit)}
        </div>
        <p class="story-reward-foot zh-annotation">内测占位 · 四课四关齐后全格点亮 · 真稿见 assets/story/unit-${unit.id}-strip.webp</p>
      </div>`;
  }

  function getModal() {
    if (!modalEl) modalEl = document.getElementById("story-reward-modal");
    return modalEl;
  }

  function closeModal() {
    const el = getModal();
    if (!el) return;
    el.hidden = true;
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = "";
  }

  function openModal(state, unitId, options) {
    const el = getModal();
    if (!el) return;
    const uid = Number(unitId);
    syncUnitStrip(state, getHomeUnit(uid));
    el.innerHTML = `<div class="mvp-backdrop-inner story-reward-sheet">${renderModalContent(state, uid)}</div>`;
    el.hidden = false;
    el.setAttribute("aria-hidden", "false");

    if (options?.markSeen) markRewardSeen(state, uid);

    const closeBtn = el.querySelector(".story-reward-close");
    if (closeBtn) {
      closeBtn.onclick = () => closeModal();
    }
    el.onclick = (ev) => {
      if (ev.target === el) closeModal();
    };
    const sheet = el.querySelector(".story-reward-sheet");
    if (sheet) {
      sheet.onclick = (ev) => ev.stopPropagation();
    }
  }

  function giftButtonHtml(state, unitId, uv) {
    if (storyDevMode()) {
      const title = isUnitComplete(state, unitId)
        ? "开发：预览四格（已齐）"
        : "开发：预览四格（未齐，可看灰格）";
      return `<button type="button" class="journey-unit-gift journey-unit-gift--dev" data-unit-story="${unitId}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">👁</button>`;
    }
    if (!isUnitComplete(state, unitId)) return "";
    const seen = getUnitRecord(state, unitId).rewardSeen;
    const title = seen ? "再看单元四格" : "单元达成漫画";
    return `<button type="button" class="journey-unit-gift" data-unit-story="${unitId}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">🎁</button>`;
  }

  /** 进度变化后：同步格解锁；单元刚完成则排队首次自动弹 */
  function onStateChanged(state, options) {
    syncAllStrips(state);
    const lid = options?.lessonId != null ? Number(options.lessonId) : null;
    if (lid && typeof getUnitIdForLesson === "function") {
      const uid = getUnitIdForLesson(lid);
      if (isUnitComplete(state, uid) && !getUnitRecord(state, uid).rewardSeen) {
        state.story.pendingAuto = uid;
        if (typeof saveMvpState === "function") saveMvpState(state);
      }
    }
    return state;
  }

  function afterHomeRender(state) {
    syncAllStrips(state);
    const uid = findAutoUnitId(state);
    if (uid == null) return;
    window.setTimeout(() => {
      const home = document.getElementById("view-home");
      if (!home || !home.classList.contains("active")) return;
      openModal(state, uid, { markSeen: true });
    }, 400);
  }

  function bindGiftButtons(board, state) {
    board.querySelectorAll("[data-unit-story]").forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const uid = Number(btn.dataset.unitStory);
        openModal(state, uid, { markSeen: false });
      });
    });
  }

  return {
    ensureStory,
    syncAllStrips,
    isUnitComplete,
    storyDevMode,
    giftButtonHtml,
    onStateChanged,
    afterHomeRender,
    openModal,
    closeModal,
    bindGiftButtons,
  };
})();

/** 开发者分段验收 · 控制台 StoryRewardDev.help() */
const StoryRewardDev = (function () {
  function bridge() {
    return typeof window !== "undefined" && window.MvpDev ? window.MvpDev : null;
  }

  function withState(mutator) {
    const b = bridge();
    if (!b) {
      console.warn("[StoryRewardDev] 请在 index 页面使用；依赖 window.MvpDev");
      return null;
    }
    const state = b.getState();
    mutator(state);
    b.setState(state);
    return state;
  }

  function logStatus(unitId) {
    const b = bridge();
    if (!b) return;
    const state = b.getState();
    const uid = Number(unitId);
    const unit = typeof getCurriculumUnitsForHome === "function"
      ? getCurriculumUnitsForHome().find((u) => u.id === uid)
      : null;
    const rec = StoryReward.ensureStory(state).units[String(uid)] || {
      rewardSeen: false,
      stripUnlocked: [false, false, false, false],
    };
    const prog =
      unit && typeof curriculumUnitProgress === "function"
        ? curriculumUnitProgress(state, unit)
        : null;
    console.table({
      单元: uid,
      "课进度(四关)": prog ? `${prog.cleared}/${prog.total}` : "—",
      单元cleared: StoryReward.isUnitComplete(state, uid),
      rewardSeen: !!rec.rewardSeen,
      pendingAuto: state.story?.pendingAuto ?? null,
      格1: !!rec.stripUnlocked?.[0],
      格2: !!rec.stripUnlocked?.[1],
      格3: !!rec.stripUnlocked?.[2],
      格4: !!rec.stripUnlocked?.[3],
    });
  }

  function preview(unitId) {
    const b = bridge();
    if (!b) return;
    StoryReward.openModal(b.getState(), Number(unitId), { markSeen: false });
    console.log("[StoryRewardDev] preview 单元", unitId);
  }

  function unlockPanels(unitId, panels) {
    withState((state) => {
      const rec = StoryReward.ensureStory(state).units[String(Number(unitId))] || {
        rewardSeen: false,
        stripUnlocked: [false, false, false, false],
      };
      if (!state.story.units[String(Number(unitId))]) {
        state.story.units[String(Number(unitId))] = rec;
      }
      const arr = Array.isArray(panels) ? panels : [panels];
      arr.forEach((p) => {
        const i = Number(p) - 1;
        if (i >= 0 && i < 4) rec.stripUnlocked[i] = true;
      });
      StoryReward.syncAllStrips(state);
    });
    logStatus(unitId);
    bridge()?.renderHome();
    console.log("[StoryRewardDev] unlockPanels", unitId, panels);
  }

  function clearPanels(unitId) {
    withState((state) => {
      const key = String(Number(unitId));
      state.story.units[key] = { rewardSeen: false, stripUnlocked: [false, false, false, false] };
    });
    bridge()?.renderHome();
    logStatus(unitId);
  }

  function gateLesson(lessonId, on) {
    withState((state) => {
      const lid = Number(lessonId);
      if (on === false) {
        state.lessons[lid] =
          typeof mvpLessonGatesEmpty === "function"
            ? mvpLessonGatesEmpty()
            : { gate0: false, gate1: false, gate2: false, gate3: false, touched: {} };
      } else {
        state.lessons[lid] =
          typeof mvpLessonGatesCleared === "function"
            ? mvpLessonGatesCleared()
            : { gate0: true, gate1: true, gate2: true, gate3: true, touched: { 0: true, 1: true, 2: true, 3: true } };
      }
      StoryReward.onStateChanged(state, { lessonId: lid });
    });
    bridge()?.renderHome();
    logStatus(typeof getUnitIdForLesson === "function" ? getUnitIdForLesson(lessonId) : "?");
  }

  function simulateUnitComplete(unitId) {
    const uid = Number(unitId);
    const unit =
      typeof getCurriculumUnitsForHome === "function"
        ? getCurriculumUnitsForHome().find((u) => u.id === uid)
        : null;
    if (!unit) return;
    withState((state) => {
      unit.lessons.forEach((L) => {
        state.lessons[L.lessonId] =
          typeof mvpLessonGatesCleared === "function"
            ? mvpLessonGatesCleared()
            : { gate0: true, gate1: true, gate2: true, gate3: true, touched: { 0: true, 1: true, 2: true, 3: true } };
      });
      StoryReward.syncAllStrips(state);
      getUnitRecordForDev(state, uid).rewardSeen = false;
      state.story.pendingAuto = uid;
    });
    bridge()?.renderHome();
    console.log("[StoryRewardDev] simulateUnitComplete → 回首页应首次自动弹", uid);
    logStatus(uid);
  }

  function getUnitRecordForDev(state, unitId) {
    StoryReward.ensureStory(state);
    const key = String(Number(unitId));
    if (!state.story.units[key]) {
      state.story.units[key] = { rewardSeen: false, stripUnlocked: [false, false, false, false] };
    }
    return state.story.units[key];
  }

  function resetSeen(unitId) {
    withState((state) => {
      getUnitRecordForDev(state, unitId).rewardSeen = false;
      state.story.pendingAuto = Number(unitId);
    });
    bridge()?.renderHome();
    console.log("[StoryRewardDev] resetSeen → renderHome 后应自动弹", unitId);
  }

  function triggerAuto(unitId) {
    resetSeen(unitId);
  }

  function bootFromUrl(mvpDev) {
    const q = location.search || "";
    const m = q.match(/[?&]storyPreview=(\d)/);
    if (m) {
      window.setTimeout(() => preview(Number(m[1])), 600);
    }
    const m2 = q.match(/[?&]storyAuto=(\d)/);
    if (m2) {
      window.setTimeout(() => simulateUnitComplete(Number(m2[1])), 500);
    }
    const m3 = q.match(/[?&]storyPanel=(\d)-(\d)/);
    if (m3) {
      unlockPanels(Number(m3[1]), [Number(m3[2])]);
      preview(Number(m3[1]));
    }
  }

  function help() {
    console.log(`
StoryRewardDev — 分段测四格（不必先打通单元）

① 只看 UI     StoryRewardDev.preview(4)
② 亮第 2 格   StoryRewardDev.unlockPanels(4, 2)
③ 模拟单元齐  StoryRewardDev.simulateUnitComplete(4)  → 回首页自动弹
④ 重测首次弹  StoryRewardDev.resetSeen(4)            → 再 renderHome
⑤ 单课四关    StoryRewardDev.gateLesson(14, true)
⑥ 状态表      StoryRewardDev.status(4)

URL（刷新首页）:
  ?storyPreview=4        直接弹四格
  ?storyPanel=4-2        只亮格2并预览
  ?storyAuto=4           排队首次自动弹

首页每个单元标题旁 👁 = 开发预览（localhost 默认开启）

全册叙事审阅（6页×4格纵滚）:
  python scripts/serve-storyboard.py
  → http://127.0.0.1:8777/storyboard-preview.html
`);
  }

  return {
    help,
    status: logStatus,
    preview,
    unlockPanels,
    clearPanels,
    gateLesson,
    simulateUnitComplete,
    resetSeen,
    triggerAuto,
    bootFromUrl,
  };
})();
