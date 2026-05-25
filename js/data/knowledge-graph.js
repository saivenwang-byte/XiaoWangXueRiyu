/**
 * 知识点关联图 · 阶段 A（静态真源）
 * anchors：课内锚点 → conceptId[]
 * concepts：概念 → 跨课 refs（第 2 课起在提示中显示其他课）
 */
const KNOWLEDGE_GRAPH = {
  version: 1,
  concepts: {
    "particle-wa": {
      label: "助词は（读 wa）",
      refs: [
        { lessonId: 1, anchorId: "l1_g1", gate: 1, label: "第1课・はです", role: "intro" },
        { lessonId: 2, anchorId: "l2_g3", gate: 1, label: "第2课・は…の…です", role: "extend" },
      ],
    },
    "particle-no": {
      label: "名詞の「の」",
      refs: [
        { lessonId: 1, anchorId: "l1_g4", gate: 1, label: "第1课・の", role: "intro" },
        { lessonId: 2, anchorId: "l2_g3", gate: 1, label: "第2课・所属のの", role: "extend" },
      ],
    },
    "desu-plain": {
      label: "〜です（肯定）",
      refs: [
        { lessonId: 1, anchorId: "l1_g1", gate: 1, label: "第1课・はです", role: "intro" },
        { lessonId: 2, anchorId: "l2_g3", gate: 1, label: "第2课・です", role: "review" },
      ],
    },
    "desu-neg": {
      label: "〜ではありません",
      refs: [{ lessonId: 1, anchorId: "l1_g2", gate: 1, label: "第1课・否定", role: "intro" }],
    },
    "desu-question": {
      label: "〜ですか",
      refs: [
        { lessonId: 1, anchorId: "l1_g3", gate: 1, label: "第1课・ですか", role: "intro" },
        { lessonId: 1, anchorId: "l1_v_22", gate: 0, label: "第1课・はい/そうです", role: "review" },
      ],
    },
    "reply-hai-sou": {
      label: "はい、そうです",
      refs: [
        { lessonId: 1, anchorId: "l1_v_22", gate: 0, label: "第1课・はい", role: "intro" },
        { lessonId: 1, anchorId: "l1_dlg_0", gate: 2, label: "第1课・会話①", role: "review" },
      ],
    },
    "kore-sore-are": {
      label: "これ・それ・あれ",
      refs: [
        { lessonId: 2, anchorId: "l2_g1", gate: 1, label: "第2课・指示代词", role: "intro" },
        { lessonId: 1, anchorId: "l1_g4", gate: 1, label: "第1课・の（预告）", role: "preview" },
      ],
    },
    "kono-sono-ano": {
      label: "この・その・あの",
      refs: [{ lessonId: 2, anchorId: "l2_g2", gate: 1, label: "第2课・连体词", role: "intro" }],
    },
    "desu-ne": {
      label: "〜ですね",
      refs: [{ lessonId: 2, anchorId: "l2_g4", gate: 1, label: "第2课・ですね", role: "intro" }],
    },
    "san-suffix": {
      label: "〜さん",
      refs: [{ lessonId: 1, anchorId: "l1_v_4", gate: 0, label: "第1课・さん", role: "intro" }],
    },
  },
  anchors: {
    l1_g1: ["particle-wa", "desu-plain"],
    l1_g2: ["desu-neg"],
    l1_g3: ["desu-question"],
    l1_g4: ["particle-no", "kore-sore-are"],
    l1_v_4: ["san-suffix"],
    l1_v_22: ["desu-question", "reply-hai-sou"],
    l1_dlg_0: ["reply-hai-sou", "particle-no", "desu-question"],
    l2_g1: ["kore-sore-are"],
    l2_g2: ["kono-sono-ano"],
    l2_g3: ["particle-wa", "particle-no", "desu-plain"],
    l2_g4: ["desu-ne"],
  },
};
