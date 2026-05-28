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

  /** 课文目录单元行：第一单元 … 第六单元（保留「单元」） */
  const UNIT_LABEL_ZH = [
    "",
    "第一单元",
    "第二单元",
    "第三单元",
    "第四单元",
    "第五单元",
    "第六单元",
  ];

  function unitLabelZh(unitId) {
    return UNIT_LABEL_ZH[unitId] || `第${unitId}单元`;
  }

  /** 单元主题日文（catalog.unitThemeJa 真源；缺字段时兜底） */
  const UNIT_THEME_JA_FALLBACK = {
    1: "李さんの来日",
    2: "会社生活①",
    3: "箱根旅行",
    4: "会社生活②",
    5: "新春を迎える",
    6: "さようなら、日本",
  };

  function unitThemeJaText(unit) {
    return (unit && (unit.unitThemeJa || UNIT_THEME_JA_FALLBACK[unit.id])) || "";
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

  /** 首页默认：六单元全部折叠；仅点地图站或课次后再展开 */
  function getExpandedUnitId() {
    return null;
  }

  function unitProgressCounts(state, unit) {
    const prog =
      typeof curriculumUnitProgress === "function" ? curriculumUnitProgress(state, unit) : null;
    return { cleared: prog?.cleared || 0, total: prog?.total || unit.lessons?.length || 4 };
  }

  function unitStatusHtml(state, unit) {
    if (typeof curriculumUnitProgressStarsHtml === "function") {
      return curriculumUnitProgressStarsHtml(state, unit.id);
    }
    return "";
  }

  function lessonEggThumbHtml(state, unitId, lessonId) {
    if (typeof curriculumLessonCleared !== "function" || !curriculumLessonCleared(state, lessonId)) {
      return "";
    }
    const uid = Number(unitId);
    const lid = Number(lessonId);
    const slot = (() => {
      if (typeof UNIT_STRIP_STORYBOARD === "undefined") return 1;
      const sb = UNIT_STRIP_STORYBOARD.find((u) => u.unitId === uid);
      const i = sb?.panels?.findIndex((p) => p.lessonId === lid) ?? -1;
      return i >= 0 ? i + 1 : 1;
    })();
    const panel = `assets/story/unit-${uid}-panel-${slot}-clean.png`;
    const primary = panel;
    const fallbacks = `assets/story/lesson-${lid}-egg.webp,assets/story/lesson-${lid}-egg.png`;
    return `<button type="button" class="journey-lesson-egg-btn is-egg-revealed" data-lesson-egg="${lid}" title="本课条带 · 单元彩蛋" aria-label="第${lid}課 条带">
      <img src="${escapeHtml(primary)}" alt="" loading="lazy" decoding="async" data-fallbacks="${escapeHtml(fallbacks)}" />
    </button>`;
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
    if (d.playable) return cleared ? "is-cleared" : "is-unlocked";
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
      toast("该课尚未开放。");
      return;
    }
    if (saveGuide === "part0") {
      state.homeGuide = state.homeGuide || {};
      state.homeGuide.part0Tap = true;
      if (typeof saveMvpState === "function") saveMvpState(state);
    }
    onEnterLesson(id, gate != null ? gate : 2);
  }

  /** 课次行 · 符号表真源 curriculumLessonCatalogRowHtml */
  function renderLessonRow(L, state, unitId) {
    if (typeof curriculumLessonCatalogRowHtml === "function") {
      return curriculumLessonCatalogRowHtml(L, state, {
        unitId,
        forceReal: L.playable || (devCatalogMode() && L.hasData),
        playable: L.playable,
      });
    }
    return "";
  }

  function renderExploreCatalogDevHint(state) {
    if (typeof StoryReward !== "undefined" && StoryReward.storyDevMode && StoryReward.storyDevMode()) {
      const v = cacheVer();
      const unitRow = (u) => `
            <div class="journey-story-dev-row">
              <span class="journey-story-dev-label">U${u}</span>
              <button type="button" class="btn secondary story-dev-btn" data-story-dev="preview" data-unit="${u}">预览</button>
              <button type="button" class="btn secondary story-dev-btn" data-story-dev="complete" data-unit="${u}">模拟看完</button>
              <button type="button" class="btn secondary story-dev-btn" data-story-dev="reset" data-unit="${u}">重测首次弹</button>
              <button type="button" class="btn secondary story-dev-btn" data-story-dev="status" data-unit="${u}">状态</button>
            </div>`;
      return `<div class="journey-dev-banner journey-story-dev journey-home-dock">
          <p class="journey-story-dev-title">四格验收 · 2×2 条带 · <a href="story-unit-phone-real.html" target="_blank" rel="noopener">竖屏真比例↗</a> · <a href="http://127.0.0.1:8777/storyboard-preview.html" target="_blank" rel="noopener">分镜↗</a> · <code>StoryRewardDev.help()</code></p>
          <p class="journey-story-dev-hint zh-annotation">顺序：U1→U6 ·「模拟看完」= 四课金星+四格齐+排队首次弹 ·「重测首次弹」= 仅重置已读（须单元已齐）</p>
          <div class="journey-story-dev-grid">${[1, 2, 3, 4, 5, 6].map(unitRow).join("")}</div>
          <div class="journey-story-dev-actions">
            <a class="btn secondary story-dev-link" href="index.html?v=${v}&storyDev=1&storyAuto=1">一键 U1 看完待弹</a>
            <button type="button" class="btn secondary story-dev-btn" data-story-dev="open-unit" data-unit="1">展开 U1</button>
          </div>
        </div>`;
    }
    if (devCatalogMode()) {
      return `<p class="journey-dev-banner journey-home-dock">試用：真实进度 · 四关金星 ○☆★=未学/未满分/通关</p>`;
    }
    return "";
  }

  function renderExploreCatalogBlocks(state) {
    const units = getCurriculumUnitsForHome();
    const expandedId = getExpandedUnitId(state);
    const blocks = units
      .slice()
      .sort((a, b) => a.id - b.id)
      .map((unit) => {
        const theme = CURRICULUM_STAGE_THEMES[unit.id] || CURRICULUM_STAGE_THEMES[1];
        const uv = unitVisual(state, unit.id);
        const isOpen = unit.id === expandedId;
        const rows = unit.lessons
          .map((L, i) => {
            const row = renderLessonRow(L, state, unit.id, i + 1);
            const eggBtn = lessonEggThumbHtml(state, unit.id, L.lessonId);
            return `<div class="journey-lesson-slot">
              <div class="journey-lesson-row-wrap">${row}${eggBtn}</div>
            </div>`;
          })
          .join("");
        const unitLabel = escapeHtml(unit.titleJa || unitLabelZh(unit.id));
        const unitJp = escapeHtml(unitThemeJaText(unit));
        const unitZh = escapeHtml(unit.titleZh || "");
        const style = `style="--stage-accent:${theme.accent};--unit-border:${theme.border};--unit-page-bg:${theme.pageBg};--unit-bg:${theme.bg || theme.pageBg}"`;
        const openAttr = isOpen ? " open" : "";
        const currentCls = isOpen ? " is-unit-current" : "";
        const unitFourGold =
          typeof curriculumUnitFourGold === "function" && curriculumUnitFourGold(state, unit.id);
        return `
        <details class="journey-unit-details journey-catalog-unit is-unit-${uv}${currentCls}${unitFourGold ? " has-unit-four-gold" : ""}" data-unit="${unit.id}" data-spectrum="${escapeHtml(theme.spectrum || "")}" ${style}${openAttr}>
          <summary class="journey-unit-summary">
            <div class="journey-unit-summary-bar">
              <span class="journey-unit-chevron" aria-hidden="true"></span>
              ${
                typeof curriculumUnitStackedTitleHtml === "function"
                  ? curriculumUnitStackedTitleHtml(unit.id)
                  : `<div class="journey-unit-summary-main journey-unit-summary-main--stacked" title="${unitLabel} ${unitJp} ${unitZh}">
                <span class="journey-stage-unit jp" lang="ja">${unitLabel}</span>
                <span class="journey-stage-zh zh-annotation">${unitZh || unitJp}</span>
              </div>`
              }
              <div class="journey-unit-summary-end">
                ${unitStatusHtml(state, unit)}
                ${typeof StoryReward !== "undefined" ? StoryReward.giftButtonHtml(state, unit.id, uv) : ""}
              </div>
            </div>
          </summary>
          <div class="journey-unit-body">
            <div class="journey-lesson-grid">${rows}</div>
          </div>
        </details>`;
      })
      .join("");
    return blocks;
  }

  /** @deprecated 仅保留旧调用；新结构用 renderExploreCatalogBlocks + journey-home-scroll */
  function renderExploreCatalog(state) {
    return `<div class="journey-catalog-scroll journey-catalog-scroll--accordion">${renderExploreCatalogBlocks(state)}</div>${renderExploreCatalogDevHint(state)}`;
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
        <span class="journey-legend-nav-item" title="注音">${kanaIcon}</span>
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
          <strong class="journey-part0-title">注音 · ${escapeHtml(CURRICULUM_PART0.titleJa)}</strong>
          <span class="journey-part0-desc zh-annotation">${pv === "start" ? "第一步 · 发音与文字" : "已完成 · 可随时复习"}</span>
        </div>
      </a>`;
  }

  /** 展开单元后：滚动对齐，不改变 DOM 顺序（保持第1→第6单元）；并尽量露出四课 */
  function scrollOpenedUnitIntoView(det) {
    if (!det) return;
    const scroller = det.closest(
      ".journey-home-scroll, .journey-catalog-scroll--accordion, .journey-catalog-scroll"
    );
    const pad = 6;

    function align() {
      const body = det.querySelector(".journey-unit-body");
      if (body) body.scrollTop = 0;

      if (!scroller) {
        det.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const sRect = scroller.getBoundingClientRect();
      const dRect = det.getBoundingClientRect();
      const topDelta = dRect.top - sRect.top - pad;
      if (Math.abs(topDelta) > 2) {
        scroller.scrollBy({ top: topDelta, behavior: "smooth" });
      }
      const lastSlot = det.querySelector(".journey-lesson-grid .journey-lesson-slot:last-child");
      if (lastSlot) {
        const lRect = lastSlot.getBoundingClientRect();
        const sRect2 = scroller.getBoundingClientRect();
        if (lRect.bottom > sRect2.bottom - pad) {
          scroller.scrollBy({ top: lRect.bottom - sRect2.bottom + pad, behavior: "smooth" });
        }
      }
    }

    requestAnimationFrame(() => requestAnimationFrame(align));
  }

  function bindCatalogAccordion(board) {
    const all = board.querySelectorAll("details.journey-unit-details");
    all.forEach((det) => {
      det.addEventListener("toggle", () => {
        if (!det.open) {
          det.classList.remove("is-unit-current");
          return;
        }
        all.forEach((other) => {
          if (other !== det) {
            other.open = false;
            other.classList.remove("is-unit-current");
          }
        });
        det.classList.add("is-unit-current");
        scrollOpenedUnitIntoView(det);
      });
    });
  }

  function openUnitDetails(board, uid) {
    const el = board.querySelector(`details.journey-unit-details[data-unit="${uid}"]`);
    if (!el) return;
    board.querySelectorAll("details.journey-unit-details").forEach((d) => {
      d.open = d === el;
      d.classList.toggle("is-unit-current", d === el);
    });
    scrollOpenedUnitIntoView(el);
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
        else if (action === "open-unit") openUnitDetails(board, uid);
      });
    });
  }

  function bindLessonEggButtons(board, state) {
    board.querySelectorAll("[data-lesson-egg]").forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const lid = Number(btn.dataset.lessonEgg);
        if (typeof StoryEgg !== "undefined") StoryEgg.openLessonEgg(state, lid, { markSeen: false });
      });
      const img = btn.querySelector("img");
      if (!img) return;
      const fallbacks = (img.dataset.fallbacks || "").split(",").filter(Boolean);
      let fi = 0;
      img.onerror = () => {
        if (fi < fallbacks.length) img.src = fallbacks[fi++];
      };
    });
  }

  function bindInteractions(board, state, onEnterLesson) {
    if (typeof StoryReward !== "undefined") StoryReward.bindGiftButtons(board, state);
    bindLessonEggButtons(board, state);
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
      "journey-shinkansen journey-shinkansen--catalog" + (dev ? " journey-shinkansen--dev-catalog" : "");
    const testCardBanner =
      typeof HyougaTestCard !== "undefined" && HyougaTestCard.active()
        ? `<div class="hyouga-test-card-banner" role="status">测试卡 · 满级全开（24课四金·条带·L3）· 说明见 docs/测试卡-满级链接.md</div>`
        : "";
    board.innerHTML = `
      ${testCardBanner}
      <div class="journey-home-shell">
        <div class="journey-home-head">
          <header class="journey-frame-head journey-frame-head--slim">
            <p class="journey-frame-tagline">${FRAME_TAGLINE}</p>
            <p class="journey-frame-sub" id="journey-frame-progress"></p>
          </header>
          <div class="journey-catalog-lead">${renderPart0Bar(state)}</div>
          <p class="journey-catalog-section jp" lang="ja">课文名称（日语）</p>
        </div>
        <div class="journey-home-scroll journey-catalog-scroll journey-catalog-scroll--accordion" role="region" aria-label="课文目录">
          ${renderExploreCatalogBlocks(state)}
        </div>
        ${renderExploreCatalogDevHint(state)}
      </div>`;
    bindInteractions(board, state, onEnterLesson);
    return board;
  }

  function render(options) {
    const { state, onEnterLesson } = options;
    if (
      typeof HyougaTestCard !== "undefined" &&
      HyougaTestCard.active() &&
      typeof HyougaTestCard.apply === "function"
    ) {
      HyougaTestCard.apply(state);
      if (typeof saveMvpState === "function") saveMvpState(state);
    }
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
    if (typeof HyougaTestCard !== "undefined" && HyougaTestCard.active()) {
      progText = (progText ? `${progText} · ` : "") + "测试卡满级";
    }

    if (heroProg) heroProg.textContent = progText;
    if (boardSlot) {
      boardSlot.innerHTML = "";
      boardSlot.appendChild(renderCoverBoard(state, onEnterLesson));
      const frameSub = boardSlot.querySelector("#journey-frame-progress");
      if (frameSub) frameSub.textContent = progText;
      if (typeof StoryReward !== "undefined") StoryReward.afterHomeRender(state);
      if (typeof LessonRecap !== "undefined") LessonRecap.afterHomeRender(state, boardSlot);
    }
    document.getElementById("journey-unit-sheet")?.remove();
  }

  /** 开机封面 · 全幅探索地图（与课内目录分离） */
  function renderSplashMap(state) {
    return `<div class="journey-map-core journey-map-core--splash">${renderMapCore(state)}</div>`;
  }

  return { render, tryEnterLesson, renderSplashMap };
})();
