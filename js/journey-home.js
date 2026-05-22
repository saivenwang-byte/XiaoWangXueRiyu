/**
 * 学习の道 · 探索地图封面（灰→启动→弱彩→通关高亮）
 */
const JourneyHome = (function () {
  const FRAME_TAGLINE = "学習の道 · 新幹線 24 駅";

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function cacheVer() {
    return typeof ShareWechat !== "undefined" && ShareWechat.CACHE_VER
      ? ShareWechat.CACHE_VER
      : "54";
  }

  function toast(msg) {
    if (typeof window !== "undefined" && window.alert) window.alert(msg);
  }

  function getFocusLesson(state) {
    return typeof curriculumGetFocusLesson === "function" ? curriculumGetFocusLesson(state) : null;
  }

  function devCatalogMode() {
    return typeof curriculumDevCatalogMode === "function" && curriculumDevCatalogMode();
  }

  function unitVisual(state, unitId) {
    return typeof curriculumUnitVisualState === "function"
      ? curriculumUnitVisualState(state, unitId)
      : "dormant";
  }

  function part0Visual() {
    return typeof curriculumPart0VisualState === "function" ? curriculumPart0VisualState() : "start";
  }

  function mapRevealedAll(state) {
    return typeof curriculumMapFullyRevealed === "function" && curriculumMapFullyRevealed(state);
  }

  /** P0：仅展开当前主攻单元（与 getCurrentStageUnitId 一致） */
  function getExpandedUnitId(state) {
    if (typeof getCurrentStageUnitId === "function") return getCurrentStageUnitId(state);
    const units = typeof getCurriculumUnitsForHome === "function" ? getCurriculumUnitsForHome() : [];
    for (const u of units) {
      const uv = unitVisual(state, u.id);
      if (uv === "active" || uv === "start") return u.id;
    }
    return units[0]?.id || 1;
  }

  function unitProgressLabel(state, unit) {
    const prog =
      typeof curriculumUnitProgress === "function" ? curriculumUnitProgress(state, unit) : null;
    if (!prog || !prog.total) return "";
    return `${prog.cleared}/${prog.total} 課`;
  }

  function stationClass(state, lessonId) {
    const id = Number(lessonId);
    const d = getCurriculumLessonDisplay(id);
    const cleared = curriculumLessonCleared(state, id);
    const uid = typeof getUnitIdForLesson === "function" ? getUnitIdForLesson(id) : 0;
    const uv = unitVisual(state, uid);
    if (devCatalogMode()) {
      if (!d.hasData) return "is-dev-stub";
      if (cleared) return "is-cleared";
      return "is-unlocked";
    }
    if (uv === "dormant") return "is-map-lesson-hidden";
    if (cleared) return "is-cleared";
    if (uv === "active" || uv === "start") return "is-unlocked";
    return "is-locked";
  }

  function tryEnterLesson(state, onEnterLesson, lessonId, gate, saveGuide) {
    const id = Number(lessonId);
    const d = getCurriculumLessonDisplay(id);
    if (devCatalogMode() && d.playable) {
      onEnterLesson(id, gate != null ? gate : 2);
      return;
    }
    if (!d.playable) {
      toast("该课内容準備中，请先学已开放课次。");
      return;
    }
    if (typeof curriculumCanEnterLesson === "function" && !curriculumCanEnterLesson(state, id)) {
      const focus = getFocusLesson(state);
      toast(
        focus
          ? `请按顺序通关：当前应学 第${focus}課。`
          : "请按顺序学习。"
      );
      return;
    }
    if (saveGuide === "part0") {
      state.homeGuide = state.homeGuide || {};
      state.homeGuide.part0Tap = true;
      if (typeof saveMvpState === "function") saveMvpState(state);
    }
    onEnterLesson(id, gate != null ? gate : 2);
  }

  /** 课次行：圆圈第 N 課 · 上浅中文主题 · 下一行日文课名 · 状态+海星 */
  function renderLessonRow(L, state, unitId, slotIndex) {
    const prog =
      typeof curriculumLessonProgressDisplay === "function"
        ? curriculumLessonProgressDisplay(state, L.lessonId, {
            unitId,
            lessonDisplay: L,
            forceReal: devCatalogMode(),
          })
        : { status: "", stars: "", filled: 0 };
    const themeZh = L.themeZh || L.theme || "";
    let cls = "lesson-row";
    if (L.devStub) cls += " is-lesson-stub";
    else if (prog.filled === 4) cls += " is-lesson-cleared";
    else if (prog.filled > 0) cls += " is-lesson-active";
    else if (prog.status === "未開啟") cls += " is-lesson-locked";
    else cls += " is-lesson-idle";
    if (devCatalogMode() && L.hasData) cls += " is-lesson-playable";
    const zhLine = themeZh
      ? `<span class="lesson-row-zh zh-annotation">${escapeHtml(themeZh)}</span>`
      : "";
    return `
      <button type="button" class="${cls}" data-lid="${L.lessonId}"
        title="第${L.lessonId}課 · ${escapeHtml(L.headline)}${themeZh ? " · " + escapeHtml(themeZh) : ""} · ${escapeHtml(prog.title || "")}">
        <span class="lesson-row-badge" aria-hidden="true">${L.lessonId}</span>
        <span class="lesson-row-body">
          ${zhLine}
          <span class="lesson-row-title jp">${escapeHtml(L.headline)}</span>
          <span class="lesson-row-meta">
            <span class="lesson-row-status">${escapeHtml(prog.status)}</span>
            <span class="lesson-row-stars" aria-label="${escapeHtml(prog.title || "")}">${prog.stars}</span>
          </span>
        </span>
      </button>`;
  }

  function renderExploreCatalog(state) {
    const units = getCurriculumUnitsForHome();
    const expandedId = getExpandedUnitId(state);
    const blocks = units
      .map((unit) => {
        const theme = CURRICULUM_STAGE_THEMES[unit.id] || CURRICULUM_STAGE_THEMES[1];
        const uv = unitVisual(state, unit.id);
        const isOpen = unit.id === expandedId;
        const rows = unit.lessons
          .map((L, i) => renderLessonRow(L, state, unit.id, i + 1))
          .join("");
        const badge =
          uv === "cleared"
            ? "★ 単元完了"
            : uv === "start"
              ? "START"
              : uv === "active"
                ? "進行中"
                : "未開啟";
        const progLbl = unitProgressLabel(state, unit);
        const style = `style="--stage-accent:${theme.accent};--unit-border:${theme.border};--unit-page-bg:${theme.pageBg};--unit-bg:${theme.bg || theme.pageBg}"`;
        const openAttr = isOpen ? " open" : "";
        const currentCls = isOpen ? " is-unit-current" : "";
        return `
        <details class="journey-unit-details journey-catalog-unit is-unit-${uv}${currentCls}" data-unit="${unit.id}" data-spectrum="${escapeHtml(theme.spectrum || "")}" ${style}${openAttr}>
          <summary class="journey-unit-summary">
            <span class="journey-unit-chevron" aria-hidden="true"></span>
            <div class="journey-unit-summary-main">
              <span class="journey-stage-tag">${escapeHtml(theme.spectrum || theme.label)}</span>
              <strong class="journey-stage-unit">${escapeHtml(unit.titleJa)}</strong>
              <span class="journey-stage-zh zh-annotation">${escapeHtml(unit.titleZh)}</span>
            </div>
            <div class="journey-unit-summary-end">
              ${progLbl ? `<span class="journey-unit-prog">${escapeHtml(progLbl)}</span>` : ""}
              ${typeof StoryReward !== "undefined" ? StoryReward.giftButtonHtml(state, unit.id, uv) : ""}
              <span class="journey-unit-badge is-unit-${uv}">${badge}</span>
            </div>
          </summary>
          <div class="journey-unit-body">
            <div class="journey-lesson-grid">${rows}</div>
          </div>
        </details>`;
      })
      .join("");
    const devHint =
      typeof StoryReward !== "undefined" && StoryReward.storyDevMode && StoryReward.storyDevMode()
        ? `<div class="journey-dev-banner journey-story-dev">
          <p class="journey-story-dev-title">开发 · 四格分段测 · <a href="http://127.0.0.1:8777/storyboard-preview.html" target="_blank" rel="noopener">全册24格审阅↗</a> · <code>StoryRewardDev.help()</code></p>
          <div class="journey-story-dev-actions">
            <button type="button" class="btn secondary story-dev-btn" data-story-dev="preview" data-unit="4">预览U4</button>
            <button type="button" class="btn secondary story-dev-btn" data-story-dev="panel" data-unit="4" data-panels="2">U4亮格2</button>
            <button type="button" class="btn secondary story-dev-btn" data-story-dev="complete" data-unit="4">U4模拟齐</button>
            <button type="button" class="btn secondary story-dev-btn" data-story-dev="reset" data-unit="4">重测首次弹</button>
            <button type="button" class="btn secondary story-dev-btn" data-story-dev="status" data-unit="4">状态</button>
          </div>
        </div>`
        : devCatalogMode()
          ? `<p class="journey-dev-banner">試用：真实进度 · 四关金星 ○☆★=未学/未满分/通关</p>`
          : "";
    return `<div class="journey-catalog-scroll journey-catalog-scroll--accordion">${blocks}</div>${devHint}`;
  }

  function renderUnitMapStations(state) {
    const p0 = part0Visual();
    const p0pt = CURRICULUM_UNIT_MAP_POINTS[0];
    let html = "";
    if (p0pt) {
      html += `<button type="button" class="unit-station unit-station--part0 is-part0-${p0}" data-part0="1"
        style="left:${(p0pt.x / 240) * 100}%;top:${(p0pt.y / 360) * 100}%"
        title="00 入門 · 発音と文字">
        <span class="unit-station-label">00</span>
      </button>`;
    }
    CURRICULUM_UNITS.forEach((unit) => {
      const pt = CURRICULUM_UNIT_MAP_POINTS[unit.id];
      if (!pt) return;
      const uv = unitVisual(state, unit.id);
      const theme = CURRICULUM_STAGE_THEMES[unit.id] || CURRICULUM_STAGE_THEMES[1];
      const hidden = uv === "dormant" ? " is-map-hidden" : "";
      html += `<button type="button" class="unit-station is-unit-${uv}${hidden}" data-unit="${unit.id}"
        style="left:${(pt.x / 240) * 100}%;top:${(pt.y / 360) * 100}%;--stage-accent:${theme.accent}"
        title="${escapeHtml(unit.titleJa)}">
        <span class="unit-station-ring"></span>
        <span class="unit-station-num">${unit.id}</span>
      </button>`;
    });
    return html;
  }

  function renderMapCore(state) {
    const pathD =
      typeof curriculumShinkansenUnitPathD === "function"
        ? curriculumShinkansenUnitPathD()
        : typeof curriculumShinkansenPathD === "function"
          ? curriculumShinkansenPathD()
          : "";
    const landClass = mapRevealedAll(state) ? "japan-land-layer is-land-revealed" : "japan-ghost-layer";
    return `
      <div class="journey-map-canvas">
        <svg class="journey-map-svg journey-map-svg--explore" viewBox="0 0 240 360" role="img" aria-label="日本列岛示意">
          <g class="${landClass}">
            <path class="japan-land" d="M 72 18 L 168 14 L 182 48 L 158 62 L 88 58 Z"/>
            <path class="japan-land" d="M 98 68 L 152 64 L 168 120 L 175 200 L 155 248 L 105 252 L 88 200 L 82 140 Z"/>
            <path class="japan-land" d="M 18 248 L 72 242 L 78 288 L 42 302 L 12 278 Z"/>
            <path class="japan-land" d="M 88 258 L 168 252 L 182 298 L 142 312 L 92 302 Z"/>
          </g>
          <path class="shinkansen-track shinkansen-track--main" d="${pathD}"/>
        </svg>
        <div class="journey-map-stations journey-map-stations--units">${renderUnitMapStations(state)}</div>
      </div>`;
  }

  function renderMapLegend() {
    const kanaIcon = typeof NavIcons !== "undefined" ? NavIcons.html("kana") : "";
    const courseIcon = typeof NavIcons !== "undefined" ? NavIcons.html("course") : "";
    const meIcon = typeof NavIcons !== "undefined" ? NavIcons.html("me") : "";
    return `<div class="journey-map-legend" aria-label="图例">
      <div class="journey-legend-group">
        <span><i class="leg leg--cleared"></i>通関</span>
        <span><i class="leg leg--active"></i>進行</span>
        <span><i class="leg leg--start"></i>START</span>
        <span><i class="leg leg--dormant"></i>未解锁</span>
        <span class="journey-legend-sep">|</span>
        <span>○☆★ 四关</span>
      </div>
      <div class="journey-legend-group journey-legend-nav" aria-label="底栏图标">
        <span class="journey-legend-nav-item" title="课程">${courseIcon}</span>
        <span class="journey-legend-nav-item" title="我的">${meIcon}</span>
        <span class="journey-legend-nav-item" title="五十音">${kanaIcon}</span>
      </div>
    </div>`;
  }

  function renderPart0Bar(state) {
    const v = cacheVer();
    const pv = part0Visual();
    const t = typeof CURRICULUM_PART0_THEME !== "undefined" ? CURRICULUM_PART0_THEME : null;
    const flash =
      typeof curriculumGuideFlashPart0 === "function" && curriculumGuideFlashPart0(state)
        ? " guide-flash"
        : "";
    const style =
      pv === "done" && t
        ? ` style="--stage-accent:${t.accent};--unit-border:${t.border};background:${t.bg}"`
        : "";
    const kanaIcon = typeof NavIcons !== "undefined" ? NavIcons.html("kana") : "";
    const part0Theme =
      t && pv === "done"
        ? ` journey-part0-bar--spectrum`
        : pv === "start"
          ? " journey-part0-bar--spectrum"
          : "";
    return `
      <a href="${escapeHtml(CURRICULUM_PART0.href)}?v=${v}" class="journey-part0-bar is-part0-${pv}${flash}${part0Theme}" data-guide="part0"${style}>
        <span class="journey-part0-icon">${kanaIcon}</span>
        <span class="journey-part0-badge">${pv === "start" ? "START" : "00"}</span>
        <div class="journey-part0-text">
          <strong class="journey-part0-title">五十音 · ${escapeHtml(CURRICULUM_PART0.titleJa)}</strong>
          <span class="journey-part0-desc zh-annotation">${pv === "start" ? "第一步 · 发音与文字" : "已完成 · 可随时复习"}</span>
        </div>
      </a>`;
  }

  function bindCatalogAccordion(board) {
    const all = board.querySelectorAll("details.journey-unit-details");
    all.forEach((det) => {
      det.addEventListener("toggle", () => {
        if (!det.open) return;
        all.forEach((other) => {
          if (other !== det) other.open = false;
        });
      });
    });
  }

  function openUnitDetails(board, uid) {
    const el = board.querySelector(`details.journey-unit-details[data-unit="${uid}"]`);
    if (!el) return;
    board.querySelectorAll("details.journey-unit-details").forEach((d) => {
      d.open = d === el;
    });
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    el.classList.add("is-map-reveal-flash");
    setTimeout(() => el.classList.remove("is-map-reveal-flash"), 1200);
  }

  function bindStoryDevBar(board, state) {
    board.querySelectorAll("[data-story-dev]").forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (typeof StoryRewardDev === "undefined") return;
        const uid = Number(btn.dataset.unit) || 4;
        const action = btn.dataset.storyDev;
        if (action === "preview") StoryRewardDev.preview(uid);
        else if (action === "panel") {
          const p = Number(btn.dataset.panels) || 2;
          StoryRewardDev.unlockPanels(uid, p);
          StoryRewardDev.preview(uid);
        } else if (action === "complete") StoryRewardDev.simulateUnitComplete(uid);
        else if (action === "reset") StoryRewardDev.resetSeen(uid);
        else if (action === "status") StoryRewardDev.status(uid);
      });
    });
  }

  function bindInteractions(board, state, onEnterLesson) {
    if (typeof StoryReward !== "undefined") StoryReward.bindGiftButtons(board, state);
    bindStoryDevBar(board, state);
    bindCatalogAccordion(board);
    board.querySelectorAll("[data-lid]").forEach((btn) => {
      btn.onclick = () => tryEnterLesson(state, onEnterLesson, Number(btn.dataset.lid), 2, null);
    });
    board.querySelectorAll(".unit-station[data-unit]").forEach((btn) => {
      btn.onclick = () => {
        const uid = Number(btn.dataset.unit);
        btn.classList.remove("is-map-hidden");
        openUnitDetails(board, uid);
      };
    });
    const part0 = board.querySelector(".journey-part0-bar");
    if (part0) {
      part0.addEventListener("click", () => {
        state.homeGuide = state.homeGuide || {};
        state.homeGuide.part0Tap = true;
        if (typeof saveMvpState === "function") saveMvpState(state);
      });
    }
  }

  function renderCoverBoard(state, onEnterLesson) {
    const dev = devCatalogMode();
    const board = document.createElement("div");
    board.className =
      "journey-shinkansen journey-shinkansen--explore" + (dev ? " journey-shinkansen--dev-catalog" : "");
    board.innerHTML = `
      <header class="journey-frame-head journey-frame-head--slim">
        <p class="journey-frame-tagline">${FRAME_TAGLINE}</p>
        <p class="journey-frame-sub" id="journey-frame-progress"></p>
      </header>
      <div class="journey-frame-body journey-frame-body--explore">
        <div class="journey-catalog-lead">${renderPart0Bar(state)}</div>
        <div class="journey-map-core journey-map-core--explore">${renderMapCore(state)}${renderMapLegend()}</div>
        ${renderExploreCatalog(state)}
      </div>`;
    bindInteractions(board, state, onEnterLesson);
    return board;
  }

  function render(options) {
    const { state, onEnterLesson } = options;
    const boardSlot = document.getElementById("journey-board-slot");
    const heroProg = document.getElementById("home-path-progress");
    const free =
      typeof curriculumFreeExploreMode === "function" && curriculumFreeExploreMode(state);
    const focus = getFocusLesson(state);

    let progText = "";
    if (typeof curriculumPathProgress === "function") {
      const p = curriculumPathProgress(state);
      progText = free
        ? `進捗 ${p.label} · 可自由选课`
        : `進捗 ${p.label}${focus ? ` · 第${focus}課` : ""}`;
    }
    if (mapRevealedAll(state)) progText = (progText ? `${progText} · ` : "") + "地図全開";
    if (devCatalogMode()) progText = (progText ? `${progText} · ` : "") + "開発：全24課可进";

    if (heroProg) heroProg.textContent = progText;
    if (boardSlot) {
      boardSlot.innerHTML = "";
      boardSlot.appendChild(renderCoverBoard(state, onEnterLesson));
      const frameSub = boardSlot.querySelector("#journey-frame-progress");
      if (frameSub) frameSub.textContent = progText;
      if (typeof StoryReward !== "undefined") StoryReward.afterHomeRender(state);
    }
    document.getElementById("journey-unit-sheet")?.remove();
  }

  return { render, tryEnterLesson };
})();
