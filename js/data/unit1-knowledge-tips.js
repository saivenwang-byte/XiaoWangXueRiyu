/** 第1单元第2–4课 · 知识卡（对齐第1课 L1KnowledgeTips 口径）
 * 生成：python scripts/build-unit1-knowledge-tips.py
 */
const Unit1KnowledgeTips = (function () {
  const conv = { label: "→ 会話", gate: 2 };
  const vocab = { label: "→ 単語", gate: 0 };

  const VOCAB = {
  "l2_v_1": {
    lines: [
      { zh: "课文：これは 本です。" },
      { zh: "これは离说话人近的事物；会話 A 轨常用。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_2": {
    lines: [
      { zh: "课文：それは 何ですか。" },
      { zh: "それ＝离听话人近；これ／あれ对照记忆。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_3": {
    lines: [
      { zh: "课文：あれは だれの 傘ですか。" },
      { zh: "あれ＝离双方都远；看不见场所用あそこ（第3课）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_4": {
    lines: [
      { zh: "どれが～ですか；不能单独どれですか。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g4" }],
  },
  "l2_v_5": {
    lines: [
      { zh: "本课：书；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_6": {
    lines: [
      { zh: "本课：杂志；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_7": {
    lines: [
      { zh: "本课：词典；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_8": {
    lines: [
      { zh: "本课：笔记本；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_9": {
    lines: [
      { zh: "本课：照相机；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_10": {
    lines: [
      { zh: "本课：伞；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_11": {
    lines: [
      { zh: "本课：鞋；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_12": {
    lines: [
      { zh: "本课：报纸；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_13": {
    lines: [
      { zh: "本课：电视机；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_14": {
    lines: [
      { zh: "本课：手机；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_15": {
    lines: [
      { zh: "本课：铅笔；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_16": {
    lines: [
      { zh: "本课：圆珠笔；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_17": {
    lines: [
      { zh: "本课：橡皮；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_18": {
    lines: [
      { zh: "本课：钱包；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_19": {
    lines: [
      { zh: "本课：钥匙；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_20": {
    lines: [
      { zh: "本课：电话；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_21": {
    lines: [
      { zh: "本课：书桌；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_22": {
    lines: [
      { zh: "本课：椅子；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_23": {
    lines: [
      { zh: "本课：地图；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_24": {
    lines: [
      { zh: "本课：照片；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_25": {
    lines: [
      { zh: "本课：汽车；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_26": {
    lines: [
      { zh: "本课：自行车；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_27": {
    lines: [
      { zh: "本课：名字；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_28": {
    lines: [
      { zh: "本课：什么；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_29": {
    lines: [
      { zh: "本课：是啊；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_30": {
    lines: [
      { zh: "本课：啊？（惊讶）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_31": {
    lines: [
      { zh: "本课：哪位（敬称）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_32": {
    lines: [
      { zh: "本课：国家（敬称）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_33": {
    lines: [
      { zh: "本课：位（敬称）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_34": {
    lines: [
      { zh: "本课：父亲（对外）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l2_v_35": {
    lines: [
      { zh: "本课：母亲（对外）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l2_g1" }],
  },
  "l3_v_1": {
    lines: [
      { zh: "课文：ここは デパートです。" },
      { zh: "ここは教室です；场所指示＝这里。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_2": {
    lines: [
      { zh: "课文：あそこが 図書館です。" },
      { zh: "そこは事務所です；那里。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_3": {
    lines: [
      { zh: "课文：あそこが 図書館です。" },
      { zh: "あそこは食堂です；远处场所。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_4": {
    lines: [
      { zh: "课文：トイレは どこですか。" },
      { zh: "教室はどこですか；疑问场所。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g2" }],
  },
  "l3_v_5": {
    lines: [
      { zh: "本课：百货商店；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_6": {
    lines: [
      { zh: "本课：邮局；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_7": {
    lines: [
      { zh: "本课：银行；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_8": {
    lines: [
      { zh: "本课：图书馆；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_9": {
    lines: [
      { zh: "本课：美术馆；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_10": {
    lines: [
      { zh: "本课：车站；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_11": {
    lines: [
      { zh: "本课：便利店；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_12": {
    lines: [
      { zh: "本课：公园；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_13": {
    lines: [
      { zh: "本课：动物园；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_14": {
    lines: [
      { zh: "本课：学校；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_15": {
    lines: [
      { zh: "本课：大学；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_16": {
    lines: [
      { zh: "本课：医院；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_17": {
    lines: [
      { zh: "本课：书店；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_18": {
    lines: [
      { zh: "本课：咖啡馆；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_19": {
    lines: [
      { zh: "本课：西餐厅；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_20": {
    lines: [
      { zh: "本课：厕所；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_21": {
    lines: [
      { zh: "本课：楼梯；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_22": {
    lines: [
      { zh: "本课：自动扶梯；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_23": {
    lines: [
      { zh: "本课：电梯；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_24": {
    lines: [
      { zh: "本课：～楼；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_25": {
    lines: [
      { zh: "本课：～日元；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_26": {
    lines: [
      { zh: "本课：多少钱；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_27": {
    lines: [
      { zh: "本课：一千日元；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_28": {
    lines: [
      { zh: "本课：一万日元；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_29": {
    lines: [
      { zh: "こちらは会社の食堂です；礼貌说法。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_30": {
    lines: [
      { zh: "そちらは会議室です。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_31": {
    lines: [
      { zh: "课文：銀行は あちらです。" },
      { zh: "あちらは受付です。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_32": {
    lines: [
      { zh: "お国はどちらですか。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g2" }],
  },
  "l3_v_33": {
    lines: [
      { zh: "本课：对面；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_34": {
    lines: [
      { zh: "本课：右边；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_35": {
    lines: [
      { zh: "本课：左边；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_36": {
    lines: [
      { zh: "本课：正中间；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_37": {
    lines: [
      { zh: "本课：道路；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_38": {
    lines: [
      { zh: "本课：红绿灯；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_39": {
    lines: [
      { zh: "本课：十字路口；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_40": {
    lines: [
      { zh: "本课：～丁目（街区）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_41": {
    lines: [
      { zh: "本课：～号（门牌）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l3_v_42": {
    lines: [
      { zh: "本课：请不要（敬语）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l3_g1" }],
  },
  "l4_v_1": {
    lines: [
      { zh: "课文：部屋に 机といすがあります。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_2": {
    lines: [
      { zh: "课文：部屋に 机といすがあります。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_3": {
    lines: [
      { zh: "本课：椅子；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_4": {
    lines: [
      { zh: "本课：包、手提包；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_5": {
    lines: [
      { zh: "课文：庭に 猫がいます。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_6": {
    lines: [
      { zh: "本课：狗；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_7": {
    lines: [
      { zh: "本课：箱子；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_8": {
    lines: [
      { zh: "本课：电、电灯；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_9": {
    lines: [
      { zh: "本课：书架；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_10": {
    lines: [
      { zh: "本课：被褥；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_11": {
    lines: [
      { zh: "本课：榻榻米；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_12": {
    lines: [
      { zh: "本课：画、图画；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_13": {
    lines: [
      { zh: "本课：汽车；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_14": {
    lines: [
      { zh: "本课：自行车；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_15": {
    lines: [
      { zh: "本课：记事本；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_16": {
    lines: [
      { zh: "本课：照片；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_17": {
    lines: [
      { zh: "课文：机の上に 本が三冊あります。" },
      { zh: "机の上に…；方位名词+の+名词。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g4" }],
  },
  "l4_v_18": {
    lines: [
      { zh: "机の下に…" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g4" }],
  },
  "l4_v_19": {
    lines: [
      { zh: "駅の前に…" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g4" }],
  },
  "l4_v_20": {
    lines: [
      { zh: "いすの後ろに…" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g4" }],
  },
  "l4_v_21": {
    lines: [
      { zh: "本课：左边；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_22": {
    lines: [
      { zh: "本课：右边；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_23": {
    lines: [
      { zh: "课文：かばんの 中に 何がありますか。" },
      { zh: "箱の中に…" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g4" }],
  },
  "l4_v_24": {
    lines: [
      { zh: "本课：外面；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_25": {
    lines: [
      { zh: "隣に…＝旁边。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g4" }],
  },
  "l4_v_26": {
    lines: [
      { zh: "本课：附近；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_27": {
    lines: [
      { zh: "本课：之间；结合会話 ABC 的 A 轨朗读。" },
      { zh: "存在句：场所+に+物が+あります／人が+います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_28": {
    lines: [
      { zh: "本课：有（非生物）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_29": {
    lines: [
      { zh: "本课：有、在（生物）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_30": {
    lines: [
      { zh: "课文：部屋に 机といすがあります。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_31": {
    lines: [
      { zh: "本课：和（部分列举）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_32": {
    lines: [
      { zh: "本课：等等；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_33": {
    lines: [
      { zh: "本课：任何地方都不（+否定）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_34": {
    lines: [
      { zh: "本课：完全（+否定/肯定）；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  "l4_v_35": {
    lines: [
      { zh: "本课：非常、不得了；结合会話 ABC 的 A 轨朗读。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l4_g1" }],
  },
  };

  const HW_BY_LESSON = {
  2: {
    "発音": { lines: [{ zh: "「は」读 wa；「の」轻读。" }], links: [conv] },
    "選択": { lines: [{ zh: "これ／それ／あれ＋です；この／その／あの＋名词。" }], links: [conv] },
    "総合": { lines: [{ zh: "Q12：指示词+所属だれの。" }], links: [conv] },
  },
  3: {
    "選択": { lines: [{ zh: "ここ・そこ・あそこ＋は…ですか。" }], links: [conv] },
    "総合": { lines: [{ zh: "Q12：场所+は+名词；あそこは…です（新信息）。" }], links: [conv] },
  },
  4: {
    "活用": { lines: [{ zh: "あります／います；いる只用于有生命。" }], links: [conv] },
    "総合": { lines: [{ zh: "Q12：存在句+数量いくつ。" }], links: [conv] },
  },
  };

  const EXT_BY_LESSON = {
  2: {
    "grammar": { lines: [{ zh: "これ・それ・あれ／この・その・あの／～の～です。" }], links: [conv] },
    "mistakes": { lines: [{ zh: "×どれですか → ○どれが～ですか。" }], links: [conv] },
  },
  3: {
    "grammar": { lines: [{ zh: "ここ・そこ・あそこ；こちら系列；どこですか。" }], links: [conv] },
    "mistakes": { lines: [{ zh: "あれ（物）vs あそこ（场所）。" }], links: [conv] },
  },
  4: {
    "grammar": { lines: [{ zh: "あります／います；に存在；方位词+の。" }], links: [conv] },
    "mistakes": { lines: [{ zh: "×机の上に猫があります → ○猫がいます。" }], links: [conv] },
  },
  };

  const HW_DEFAULT = {
    発音: { lines: [{ zh: "注意「は」读 wa；长音表记与课本一致。" }], links: [vocab] },
    活用: { lines: [{ zh: "本课名词句为主；动词活用从第5课起。" }], links: [vocab] },
    選択: { lines: [{ zh: "助词・指示词题对照课文。" }], links: [conv] },
    穴埋め: { lines: [{ zh: "填空保留です／じゃありません。" }], links: [conv] },
    翻訳: { lines: [{ zh: "日译中保留指示词距离感。" }], links: [conv] },
    総合: { lines: [{ zh: "综合题对照当课课文与 gate Q12。" }], links: [conv] },
    間違い: { lines: [{ zh: "改错：指示词距离・どれが。" }], links: [conv] },
    作文: { lines: [{ zh: "用本课句型描述身边物品/场所。" }], links: [conv] },
    聴解: { lines: [{ zh: "听力配合🔊；先听会話 A 轨。" }], links: [conv] },
    小テスト: { lines: [{ zh: "交互小测12题；错题回文法节点。" }], links: [conv] },
  };

  const EXT_DEFAULT = {
    pronunciation: { lines: [{ zh: "发音要点见 summaryBlocks。" }], links: [vocab] },
    etymology: { lines: [{ zh: "词源注释助记。" }], links: [vocab] },
    preview: { lines: [{ zh: "预告下单元语法，先识读。" }], links: [vocab] },
    honorific: { lines: [{ zh: "です＝丁寧体；普通体第22课。" }], links: [conv] },
    template: { lines: [{ zh: "模板块替换［］口头练习。" }], links: [conv] },
    mistakes: { lines: [{ zh: "常见误用对照课文句型。" }], links: [conv] },
    keyPoints: { lines: [{ zh: "会話要点=课文关键词。" }], links: [conv] },
    rolePlay: { lines: [{ zh: "角色扮演替换物品/场所名词。" }], links: [conv] },
    grammar: { lines: [{ zh: "文法まとめ=当课节点。" }], links: [{ label: "→ 文法", gate: 1 }] },
    basicText: { lines: [{ zh: "基本课文=文法主干。" }], links: [conv] },
  };

  function vocabTip(v) {
    if (!v) return null;
    return VOCAB[v.id] || null;
  }

const DIALOGUE_BY_LESSON = {
  2: [
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 1 句"
            },
            {
                "ja": "李さん、それは 何ですか。",
                "zh": "李小姐，那是什么？"
            },
            {
                "zh": "应答（李）：这是我家人的照片。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 2 句"
            },
            {
                "ja": "これは 私の 家族の 写真です。",
                "zh": "这是我家人的照片。"
            },
            {
                "zh": "应答（小野）：这位是谁？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 3 句"
            },
            {
                "ja": "この 方は どなたですか。",
                "zh": "这位是谁？"
            },
            {
                "zh": "应答（李）：是我父亲。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 4 句"
            },
            {
                "ja": "私の 父です。",
                "zh": "是我父亲。"
            },
            {
                "zh": "应答（小野）：您父亲多大岁数？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 5 句"
            },
            {
                "ja": "お父さんは おいくつですか。",
                "zh": "您父亲多大岁数？"
            },
            {
                "zh": "应答（李）：五十八岁。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 6 句"
            },
            {
                "ja": "五十八歳です。",
                "zh": "五十八岁。"
            },
            {
                "zh": "应答（小野）：是吗。那么，这是？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 7 句"
            },
            {
                "ja": "そうですか。じゃ、これは？",
                "zh": "是吗。那么，这是？"
            },
            {
                "zh": "应答（李）：那也是父亲。年轻时的照片。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 8 句"
            },
            {
                "ja": "それも 父です。若い 時の 写真です。",
                "zh": "那也是父亲。年轻时的照片。"
            },
            {
                "zh": "应答（小野）：啊，是同一个人吗。气质不一样呢。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 9 句"
            },
            {
                "ja": "えっ、同じ 方ですか。雰囲気が 違いますね。",
                "zh": "啊，是同一个人吗。气质不一样呢。"
            },
            {
                "zh": "应答（李）：是的。这张照片是二十岁时的父亲。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 10 句"
            },
            {
                "ja": "はい。この 写真は 二十歳の 時の 父です。",
                "zh": "是的。这张照片是二十岁时的父亲。"
            },
            {
                "zh": "应答（小野）：那是谁的照片？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 11 句"
            },
            {
                "ja": "あれは どなたの 写真ですか。",
                "zh": "那是谁的照片？"
            },
            {
                "zh": "应答（李）：是我母亲。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 12 句"
            },
            {
                "ja": "私の 母です。",
                "zh": "是我母亲。"
            },
            {
                "zh": "应答（小野）：看上去是很和蔼的人。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「家族の写真」· 第 13 句"
            },
            {
                "ja": "優しそうな 方ですね。",
                "zh": "看上去是很和蔼的人。"
            },
            {
                "zh": "应答（李）：谢谢。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l2_g1"
            }
        ]
    }
],
  3: [
    {
        "lines": [
            {
                "zh": "场景「ホテルの周辺」· 第 1 句"
            },
            {
                "ja": "李さん、ここは あなたの ホテルですか。",
                "zh": "李小姐，这是您的酒店吗？"
            },
            {
                "zh": "应答（李）：是的。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l3_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「ホテルの周辺」· 第 2 句"
            },
            {
                "ja": "はい、そうです。",
                "zh": "是的。"
            },
            {
                "zh": "应答（小野）：那边是公园。很漂亮哦。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l3_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「ホテルの周辺」· 第 3 句"
            },
            {
                "ja": "あそこが 公園です。とても きれいですよ。",
                "zh": "那边是公园。很漂亮哦。"
            },
            {
                "zh": "应答（李）：是吗。那座红色的建筑是什么？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l3_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「ホテルの周辺」· 第 4 句"
            },
            {
                "ja": "そうですか。あの 赤い 建物は 何ですか。",
                "zh": "是吗。那座红色的建筑是什么？"
            },
            {
                "zh": "应答（小野）：那是车站。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l3_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「ホテルの周辺」· 第 5 句"
            },
            {
                "ja": "あれは 駅です。",
                "zh": "那是车站。"
            },
            {
                "zh": "应答（李）：那么，便利店在哪儿？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l3_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「ホテルの周辺」· 第 6 句"
            },
            {
                "ja": "じゃ、コンビニは どこですか。",
                "zh": "那么，便利店在哪儿？"
            },
            {
                "zh": "应答（小野）：便利店在那边。在酒店旁边。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l3_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「ホテルの周辺」· 第 7 句"
            },
            {
                "ja": "コンビニは あそこです。ホテルの 隣です。",
                "zh": "便利店在那边。在酒店旁边。"
            },
            {
                "zh": "应答（李）：银行在哪儿？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l3_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「ホテルの周辺」· 第 8 句"
            },
            {
                "ja": "銀行は どこに ありますか。",
                "zh": "银行在哪儿？"
            },
            {
                "zh": "应答（小野）：银行在那边十字路口的左侧。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l3_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「ホテルの周辺」· 第 9 句"
            },
            {
                "ja": "銀行は あちらの 交差点の 左です。",
                "zh": "银行在那边十字路口的左侧。"
            },
            {
                "zh": "应答（李）：餐厅呢？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l3_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「ホテルの周辺」· 第 10 句"
            },
            {
                "ja": "レストランは？",
                "zh": "餐厅呢？"
            },
            {
                "zh": "应答（小野）：餐厅在百货商店里面。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l3_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「ホテルの周辺」· 第 11 句"
            },
            {
                "ja": "レストランは デパートの 中に あります。",
                "zh": "餐厅在百货商店里面。"
            },
            {
                "zh": "应答（李）：小野，非常感谢。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l3_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「ホテルの周辺」· 第 12 句"
            },
            {
                "ja": "小野さん、どうも ありがとうございます。",
                "zh": "小野，非常感谢。"
            },
            {
                "zh": "应答（小野）：不客气。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l3_g1"
            }
        ]
    }
],
  4: [
    {
        "lines": [
            {
                "zh": "场景「部屋の様子」· 第 1 句"
            },
            {
                "ja": "李さん、部屋は どうですか。",
                "zh": "李小姐，房间怎么样？"
            },
            {
                "zh": "应答（李）：非常漂亮。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l4_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「部屋の様子」· 第 2 句"
            },
            {
                "ja": "とても きれいです。",
                "zh": "非常漂亮。"
            },
            {
                "zh": "应答（小野）：有什么？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l4_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「部屋の様子」· 第 3 句"
            },
            {
                "ja": "何が ありますか。",
                "zh": "有什么？"
            },
            {
                "zh": "应答（李）：有桌子、椅子和床。桌子上有电脑、书之类的东西。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l4_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「部屋の様子」· 第 4 句"
            },
            {
                "ja": "机と 椅子と ベッドが あります。机の上に パソコンや 本などが あります。",
                "zh": "有桌子、椅子和床。桌子上有电脑、书之类的东西。"
            },
            {
                "zh": "应答（小野）：窗户旁边有什么？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l4_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「部屋の様子」· 第 5 句"
            },
            {
                "ja": "窓の 隣に 何が ありますか。",
                "zh": "窗户旁边有什么？"
            },
            {
                "zh": "应答（李）：有书架。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l4_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「部屋の様子」· 第 6 句"
            },
            {
                "ja": "本棚が あります。",
                "zh": "有书架。"
            },
            {
                "zh": "应答（小野）：床底下有什么吗？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l4_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「部屋の様子」· 第 7 句"
            },
            {
                "ja": "ベッドの 下に 何か ありますか。",
                "zh": "床底下有什么吗？"
            },
            {
                "zh": "应答（李）：有，有鞋子。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l4_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「部屋の様子」· 第 8 句"
            },
            {
                "ja": "はい、靴が あります。",
                "zh": "有，有鞋子。"
            },
            {
                "zh": "应答（小野）：电视在哪儿？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l4_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「部屋の様子」· 第 9 句"
            },
            {
                "ja": "テレビは どこに ありますか。",
                "zh": "电视在哪儿？"
            },
            {
                "zh": "应答（李）：电视挂在桌子前面的墙上。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l4_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「部屋の様子」· 第 10 句"
            },
            {
                "ja": "テレビは 机の 前の 壁に かかっています。",
                "zh": "电视挂在桌子前面的墙上。"
            },
            {
                "zh": "应答（小野）：是吗。有猫吗？"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l4_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「部屋の様子」· 第 11 句"
            },
            {
                "ja": "そうですか。猫は いますか。",
                "zh": "是吗。有猫吗？"
            },
            {
                "zh": "应答（李）：没有猫。不过院子里有小鸟。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l4_g1"
            }
        ]
    },
    {
        "lines": [
            {
                "zh": "场景「部屋の様子」· 第 12 句"
            },
            {
                "ja": "いいえ、猫は いません。でも、庭に 小鳥が います。",
                "zh": "没有猫。不过院子里有小鸟。"
            },
            {
                "zh": "应答（小野）：房间不错啊。"
            }
        ],
        "links": [
            {
                "label": "→ 会話",
                "gate": 2
            },
            {
                "label": "→ 文法",
                "gate": 1,
                "ref": "l4_g1"
            }
        ]
    }
]
};

  function dialogue(sceneIdx, lessonId) {
    const lid = Number(lessonId);
    const list = DIALOGUE_BY_LESSON[lid];
    if (!list) return null;
    return list[sceneIdx] || null;
  }

  function grammar(node) {
    if (!node) return null;
    const zh = (node.explanationZh || node.titleZh || "").trim();
    if (!zh) return null;
    const lines = String(zh).split(/\n+/)
      .slice(0, 4)
      .map((t) => ({ zh: t.trim() }))
      .filter((l) => l.zh);
    return lines.length ? { lines, links: [conv, vocab] } : null;
  }

  function homeworkTitle(title, lessonId) {
    const lid = Number(lessonId);
    const per = HW_BY_LESSON[lid];
    const t = title || "";
    if (per) {
      for (const k of Object.keys(per)) {
        if (t.includes(k)) return per[k];
      }
    }
    for (const k of Object.keys(HW_DEFAULT)) {
      if (t.includes(k)) return HW_DEFAULT[k];
    }
    return { lines: [{ zh: "对照课本・会話・文法完成本块。" }], links: [conv] };
  }

  function extensionKey(key, title, lessonId) {
    const lid = Number(lessonId);
    const per = EXT_BY_LESSON[lid];
    const pool = per ? { ...EXT_DEFAULT, ...per } : EXT_DEFAULT;
    if (key && pool[key]) return pool[key];
    const tit = title || "";
    if (tit.includes("テンプレート") || tit.includes("模板")) return pool.template;
    if (tit.includes("誤り") || tit.includes("误用")) return pool.mistakes;
    if (tit.includes("キーポイント")) return pool.keyPoints;
    if (tit.includes("ロールプレイ") || tit.includes("扮演")) return pool.rolePlay;
    return { lines: [{ zh: "本块与当课五关交叉对照。" }], links: [conv] };
  }

  return { vocab: vocabTip, dialogue, grammar, homeworkTitle, extensionKey };
})();
