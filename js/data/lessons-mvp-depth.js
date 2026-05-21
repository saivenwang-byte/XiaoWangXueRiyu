/** 每课扩展：文法補足 · 会話 · 测验 · 単語（仅当课，不混课） */
const LESSON_DEPTH_PATCH = {
  14: {
    vocab: [
      { id: "l14_v_dep", jp: "デパート", kana: "デパート", meaningJa: "デパートで買い物をする", meaningZh: "百货商场", example: "昨日デパートへ行きました。", from: "dialogue" },
      { id: "l14_v_kaimono", jp: "買い物", kana: "かいもの", meaningJa: "ものを買うこと", meaningZh: "购物", example: "買い物をしました。", ruby: [{ kanji: "買", reading: "か" }, { kanji: "物", reading: "もの" }], from: "dialogue" },
      { id: "l14_v_kinou", jp: "昨日", kana: "きのう", meaningJa: "きのうのこと", meaningZh: "昨天", example: "昨日デパートへ行きました。", from: "text" },
      { id: "l14_v_te", jp: "て形", kana: "てけい", meaningJa: "文をつなぐ動詞の形", meaningZh: "て形", example: "書いて、読んで、食べて。", from: "grammar" },
      { id: "l14_v_kudasai", jp: "ください", kana: "ください", meaningJa: "お願いする", meaningZh: "请（礼貌）", example: "ちょっと待ってください。", from: "grammar" },
      { id: "l14_v_kara", jp: "てから", kana: "てから", meaningJa: "AのあとでBする", meaningZh: "做完A再B", example: "家へ帰ってから、勉強します。", from: "grammar" },
      { id: "l14_v_teiru", jp: "ています", kana: "ています", meaningJa: "今している", meaningZh: "正在", example: "今、手紙を書いています。", from: "grammar" },
      { id: "l14_v_mashouka", jp: "ましょうか", kana: "ましょうか", meaningJa: "私がしましょうか", meaningZh: "我来…好吗", example: "傘を貸しましょうか。", from: "grammar" },
      { id: "l14_v_sanpo", jp: "散歩", kana: "さんぽ", meaningJa: "歩いて楽しむ", meaningZh: "散步", example: "公園を散歩します。", ruby: [{ kanji: "散歩", reading: "さんぽ" }], from: "grammar" },
      { id: "l14_v_eki", jp: "駅", kana: "えき", meaningJa: "電車・バスの駅", meaningZh: "车站", example: "このバスは駅に行きますか。", from: "dialogue" },
      { id: "l14_v_bus", jp: "バス", kana: "バス", meaningJa: "バスに乗る", meaningZh: "公交车", example: "バス停で待ちます。", from: "dialogue" },
    ],
    nodePatches: {
      l14_teform: {
        tags: ["#動詞活用", "#接続の基本"],
        depthSections: [
          {
            heading: "① て形の本当の役割",
            blocks: [
              { type: "text", text: "て形はただの「接続」ではありません。" },
              {
                type: "list",
                items: [
                  "順番：AしてからBする（家へ帰って、勉強する）",
                  "理由・原因：AなのでB（高くて買えない）",
                  "手段・方法：Aのやり方でBする（歩いて学校へ行く）",
                  "付帯状況：AをしながらBする（めがねをかけて本を読む）",
                ],
              },
            ],
          },
          {
            heading: "② ます形接続とて形接続",
            blocks: [
              { type: "pair", bad: "家へ帰ります、勉強します。（ロボットみたい）", good: "家へ帰って、勉強します。（自然）" },
              { type: "text", text: "文をつなぐときは「て形」が基本です。" },
            ],
          },
          {
            heading: "③ よくある間違い",
            blocks: [
              { type: "pair", bad: "書いて→書くて", good: "書いて（正）" },
              { type: "pair", bad: "待って→待ちて", good: "待って（正）" },
            ],
          },
          {
            heading: "④ グループ別て形",
            blocks: [
              {
                type: "list",
                items: [
                  "1グループ：う・つ・る→って / む・ぶ・ぬ→んで / く→いて / ぐ→いで / す→して",
                  "2グループ：る→て",
                  "3グループ：する→して / 来る→来て",
                ],
              },
            ],
          },
        ],
      },
      l14_tekudasai: {
        depthSections: [
          {
            heading: "① 丁寧さのレベル",
            blocks: [
              {
                type: "list",
                items: [
                  "友だち：ちょっと待って。",
                  "普通：ちょっと待ってください。",
                  "もっと丁寧：ちょっと待ってくださいませんか。",
                ],
              },
            ],
          },
          {
            heading: "② 「すみませんが」",
            blocks: [
              { type: "pair", bad: "ちょっと待ってください。（命令っぽい）", good: "すみませんが、ちょっと待ってください。" },
            ],
          },
        ],
      },
      l14_tekara: {
        depthSections: [
          {
            heading: "① てから vs たあとで",
            blocks: [
              { type: "text", text: "てから＝順番に焦点。たあとで＝時間の前後を客観的に言う。" },
              {
                type: "pair",
                bad: "昨日、映画を見てから、家へ帰りました。（単発の過去には不自然）",
                good: "毎日、宿題をしてから、ゲームをします。（習慣にピッタリ）",
              },
            ],
          },
        ],
      },
      l14_teiru_action: {
        depthSections: [
          {
            heading: "① 進行 vs 結果の状態",
            blocks: [
              { type: "text", text: "動作動詞＋ている＝今している。変化動詞＋ている＝結果の状態（第16課）。" },
              { type: "pair", bad: "私は毎日、日本語を勉強しています。（習慣）", good: "私は毎日、日本語を勉強します。" },
            ],
          },
        ],
      },
      l14_mashouka: {
        depthSections: [
          {
            heading: "① ましょう vs ましょうか",
            blocks: [
              { type: "pair", bad: "一緒に映画を見ましょう。→ 一緒にする", good: "傘を貸しましょうか。→ 自分がする申し出" },
            ],
          },
        ],
      },
    },
    grammarNodesAdd: [
      {
        id: "l14_wo_motion",
        title: "助詞「を」の移動用法",
        titleZh: "を表经过",
        supplement: true,
        explanation: "移動動詞と一緒に「を」は通る場所を表します。",
        example: "公園を散歩します。 / 橋を渡ります。",
        exampleRuby: [{ kanji: "公園", reading: "こうえん" }, { kanji: "散歩", reading: "さんぽ" }],
        links: [{ type: "prerequisite", label: "📖 前：助詞「を」の基本（第6課）", miniCardKey: "masu_kei" }],
        tags: ["#助詞", "#移動表現"],
        depthSections: [
          {
            heading: "テストのポイント",
            blocks: [
              { type: "pair", bad: "公園で散歩します。（移動のニュアンスが弱い）", good: "公園を散歩します。（中を通る）" },
            ],
          },
        ],
      },
      {
        id: "l14_adverbs",
        title: "副詞の使い分け",
        titleZh: "副词",
        supplement: true,
        explanation: "なかなか・もう・まだ・まず/それから/最後に",
        example: "なかなか美味しい。 / もう食べました。 / まだ食べていません。",
        tags: ["#副詞", "#日常表現"],
        depthSections: [
          {
            heading: "① なかなか / もう / まだ",
            blocks: [
              { type: "text", text: "なかなか＋肯定＝思ったより。なかなか＋否定＝簡単には〜ない。" },
              { type: "text", text: "もう＋肯定＝もうした。まだ＋否定＝まだしていない。まだ＋肯定＝最中。" },
            ],
          },
        ],
      },
    ],
    conversationScenesAdd: [
      {
        id: "l14_scene_eki",
        sceneEmoji: "🚉",
        scenePlace: "駅",
        title: "駅のホーム",
        opener: {
          speaker: "A",
          japanese: "すみません、次の電車は何時ですか。",
          japaneseRuby: [{ kanji: "次", reading: "つぎ" }, { kanji: "電車", reading: "でんしゃ" }],
          chinese: "不好意思，下一班电车几点？",
        },
        userTurn: {
          speaker: "B",
          replies: [
            {
              japanese: "10時10分です。あと5分ほどお待ちください。",
              chinese: "10点10分，请再等大约5分钟。",
              noteJa: "時刻＋待ってください。",
              npcReaction: { japanese: "ありがとうございます。", chinese: "谢谢。" },
            },
            {
              japanese: "ええと…ちょっと待ってくださいね。…はい、10時です。",
              chinese: "呃…请稍等。…是的，10点。",
              noteJa: "すぐ答えられないときの言い方。",
              npcReaction: { japanese: "大丈夫です、急いでいません。", chinese: "没关系，我不急。" },
            },
          ],
        },
      },
      {
        id: "l14_scene_cafe",
        sceneEmoji: "☕",
        scenePlace: "カフェ",
        title: "友達と休憩",
        opener: {
          speaker: "A",
          japanese: "少し休みませんか。コーヒーを飲みましょう。",
          chinese: "休息一下吗？喝杯咖啡吧。",
        },
        userTurn: {
          speaker: "B",
          replies: [
            {
              japanese: "いいですね。砂糖を入れますか。",
              chinese: "好啊。要加糖吗？",
              noteJa: "提案に同意して質問を続ける。",
              npcReaction: { japanese: "いいえ、ブラックで大丈夫です。", chinese: "不用，黑咖就好。" },
            },
            {
              japanese: "すみません、今日はちょっと急いでいます。",
              chinese: "抱歉，今天有点赶时间。",
              noteJa: "丁寧に断る。",
              npcReaction: { japanese: "わかりました。また今度。", chinese: "明白了，下次吧。" },
            },
          ],
        },
      },
    ],
    branchPilot: {
      id: "l14_branch_bag",
      sceneEmoji: "🚉",
      scenePlace: "駅",
      title: "分岐 · 荷物をどうする？",
      isBranch: true,
      opener: {
        speaker: "A",
        japanese: "荷物がたくさんですね。大丈夫ですか。",
        japaneseRuby: [{ kanji: "荷物", reading: "にもつ" }],
        chinese: "行李不少啊，还好吗？",
      },
      choice: {
        japanese: "どうしますか。",
        chinese: "怎么办？",
        options: [
          {
            id: "help",
            japanese: "持ちましょうか。",
            chinese: "我来帮您拿好吗？",
            npcReaction: {
              japanese: "すみません、お願いします。エレベーターはあちらです。",
              chinese: "麻烦您了，电梯在那边。",
            },
          },
          {
            id: "self",
            japanese: "自分で持てます。大丈夫です。",
            chinese: "我自己能拿，没问题。",
            npcReaction: {
              japanese: "そうですか。気をつけてくださいね。",
              chinese: "是吗，请小心。",
            },
          },
          {
            id: "later",
            japanese: "あとで運びます。",
            chinese: "待会再搬。",
            npcReaction: {
              japanese: "わかりました。荷物置き場はここです。",
              chinese: "好的，行李寄存处在这里。",
            },
          },
        ],
      },
    },
    dialoguesAdd: [
      {
        id: "l14_dialogue_bus",
        title: "バス停で",
        sceneEmoji: "🚌",
        scenePlace: "バス停",
        opener: {
          speaker: "A",
          japanese: "すみません、このバスは駅に行きますか。",
          japaneseRuby: [{ kanji: "駅", reading: "えき" }],
          chinese: "不好意思，这趟公交车去车站吗？",
        },
        userTurn: {
          speaker: "B",
          replies: [
            {
              japanese: "はい、行きますよ。次の停留所です。",
              chinese: "是的，去。下一站就是。",
              noteJa: "「よ」で親切。「次の」で具体情報。",
              noteZh: "语气词显得亲切，并补充具体信息。",
            },
            {
              japanese: "ええと…ちょっと待ってくださいね。…はい、行きます。あと5分で来ます。",
              chinese: "呃…请稍等。（看时刻表）…是的，5分钟后到。",
              noteJa: "すぐ答えられないときは「ええと」「待ってください」で間をもたせる。",
              noteZh: "不能立刻回答时先缓冲，再查信息后答复。",
            },
            {
              japanese: "すみません、私はわかりません。あちらの係員に聞いてください。",
              chinese: "抱歉我不知道，请问那边的工作人员。",
              noteJa: "わからないときは無理に答えず、係員を紹介する。",
              noteZh: "不知道就别硬答，指引对方找工作人员。",
            },
          ],
        },
      },
    ],
    quizReplace: [
      {
        id: "l14_q1",
        type: "choice",
        question: "今、手紙を＿＿＿。",
        options: ["書く", "書いている", "書いています", "書きました"],
        answer: 2,
        explanation: "「今」があるから「書いています」。ていねいな文。",
        grammarNodeId: "l14_teiru_action",
      },
      {
        id: "l14_q2",
        type: "choice",
        question: "ちょっと待って＿＿＿。",
        options: ["ます", "いる", "ください", "から"],
        answer: 2,
        explanation: "「〜てください」で依頼。",
        grammarNodeId: "l14_tekudasai",
      },
      {
        id: "l14_q3",
        type: "fill",
        question: "家へ＿＿＿から、勉強します。（帰る）",
        answer: "帰って",
        explanation: "「帰る」→「帰って」。促音便。",
        grammarNodeId: "l14_tekara",
      },
      {
        id: "l14_q4",
        type: "choice",
        question: "毎朝、公園を＿＿＿。",
        options: ["散歩する", "散歩します", "散歩している", "BもCも正しい"],
        answer: 3,
        explanation: "習慣は「ます」でも「ています」でも可。「を」は通る場所。",
        grammarNodeId: "l14_wo_motion",
      },
      {
        id: "l14_q5",
        type: "choice",
        question: "荷物を＿＿＿か。",
        options: ["持ちます", "持ちましょう", "持ちましょうか", "持ってください"],
        answer: 2,
        explanation: "申し出は「〜ましょうか」。",
        grammarNodeId: "l14_mashouka",
      },
    ],
  },
  16: {
    vocab: [
      { id: "l16_v_hiroi", jp: "広い", kana: "ひろい", meaningJa: "スペースが大きい", meaningZh: "宽敞", example: "部屋は広くて明るいです。", ruby: [{ kanji: "広", reading: "ひろ" }], from: "grammar" },
      { id: "l16_v_akarui", jp: "明るい", kana: "あかるい", meaningJa: "光が多い", meaningZh: "明亮", example: "窓が明るいです。", ruby: [{ kanji: "明", reading: "あか" }], from: "grammar" },
      { id: "l16_v_hotel", jp: "ホテル", kana: "ホテル", meaningJa: "泊まるところ", meaningZh: "酒店", example: "ホテルの部屋はどうでしたか。", from: "dialogue" },
      { id: "l16_v_kirei", jp: "きれい", kana: "きれい", meaningJa: "見た目がよい", meaningZh: "漂亮", example: "とてもきれいでした。", from: "dialogue" },
      { id: "l16_v_demo", jp: "でも", kana: "でも", meaningJa: "前と反対のことを言う", meaningZh: "但是", example: "きれいでした。でも、高かったです。", from: "grammar" },
      { id: "l16_v_wareru", jp: "割れる", kana: "われる", meaningJa: "ガラスなどが壊れる（自動詞）", meaningZh: "破裂", example: "窓が割れています。", ruby: [{ kanji: "割", reading: "わ" }], from: "grammar" },
      { id: "l16_v_kaze", jp: "風邪", kana: "かぜ", meaningJa: "病気の一種", meaningZh: "感冒", example: "風邪で学校を休みました。", ruby: [{ kanji: "風邪", reading: "かぜ" }], from: "grammar" },
      { id: "l16_v_toiu", jp: "という", kana: "という", meaningJa: "名前を説明する", meaningZh: "叫做", example: "「さくら」という花です。", from: "grammar" },
      { id: "l16_v_omotta", jp: "思ったより", kana: "おもったより", meaningJa: "予想より", meaningZh: "比想象中", example: "思ったより広かったです。", ruby: [{ kanji: "思", reading: "おも" }], from: "dialogue" },
      { id: "l16_v_kaiteki", jp: "快適", kana: "かいてき", meaningJa: "心地よい", meaningZh: "舒适", example: "快適でした。", ruby: [{ kanji: "快適", reading: "かいてき" }], from: "dialogue" },
    ],
    nodePatches: {
      l16_adj_teform: {
        depthSections: [
          {
            heading: "イ形 vs ナ形",
            blocks: [
              { type: "list", items: ["イ形容詞：広い→広くて", "ナ形容詞：静かだ→静かで", "並べる：広くて明るいです。"] },
            ],
          },
        ],
      },
      l16_teiru_result: {
        depthSections: [
          {
            heading: "結果の状態",
            blocks: [
              { type: "pair", bad: "窓を割れています。", good: "窓が割れています。（自動詞）" },
              { type: "text", text: "第14課の「今している」とは違い、今見える結果に焦点。" },
            ],
          },
        ],
      },
      l16_de_cause: {
        depthSections: [
          {
            heading: "〜で vs 〜から",
            blocks: [
              { type: "pair", bad: "風邪から休みました。（感情っぽい）", good: "風邪で休みました。（客観的原因）" },
            ],
          },
        ],
      },
    },
    conversationScenesAdd: [
      {
        id: "l16_scene_lobby",
        sceneEmoji: "🏨",
        scenePlace: "ロビー",
        title: "チェックイン",
        opener: {
          speaker: "A",
          japanese: "お部屋は8階です。エレベーターはあちらです。",
          japaneseRuby: [{ kanji: "部屋", reading: "へや" }],
          chinese: "房间在8楼，电梯在那边。",
        },
        userTurn: {
          speaker: "B",
          replies: [
            {
              japanese: "ありがとうございます。朝食は何時からですか。",
              chinese: "谢谢。早餐几点开始？",
              npcReaction: { japanese: "7時から9時までです。", chinese: "7点到9点。" },
            },
            {
              japanese: "すみません、もう一度お願いします。",
              chinese: "不好意思，请再说一遍。",
              npcReaction: { japanese: "8階です。わかりましたか。", chinese: "8楼，明白了吗？" },
            },
          ],
        },
      },
      {
        id: "l16_scene_street",
        sceneEmoji: "🌆",
        scenePlace: "道",
        title: "道を聞く",
        opener: {
          speaker: "A",
          japanese: "すみません、駅はどちらですか。",
          japaneseRuby: [{ kanji: "駅", reading: "えき" }],
          chinese: "不好意思，车站在哪边？",
        },
        userTurn: {
          speaker: "B",
          replies: [
            {
              japanese: "まっすぐ行って、二つ目の信号を右です。",
              chinese: "直走，第二个红绿灯右转。",
              npcReaction: { japanese: "ありがとうございます。", chinese: "谢谢。" },
            },
            {
              japanese: "この地図を見てください。ここです。",
              chinese: "请看这张地图，在这里。",
              npcReaction: { japanese: "なるほど、助かりました。", chinese: "原来如此，帮大忙了。" },
            },
          ],
        },
      },
    ],
    dialoguesAdd: [
      {
        id: "l16_dialogue_rest",
        title: "体調とおすすめ",
        sceneEmoji: "🏥",
        scenePlace: "休み",
        opener: {
          speaker: "A",
          japanese: "風邪で休んでいるんですね。大丈夫ですか。",
          japaneseRuby: [{ kanji: "風邪", reading: "かぜ" }, { kanji: "休", reading: "やす" }],
          chinese: "你感冒请假了啊，还好吗？",
        },
        userTurn: {
          speaker: "B",
          replies: [
            {
              japanese: "はい、もう少しでよくなります。温かいスープを飲んだほうがいいと言われました。",
              japaneseRuby: [{ kanji: "温", reading: "あたた" }, { kanji: "飲", reading: "の" }],
              chinese: "嗯快好了，别人建议我喝热汤。",
              noteJa: "回復の見込み＋アドバイスを伝える。「〜ほうがいい」は第18課だが会話で先取り可。",
              noteZh: "说明好转+转述建议。",
            },
            {
              japanese: "まだ少し熱がありますが、明日から出かけられるかもしれません。",
              japaneseRuby: [{ kanji: "熱", reading: "ねつ" }, { kanji: "明日", reading: "あした" }],
              chinese: "还有点发烧，但明天也许能出门。",
              noteJa: "「が」で逆接、「かもしれません」で不確かさ。",
              noteZh: "转折+不确定推测。",
            },
            {
              japanese: "ありがとうございます。近くに静かなカフェがあると聞きました。よかったら一緒に行きませんか。",
              japaneseRuby: [{ kanji: "静", reading: "しず" }, { kanji: "聞", reading: "き" }],
              chinese: "谢谢，听说附近有安静咖啡馆，一起去吗？",
              noteJa: "お礼＋情報共有＋誘い。様子を説明する会話の延長。",
              noteZh: "感谢+分享信息+邀请。",
            },
          ],
        },
      },
    ],
    quizReplace: [
      {
        id: "l16_q1",
        type: "choice",
        question: "この部屋は＿＿＿明るいです。",
        options: ["広い", "広くて", "広く", "広いで"],
        answer: 1,
        explanation: "イ形容詞＋て形は「い」→「くて」。",
        grammarNodeId: "l16_adj_teform",
      },
      {
        id: "l16_q2",
        type: "choice",
        question: "窓が＿＿＿。",
        options: ["割る", "割っている", "割れている", "割った"],
        answer: 2,
        explanation: "結果の状態は自動詞＋ている。",
        grammarNodeId: "l16_teiru_result",
      },
      {
        id: "l16_q3",
        type: "fill",
        question: "風邪＿＿＿学校を休みました。",
        answer: "で",
        explanation: "名詞＋で で原因を表す。",
        grammarNodeId: "l16_de_cause",
      },
      {
        id: "l16_q4",
        type: "choice",
        question: "日本語は難しいです＿＿＿、面白いです。",
        options: ["が", "けど", "から", "ので"],
        answer: 0,
        explanation: "ていねいな逆接は「が」。",
        grammarNodeId: "l16_ga",
      },
      {
        id: "l16_q5",
        type: "choice",
        question: "それは「さくら」＿＿＿花です。",
        options: ["と言う", "という", "といった", "と言った"],
        answer: 1,
        explanation: "名前の説明は「という」。",
        grammarNodeId: "l16_toiu",
      },
    ],
  },
  18: {
    vocab: [
      { id: "l18_v_naru", jp: "なる", kana: "なる", meaningJa: "自然に変わる", meaningZh: "变得", example: "小さくなりました。", from: "grammar" },
      { id: "l18_v_suru", jp: "する", kana: "する", meaningJa: "人が変える", meaningZh: "弄成", example: "部屋をきれいにします。", from: "grammar" },
      { id: "l18_v_keitai", jp: "携帯電話", kana: "けいたいでんわ", meaningJa: "スマホ・携帯", meaningZh: "手机", example: "携帯電話は小さくなりました。", ruby: [{ kanji: "携帯", reading: "けいたい" }, { kanji: "電話", reading: "でんわ" }], from: "dialogue" },
      { id: "l18_v_kinou", jp: "機能", kana: "きのう", meaningJa: "できること・性能", meaningZh: "功能", example: "機能も多くなりました。", ruby: [{ kanji: "機能", reading: "きのう" }], from: "dialogue" },
      { id: "l18_v_hougaii", jp: "ほうがいい", kana: "ほうがいい", meaningJa: "アドバイス", meaningZh: "最好", example: "早く寝たほうがいいです。", from: "grammar" },
      { id: "l18_v_deshou", jp: "でしょう", kana: "でしょう", meaningJa: "たぶんそう", meaningZh: "大概", example: "明日は雨でしょう。", from: "grammar" },
      { id: "l18_v_kamo", jp: "かもしれません", kana: "かもしれません", meaningJa: "わからない・もしかしたら", meaningZh: "也许", example: "遅れるかもしれません。", from: "grammar" },
      { id: "l18_v_akeru", jp: "開ける", kana: "あける", meaningJa: "人がドアなどを開く（他動詞）", meaningZh: "打开", example: "ドアを開けてください。", ruby: [{ kanji: "開", reading: "あ" }], from: "grammar" },
      { id: "l18_v_aku", jp: "開く", kana: "あく", meaningJa: "ドアなどが自分で開く（自動詞）", meaningZh: "开着/打开", example: "ドアが開いています。", ruby: [{ kanji: "開", reading: "あ" }], from: "grammar" },
      { id: "l18_v_gamen", jp: "画面", kana: "がめん", meaningJa: "スクリーン", meaningZh: "屏幕", example: "大きい画面のほうがいいです。", ruby: [{ kanji: "画面", reading: "がめん" }], from: "dialogue" },
    ],
    nodePatches: {
      l18_naru: {
        depthSections: [
          {
            heading: "イ形・ナ形＋なる",
            blocks: [
              { type: "list", items: ["寒い→寒くなる", "元気だ→元気になる", "自然の変化・自分で変わる"] },
            ],
          },
        ],
      },
      l18_transitivity: {
        depthSections: [
          {
            heading: "ペアで覚える",
            blocks: [
              { type: "list", items: ["開く（自動）/ 開ける（他動）", "閉まる / 閉める", "つく / つける"] },
            ],
          },
        ],
      },
    },
    conversationScenesAdd: [
      {
        id: "l18_scene_library",
        sceneEmoji: "📚",
        scenePlace: "図書館",
        title: "静かに勉強",
        opener: {
          speaker: "A",
          japanese: "ここは静かですね。勉強しやすいです。",
          japaneseRuby: [{ kanji: "静", reading: "しず" }, { kanji: "勉強", reading: "べんきょう" }],
          chinese: "这里很安静，适合学习。",
        },
        userTurn: {
          speaker: "B",
          replies: [
            {
              japanese: "ええ、毎日来たいです。",
              chinese: "嗯，想每天来。",
              npcReaction: { japanese: "いいですね。一緒に来ましょう。", chinese: "好啊，一起来吧。" },
            },
            {
              japanese: "でも、今日は少しうるさいですね。",
              chinese: "不过今天有点吵呢。",
              npcReaction: { japanese: "そうですね。別の場所に行きましょうか。", chinese: "是啊，换个别的地方吧？" },
            },
          ],
        },
      },
      {
        id: "l18_scene_shop",
        sceneEmoji: "📱",
        scenePlace: "店",
        title: "新しい携帯",
        opener: {
          speaker: "A",
          japanese: "新しい携帯は小さくて、機能も多いですね。",
          japaneseRuby: [{ kanji: "携帯", reading: "けいたい" }, { kanji: "機能", reading: "きのう" }],
          chinese: "新手机又小功能又多呢。",
        },
        userTurn: {
          speaker: "B",
          replies: [
            {
              japanese: "画面が大きいほうがいいと思います。",
              chinese: "我觉得屏幕大一点更好。",
              npcReaction: { japanese: "わかります。私もそう思います。", chinese: "我懂，我也这么想。" },
            },
            {
              japanese: "もう少し安いのはありますか。",
              chinese: "有更便宜一点的吗？",
              npcReaction: { japanese: "こちらをご覧ください。", chinese: "请看这边。" },
            },
          ],
        },
      },
    ],
    dialoguesAdd: [
      {
        id: "l18_dialogue_plan",
        title: "これからの決め方",
        sceneEmoji: "📅",
        scenePlace: "学校",
        opener: {
          speaker: "A",
          japanese: "来週、日本語の試験がありますね。どうしますか。",
          japaneseRuby: [{ kanji: "来週", reading: "らいしゅう" }, { kanji: "日本語", reading: "にほんご" }, { kanji: "試験", reading: "しけん" }],
          chinese: "下周有日语考试吧，你打算怎么办？",
        },
        userTurn: {
          speaker: "B",
          replies: [
            {
              japanese: "毎日一時間勉強することにしました。遅く寝るより早く寝たほうがいいですよね。",
              japaneseRuby: [{ kanji: "毎日", reading: "まいにち" }, { kanji: "勉強", reading: "べんきょう" }, { kanji: "寝", reading: "ね" }],
              chinese: "我决定每天学一小时，早睡比熬夜好吧。",
              noteJa: "決断＋アドバイス。「ことにする」は先取り表現。",
              noteZh: "表态+建议早睡。",
            },
            {
              japanese: "まだ決めていません。たぶん図書館で勉強するでしょう。友だちと一緒に行くかもしれません。",
              japaneseRuby: [{ kanji: "図書館", reading: "としょかん" }, { kanji: "勉強", reading: "べんきょう" }],
              chinese: "还没定，大概去图书馆，也许和朋友一起。",
              noteJa: "不確かさ：「でしょう」「かもしれません」。",
              noteZh: "未决定+两种推测。",
            },
            {
              japanese: "部屋を静かにして、スマホを見ないようにします。集中できると思います。",
              japaneseRuby: [{ kanji: "部屋", reading: "へや" }, { kanji: "静", reading: "しず" }],
              chinese: "我会把房间弄安静、尽量不看手机，觉得能集中。",
              noteJa: "人が変える：「静かにする」「〜ないようにする」。",
              noteZh: "人为改变环境+目标。",
            },
          ],
        },
      },
    ],
    quizReplace: [
      {
        id: "l18_q1",
        type: "choice",
        question: "携帯電話はとても小さく＿＿＿。",
        options: ["します", "なりました", "しました", "なっています"],
        answer: 1,
        explanation: "自然の変化は「〜くなる」。",
        grammarNodeId: "l18_naru",
      },
      {
        id: "l18_q2",
        type: "choice",
        question: "部屋をきれいに＿＿＿。",
        options: ["なります", "します", "なりました", "しています"],
        answer: 1,
        explanation: "人が変えるときは「〜にする」。",
        grammarNodeId: "l18_suru",
      },
      {
        id: "l18_q3",
        type: "choice",
        question: "ドアが＿＿＿。",
        options: ["開けています", "開いています", "開けます", "開きます"],
        answer: 1,
        explanation: "自動詞：ドアが開いています。",
        grammarNodeId: "l18_transitivity",
      },
      {
        id: "l18_q4",
        type: "choice",
        question: "早く寝た＿＿＿いいです。",
        options: ["ほうが", "ように", "ために", "なら"],
        answer: 0,
        explanation: "助言は「〜たほうがいい」。",
        grammarNodeId: "l18_hougaii",
      },
      {
        id: "l18_q5",
        type: "choice",
        question: "明日は雨＿＿＿。遅れる＿＿＿。",
        options: ["でしょう / かもしれません", "かもしれません / でしょう", "でしょう / でしょう", "かもしれません / かもしれません"],
        answer: 0,
        explanation: "天気は「でしょう」、自分の遅れは「かもしれません」。",
        grammarNodeId: "l18_deshou",
      },
    ],
  },
};

