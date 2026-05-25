const MVP_STORAGE_KEY = "hyouga_mvp_v1";

/** 内测种子课：首页显示为已通关（金黄），当前应学仍为序列中下一课（通常第13課） */
const MVP_INTERNAL_SEED_CLEARED = [14, 16, 18];

function mvpLessonGatesCleared() {
  return { gate0: true, gate1: true, gate2: true, gate3: true, touched: { 0: true, 1: true, 2: true, 3: true } };
}

function mvpLessonGatesEmpty() {
  return { gate0: false, gate1: false, gate2: false, gate3: false, touched: {} };
}

function applyMvpInternalSeed(state) {
  if (!state.lessons || typeof state.lessons !== "object") state.lessons = {};
  MVP_INTERNAL_SEED_CLEARED.forEach((lid) => {
    state.lessons[lid] = mvpLessonGatesCleared();
  });
  return state;
}

function mvpDefaultState() {
  const lessons = {};
  MVP_INTERNAL_SEED_CLEARED.forEach((lid) => {
    lessons[lid] = mvpLessonGatesCleared();
  });
  return {
    studyDays: [],
    lessons,
    flashProgress: {},
    mistakes: [],
    lastLessonId: 16,
    showChineseZh: true,
    story: { units: {}, pendingAuto: null },
    notes: { lesson: {}, unit: {}, bookExtra: "" },
    ui: { returnAfterLesson: null, meNotebookOpen: false, meNotebookScope: null },
  };
}

function loadMvpState() {
  try {
    const raw = localStorage.getItem(MVP_STORAGE_KEY);
    if (!raw) return mvpDefaultState();
    const parsed = JSON.parse(raw);
    const base = mvpDefaultState();
    const merged = {
      ...base,
      ...parsed,
      lessons: { ...base.lessons, ...(parsed.lessons || {}) },
      mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
      studyDays: Array.isArray(parsed.studyDays) ? parsed.studyDays : [],
      flashProgress: parsed.flashProgress && typeof parsed.flashProgress === "object" ? parsed.flashProgress : {},
      showChineseZh: parsed.showChineseZh !== false,
      story:
        parsed.story && typeof parsed.story === "object"
          ? {
              units: parsed.story.units && typeof parsed.story.units === "object" ? parsed.story.units : {},
              pendingAuto: parsed.story.pendingAuto ?? null,
            }
          : { units: {}, pendingAuto: null },
      notes:
        parsed.notes && typeof parsed.notes === "object"
          ? {
              lesson:
                parsed.notes.lesson && typeof parsed.notes.lesson === "object"
                  ? { ...parsed.notes.lesson }
                  : {},
              unit:
                parsed.notes.unit && typeof parsed.notes.unit === "object" ? { ...parsed.notes.unit } : {},
              bookExtra: typeof parsed.notes.bookExtra === "string" ? parsed.notes.bookExtra : "",
            }
          : { lesson: {}, unit: {}, bookExtra: "" },
      ui:
        parsed.ui && typeof parsed.ui === "object"
          ? {
              returnAfterLesson: parsed.ui.returnAfterLesson ?? null,
              meNotebookOpen: !!parsed.ui.meNotebookOpen,
              meNotebookScope: parsed.ui.meNotebookScope || null,
            }
          : { returnAfterLesson: null, meNotebookOpen: false, meNotebookScope: null },
    };
    Object.keys(merged.lessons || {}).forEach((lid) => {
      const g = merged.lessons[lid];
      if (g && g.gate1 && g.gate2 && g.gate3 && !g.gate0) g.gate0 = true;
    });
    return applyMvpInternalSeed(merged);
  } catch {
    return mvpDefaultState();
  }
}

function saveMvpState(state) {
  localStorage.setItem(MVP_STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function touchStudyDay(state) {
  const key = todayKey();
  if (!state.studyDays.includes(key)) {
    state.studyDays.push(key);
    state.studyDays.sort();
  }
  saveMvpState(state);
}

function setGateDone(state, lessonId, gate) {
  const lid = Number(lessonId);
  if (!state.lessons[lid]) {
    state.lessons[lid] = mvpLessonGatesEmpty();
  }
  state.lessons[lid][`gate${gate}`] = true;
  touchStudyDay(state);
  if (typeof StoryReward !== "undefined") StoryReward.onStateChanged(state, { lessonId: lid });
  saveMvpState(state);
}

/** 进入某关即记「已使用」，用于空心海星（未满分） */
function touchLessonGate(state, lessonId, gate) {
  const lid = Number(lessonId);
  const g = Number(gate);
  if (Number.isNaN(lid) || Number.isNaN(g) || g < 0 || g > 3) return;
  if (!state.lessons[lid]) state.lessons[lid] = mvpLessonGatesEmpty();
  if (!state.lessons[lid].touched || typeof state.lessons[lid].touched !== "object") {
    state.lessons[lid].touched = {};
  }
  state.lessons[lid].touched[g] = true;
  saveMvpState(state);
}

function lessonGatePercent(state, lessonId) {
  const g = state.lessons[Number(lessonId)] || {};
  const done = [g.gate0, g.gate1, g.gate2, g.gate3].filter(Boolean).length;
  return Math.round((done / 4) * 100);
}

function addMvpMistake(state, item) {
  const entry = {
    id: Date.now() + Math.random(),
    lessonId: item.lessonId,
    questionId: item.questionId,
    question: item.question,
    userAnswer: item.userAnswer,
    correctAnswer: item.correctAnswer,
    explanation: item.explanation || "",
    grammarNodeId: item.grammarNodeId || "",
    wrongAt: item.wrongAt || new Date().toISOString(),
    reviewCount: 0,
  };
  state.mistakes = state.mistakes.filter((m) => m.questionId !== item.questionId);
  state.mistakes.unshift(entry);
  if (state.mistakes.length > 100) state.mistakes = state.mistakes.slice(0, 100);
  saveMvpState(state);
}

function removeMvpMistake(state, id) {
  state.mistakes = state.mistakes.filter((m) => m.id !== id);
  saveMvpState(state);
}

/** 错题产生后第 1、3、7 天提醒 */
function daysSinceWrong(wrongAt) {
  const start = new Date(wrongAt);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return Math.floor((now - start) / 86400000);
}

function isMistakeDue(m) {
  const d = daysSinceWrong(m.wrongAt);
  return d === 1 || d === 3 || d === 7 || d > 7;
}

function dueMistakes(state) {
  return state.mistakes.filter(isMistakeDue);
}

function weakGrammarTop3(state) {
  const counts = {};
  state.mistakes.forEach((m) => {
    if (!m.grammarNodeId) return;
    counts[m.grammarNodeId] = (counts[m.grammarNodeId] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, count]) => {
      const found = findNodeAcrossLessons(id);
      return {
        id,
        title: found?.node?.title || id,
        count,
      };
    });
}

function weekStudyDays(state) {
  const keys = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    keys.push(`${d.getFullYear()}-${m}-${day}`);
  }
  return keys.map((k) => ({ date: k, studied: state.studyDays.includes(k) }));
}

function markFlashSeen(state, lessonId, vocabId) {
  const lid = Number(lessonId);
  if (!state.flashProgress[lid]) state.flashProgress[lid] = { seen: [] };
  const seen = state.flashProgress[lid].seen;
  if (!seen.includes(vocabId)) seen.push(vocabId);
  touchStudyDay(state);
}

function clearMvpData() {
  localStorage.removeItem(MVP_STORAGE_KEY);
}
