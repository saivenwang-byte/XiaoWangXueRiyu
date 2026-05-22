/**
 * 六单元 · 24 格分镜文案（审阅真源）
 * 精神原型：docs/story-strip-soul-lock.md（单元弧 + 标日 headline 画面 + 课文型泡）
 * 配角：风影/背影/剪影 only — 禁止他人正面（仅グルミ可正面）
 * 混合：P1 定稿 — 情绪弧 + visualBeat + 会話泡
 * 预览：storyboard-preview.html
 */
const UNIT_STRIP_STORYBOARD = [
  {
    unitId: 1,
    stripTitle: "はじめまして、東京！",
    unitZh: "小李赴日",
    unitArcZh: "成田抵日 → 売店これ/それ → 浅草ここ/あそこ → 酒店机・いす",
    source: "彩蛋/单元1/彩蛋-单元1（1-4）md.txt · 2026-05-21 样张重绘",
    panels: [
      {
        lessonId: 1,
        sceneCloud: "成田空港 · 李さんは中国人です",
        dialogueId: "l1-d1",
        visualBeat:
          "成田到达大厅中央；握红色护照；迷你行李箱；风影站员陪跑；抽象欢迎色块（无字）",
        layers: {
          L1: "成田空港到達ロビー・明亮现代",
          L2: "窗外东京塔剪影·樱花瓣",
          L3: "グルミ旅行帽+背包·ワクワク·站员仅背影/剪影",
          L4: "红色护照·橙色四轮箱",
        },
        bubbles: [
          { role: "田中", side: "left", jp: "はじめまして。わたしは田中です。", zh: "初次见面，我是田中。" },
          { role: "李", side: "right", isGurumi: true, jp: "はじめまして。わたしは李です。中国人です。", zh: "初次见面，我是小李，中国人。" },
          { role: "田中", side: "left", jp: "李さんは学生ですか。", zh: "你是学生吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "いいえ、学生じゃありません。会社員です。", zh: "不，是公司职员。" },
        ],
        note: "条带零字；泡里「田中」=风影接机人，不必写实脸",
      },
      {
        lessonId: 2,
        sceneCloud: "空港売店 · これは本です",
        dialogueId: "l2-d1",
        visualBeat:
          "机场内小卖店；踮脚指风铃；风影站员弯腰；货架扇子招き猫",
        layers: {
          L1: "成田空港内売店・日式杂货货架",
          L2: "窗外停机坪 ANA 飞机蓝尾翼",
          L3: "グルミ踮脚指风铃·站员侧后弯腰无正脸",
          L4: "玻璃风铃",
        },
        bubbles: [
          { role: "站員", side: "left", jp: "これは何ですか。", zh: "这是什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "これは本です。", zh: "这是书。" },
          { role: "站員", side: "left", jp: "それは何ですか。", zh: "那是什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "それはノートです。", zh: "那是笔记本。" },
        ],
        note: "课文「本」=风铃/和杂货（指示词场景），非教室",
      },
      {
        lessonId: 3,
        sceneCloud: "浅草駅前 · ここはデパートです",
        dialogueId: "l3-d1",
        visualBeat:
          "浅草站前观光地图看板；歪头指图；风影站员指雷门方向；远景红色大灯笼（无字）",
        layers: {
          L1: "浅草駅前広場·路线牌·交番",
          L2: "远处雷门红灯笼虚化",
          L3: "グルミ围巾·困惑歪头·站员侧影指路无正脸",
          L4: "折叠观光地图",
        },
        captionSmall: "ここはデパートです。（点格说明·指远景百货剪影时可叠）",
        bubbles: [
          { role: "同行", side: "left", jp: "すみません、図書館はどこですか。", zh: "图书馆在哪儿？" },
          { role: "李", side: "right", isGurumi: true, jp: "図書館はあそこです。", zh: "在那儿。" },
          { role: "同行", side: "left", jp: "食堂はどこですか。", zh: "食堂呢？" },
          { role: "李", side: "right", isGurumi: true, jp: "食堂はここです。", zh: "在这里。" },
        ],
        note: "会話=场所询问；条带禁止可读招牌",
      },
      {
        lessonId: 4,
        sceneCloud: "ホテル · 部屋に机といすがあります",
        dialogueId: "l4-d1",
        visualBeat:
          "商务酒店房间；床·机·椅子·电视·衣柜；坐床边环视满意；窗外晴空塔夜景",
        layers: {
          L1: "東京ビジネスホテル室内",
          L2: "窗外晴空塔+隅田川灯光",
          L3: "グルミ室内服·坐床环视",
          L4: "房卡",
        },
        captionSmall: "表情：ここが今日の部屋（心情，不进条带）",
        bubbles: [
          { role: "朋友", side: "left", jp: "部屋に何がありますか。", zh: "房间里有什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "机と椅子があります。", zh: "有桌子和椅子。" },
          { role: "朋友", side: "left", jp: "テレビはありますか。", zh: "有电视吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、あります。パソコンもあります。", zh: "有，还有电脑。" },
        ],
        note: "朋友=风影门外/手机光；条带无泡无字",
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
    unitArcZh:
      "李（グルミ）第一次去箱根放松：辣便当→京都红叶→车里唱歌→温泉街挑明信片",
    source: "story-strip-soul-lock · 备案 P3 · curriculum-catalog headline",
    panels: [
      {
        lessonId: 9,
        sceneCloud: "旅行 · 四川料理は辛いです",
        dialogueId: "l9-biaori",
        headline: "四川料理は辛いです",
        visualBeat:
          "箱根旅行休息站/巴士旁；便当盒四川料理红椒；仅1グルミ扇嘴「辛い」；同伴=风影",
        bubbles: [
          { role: "同伴", side: "left", jp: "この四川料理は辛いですか。", zh: "这川菜辣吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、とても辛いです。", zh: "嗯，很辣。" },
          { role: "同伴", side: "left", jp: "おいしいですか。", zh: "好吃吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、おいしいです。", zh: "好吃。" },
        ],
      },
      {
        lessonId: 10,
        sceneCloud: "京都 · 紅葉は有名です",
        dialogueId: "l10-biaori",
        headline: "京都の紅葉は有名です",
        visualBeat:
          "红叶山道（京都旅行）；仅1グルミ举相机/赏红叶；风影同伴拍照；飘落もみじ",
        bubbles: [
          { role: "同伴", side: "left", jp: "京都の紅葉は有名ですね。", zh: "京都红叶很有名呢。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、とても有名です。", zh: "嗯，很有名。" },
          { role: "同伴", side: "left", jp: "きれいですね。", zh: "好漂亮。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、とてもきれいです。", zh: "非常漂亮。" },
        ],
      },
      {
        lessonId: 11,
        sceneCloud: "バス · 歌が好きです",
        dialogueId: "l11-biaori",
        headline: "小野さんは歌が好きです",
        visualBeat:
          "旅行巴士内；风影同事唱歌（音符）；仅1グルミ拍手；热闹不写实人脸",
        bubbles: [
          { role: "同伴", side: "left", jp: "小野さんは歌が好きです。", zh: "小野喜欢唱歌。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、歌が上手です。", zh: "嗯，唱得好。" },
          { role: "同伴", side: "left", jp: "李さんも歌が好きですか。", zh: "你也喜欢唱吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "いいえ、聞くのが好きです。", zh: "不，我喜欢听。" },
        ],
      },
      {
        lessonId: 12,
        sceneCloud: "温泉街 · より若いです",
        dialogueId: "l12-biaori",
        headline: "李さんは森さんより若いです",
        visualBeat:
          "温泉街明信片架；仅1グルミ挑明信片；两风影一高一矮（より若い/背）幽默",
        bubbles: [
          { role: "同伴", side: "left", jp: "李さんと森さんとどちらが若いですか。", zh: "你和森谁更年轻？" },
          { role: "李", side: "right", isGurumi: true, jp: "李さんは森さんより若いです。", zh: "我比森更年轻。" },
          { role: "同伴", side: "left", jp: "どちらが背が高いですか。", zh: "谁更高？" },
          { role: "李", side: "right", isGurumi: true, jp: "森さんのほうが高いです。", zh: "森更高。" },
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