function getLessonExtra(lessonId) {
  return LESSON_DEPTH_PATCH[Number(lessonId)] || null;
}

function getLessonVocab(lessonId) {
  return getLessonExtra(lessonId)?.vocab || [];
}

/** 会話一覧：課本文 + 多场景 + 分岐（あれば） */
function getLessonDialogues(lessonId) {
  const lesson = getLessonMvp(lessonId);
  if (!lesson) return [];
  const extra = getLessonExtra(lessonId);
  const list = [...(lesson.dialogues || [])];
  if (extra?.conversationScenesAdd?.length) list.push(...extra.conversationScenesAdd);
  if (extra?.branchPilot) list.push({ ...extra.branchPilot, isBranch: true });
  return list;
}

function applyLessonDepthPatches() {
  if (typeof LESSON_DEPTH_PATCH === "undefined" || !Array.isArray(LESSONS_MVP)) return;
  LESSONS_MVP.forEach((lesson) => {
    const p = LESSON_DEPTH_PATCH[lesson.lessonId];
    if (!p) return;
    if (p.nodePatches) {
      Object.entries(p.nodePatches).forEach(([id, patch]) => {
        const n = lesson.grammarNodes.find((x) => x.id === id);
        if (n) Object.assign(n, patch);
      });
    }
    if (p.grammarNodesAdd?.length) lesson.grammarNodes.push(...p.grammarNodesAdd);
    if (p.dialoguesAdd?.length) {
      if (!lesson.dialogues) lesson.dialogues = [];
      lesson.dialogues.push(...p.dialoguesAdd);
    }
    if (p.quizReplace?.length) lesson.quizQuestions = p.quizReplace;
    if (p.vocab?.length) lesson.vocab = p.vocab;
  });
}

applyLessonDepthPatches();
