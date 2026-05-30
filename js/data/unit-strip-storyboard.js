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
        sceneCloud: "自我介绍 · 出迎え",
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
          { role: "小野", side: "left", jp: "はじめまして、小野緑です。" },
          { role: "李", side: "right", isGurumi: true, jp: "あっ、森さんですか。すみません。" },
          { role: "森", side: "left", jp: "こちらこそ。" }
        ],
        note: "条带零字；泡里「田中」=风影接机人，不必写实脸",
      },
      {
        lessonId: 2,
        cornerZh: "机场卖店",
        sceneCloud: "指示事物 · 家族の写真",
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
          { role: "小野", side: "left", jp: "お父さんは おいくつですか。", zh: "您父亲多大岁数？" },
          { role: "李", side: "right", isGurumi: true, jp: "はい。この 写真は 二十歳の 時の 父です。", zh: "是的。这张照片是二十岁时的父亲。" },
          { role: "李", side: "right", isGurumi: true, jp: "ありがとうございます。", zh: "谢谢。" }
        ],
        note: "课文「本」=风铃/和杂货（指示词场景），非教室",
      },
      {
        lessonId: 3,
        cornerZh: "浅草站前",
        sceneCloud: "场所位置 · ホテルの周辺",
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
          { role: "小野", side: "left", jp: "あれは 駅です。", zh: "那是车站。" },
          { role: "小野", side: "left", jp: "銀行は あちらの 交差点の 左です。", zh: "银行在那边十字路口的左侧。" },
          { role: "小野", side: "left", jp: "いいえ。どういたしまして。", zh: "不客气。" }
        ],
        note: "会話=场所询问；条带禁止可读招牌",
      },
      {
        lessonId: 4,
        cornerZh: "酒店房间",
        sceneCloud: "存在与数量 · 部屋の様子",
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
          { role: "小野", side: "left", jp: "窓の 隣に 何が ありますか。", zh: "窗户旁边有什么？" },
          { role: "小野", side: "left", jp: "テレビは どこに ありますか。", zh: "电视在哪儿？" },
          { role: "小野", side: "left", jp: "いい 部屋ですね。", zh: "房间不错啊。" }
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
        sceneCloud: "时间与ます形 · 朝の習慣",
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
          { role: "小野", side: "left", jp: "会社には何時に着きますか。", zh: "几点到公司？" },
          { role: "李", side: "right", isGurumi: true, jp: "いいえ、森さんも早いですよ。", zh: "不，森先生您也很早啊。" },
          { role: "小野", side: "left", jp: "みんな、頑張っていますね。", zh: "大家都很努力呢。" }
        ],
        note: "条带零字；钟面仅数字无日文招牌",
      },
      {
        lessonId: 6,
        sceneCloud: "移动与方向 · 旅行の計画",
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
          { role: "小野", side: "left", jp: "一人で行きますか。", zh: "一个人去吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "小野さんもどこかへ行きますか。", zh: "小野你也打算去哪儿吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "じゃあ、また後で。", zh: "那回头再说。" }
        ],
      },
      {
        lessonId: 7,
        sceneCloud: "对象与频率 · カフェで注文",
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
          { role: "小野", side: "left", jp: "はい。それと、ケーキもありますか。", zh: "嗯。还有蛋糕吗？" },
          { role: "A", side: "left", jp: "（数分後）", zh: "（几分钟后）" },
          { role: "小野", side: "left", jp: "はい、ぜひ。", zh: "好的，一定。" }
        ],
        note: "菜单无字；店员=吧台后剪影",
      },
      {
        lessonId: 8,
        sceneCloud: "手段与授受 · プレゼントを渡す",
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
          { role: "李", side: "right", isGurumi: true, jp: "いいえ、どういたしまして。", zh: "不客气。" },
          { role: "森", side: "left", jp: "どうぞ使ってください。", zh: "请用吧。" },
          { role: "小野", side: "left", jp: "李さんは日本語が上手ですね。", zh: "小李日语真好啊。" }
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
        sceneCloud: "い形容词 · 料理の感想",
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
          { role: "小野", side: "left", jp: "これも辛いですか。", zh: "这个也辣吗？" },
          { role: "李", side: "right", isGurumi: true, jp: "私は大好きです。でも、あまり辛すぎるのはちょっと…", zh: "我非常喜欢。不过太辣的话有点……" },
          { role: "李", side: "right", isGurumi: true, jp: "ぜひ作ってください。楽しみにしています。", zh: "一定要做啊，我很期待。" }
        ],
        note: "条带零字；headline「四川」靠辛い味觉与泡",
      },
      {
        lessonId: 10,
        sceneCloud: "な形容词 · 観光地の感想",
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
          { role: "森", side: "left", jp: "金閣寺は？", zh: "金阁寺呢？" },
          { role: "李", side: "right", isGurumi: true, jp: "京都の料理もおいしかったです。特に湯豆腐が有名だと聞きました。", zh: "京都的菜也很好吃。听说汤豆腐特别有名。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、ぜひ行きたいです。", zh: "好的，一定想去。" }
        ],
        note: "签文大吉无字；headline红叶=秋景有名きれい",
      },
      {
        lessonId: 11,
        sceneCloud: "喜好与擅长 · 趣味の話",
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
          { role: "李", side: "right", isGurumi: true, jp: "いいえ、私はピアノが少しできますが、とても下手です。", zh: "不会，我会一点钢琴，但很不行。" },
          { role: "李", side: "right", isGurumi: true, jp: "小野さんはスポーツはどうですか。", zh: "小野，运动方面怎么样？" },
          { role: "小野", side: "left", jp: "楽しみにしています。", zh: "我很期待。" }
        ],
        note: "屏幕歌词无字；仅グルミ正脸",
      },
      {
        lessonId: 12,
        sceneCloud: "比较 · どっちがいい？",
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
          { role: "小野", side: "left", jp: "私は右の方が好きです。色がきれいですから。", zh: "我更喜欢右边，因为颜色漂亮。" },
          { role: "李", side: "right", isGurumi: true, jp: "じゃあ、右のにしましょうか。", zh: "那么选右边的吧？" },
          { role: "李", side: "right", isGurumi: true, jp: "プレゼントですから、もらう人が喜ぶ方が一番ですよね。", zh: "因为是礼物，收到的人高兴最重要吧。" }
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
        sceneCloud: "数量词 · 買い物で数量を言う",
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
          { role: "店員", side: "left", jp: "それは一冊２００円です。", zh: "那个一本200日元。" },
          { role: "李", side: "right", isGurumi: true, jp: "大丈夫です。じゃあ、そのペンを二本ください。", zh: "没问题。那请给我两支那个笔。" },
          { role: "李", side: "right", isGurumi: true, jp: "袋は結構です。そのまま持って帰ります。", zh: "不用袋子。就这样拿着回去。" }
        ],
        note: "条带零字；书架标签抽象色块无字",
      },
      {
        lessonId: 14,
        sceneCloud: "て形 · デパートでの買い物",
        dialogueId: "l14-biaori",
        headline: "昨日デパートへ行って買い物しました",
        visualBeat:
          "栄百货店内；购物袋+レシート得意笑；新靴新包；窗外テレビ塔オアシス21暮色",
        layers: {
          L1: "名古屋デパート1F",
          L2: "テレビ塔·オアシス21夜景",
          L3: "グルミ帽子围巾看收据",
          L4: "靴·鞄·购物袋",
        },
        bubbles: [          { role: "小野", side: "left", jp: "李さん、今日はどこへ行きましたか。", zh: "小李，今天去哪儿了？" },
          { role: "李", side: "right", isGurumi: true, jp: "デパートのレストランでご飯を食べてから、喫茶店でコーヒーを飲みました。", zh: "在百货公司餐厅吃完饭，又在咖啡店喝了咖啡。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、とても。でも、ちょっと疲れました。", zh: "是的，很好。不过有点累了。" },
          { role: "小野", side: "left", jp: "そうでもないですよ。リラックスできました。", zh: "也不尽然。我很放松。" }
        ],
        note: "收据/logo无字",
      },
      {
        lessonId: 15,
        sceneCloud: "进行态 · オフィスで許可を求める",
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
          { role: "李", side: "right", isGurumi: true, jp: "さっきまで電話をしていましたが、今は資料を読んでいます。", zh: "刚才一直在打电话，现在在看资料。" },
          { role: "李", side: "right", isGurumi: true, jp: "かしこまりました。", zh: "明白了。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい。そのまま動かないでください。…はい、撮りました。ありがとうございました。", zh: "好的。请保持不动。……好了，拍好了。谢谢。" }
        ],
        note: "报纸标题无字；条带零字",
      },
      {
        lessonId: 16,
        sceneCloud: "状态与描写 · ホテルの感想",
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
          { role: "李", side: "right", isGurumi: true, jp: "はい、ついています。でも、リモコンがありません。", zh: "开着。但没有遥控器。" },
          { role: "フロント", side: "left", jp: "かしこまりました。すぐにお持ちします。", zh: "明白了。马上给您拿来。" },
          { role: "小野", side: "left", jp: "おやすみなさい。", zh: "晚安。" }
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
        sceneCloud: "愿望 · 欲しいものの話",
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
          { role: "小野", side: "left", jp: "うーん、そうですね。今年の夏は北海道へ行きたいです。", zh: "嗯……是那样。今年夏天想去北海道。" },
          { role: "李", side: "right", isGurumi: true, jp: "ぜひ行きたいです。でも、まずはお金を貯めないと…", zh: "很想去。不过得先攒钱……" },
          { role: "李", side: "right", isGurumi: true, jp: "いいえ、まだまだです。もっと話せるようになりたいです。", zh: "还远远不够。我想说得更好。" }
        ],
        note: "条带零字；海报灯笼无字",
      },
      {
        lessonId: 18,
        sceneCloud: "变化 · 生活の変化",
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
          { role: "森", side: "left", jp: "それなら、あまり長く見ないほうがいいですよ。", zh: "那样的话，最好别盯着看太久。" },
          { role: "李", side: "right", isGurumi: true, jp: "雨が降るかもしれませんね。傘を持って行ったほうがいいですよ。", zh: "可能会下雨。最好带把伞。" },
          { role: "森", side: "left", jp: "お互い、気をつけましょう。", zh: "彼此都保重。" }
        ],
      },
      {
        lessonId: 19,
        sceneCloud: "禁止与义务 · 注意する・される",
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
          { role: "小野", side: "left", jp: "あと、出かけるときは電気やエアコンを消すのを忘れないでください。", zh: "还有，出门时别忘了关电灯和空调。" },
          { role: "李", side: "right", isGurumi: true, jp: "はい、気をつけます。", zh: "好的，我会注意的。" },
          { role: "森・小野", side: "left", jp: "いってらっしゃい。", zh: "走好。" }
        ],
        note: "站员=暖金色剪影无正脸；标识无字",
      },
      {
        lessonId: 20,
        sceneCloud: "可能 · できること・できないこと",
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
          { role: "李", side: "right", isGurumi: true, jp: "じゃあ、英語で話してみましょうか。", zh: "那用英语试试看？" },
          { role: "李", side: "right", isGurumi: true, jp: "そうですね。諦めずに続けます。", zh: "是啊。不放弃，继续练。" },
          { role: "森", side: "left", jp: "私は高校の時に登りました。とても大変でしたが、頂上からの景色は素晴らしかったです。", zh: "我高中时登过。非常累，但从山顶看到的景色很棒。" }
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
        sceneCloud: "た形与经历 · 歌舞伎",
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
          { role: "小野", side: "left", jp: "私も若いときに見たことがありますが、あまり覚えていません。", zh: "我年轻时也看过，但不太记得了。" },
          { role: "李", side: "right", isGurumi: true, jp: "いいですね。温泉はどうでしたか。", zh: "不错啊。温泉怎么样？" },
          { role: "小野", side: "left", jp: "ありがとうございます。お願いします。", zh: "谢谢。拜托了。" }
        ],
        note: "条带零字；海报无字",
      },
      {
        lessonId: 22,
        sceneCloud: "简体 · 友達",
        dialogueId: "l22-biaori",
        headline: "森さんは毎晩テレビを見る",
        visualBeat:
          "石造仓库民宿沙发；グルミ托腮看电视笑；零食行程表；窗外运河瓦斯灯夜景",
        layers: {
          L1: "小樽運河ゲストハウス",
          L2: "瓦斯灯运河倒影",
          L3: "グルミ放松大笑",
          L4: "テレビ·じゃがポックル",
        },
        bubbles: [          { role: "森", side: "left", jp: "李さん、今週の土曜日、何か予定ある？", zh: "小李，这周六有安排吗？" },
          { role: "森", side: "left", jp: "いや、大丈夫。飲み物と食べ物はこっちで用意するから。", zh: "没事，不用。吃的喝的这边准备。" },
          { role: "李", side: "right", isGurumi: true, jp: "じゃあ、土曜日に会おう。", zh: "那星期六见。" },
          { role: "全員", side: "left", jp: "乾杯！", zh: "干杯！" }
        ],
      },
      {
        lessonId: 23,
        sceneCloud: "たり表现 · 送別会",
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
          { role: "森", side: "left", jp: "遅れる場合は、連絡するように言っておきます。", zh: "如果迟到，我会让他们联系一声。" },
          { role: "李", side: "right", isGurumi: true, jp: "いいですね。日本では週末の過ごし方は人によって違いますね。", zh: "不错啊。在日本周末怎么过，因人而异。" },
          { role: "小野", side: "left", jp: "いいアイデアですね。それでは、早速準備を始めましょう。", zh: "好主意。那我们马上开始准备吧。" }
        ],
      },
      {
        lessonId: 24,
        sceneCloud: "引用与思考 · 見送り",
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
          { role: "李", side: "right", isGurumi: true, jp: "そうですか。田中さんにもよろしくと伝えてください。", zh: "是吗。也请代我向田中问好。" },
          { role: "小野", side: "left", jp: "そろそろ時間ですね。", zh: "差不多到时间了吧。" },
          { role: "李", side: "right", isGurumi: true, jp: "ありがとう！日本での思い出は一生忘れません。", zh: "谢谢！在日本的回忆我一辈子都不会忘。" }
        ],
        note: "条带零字；与单元1旅行帽呼应",
      },
    ],
  },
];

if (typeof globalThis !== "undefined") {
  globalThis.UNIT_STRIP_STORYBOARD = UNIT_STRIP_STORYBOARD;
}
