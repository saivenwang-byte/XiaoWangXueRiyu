/**
 * 第1单元第2–4课 · 会話 ABC（A=课文 · B/C=场景变体 + 提示）
 * 对齐第1课 l1-dialogue-abc.js 产品与 UI
 */
const L2_DIALOGUE_ABC = {
  l2_dlg_1: {
    abcGuideZh: "李回答「那是什么」。A 为课文；B/C 为同事看照片时的自然说法。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "これは 私の 家族の 写真です。",
        chinese: "这是我家人的照片。",
        noteZh: "课文原句：これ＋の＋名词。向同事介绍随身照片用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "家族の 写真です。",
        chinese: "是家人的照片。",
        noteZh: "B 省略「これは私の」：对方已看见照片、节奏快时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "はい、これは 家族の 写真です。",
        chinese: "是的，这是家人的照片。",
        noteZh: "C 先「はい」再说明：想明确肯定、稍郑重时用。",
      },
    ],
  },
  l2_dlg_2: {
    abcGuideZh: "小野问「这位是谁」。练习 この方・どなた。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "この 方は どなたですか。",
        chinese: "这位是谁？",
        noteZh: "课文标准：この方＋どなた（礼貌）。职场、对客户用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "この 人は だれですか。",
        chinese: "这个人是谁？",
        noteZh: "B 用「この人・だれ」：同事、关系近、语气轻松时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "こちらの 方は どなたでしょうか。",
        chinese: "这位是哪一位？",
        noteZh: "C 更郑重：「こちらの方」「でしょうか」；对上級或正式场合用。",
      },
    ],
  },
  l2_dlg_3: {
    abcGuideZh: "李指认父亲。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "私の 父です。",
        chinese: "是我父亲。",
        noteZh: "课文原句：私の＋亲属名词。直接指认用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "父です。",
        chinese: "是父亲。",
        noteZh: "B 更短：前文已说「私の」语境，省略重复时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "こちらが 父です。",
        chinese: "这位是父亲。",
        noteZh: "C 用「こちらが」：强调眼前这位、略礼貌时用。",
      },
    ],
  },
  l2_dlg_4: {
    abcGuideZh: "小野问年龄。注意 おいくつ 与 お父さん 敬称。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "お父さんは おいくつですか。",
        chinese: "您父亲多大岁数？",
        noteZh: "课文原句：お父さん＋おいくつ。谈对方家人用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "お父様は 何歳ですか。",
        chinese: "令尊多大年纪？",
        noteZh: "B 更正式：「お父様」「何歳」；对客户、上级家属用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "父は おいくつですか。",
        chinese: "父亲多大？",
        noteZh: "C 省略「お」：双方已很熟、同事闲聊时可听，课堂仍以 A 为准。",
      },
    ],
  },
  l2_dlg_5: {
    abcGuideZh: "李回答年龄。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "五十八歳です。",
        chinese: "五十八岁。",
        noteZh: "课文原句：数字＋歳です。标准答用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "五十八歳に なります。",
        chinese: "五十八岁。",
        noteZh: "B 用「になります」：稍客气陈述年龄；对长辈转述时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "今は 五十八歳です。",
        chinese: "现在是五十八岁。",
        noteZh: "C 加「今は」：强调「目前」、避免听成别的年纪时用。",
      },
    ],
  },
  l2_dlg_6: {
    abcGuideZh: "小野转向另一张。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "そうですか。じゃ、これは？",
        chinese: "是吗。那么，这是？",
        noteZh: "课文原句：そうですか＋じゃ＋これは。自然接话用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "なるほど。これは 何ですか。",
        chinese: "原来如此。这是什么？",
        noteZh: "B 用「なるほど」：表示理解后再问；同事闲聊可用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "そうですか。では、こちらは？",
        chinese: "是吗。那么，这位是？",
        noteZh: "C 「では」「こちら」稍正式；对客户或礼貌场合用。",
      },
    ],
  },
  l2_dlg_7: {
    abcGuideZh: "李说明也是父亲、年轻时长。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "それも 父です。若い 時の 写真です。",
        chinese: "那也是父亲。年轻时的照片。",
        noteZh: "课文两句：それも＋若い時。标日主线用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "同じ 父です。若い 頃の 写真です。",
        chinese: "是同一位父亲。年轻时的照片。",
        noteZh: "B 用「同じ」：强调同一人；对方疑惑「是不是另一个人」时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "はい、それも 父で、若かった 頃の 写真です。",
        chinese: "是的，那也是父亲，是年轻时的照片。",
        noteZh: "C 一句说完：想减少断句、语气更完整时用。",
      },
    ],
  },
  l2_dlg_8: {
    abcGuideZh: "小野惊讶气质不同。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "えっ、同じ 方ですか。雰囲気が 違いますね。",
        chinese: "啊，是同一个人吗。气质不一样呢。",
        noteZh: "课文原句：えっ＋同じ方＋雰囲気。自然反应用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "同じ 人ですか。全然 違いますね。",
        chinese: "是同一个人吗。完全不一样呢。",
        noteZh: "B 口语「全然違う」：同事、语气轻松时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "まあ、同じ 方でしょうか。印象が 違いますね。",
        chinese: "嗯，是同一位吧。印象不一样呢。",
        noteZh: "C 委婉「でしょうか」「印象」：不想太断定、礼貌时用。",
      },
    ],
  },
  l2_dlg_9: {
    abcGuideZh: "李确认二十岁时的照片。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "はい。この 写真は 二十歳の 時の 父です。",
        chinese: "是的。这张照片是二十岁时的父亲。",
        noteZh: "课文原句：この写真は…時の父。标准说明用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "はい、二十歳の ときです。",
        chinese: "是的，是二十岁的时候。",
        noteZh: "B 较短：重点在年龄；对方已懂「父亲」时可省略后半。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "ええ、父が 二十歳の ときの 写真です。",
        chinese: "嗯，是父亲二十岁时的照片。",
        noteZh: "C 主语在前「父が」：叙述更完整、稍郑重时用。",
      },
    ],
  },
  l2_dlg_10: {
    abcGuideZh: "小野问远处那张。练习 あれ・どなた。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "あれは どなたの 写真ですか。",
        chinese: "那是谁的照片？",
        noteZh: "课文：あれ＋どなたの。离双方都远时用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "あれは だれの 写真ですか。",
        chinese: "那是谁的照片？",
        noteZh: "B 用「だれ」：同事、非正式场合可用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "あちらは どなたの 写真でしょうか。",
        chinese: "那边是谁的照片呢？",
        noteZh: "C 「あちら」「でしょうか」：更礼貌、对客户用。",
      },
    ],
  },
  l2_dlg_11: {
    abcGuideZh: "李指认母亲。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "私の 母です。",
        chinese: "是我母亲。",
        noteZh: "课文原句。与「私の父です」同一结构，用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "母です。",
        chinese: "是母亲。",
        noteZh: "B 省略「私の」：语境已清楚时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "こちらが 母です。",
        chinese: "这位是母亲。",
        noteZh: "C 「こちらが」：礼貌指认时用。",
      },
    ],
  },
  l2_dlg_12: {
    abcGuideZh: "小野称赞母亲。练习 ～そうですね。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "優しそうな 方ですね。",
        chinese: "看上去是很和蔼的人。",
        noteZh: "课文原句：优しそうな方ですね。标准恭维用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "いい 笑顔ですね。",
        chinese: "笑容很好呢。",
        noteZh: "B 换角度称赞：不想重复「優しそう」、更具体时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "とても 優しそうな 方ですね。",
        chinese: "看上去是非常和蔼的人。",
        noteZh: "C 加「とても」：强调、更热情时用。",
      },
    ],
  },
  l2_dlg_13: {
    abcGuideZh: "李道谢。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "ありがとうございます。",
        chinese: "谢谢。",
        noteZh: "课文标准感谢。接受称赞后用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "どうも ありがとうございます。",
        chinese: "非常感谢。",
        noteZh: "B 加「どうも」：更强调谢意时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "いえ、こちらこそ ありがとうございます。",
        chinese: "不，我才要谢谢您。",
        noteZh: "C 回赠式感谢：想同时夸对方、更客气时用（非课文原句）。",
      },
    ],
  },
};

