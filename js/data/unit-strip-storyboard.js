/**
 * 六单元 · 24 格分镜文案（审阅真源）
 * 混合：单元旅行情绪弧 + 每格课文会話泡（lesson-dialogues.js）
 * 预览：storyboard-preview.html
 */
const UNIT_STRIP_STORYBOARD = [
  {
    unitId: 1,
    stripTitle: "はじめまして、東京！",
    unitZh: "小李赴日",
    unitArcZh: "抵日兴奋 → 认路标これ/それ → 浅草ここ/あそこ → 酒店安顿",
    source: "storyboard-P1-第1单元-定稿.md v3 混合",
    panels: [
      {
        lessonId: 1,
        sceneCloud: "成田空港 · はじめまして",
        dialogueId: "l1-d1",
        visualBeat:
          "到达大厅；グルミ拖小行李箱；背景「東京へようこそ」；接機の田中さん鞠躬",
        bubbles: [
          { role: "田中", side: "left", jp: "はじめまして。わたしは田中です。", zh: "初次见面，我是田中。" },
          { role: "李", side: "right", isGurumi: true, jp: "はじめまして。わたしは李です。中国人です。", zh: "初次见面，我是小李，中国人。" },
          { role: "田中", side: "left", jp: "李さんは学生ですか。", zh: "你是学生吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "いいえ、学生じゃありません。会社員です。", zh: "不，是公司职员。" },
        ],
      },
      {
        lessonId: 2,
        sceneCloud: "空港外 · これは本です",
        dialogueId: "l2-d1",
        visualBeat:
          "站外路标（東京駅・浅草）；站員小姐；グルミ指これ/それ/あれ（地图・案内板・远处站牌）",
        bubbles: [
          { role: "站員", side: "left", jp: "これは何ですか。", zh: "这是什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "これは本です。", zh: "这是书。" },
          { role: "站員", side: "left", jp: "それは何ですか。", zh: "那是什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "それはノートです。", zh: "那是笔记本。" },
        ],
        note: "泡为课文原句；美工把「本/ノート」画在地图册与行程本（不是教室课桌）",
      },
      {
        lessonId: 3,
        sceneCloud: "浅草 · ここはデパートです",
        dialogueId: "l3-d1",
        visualBeat:
          "雷門前；グルミ胜利手势；远处百货楼剪影=あそこ；指ここ=雷門",
        captionSmall: "ここはデパートです。（第3課标题句·指远景）",
        bubbles: [
          { role: "同行", side: "left", jp: "すみません、図書館はどこですか。", zh: "图书馆在哪儿？" },
          { role: "李", side: "right", isGurumi: true, jp: "図書館はあそこです。", zh: "在那儿。" },
          { role: "同行", side: "left", jp: "食堂はどこですか。", zh: "食堂呢？" },
          { role: "李", side: "right", isGurumi: true, jp: "食堂はここです。", zh: "在这里。" },
        ],
        note: "会話原文不变；视觉在浅草，手势表达ここ/あそこ",
      },
      {
        lessonId: 4,
        sceneCloud: "ホテル · 部屋に机といすがあります",
        dialogueId: "l4-d1",
        visualBeat:
          "夜晚酒店房间；グルミ躺床；地图与日语书散落；机・いす・テレビ",
        captionSmall: "表情：明日も頑張ろう（心情，不进主泡）",
        bubbles: [
          { role: "朋友", side: "left", jp: "部屋に何がありますか。", zh: "房间里有什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "机と椅子があります。", zh: "有桌子和椅子。" },
          { role: "朋友", side: "left", jp: "テレビはありますか。", zh: "有电视吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、あります。パソコンもあります。", zh: "有，还有电脑。" },
        ],
        note: "朋友=电话/视频剪影或门外简笔，不必画第二主角脸",
      },
    ],
  },
  {
    unitId: 2,
    stripTitle: "おはよう、会社",
    unitZh: "公司生活①",
    panels: [
      {
        lessonId: 5,
        sceneCloud: "駅 · 毎日バスで来ます",
        dialogueId: "l5-d1",
        bubbles: [
          { role: "同学", side: "left", jp: "李さんは毎日何で来ますか。", zh: "你每天怎么来？" },
          { role: "李", side: "right", isGurumi: true, jp: "毎日バスで来ます。", zh: "坐公交来。" },
          { role: "同学", side: "left", jp: "何時に着きますか。", zh: "几点到？" },
          { role: "李", side: "right", isGurumi: true, jp: "八時半ごろ着きます。", zh: "八点半左右到。" },
        ],
      },
      {
        lessonId: 6,
        sceneCloud: "学校 · 土曜日に会いましょう",
        dialogueId: "l6-d1",
        bubbles: [
          { role: "同学", side: "left", jp: "土曜日に映画を見ませんか。", zh: "周六看电影好吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、土曜日の三時はどうですか。", zh: "周六三点怎么样？" },
          { role: "同学", side: "left", jp: "どこで会いますか。", zh: "在哪儿见？" },
          { role: "李", side: "right", isGurumi: true, jp: "駅の前で会いましょう。", zh: "车站前见吧。" },
        ],
      },
      {
        lessonId: 7,
        sceneCloud: "店 · いくらですか",
        dialogueId: "l7-d1",
        bubbles: [
          { role: "店员", side: "left", jp: "いらっしゃいませ。", zh: "欢迎。" },
          { role: "李", side: "right", isGurumi: true, jp: "すみません、このカメラはいくらですか。", zh: "这相机多少钱？" },
          { role: "店员", side: "left", jp: "三万円です。", zh: "三万日元。" },
          { role: "李", side: "right", isGurumi: true, jp: "少し高いですね。", zh: "有点贵。" },
        ],
      },
      {
        lessonId: 8,
        sceneCloud: "家 · 昨日勉強しましたか",
        dialogueId: "l8-d1",
        bubbles: [
          { role: "老师", side: "left", jp: "昨日勉強しましたか。", zh: "昨天学了吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "いいえ、勉強しませんでした。", zh: "没有。" },
          { role: "老师", side: "left", jp: "今日は頑張ってください。", zh: "今天要加油。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、頑張ります。", zh: "好的。" },
        ],
        note: "标题句「日本語で手紙」待补专属会話时可替换本格",
      },
    ],
  },
  {
    unitId: 3,
    stripTitle: "旅行の思い出",
    unitZh: "箱根旅行",
    panels: [
      {
        lessonId: 9,
        sceneCloud: "教室 · あの人はだれですか",
        dialogueId: "l9-d1",
        bubbles: [
          { role: "朋友", side: "left", jp: "あの人はだれですか。", zh: "那个人是谁？" },
          { role: "李", side: "right", isGurumi: true, jp: "あの人は田中さんです。先生です。", zh: "是田中老师。" },
          { role: "朋友", side: "left", jp: "隣の人はだれですか。", zh: "旁边是谁？" },
          { role: "李", side: "right", isGurumi: true, jp: "森さんです。会社員です。", zh: "森先生，公司职员。" },
        ],
        note: "标题「四川料理は辛い」待补旅行便当场景",
      },
      {
        lessonId: 10,
        sceneCloud: "公園 · 散歩しましょう",
        dialogueId: "l10-d1",
        bubbles: [
          { role: "朋友", side: "left", jp: "今日は天気がいいですね。", zh: "天气真好。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、公園で散歩しましょう。", zh: "在公园散步吧。" },
          { role: "朋友", side: "left", jp: "コーヒーを飲みませんか。", zh: "喝咖啡吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "いいですね。", zh: "好啊。" },
        ],
        note: "标题「京都の紅葉」待补红叶场景",
      },
      {
        lessonId: 11,
        sceneCloud: "教室 · 日本語で話します",
        dialogueId: "l11-d1",
        bubbles: [
          { role: "老师", side: "left", jp: "日本語で話してください。", zh: "请用日语说。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、日本語で話します。", zh: "好的。" },
          { role: "老师", side: "left", jp: "もう一度言ってください。", zh: "请再说一遍。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、もう一度言います。", zh: "好的，再说一遍。" },
        ],
      },
      {
        lessonId: 12,
        sceneCloud: "办公室 · より若いです",
        dialogueId: "l12-d1",
        bubbles: [
          { role: "同事", side: "left", jp: "李さんと王さんとどちらが若いですか。", zh: "谁更年轻？" },
          { role: "李", side: "right", isGurumi: true, jp: "李さんは王さんより若いです。", zh: "小李更年轻。" },
          { role: "同事", side: "left", jp: "どちらが背が高いですか。", zh: "谁更高？" },
          { role: "李", side: "right", isGurumi: true, jp: "王さんのほうが高いです。", zh: "小王更高。" },
        ],
      },
    ],
  },
  {
    unitId: 4,
    stripTitle: "一緒に頑張ろう",
    unitZh: "公司生活②",
    panels: [
      {
        lessonId: 13,
        sceneCloud: "家 · 手紙を書いています",
        dialogueId: "l13-d1",
        bubbles: [
          { role: "妈妈", side: "left", jp: "何をしていますか。", zh: "在做什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "友達に手紙を書いています。", zh: "给朋友写信。" },
          { role: "妈妈", side: "left", jp: "中国の友達ですか。", zh: "中国朋友吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、北京の友達です。", zh: "是的，北京的朋友。" },
        ],
        note: "标题「机の上に三冊」待补办公桌场景",
      },
      {
        lessonId: 14,
        sceneCloud: "デパート · 買い物をします",
        dialogueId: "l14-dE",
        bubbles: [
          { role: "同学", side: "left", jp: "今日デパートへ行きませんか。", zh: "今天去百货吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、行きましょう。買い物をします。", zh: "好，去购物。" },
          { role: "李", side: "right", isGurumi: true, jp: "デパートへ行って、服を買います。", zh: "去百货买衣服。" },
          { role: "店员", side: "left", jp: "いらっしゃいませ。", zh: "欢迎。" },
        ],
      },
      {
        lessonId: 15,
        sceneCloud: "博物館 · 写真を撮ってもいいですか",
        dialogueId: "l15-d1",
        bubbles: [
          { role: "游客", side: "left", jp: "すみません、ここで写真を撮ってもいいですか。", zh: "可以拍照吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、撮ってもいいですよ。", zh: "可以哦。" },
          { role: "游客", side: "left", jp: "フラッシュはだめですか。", zh: "不能闪光吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、フラッシュは使わないでください。", zh: "请不要用闪光。" },
        ],
        note: "标题「読んでいます」待补读报进行时场景",
      },
      {
        lessonId: 16,
        sceneCloud: "ホテル · 広くて明るいです",
        dialogueId: "l16-d1",
        bubbles: [
          { role: "导游", side: "left", jp: "ホテルの部屋はどうですか。", zh: "酒店房间怎么样？" },
          { role: "李", side: "right", isGurumi: true, jp: "部屋は広くて明るくて、とてもきれいです。", zh: "又宽又亮，很漂亮。" },
          { role: "游客", side: "left", jp: "風呂はありますか。", zh: "有浴室吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、あります。", zh: "有的。" },
        ],
      },
    ],
  },
  {
    unitId: 5,
    stripTitle: "あけましておめでとう",
    unitZh: "迎新春",
    panels: [
      {
        lessonId: 17,
        sceneCloud: "学校 · 映画を見ませんか",
        dialogueId: "l17-d1",
        bubbles: [
          { role: "李", side: "right", isGurumi: true, jp: "今度の日曜日、映画を見ませんか。", zh: "下星期天看电影好吗？" },
          { role: "同学", side: "left", jp: "いいですね。一緒に行きましょう。", zh: "好啊，一起去。" },
          { role: "李", side: "right", isGurumi: true, jp: "何時に会いますか。", zh: "几点见？" },
          { role: "同学", side: "left", jp: "十時に駅で会いましょう。", zh: "十点车站见。" },
        ],
        note: "标题「新しい洋服がほしい」待补商店橱窗场景",
      },
      {
        lessonId: 18,
        sceneCloud: "電器店 · 小さくなりました",
        dialogueId: "l18-d1",
        bubbles: [
          { role: "店员", side: "left", jp: "新しい携帯はどうですか。", zh: "新手机怎么样？" },
          { role: "李", side: "right", isGurumi: true, jp: "携帯電話はとても小さくなりました。", zh: "手机变小了。" },
          { role: "店员", side: "left", jp: "軽くなりましたか。", zh: "变轻了吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、前より軽くなりました。", zh: "比以前轻了。" },
        ],
      },
      {
        lessonId: 19,
        sceneCloud: "家 · かぎを忘れないで",
        dialogueId: "l14-dB",
        captionSmall: "部屋のかぎを忘れないでください",
        bubbles: [
          { role: "妈妈", side: "left", jp: "荷物、忘れないでね。", zh: "别忘了东西。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、荷物を持って行きます。", zh: "好的，我会带上。" },
          { role: "妈妈", side: "left", jp: "何時に帰りますか。", zh: "几点回来？" },
          { role: "李", side: "right", isGurumi: true, jp: "夜八時ごろ帰ります。", zh: "晚上八点左右。" },
        ],
        note: "暂借 l14-dB；L19 专属会話待补",
      },
      {
        lessonId: 20,
        sceneCloud: "面试 · 話せますか",
        dialogueId: "l20-d1",
        captionSmall: "スミスさんはピアノを弾くことができます",
        bubbles: [
          { role: "面试官", side: "left", jp: "日本語が話せますか。", zh: "会说日语吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、少し話せます。", zh: "会一点。" },
          { role: "面试官", side: "left", jp: "読みますか。", zh: "会读吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、簡単な文章なら読めます。", zh: "简单文章可以。" },
        ],
        note: "标题为ピアノ可能形；会話暂用面试能力句",
      },
    ],
  },
  {
    unitId: 6,
    stripTitle: "また会いましょう",
    unitZh: "再见日本",
    panels: [
      {
        lessonId: 21,
        sceneCloud: "家 · 雨が降ったら",
        dialogueId: "l21-d1",
        bubbles: [
          { role: "朋友", side: "left", jp: "明日ピクニックに行きますか。", zh: "明天去野餐吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "雨が降ったら、行きません。", zh: "下雨就不去。" },
          { role: "朋友", side: "left", jp: "天気予報はどうですか。", zh: "天气预报呢？" },
          { role: "李", side: "right", isGurumi: true, jp: "午後は晴れるそうです。", zh: "听说下午会晴。" },
        ],
        note: "标题「すき焼きを食べたことがある」待补送别聚餐场景",
      },
      {
        lessonId: 22,
        sceneCloud: "教室 · もう一度言ってください",
        dialogueId: "l22-d1",
        bubbles: [
          { role: "学生", side: "left", jp: "すみません、もう一度言ってください。", zh: "请再说一遍。" },
          { role: "老师", side: "left", jp: "いいですよ。よく聞いてください。", zh: "好的，请好好听。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、わかりました。", zh: "好的，明白了。" },
        ],
        note: "标题「今晩テレビを見る」待补宿舍电视场景",
      },
      {
        lessonId: 23,
        sceneCloud: "办公室 · 雨だそうです",
        dialogueId: "l23-d1",
        bubbles: [
          { role: "同事", side: "left", jp: "明日は雨だそうです。", zh: "听说明天有雨。" },
          { role: "李", side: "right", isGurumi: true, jp: "そうですか。傘を持って行きます。", zh: "那我带伞去。" },
          { role: "同事", side: "left", jp: "風が強いそうですよ。", zh: "听说风很大。" },
          { role: "李", side: "right", isGurumi: true, jp: "じゃあ、コートも着ます。", zh: "那也穿外套。" },
        ],
        note: "标题「散歩したり…」待补送别月台场景",
      },
      {
        lessonId: 24,
        sceneCloud: "教室 · お疲れさまでした",
        dialogueId: "l24-d1",
        bubbles: [
          { role: "老师", side: "left", jp: "三か月、お疲れさまでした。", zh: "三个月辛苦了。" },
          { role: "李", side: "right", isGurumi: true, jp: "ありがとうございました。これからも頑張ります。", zh: "谢谢，会继续努力。" },
          { role: "老师", side: "left", jp: "日本語の勉強、続けてくださいね。", zh: "请继续学日语。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、続けます。先生のおかげです。", zh: "好的，多亏了老师。" },
        ],
        note: "格4可嵌 P1–格1 机场小图作全季回调（美工层）",
      },
    ],
  },
];

if (typeof globalThis !== "undefined") {
  globalThis.UNIT_STRIP_STORYBOARD = UNIT_STRIP_STORYBOARD;
}
