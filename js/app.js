(function () {
  let state = loadMvpState();
  let activeLessonId = null;
  /** 0=単語 1=文法 2=会話 3=テスト */
  let activeGate = 2;

  const titles = {
    home: "標日 あと学習",
    lesson: "学習中",
    review: "復習",
    me: "マイページ",
  };

  /** 从左到右 = 推荐学习顺序；序号与位置一致 */
  const cockpitTabs = [
    { k: 0, label: "🃏 単語", sub: "フラッシュ" },
    { k: 2, label: "① 会話", sub: "多场景", recommended: true },
    { k: 1, label: "② 文法", sub: "ネット" },
    { k: 3, label: "③ テスト", sub: "確認" },
  ];

  function resolveGate(g) {
    if (g === "vocab" || g === 0 || g === "0") return 0;
    if (g === "grammar" || g === 1 || g === "1") return 1;
    if (g === "conversation" || g === "convo" || g === 2 || g === "2") return 2;
    if (g === "quiz" || g === 3 || g === "3") return 3;
    const n = Number(g);
    return n >= 0 && n <= 3 ? n : null;
  }

  /** 会話中心：未完了なら②会話を優先 */
  function defaultGateForLesson(g) {
    if (!g.gate2) return 2;
    if (!g.gate1) return 1;
    if (!g.gate3) return 3;
    return 2;
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function lessonTitleHtml(L) {
    if (L.lessonTitleRuby && typeof RubyRender !== "undefined") {
      return RubyRender.fromSegments(L.lessonTitle, L.lessonTitleRuby);
    }
    return escapeHtml(L.lessonTitle);
  }

  function applyZhSetting() {
    document.documentElement.dataset.showZh = state.showChineseZh !== false ? "1" : "0";
  }

  function lessonProgress(lessonId) {
    return state.lessons[Number(lessonId)] || { gate1: false, gate2: false, gate3: false };
  }

  function setModalOpen(m, open) {
    if (!m) return;
    m.hidden = !open;
    m.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) {
      m.style.display = "";
      m.style.pointerEvents = "";
    } else {
      m.style.display = "none";
      m.style.pointerEvents = "none";
    }
  }

  function closeAllModals() {
    document.querySelectorAll(".mvp-backdrop, .gn-modal").forEach((m) => setModalOpen(m, false));
    if (typeof SpeechEngine !== "undefined" && SpeechEngine.stopAllPlayback) {
      SpeechEngine.stopAllPlayback();
    }
  }

  function switchGate(k) {
    const next = Number(k);
    if (Number.isNaN(next) || next < 0 || next > 3 || next === activeGate) return;
    activeGate = next;
    closeAllModals();
    renderLessonCockpit(lessonProgress(activeLessonId));
    mountGate();
    document.getElementById("lesson-flow-body")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function enterLesson(lessonId, gate) {
    activeLessonId = Number(lessonId);
    state.lastLessonId = activeLessonId;
    const resolved = resolveGate(gate);
    activeGate = resolved != null ? resolved : defaultGateForLesson(lessonProgress(activeLessonId));
    saveMvpState(state);
    showView("lesson");
  }

  window.AppNav = function (view, lessonId, gate) {
    if (view === "flash" && lessonId) {
      enterLesson(lessonId, 0);
      return;
    }
    if (lessonId && view === "lesson") {
      enterLesson(lessonId, gate);
      return;
    }
    if (lessonId) {
      activeLessonId = Number(lessonId);
      state.lastLessonId = activeLessonId;
      saveMvpState(state);
    }
    showView(view);
  };

  function showView(name) {
    const ae = document.activeElement;
    if (ae && typeof ae.blur === "function") ae.blur();
    const targetId = `view-${name}`;
    document.querySelectorAll(".view").forEach((v) => {
      const on = v.id === targetId;
      v.classList.toggle("active", on);
      v.setAttribute("aria-hidden", on ? "false" : "true");
    });
    document.querySelectorAll(".nav-item").forEach((n) => {
      n.classList.toggle("active", n.dataset.view === name);
    });
    const nav = document.querySelector(".bottom-nav");
    if (nav) nav.style.display = ["home", "review", "me"].includes(name) ? "flex" : "none";
    document.getElementById("page-title").textContent = titles[name] || titles.home;

    if (name !== "lesson") closeAllModals();

    if (name === "home") renderHome();
    else if (name === "lesson") renderLessonFlow();
    else if (name === "flash") {
      if (activeLessonId) enterLesson(activeLessonId, 0);
      else showView("home");
    } else if (name === "review") renderReview();
    else if (name === "me") renderMe();
    updateReviewBadge();
  }

  function updateReviewBadge() {
    const n = dueMistakes(state).length;
    const badge = document.getElementById("review-badge");
    if (badge) {
      badge.hidden = n === 0;
      badge.textContent = n > 9 ? "9+" : String(n);
    }
  }

  function gateLabels() {
    return [
      { k: 1, label: "文法ネット" },
      { k: 2, label: "会話" },
      { k: 3, label: "テスト" },
    ];
  }

  function renderHome() {
    const grid = document.getElementById("lesson-cards");
    const weekEl = document.getElementById("home-week-count");
    const studied = state.studyDays.filter((d) => {
      const wkAgo = new Date();
      wkAgo.setDate(wkAgo.getDate() - 6);
      return new Date(d) >= wkAgo;
    }).length;
    if (weekEl) weekEl.textContent = `学習日数（今週）：${studied} 日`;

    const flashPick = document.getElementById("flash-lesson-pick");
    if (flashPick) {
      flashPick.innerHTML = LESSONS_MVP.map((L) => {
        const n = (getLessonVocab(L.lessonId) || []).length;
        return `<button type="button" class="btn secondary flash-pick-btn" data-lid="${L.lessonId}">第${L.lessonId}課 · ${n}語</button>`;
      }).join("");
      flashPick.querySelectorAll(".flash-pick-btn").forEach((btn) => {
        btn.onclick = () => enterLesson(Number(btn.dataset.lid), 0);
      });
    }

    grid.innerHTML = "";
    LESSONS_MVP.forEach((L) => {
      const g = lessonProgress(L.lessonId);
      const gates = gateLabels().map((x) => ({
        ...x,
        done: g[`gate${x.k}`],
      }));
      const themeZh =
        state.showChineseZh !== false && L.themeZh
          ? `<span class="zh-annotation">（${escapeHtml(L.themeZh)}）</span>`
          : "";
      const card = document.createElement("article");
      card.className = "lesson-card-mvp";
      card.innerHTML = `
        <div class="lc-head">
          <span class="lc-num">第${L.lessonId}課</span>
          ${L.lessonId === 16 ? '<span class="lc-badge">文法ネット深め</span>' : ""}
        </div>
        <h3 class="jp">${lessonTitleHtml(L)}</h3>
        <p class="lc-theme">${escapeHtml(L.theme)}${themeZh}</p>
        <div class="lc-path-rail" aria-label="学習の道">
          ${pathRailHtml(g)}
        </div>
        <div class="lc-actions">
          <button type="button" class="btn primary">会話からスタート</button>
          <button type="button" class="btn secondary btn-flash-link">🃏 単語</button>
        </div>
      `;
      card.querySelector(".btn.primary").onclick = () => enterLesson(L.lessonId, defaultGateForLesson(g));
      card.querySelector(".btn-flash-link").onclick = (e) => {
        e.stopPropagation();
        enterLesson(L.lessonId, 0);
      };
      grid.appendChild(card);
    });
  }

  function pathRailHtml(g) {
    const steps = [
      { k: 0, label: "単語", done: false },
      { k: 2, label: "会話", done: g.gate2 },
      { k: 1, label: "文法", done: g.gate1 },
      { k: 3, label: "テスト", done: g.gate3 },
    ];
    return steps
      .map(
        (s, i) =>
          `<span class="lc-path-step ${s.done ? "done" : ""}">${s.done ? "✅" : "○"} ${s.label}</span>${i < steps.length - 1 ? '<span class="lc-path-arrow">→</span>' : ""}`
      )
      .join("");
  }

  function renderLessonCockpit(g) {
    const el = document.getElementById("lesson-cockpit");
    const L = getLessonMvp(activeLessonId);
    if (!el || !L) return;
    el.innerHTML = `
      <div class="cockpit-top">
        <button type="button" class="btn-back" id="cockpit-exit">← ホーム</button>
        <span class="cockpit-lesson">第${L.lessonId}課 · ${escapeHtml(L.theme)}</span>
      </div>
      <div class="cockpit-path">${pathRailHtml(g)}</div>
      <div class="cockpit-tabs" id="cockpit-tabs" role="tablist"></div>
    `;
    el.querySelector("#cockpit-exit").onclick = () => showView("home");
    const tabs = el.querySelector("#cockpit-tabs");
    cockpitTabs.forEach((t) => {
      const done = t.k === 0 ? false : g[`gate${t.k}`];
      const b = document.createElement("button");
      b.type = "button";
      b.className =
        "cockpit-tab" +
        (activeGate === t.k ? " active" : "") +
        (done ? " done" : "") +
        (t.recommended && t.k === 2 && !g.gate2 ? " recommended" : "");
      b.dataset.gate = String(t.k);
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", activeGate === t.k ? "true" : "false");
      b.innerHTML = `<span class="cockpit-tab-main">${done && t.k !== 0 ? "✅ " : ""}${escapeHtml(t.label)}</span>
        <span class="cockpit-tab-sub">${escapeHtml(t.sub)}</span>`;
      b.onclick = (e) => {
        e.preventDefault();
        switchGate(t.k);
      };
      tabs.appendChild(b);
    });
  }

  function renderLessonFlow() {
    const L = getLessonMvp(activeLessonId);
    if (!L) {
      showView("home");
      return;
    }
    const g = lessonProgress(L.lessonId);
    const head = document.getElementById("lesson-flow-head");
    const themeZh =
      state.showChineseZh !== false && L.themeZh
        ? `<span class="zh-annotation">（${escapeHtml(L.themeZh)}）</span>`
        : "";

    const headlineNote =
      activeGate === 1
        ? `<p class="lc-headline-note">↑ 本課の課文タイトル（会話の導入）。下の文法カードの 🔊 とは別です。</p>`
        : "";
    head.innerHTML = `
      <div class="headline-row">
        <p class="headline-jp jp">${lessonTitleHtml(L)}</p>
        <button type="button" class="btn-speak-round" id="lesson-speak-title" aria-label="課文タイトルを読む" title="課文タイトルのみ" data-jp="${escapeHtml(L.lessonTitle)}">🔊</button>
      </div>
      ${headlineNote}
      ${themeZh ? `<p class="lc-theme-slim">${escapeHtml(L.theme)}${themeZh}</p>` : ""}
    `;

    if (activeGate < 0 || activeGate > 3) activeGate = defaultGateForLesson(g);
    renderLessonCockpit(g);
    mountGate();
    if (typeof SpeakUI !== "undefined") {
      SpeakUI.bind(head);
      SpeakUI.bind(document.getElementById("lesson-cockpit"));
    }
  }

  function mountGate() {
    const body = document.getElementById("lesson-flow-body");
    if (!body) return;
    body.innerHTML = "";

    const opts = {
      state,
      onComplete: () => {
        const g = lessonProgress(activeLessonId);
        if (activeGate === 1 && !g.gate2) {
          switchGate(2);
          return;
        }
        if (activeGate === 2 && !lessonProgress(activeLessonId).gate3) {
          switchGate(3);
          return;
        }
        if (activeGate === 3) {
          showView("home");
          return;
        }
        renderLessonCockpit(lessonProgress(activeLessonId));
        mountGate();
      },
    };

    try {
      if (activeGate === 0) {
        if (typeof VocabFlash === "undefined") {
          body.innerHTML = `<p class="hint-ja">単語モジュールを読み込めません。ページを更新してください。</p>`;
        } else {
          VocabFlash.mount(body, activeLessonId, { state, fromLesson: true });
        }
      } else if (activeGate === 1) {
        GrammarNetwork.mount(body, activeLessonId, opts);
        if (typeof SpeakUI !== "undefined") SpeakUI.bind(body);
      } else if (activeGate === 2) {
        DialogueGate.mount(body, activeLessonId, opts);
      } else {
        QuizGate.mount(body, activeLessonId, {
          ...opts,
          onComplete: (finished) => {
            if (finished) showView("home");
            else {
              renderLessonCockpit(lessonProgress(activeLessonId));
              mountGate();
            }
          },
        });
      }
    } catch (err) {
      console.error("mountGate", activeGate, err);
      body.innerHTML = `<p class="hint-ja">読み込みエラー。ページを再読み込みしてください。</p>`;
    }
  }

  function renderReview() {
    const list = document.getElementById("review-list");
    const empty = document.getElementById("review-empty");
    const due = dueMistakes(state);
    if (!due.length) {
      empty.hidden = false;
      list.innerHTML = "";
      return;
    }
    empty.hidden = true;
    list.innerHTML = "";
    due.forEach((m) => {
      const li = document.createElement("li");
      li.className = "review-item";
      const day = daysSinceWrong(m.wrongAt);
      li.innerHTML = `
        <p class="review-q jp">${escapeHtml(m.question)}</p>
        <p class="hint-ja">第${m.lessonId}課 · ${day}日目 · あなたの答え：${escapeHtml(m.userAnswer)}</p>
        <button type="button" class="btn primary btn-review-go">もう一度</button>
      `;
      li.querySelector(".btn-review-go").onclick = () => openReviewModal(m);
      list.appendChild(li);
    });
  }

  function openReviewModal(m) {
    const lesson = getLessonMvp(m.lessonId);
    const q = lesson?.quizQuestions.find((x) => x.id === m.questionId);
    if (!q) return;
    const modal = document.getElementById("review-modal");
    setModalOpen(modal, true);
    let body = "";
    if (q.type === "choice") {
      body = q.options
        .map((opt, i) => `<button type="button" class="qz-opt" data-i="${i}">${escapeHtml(opt)}</button>`)
        .join("");
    } else {
      body = `<input type="text" class="qz-input" id="rev-fill" />
        <button type="button" class="btn primary" id="rev-submit">送信</button>`;
    }
    modal.innerHTML = `
      <div class="gn-modal-inner">
        <h3>復習</h3>
        <p class="jp">${escapeHtml(m.question)}</p>
        <div class="qz-options">${body}</div>
        <div id="rev-feedback"></div>
        <button type="button" class="btn ghost" id="rev-close">閉じる</button>
      </div>
    `;
    const grade = (userRaw) => {
      let ok = false;
      if (q.type === "choice") ok = Number(userRaw) === q.answer;
      else ok = (userRaw || "").trim().replace(/\s+/g, "") === q.answer.replace(/\s+/g, "");
      const fb = modal.querySelector("#rev-feedback");
      const correctText = q.type === "choice" ? q.options[q.answer] : q.answer;
      if (ok) {
        removeMvpMistake(state, m.id);
        fb.innerHTML = `<p class="feedback ok">✅ せいかい！ できた！</p>`;
        updateReviewBadge();
        setTimeout(() => {
          setModalOpen(modal, false);
          renderReview();
        }, 800);
      } else {
        fb.innerHTML = `<p class="feedback err">❌ ざんねん。正解は「${escapeHtml(correctText)}」</p>
          <p class="hint-ja">${escapeHtml(q.explanation)}</p>`;
        m.reviewCount = (m.reviewCount || 0) + 1;
        saveMvpState(state);
      }
    };
    if (q.type === "choice") {
      modal.querySelectorAll(".qz-opt").forEach((btn) => {
        btn.onclick = () => grade(btn.dataset.i);
      });
    } else {
      modal.querySelector("#rev-submit").onclick = () =>
        grade(modal.querySelector("#rev-fill").value);
    }
    modal.querySelector("#rev-close").onclick = () => setModalOpen(modal, false);
    modal.onclick = (e) => {
      if (e.target === modal) setModalOpen(modal, false);
    };
  }

  function renderMe() {
    const heat = document.getElementById("heatmap");
    const progress = document.getElementById("parent-progress");
    const weak = document.getElementById("weak-top3");

    heat.innerHTML = weekStudyDays(state)
      .map((d) => {
        const label = d.date.slice(5);
        return `<div class="heat-cell ${d.studied ? "on" : ""}" title="${d.date}"><span>${label}</span></div>`;
      })
      .join("");

    progress.innerHTML = LESSONS_MVP.map((L) => {
      const g = lessonProgress(L.lessonId);
      const all = g.gate1 && g.gate2 && g.gate3;
      return `<div class="parent-row">
        <span>第${L.lessonId}課</span>
        <span>${g.gate1 ? "✅" : "⬜"} ${g.gate2 ? "✅" : "⬜"} ${g.gate3 ? "✅" : "⬜"}</span>
        <span class="${all ? "done-tag" : ""}">${all ? "完了" : "学習中"}</span>
      </div>`;
    }).join("");

    const tops = weakGrammarTop3(state);
    weak.innerHTML = tops.length
      ? tops.map((t) => `<li><strong>${escapeHtml(t.title)}</strong> · ${t.count}回</li>`).join("")
      : "<li class='hint-ja'>まだにがてデータがありません。</li>";

    const toggle = document.getElementById("toggle-zh");
    if (toggle) {
      toggle.checked = state.showChineseZh !== false;
      toggle.onchange = () => {
        state.showChineseZh = toggle.checked;
        saveMvpState(state);
        applyZhSetting();
        if (document.getElementById("view-home").classList.contains("active")) renderHome();
        if (document.getElementById("view-lesson").classList.contains("active")) renderLessonFlow();
      };
    }

    document.getElementById("btn-clear-mvp").onclick = () => {
      if (confirm("学習データをすべて消しますか？")) {
        clearMvpData();
        state = loadMvpState();
        applyZhSetting();
        showView("me");
      }
    };
  }

  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => showView(btn.dataset.view));
  });

  applyZhSetting();
  showView("home");
})();
