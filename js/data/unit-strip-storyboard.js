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
        cornerZh: "成田抵日",
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
        cornerZh: "机场卖店",
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
        cornerZh: "浅草站前",
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
        cornerZh: "酒店房间",
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
    unitArcZh: "酒店七時起床 → 东京站新干线 → 大阪喫茶コーヒー → 大阪公司手紙",
    source: "彩蛋/单元2/彩蛋-单元2（5-8）md.txt · 2026-05-22 彩蛋重绘",
    panels: [
      {
        lessonId: 5,
        sceneCloud: "ホテル朝 · 森さんは七時に起きます",
        dialogueId: "l5-biaori",
        headline: "森さんは七時に起きます",
        visualBeat:
          "酒店早晨俯拍；闹钟前景7時；グルミ浴衣睡衣揉眼打哈欠；窗外东京塔剪影；早餐托盘",
        layers: {
          L1: "ビジネスホテル客室・晨光",
          L2: "东京塔剪影·通勤电车高架",
          L3: "グルミ被窝伸手关闹钟·困倦",
          L4: "电子钟·Room Service托盘",
        },
        bubbles: [
          { role: "同事", side: "left", jp: "森さんは何時に起きますか。", zh: "森几点起床？" },
          { role: "李", side: "right", isGurumi: true, jp: "森さんは七時に起きます。", zh: "森七点起床。" },
          { role: "同事", side: "left", jp: "李さんは何時ですか。", zh: "你几点？" },
          { role: "李", side: "right", isGurumi: true, jp: "わたしも七時です。", zh: "我也是七点。" },
        ],
        note: "条带零字；钟面仅数字无日文招牌",
      },
      {
        lessonId: 6,
        sceneCloud: "東京駅 · 吉田さんは来月中国へ行きます",
        dialogueId: "l6-biaori",
        headline: "吉田さんは来月中国へ行きます",
        visualBeat:
          "新干线月台低角度；巨大白色车头；グルミ仰头拿车票+橙箱；乘客站务=风影",
        layers: {
          L1: "東京駅新幹線ホーム",
          L2: "丸之内赤炼瓦站舍远景",
          L3: "グルミ围巾震撼O型嘴",
          L4: "新干线车票·行李箱",
        },
        bubbles: [
          { role: "同事", side: "left", jp: "吉田さんはいつ中国へ行きますか。", zh: "吉田什么时候去中国？" },
          { role: "李", side: "right", isGurumi: true, jp: "吉田さんは来月中国へ行きます。", zh: "吉田下个月去中国。" },
          { role: "同事", side: "left", jp: "新幹線で行きますか。", zh: "坐新干线去吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、そうです。", zh: "是的。" },
        ],
      },
      {
        lessonId: 7,
        sceneCloud: "大阪喫茶 · 李さんは毎日コーヒーを飲みます",
        dialogueId: "l7-biaori",
        headline: "李さんは毎日コーヒーを飲みます",
        visualBeat:
          "心斋桥复古喫茶店；吧台高脚凳；グルミ捧大杯吹热气；窗外格力高风影；方糖牛奶",
        layers: {
          L1: "大阪レトロ喫茶・木吧台",
          L2: "道顿堀格力高广告牌虚化",
          L3: "グルミ小领巾满足眯眼·奶泡胡子",
          L4: "虹吸壶·咖啡杯热气",
        },
        bubbles: [
          { role: "店员", side: "left", jp: "いらっしゃいませ。", zh: "欢迎。" },
          { role: "李", side: "right", isGurumi: true, jp: "コーヒーをください。", zh: "请给我咖啡。" },
          { role: "店员", side: "left", jp: "毎日飲みますか。", zh: "每天都喝吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、毎日コーヒーを飲みます。", zh: "嗯，每天都喝咖啡。" },
        ],
        note: "菜单无字；店员=吧台后剪影",
      },
      {
        lessonId: 8,
        sceneCloud: "大阪会社 · 李さんは日本語で手紙を書きます",
        dialogueId: "l8-biaori",
        headline: "李さんは日本語で手紙を書きます",
        visualBeat:
          "大阪办公室45度俯拍；グルミ钢笔写便笺舌尖专注；窗外大阪城金鯱虚化；章鱼烧摆件煎茶",
        layers: {
          L1: "大阪オフィスデスク",
          L2: "大阪城天守阁远景",
          L3: "グルミ商务领巾写字",
          L4: "钢笔·信纸·信封抽象线",
        },
        bubbles: [
          { role: "同事", side: "left", jp: "何をしていますか。", zh: "在做什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "友達に手紙を書いています。", zh: "给朋友写信。" },
          { role: "同事", side: "left", jp: "日本語で書きますか。", zh: "用日语写吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、日本語で手紙を書きます。", zh: "是的，用日语写信。" },
        ],
        note: "条带无字；信纸假名仅泡区后置可选",
      },
    ],
  },
  {
    unitId: 3,
    stripTitle: "旅行の思い出",
    unitZh: "箱根旅行",
    unitArcZh: "箱根辣味噌湯豆腐→神社富士签文→旅馆カラオケ→土产黒卵饅頭纠结",
    source: "彩蛋/单元3/3单元（9、10、11、12）md.txt · 2026-05-22 彩蛋重绘",
    panels: [
      {
        lessonId: 9,
        sceneCloud: "箱根料理 · 四川料理は辛いです",
        dialogueId: "l9-biaori",
        headline: "四川料理は辛いです",
        visualBeat:
          "箱根温泉街和食店；浴衣グルミ跪坐；辣味噌豆腐入口脸红泪；芦之湖夕阳窗景；陶锅热气",
        layers: {
          L1: "箱根温泉街木造餐厅·榻榻米",
          L2: "芦ノ湖夕照·红叶山",
          L3: "グルミ辛い表情·浴衣",
          L4: "湯豆腐锅·辣味噌红油",
        },
        bubbles: [
          { role: "同伴", side: "left", jp: "この料理は辛いですか。", zh: "这菜辣吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、とても辛いです。", zh: "嗯，很辣。" },
          { role: "同伴", side: "left", jp: "おいしいですか。", zh: "好吃吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、おいしいです。", zh: "好吃。" },
        ],
        note: "条带零字；headline「四川」靠辛い味觉与泡",
      },
      {
        lessonId: 10,
        sceneCloud: "箱根神社 · 京都の紅葉は有名です",
        dialogueId: "l10-biaori",
        headline: "京都の紅葉は有名です",
        visualBeat:
          "箱根神社参道对称；グルミ读おみくじ后笑颜；石灯笼絵馬；远景富士山芦之湖；散落红叶",
        layers: {
          L1: "箱根神社杉树参道·石灯笼",
          L2: "富士山雪峰·湖面",
          L3: "グルミ浴衣羽织·签文",
          L4: "絵馬·红叶地面",
        },
        bubbles: [
          { role: "同伴", side: "left", jp: "京都の紅葉は有名ですね。", zh: "京都红叶很有名呢。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、とても有名です。", zh: "嗯，很有名。" },
          { role: "同伴", side: "left", jp: "きれいですね。", zh: "好漂亮。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、とてもきれいです。", zh: "非常漂亮。" },
        ],
        note: "签文大吉无字；headline红叶=秋景有名きれい",
      },
      {
        lessonId: 11,
        sceneCloud: "温泉旅館 · 小野さんは歌が好きです",
        dialogueId: "l11-biaori",
        headline: "小野さんは歌が好きです",
        visualBeat:
          "旅馆大広間；グルミ拿麦克风闭眼高歌；カラオケ屏蓝光；客人风影拍手；窗外箱根暮色温泉蒸汽",
        layers: {
          L1: "温泉旅館広間·榻榻米",
          L2: "箱根外轮山暮色·温泉白汽",
          L3: "グルミ陶醉唱歌·旅馆浴衣",
          L4: "麦克风·茶点矮桌",
        },
        bubbles: [
          { role: "同伴", side: "left", jp: "小野さんは歌が好きです。", zh: "小野喜欢唱歌。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、歌が上手です。", zh: "嗯，唱得好。" },
          { role: "同伴", side: "left", jp: "李さんも歌が好きですか。", zh: "你也喜欢唱吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "いいえ、聞くのが好きです。", zh: "不，我喜欢听。" },
        ],
        note: "屏幕歌词无字；仅グルミ正脸",
      },
      {
        lessonId: 12,
        sceneCloud: "土产店 · 李さんは森さんより若いです",
        dialogueId: "l12-biaori",
        headline: "李さんは森さんより若いです",
        visualBeat:
          "箱根土产店；左右手黒たまごvs温泉饅頭纠结；货架寄木細工；窗外红色登山电车大涌谷白汽",
        layers: {
          L1: "箱根土产店货架",
          L2: "登山电车·大涌谷蒸汽",
          L3: "グルミ旅行帽纠结脸",
          L4: "两盒土产·购物篮",
        },
        bubbles: [
          { role: "同伴", side: "left", jp: "李さんと森さんとどちらが若いですか。", zh: "你和森谁更年轻？" },
          { role: "李", side: "right", isGurumi: true, jp: "李さんは森さんより若いです。", zh: "我比森更年轻。" },
          { role: "同伴", side: "left", jp: "どちらを買いますか。", zh: "买哪个？" },
          { role: "李", side: "right", isGurumi: true, jp: "どちらがいいか、わかりません。", zh: "不知道哪个好。" },
        ],
        note: "条带零字；より若い在泡、画面为どっち土产（彩蛋txt）",
      },
    ],
  },
  {
    unitId: 4,
    stripTitle: "一緒に頑張ろう",
    unitZh: "公司生活②",
    unitArcZh: "名古屋书店三冊→栄デパート買い物→休憩室読新聞→ホテル広くて明るい",
    source: "彩蛋/单元4/4单元（13、14、15、16）md.txt · 2026-05-22 彩蛋重绘",
    panels: [
      {
        lessonId: 13,
        sceneCloud: "名古屋書店 · 机の上に本が三冊あります",
        dialogueId: "l13-biaori",
        headline: "机の上に本が三冊あります",
        visualBeat:
          "书店低角度；グルミ踮脚够高处本；购物篮内三冊；窗外名古屋城金鯱；汗珠努力脸",
        layers: {
          L1: "名古屋大型書店·木书架",
          L2: "名古屋城窗外",
          L3: "グルミ商务领巾踮脚",
          L4: "本·购物篮三冊",
        },
        bubbles: [
          { role: "同事", side: "left", jp: "机の上に何がありますか。", zh: "桌上有什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "机の上に本が三冊あります。", zh: "桌上有三本书。" },
          { role: "同事", side: "left", jp: "もう一冊買いますか。", zh: "再买一本吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、もう一冊ほしいです。", zh: "嗯，还想买一本。" },
        ],
        note: "条带零字；书架标签抽象色块无字",
      },
      {
        lessonId: 14,
        sceneCloud: "名古屋デパート · 昨日買い物をしました",
        dialogueId: "l14-biaori",
        headline: "昨日デパートへ行って、買い物をしました",
        visualBeat:
          "栄百货店内；购物袋+レシート得意笑；新靴新包；窗外テレビ塔オアシス21暮色",
        layers: {
          L1: "名古屋デパート1F",
          L2: "テレビ塔·オアシス21夜景",
          L3: "グルミ帽子围巾看收据",
          L4: "靴·鞄·购物袋",
        },
        bubbles: [
          { role: "同伴", side: "left", jp: "昨日デパートへ行きましたか。", zh: "昨天去百货了吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、行って、買い物をしました。", zh: "去了，购物了。" },
          { role: "同伴", side: "left", jp: "何を買いましたか。", zh: "买了什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "靴と鞄と服を買いました。", zh: "买了鞋、包和衣服。" },
        ],
        note: "收据/logo无字",
      },
      {
        lessonId: 15,
        sceneCloud: "会社休憩室 · 小野さんは今新聞を読んでいます",
        dialogueId: "l15-biaori",
        headline: "小野さんは今新聞を読んでいます",
        visualBeat:
          "公司休息室沙发；大报纸遮住グルミ只露双眼；咖啡热气；窗外JR中央双塔黄昏",
        layers: {
          L1: "名古屋会社休憩室",
          L2: "JRセントラルタワーズ暮色",
          L3: "グルミ读报进行时",
          L4: "新聞·咖啡杯",
        },
        bubbles: [
          { role: "同事", side: "left", jp: "小野さんは何をしていますか。", zh: "小野在做什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "小野さんは今新聞を読んでいます。", zh: "小野正在看报纸。" },
          { role: "同事", side: "left", jp: "李さんも読みますか。", zh: "你也看吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、今読んでいます。", zh: "嗯，正在看。" },
        ],
        note: "报纸标题无字；条带零字",
      },
      {
        lessonId: 16,
        sceneCloud: "名古屋ホテル · 広くて明るいです",
        dialogueId: "l16-biaori",
        headline: "ホテルの部屋は広くて明るいです",
        visualBeat:
          "酒店房间广角俯拍；グルミ张臂丈量宽敞；开箱行李；百合花瓶；窗外港口摩天轮夜景",
        layers: {
          L1: "名古屋ホテル客室",
          L2: "名古屋港摩天轮·水族馆剪影",
          L3: "グルミ室内服惊喜",
          L4: "行李箱·花瓶百合",
        },
        bubbles: [
          { role: "前台", side: "left", jp: "ホテルの部屋はどうですか。", zh: "房间怎么样？" },
          { role: "李", side: "right", isGurumi: true, jp: "部屋は広くて明るくて、きれいです。", zh: "又宽又亮，很漂亮。" },
          { role: "前台", side: "left", jp: "風呂はありますか。", zh: "有浴室吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、あります。", zh: "有的。" },
        ],
        note: "条带零字",
      },
    ],
  },
  {
    unitId: 5,
    stripTitle: "あけましておめでとう",
    unitZh: "迎新春",
    unitArcZh: "仙台商店街ほしい洋服→こたつ新旧手机→駅忘钥匙→雪祭餅つきできる",
    source: "彩蛋/单元5/第5单元（17、18、19、20）md.txt · 2026-05-22 彩蛋重绘",
    panels: [
      {
        lessonId: 17,
        sceneCloud: "仙台商店街 · 新しい洋服がほしいです",
        dialogueId: "l17-biaori",
        headline: "わたしは新しい洋服がほしいです",
        visualBeat:
          "一番町拱廊橱窗；グルミ贴玻璃眼冒星星；模特新冬装；旧衣对比；福袋；雪花",
        layers: {
          L1: "仙台一番町アーケード",
          L2: "仙台城跡雪丘",
          L3: "グルミほしい表情",
          L4: "福袋·橱窗冬装",
        },
        bubbles: [
          { role: "同伴", side: "left", jp: "新しい洋服がほしいですか。", zh: "想要新衣服吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、とてもほしいです。", zh: "嗯，很想要。" },
          { role: "同伴", side: "left", jp: "いいですね。", zh: "真好呢。" },
          { role: "李", side: "right", isGurumi: true, jp: "でも、ちょっと高いです。", zh: "不过有点贵。" },
        ],
        note: "条带零字；海报灯笼无字",
      },
      {
        lessonId: 18,
        sceneCloud: "こたつ · 携帯電話は小さくなりました",
        dialogueId: "l18-biaori",
        headline: "携帯電話はとても小さくなりました",
        visualBeat:
          "和室こたつ俯拍；左手大手机右手小手机；みかん热茶；窗外雪中庭院松岛",
        layers: {
          L1: "仙台旅馆和室·こたつ",
          L2: "雪中庭院·松岛湾",
          L3: "グルミ惊讶大小对比",
          L4: "新旧携帯·みかん",
        },
        bubbles: [
          { role: "同伴", side: "left", jp: "新しい携帯はどうですか。", zh: "新手机怎么样？" },
          { role: "李", side: "right", isGurumi: true, jp: "携帯電話はとても小さくなりました。", zh: "手机变小了很多。" },
          { role: "同伴", side: "left", jp: "軽くなりましたか。", zh: "变轻了吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、前より軽くなりました。", zh: "比以前轻了。" },
        ],
      },
      {
        lessonId: 19,
        sceneCloud: "仙台駅 · 部屋のかぎを忘れないでください",
        dialogueId: "l19-biaori",
        headline: "部屋のかぎを忘れないでください",
        visualBeat:
          "改札口外；グルミ翻空口袋惊慌；行李箱；站务风影弯腰；窗外摩天轮；忘れ物注意抽象牌",
        layers: {
          L1: "仙台駅改札付近",
          L2: "うみの杜観覧車窗外",
          L3: "グルミ慌张汗珠",
          L4: "スーツケース·空口袋",
        },
        bubbles: [
          { role: "站員", side: "left", jp: "かぎを忘れないでくださいね。", zh: "别忘了钥匙哦。" },
          { role: "李", side: "right", isGurumi: true, jp: "あ、かぎを忘れました。", zh: "啊，忘了钥匙。" },
          { role: "站員", side: "left", jp: "落とし物はありますか。", zh: "有遗失物吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "すみません、探します。", zh: "对不起，我找找。" },
        ],
        note: "站员=暖金色剪影无正脸；标识无字",
      },
      {
        lessonId: 20,
        sceneCloud: "雪まつり · ピアノを弾くことができます",
        dialogueId: "l20-biaori",
        headline: "スミスさんはピアノを弾くことができます",
        visualBeat:
          "东北雪祭黄昏；グルミ举杵打餅成功笑脸；祖母风影大杵示范；雪灯籠；蔵王连峰",
        layers: {
          L1: "雪まつり会場·屋台",
          L2: "蔵王连峰暮色",
          L3: "グルミできる喜び",
          L4: "杵·餅·雪洞烛光",
        },
        bubbles: [
          { role: "おばあさん", side: "left", jp: "餅つき、できますか。", zh: "会打年糕吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、できます。やってみます。", zh: "会，我试试。" },
          { role: "おばあさん", side: "left", jp: "上手ですね。", zh: "很熟练呢。" },
          { role: "李", side: "right", isGurumi: true, jp: "ありがとうございます。", zh: "谢谢。" },
        ],
        note: "headlineピアノ→餅つきできる（可能形）；条带零字",
      },
    ],
  },
  {
    unitId: 6,
    stripTitle: "また会いましょう",
    unitZh: "再见日本",
    unitArcZh: "札幌ジンギスカン→小樽民宿テレビ→白い恋人公園→新千歳空港告别",
    source: "彩蛋/单元6/第6单元（21、22、23、24）md.txt · 2026-05-22 彩蛋重绘",
    panels: [
      {
        lessonId: 21,
        sceneCloud: "札幌 · すき焼きを食べたことがあります",
        dialogueId: "l21-biaori",
        headline: "わたしはすき焼きを食べたことがあります",
        visualBeat:
          "ジンギスカン店铁板烤炉；グルミ夏装夹肉满足；すき焼き小锅；窗外札幌电视塔蓝调傍晚",
        layers: {
          L1: "札幌ジンギスカン店内",
          L2: "テレビ塔·大通公園",
          L3: "グルミ食べたことがある回味",
          L4: "烤炉·筷子·饭碗",
        },
        bubbles: [
          { role: "同伴", side: "left", jp: "すき焼きを食べたことがありますか。", zh: "吃过涮羊肉吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、食べたことがあります。", zh: "吃过。" },
          { role: "同伴", side: "left", jp: "おいしいですか。", zh: "好吃吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、とてもおいしいです。", zh: "非常好吃。" },
        ],
        note: "条带零字；海报无字",
      },
      {
        lessonId: 22,
        sceneCloud: "小樽民宿 · 森さんは今晩テレビを見る",
        dialogueId: "l22-biaori",
        headline: "森さんは今晩テレビを見る",
        visualBeat:
          "石造仓库民宿沙发；グルミ托腮看电视笑；零食行程表；窗外运河瓦斯灯夜景",
        layers: {
          L1: "小樽運河ゲストハウス",
          L2: "瓦斯灯运河倒影",
          L3: "グルミ放松大笑",
          L4: "テレビ·じゃがポックル",
        },
        bubbles: [
          { role: "同伴", side: "left", jp: "森さんは今晩何をしますか。", zh: "森今晚做什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "森さんは今晩テレビを見る。", zh: "森今晚看电视。" },
          { role: "同伴", side: "left", jp: "李さんは。", zh: "你呢？" },
          { role: "李", side: "right", isGurumi: true, jp: "わたしもテレビを見ます。", zh: "我也看电视。" },
        ],
      },
      {
        lessonId: 23,
        sceneCloud: "白い恋人パーク · 散歩したり買い物したり",
        dialogueId: "l23-biaori",
        headline: "休みの日、散歩したり買い物に行ったりします",
        visualBeat:
          "玫瑰花园欧风建筑；一手冰淇淋一手相机；购物袋饼干；札幌巨蛋藻岩山蓝天",
        layers: {
          L1: "白い恋人パーク",
          L2: "札幌ドーム·藻岩山",
          L3: "グルミ忙乱快乐舔冰淇淋",
          L4: "相机·购物袋·地图",
        },
        bubbles: [
          { role: "同伴", side: "left", jp: "休みの日、何をしますか。", zh: "休息日做什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "散歩したり、買い物に行ったりします。", zh: "散步，也去购物。" },
          { role: "同伴", side: "left", jp: "忙しいですね。", zh: "很忙呢。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、でも楽しいです。", zh: "嗯，但很开心。" },
        ],
      },
      {
        lessonId: 24,
        sceneCloud: "新千歳空港 · もうすぐ来ると思います",
        dialogueId: "l24-biaori",
        headline: "李さんはもうすぐ来ると思います",
        visualBeat:
          "出境大厅黄昏；グルミ回头含泪微笑；行李箱挂满全旅程纪念品；窗外飞机起飞夕阳",
        layers: {
          L1: "新千歳空港国際線ロビー",
          L2: "夕張山夕日·ANA起飞",
          L3: "グルミ旅行帽背包首尾呼应",
          L4: "各地土产挂件·护照",
        },
        bubbles: [
          { role: "同伴", side: "left", jp: "もう帰りますか。", zh: "要回去了吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、もうすぐ帰ります。", zh: "嗯，快回去了。" },
          { role: "同伴", side: "left", jp: "また来ますか。", zh: "还会来吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、また来ると思います。", zh: "嗯，我想还会来的。" },
        ],
        note: "条带零字；与单元1旅行帽呼应",
      },
    ],
  },
];

if (typeof globalThis !== "undefined") {
  globalThis.UNIT_STRIP_STORYBOARD = UNIT_STRIP_STORYBOARD;
}