const L3_DIALOGUE_ABC = {
  l3_dlg_1: {
    abcGuideZh: "李确认酒店。练习 ここ・そうです。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "はい、そうです。",
        chinese: "是的。",
        noteZh: "课文原句：肯定「ここはホテル」。标准答用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "はい、ここです。",
        chinese: "是的，就是这里。",
        noteZh: "B 补「ここです」：想明确地点、避免只听「はい」时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "ええ、そうです。こちらが ホテルです。",
        chinese: "嗯，是的。这边就是酒店。",
        noteZh: "C 更完整：对司机或多人说明时用。",
      },
    ],
  },
  l3_dlg_2: {
    abcGuideZh: "小野介绍公园。练习 あそこ・きれいです。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "あそこが 公園です。とても きれいですよ。",
        chinese: "那边是公园。很漂亮哦。",
        noteZh: "课文原句：あそこ＋形容詞よ。导游式介绍用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "公園は あそこです。きれいですよ。",
        chinese: "公园在那边。很漂亮哦。",
        noteZh: "B 主语在前：强调「公园」话题时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "あちらが 公園で、とても きれいな 公園です。",
        chinese: "那边是公园，是非常漂亮的公园。",
        noteZh: "C 更郑重：对客户、正式介绍时用。",
      },
    ],
  },
  l3_dlg_3: {
    abcGuideZh: "李问红色建筑。练习 あの・何ですか。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "そうですか。あの 赤い 建物は 何ですか。",
        chinese: "是吗。那座红色的建筑是什么？",
        noteZh: "课文两句：そうですか＋あの建物。标准问法用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "あの 建物は 何ですか。",
        chinese: "那座建筑是什么？",
        noteZh: "B 省略「そうですか」：已看过公园、直接追问时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "すみません、あの 赤い 建物は 何でしょうか。",
        chinese: "不好意思，那座红色建筑是什么呢？",
        noteZh: "C 加「すみません」「でしょうか」：更礼貌时用。",
      },
    ],
  },
  l3_dlg_4: {
    abcGuideZh: "小野答车站。练习 あれは。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "あれは 駅です。",
        chinese: "那是车站。",
        noteZh: "课文：あれは＋名词。离双方都远用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "駅です。あれです。",
        chinese: "是车站。就是那个。",
        noteZh: "B 拆两句：强调「就是那个」、口语时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "あちらが 駅です。",
        chinese: "那边是车站。",
        noteZh: "C 「あちら」：稍礼貌、对客户用。",
      },
    ],
  },
  l3_dlg_5: {
    abcGuideZh: "李问便利店。练习 どこですか。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "じゃ、コンビニは どこですか。",
        chinese: "那么，便利店在哪儿？",
        noteZh: "课文：じゃ＋どこですか。接上文自然过渡用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "コンビニは どこですか。",
        chinese: "便利店在哪儿？",
        noteZh: "B 更短：已说过「じゃ」语境、直接问时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "すみません、コンビニは どちらですか。",
        chinese: "不好意思，便利店在哪边？",
        noteZh: "C 「どちら」：更礼貌、对陌生人问路时用。",
      },
    ],
  },
  l3_dlg_6: {
    abcGuideZh: "小野指路。练习 隣・あそこ。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "コンビニは あそこです。ホテルの 隣です。",
        chinese: "便利店在那边。在酒店旁边。",
        noteZh: "课文两句：あそこ＋隣。标准指路用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "あそこです。ホテルの となりです。",
        chinese: "在那边。在酒店旁边。",
        noteZh: "B 用「となり」：口语同义；注意「隣」为课文词。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "あちらの コンビニで、おホテルの すぐ 隣です。",
        chinese: "便利店在那边，就在酒店紧旁边。",
        noteZh: "C 更详细礼貌：对客人、想强调「很近」时用。",
      },
    ],
  },
  l3_dlg_7: {
    abcGuideZh: "李问银行。练习 どこにありますか。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "銀行は どこに ありますか。",
        chinese: "银行在哪儿？",
        noteZh: "课文：どこにありますか（存在场所）。用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "銀行は どこですか。",
        chinese: "银行在哪儿？",
        noteZh: "B 用「どこですか」：口语常混用；课堂区分に/あります用 A。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "銀行は どちらに ありますでしょうか。",
        chinese: "银行在哪边呢？",
        noteZh: "C 更礼貌：对客户、正式问路用。",
      },
    ],
  },
  l3_dlg_8: {
    abcGuideZh: "小野答银行位置。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "銀行は あちらの 交差点の 左です。",
        chinese: "银行在那边十字路口的左侧。",
        noteZh: "课文原句：あちら＋交差点の左。标准指路用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "あそこの 交差点の 左に あります。",
        chinese: "在那边十字路口的左边。",
        noteZh: "B 用「あそこ」「にあります」：强调存在位置时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "銀行は あちら、交差点を 左に 曲がった ところです。",
        chinese: "银行在那边，十字路口左转的地方。",
        noteZh: "C 动线说明：想教「怎么走」、不只指方向时用。",
      },
    ],
  },
  l3_dlg_9: {
    abcGuideZh: "李省略问餐厅。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "レストランは？",
        chinese: "餐厅呢？",
        noteZh: "课文省略句：前文已问「どこ」、只换主题用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "レストランは どこですか。",
        chinese: "餐厅在哪儿？",
        noteZh: "B 完整问句：怕对方听不懂省略时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "レストランは どちらに ありますか。",
        chinese: "餐厅在哪边？",
        noteZh: "C 礼貌完整：对客户、正式场合用。",
      },
    ],
  },
  l3_dlg_10: {
    abcGuideZh: "小野答餐厅在百货里。练习 にあります。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "レストランは デパートの 中に あります。",
        chinese: "餐厅在百货商店里面。",
        noteZh: "课文：の中にあります。标准答用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "デパートの 中です。",
        chinese: "在百货里面。",
        noteZh: "B 更短：对方已知是餐厅、只补地点时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "あちらの デパートの 中に レストランが あります。",
        chinese: "那边百货里面有餐厅。",
        noteZh: "C 主语「レストランが」：叙述更完整、导游式用。",
      },
    ],
  },
  l3_dlg_11: {
    abcGuideZh: "李感谢。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "小野さん、どうも ありがとうございます。",
        chinese: "小野，非常感谢。",
        noteZh: "课文：称呼＋どうもありがとう。标准用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "ありがとうございます。",
        chinese: "谢谢。",
        noteZh: "B 省略称呼：已面对面、简短道谢时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "本当に ありがとうございます。とても 助かりました。",
        chinese: "真的非常感谢。帮了大忙。",
        noteZh: "C 加强：对方花时间陪逛、想表达更深谢意时用。",
      },
    ],
  },
  l3_dlg_12: {
    abcGuideZh: "小野回应不客气。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "いいえ。どういたしまして。",
        chinese: "不客气。",
        noteZh: "课文原句。对「ありがとう」标准回应用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "いえいえ、どういたしまして。",
        chinese: "不不，别客气。",
        noteZh: "B 加「いえいえ」：更口语、亲切时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "とんでも ありません。お役に 立てて よかったです。",
        chinese: "哪里的话。能帮到您就好。",
        noteZh: "C 更郑重：对客户、商务陪同结束时用。",
      },
    ],
  },
};

