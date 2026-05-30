/**
 * 六单元 · 24 格分镜文案（审阅真源）
 * 精神原型：docs/story-strip-soul-lock.md（单元弧 + 教材 headline 画面 + 课文型泡）
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
        bubbles: [          { role: "李", side: "right", isGurumi: true, jp: "JC企画の 小野さんですか。" },
          { role: "小野", side: "left", jp: "はい、小野です。李秀麗さんですか。" },
          { role: "小野", side: "left", jp: "はい、小野です。李秀麗さんですか。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、李秀麗です。はじめまして。どうぞ よろしく お願いします。" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、それは 何ですか。", zh: "李小姐，那是什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "これは 私の 家族の 写真です。", zh: "这是我家人的照片。" },
          { role: "李", side: "right", isGurumi: true, jp: "これは 私の 家族の 写真です。", zh: "这是我家人的照片。" },
          { role: "小野", side: "left", jp: "この 方は どなたですか。", zh: "这位是谁？" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、ここは あなたの ホテルですか。", zh: "李小姐，这是您的酒店吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、そうです。", zh: "是的。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、そうです。", zh: "是的。" },
          { role: "小野", side: "left", jp: "あそこが 公園です。とても きれいですよ。", zh: "那边是公园。很漂亮哦。" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、部屋は どうですか。", zh: "李小姐，房间怎么样？" },
          { role: "李", side: "right", isGurumi: true, jp: "とても きれいです。", zh: "非常漂亮。" },
          { role: "李", side: "right", isGurumi: true, jp: "とても きれいです。", zh: "非常漂亮。" },
          { role: "小野", side: "left", jp: "何が ありますか。", zh: "有什么？" }
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
        bubbles: [          { role: "小野", side: "left", jp: "森さん、毎朝何時に起きますか。", zh: "森先生，每天早上几点起床？" },
          { role: "森", side: "left", jp: "６時半に起きます。", zh: "6点半起床。" },
          { role: "森", side: "left", jp: "６時半に起きます。", zh: "6点半起床。" },
          { role: "小野", side: "left", jp: "じゃあ、朝ごはんは？", zh: "那么，早饭呢？" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、来月の休みにどこかへ行きますか。", zh: "小李，下个月休假要去哪儿吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、京都へ行く予定です。", zh: "嗯，打算去京都。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、京都へ行く予定です。", zh: "嗯，打算去京都。" },
          { role: "小野", side: "left", jp: "いいですね。何で行きますか。", zh: "好啊。坐什么去？" }
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
        bubbles: [          { role: "店員", side: "left", jp: "いらっしゃいませ。ご注文はお決まりですか。", zh: "欢迎光临。您点好了吗？" },
          { role: "小野", side: "left", jp: "すみません、ちょっとまだ… 李さん、何にしますか。", zh: "不好意思，还没……小李，你点什么？" },
          { role: "小野", side: "left", jp: "すみません、ちょっとまだ… 李さん、何にしますか。", zh: "不好意思，还没……小李，你点什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "私はコーヒーにします。小野さんは？", zh: "我点咖啡。小野呢？" }
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
        bubbles: [          { role: "李", side: "right", isGurumi: true, jp: "小野さん、これ、プレゼントです。中国のお菓子です。", zh: "小野，这是礼物。中国的点心。" },
          { role: "小野", side: "left", jp: "まあ、ありがとうございます。開けてもいいですか。", zh: "哎呀，谢谢。可以打开吗？" },
          { role: "小野", side: "left", jp: "まあ、ありがとうございます。開けてもいいですか。", zh: "哎呀，谢谢。可以打开吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、どうぞ。", zh: "嗯，请。" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、この四川料理はどうですか。", zh: "小李，这道四川菜怎么样？" },
          { role: "李", side: "right", isGurumi: true, jp: "とても辛いですが、美味しいです。", zh: "非常辣，但很好吃。" },
          { role: "李", side: "right", isGurumi: true, jp: "とても辛いですが、美味しいです。", zh: "非常辣，但很好吃。" },
          { role: "小野", side: "left", jp: "そうですか。私はちょっと辛すぎます。", zh: "是吗。我觉得有点太辣了。" }
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
        bubbles: [          { role: "森", side: "left", jp: "李さん、京都はどうでしたか。", zh: "小李，京都怎么样？" },
          { role: "李", side: "right", isGurumi: true, jp: "とてもよかったです。紅葉が本当にきれいでした。", zh: "非常好。红叶真的很漂亮。" },
          { role: "李", side: "right", isGurumi: true, jp: "とてもよかったです。紅葉が本当にきれいでした。", zh: "非常好。红叶真的很漂亮。" },
          { role: "森", side: "left", jp: "そうですか。どこへ行きましたか。", zh: "是吗。你去哪儿了？" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、趣味は何ですか。", zh: "小李，爱好是什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "音楽を聞くことです。特に日本のポップスが好きです。", zh: "听音乐，尤其喜欢日本流行音乐。" },
          { role: "李", side: "right", isGurumi: true, jp: "音楽を聞くことです。特に日本のポップスが好きです。", zh: "听音乐，尤其喜欢日本流行音乐。" },
          { role: "小野", side: "left", jp: "そうですか。私は歌を歌うことが好きです。でも、あまり上手じゃありません。", zh: "是吗。我喜欢唱歌，但不太擅长。" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、これとこれとどっちがいいですか。", zh: "小李，这个和这个哪个好？" },
          { role: "李", side: "right", isGurumi: true, jp: "そうですね…値段はどちらも同じぐらいですか。", zh: "嗯……价格两边差不多吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "そうですね…値段はどちらも同じぐらいですか。", zh: "嗯……价格两边差不多吗？" },
          { role: "小野", side: "left", jp: "いいえ、左の方がちょっと安いです。右は少し高いです。", zh: "不，左边稍便宜，右边稍贵。" }
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
        bubbles: [          { role: "店員", side: "left", jp: "いらっしゃいませ。何をお探しですか。", zh: "欢迎光临。您在找什么？" },
          { role: "李", side: "right", isGurumi: true, jp: "ノートを探しています。", zh: "我在找笔记本。" },
          { role: "李", side: "right", isGurumi: true, jp: "ノートを探しています。", zh: "我在找笔记本。" },
          { role: "店員", side: "left", jp: "こちらがノートです。いろいろな種類があります。", zh: "这边是笔记本。有很多种。" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、今日はどこへ行きましたか。", zh: "小李，今天去哪儿了？" },
          { role: "李", side: "right", isGurumi: true, jp: "デパートへ行って、買い物しました。", zh: "去了百货公司，买了东西。" },
          { role: "李", side: "right", isGurumi: true, jp: "デパートへ行って、買い物しました。", zh: "去了百货公司，买了东西。" },
          { role: "小野", side: "left", jp: "何を買いましたか。", zh: "买了什么？" }
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
        bubbles: [          { role: "李", side: "right", isGurumi: true, jp: "すみません、小野さん、今、ちょっとお聞きしたいんですが。", zh: "不好意思，小野，我现在想请教一下。" },
          { role: "小野", side: "left", jp: "はい、何ですか。", zh: "嗯，什么事？" },
          { role: "小野", side: "left", jp: "はい、何ですか。", zh: "嗯，什么事？" },
          { role: "李", side: "right", isGurumi: true, jp: "このオフィスで写真を撮ってもいいですか。", zh: "在这个办公室拍照可以吗？" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、ホテルの部屋はどうですか。", zh: "小李，酒店房间怎么样？" },
          { role: "李", side: "right", isGurumi: true, jp: "とても広くて明るいです。窓から庭が見えます。", zh: "很宽敞明亮。从窗户能看到院子。" },
          { role: "李", side: "right", isGurumi: true, jp: "とても広くて明るいです。窓から庭が見えます。", zh: "很宽敞明亮。从窗户能看到院子。" },
          { role: "小野", side: "left", jp: "いいですね。私はこの静かで落ち着く雰囲気が好きです。", zh: "不错啊。我喜欢这种安静、让人静下来的气氛。" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、今、何かほしいものがありますか。", zh: "小李，现在有什么想要的吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "そうですね…新しいパソコンがほしいです。今使っているのはちょっと古くて、動作が遅いんです。", zh: "嗯……想要新电脑。现在用的有点旧，运行很慢。" },
          { role: "李", side: "right", isGurumi: true, jp: "そうですね…新しいパソコンがほしいです。今使っているのはちょっと古くて、動作が遅いんです。", zh: "嗯……想要新电脑。现在用的有点旧，运行很慢。" },
          { role: "小野", side: "left", jp: "ああ、わかります。私も最近、スマホを新しくしようかなと思っています。", zh: "啊，我懂。我最近也在想要不要换新手机。" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、最近の携帯電話は本当に小さくなりましたね。", zh: "小李，最近的手机真的变小了。" },
          { role: "李", side: "right", isGurumi: true, jp: "そうですね。昔のは大きくて重かったですが、今のは軽くて持ちやすいです。", zh: "是啊。以前的又大又重，现在的轻便好拿。" },
          { role: "李", side: "right", isGurumi: true, jp: "そうですね。昔のは大きくて重かったですが、今のは軽くて持ちやすいです。", zh: "是啊。以前的又大又重，现在的轻便好拿。" },
          { role: "森", side: "left", jp: "それに、機能も便利になりました。インターネットもできるし、写真もきれいです。", zh: "而且功能也更方便了。能上网，照片也清晰。" }
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
        bubbles: [          { role: "森", side: "left", jp: "李さん、明日から旅行ですね。気をつけて行ってきてください。", zh: "小李，明天开始旅行了吧。路上小心。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、ありがとうございます。", zh: "好的，谢谢。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、ありがとうございます。", zh: "好的，谢谢。" },
          { role: "小野", side: "left", jp: "ところで、ホテルの部屋のかぎは忘れないでくださいね。", zh: "对了，别忘了拿酒店房间钥匙。" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、何か特技はありますか。", zh: "小李，有什么特长吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "そうですね…中国の料理を作ることができます。特に餃子が得意です。", zh: "嗯……会做中国菜。尤其擅长包饺子。" },
          { role: "李", side: "right", isGurumi: true, jp: "そうですね…中国の料理を作ることができます。特に餃子が得意です。", zh: "嗯……会做中国菜。尤其擅长包饺子。" },
          { role: "森", side: "left", jp: "すごいですね。私は料理があまりできません。", zh: "真厉害。我不太会做饭。" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、日本の伝統的なものを見たことがありますか。", zh: "小李，看过日本传统的东西吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "いいえ、まだあまりありません。でも、いつか歌舞伎を見たいです。", zh: "还没有，不多。但我想哪天去看看歌舞伎。" },
          { role: "李", side: "right", isGurumi: true, jp: "いいえ、まだあまりありません。でも、いつか歌舞伎を見たいです。", zh: "还没有，不多。但我想哪天去看看歌舞伎。" },
          { role: "森", side: "left", jp: "私は見たことがあります。先月、友達と一緒に歌舞伎座へ行きました。", zh: "看过。上个月和朋友一起去了歌舞伎座。" }
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
        bubbles: [          { role: "森", side: "left", jp: "李さん、今週の土曜日、何か予定ある？", zh: "小李，这周六有安排吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "ううん、特にないよ。どうしたの？", zh: "嗯，没什么。怎么了？" },
          { role: "李", side: "right", isGurumi: true, jp: "ううん、特にないよ。どうしたの？", zh: "嗯，没什么。怎么了？" },
          { role: "森", side: "left", jp: "うちで送別会をするんだけど、来ない？", zh: "家里要开欢送会，来吗？" }
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
        bubbles: [          { role: "小野", side: "left", jp: "今週の金曜日、李さんの送別会をします。みんな、何をしますか。", zh: "这周五要办小李的欢送会。大家准备做什么？" },
          { role: "森", side: "left", jp: "食事をしたり、話をしたり、写真を撮ったりしましょう。", zh: "一起吃饭、聊天、拍照吧。" },
          { role: "森", side: "left", jp: "食事をしたり、話をしたり、写真を撮ったりしましょう。", zh: "一起吃饭、聊天、拍照吧。" },
          { role: "田中", side: "left", jp: "いいですね。カラオケも行ったりしますか。", zh: "不错啊。也会去唱卡拉OK吗？" }
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
        bubbles: [          { role: "小野", side: "left", jp: "李さん、もうすぐ出発の時間ですね。", zh: "小李，快出发了吧。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい。本当にありがとうございました。", zh: "嗯。非常感谢。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい。本当にありがとうございました。", zh: "嗯。非常感谢。" },
          { role: "森", side: "left", jp: "こちらこそ。李さんのおかげで、楽しい時間を過ごせました。", zh: "我才要谢谢你。托小李的福，过得很开心。" }
        ],
        note: "条带零字；与单元1旅行帽呼应",
      },
    ],
  },
];

if (typeof globalThis !== "undefined") {
  globalThis.UNIT_STRIP_STORYBOARD = UNIT_STRIP_STORYBOARD;
}
