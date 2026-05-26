/** 第2单元第5–8课 · 知识卡（对齐第1课 L1KnowledgeTips 口径）
 * 生成：python scripts/build-unit2-knowledge-tips.py
 */
const Unit2KnowledgeTips = (function () {
  const conv = { label: "→ 会話", gate: 2 };
  const vocab = { label: "→ 単語", gate: 0 };

  const VOCAB = {
  "l5_v_1": {
    lines: [
      { zh: "课文：森さんは７時に起きます。" },
      { zh: "具体时刻＋に；2类动词ます形。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g3" }],
  }},
  "l5_v_2": {
    lines: [
      { zh: "课文：昨日、何時に寝ましたか。" },
      { zh: "过去式「寝ました」问睡觉时间。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_3": {
    lines: [
      { zh: "课文：田中さんは９時から５時まで働きます。" },
      { zh: "から～まで＝从…到…；时间段。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g4" }],
  }},
  "l5_v_4": {
    lines: [
      { zh: "休みます；会社を休みます＝请假。" },
      { zh: "ます形四种时态见单词栏。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g1" }],
  }},
  "l5_v_5": {
    lines: [
      { zh: "勉強します；サ変动词。" },
      { zh: "図書館で勉強します（第6课で）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g1" }],
  }},
  "l5_v_6": {
    lines: [
      { zh: "结束；ます形叙述日常作息。" },
      { zh: "时间用に／から～まで。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g1" }],
  }},
  "l5_v_7": {
    lines: [
      { zh: "百货商店；场所へ行きます／で働きます（第6课）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g1" }],
  }},
  "l5_v_8": {
    lines: [
      { zh: "银行；场所へ行きます／で働きます（第6课）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g1" }],
  }},
  "l5_v_9": {
    lines: [
      { zh: "图书馆；场所へ行きます／で働きます（第6课）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g1" }],
  }},
  "l5_v_10": {
    lines: [
      { zh: "美术馆；场所へ行きます／で働きます（第6课）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g1" }],
  }},
  "l5_v_11": {
    lines: [
      { zh: "表现在时刻；今何時ですか。" },
      { zh: "现在；本课时间表达。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g3" }],
  }},
  "l5_v_12": {
    lines: [
      { zh: "～時＝…点；７時、９時。" },
      { zh: "音变：4=よじ、7=しち、9=くじ（见发音块）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_13": {
    lines: [
      { zh: "～分；１０分、３０分。" },
      { zh: "６時半＝6:30（半＝はん）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_14": {
    lines: [
      { zh: "６時半に起きます。（课文）" },
      { zh: "半读はん；附在时刻后。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_15": {
    lines: [
      { zh: "午前９時；上午时段。" },
      { zh: "上午；本课时间表达。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_16": {
    lines: [
      { zh: "午後３時；下午。" },
      { zh: "下午；本课时间表达。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_17": {
    lines: [
      { zh: "毎朝６時に起きます。（课文）" },
      { zh: "早上；本课时间表达。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g3" }],
  }},
  "l5_v_18": {
    lines: [
      { zh: "毎晩１０時に寝ます。" },
      { zh: "晚上；本课时间表达。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_19": {
    lines: [
      { zh: "夜１１時；与晩区分了解。" },
      { zh: "夜晚；本课时间表达。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_20": {
    lines: [
      { zh: "毎朝６時半に起きます。" },
      { zh: "每天早上。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g3" }],
  }},
  "l5_v_21": {
    lines: [
      { zh: "毎晩寝ます；频率后接ます形，不加に。" },
      { zh: "每天晚上。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_22": {
    lines: [
      { zh: "毎日働きます；与钟点「に」并用注意语序。" },
      { zh: "每天。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_23": {
    lines: [
      { zh: "毎週１回；本课先识读。" },
      { zh: "每周。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_24": {
    lines: [
      { zh: "毎月；时间频率副词。" },
      { zh: "每月。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_25": {
    lines: [
      { zh: "毎年；与来月等名词区分。" },
      { zh: "每年。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_26": {
    lines: [
      { zh: "いつも＝总是；第7课再系统讲程度。" },
      { zh: "总是。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_27": {
    lines: [
      { zh: "たいてい＝大致；后接肯定。" },
      { zh: "大致、通常。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_28": {
    lines: [
      { zh: "時々；第7课与频率副词对比。" },
      { zh: "有时。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_29": {
    lines: [
      { zh: "あまり～ない；本课预习，须否定。" },
      { zh: "不太～（后接否定）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_30": {
    lines: [
      { zh: "全然～ない；须否定。" },
      { zh: "完全（不～）（后接否定）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g2" }],
  }},
  "l5_v_31": {
    lines: [
      { zh: "それから＝然后；连接时间顺序。" },
      { zh: "接続词，放句首。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l5_g1" }],
  }},
  "l6_v_1": {
    lines: [
      { zh: "课文：来月中国へ行きます。" },
      { zh: "移动方向へ；未来用ます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_2": {
    lines: [
      { zh: "3类カ変；友達が来ます。" },
      { zh: "起点から：東京から来ました。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_3": {
    lines: [
      { zh: "私はバスで家へ帰ります。（课文）" },
      { zh: "帰る＝回去；へ方向。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_4": {
    lines: [
      { zh: "電車で行きます。" },
      { zh: "手段・交通工具＋で。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g3" }],
  }},
  "l6_v_5": {
    lines: [
      { zh: "私はバスで家へ帰ります。（课文）" },
      { zh: "手段・交通工具＋で。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g3" }],
  }},
  "l6_v_6": {
    lines: [
      { zh: "タクシーで；で＋交通工具。" },
      { zh: "手段・交通工具＋で。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g3" }],
  }},
  "l6_v_7": {
    lines: [
      { zh: "自転車で；也可歩いて。" },
      { zh: "手段・交通工具＋で。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g3" }],
  }},
  "l6_v_8": {
    lines: [
      { zh: "飛行機で；ひこうき＝飛行機表记。" },
      { zh: "手段・交通工具＋で。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g3" }],
  }},
  "l6_v_9": {
    lines: [
      { zh: "フェリーで渡ります。" },
      { zh: "手段・交通工具＋で。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g3" }],
  }},
  "l6_v_10": {
    lines: [
      { zh: "李さんは新幹線で大阪へ行きました。（课文）" },
      { zh: "手段・交通工具＋で。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g3" }],
  }},
  "l6_v_11": {
    lines: [
      { zh: "歩いて帰ります；て形表方式。" },
      { zh: "×歩くで → ○歩いて（不再加で）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g3" }],
  }},
  "l6_v_12": {
    lines: [
      { zh: "友達と行きます（と＝和，第11课）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_13": {
    lines: [
      { zh: "一人で行きます＝独自。" },
      { zh: "で表方式／状态。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g3" }],
  }},
  "l6_v_14": {
    lines: [
      { zh: "来月中国へ行きます。（课文）" },
      { zh: "下个月；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_15": {
    lines: [
      { zh: "先月行きました；过去用ました。" },
      { zh: "上个月；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_16": {
    lines: [
      { zh: "今月；时间名词。" },
      { zh: "这个月；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_17": {
    lines: [
      { zh: "来週；へ行きます。" },
      { zh: "下周；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_18": {
    lines: [
      { zh: "先週帰りました。" },
      { zh: "上周；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_19": {
    lines: [
      { zh: "今週。" },
      { zh: "本周；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_20": {
    lines: [
      { zh: "来年；将来。" },
      { zh: "明年；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_21": {
    lines: [
      { zh: "去年行きました。" },
      { zh: "去年；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_22": {
    lines: [
      { zh: "今年。" },
      { zh: "今年；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_23": {
    lines: [
      { zh: "明日行きます。" },
      { zh: "明天；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_24": {
    lines: [
      { zh: "昨日帰りました。" },
      { zh: "昨天；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_25": {
    lines: [
      { zh: "明後日。" },
      { zh: "后天；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_26": {
    lines: [
      { zh: "一昨日。" },
      { zh: "前天；时间词修饰行きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_27": {
    lines: [
      { zh: "どこへ行きますか。" },
      { zh: "疑问词+へ。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g4" }],
  }},
  "l6_v_28": {
    lines: [
      { zh: "何で行きますか＝用什么方式。" },
      { zh: "何＋で。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g4" }],
  }},
  "l6_v_29": {
    lines: [
      { zh: "方向助词：中国へ行きます。" },
      { zh: "强调方向；到达也可用に。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_30": {
    lines: [
      { zh: "手段：バスで、新幹線で。" },
      { zh: "≠第8课语言で；本课=交通方式。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g3" }],
  }},
  "l6_v_31": {
    lines: [
      { zh: "起点：東京から京都まで。" },
      { zh: "与まで成对。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g2" }],
  }},
  "l6_v_32": {
    lines: [
      { zh: "终点：５時まで働きます（第5课）／大阪まで。" },
      { zh: "から～まで。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g2" }],
  }},
  "l6_v_33": {
    lines: [
      { zh: "ちょっと待ってください；一会儿。" },
      { zh: "第14课てください再学。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_34": {
    lines: [
      { zh: "真っ直ぐ行ってください；方向指示。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g1" }],
  }},
  "l6_v_35": {
    lines: [
      { zh: "どのぐらい＝多久／多远。" },
      { zh: "本课问路程时间。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l6_g5" }],
  }},
  "l7_v_1": {
    lines: [
      { zh: "课文：李さんは毎日コーヒーを飲みます。他动+を。" },
      { zh: "1类动词；对象「コーヒーを」、时间「毎日」不加に。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_2": {
    lines: [
      { zh: "買います＋を：本を買います。1类。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_3": {
    lines: [
      { zh: "撮ります＋を：写真を撮ります。会話常用。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_4": {
    lines: [
      { zh: "書きます＋を：手紙を書きます（第8课でで）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_5": {
    lines: [
      { zh: "読みます＋を：本を読みます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_6": {
    lines: [
      { zh: "聞きます：音楽を聞きます／先生に聞きます（问）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_7": {
    lines: [
      { zh: "2类「食べます」；ご飯を食べます。辞書食べる。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_8": {
    lines: [
      { zh: "2类「見ます」；课文：映画を見ませんか。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g3" }],
  }},
  "l7_v_9": {
    lines: [
      { zh: "会話：コーヒーにします＝选咖啡；选择用「に」不用「を」。" },
      { zh: "×コーヒーをします → ○にします。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g4" }],
  }},
  "l7_v_10": {
    lines: [
      { zh: "サ変「掃除します」；部屋を掃除します。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_11": {
    lines: [
      { zh: "名词；点单「コーヒーをください」或「コーヒーにします」。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g4" }],
  }},
  "l7_v_12": {
    lines: [
      { zh: "「お茶」⓪；美化语「お～」。お茶にします。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g4" }],
  }},
  "l7_v_13": {
    lines: [
      { zh: "牛乳を飲みます／牛乳にします。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_14": {
    lines: [
      { zh: "ジュース①型；を／に 搭配。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_15": {
    lines: [
      { zh: "ビールを飲みます；注意を宾语。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_16": {
    lines: [
      { zh: "パンを食べます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_17": {
    lines: [
      { zh: "卵を食べます；数量第13课。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_18": {
    lines: [
      { zh: "りんご⓪；林檎＝苹果；りんごを食べます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_19": {
    lines: [
      { zh: "みかん①；みかんを一つ（第13课）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_20": {
    lines: [
      { zh: "手紙を書きます；第8课「日本語で書きます」。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_21": {
    lines: [
      { zh: "写真を撮ります。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_22": {
    lines: [
      { zh: "日記を書きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_23": {
    lines: [
      { zh: "音楽を聞きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_24": {
    lines: [
      { zh: "课文：一緒に映画を見ませんか。对象映画を。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g3" }],
  }},
  "l7_v_25": {
    lines: [
      { zh: "课文：時々テニスをします。频率+を。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g2" }],
  }},
  "l7_v_26": {
    lines: [
      { zh: "サッカーをします。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_27": {
    lines: [
      { zh: "テレビを見ます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_28": {
    lines: [
      { zh: "ラジオを聞きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l7_v_29": {
    lines: [
      { zh: "频率100%；いつも＋肯定：いつもコーヒーを飲みます。" },
      { zh: "不与「あまり／ぜんぜん」混用。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g2" }],
  }},
  "l7_v_30": {
    lines: [
      { zh: "よく＝80%；よく運動します。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g2" }],
  }},
  "l7_v_31": {
    lines: [
      { zh: "课文：時々テニスをします。50%频率。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g2" }],
  }},
  "l7_v_32": {
    lines: [
      { zh: "あまり～ない＝不太；あまり食べません。" },
      { zh: "×あまり食べます → 须否定。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g2" }],
  }},
  "l7_v_33": {
    lines: [
      { zh: "ぜんぜん～ない＝完全不；ぜんぜん分かりません。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g2" }],
  }},
  "l7_v_34": {
    lines: [
      { zh: "一緒に映画を見ませんか。邀请固定搭配。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g3" }],
  }},
  "l7_v_35": {
    lines: [
      { zh: "课文：昨日、何を食べましたか。疑问词何+を。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l7_g1" }],
  }},
  "l8_v_1": {
    lines: [
      { zh: "课文：日本語で手紙を書きます。手段・语言用「で」。" },
      { zh: "≠第6课交通で；本课=工具/语言。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_2": {
    lines: [
      { zh: "差します：名刺を差します。递名片/伞。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_3": {
    lines: [
      { zh: "渡します：物を人に渡します。≠あげる（给予立场不同）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g2" }],
  }},
  "l8_v_4": {
    lines: [
      { zh: "教えます：日本語を教えます。を+に。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g2" }],
  }},
  "l8_v_5": {
    lines: [
      { zh: "もらいます：友達から CD をもらいました。" },
      { zh: "视点=接受者；に／から 均可。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g4" }],
  }},
  "l8_v_6": {
    lines: [
      { zh: "あげます：私は妹にプレゼントをあげます。" },
      { zh: "主语=给予者；对长辈慎用あげる。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g2" }],
  }},
  "l8_v_7": {
    lines: [
      { zh: "くれます：先生がお菓子をくれました。" },
      { zh: "主语=给予方；不能用于「我给别人」。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g3" }],
  }},
  "l8_v_8": {
    lines: [
      { zh: "借ります：本を借ります。借入。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_9": {
    lines: [
      { zh: "貸します：本を貸します。借出。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_10": {
    lines: [
      { zh: "電話します；で電話する（方式）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_11": {
    lines: [
      { zh: "课文：日本語で手紙を書きます。手紙を。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_12": {
    lines: [
      { zh: "葉書を書きます；はがき⓪。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_13": {
    lines: [
      { zh: "会話：これ、プレゼントです。授受核心名词。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g2" }],
  }},
  "l8_v_14": {
    lines: [
      { zh: "品物をあげる／もらう。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g2" }],
  }},
  "l8_v_15": {
    lines: [
      { zh: "文房具を買います。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_16": {
    lines: [
      { zh: "はさみで；工具+で。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_17": {
    lines: [
      { zh: "はしで食べます；筷子。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_18": {
    lines: [
      { zh: "スプーンで；餐具+で。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_19": {
    lines: [
      { zh: "ナイフで切ります。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_20": {
    lines: [
      { zh: "箱に入れます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_21": {
    lines: [
      { zh: "レコードをもらいました。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g4" }],
  }},
  "l8_v_22": {
    lines: [
      { zh: "テープを聞きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_23": {
    lines: [
      { zh: "紙で；用纸张。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_24": {
    lines: [
      { zh: "消しゴム⓪；文具。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_25": {
    lines: [
      { zh: "辞書で調べます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_26": {
    lines: [
      { zh: "日本語で手紙を書きます。语言+で。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_27": {
    lines: [
      { zh: "英語で話します。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_28": {
    lines: [
      { zh: "中国語でメールを書きます。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_29": {
    lines: [
      { zh: "何語で話しますか。疑问词+で。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_30": {
    lines: [
      { zh: "見た目がきれいです（第10课ナ形）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_31": {
    lines: [
      { zh: "使い方＝用法；～方（第22课）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_32": {
    lines: [
      { zh: "自己紹介をします；で+语言介绍。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_33": {
    lines: [
      { zh: "趣味は何ですか。会話话题。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_34": {
    lines: [
      { zh: "形動「得意」；歌が得意です（第11课）。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g2" }],
  }},
  "l8_v_35": {
    lines: [
      { zh: "形動「下手」；料理が下手です。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g2" }],
  }},
  "l8_v_36": {
    lines: [
      { zh: "日本から来ました；国名。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_37": {
    lines: [
      { zh: "中国の友達；所属の。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g1" }],
  }},
  "l8_v_38": {
    lines: [
      { zh: "今回のプレゼント；连体词。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g2" }],
  }},
  "l8_v_39": {
    lines: [
      { zh: "どちらが作りましたか。敬称疑问。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g4" }],
  }},
  "l8_v_40": {
    lines: [
      { zh: "もちろん、喜んで。当然。" },
    ],
    links: [conv, { label: "→ 文法", gate: 1, ref: "l8_g3" }],
  }},
  };

  const HW_BY_LESSON = {
  5: {
    "発音": { lines: [{ zh: "「時・分」音变：4=よじ、7=しち、9=くじ；半＝はん。" }], links: [conv] },
    "活用": { lines: [{ zh: "ます／ません／ました／ませんでした四种时态。" }], links: [conv] },
    "選択": { lines: [{ zh: "具体时刻＋に；から～まで＝时间段。" }], links: [conv] },
    "穴埋め": { lines: [{ zh: "×毎朝に起きます → ○毎朝起きます（频率不加に）。" }], links: [conv] },
    "翻訳": { lines: [{ zh: "中译日：几点用「何時に」；half past 用「半」。" }], links: [conv] },
    "総合": { lines: [{ zh: "Q12：に时刻、からまで、ます形敬体。" }], links: [conv] },
    "作文": { lines: [{ zh: "写一日作息：［時刻］に起きます／働きます。" }], links: [conv] },
  }},
  6: {
    "発音": { lines: [{ zh: "交通工具名词声调稳定；ひこうき→飛行機。" }], links: [conv] },
    "選択": { lines: [{ zh: "へ方向；で手段；から～まで起终点。" }], links: [conv] },
    "穴埋め": { lines: [{ zh: "×歩くで帰る → ○歩いて帰る。" }], links: [conv] },
    "総合": { lines: [{ zh: "Q12：新幹線で大阪へ；助词搭配。" }], links: [conv] },
    "作文": { lines: [{ zh: "来月［场所］へ［で］行きます。" }], links: [conv] },
  }},
  7: {
    "発音": { lines: [{ zh: "动词分类先识读；本课他动+を。" }], links: [conv] },
    "活用": { lines: [{ zh: "他动词四种ます形；を+宾语。" }], links: [conv] },
    "選択": { lines: [{ zh: "を宾语／に选择／あまり・ぜんぜん+否定。" }], links: [conv] },
    "総合": { lines: [{ zh: "Q12 敬体ます与を搭配。" }], links: [conv] },
    "間違い": { lines: [{ zh: "×コーヒーをします → ○にします。" }], links: [conv] },
    "作文": { lines: [{ zh: "用频率副词+を+ませんか写邀请。" }], links: [conv] },
  }},
  8: {
    "選択": { lines: [{ zh: "で手段 vs 第6课交通で；授受方向。" }], links: [conv] },
    "総合": { lines: [{ zh: "Q12 日本語で／あげる・くれる・もらう。" }], links: [conv] },
    "間違い": { lines: [{ zh: "授受主语方向；×友達が私にあげた→もらった。" }], links: [conv] },
    "作文": { lines: [{ zh: "写赠送/接受经历，用で+授受动词。" }], links: [conv] },
  }},
  };

  const EXT_BY_LESSON = {
  5: {
    "pronunciation": { lines: [{ zh: "时刻音变见 summaryBlocks；「ごろ」≈大约。" }], links: [conv] },
    "grammar": { lines: [{ zh: "現在・未来ます形・に时刻・からまで・ごろ。" }], links: [conv] },
    "mistakes": { lines: [{ zh: "×今に → ○今；あまり・全然须否定（预习）。" }], links: [conv] },
    "template": { lines: [{ zh: "毎朝［時］に［动词ます］。" }], links: [conv] },
  }},
  6: {
    "grammar": { lines: [{ zh: "へ・で・から・まで・どこ／何。" }], links: [conv] },
    "mistakes": { lines: [{ zh: "で本课=交通；第8课=语言工具。" }], links: [conv] },
    "template": { lines: [{ zh: "［时间］［へ］行きます／［で］帰ります。" }], links: [conv] },
  }},
  7: {
    "pronunciation": { lines: [{ zh: "お茶の「お」美化语；频率词程度差异见 summaryBlocks。" }], links: [conv] },
    "grammar": { lines: [{ zh: "を・频率・ませんか／ましょう・をください 四节点。" }], links: [conv] },
    "mistakes": { lines: [{ zh: "对照拡張：にします／をください／数量置后。" }], links: [conv] },
    "template": { lines: [{ zh: "カフェ注文模板：［飲み物］にします。" }], links: [conv] },
  }},
  8: {
    "grammar": { lines: [{ zh: "で（语言工具）・あげる・くれる・もらう。" }], links: [conv] },
    "mistakes": { lines: [{ zh: "×私は先生に本をあげた → 对长辈用差し上げる等。" }], links: [conv] },
    "template": { lines: [{ zh: "プレゼント・お礼の手紙场景。" }], links: [conv] },
  }},
  };

  const HW_DEFAULT = {
    発音: { lines: [{ zh: "注意「時・分」音变（4=よじ、7=しち等）。" }], links: [vocab] },
    活用: { lines: [{ zh: "本课动词四种ます形：ます／ません／ました／ませんでした。" }], links: [vocab] },
    選択: { lines: [{ zh: "助词题：に时间、へ方向、で手段、から～まで。" }], links: [conv] },
    穴埋め: { lines: [{ zh: "填空看清时态与助词槽位。" }], links: [conv] },
    翻訳: { lines: [{ zh: "日译中保留时间表达；中译日用ます形。" }], links: [conv] },
    総合: { lines: [{ zh: "综合题对照当课课文与 gate Q12。" }], links: [conv] },
    間違い: { lines: [{ zh: "改错：助词混用、授受方向、辞書形叙述。" }], links: [conv] },
    作文: { lines: [{ zh: "作文套用拡張模板。" }], links: [conv] },
    聴解: { lines: [{ zh: "听力配合🔊；先看课文录音。" }], links: [conv] },
    小テスト: { lines: [{ zh: "交互小测12题；错题回文法节点。" }], links: [conv] },
  };

  const EXT_DEFAULT = {
    pronunciation: { lines: [{ zh: "发音要点见 summaryBlocks。" }], links: [vocab] },
    etymology: { lines: [{ zh: "词源注释助记音读。" }], links: [vocab] },
    preview: { lines: [{ zh: "活用予告=下节课形，先识读。" }], links: [vocab] },
    honorific: { lines: [{ zh: "ます形即丁寧体。" }], links: [conv] },
    template: { lines: [{ zh: "模板块替换［］口头练习。" }], links: [conv] },
    mistakes: { lines: [{ zh: "常见误用=阅卷高频。" }], links: [conv] },
    keyPoints: { lines: [{ zh: "会話要点=课文关键词；ABC A 轨。" }], links: [conv] },
    rolePlay: { lines: [{ zh: "角色扮演按课题换人名・场所。" }], links: [conv] },
    grammar: { lines: [{ zh: "文法まとめ=当课节点；对照例句。" }], links: [{ label: "→ 文法", gate: 1 }] },
    basicText: { lines: [{ zh: "基本课文四句=文法主干。" }], links: [conv] },
  };

  function vocabTip(v) {
    if (!v) return null;
    if (VOCAB[v.id]) return VOCAB[v.id];
    return null;
  }

  function grammar(node) {
    if (!node) return null;
    const zh = (node.explanationZh || node.titleZh || "").trim();
    if (!zh) return null;
    const lines = zh.split(/\n+/)
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
    if (tit.includes("まとめ") && !tit.includes("文法")) {
      return { lines: [{ zh: "迄今总结含课文锚点。" }], links: [conv] };
    }
    return { lines: [{ zh: "本块与当课五关交叉对照。" }], links: [conv] };
  }

  return { vocab: vocabTip, grammar, homeworkTitle, extensionKey };
})();