const L4_DIALOGUE_ABC = {
  l4_dlg_1: {
    abcGuideZh: "李评价房间。练习 どうです・きれい。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "とても きれいです。",
        chinese: "非常漂亮。",
        noteZh: "课文：とても＋い形容词。称赞房间用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "きれいですね。",
        chinese: "很漂亮呢。",
        noteZh: "B 省略「とても」：语气稍轻、日常恭维用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "とても きれいで、気に入りました。",
        chinese: "非常漂亮，我很喜欢。",
        noteZh: "C 加「気に入りました」：想明确表达满意时用。",
      },
    ],
  },
  l4_dlg_2: {
    abcGuideZh: "小野问有什么。练习 何がありますか。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "何が ありますか。",
        chinese: "有什么？",
        noteZh: "课文原句：何が＋ありますか。存在询问用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "部屋に 何が ありますか。",
        chinese: "房间里有什么？",
        noteZh: "B 加「部屋に」：主题更清楚时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "どんな ものが ありますか。",
        chinese: "有些什么东西？",
        noteZh: "C 「どんなもの」：想了解概况、语气柔和时用。",
      },
    ],
  },
  l4_dlg_3: {
    abcGuideZh: "李列举家具与桌上物品。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "机と 椅子と ベッドが あります。机の上に パソコンや 本などが あります。",
        chinese: "有桌子、椅子和床。桌子上有电脑、书之类的东西。",
        noteZh: "课文两句：と列举＋や＋など。标准介绍用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "机と 椅子と ベッドです。机の上に パソコンが あります。",
        chinese: "有桌子、椅子和床。桌子上有电脑。",
        noteZh: "B 略「など」：只举一例、简短说明时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "家具は 机と 椅子と ベッドで、机の上には 本や パソコンなどが あります。",
        chinese: "家具有桌子、椅子和床，桌子上有书和电脑等。",
        noteZh: "C 加「家具は」：更完整、对客户介绍房间时用。",
      },
    ],
  },
  l4_dlg_4: {
    abcGuideZh: "小野问窗旁。练习 隣にありますか。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "窓の 隣に 何が ありますか。",
        chinese: "窗户旁边有什么？",
        noteZh: "课文：隣に何が。位置询问用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "窓の そばに 何ですか。",
        chinese: "窗户旁边是什么？",
        noteZh: "B 用「そば」：口语近义；课堂位置词以「隣」为准。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "窓の 横に 何か ありますか。",
        chinese: "窗户横侧有什么吗？",
        noteZh: "C 「横に何か」：稍随意、同事闲聊可用。",
      },
    ],
  },
  l4_dlg_5: {
    abcGuideZh: "李答书架。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "本棚が あります。",
        chinese: "有书架。",
        noteZh: "课文原句。存在回答用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "本棚です。",
        chinese: "是书架。",
        noteZh: "B 用「です」：名词谓语肯定；与「があります」交替练习。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "はい、本棚が あります。",
        chinese: "有的，有书架。",
        noteZh: "C 先「はい」：明确肯定存在时用。",
      },
    ],
  },
  l4_dlg_6: {
    abcGuideZh: "小野问床下。练习 何かありますか。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "ベッドの 下に 何か ありますか。",
        chinese: "床底下有什么吗？",
        noteZh: "课文：何かありますか（不确定有无）。用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "ベッドの 下に 何が ありますか。",
        chinese: "床底下有什么？",
        noteZh: "B 用「何が」：假定可能有；语气略不同。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "ベッドの 下、何か 入っていますか。",
        chinese: "床底下，放了什么东西吗？",
        noteZh: "C 「入っていますか」：口语、生活化时用。",
      },
    ],
  },
  l4_dlg_7: {
    abcGuideZh: "李答有鞋。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "はい、靴が あります。",
        chinese: "有，有鞋子。",
        noteZh: "课文：はい＋があります。肯定存在用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "靴が あります。",
        chinese: "有鞋子。",
        noteZh: "B 省略「はい」：对方已看到、直接说时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "ええ、スリッパと 靴が あります。",
        chinese: "嗯，有拖鞋和鞋子。",
        noteZh: "C 多列举：想练「と」、说明更具体时用。",
      },
    ],
  },
  l4_dlg_8: {
    abcGuideZh: "小野问电视位置。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "テレビは どこに ありますか。",
        chinese: "电视在哪儿？",
        noteZh: "课文：どこにありますか。标准问法用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "テレビは どこですか。",
        chinese: "电视在哪儿？",
        noteZh: "B 口语「どこですか」：同事闲聊可用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "テレビは どちらに ありますでしょうか。",
        chinese: "电视在哪边呢？",
        noteZh: "C 更礼貌：对客户、正式场合用。",
      },
    ],
  },
  l4_dlg_9: {
    abcGuideZh: "李答电视挂墙上。练习 かかっています。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "テレビは 机の 前の 壁に かかっています。",
        chinese: "电视挂在桌子前面的墙上。",
        noteZh: "课文：かかっています（挂着）。标准答用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "壁に かかっています。机の 前です。",
        chinese: "挂在墙上。在桌子前面。",
        noteZh: "B 拆两句：先位置后补充；口述轻松时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "机の 前の 壁に テレビが かかって います。",
        chinese: "桌子前面的墙上挂着电视。",
        noteZh: "C 主语「テレビが」：叙述更完整时用。",
      },
    ],
  },
  l4_dlg_10: {
    abcGuideZh: "小野接话并问猫。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "そうですか。猫は いますか。",
        chinese: "是吗。有猫吗？",
        noteZh: "课文：そうですか＋いますか（有生命）。用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "猫は いますか。",
        chinese: "有猫吗？",
        noteZh: "B 省略「そうですか」：直接换话题问时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "なるほど。ペットは いますか。",
        chinese: "原来如此。有宠物吗？",
        noteZh: "C 用「ペット」：泛指宠物、语气更宽时用。",
      },
    ],
  },
  l4_dlg_11: {
    abcGuideZh: "李否定并补充小鸟。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "いいえ、猫は いません。でも、庭に 小鳥が います。",
        chinese: "没有猫。不过院子里有小鸟。",
        noteZh: "课文：いいえ＋いません＋でも。标准答用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "猫は いません。庭に 鳥が います。",
        chinese: "没有猫。院里有鸟。",
        noteZh: "B 更短：省略「でも」「小」；快速回答时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "いいえ、猫は 飼っていません。庭には 小鳥が いますよ。",
        chinese: "没有，没养猫。院子里有小鸟哦。",
        noteZh: "C 「飼っていません」：强调「没养」、说明更细时用。",
      },
    ],
  },
  l4_dlg_12: {
    abcGuideZh: "小野称赞房间。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "いい 部屋ですね。",
        chinese: "房间不错啊。",
        noteZh: "课文原句：いい部屋ですね。结束参观用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "素敵な 部屋ですね。",
        chinese: "房间很棒呢。",
        noteZh: "B 换「素敵」：同样称赞、词汇变体。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "とても いい 部屋ですね。広くて 明るいです。",
        chinese: "房间非常好呢。又宽敞又明亮。",
        noteZh: "C 多加形容：想具体夸、热情回应时用。",
      },
    ],
  },
};

const UNIT1_DIALOGUE_ABC_BY_LESSON = {
  2: L2_DIALOGUE_ABC,
  3: L3_DIALOGUE_ABC,
  4: L4_DIALOGUE_ABC,
};

/** 合并第2–4课课文对话与 ABC 扩展（第1课仍用 applyL1DialogueAbc） */
function applyUnit1DialogueAbc(lessonId, dialogues) {
  const map = UNIT1_DIALOGUE_ABC_BY_LESSON[Number(lessonId)];
  if (!map || !Array.isArray(dialogues)) return dialogues;
  return dialogues.map((d) => {
    const ext = map[d.id];
    if (!ext) return d;
    const opener = {
      ...d.opener,
      ...(ext.opener || {}),
      chinese: ext.openerZh || d.opener?.chinese || "",
    };
    const userTurn = {
      ...d.userTurn,
      ...ext.userTurn,
      replies: ext.replies || d.userTurn?.replies || [],
    };
    return {
      ...d,
      ...ext,
      opener,
      userTurn,
    };
  });
}
