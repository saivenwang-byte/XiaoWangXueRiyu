    const UNITS = [
      {
        id: 14, title: "第14课", sub: "て形 · 串联动作", color: "#58cc02", icon: "🛍️",
        headline: "デパートへ行って、買い物をします",
        headlineZh: "去百货 → 买东西（动作串联）",
        knowledge: {
          core: { id: "k-core", title: "动词て形", jp: "動詞のて形", zh: "连接多个动作；请求（～てください）", icon: "📐" },
          nodes: [
            { id: "k-core", kind: "grammar", zone: "core", title: "て形", jp: "動詞のて形", zh: "一类：書いて／読んで；二类：食べて；行く→行って", links: ["k-kara", "s-dept", "s-post", "v-kaimono"] },
            { id: "k-kara", kind: "grammar", zone: "top", title: "てから", jp: "～てから", zh: "做完A再做B", links: ["k-core", "s-out"], practice: "14-6" },
            { id: "s-dept", kind: "scene", zone: "left", title: "百货", jp: "デパートで買い物", zh: "购物场景", links: ["k-core", "v-kaimono"], practice: "14-1" },
            { id: "s-lib", kind: "scene", zone: "left", title: "图书馆", jp: "図書館へ行って勉強", zh: "对话A：先学习再回家", links: ["k-core"], practice: "14-1" },
            { id: "s-post", kind: "scene", zone: "right", title: "邮局", jp: "荷物を中国へ送る", zh: "海运／空运", links: ["k-core", "v-funabin"], practice: "14-4" },
            { id: "s-bus", kind: "scene", zone: "right", title: "公交", jp: "駅前を通りますか", zh: "问路线是否经过车站", links: ["k-core", "v-ekimae"], practice: "14-boss" },
            { id: "s-out", kind: "scene", zone: "bottom", title: "外出", jp: "食べてから出かける", zh: "午饭后出门", links: ["k-kara"], practice: "14-6" },
            { id: "v-kaimono", kind: "vocab", zone: "left", title: "買い物", jp: "かいもの", zh: "买东西", links: ["s-dept"] },
            { id: "v-funabin", kind: "vocab", zone: "right", title: "船便", jp: "ふなびん", zh: "海运", links: ["s-post"] },
            { id: "v-ekimae", kind: "vocab", zone: "right", title: "駅前", jp: "えきまえ", zh: "车站前", links: ["s-bus"] },
            { id: "d-a", kind: "dialogue", zone: "bottom", title: "对话A", jp: "図書館→勉強→手紙", zh: "て形串联三件事", links: ["k-core", "s-lib"] },
          ],
        },
        levels: [
          { id: "14-1", title: "听一听", type: "listen", jp: "デパートへ行って、買い物をします。", zh: "去百货商店买东西", q: "这句话在说什么？", opts: ["去百货买东西", "在图书馆学习", "寄包裹", "问公交"], ans: 0 },
          { id: "14-2", title: "て形", type: "quiz", jp: "行きます → ？", zh: "「去」的て形", q: "选正确的て形", opts: ["行って", "行いて", "行んで", "行した"], ans: 0 },
          { id: "14-3", title: "百货", type: "speak", jp: "デパートへ行って、買い物をします。", zh: "跟读", keys: ["デパート", "行って", "買い物"] },
          { id: "14-4", title: "邮局", type: "quiz", jp: "船便でお願いします。", zh: "请走海运", q: "「船便」是？", opts: ["海运", "空运", "快递", "步行"], ans: 0 },
          { id: "14-5", title: "寄包裹", type: "speak", jp: "すみません、この荷物を中国へ送ってください。", zh: "请寄到中国", keys: ["荷物", "中国", "送って"] },
          { id: "14-6", title: "てから", type: "listen", jp: "昼ご飯を食べてから出かけます。", zh: "午饭后出门", q: "什么时候出门？", opts: ["午饭后", "早饭前", "睡觉前", "立刻"], ans: 0 },
          { id: "14-boss", title: "Boss", type: "speak", jp: "このバスは駅前を通りますか。", zh: "公交经过车站前吗", keys: ["バス", "駅前", "通り"] },
        ],
      },
      {
        id: 16, title: "第16课", sub: "又…又…", color: "#1cb0f6", icon: "🏨",
        headline: "ホテルの部屋は広くて明るいです",
        headlineZh: "又宽又亮（形容词并列）",
        knowledge: {
          core: { id: "k-core", title: "并列形容", jp: "くて／で", zh: "一类い→くて；二类な→で；名词→で", icon: "📐" },
          nodes: [
            { id: "k-core", kind: "grammar", zone: "core", title: "并列", jp: "くて／で", zh: "连接多个性质/状态", links: ["k-i", "k-na", "s-hotel"] },
            { id: "k-i", kind: "grammar", zone: "top", title: "一类くて", jp: "広くて明るい", zh: "広い→広くて", links: ["k-core", "s-hotel", "s-person"], practice: "16-2" },
            { id: "k-na", kind: "grammar", zone: "top", title: "二类で", jp: "簡単で便利", zh: "词干＋で", links: ["k-core", "s-pc"], practice: "16-4" },
            { id: "s-hotel", kind: "scene", zone: "left", title: "酒店", jp: "広くて明るい部屋", zh: "描述房间", links: ["k-i", "v-hiroi"], practice: "16-1" },
            { id: "s-person", kind: "scene", zone: "left", title: "人物", jp: "背が高くて脚が長い", zh: "外貌并列", links: ["k-i"], practice: "16-5" },
            { id: "s-japan", kind: "scene", zone: "right", title: "日本印象", jp: "きれいで安全だが物が高い", zh: "が转折", links: ["k-na"], practice: "16-boss" },
            { id: "s-job", kind: "scene", zone: "right", title: "职业", jp: "社員で部長です", zh: "名词で并列身份", links: ["k-na", "v-kaisha"], practice: "16-4" },
            { id: "s-pc", kind: "scene", zone: "right", title: "电脑", jp: "簡単で便利", zh: "操作描述", links: ["k-na"] },
            { id: "s-live", kind: "scene", zone: "bottom", title: "居住", jp: "渋谷に住んでいます", zh: "ている＝持续状态", links: ["k-core"] },
            { id: "v-hiroi", kind: "vocab", zone: "left", title: "広い・明るい", jp: "ひろい・あかるい", zh: "宽敞、明亮", links: ["s-hotel"] },
            { id: "v-kaisha", kind: "vocab", zone: "right", title: "旅行会社", jp: "りょこうがいしゃ", zh: "旅行社", links: ["s-job"] },
          ],
        },
        levels: [
          { id: "16-1", title: "听一听", type: "listen", jp: "ホテルの部屋は広くて明るいです。", zh: "房间又宽又亮", q: "房间怎么样？", opts: ["又宽又亮", "又窄又暗", "很贵", "很远"], ans: 0 },
          { id: "16-2", title: "くて", type: "quiz", jp: "広い → 広くて", zh: "一类形容词", q: "「明るい」连接形式？", opts: ["明るくて", "明るいで", "明るく", "明るんで"], ans: 0 },
          { id: "16-3", title: "酒店", type: "speak", jp: "ホテルの部屋は広くて明るいです。", zh: "跟读", keys: ["広くて", "明るい"] },
          { id: "16-4", title: "で", type: "quiz", jp: "簡単で便利です。", zh: "二类形容词", q: "「で」用于？", opts: ["二类形容词/名词", "一类い形容词", "动词ます形", "过去式"], ans: 0 },
          { id: "16-5", title: "人物", type: "speak", jp: "背が高くて脚が長くて、ハンサムな人です。", zh: "个子高腿长", keys: ["高くて", "長くて"] },
          { id: "16-boss", title: "Boss", type: "listen", jp: "町がきれいで安全ですが、物が高いですね。", zh: "日本印象", q: "没有提到？", opts: ["交通不便", "干净", "安全", "东西贵"], ans: 0 },
        ],
      },
      {
        id: 18, title: "第18课", sub: "なる/する", color: "#ce82ff", icon: "📱",
        headline: "携帯電話は小さくなりました",
        headlineZh: "变化：自然なる vs 人为する",
        knowledge: {
          core: { id: "k-core", title: "なる／する", jp: "小さくなる／大きくする", zh: "い→くなる（自然）い→くする（人为）", icon: "📐" },
          nodes: [
            { id: "k-core", kind: "grammar", zone: "core", title: "なる/する", jp: "小さくなる／大きくする", zh: "变化的核心", links: ["k-naru", "k-suru", "s-phone"] },
            { id: "k-naru", kind: "grammar", zone: "top", title: "くなる", jp: "あたたかくなる", zh: "暖かくなる、小さくなる", links: ["k-core", "s-phone", "s-cold"], practice: "18-2" },
            { id: "k-suru", kind: "grammar", zone: "top", title: "くする", jp: "おとを大きくする", zh: "音を大きくする", links: ["k-core", "s-luggage", "s-quiet"], practice: "18-4" },
            { id: "k-ni", kind: "grammar", zone: "top", title: "になる", jp: "医者になる", zh: "名词・な形容词变化", links: ["k-core"], practice: "18-boss" },
            { id: "s-phone", kind: "scene", zone: "left", title: "手机", jp: "小さくなりました", zh: "东西变小", links: ["k-naru"], practice: "18-1" },
            { id: "s-cold", kind: "scene", zone: "left", title: "看病", jp: "まだよくなりません", zh: "感冒吃药仍未好", links: ["k-naru"], practice: "18-5" },
            { id: "s-luggage", kind: "scene", zone: "right", title: "旅行", jp: "できるだけ軽くします", zh: "尽量弄轻", links: ["k-suru"] },
            { id: "s-quiet", kind: "scene", zone: "right", title: "安静", jp: "静かにします", zh: "二类：静かにする", links: ["k-suru", "v-shizuka"] },
            { id: "s-age", kind: "scene", zone: "bottom", title: "年龄", jp: "7歳になりました", zh: "达到某岁数", links: ["k-ni"] },
            { id: "v-shizuka", kind: "vocab", zone: "right", title: "静か", jp: "しずか", zh: "安静", links: ["s-quiet"] },
            { id: "v-isha", kind: "vocab", zone: "bottom", title: "医者", jp: "いしゃ", zh: "医生", links: ["k-ni"], practice: "18-boss" },
          ],
        },
        levels: [
          { id: "18-1", title: "听一听", type: "listen", jp: "携帯電話はとても小さくなりました。", zh: "手机变小了", q: "手机怎么了？", opts: ["变小了", "变大了", "坏了", "丢了"], ans: 0 },
          { id: "18-2", title: "なる", type: "quiz", jp: "小さい → 小さくなる", zh: "自然变化", q: "「暖かい」变暖？", opts: ["暖かくなる", "暖かいなる", "暖かくする", "暖かいになる"], ans: 0 },
          { id: "18-3", title: "手机", type: "speak", jp: "携帯電話はとても小さくなりました。", zh: "跟读", keys: ["小さく", "なりました"] },
          { id: "18-4", title: "する", type: "quiz", jp: "音を大きくします。", zh: "人为改变", q: "这是？", opts: ["人为改变", "自然变化", "否定", "过去式"], ans: 0 },
          { id: "18-5", title: "感冒", type: "speak", jp: "ゆうべ薬を飲みましたが、まだよくなりません。", zh: "还没好", keys: ["薬", "よくなりません"] },
          { id: "18-boss", title: "Boss", type: "speak", jp: "医者になりました。", zh: "成为医生", keys: ["医者", "なりました"] },
        ],
      },
    ];

        /** 每次发版：把 BUILD +1，改 DATE，在 CHANGELOG 最前面加一条 */
    const APP_VERSION = "1.2.0";
    /** 部署后填你的 https 首页（可选），例如 https://你的名.gitee.io/仓库名/ */
    const SITE_PUBLIC_URL = "";

    const APP_BUILD = 46;
    const APP_BUILD_DATE = "2026-05-19";
    const APP_CHANGELOG = [
      { build: 46, date: "2026-05-19", note: "离线语音包：发布包/tts-cache 内 MP3，U盘整包拷走即可播お手本（先运行生成语音包.bat）" },
      { build: 45, date: "2026-05-19", note: "跟读お手本：无日语语音包时自动在线朗读；本机/另一台PC均可播示范音" },
      { build: 44, date: "2026-05-19", note: "录音回归#23/#27：双击html若bat已开会自动跳localhost；点录音即授权+开录" },
      { build: 43, date: "2026-05-19", note: "点录音即录（授权后自动开录）；跟读内不再显示红色 file 报错，改顶部提示+自动开 localhost" },
      { build: 42, date: "2026-05-19", note: "跟读窗：录音中/未结束时不可误关；遮罩点击不退出；bat 带版本号防缓存" },
      { build: 41, date: "2026-05-19", note: "跟读终版：绿色マイク許可+#27；点录音也弹系统授权；评分显示在按钮下方；保留#40播放" },
      { build: 40, date: "2026-05-19", note: "跟读：iOS录音mp4可播；播放/比对/评分实测可用；无语音识别也能凭音量及格" },
      { build: 38, date: "2026-05-19", note: "会話批量同质化：全部情景自动补3种可选回答+问句🔊模板（触类旁通）" },
      { build: 37, date: "2026-05-19", note: "会話统一模板：每句对方话带🔊+多种回答（语感）；跟读三键+iOS录音播放修复" },
      { build: 36, date: "2026-05-19", note: "会話可选回复+场景切换；闯关上下关；听课先听后选；跟读按钮说明与修复" },
      { build: 35, date: "2026-05-19", note: "语音与 index(6) 完全一致：仅系统 speechSynthesis，https 下不再误跳在线朗读" },
      { build: 34, date: "2026-05-19", note: "语音改回 index(6) 同步朗读逻辑，修复手机无声；保留会話/跟读等功能" },
      { build: 33, date: "2026-05-19", note: "地图+🌐地球仪：复制/打开 https 直达本课；试听解锁 iPhone 声音" },
      { build: 32, date: "2026-05-19", note: "修复 iPhone 无声：Safari 同步朗读、在线备用双地址、选课页提示先点🔊" },
      { build: 31, date: "2026-05-19", note: "修复会話里跟读：录音/播放/比对/评分可点；录音键可自动申请麦克风" },
      { build: 30, date: "2026-05-19", note: "会話升级：综合篇串联全课、分支篇选路线、五层递进、单场6轮以上" },
      { build: 29, date: "2026-05-19", note: "每课新增💬会話板块：多轮情景对话（非短语），第14课含邮局/公交等5场" },
      { build: 28, date: "2026-05-19", note: "修复双击 index.html 无声：检测 file://、在线朗读备用、顶部说明与 bat 引导" },
      { build: 27, date: "2026-05-19", note: "恢复上一版：先点绿色マイクを許可，再录音；播放/比对/评分录完后可用" },
      { build: 26, date: "2026-05-19", note: "跟读：取消单独授权按钮；录音键始终可点；播放/比对/评分录完即用" },
      { build: 25, date: "2026-05-19", note: "跟读修复：去掉マイク許可按钮；録音/回放/比較/スコア可用；支持长按录音" },
      { build: 24, date: "2026-05-19", note: "音声修复：在线日语备用朗读；解决 https/Chrome 下完全无声" },
      { build: 23, date: "2026-05-19", note: "麦克风一次授权、全程复用；关闭录音不再释放，避免反复点允许" },
      { build: 22, date: "2026-05-19", note: "强制选用日语 TTS 语音；无日语包时提示安装，避免汉字读成中文音" },
      { build: 21, date: "2026-05-19", note: "音声全面审计：比对/跟读/地图/闯关统一日语网关，杜绝中文朗读" },
      { build: 20, date: "2026-05-19", note: "全界面音声仅日语：过滤中文释义、统一 ja-JP，不再误读中文" },
      { build: 19, date: "2026-05-19", note: "右下角🔊：点播放、播放中变✕可停止；听/说关卡与地图音声修复" },
      { build: 18, date: "2026-05-19", note: "界面日语化；音声仅日语；帮助/怎么玩保留中文" },
      { build: 17, date: "2026-05-19", note: "修复首页选课显示；分享入口移到版本说明里" },
      { build: 16, date: "2026-05-19", note: "知识地图去掉连线，按颜色分块：语法/场景/词汇/对话" },
      { build: 15, date: "2026-05-19", note: "听示范/再听固定日语朗读（不再误读中文释义）" },
      { build: 14, date: "2026-05-19", note: "知识图每块 🔊 原地朗读；关联线简化；右下角 🔊 短按朗读/长按跟读" },
      { build: 13, date: "2026-05-19", note: "选择题只标红一项、选项随机；智能发音评分；红心 60" },
      { build: 12, date: "2026-05-19", note: "底部刷新回满红心；微信用浏览器打开提示" },
      { build: 11, date: "2026-05-19", note: "知识图 SVG 关联线；闯关听/选/说标签；自由选关提示" },
      { build: 10, date: "2026-05-19", note: "手机微信版：知识地图 + 闯关 14/16/18 课" },
    ];

    const KIND_LABEL = { grammar: "文法", scene: "シーン", vocab: "語彙", dialogue: "会話" };
    const LEVEL_TYPE_LABEL = { listen: "聞", quiz: "選", speak: "話" };
    const LEVEL_TYPE_ICON = { listen: "🎧", quiz: "📝", speak: "🎤" };
    const SAVE_KEY = "biaori_game_v2";
    const HEART_MAX = 60;
    const HEART_REGEN_MS = 3 * 60 * 1000;
    const HEART_PRACTICE_GAIN = 3;
    const HEART_SAVE_VER = 3;
    let heartTickTimer = null;
    let heartToastTimer = null;
    let state = load();
    let curLevel = null;
    let nextId = null;

    function versionLabel() {
      return "v" + APP_VERSION + "·#" + APP_BUILD;
    }

    function renderVersionUi() {
      const label = versionLabel();
      document.getElementById("btn-version").textContent = label;
      document.title = "日语初级课后练习 " + label;
      const foot = document.getElementById("pick-version-foot");
      foot.innerHTML =
        `当前 <b>${label}</b>（累计第 <b>${APP_BUILD}</b> 次更新，${APP_BUILD_DATE}）` +
        ` · <button type="button" id="pick-version-btn">查看更新记录</button>`;
      document.getElementById("pick-version-btn").onclick = showVersionModal;
    }

    function showVersionModal() {
      document.getElementById("version-summary").textContent =
        `版本号 ${APP_VERSION}　|　版次 #${APP_BUILD}　|　打包日期 ${APP_BUILD_DATE}`;
      const list = document.getElementById("version-changelog");
      list.innerHTML = APP_CHANGELOG.map(
        (c) => `<li><b>#${c.build}</b> <span style="color:#999">${c.date}</span><br>${c.note}</li>`
      ).join("");
      document.getElementById("version-modal").classList.add("show");
    }

    function load() {
      try {
        const parsed = JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
        const s = { ...fresh(), ...parsed };
        s.hearts = Math.min(HEART_MAX, Math.max(0, Number(s.hearts) || 0));
        if ((s._heartVer || 0) < HEART_SAVE_VER) {
          s.hearts = HEART_MAX;
          s._heartVer = HEART_SAVE_VER;
        }
        return s;
      } catch { return fresh(); }
    }
    function fresh() {
      return {
        xp: 0, hearts: HEART_MAX, heartNextAt: 0, done: [], freePlay: false,
        unitId: null, tab: "map", _heartVer: HEART_SAVE_VER,
      };
    }
    function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }

    function currentUnit() {
      return UNITS.find((u) => u.id === state.unitId) || null;
    }

    function allLevels() {
      const a = [];
      UNITS.forEach((u) => u.levels.forEach((l) => a.push({ ...l, unit: u })));
      return a;
    }

    function isUnlocked(id) {
      if (state.freePlay) return true;
      const unit = UNITS.find((u) => u.levels.some((l) => l.id === id));
      if (!unit || unit.id !== state.unitId) return false;
      const idx = unit.levels.findIndex((l) => l.id === id);
      if (idx <= 0) return true;
      return state.done.includes(unit.levels[idx - 1].id);
    }

    const JP_PARTICLE_RE = /[をがはでにのともへってからまでませんですますでしたいるなるする]/;
    const ZH_GLOSS_RE = /[的了在为了把对给请这那是会能没吗呢吧啊哎连接做完购物语法变化人为自然跟读对话]/;

    function hasJapaneseKana(s) {
      return /[\u3040-\u309f\u30a0-\u30ff゠-ヿ]/.test(s || "");
    }

    function hasChineseLearningGloss(s) {
      return ZH_GLOSS_RE.test(s || "");
    }

    /** 仅允许日语进入 TTS（假名 / 助词 / 课文句），中文释义一律拒绝 */
    function looksJapaneseForTts(s) {
      const t = (s || "").trim();
      if (!t) return false;
      if (hasChineseLearningGloss(t) && !hasJapaneseKana(t)) return false;
      if (hasJapaneseKana(t)) return true;
      if (JP_PARTICLE_RE.test(t)) return true;
      if (/です|ます|ません|でした|ませんでした|だね|ですね/.test(t)) return true;
      if (/^[\u4e00-\u9fff]{2,8}$/.test(t) && !JP_PARTICLE_RE.test(t)) return false;
      return t.length >= 10 && /[、。]/.test(t);
    }

    function coerceJapaneseTts(text, unit) {
      const raw = (text || "").trim();
      const headline = (unit?.headline || "").trim();
      if (raw && looksJapaneseForTts(raw)) return pickJapaneseLine(raw);
      if (headline) return pickJapaneseLine(headline);
      return "";
    }

    /** 与 index(6) 一致：取第一句/第一段日语（手机最稳） */
    function pickSpeakLine(t) {
      const s = (t || "").trim();
      if (!s) return "";
      if (s.includes("→")) return s.split("→")[0].trim();
      if (s.includes("／")) return s.split("／")[0].trim();
      return s;
    }

    function resolveJpForSpeak(text, unit) {
      const line = pickSpeakLine(text);
      if (line && hasJapaneseKana(line)) return line;
      if (line && JP_PARTICLE_RE.test(line)) return line;
      if (line && /です|ます|ません|でした/.test(line)) return line;
      return coerceJapaneseTts(text, unit);
    }

    /** 与 build-tts-cache.py 相同算法 */
    function ttsCacheKey(jp) {
      const s = (jp || "").trim();
      let h = 0;
      for (let i = 0; i < s.length; i++) {
        h = ((h << 5) - h + s.charCodeAt(i)) | 0;
      }
      return (h >>> 0).toString(16);
    }

    /** 优先播放文件夹内预生成的 MP3（U 盘整包拷走即可用，不依赖系统语音包） */
    function playBundledTts(jp, onHit, onMiss) {
      const url = "tts-cache/" + ttsCacheKey(jp) + ".mp3";
      stopOnlineTts();
      try {
        speechSynthesis.cancel();
      } catch (_) {}
      const audio = new Audio(url);
      audio.setAttribute("playsinline", "true");
      audio.playsInline = true;
      currentTtsAudio = audio;
      let settled = false;
      const settle = (hit) => {
        if (settled) return;
        settled = true;
        if (currentTtsAudio === audio) currentTtsAudio = null;
        if (hit) onHit?.();
        else onMiss?.();
      };
      audio.onended = () => {
        fabSpeechActive = false;
        syncFabReadButton();
        settle(true);
      };
      audio.onerror = () => settle(false);
      fabSpeechActive = true;
      syncFabReadButton();
      const p = audio.play();
      if (p && p.catch) {
        p.catch(() => settle(false));
      }
      return true;
    }

    /** 本机 TTS 或在线朗读（无离线包时） */
    function speakRawJapaneseLocalOrOnline(jp, onEnd) {
      if (typeof speechSynthesis === "undefined") {
        return playOnlineJapaneseTts(jp, onEnd);
      }
      refreshJapaneseVoices();
      const hasJaVoice = !!pickJapaneseVoice();
      if (!hasJaVoice) {
        warnIfNoJapaneseVoice();
        return playOnlineJapaneseTts(jp, onEnd);
      }
      let started = false;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        fabSpeechActive = false;
        syncFabReadButton();
        onEnd?.();
      };
      const fallbackOnline = () => {
        if (done) return;
        done = true;
        fabSpeechActive = false;
        syncFabReadButton();
        playOnlineJapaneseTts(jp, onEnd);
      };
      try {
        speechSynthesis.cancel();
      } catch (_) {}
      const u = new SpeechSynthesisUtterance(jp);
      u.rate = 0.85;
      applyJapaneseVoice(u);
      u.onstart = () => {
        started = true;
        fabSpeechActive = true;
        syncFabReadButton();
      };
      u.onend = finish;
      u.onerror = fallbackOnline;
      try {
        speechSynthesis.speak(u);
        if (speechSynthesis.paused) speechSynthesis.resume();
      } catch (_) {
        return playOnlineJapaneseTts(jp, onEnd);
      }
      fabSpeechActive = true;
      syncFabReadButton();
      const waitMs = isIOSDevice() ? 700 : 1000;
      setTimeout(() => {
        if (!started && !done && !speechSynthesis.speaking) fallbackOnline();
      }, waitMs);
      return true;
    }

    /**
     * 日语示范音：① 文件夹内 tts-cache MP3  ② 本机日语 TTS  ③ 在线朗读
     */
    function speakRawJapanese(jp, onEnd) {
      if (!jp) {
        onEnd?.();
        return false;
      }
      unlockTts();
      stopOnlineTts();
      playBundledTts(
        jp,
        () => onEnd?.(),
        () => speakRawJapaneseLocalOrOnline(jp, onEnd)
      );
      return true;
    }

    /** 与 index(6) 相同：同步 cancel + speak；仅过滤中文释义 */
    function speak(t) {
      if (!t || typeof speechSynthesis === "undefined") return;
      const unit = currentUnit();
      const jp = resolveJpForSpeak(t, unit);
      if (jp) speakRawJapanese(jp);
    }

    /** 听示范/再听 */
    function speakJapanese(t) {
      if (!t) return false;
      const u = currentUnit();
      const jp = resolveJpForSpeak(t, u);
      if (!jp) return false;
      return speakRawJapanese(jp);
    }

    /** 打乱选项顺序，避免正确答案总在同一位置 */
    function shuffledOpts(opts, ansIndex) {
      const items = opts.map((text, i) => ({ text, isAns: i === ansIndex }));
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      return {
        opts: items.map((x) => x.text),
        ansIndex: items.findIndex((x) => x.isAns),
      };
    }
    function norm(s) { return (s || "").replace(/\s/g, "").toLowerCase(); }
    function scoreSpeak(exp, heard, keys) {
      const h = norm(heard);
      const list = keys && keys.length ? keys : [exp];
      if (!h) return false;
      const matched = list.filter((k) => h.includes(norm(k)));
      return list.length ? matched.length / list.length >= 0.5 : h.length > 2;
    }

    let voiceSession = null;
    let readAlongSession = null;
    let readAlongOnPass = null;
    let lastReadAlong = { jp: "", zh: "", keys: [] };
    let fabSpeechActive = false;
    let cachedJaVoices = null;
    let jaVoiceWarned = false;
    let sharedMicStream = null;
    let micAcquirePromise = null;
    let ttsUnlocked = false;
    let currentTtsAudio = null;
    let iosAudioPrimed = false;
    let raPlaybackAudio = null;

    function isIOSDevice() {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent || "");
    }

    function unlockTts() {
      if (!ttsUnlocked) {
        ttsUnlocked = true;
        try {
          sessionStorage.setItem("tts_unlocked_v1", "1");
        } catch (_) {}
      }
      refreshJapaneseVoices();
      if (typeof speechSynthesis !== "undefined") {
        try {
          if (speechSynthesis.paused) speechSynthesis.resume();
        } catch (_) {}
      }
      if (isIOSDevice() && !iosAudioPrimed) {
        iosAudioPrimed = true;
        try {
          const Ctx = window.AudioContext || window.webkitAudioContext;
          if (Ctx) {
            const ctx = new Ctx();
            if (ctx.state === "suspended") ctx.resume();
          }
        } catch (_) {}
      }
    }

    function flushSpeechThen(fn) {
      if (typeof speechSynthesis === "undefined") {
        fn();
        return;
      }
      try {
        speechSynthesis.cancel();
      } catch (_) {}
      let n = 0;
      const go = () => {
        if ((speechSynthesis.speaking || speechSynthesis.pending) && n++ < 24) {
          setTimeout(go, 30);
          return;
        }
        fn();
      };
      setTimeout(go, 60);
    }

    function stopOnlineTts() {
      if (currentTtsAudio) {
        try {
          currentTtsAudio.pause();
          currentTtsAudio.currentTime = 0;
        } catch (_) {}
        currentTtsAudio = null;
      }
    }

    function isFileProtocol() {
      return location.protocol === "file:";
    }

    let fileProtocolToastShown = false;
    function toastFileProtocolOnce() {
      if (fileProtocolToastShown) return;
      fileProtocolToastShown = true;
      showHeartToast("请双击文件夹里的「打开本地预览.bat」才能录音");
    }

    const LOCAL_PREVIEW_ORIGIN = "http://127.0.0.1:8766";

    function localPreviewUrl() {
      return LOCAL_PREVIEW_ORIGIN + "/index.html?v=" + APP_BUILD;
    }

    function tryLaunchLocalPreview() {
      try {
        const w = window.open(localPreviewUrl(), "_blank");
        if (!w) toastFileProtocolOnce();
      } catch (_) {
        toastFileProtocolOnce();
      }
    }

    /** 双击 html 时：若本地 bat 服务已开，自动跳到可录音的 localhost（#23 时代常用 bat） */
    async function tryUpgradeFromFileProtocol() {
      if (!isFileProtocol()) return false;
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 800);
        const r = await fetch(LOCAL_PREVIEW_ORIGIN + "/index.html", {
          method: "HEAD",
          cache: "no-store",
          signal: ctrl.signal,
        });
        clearTimeout(t);
        if (r.ok) {
          location.replace(localPreviewUrl());
          return true;
        }
      } catch (_) {}
      return false;
    }

    function showFileOpenBanner() {
      const el = document.getElementById("file-open-banner");
      if (!el || !isFileProtocol()) return;
      try {
        if (sessionStorage.getItem("file_open_banner_ok") === "1") return;
      } catch (_) {}
      el.classList.add("show");
    }

    /** 在线日语朗读（备用；国内可能连不上 Google，会再试本地） */
    function playOnlineJapaneseTts(jp, onEnd, urlIndex) {
      stopOnlineTts();
      const urls = [
        "https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=ja&q=",
        "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ja&q=",
      ];
      const idx = urlIndex || 0;
      if (idx >= urls.length) {
        showHeartToast(
          "在线朗读不可用（需联网）。请在 Windows：设置→时间和语言→语言→添加日语→安装语音"
        );
        onEnd?.();
        return false;
      }
      const audio = new Audio(urls[idx] + encodeURIComponent(jp));
      audio.setAttribute("playsinline", "true");
      audio.playsInline = true;
      audio.preload = "auto";
      currentTtsAudio = audio;
      fabSpeechActive = true;
      syncFabReadButton();
      const finish = () => {
        if (currentTtsAudio === audio) currentTtsAudio = null;
        fabSpeechActive = false;
        syncFabReadButton();
        onEnd?.();
      };
      audio.onended = finish;
      audio.onerror = () => playOnlineJapaneseTts(jp, onEnd, idx + 1);
      const playPromise = audio.play();
      if (playPromise && playPromise.then) {
        playPromise
          .then(() => {
            if (isIOSDevice()) showHeartToast("🔊 播放中");
          })
          .catch(() => {
            if (idx + 1 < urls.length) {
              playOnlineJapaneseTts(jp, onEnd, idx + 1);
              return;
            }
            showHeartToast("无法播放：请用 Safari 打开 https 链接后点 🔊");
            finish();
          });
      }
      return true;
    }

    /** iPhone：必须在用户点击的同一瞬间 speak，不能 setTimeout（否则静默） */
    function playLocalSpeechImmediate(jp, onEnd) {
      if (typeof speechSynthesis === "undefined") return false;
      stopOnlineTts();
      refreshJapaneseVoices();
      const utt = new SpeechSynthesisUtterance(jp);
      utt.rate = 0.88;
      applyJapaneseVoice(utt);
      warnIfNoJapaneseVoice();
      let started = false;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        fabSpeechActive = false;
        syncFabReadButton();
        onEnd?.();
      };
      utt.onstart = () => {
        started = true;
        fabSpeechActive = true;
        syncFabReadButton();
      };
      utt.onend = finish;
      utt.onerror = finish;
      try {
        if (!isIOSDevice()) speechSynthesis.cancel();
        speechSynthesis.speak(utt);
        if (speechSynthesis.paused) speechSynthesis.resume();
      } catch (_) {
        return false;
      }
      if (isIOSDevice()) {
        setTimeout(() => {
          if (!started && !speechSynthesis.speaking && !done) {
            playOnlineJapaneseTts(jp, onEnd);
          }
        }, 700);
      }
      return true;
    }

    function refreshJapaneseVoices() {
      if (typeof speechSynthesis === "undefined") return [];
      try {
        cachedJaVoices = speechSynthesis.getVoices().filter((v) => {
          const lang = (v.lang || "").toLowerCase();
          const name = (v.name || "").toLowerCase();
          if (lang.startsWith("zh") || /chinese|中文|mandarin|cmn|xiaoxiao|yunxi|huihui|kangkang/.test(name)) {
            return false;
          }
          return lang.startsWith("ja");
        });
      } catch (_) {
        cachedJaVoices = [];
      }
      return cachedJaVoices;
    }

    function pickJapaneseVoice() {
      const list = cachedJaVoices?.length ? cachedJaVoices : refreshJapaneseVoices();
      if (!list.length) return null;
      const score = (v) => {
        const n = (v.name || "").toLowerCase();
        const lang = (v.lang || "").toLowerCase();
        let s = 0;
        if (lang.startsWith("ja-jp")) s += 12;
        else if (lang.startsWith("ja")) s += 8;
        if (/haruka|ichiro|ayumi|kyoko|nanami|keita|otoya|google.*japan|japanese|日本/.test(n)) s += 25;
        if (/microsoft/.test(n) && lang.startsWith("ja")) s += 15;
        if (/edge/.test(n) && lang.startsWith("ja")) s += 10;
        if (v.localService) s += 2;
        if (v.default && s > 0) s += 1;
        return s;
      };
      return list.slice().sort((a, b) => score(b) - score(a))[0];
    }

    function applyJapaneseVoice(utt) {
      const voice = pickJapaneseVoice();
      if (voice) {
        utt.voice = voice;
        utt.lang = voice.lang || "ja-JP";
        return true;
      }
      utt.lang = "ja-JP";
      return false;
    }

    function ensureJapaneseVoicesLoaded() {
      refreshJapaneseVoices();
      if (cachedJaVoices.length || typeof speechSynthesis === "undefined") {
        return Promise.resolve(cachedJaVoices.length > 0);
      }
      return new Promise((resolve) => {
        const done = () => {
          speechSynthesis.removeEventListener("voiceschanged", done);
          resolve(refreshJapaneseVoices().length > 0);
        };
        speechSynthesis.addEventListener("voiceschanged", done);
        setTimeout(() => {
          speechSynthesis.removeEventListener("voiceschanged", done);
          resolve(refreshJapaneseVoices().length > 0);
        }, 600);
      });
    }

    function warnIfNoJapaneseVoice() {
      if (jaVoiceWarned || pickJapaneseVoice()) return;
      jaVoiceWarned = true;
      showHeartToast("未检测到日语语音：汉字会读成中文。请在系统「语言」里添加日语并安装语音包");
    }

    function setReadContext(jp, zh, keys) {
      const u = currentUnit();
      const safe = coerceJapaneseTts(jp, u);
      if (safe) {
        lastReadAlong = { jp: safe, zh: zh || "", keys: keys || [] };
        const fab = document.getElementById("fab-read");
        if (fab) fab.classList.remove("fab-hidden");
      }
    }

    function syncFabReadButton() {
      const fab = document.getElementById("fab-read");
      if (!fab) return;
      const playing = fabSpeechActive || (typeof speechSynthesis !== "undefined" && speechSynthesis.speaking);
      fab.textContent = playing ? "✕" : "🔊";
      fab.classList.toggle("fab-playing", playing);
      fab.setAttribute("aria-label", playing ? "停止" : "音声を再生");
      fab.title = playing ? "タップで停止" : "タップで最後の文を再生";
    }

    function stopAppSpeech() {
      stopOnlineTts();
      if (typeof speechSynthesis !== "undefined") {
        try {
          speechSynthesis.cancel();
        } catch (_) {}
      }
      fabSpeechActive = false;
      syncFabReadButton();
    }

    /** 从知识块取出适合 TTS 的日语（优先假名/完整句，其次课文 headline） */
    function pickJapaneseLine(raw) {
      const s = (raw || "").trim();
      if (!s) return "";
      if (s.includes("／") || s.includes("→")) {
        for (const part of s.split(/[／→]/)) {
          const p = part.trim();
          if (p.length >= 2 && looksJapaneseForTts(p)) return p;
        }
        return "";
      }
      const line = s.split(/[。．\n]/).map((x) => x.trim()).find((x) => x.length >= 2 && looksJapaneseForTts(x));
      if (line) return line;
      return looksJapaneseForTts(s) ? s : "";
    }

    function nodeSpeakText(n, u) {
      if (n.jp) return pickSpeakLine(n.jp);
      return coerceJapaneseTts(n.jp, u);
    }

    /** 跟读「听示范→录音」等需要 onEnd 回调时用；主通道同 index(6) */
    function speakJapaneseWithCallback(text, onEnd) {
      const unit = currentUnit();
      const jp = resolveJpForSpeak(text, unit);
      if (!jp) {
        showHeartToast("日本語がありません");
        onEnd?.();
        return false;
      }
      return speakRawJapanese(jp, onEnd);
    }

    function speakJapaneseTracked(text) {
      return speakJapaneseWithCallback(text, null);
    }

    function quickSpeakNode(n, u) {
      const text = nodeSpeakText(n, u);
      if (!text) {
        showHeartToast("日本語がありません");
        return;
      }
      setReadContext(text, "", deriveKeysFromJp(text));
      speak(text);
      showHeartToast("🔊 再生中");
    }

    function bindLongPressSpeak(el, n, u) {
      let timer = null;
      const start = (e) => {
        if (e.target.closest(".kg-speak-btn")) return;
        timer = setTimeout(() => {
          timer = null;
          quickSpeakNode(n, u);
          el.closest(".kg-node-card")?.classList.add("speaking");
        }, 480);
      };
      const end = () => {
        if (timer) clearTimeout(timer);
        timer = null;
        setTimeout(() => el.closest(".kg-node-card")?.classList.remove("speaking"), 400);
      };
      el.addEventListener("touchstart", start, { passive: true });
      el.addEventListener("touchend", end);
      el.addEventListener("touchcancel", end);
      el.addEventListener("mousedown", start);
      el.addEventListener("mouseup", end);
      el.addEventListener("mouseleave", end);
    }

    function attachKgSpeakBtn(parent, n, u) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "kg-speak-btn";
      btn.setAttribute("aria-label", "音声");
      btn.textContent = "🔊";
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        quickSpeakNode(n, u);
        parent.classList.add("speaking");
        setTimeout(() => parent.classList.remove("speaking"), 800);
      };
      parent.appendChild(btn);
      return btn;
    }

    function deriveKeysFromJp(jp, extraKeys) {
      if (extraKeys && extraKeys.length) return extraKeys;
      if (!jp) return [];
      const c = jp.replace(/[。、？！？\s「」『』]/g, "").trim();
      if (!c) return [];
      if (c.length <= 12) return [c];
      return [c.slice(0, 8), c.slice(-8)].filter((x, i, a) => a.indexOf(x) === i);
    }

    function updateFabVisibility() {
      const fab = document.getElementById("fab-read");
      const globe = document.getElementById("fab-globe");
      const inLesson = document.getElementById("screen-lesson").classList.contains("on");
      const inGame = document.getElementById("game").classList.contains("show");
      const onMap = inLesson && state.tab === "map" && !inGame;
      if (fab) fab.style.display = inLesson || inGame ? "block" : "none";
      if (globe) globe.style.display = onMap ? "block" : "none";
    }

    function getHttpsBaseUrl() {
      const custom = (SITE_PUBLIC_URL || "").trim();
      if (custom) return custom.replace(/#.*$/, "").split("?")[0];
      if (location.protocol === "https:") return location.href.split("#")[0].split("?")[0];
      return "";
    }

    function buildLessonPageUrl(unitId) {
      const base = getHttpsBaseUrl();
      if (!base) return "";
      const url = new URL(base, location.href);
      if (unitId) url.searchParams.set("unit", String(unitId));
      return url.href;
    }

    function openGlobeModal() {
      const unit = state.unitId || 14;
      const link = buildLessonPageUrl(unit);
      const box = document.getElementById("globe-url-box");
      if (link) {
        box.innerHTML = '<a href="' + link + '" style="color:#1899d6">' + link + "</a>";
      } else {
        box.innerHTML =
          '<span style="color:#c45c00">当前不是 https 网址。请先把「手机微信版」上传到 Gitee Pages，用生成的 https 链接打开；或在代码里填写 SITE_PUBLIC_URL。</span>';
      }
      document.getElementById("globe-modal").classList.add("show");
    }

    function closeGlobeModal() {
      document.getElementById("globe-modal").classList.remove("show");
    }

    function openLessonInBrowser() {
      const unit = state.unitId || 14;
      const url = buildLessonPageUrl(unit);
      if (!url) {
        alert(
          "还没有 https 网址。\n\n" +
            "请用电脑把「手机微信版」上传到 Gitee，开启 Pages，\n" +
            "用手机 Safari 打开那个 https 链接（不要双击 html）。"
        );
        return;
      }
      if (isWeChatBrowser()) {
        copyText(url)
          .then(() => {
            alert(
              "链接已复制。\n\n" +
                "① 点微信右上角 ···\n" +
                "② 选「在 Safari 中打开」\n" +
                "③ 若仍在本页，请粘贴链接到 Safari 地址栏打开\n\n" +
                url
            );
          })
          .catch(() => prompt("复制此链接，用 Safari 打开：", url));
        return;
      }
      window.open(url, "_blank", "noopener");
      showHeartToast("已在浏览器打开（或新标签页）");
    }

    function forceReloadPage() {
      try {
        closeReadAlong(true);
        if (document.getElementById("game").classList.contains("show")) closeGame();
      } catch (_) {}
      state.hearts = HEART_MAX;
      state.heartNextAt = 0;
      save();
      location.reload();
    }

    function closeReadAlong(force) {
      if (!force && readAlongSession?.recording) {
        showHeartToast("请先点「结束录音」再关闭");
        return;
      }
      if (readAlongSession) {
        cleanupVoiceSession(readAlongSession);
        readAlongSession = null;
      }
      readAlongOnPass = null;
      document.getElementById("readalong-modal").classList.remove("show");
      document.body.classList.remove("ra-modal-open");
      const convo = document.getElementById("convo-modal");
      if (convo?.dataset.raPaused === "1") {
        delete convo.dataset.raPaused;
        convo.classList.add("show");
        showHeartToast("已返回会話");
      }
    }

    function openReadAlong({ jp, zh, keys, title, onPass }) {
      const u = currentUnit();
      jp = coerceJapaneseTts(jp, u);
      if (!jp) {
        showHeartToast("日本語の例文がありません");
        return;
      }
      setReadContext(jp, zh, keys);
      readAlongOnPass = onPass || null;
      if (readAlongSession) cleanupVoiceSession(readAlongSession);
      readAlongSession = {
        lv: { jp, zh, keys: deriveKeysFromJp(jp, keys) },
        stream: null,
        mediaRecorder: null,
        chunks: [],
        recordedBlob: null,
        recordedMime: "",
        blobUrl: null,
        transcript: "",
        asrConfidence: 0,
        recognition: null,
        recording: false,
      };
      const s = readAlongSession;
      const baseTitle = title || "シャドーイング";
      document.getElementById("ra-title").textContent = baseTitle + " · #" + APP_BUILD;
      document.getElementById("ra-jp").textContent = jp;
      document.getElementById("ra-zh").textContent = "";
      document.getElementById("ra-rec").textContent = "🎤 録音開始";
      document.getElementById("ra-rec").classList.remove("on");
      setRaPostRecordEnabled(false);
      document.getElementById("ra-fb").innerHTML =
        '<p class="zh" style="line-height:1.55;font-size:13px"><b>点「录音开始」</b>：系统弹麦克风 → 允许后<b>直接开录</b>（无需再点一次）<br>说完点「结束录音」→ 听自己 / 比对 / 发音评分</p>';
      const convo = document.getElementById("convo-modal");
      if (convo?.classList.contains("show")) {
        convo.dataset.raPaused = "1";
        convo.classList.remove("show");
      }
      document.getElementById("readalong-modal").classList.add("show");
      document.body.classList.add("ra-modal-open");
      updateMicUiState();
      refreshJapaneseVoices();
      ensureJapaneseVoicesLoaded().then(() => updateReadAlongEnvTip());
      setTimeout(() => speak(jp), 200);
    }

    function updateReadAlongEnvTip() {
      const tip = document.getElementById("ra-env-tip");
      const parts = [];
      if (isWeChatBrowser()) {
        tip.className = "ra-env-tip warn";
        parts.push(
          "<b>微信内：</b>录音/朗读常失败。请点右上角 <b>···</b> → <b>在浏览器中打开</b>（Safari / Chrome）后再跟读。"
        );
      } else if (isMicStreamActive()) {
        tip.className = "ra-env-tip";
        parts.push("<b>マイク：</b>OK。このページでは再許可不要です。");
      } else {
        tip.className = "ra-env-tip";
        parts.push(
          "<b>マイク：</b>点上方绿色「マイクを許可」<b>或</b>直接点「录音开始」——笔记本会弹出系统授权，允许一次即可。"
        );
      }
      if (!pickJapaneseVoice()) {
        tip.className = "ra-env-tip warn";
        parts.push(
          "<b>日语发音：</b>当前浏览器没有日语语音，「お手本」会把汉字读成中文音。请在 Windows「设置 → 时间和语言 → 语言」添加<b>日语</b>并安装<b>语音</b>，然后重启浏览器。"
        );
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        tip.className = "ra-env-tip warn";
        parts.push("<b>当前环境不支持录音</b>，请用 Safari / Chrome 并用 https 或 localhost 打开。");
      }
      tip.innerHTML = parts.join("<br>");
      tip.hidden = false;
    }

    
    function scrollRaFeedbackIntoView() {
      const el = document.getElementById("ra-fb");
      if (el) {
        try {
          el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } catch (_) {}
      }
    }

    async function requestMicForReadAlong(fb) {
      if (isMicStreamActive()) return true;
      if (fb) {
        fb.innerHTML =
          '<p class="zh" style="color:#1cb0f6">正在请求麦克风…请在系统弹窗中点「允许」</p>';
      }
      try {
        await acquireSharedMic();
        updateMicUiState();
        updateReadAlongEnvTip();
        return true;
      } catch (err) {
        if (err?.message === "FILE_PROTOCOL") {
          toastFileProtocolOnce();
          tryLaunchLocalPreview();
        } else {
          const denied =
            err?.name === "NotAllowedError" || err?.name === "PermissionDeniedError";
          if (fb) {
            fb.innerHTML = denied
              ? '<p class="zh" style="color:#e03030"><b>麦克风被拒绝</b>：点地址栏 🔒 → 麦克风 → 允许后，再点「录音开始」。</p>'
              : '<p class="zh" style="color:#e03030">无法使用麦克风，请换 Chrome / Edge / Safari。</p>';
          }
        }
        updateReadAlongEnvTip();
        return false;
      }
    }

    function speakThenCompare(session, jp) {
      const fbEl = document.getElementById("ra-fb");
      if (!requireRecordedBlob(session, fbEl)) return;
      fbEl.innerHTML =
        '<p class="zh" style="color:#1cb0f6">① 正在播放示范…</p>';
      let played = false;
      const playMine = () => {
        if (played) return;
        played = true;
        fbEl.innerHTML =
          '<p class="zh" style="color:#1cb0f6">② 正在播放你的录音…</p>';
        playRecordedBlob(session, fbEl);
      };
      flushSpeechThen(() => {
        const ok = speakJapaneseWithCallback(jp, playMine);
        if (!ok) playMine();
        else setTimeout(playMine, Math.max(4500, (jp.length || 8) * 180));
      });
    }

    function bindReadAlongPanel() {
      if (bindReadAlongPanel._done) return;
      bindReadAlongPanel._done = true;
      const btnRec = document.getElementById("ra-rec");
      const btnPlay = document.getElementById("ra-playback");
      const btnCmp = document.getElementById("ra-compare");
      const btnGrade = document.getElementById("ra-grade");
      const btnDemo = document.getElementById("ra-demo");
      const btnMicSetup = document.getElementById("ra-mic-setup");
      const fb = document.getElementById("ra-fb");

      if (btnMicSetup && !btnMicSetup.dataset.bound) {
        btnMicSetup.dataset.bound = "1";
        btnMicSetup.onclick = async () => {
          const ok = await requestMicForReadAlong(fb);
          if (ok) {
            showHeartToast("麦克风 OK · 开始录音");
            await startRaRecording();
          }
        };
      }

      function startRaSpeechRecognition(s) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return;
        s.recognition = new SR();
        s.recognition.lang = "ja-JP";
        s.recognition.continuous = true;
        s.recognition.interimResults = true;
        s.recognition.onresult = (e) => {
          let interim = "";
          let finalText = "";
          let confSum = 0;
          let confN = 0;
          for (let i = 0; i < e.results.length; i++) {
            const r = e.results[i];
            const t = r[0]?.transcript || "";
            if (r.isFinal) {
              finalText += t;
              if (r[0]?.confidence != null) {
                confSum += r[0].confidence;
                confN++;
              }
            } else interim += t;
          }
          s.transcript = finalText || interim;
          if (confN) s.asrConfidence = confSum / confN;
        };
        try {
          s.recognition.start();
        } catch (_) {}
      }

      async function startRaRecording() {
        const s = readAlongSession;
        if (!s || s.recording) return;
        if (!isMicStreamActive()) {
          const ok = await requestMicForReadAlong(fb);
          if (!ok) return;
        }
        if (typeof MediaRecorder === "undefined") {
          showHeartToast("当前浏览器不支持录音");
          return;
        }
        try {
          unlockTts();
          speechSynthesis.cancel();
          await ensureMicStream(s);
          s.chunks = [];
          s.transcript = "";
          s.asrConfidence = 0;
          s.mediaRecorder = createMediaRecorder(s.stream);
          s.mediaRecorder.ondataavailable = (e) => {
            if (e.data?.size) s.chunks.push(e.data);
          };
          s.mediaRecorder.onstop = () => finishReadAlongRecording(s);
          if (isIOSDevice()) s.mediaRecorder.start();
          else s.mediaRecorder.start(250);
          startRaSpeechRecognition(s);
          s.recording = true;
          btnRec.textContent = "⏹ 结束录音";
          btnRec.classList.add("on");
          setRaPostRecordEnabled(false);
          fb.innerHTML = '<p class="zh" style="color:#e03030;font-weight:700">正在录音… 说完点「结束录音」</p>';
        } catch (err) {
          s.recording = false;
          if (err?.message === "FILE_PROTOCOL") {
            toastFileProtocolOnce();
            tryLaunchLocalPreview();
          } else {
            const denied = err?.name === "NotAllowedError" || err?.name === "PermissionDeniedError";
            fb.innerHTML = denied
              ? '<p class="zh" style="color:#e03030"><b>麦克风被拒绝</b>：点地址栏 🔒 → 允许后，再点「录音开始」。</p>'
              : '<p class="zh" style="color:#e03030">无法使用麦克风，请换 Chrome / Edge / Safari。</p>';
          }
          updateReadAlongEnvTip();
        }
      }

      function stopRaRecording() {
        const s = readAlongSession;
        if (!s?.recording) return;
        s.recording = false;
        btnRec.textContent = "🎤 録音開始";
        btnRec.classList.remove("on");
        fb.innerHTML = '<p class="zh">正在保存录音…</p>';
        try {
          if (s.mediaRecorder?.state === "recording") {
            try {
              s.mediaRecorder.requestData();
            } catch (_) {}
            s.mediaRecorder.stop();
          }
        } catch (_) {
          finishReadAlongRecording(s);
        }
        try {
          s.recognition?.stop();
        } catch (_) {}
      }

      btnDemo.onclick = () => {
        const s = readAlongSession;
        if (!s) return;
        stopVoiceSession(s);
        speak(s.lv.jp);
      };

      btnPlay.onclick = async () => {
        const s = readAlongSession;
        if (!requireRecordedBlob(s, fb)) return;
        fb.innerHTML = '<p class="zh" style="color:#1cb0f6">正在播放你的录音…</p>';
        await playRecordedBlob(s, fb);
      };

      btnCmp.onclick = () => {
        const s = readAlongSession;
        if (!s || !requireRecordedBlob(s, fb)) return;
        speakThenCompare(s, s.lv.jp);
      };

      btnGrade.onclick = async () => {
        const s = readAlongSession;
        if (!s || !requireRecordedBlob(s, fb)) return;
        btnGrade.disabled = true;
        fb.innerHTML = '<p class="zh" style="color:#1cb0f6;font-weight:700">正在分析发音…</p>';
        const result = await teacherEvaluate(s);
        btnGrade.disabled = false;
        renderTeacherResult(
          result,
          fb,
          () => {
            stopRaPlayback();
            if (s.blobUrl) URL.revokeObjectURL(s.blobUrl);
            s.blobUrl = null;
            s.recordedBlob = null;
            s.recordedMime = "";
            s.chunks = [];
            s.transcript = "";
            btnRec.textContent = "🎤 録音開始";
            btnRec.classList.remove("on");
            setRaPostRecordEnabled(false);
            updateMicUiState();
            fb.innerHTML =
              '<p class="zh">① 绿色マイク許可 或 录音开始 → ② 结束录音 → ③ 听自己/比对/评分</p>';
          },
          () => {
            if (readAlongOnPass) {
              closeReadAlong(true);
              readAlongOnPass();
              return;
            }
            const gained = grantHearts(HEART_PRACTICE_GAIN);
            if (gained > 0) {
              showHeartToast("跟读及格 +" + gained + " ❤️（当前 " + state.hearts + "/" + HEART_MAX + "）");
            } else {
              showHeartToast("红心已满 " + HEART_MAX + " 颗");
            }
          }
        );
      };

      btnRec.onclick = async () => {
        const s = readAlongSession;
        if (!s) return;
        if (s.recording) {
          stopRaRecording();
          return;
        }
        await startRaRecording();
      };
    }

    function readAlongChipHtml(jp, zh, keys, onPass) {
      const safe = coerceJapaneseTts(jp, currentUnit());
      if (!safe) return "";
      const k = JSON.stringify(keys || []).replace(/"/g, "&quot;");
      const esc = (t) =>
        (t || "")
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/</g, "&lt;");
      return `<button type="button" class="tap-read" data-jp="${esc(safe)}" data-zh="${esc(zh || "")}" data-keys="${k}" data-onpass="${onPass ? "1" : "0"}">🎤 シャドーイング</button>`;
    }

    function attachReadAlongButtons(root, onPass) {
      root.querySelectorAll(".tap-read").forEach((btn) => {
        btn.onclick = () => {
          let keys = [];
          try { keys = JSON.parse(btn.dataset.keys || "[]"); } catch (_) {}
          openReadAlong({
            jp: btn.dataset.jp,
            zh: btn.dataset.zh,
            keys,
            onPass: btn.dataset.onpass === "1" && onPass ? onPass : null,
          });
        };
      });
    }

    function getRecMime() {
      if (typeof MediaRecorder === "undefined") return "";
      const order = isIOSDevice()
        ? ["audio/mp4", "audio/aac", "audio/webm", "audio/webm;codecs=opus"]
        : ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/aac"];
      for (const t of order) {
        if (MediaRecorder.isTypeSupported(t)) return t;
      }
      return "";
    }

    function stopRaPlayback() {
      stopAppSpeech();
      if (raPlaybackAudio) {
        try {
          raPlaybackAudio.pause();
          raPlaybackAudio.removeAttribute("src");
          raPlaybackAudio.load();
        } catch (_) {}
        raPlaybackAudio = null;
      }
    }

    function buildRecordedBlob(session) {
      if (!session?.chunks?.length) return null;
      const mime =
        session.recordedMime ||
        session.mediaRecorder?.mimeType ||
        getRecMime() ||
        (isIOSDevice() ? "audio/mp4" : "audio/webm");
      const blob = new Blob(session.chunks, { type: mime });
      return blob.size >= 80 ? blob : null;
    }

    function refreshRecordedBlobUrl(session) {
      const blob = session.recordedBlob || buildRecordedBlob(session);
      if (!blob) return false;
      session.recordedBlob = blob;
      session.recordedMime = blob.type || session.recordedMime || getRecMime() || "audio/mp4";
      if (session.blobUrl) {
        try {
          URL.revokeObjectURL(session.blobUrl);
        } catch (_) {}
      }
      session.blobUrl = URL.createObjectURL(blob);
      return true;
    }

    async function playRecordedBlob(session, fb) {
      if (!session) return false;
      if (!session.blobUrl && !refreshRecordedBlobUrl(session)) {
        if (fb) {
          fb.innerHTML =
            '<p class="zh" style="color:#e03030">没有可播放的录音，请先录 1～2 秒。</p>';
        }
        return false;
      }
      stopRaPlayback();
      unlockTts();
      const a = new Audio();
      a.setAttribute("playsinline", "true");
      a.playsInline = true;
      a.preload = "auto";
      if (session.recordedBlob) {
        try {
          a.src = URL.createObjectURL(session.recordedBlob);
        } catch (_) {
          a.src = session.blobUrl;
        }
      } else {
        a.src = session.blobUrl;
      }
      raPlaybackAudio = a;
      a.onended = () => {
        if (fb && fb.dataset.raPlayBusy === "1") {
          fb.innerHTML =
            '<p class="zh" style="color:#58cc02;font-weight:700">✓ 播放完成。可点「比对」或「发音评分」</p>';
          delete fb.dataset.raPlayBusy;
        }
      };
      a.onerror = () => {
        if (fb) {
          fb.innerHTML =
            '<p class="zh" style="color:#e03030">无法播放录音。iPhone 请用 Safari 打开；或重新录一段（多说 1～2 秒）。</p>';
        }
        delete fb?.dataset?.raPlayBusy;
      };
      try {
        if (fb) fb.dataset.raPlayBusy = "1";
        await a.play();
        if (fb) {
          fb.innerHTML =
            '<p class="zh" style="color:#1cb0f6">🔊 正在播放你的录音…</p>';
        }
        return true;
      } catch (_) {
        if (fb) {
          fb.innerHTML =
            '<p class="zh" style="color:#e03030">播放被阻止：请再点一次「听自己的录音」（需用户点击触发）。</p>';
        }
        return false;
      }
    }

    function createMediaRecorder(stream) {
      if (typeof MediaRecorder === "undefined") throw new Error("NO_RECORDER");
      const types = isIOSDevice()
        ? ["audio/mp4", "audio/aac", "audio/webm", ""]
        : ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/aac", ""];
      for (const mime of types) {
        if (mime && !MediaRecorder.isTypeSupported(mime)) continue;
        try {
          return mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
        } catch (_) {}
      }
      throw new Error("NO_RECORDER");
    }

    function finishReadAlongRecording(s) {
      const fb = document.getElementById("ra-fb");
      const blob = buildRecordedBlob(s);
      if (!blob) {
        s.recordedBlob = null;
        s.recordedMime = "";
        if (s.blobUrl) {
          try {
            URL.revokeObjectURL(s.blobUrl);
          } catch (_) {}
          s.blobUrl = null;
        }
        setRaPostRecordEnabled(false);
        fb.innerHTML =
          '<p class="zh" style="color:#e03030">没录到声音，请再点「录音开始」，靠近麦克风说 1～2 秒以上。</p>';
        return;
      }
      s.recordedBlob = blob;
      s.recordedMime = blob.type || getRecMime() || "audio/mp4";
      refreshRecordedBlobUrl(s);
      setRaPostRecordEnabled(true);
      fb.innerHTML =
        '<p class="zh" style="color:#1cb0f6;font-weight:700">录音好了！请点：▶️听自己 → 🔁比对 → 🦉发音评分（分数会显示在下面）</p>';
      scrollRaFeedbackIntoView();
    }

    function requireRecordedBlob(session, fb) {
      if (!session) return false;
      if (session.recordedBlob || session.blobUrl || refreshRecordedBlobUrl(session)) {
        setRaPostRecordEnabled(true);
        return true;
      }
      if (fb) {
        fb.innerHTML =
          '<p class="zh" style="color:#e03030">请先点 <b>录音开始</b> 录 1～2 秒并点「结束录音」，再点听自己 / 比对 / 评分。</p>';
        scrollRaFeedbackIntoView();
      } else {
        showHeartToast("请先录音");
      }
      return false;
    }

    function textOverlapRatio(spoken, target) {
      const A = norm(spoken);
      const B = norm(target);
      if (!A || !B) return 0;
      let hit = 0;
      for (const ch of B) if (A.includes(ch)) hit++;
      return hit / B.length;
    }

    async function analyzeAudioBlob(blob) {
      if (!blob || blob.size < 80) return { ok: false, reason: "empty" };
      let ctx;
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        const buf = await blob.arrayBuffer();
        const audio = await ctx.decodeAudioData(buf.slice(0));
        const ch = audio.getChannelData(0);
        const sr = audio.sampleRate;
        const duration = audio.duration;
        const frame = Math.max(1, Math.floor(sr * 0.025));
        let voiced = 0;
        let frames = 0;
        let rmsSum = 0;
        for (let i = 0; i < ch.length; i += frame) {
          let e = 0;
          const end = Math.min(i + frame, ch.length);
          for (let j = i; j < end; j++) e += ch[j] * ch[j];
          const rms = Math.sqrt(e / (end - i));
          frames++;
          rmsSum += rms;
          if (rms > 0.018) voiced++;
        }
        const avgRms = frames ? rmsSum / frames : 0;
        const speechRatio = frames ? voiced / frames : 0;
        return {
          ok: true,
          duration,
          avgRms,
          speechRatio,
          tooQuiet: avgRms < 0.012 || speechRatio < 0.12,
          tooShort: duration < 0.45,
        };
      } catch (_) {
        return { ok: false, reason: "decode" };
      } finally {
        try { ctx?.close(); } catch (_) {}
      }
    }

    function scoreBarHtml(label, got, max) {
      const pct = max ? Math.round((got / max) * 100) : 0;
      return `<div class="score-bar-row"><span>${label}</span><div class="score-bar-track"><div class="score-bar-fill" style="width:${pct}%"></div></div><span>${got}/${max}</span></div>`;
    }

    async function teacherEvaluate(session) {
      const lv = session.lv;
      const keys = lv.keys || [];
      const heard = norm(session.transcript || "");
      const matched = keys.filter((k) => heard.includes(norm(k)));
      const hasAudio = session.chunks && session.chunks.length > 0;

      if (!hasAudio && !heard) {
        return {
          score: 0,
          passed: false,
          feedback: isWeChatBrowser()
            ? "未录到声音。微信里请先「用浏览器打开」，并允许麦克风后再录音。"
            : "未录到声音。请允许麦克风权限，靠近手机清晰朗读后再评分。",
          transcript: "",
          matched,
          dims: null,
        };
      }

      let audio = { ok: false };
      if (hasAudio) {
        try {
          const blob =
            session.recordedBlob ||
            buildRecordedBlob(session) ||
            new Blob(session.chunks, {
              type: session.mediaRecorder?.mimeType || getRecMime() || "audio/mp4",
            });
          audio = await analyzeAudioBlob(blob);
        } catch (_) {}
      }

      const keyMax = 40;
      const keyGot = keys.length
        ? Math.round((matched.length / keys.length) * keyMax)
        : heard
          ? 28
          : 0;

      const clarityMax = 25;
      let clarityGot = 0;
      if (audio.ok) {
        if (audio.tooQuiet) clarityGot = 4;
        else if (audio.tooShort) clarityGot = 8;
        else {
          clarityGot = 8 + Math.round(Math.min(12, audio.speechRatio * 14));
          if (audio.avgRms >= 0.02 && audio.avgRms <= 0.35) clarityGot += 5;
          if (audio.duration >= 0.7 && audio.duration <= 12) clarityGot += 3;
        }
        clarityGot = Math.min(clarityMax, clarityGot);
      } else if (hasAudio) clarityGot = 10;

      const recogMax = 35;
      const overlap = textOverlapRatio(session.transcript, lv.jp);
      const conf = session.asrConfidence || 0;
      let recogGot = Math.round(overlap * 22 + conf * 13);
      if (heard && recogGot < 8) recogGot = 8;
      if (!heard && audio.ok && !audio.tooQuiet && !audio.tooShort) {
        recogGot = Math.max(recogGot, keys.length ? 14 : 24);
      }
      recogGot = Math.min(recogMax, recogGot);

      let score = Math.min(100, keyGot + clarityGot + recogGot);
      if (audio.ok && audio.tooQuiet) score = Math.min(score, 55);
      if (
        !heard &&
        audio.ok &&
        !audio.tooQuiet &&
        !audio.tooShort &&
        audio.duration >= 0.65
      ) {
        score = Math.max(score, 62);
      }
      const passed = score >= 60;

      let feedback;
      if (audio.ok && audio.tooQuiet) {
        feedback = "🔇 声音偏小或杂音多。请靠近麦克风、安静环境，再录一次。";
      } else if (score >= 90) {
        feedback = "🌟 发音完整、清晰，与示范句吻合度高！";
      } else if (score >= 75) {
        feedback = `👍 不错！关键词：${matched.join("、") || "无"}。可再用「读音比对」微调语调。`;
      } else if (score >= 60) {
        feedback = `✅ 及格。注意词汇：${keys.join("、") || "整句"}，多听示范跟读。`;
      } else {
        feedback = `再练一次～目标：${keys.join("、") || lv.jp.slice(0, 12)}。先听示范 → 录音 → 比对 → 评分。`;
      }
      if (isWeChatBrowser() && score < 75) {
        feedback += " （微信里评分偏低时，建议用系统浏览器打开。）";
      }

      return {
        score,
        passed,
        feedback,
        transcript:
          session.transcript ||
          (hasAudio ? "（已录到声音，语音识别未返回文字，仍按音量分析）" : "（无）"),
        matched,
        dims: { keyGot, keyMax, clarityGot, clarityMax, recogGot, recogMax },
      };
    }

    function renderTeacherResult(result, fbEl, onRetry, onPass) {
      const stars = result.score >= 90 ? "⭐⭐⭐" : result.score >= 75 ? "⭐⭐" : result.score >= 60 ? "⭐" : "";
      const bars = result.dims
        ? `<div class="score-bars">
            ${scoreBarHtml("关键词", result.dims.keyGot, result.dims.keyMax)}
            ${scoreBarHtml("清晰度", result.dims.clarityGot, result.dims.clarityMax)}
            ${scoreBarHtml("吻合度", result.dims.recogGot, result.dims.recogMax)}
          </div>`
        : "";
      fbEl.innerHTML = `
        <div class="teacher-box">
          <span class="owl-t">🦉</span>
          <div style="flex:1">
            <div class="score">发音评分：${result.score} 分 ${stars}</div>
            <p class="tip">${result.feedback}</p>
            ${bars}
            <p class="heard">识别：${result.transcript}</p>
            <p class="engine-note">本页为<b>浏览器本地</b>发音分析（音量波形 + 语音识别 + 关键词），无需联网。云端专业引擎（如 Azure 发音评估）需单独接入，精度更高。</p>
            <button type="button" class="btn-duo secondary" id="btn-retry" style="margin-top:10px">🔄 再录一次</button>
            ${result.passed ? '<button type="button" class="btn-duo" id="btn-pass" style="margin-top:8px">继续</button>' : ""}
          </div>
        </div>`;
      document.getElementById("btn-retry").onclick = onRetry;
      const passBtn = document.getElementById("btn-pass");
      if (passBtn) {
        passBtn.textContent = readAlongOnPass ? "下一关 →" : "收下 +" + HEART_PRACTICE_GAIN + " ❤️";
        passBtn.onclick = onPass;
      }
      scrollRaFeedbackIntoView();
    }

    function isMicStreamActive() {
      return !!(sharedMicStream && sharedMicStream.getTracks().some((t) => t.readyState === "live"));
    }

    function setRaPostRecordEnabled(on) {
      ["ra-playback", "ra-compare", "ra-grade"].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.disabled = false;
        el.removeAttribute("disabled");
        el.classList.toggle("ra-wait-rec", !on);
        el.dataset.recReady = on ? "1" : "0";
      });
    }

    function updateMicUiState() {
      const ready = isMicStreamActive();
      const setup = document.getElementById("ra-mic-setup");
      const rec = document.getElementById("ra-rec");
      if (setup) setup.style.display = ready ? "none" : "block";
      if (rec) {
        rec.disabled = false;
        rec.classList.toggle("ra-need-mic", !ready);
      }
    }

    async function acquireSharedMic() {
      if (isMicStreamActive()) return sharedMicStream;
      if (micAcquirePromise) return micAcquirePromise;
      if (!navigator.mediaDevices?.getUserMedia) {
        if (isFileProtocol()) throw new Error("FILE_PROTOCOL");
        throw new Error("NO_MIC");
      }
      micAcquirePromise = navigator.mediaDevices
        .getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
        .then((stream) => {
          sharedMicStream = stream;
          micAcquirePromise = null;
          try { sessionStorage.setItem("mic_warmed_v1", "1"); } catch (_) {}
          updateMicUiState();
          updateReadAlongEnvTip();
          showHeartToast("マイクOK · このページでは再許可不要");
          return stream;
        })
        .catch((err) => {
          micAcquirePromise = null;
          if (isFileProtocol()) throw new Error("FILE_PROTOCOL");
          throw err;
        });
      return micAcquirePromise;
    }

    async function ensureMicStream(session) {
      const stream = await acquireSharedMic();
      session.stream = stream;
      return stream;
    }

    function stopVoiceSession(session) {
      if (session.mediaRecorder?.state === "recording") {
        try { session.mediaRecorder.stop(); } catch (_) {}
      }
      try { session.recognition?.stop(); } catch (_) {}
      session.recording = false;
    }

    /** 结束录音会话但不关闭麦克风（避免每次重新弹「允许」） */
    function cleanupVoiceSession(session) {
      stopVoiceSession(session);
      stopRaPlayback();
      if (session.blobUrl) {
        try {
          URL.revokeObjectURL(session.blobUrl);
        } catch (_) {}
      }
      session.blobUrl = null;
      session.recordedBlob = null;
      session.recordedMime = "";
      session.stream = null;
    }

    function setupVoicePractice(lv) {
      if (voiceSession) cleanupVoiceSession(voiceSession);
      voiceSession = {
        lv,
        stream: null,
        mediaRecorder: null,
        chunks: [],
        blobUrl: null,
        transcript: "",
        recognition: null,
        recording: false,
      };
      const session = voiceSession;
      const btnRec = document.getElementById("btn-rec");
      const btnPlay = document.getElementById("btn-playback");
      const btnGrade = document.getElementById("btn-grade");
      const btnDemo = document.getElementById("btn-demo");
      const fb = document.getElementById("fb");

      const resetUi = () => {
        btnRec.textContent = "🎤 开始录音";
        btnRec.classList.remove("on");
        btnPlay.disabled = !session.blobUrl;
        btnGrade.disabled = !session.blobUrl;
        fb.innerHTML = '<p class="zh" style="margin-top:8px">① 听示范 → ② 录音 → ③ 回放 → ④ 老师打分</p>';
      };

      btnDemo.onclick = () => {
        stopVoiceSession(session);
        speak(lv.jp);
      };

      btnPlay.onclick = () => {
        if (!session.blobUrl) return;
        speechSynthesis.cancel();
        const a = new Audio(session.blobUrl);
        a.play();
      };

      btnGrade.onclick = async () => {
        btnGrade.disabled = true;
        fb.innerHTML = '<p class="zh" style="color:#1cb0f6;font-weight:700">正在分析发音…</p>';
        const result = await teacherEvaluate(session);
        btnGrade.disabled = false;
        renderTeacherResult(
          result,
          fb,
          () => {
            if (session.blobUrl) URL.revokeObjectURL(session.blobUrl);
            session.blobUrl = null;
            session.chunks = [];
            session.transcript = "";
            resetUi();
          },
          () => winLevel()
        );
        if (!result.passed) loseHeart();
      };

      btnRec.onclick = async () => {
        if (session.recording) {
          stopVoiceSession(session);
          btnRec.textContent = "🎤 开始录音";
          btnRec.classList.remove("on");
          fb.innerHTML = '<p class="zh">正在保存录音…</p>';
          return;
        }
        try {
          speechSynthesis.cancel();
          await ensureMicStream(session);
          session.chunks = [];
          session.transcript = "";
          session.mediaRecorder = createMediaRecorder(session.stream);
          session.mediaRecorder.ondataavailable = (e) => {
            if (e.data && e.data.size) session.chunks.push(e.data);
          };
          session.mediaRecorder.onstop = () => {
            const blob = new Blob(session.chunks, {
              type: session.mediaRecorder.mimeType || "audio/webm",
            });
            if (session.blobUrl) URL.revokeObjectURL(session.blobUrl);
            session.blobUrl = URL.createObjectURL(blob);
            btnPlay.disabled = false;
            btnGrade.disabled = false;
            fb.innerHTML =
              '<p class="zh" style="color:#1cb0f6;font-weight:700">录音完成！先点「回放」，再点「老师打分</p>';
          };
          session.mediaRecorder.start(200);

          const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (SR) {
            session.recognition = new SR();
            session.recognition.lang = "ja-JP";
            session.recognition.continuous = true;
            session.recognition.interimResults = true;
            session.recognition.onresult = (e) => {
              let piece = "";
              for (let i = e.resultIndex; i < e.results.length; i++) {
                piece += e.results[i][0].transcript;
              }
              session.transcript = piece;
            };
            session.recognition.onerror = () => {};
            try { session.recognition.start(); } catch (_) {}
          }

          session.recording = true;
          btnRec.textContent = "⏹ 结束录音";
          btnRec.classList.add("on");
          btnPlay.disabled = true;
          btnGrade.disabled = true;
          fb.innerHTML = '<p class="zh" style="color:#e03030;font-weight:700">正在录音… 说完点「结束录音」</p>';
        } catch (err) {
          fb.innerHTML =
            '<p class="zh" style="color:#e03030">无法使用麦克风。请在浏览器设置中允许麦克风，或用 Safari 打开本页</p>';
        }
      };

      resetUi();
    }

    function showScreen(name) {
      document.getElementById("screen-pick").classList.toggle("on", name === "pick");
      document.getElementById("screen-lesson").classList.toggle("on", name === "lesson");
      document.getElementById("bottom-nav").style.display = name === "lesson" ? "flex" : "none";
      document.body.classList.toggle("nav-lesson", name === "lesson");
      document.getElementById("btn-back").style.display = name === "lesson" ? "inline-block" : "none";
      updateFabVisibility();
      if (name === "pick") {
        document.getElementById("top-title").textContent = "日语初级课后练习";
        state.unitId = null;
        save();
        closeReadAlong(true);
      }
    }

    let activeConvo = null;
    let convoStep = 0;
    let convoCatalog = [];
    let convoCatalogIndex = 0;

    function convoPreview(sc) {
      const s = (sc.steps || []).find((x) => (x.jp || "").trim());
      return s?.jp?.trim() || "";
    }

    function renderConvoList() {
      const root = document.getElementById("convo-list");
      if (!root) return;
      root.innerHTML = "";
      const lid = state.unitId;
      if (typeof getLessonDialogues !== "function") {
        root.innerHTML = '<p class="convo-hint help-zh">对话数据加载中…</p>';
        return;
      }
      const list = getLessonDialogues(lid);
      convoCatalog = list;
      if (!list.length) {
        root.innerHTML = '<p class="convo-hint help-zh">本课暂无对话列表</p>';
        return;
      }
      if (!state.scenarioProgress) state.scenarioProgress = {};
      list.forEach((sc) => {
        const done = state.scenarioProgress[sc.id]?.completed;
        const preview = convoPreview(sc);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "convo-card" + (done ? " done" : "");
        const kindTag =
          sc.kind === "integrated"
            ? '<span class="convo-tag integrated">综合</span>'
            : sc.kind === "branch"
              ? '<span class="convo-tag branch">分支</span>'
              : "";
        const turnN = (sc.steps || []).filter((s) => s.type === "speak" || s.type === "npc").length;
        btn.innerHTML =
          "<strong>" + (sc.emoji || "💬") + " " + sc.title + kindTag + "</strong>" +
          "<small>📍 " + (sc.place || "") + " · 约" + turnN + "轮交流</small>" +
          (preview ? '<p class="preview">' + preview + "</p>" : "");
        btn.onclick = () => openConvoPlay(sc.id);
        root.appendChild(btn);
      });
    }

    function openConvoPlay(id) {
      const raw = typeof getLessonDialogue === "function" ? getLessonDialogue(id) : null;
      if (!raw) return;
      if (!convoCatalog.length && typeof getLessonDialogues === "function") {
        convoCatalog = getLessonDialogues(state.unitId) || [];
      }
      convoCatalogIndex = Math.max(0, convoCatalog.findIndex((c) => c.id === id));
      activeConvo = { ...raw, steps: [...raw.steps] };
      if (activeConvo.kind === "branch") activeConvo._branchBase = raw;
      const prog = state.scenarioProgress?.[id];
      convoStep = prog?.completed ? 0 : prog?.stepIndex || 0;
      document.getElementById("convo-modal").classList.add("show");
      bindConvoNav();
      renderConvoStep();
    }

    function bindConvoNav() {
      const prev = document.getElementById("convo-prev-step");
      const next = document.getElementById("convo-next-step");
      if (prev && !prev.dataset.bound) {
        prev.dataset.bound = "1";
        prev.onclick = () => convoPrevStep();
      }
      if (next && !next.dataset.bound) {
        next.dataset.bound = "1";
        next.onclick = () => convoNextStep();
      }
    }

    function convoPrevStep() {
      if (!activeConvo) return;
      if (convoStep > 0) {
        convoStep--;
        saveConvoProgress();
        renderConvoStep();
        return;
      }
      switchConvoScene(-1);
    }

    function convoNextStep() {
      if (!activeConvo) return;
      if (convoStep < activeConvo.steps.length - 1) {
        convoStep++;
        saveConvoProgress();
        renderConvoStep();
        return;
      }
      switchConvoScene(1);
    }

    function switchConvoScene(delta) {
      if (!convoCatalog.length) return;
      const ni = convoCatalogIndex + delta;
      if (ni < 0 || ni >= convoCatalog.length) {
        showHeartToast(delta < 0 ? "已是第一场对话" : "已是最后一场对话");
        return;
      }
      openConvoPlay(convoCatalog[ni].id);
    }

    function appendConvoSceneNav(footer) {
      if (!convoCatalog.length) return;
      const nav = document.createElement("div");
      nav.className = "convo-scene-nav";
      const prev = document.createElement("button");
      prev.type = "button";
      prev.textContent = "← 上一场";
      prev.disabled = convoCatalogIndex <= 0;
      prev.onclick = () => switchConvoScene(-1);
      const next = document.createElement("button");
      next.type = "button";
      next.textContent = "下一场 →";
      next.disabled = convoCatalogIndex >= convoCatalog.length - 1;
      next.onclick = () => switchConvoScene(1);
      nav.appendChild(prev);
      nav.appendChild(next);
      footer.appendChild(nav);
    }

    function closeConvoPlay() {
      document.getElementById("convo-modal").classList.remove("show");
      activeConvo = null;
      renderConvoList();
    }

    function saveConvoProgress() {
      if (!activeConvo) return;
      if (!state.scenarioProgress) state.scenarioProgress = {};
      state.scenarioProgress[activeConvo.id] = {
        stepIndex: convoStep,
        completed: convoStep >= activeConvo.steps.length,
        at: Date.now(),
      };
      save();
    }

    function convoNext() {
      convoStep++;
      saveConvoProgress();
      renderConvoStep();
    }

    function renderNpcReplyStep(step, stage, footer) {
      const role = step.role || "相手";
      const npcHtml = step.npcJp
        ? `<div class="convo-npc"><span class="role">${role}</span>
          <div class="convo-npc-line">
            <p class="jp">${step.npcJp}</p>
            <button type="button" class="convo-npc-speak" id="convo-npc-speak" aria-label="听问句">🔊</button>
          </div>
          ${step.npcZh ? `<p class="zh">${step.npcZh}</p>` : ""}
        </div>`
        : "";
      stage.innerHTML =
        npcHtml +
        '<p style="font-weight:700;margin:14px 0 8px">💬 你会怎么回答？</p>' +
        '<p class="help-zh" style="font-size:13px;color:#666;margin-bottom:10px">点问句旁 🔊 听对方；点每条回答旁 🔊 听怎么说，再选一句</p>' +
        '<div id="reply-opts"></div>';
      const npcSpeak = document.getElementById("convo-npc-speak");
      if (npcSpeak) npcSpeak.onclick = () => speak(step.npcJp);
      const box = stage.querySelector("#reply-opts");
      let picked = false;
      (step.options || []).forEach((opt) => {
        const row = document.createElement("div");
        row.className = "convo-reply-opt";
        const listen = document.createElement("button");
        listen.type = "button";
        listen.className = "convo-listen";
        listen.textContent = "🔊";
        listen.setAttribute("aria-label", "听");
        listen.onclick = (e) => {
          e.stopPropagation();
          speak(opt.jp);
        };
        const b = document.createElement("button");
        b.type = "button";
        b.className = "convo-choice-btn";
        b.innerHTML =
          '<span style="font-size:15px">' +
          opt.jp +
          '</span><br><span style="font-size:12px;color:#888">' +
          (opt.zh || "") +
          "</span>";
        b.onclick = () => {
          if (picked) return;
          speak(opt.jp);
          picked = true;
          b.classList.add(opt.primary ? "correct" : "picked");
          if (!opt.primary) showHeartToast("语感不错，继续下一句");
          setTimeout(convoNext, 650);
        };
        row.appendChild(listen);
        row.appendChild(b);
        box.appendChild(row);
      });
      if (step.npcJp) speak(step.npcJp);
      footer.innerHTML =
        '<button type="button" class="btn-duo secondary" id="convo-read">🎤 跟读我选的这句</button><button type="button" class="btn-duo secondary" id="convo-skip-reply">跳过</button>';
      const primary = (step.options || []).find((o) => o.primary) || step.options?.[0];
      footer.querySelector("#convo-read").onclick = () => {
        const jp = primary?.jp;
        if (!jp) return;
        openReadAlong({
          jp,
          zh: primary.zh,
          keys: step.keywords || [],
          title: activeConvo.title,
          onPass: convoNext,
        });
      };
      footer.querySelector("#convo-skip-reply").onclick = convoNext;
      appendConvoSceneNav(footer);
    }

    function renderConvoStep() {
      const stage = document.getElementById("convo-stage");
      const footer = document.getElementById("convo-footer");
      const progEl = document.getElementById("convo-prog");
      if (!activeConvo || !stage) return;
      const steps = activeConvo.steps;
      progEl.textContent = convoStep + 1 + " / " + steps.length + " · " + activeConvo.title;
      if (convoStep >= steps.length) {
        stage.innerHTML =
          '<div class="convo-scene"><div class="big">🎉</div><p>本场对话已结束，可进入下一场或返回列表。</p></div>';
        footer.innerHTML = "";
        appendConvoSceneNav(footer);
        const back = document.createElement("button");
        back.type = "button";
        back.className = "btn-duo";
        back.textContent = "返回对话列表";
        back.onclick = closeConvoPlay;
        footer.insertBefore(back, footer.firstChild);
        return;
      }
      const step = steps[convoStep];
      footer.innerHTML = "";
      if (step.type === "npc_reply") {
        renderNpcReplyStep(step, stage, footer);
        return;
      }
      if (step.type === "npc" && steps[convoStep + 1]?.type === "reply") {
        renderNpcReplyStep(
          {
            type: "npc_reply",
            role: step.role,
            npcJp: step.jp,
            npcZh: step.zh,
            options: steps[convoStep + 1].options,
            keywords: steps[convoStep + 1].keywords || [],
          },
          stage,
          footer
        );
        return;
      }
      if (step.type === "tier") {
        stage.innerHTML =
          '<div class="convo-tier"><span class="tier-num">第' +
          (step.level || "") +
          "层 · " +
          (step.label || "") +
          '</span><p style="margin:8px 0 0;color:#666">' +
          (step.mood || "") +
          (step.zh ? " · " + step.zh : "") +
          "</p></div>";
        footer.innerHTML = '<button type="button" class="btn-duo" id="convo-next">进入这一层</button>';
        footer.querySelector("#convo-next").onclick = convoNext;
        appendConvoSceneNav(footer);
        return;
      }
      if (step.type === "transition") {
        stage.innerHTML =
          '<div class="convo-transition"><div class="big">' +
          (step.bg || "➡️") +
          '</div><p style="font-weight:700;margin:8px 0">' +
          (step.place || "") +
          '</p><p style="color:#555">' +
          (step.text || "") +
          "</p></div>";
        footer.innerHTML = '<button type="button" class="btn-duo" id="convo-next">继续</button>';
        footer.querySelector("#convo-next").onclick = convoNext;
        appendConvoSceneNav(footer);
        return;
      }
      if (step.type === "choice") {
        stage.innerHTML =
          '<p style="font-weight:700;margin-bottom:10px">' +
          (step.prompt || "") +
          '</p><p class="help-zh" style="font-size:13px;color:#666;margin-bottom:12px">' +
          (step.zh || "先点 🔊 听每条，再选路线") +
          '</p><div id="convo-choices"></div>';
        const box = stage.querySelector("#convo-choices");
        (step.options || []).forEach((opt) => {
          const row = document.createElement("div");
          row.className = "convo-reply-opt";
          const listen = document.createElement("button");
          listen.type = "button";
          listen.className = "convo-listen";
          listen.textContent = "🔊";
          listen.onclick = (e) => {
            e.stopPropagation();
            speak(opt.jp);
          };
          const b = document.createElement("button");
          b.type = "button";
          b.className = "convo-choice-btn";
          b.innerHTML =
            '<span style="font-size:15px">' +
            opt.jp +
            '</span><br><span style="font-size:12px;color:#888">' +
            (opt.zh || "") +
            "</span>";
          b.onclick = () => {
            speak(opt.jp);
            if (opt.correct === false) {
              b.classList.add("wrong");
              showHeartToast(opt.tip || "再想想，换一句试试");
              return;
            }
            b.classList.add("correct");
            if (opt.route && activeConvo.segments?.[opt.route]) {
              const base = activeConvo._branchBase || activeConvo;
              activeConvo = resolveBranchChoice(base, opt.route);
              activeConvo._branchBase = base;
              convoStep = base.branchAt;
              saveConvoProgress();
              setTimeout(renderConvoStep, 400);
              return;
            }
            setTimeout(convoNext, 500);
          };
          row.appendChild(listen);
          row.appendChild(b);
          box.appendChild(row);
        });
        appendConvoSceneNav(footer);
        return;
      }
      if (step.type === "reply") {
        const prev = convoStep > 0 ? steps[convoStep - 1] : null;
        renderNpcReplyStep(
          {
            type: "npc_reply",
            role: prev?.type === "npc" ? prev.role : "相手",
            npcJp: prev?.type === "npc" ? prev.jp : "",
            npcZh: prev?.type === "npc" ? prev.zh : "",
            options: step.options,
            keywords: step.keywords || [],
          },
          stage,
          footer
        );
        return;
      }
      if (step.type === "scene") {
        stage.innerHTML =
          '<div class="convo-scene"><div class="big">' +
          (step.bg || activeConvo.emoji || "🗾") +
          '</div><p>' +
          (step.text || "") +
          '</p><p style="color:#888;font-size:13px">' +
          (activeConvo.place || "") +
          "</p></div>";
        footer.innerHTML = '<button type="button" class="btn-duo" id="convo-next">进入对话</button>';
        footer.querySelector("#convo-next").onclick = convoNext;
        return;
      }
      if (step.type === "npc") {
        renderNpcReplyStep(
          {
            type: "npc_reply",
            role: step.role,
            npcJp: step.jp,
            npcZh: step.zh,
            options: [
              { jp: "はい、わかりました。", zh: "好的，明白了。", primary: true },
              { jp: "そうですね。", zh: "是啊。", primary: false },
              { jp: "もう一度お願いします。", zh: "请再说一遍。", primary: false },
            ],
            keywords: [],
          },
          stage,
          footer
        );
        return;
      }
      if (step.type === "guide") {
        stage.innerHTML =
          '<div class="convo-guide"><p>💡 ' +
          (step.text || "") +
          "</p>" +
          (step.hint ? '<p style="margin-top:8px;font-size:15px">' + step.hint + "</p>" : "") +
          "</div>";
        footer.innerHTML = '<button type="button" class="btn-duo" id="convo-next">准备好了</button>';
        footer.querySelector("#convo-next").onclick = convoNext;
        appendConvoSceneNav(footer);
        return;
      }
      if (step.type === "celebrate") {
        stage.innerHTML =
          '<div class="convo-scene"><div class="big">🎉</div><p>' + (step.text || "") + "</p></div>";
        footer.innerHTML = '<button type="button" class="btn-duo" id="convo-next">完成</button>';
        footer.querySelector("#convo-next").onclick = () => {
          convoNext();
          closeConvoPlay();
        };
        return;
      }
      if (step.type === "speak") {
        stage.innerHTML =
          '<p style="font-weight:700;margin:0 0 8px">🎤 轮到你说</p><p class="readalong-jp">' +
          (step.jp || "") +
          '</p><p class="zh help-zh">' +
          (step.zh || "") +
          "</p>";
        footer.innerHTML =
          '<button type="button" class="btn-duo secondary" id="convo-play">🔊 听示范</button><button type="button" class="btn-duo" id="convo-speak">🎤 跟读这一句</button><button type="button" class="btn-duo secondary" id="convo-skip">下一句</button>';
        footer.querySelector("#convo-play").onclick = () => speak(step.jp);
        footer.querySelector("#convo-speak").onclick = () => {
          openReadAlong({
            jp: step.jp,
            zh: step.zh,
            keys: step.keywords || [],
            title: activeConvo.title,
            onPass: convoNext,
          });
        };
        footer.querySelector("#convo-skip").onclick = convoNext;
        appendConvoSceneNav(footer);
        return;
      }
      convoNext();
    }

    function enterUnit(id) {
      state.unitId = id;
      state.tab = "map";
      save();
      const u = currentUnit();
      document.getElementById("top-title").textContent = u.title;
      showScreen("lesson");
      setReadContext(u.headline, u.headlineZh, deriveKeysFromJp(u.headline));
      setTab("map");
      renderKnowledge();
      renderOutline();
      renderMap();
      renderConvoList();
      updateNav();
      if (isIOSDevice()) {
        try {
          if (!sessionStorage.getItem("ios_sound_hint")) {
            sessionStorage.setItem("ios_sound_hint", "1");
            showHeartToast("iPhone：请先点一次 🔊 解锁声音");
          }
        } catch (_) {}
      }
    }

    function setTab(tab) {
      state.tab = tab;
      save();
      document.querySelectorAll("#sub-tabs button").forEach((b) => {
        b.classList.toggle("on", b.dataset.tab === tab);
      });
      document.getElementById("panel-map").style.display = tab === "map" ? "block" : "none";
      const panelConvo = document.getElementById("panel-convo");
      if (panelConvo) panelConvo.style.display = tab === "convo" ? "block" : "none";
      document.getElementById("panel-play").style.display = tab === "play" ? "block" : "none";
      updateNav();
      updateFabVisibility();
      if (tab === "play") renderMap();
      if (tab === "convo") renderConvoList();
    }

    function updateNav() {
      document.querySelectorAll(".bottom-nav button").forEach((b) => {
        const n = b.dataset.nav;
        b.classList.toggle("on", (n === "map" && state.tab === "map") || (n === "play" && state.tab === "play"));
      });
    }

    function renderPick() {
      const root = document.getElementById("pick-list");
      root.innerHTML = "";
      UNITS.forEach((u) => {
        const k = u.knowledge;
        const scenes = k.nodes.filter((n) => n.kind === "scene").length;
        const grams = k.nodes.filter((n) => n.kind === "grammar").length;
        const card = document.createElement("button");
        card.type = "button";
        card.className = "lesson-card";
        card.style.borderColor = u.color;
        card.style.boxShadow = `0 5px 0 ${u.color}`;
        card.innerHTML = `
          <h2>${u.icon} ${u.title}</h2>
          <p class="theme">${u.sub}</p>
          <p class="jp" style="font-size:14px;margin:8px 0">${u.headline}</p>
          <p class="theme">${u.headlineZh}</p>
          <div class="tags">
            <span class="tag">语法 ${grams}</span>
            <span class="tag">场景 ${scenes}</span>
            <span class="tag">闯关 ${u.levels.length} 关</span>
          </div>
          <p class="meta">マップを見てチャレンジ</p>`;
        card.onclick = () => enterUnit(u.id);
        root.appendChild(card);
      });
    }

    function nodeById(unit, id) {
      return unit.knowledge.nodes.find((n) => n.id === id);
    }

    function isWeChatBrowser() {
      return /MicroMessenger/i.test(navigator.userAgent || "");
    }

    function initWeChatBanner() {
      const banner = document.getElementById("wx-browser-banner");
      if (!isWeChatBrowser()) {
        banner.classList.add("collapsed");
        return;
      }
      if (sessionStorage.getItem("wx_browser_banner_ok") === "1") {
        banner.classList.add("collapsed");
        return;
      }
      banner.classList.remove("collapsed");
    }

    function enableFreePlayForPractice(reason) {
      if (state.freePlay) return false;
      state.freePlay = true;
      const cb = document.getElementById("free-play");
      if (cb) cb.checked = true;
      document.getElementById("mode-hint").textContent = "任意关可点";
      save();
      showHeartToast(reason || "已开启「自由选关」");
      return true;
    }

    function renderKnowledge() {
      const u = currentUnit();
      if (!u) return;
      const k = u.knowledge;
      const root = document.getElementById("kg-root");
      const kindOrder = ["grammar", "scene", "vocab", "dialogue"];
      const coreId = k.core.id;

      const mkNode = (n) => {
        const wrap = document.createElement("div");
        wrap.className = `kg-node-card ${n.kind}`;
        wrap.dataset.kgId = n.id;
        attachKgSpeakBtn(wrap, n, u);
        const el = document.createElement("button");
        el.type = "button";
        el.className = `kg-node ${n.kind}`;
        el.innerHTML = `<div class="ic">${n.icon || { grammar: "📐", scene: "🎬", vocab: "📚", dialogue: "💬" }[n.kind]}</div><div class="t">${n.title}</div>`;
        el.onclick = () => openDetail(n);
        bindLongPressSpeak(el, n, u);
        wrap.appendChild(el);
        return wrap;
      };

      const mkCoreCard = (coreN) => {
        const coreWrap = document.createElement("div");
        coreWrap.className = "kg-core-wrap";
        coreWrap.dataset.kgId = coreN.id;
        attachKgSpeakBtn(coreWrap, coreN, u);
        const coreEl = document.createElement("button");
        coreEl.type = "button";
        coreEl.className = "kg-core grammar";
        coreEl.style.borderColor = "#ffc800";
        coreEl.style.background = "#fff3cc";
        coreEl.innerHTML = `<div class="icon">${coreN.icon || "📐"}</div><div class="t">${coreN.title}</div><div class="d">${coreN.jp || ""}</div>`;
        coreEl.onclick = () => openDetail(coreN);
        bindLongPressSpeak(coreEl, coreN, u);
        coreWrap.appendChild(coreEl);
        return coreWrap;
      };

      root.innerHTML = "";
      const box = document.createElement("div");
      box.className = "kg-box";
      box.innerHTML = `
        <div class="kg-head">
          <b style="color:${u.color}">${u.title} · 知识地图</b>
          <p class="jp">${u.headline}</p>
          <p class="zh">${u.headlineZh}</p>
        </div>
        <p class="kg-link-hint">按颜色区分：黄语法 · 蓝场景 · 紫词汇 · 绿对话· 🔊 朗读</p>`;

      const kgContent = document.createElement("div");
      kgContent.className = "kg-map-content";

      kindOrder.forEach((kind) => {
        const nodes = k.nodes.filter((n) => n.kind === kind);
        if (!nodes.length) return;

        const sec = document.createElement("section");
        sec.className = `kg-section ${kind}`;
        const title = document.createElement("h3");
        title.className = "kg-section-title";
        title.textContent = KIND_LABEL[kind];
        sec.appendChild(title);

        if (kind === "grammar") {
          const coreN = nodes.find((n) => n.id === coreId) || k.core;
          const coreRow = document.createElement("div");
          coreRow.className = "kg-core-row";
          coreRow.appendChild(mkCoreCard(coreN));
          sec.appendChild(coreRow);
        }

        const grid = document.createElement("div");
        grid.className = "kg-grid";
        nodes
          .filter((n) => !(kind === "grammar" && n.id === coreId))
          .forEach((n) => grid.appendChild(mkNode(n)));
        if (grid.childElementCount) sec.appendChild(grid);

        kgContent.appendChild(sec);
      });

      box.appendChild(kgContent);

      const leg = document.createElement("div");
      leg.className = "kg-legend";
      leg.innerHTML =
        '<span class="g">语法</span><span class="s">场景</span><span class="v">词汇</span><span class="d">对话</span>';
      box.appendChild(leg);
      root.appendChild(box);
    }


    function renderOutline() {
      const u = currentUnit();
      if (!u) return;
      const root = document.getElementById("outline-root");
      root.innerHTML = `<h3>📋 このレッスンの要点</h3>`;
      const order = ["grammar", "scene", "vocab", "dialogue"];
      order.forEach((kind) => {
        u.knowledge.nodes.filter((n) => n.kind === kind).forEach((n) => {
          const el = document.createElement("div");
          el.className = "outline-item";
          el.style.borderColor = u.color;
          el.innerHTML = `<div style="display:flex;align-items:flex-start;gap:8px"><div style="flex:1"><b>${KIND_LABEL[kind]} · ${n.title}</b>${n.jp ? "<br>" + n.jp : ""}</div><button type="button" class="kg-speak-btn" style="position:static;flex-shrink:0" aria-label="听发音">🔊</button></div>`;
          el.querySelector(".kg-speak-btn").onclick = (e) => {
            e.stopPropagation();
            quickSpeakNode(n, u);
          };
          el.onclick = (e) => {
            if (e.target.closest(".kg-speak-btn")) return;
            openDetail(n);
          };
          root.appendChild(el);
        });
      });
    }

    function openDetail(n) {
      const u = currentUnit();
      if (!u) return;
      const related = (n.links || [])
        .map((id) => nodeById(u, id))
        .filter(Boolean);

      const box = document.getElementById("detail-box");
      const badgeColor = { grammar: "#ffc800", scene: "#1cb0f6", vocab: "#ce82ff", dialogue: "#58cc02" }[n.kind];
      const practiceLv = n.practice ? u.levels.find((l) => l.id === n.practice) : null;
      const needFreePlayHint = practiceLv && !isUnlocked(practiceLv.id);
      box.innerHTML = `
        <span class="type-badge" style="background:${badgeColor}33;color:#333">${KIND_LABEL[n.kind] || ""}</span>
        <h2>${n.title}</h2>
        ${n.jp ? `<p class="jp">${n.jp}</p>` : ""}
        <button type="button" class="btn-duo" id="go-listen-quick">🔊 音声（この画面のまま）</button>
        ${needFreePlayHint ? '<p class="freeplay-tip help-zh">🔓 该关尚未解锁。点「去闯关练习」将自动开启「自由选关」（可在闯关页取消勾选）</p>' : ""}
        <div class="related-box">
          <h4>🔗 関連</h4>
          <div class="related-chips" id="rel-chips"></div>
        </div>
        <button type="button" class="btn-duo" id="go-readalong">🎤 シャドーイング</button>
        ${n.practice ? `<button type="button" class="btn-duo secondary" id="go-practice">チャレンジへ</button>` : ""}
        <button type="button" class="btn-duo secondary" id="close-detail">閉じる</button>
      `;
      const chips = document.getElementById("rel-chips");
      related.forEach((r) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = r.title;
        b.onclick = () => {
          document.getElementById("detail-modal").classList.remove("show");
          setTimeout(() => openDetail(r), 200);
        };
        chips.appendChild(b);
      });
      if (!related.length) chips.innerHTML = '<span style="font-size:12px;color:#999">（文法とシーンの関連）</span>';

      document.getElementById("go-listen-quick").onclick = () => quickSpeakNode(n, u);

      document.getElementById("go-readalong").onclick = () => {
        const raw = n.jp && !n.jp.includes("…") && n.jp.length > 3 ? n.jp : u.headline;
        const jp = coerceJapaneseTts(raw, u);
        openReadAlong({
          jp,
          zh: n.zh || u.headlineZh,
          keys: deriveKeysFromJp(jp),
          title: (n.title || "") + " · シャドー",
        });
      };
      const gp = document.getElementById("go-practice");
      if (gp) gp.onclick = () => {
        document.getElementById("detail-modal").classList.remove("show");
        const lv = u.levels.find((l) => l.id === n.practice);
        if (lv) {
          setTab("play");
          if (!isUnlocked(lv.id)) {
            enableFreePlayForPractice("フリー選關 ON");
          }
          startLevel(lv, u);
        }
      };
      const cd = document.getElementById("close-detail");
      if (cd) cd.onclick = () => document.getElementById("detail-modal").classList.remove("show");

      document.getElementById("detail-modal").classList.add("show");
      document.getElementById("detail-modal").onclick = (e) => {
        if (e.target.id === "detail-modal") e.target.classList.remove("show");
      };
      setReadContext(n.jp || u.headline, n.zh, deriveKeysFromJp(n.jp));
      if (n.jp) speak(pickSpeakLine(n.jp));
    }

    function renderMap() {
      const u = currentUnit();
      if (!u) return;
      const map = document.getElementById("map");
      map.innerHTML = `<div class="unit-title">${u.icon} ${u.title} · チャレンジ</div>`;
      const path = document.createElement("div");
      path.className = "path";
      u.levels.forEach((lv, li) => {
        if (li > 0) {
          const line = document.createElement("div");
          line.className = "connector";
          path.appendChild(line);
        }
        const wrap = document.createElement("div");
        wrap.className = "node-wrap " + (li % 2 === 0 ? "left" : "right");
        const node = document.createElement("button");
        node.type = "button";
        const done = state.done.includes(lv.id);
        const locked = !isUnlocked(lv.id);
        node.className = "node" + (locked ? " locked" : "") + (done ? " done" : "") + (!locked && !done ? " current" : "");
        node.style.background = locked ? "" : u.color;
        const typeLbl = LEVEL_TYPE_LABEL[lv.type] || "?";
        const typeIcon = done ? "✓" : locked ? "🔒" : (LEVEL_TYPE_ICON[lv.type] || "📌");
        node.innerHTML = `<span class="node-lbl">${typeLbl}</span><span class="node-ic">${typeIcon}</span>`;
        node.title = lv.title + " · " + typeLbl + "）";
        if (!locked) node.onclick = () => startLevel(lv, u);
        wrap.appendChild(node);
        path.appendChild(wrap);
      });
      map.appendChild(path);
      updateHud();
    }

    function showHeartToast(msg) {
      const el = document.getElementById("heart-toast");
      el.textContent = msg;
      el.classList.add("show");
      clearTimeout(heartToastTimer);
      heartToastTimer = setTimeout(() => el.classList.remove("show"), 2200);
    }

    function grantHearts(n) {
      tickHearts();
      const before = state.hearts;
      state.hearts = Math.min(HEART_MAX, state.hearts + Math.max(0, n));
      const gained = state.hearts - before;
      if (state.hearts >= HEART_MAX) state.heartNextAt = 0;
      if (gained > 0) {
        save();
        updateHud();
        if (document.getElementById("heart-modal").classList.contains("show")) {
          document.getElementById("heart-modal").classList.remove("show");
        }
      } else {
        updateHud();
      }
      return gained;
    }

    function openEarnHeartsPractice() {
      document.getElementById("heart-modal").classList.remove("show");
      if (lastReadAlong.jp) {
        openReadAlong({ ...lastReadAlong, title: "跟读赚红心· 及格 +" + HEART_PRACTICE_GAIN });
        return;
      }
      const u = currentUnit();
      if (u) {
        openReadAlong({
          jp: u.headline,
          zh: u.headlineZh,
          keys: deriveKeysFromJp(u.headline),
          title: "跟读赚红心· 及格 +" + HEART_PRACTICE_GAIN,
        });
        return;
      }
      alert("请先选一课，或点知识图里任意一句的「跟读」");
    }

    function heartWaitText() {
      if (state.hearts >= HEART_MAX) return "红心已满，可以继续闯关。";
      tickHearts();
      if (state.hearts >= HEART_MAX) return "红心已满，可以继续闯关。";
      if (!state.heartNextAt) return "约 3 分钟后自动恢复 1 颗红心（最多存 " + HEART_MAX + " 颗）。";
      const sec = Math.max(0, Math.ceil((state.heartNextAt - Date.now()) / 1000));
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `自动恢复：还需 ${m} 分 ${String(s).padStart(2, "0")} 秒 +1 ❤️\n也可点「跟读赚红心」：及格一次 +${HEART_PRACTICE_GAIN} 颗`;
    }

    function restoreHearts() {
      state.hearts = HEART_MAX;
      state.heartNextAt = 0;
      save();
      updateHud();
      document.getElementById("heart-modal").classList.remove("show");
    }

    function showHeartModal() {
      tickHearts();
      document.getElementById("heart-modal-title").textContent =
        state.hearts <= 0 ? "红心用完了" : "红心不足（闯关至少需 1 颗）";
      document.getElementById("heart-wait-tip").textContent = heartWaitText();
      document.getElementById("heart-modal").classList.add("show");
    }

    function startHeartTicker() {
      if (heartTickTimer) return;
      heartTickTimer = setInterval(() => {
        const before = state.hearts;
        tickHearts();
        updateHud();
        if (document.getElementById("heart-modal").classList.contains("show")) {
          document.getElementById("heart-wait-tip").textContent = heartWaitText();
        }
        if (before < HEART_MAX && state.hearts >= HEART_MAX) {
          document.getElementById("heart-modal").classList.remove("show");
        }
      }, 1000);
    }

    function updateHud() {
      tickHearts();
      document.getElementById("ui-xp").textContent = "⚡ " + state.xp;
      document.getElementById("ui-heart-num").textContent = state.hearts;
      document.getElementById("game-hearts").textContent = "❤️ " + state.hearts + "/" + HEART_MAX;
    }

    function getCurrentLevelIndex() {
      const u = currentUnit();
      if (!u || !curLevel) return -1;
      return u.levels.findIndex((l) => l.id === curLevel.id);
    }

    function updateGameNav() {
      const u = currentUnit();
      const idx = getCurrentLevelIndex();
      const prev = document.getElementById("btn-level-prev");
      const next = document.getElementById("btn-level-next");
      if (!prev || !next || !u || idx < 0) return;
      prev.disabled = idx <= 0;
      next.disabled = idx >= u.levels.length - 1;
    }

    function navigateLevel(delta) {
      const u = currentUnit();
      const idx = getCurrentLevelIndex();
      if (!u || idx < 0) return;
      const target = u.levels[idx + delta];
      if (!target) return;
      if (!isUnlocked(target.id) && !state.freePlay) {
        showHeartToast("该关尚未解锁，可勾选「自由选关」");
        return;
      }
      document.getElementById("win-modal").classList.remove("show");
      startLevel(target, u);
    }

    function renderListenLevel(lv, card, onPass) {
      let html = `<div class="listen-box">
        <p class="listen-phase" id="listen-phase">🎧 请仔细听…</p>
        <p class="listen-q" id="listen-q" style="display:none">${lv.q || "你听到了什么？"}</p>
        <div id="opts" class="opts" style="display:none"></div>
        <button type="button" class="btn-duo secondary" id="btn-play">🔊 再听一遍</button>
      </div>`;
      html += readAlongChipHtml(lv.jp, lv.zh, lv.keys, false);
      card.innerHTML = html;
      attachReadAlongButtons(card, onPass);
      const btnPlay = document.getElementById("btn-play");
      const phase = document.getElementById("listen-phase");
      const qEl = document.getElementById("listen-q");
      const optsRoot = document.getElementById("opts");
      const revealChoices = () => {
        phase.textContent = "你听到了什么？选一个意思";
        qEl.style.display = "block";
        optsRoot.style.display = "flex";
      };
      btnPlay.onclick = () => {
        phase.textContent = "🎧 正在播放…";
        optsRoot.style.display = "none";
        qEl.style.display = "none";
        speak(lv.jp);
        setTimeout(revealChoices, 1500);
      };
      const shuffled = shuffledOpts(lv.opts, lv.ans);
      let wrongPicked = false;
      const lockAllOpts = () => {
        optsRoot.querySelectorAll(".opt").forEach((btn) => { btn.disabled = true; });
      };
      shuffled.opts.forEach((text, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "opt";
        b.textContent = text;
        b.onclick = () => {
          if (b.disabled || b.classList.contains("right") || b.classList.contains("wrong")) return;
          if (i === shuffled.ansIndex) {
            lockAllOpts();
            b.classList.add("right");
            setTimeout(winLevel, 500);
            return;
          }
          if (wrongPicked) return;
          wrongPicked = true;
          b.classList.add("wrong");
          b.disabled = true;
          loseHeart();
          if (state.hearts <= 0) lockAllOpts();
        };
        optsRoot.appendChild(b);
      });
      speak(lv.jp);
      setTimeout(revealChoices, 1500);
    }

    function startLevel(lv, unit) {
      if (state.hearts <= 0) {
        showHeartModal();
        return;
      }
      curLevel = lv;
      document.getElementById("game-title").textContent = unit.title + " · " + lv.title;
      document.getElementById("game").classList.add("show");
      renderLevel();
      updateGameNav();
      updateFabVisibility();
    }

    function renderLevel() {
      const lv = curLevel;
      const card = document.getElementById("game-card");
      setReadContext(lv.jp, lv.zh, lv.keys);
      const onPass = lv.type === "speak" ? winLevel : null;
      if (lv.type === "listen") {
        renderListenLevel(lv, card, onPass);
        updateGameNav();
        return;
      }
      let html = `<p class="jp">${lv.jp || ""}</p>`;
      html += readAlongChipHtml(lv.jp, lv.zh, lv.keys, !!onPass);
      if (lv.type === "quiz") {
        html += `<p class="zh" style="font-size:12px;color:#999;margin-top:6px">選ぶ · まちがえたら赤</p>`;
        html += `<div id="opts" class="opts"></div>`;
        html += `<button type="button" class="btn-duo secondary" id="btn-play">🔊 もう一度</button>`;
        card.innerHTML = html;
        attachReadAlongButtons(card, onPass);
        const btnPlay = document.getElementById("btn-play");
        btnPlay.onclick = () => speak(lv.jp);
        speak(lv.jp);
        const shuffled = shuffledOpts(lv.opts, lv.ans);
        const optsRoot = document.getElementById("opts");
        let wrongPicked = false;
        const lockAllOpts = () => {
          optsRoot.querySelectorAll(".opt").forEach((btn) => { btn.disabled = true; });
        };
        shuffled.opts.forEach((text, i) => {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "opt";
          b.textContent = text;
          b.onclick = () => {
            if (b.disabled || b.classList.contains("right") || b.classList.contains("wrong")) return;
            if (i === shuffled.ansIndex) {
              lockAllOpts();
              b.classList.add("right");
              setTimeout(winLevel, 600);
              return;
            }
            if (wrongPicked) return;
            wrongPicked = true;
            b.classList.add("wrong");
            b.disabled = true;
            loseHeart();
            if (state.hearts <= 0) lockAllOpts();
          };
          optsRoot.appendChild(b);
        });
      } else {
        html += `<p class="jp" style="margin-top:10px;font-size:14px">🔊 自動再生 · 🎤 シャドーで合格</p>`;
        card.innerHTML = html;
        attachReadAlongButtons(card, onPass);
        speak(lv.jp);
        const btnPlaySpeak = document.getElementById("btn-play");
        if (btnPlaySpeak) btnPlaySpeak.onclick = () => speak(lv.jp);
      }
      updateGameNav();
      updateFabVisibility();
    }

    function loseHeart() {
      state.hearts = Math.max(0, state.hearts - 1);
      save(); updateHud();
      if (state.hearts <= 0) {
        setTimeout(() => {
          closeGame();
          showHeartModal();
        }, 300);
      }
    }

    function winLevel() {
      if (!state.done.includes(curLevel.id)) { state.done.push(curLevel.id); state.xp += 10; }
      save();
      const u = currentUnit();
      const idx = u.levels.findIndex((l) => l.id === curLevel.id);
      nextId = u.levels[idx + 1]?.id || null;
      document.getElementById("win-text").textContent = "+10 经验";
      document.getElementById("btn-next").textContent = nextId ? "次へ →" : "マップへ";
      document.getElementById("win-modal").classList.add("show");
    }

    function closeGame() {
      if (voiceSession) {
        cleanupVoiceSession(voiceSession);
        voiceSession = null;
      }
      closeReadAlong(true);
      document.getElementById("game").classList.remove("show");
      document.getElementById("win-modal").classList.remove("show");
      curLevel = null;
      renderMap();
    }

    document.getElementById("btn-close").onclick = closeGame;
    document.getElementById("btn-level-prev").onclick = () => navigateLevel(-1);
    document.getElementById("btn-level-next").onclick = () => navigateLevel(1);
    document.getElementById("btn-next").onclick = () => {
      document.getElementById("win-modal").classList.remove("show");
      if (nextId && (isUnlocked(nextId) || state.freePlay)) {
        const u = currentUnit();
        startLevel(u.levels.find((l) => l.id === nextId), u);
      } else { closeGame(); setTab("map"); }
    };
    const btnWinPrev = document.getElementById("btn-win-prev");
    if (btnWinPrev) btnWinPrev.onclick = () => {
      document.getElementById("win-modal").classList.remove("show");
      navigateLevel(-1);
    };
    const btnWinStay = document.getElementById("btn-win-stay");
    if (btnWinStay) btnWinStay.onclick = () => {
      document.getElementById("win-modal").classList.remove("show");
    };
    document.getElementById("btn-back").onclick = () => { showScreen("pick"); renderPick(); };
    document.querySelectorAll("#sub-tabs button").forEach((b) => {
      b.onclick = () => setTab(b.dataset.tab);
    });
    document.querySelectorAll(".bottom-nav button").forEach((b) => {
      b.onclick = () => {
        if (b.dataset.nav === "pick") { showScreen("pick"); renderPick(); }
        else if (b.dataset.nav === "map") setTab("map");
        else if (b.dataset.nav === "play") setTab("play");
      };
    });
    document.getElementById("free-play").onchange = (e) => {
      state.freePlay = e.target.checked;
      document.getElementById("mode-hint").textContent = state.freePlay ? "どのステージでも" : "順番に解放";
      save(); renderMap();
    };

    function copyText(text) {
      if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
      return new Promise((resolve, reject) => {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          resolve();
        } catch (e) {
          reject(e);
        }
        document.body.removeChild(ta);
      });
    }

    function updateWxBar() {
      const url = location.href.split("#")[0];
      const tip = document.getElementById("wx-bar-tip");
      if (url.startsWith("https:")) {
        tip.textContent = "链接已就绪：点下面按钮复制/分享，粘贴到微信发给朋友即可。";
      } else {
        tip.textContent = "当前是本地预览。请先把「手机微信版」文件夹上传到 Gitee Pages，再用 https 链接转发。";
      }
    }

    document.getElementById("btn-wx-share").onclick = async () => {
      const url = location.href.split("#")[0];
      const title = "日语初级课后练习（知识地图+练习）";
      if (!url.startsWith("https:")) {
        alert(
          "还不能转发：需要 https 网址。\n\n" +
            "① gitee.com 新建仓库\n" +
            "② 上传「手机微信版」里的 index.html 和 manifest.json\n" +
            "③ 开 Gitee Pages，复制 https 链接\n" +
            "④ 微信里粘贴链接发送（不要发 zip/html 文件）"
        );
        return;
      }
      if (navigator.share) {
        try {
          await navigator.share({ title, text: title, url });
          return;
        } catch (_) {}
      }
      try {
        await copyText(url);
        alert("链接已复制\n\n打开微信 → 选好友或群 → 粘贴发送\n\n对方点蓝色链接即可在手机上学");
      } catch {
        prompt("复制此链接到微信：", url);
      }
    };

    document.getElementById("btn-wx-help").onclick = () => {
      alert(
        "【给朋友的不是文件，是链接】\n\n" +
          "你要做：\n" +
          "1. 电脑打开 gitee.com，上传文件夹「手机微信版」\n" +
          "2. 开启 Gitee Pages，得到 https://… 网址\n" +
          "3. 微信里粘贴这个网址发给对方\n\n" +
          "对方：点链接 → 选课 → 知识地图 → 闯关\n\n" +
          "说话练习：微信里点 ··· → 用浏览器打开"
      );
    };
    document.getElementById("ui-heart-btn").onclick = () => {
      if (state.hearts < HEART_MAX) showHeartModal();
      else alert(
        "红心已满（" + HEART_MAX + " 颗）\n" +
        "答错扣 1 颗；跟读练习及格 +" + HEART_PRACTICE_GAIN + " 颗；约 3 分钟自动 +1 颗。"
      );
    };
    document.getElementById("btn-earn-hearts-practice").onclick = openEarnHeartsPractice;
    document.getElementById("btn-restore-hearts").onclick = restoreHearts;
    document.getElementById("btn-heart-close").onclick = () => {
      document.getElementById("heart-modal").classList.remove("show");
    };
    document.getElementById("heart-modal").onclick = (e) => {
      if (e.target.id === "heart-modal") e.target.classList.remove("show");
    };

    document.getElementById("btn-reload").onclick = forceReloadPage;

    bindReadAlongPanel();
        (function bindFabRead() {
      const fab = document.getElementById("fab-read");
      fab.addEventListener("click", () => {
        const playing = fabSpeechActive || speechSynthesis.speaking;
        if (playing) {
          stopAppSpeech();
          showHeartToast("停止しました");
          return;
        }
        if (!lastReadAlong.jp) {
          showHeartToast("🔊 を押す前に、マップの 🔊 か「音声」をタップ");
          return;
        }
        speak(lastReadAlong.jp);
        showHeartToast("🔊 再生中");
      });
      syncFabReadButton();
    })();
    document.getElementById("ra-close").onclick = () => closeReadAlong(true);
    const raModalBox = document.querySelector("#readalong-modal .modal-box");
    if (raModalBox) {
      raModalBox.addEventListener("click", (e) => e.stopPropagation());
    }
    document.getElementById("readalong-modal").onclick = (e) => {
      if (e.target.id !== "readalong-modal") return;
      if (readAlongSession?.recording) {
        showHeartToast("正在录音，请点「结束录音」");
        return;
      }
      showHeartToast("请点底部「閉じる」关闭，避免误触退出");
    };

    if (typeof speechSynthesis !== "undefined") {
      refreshJapaneseVoices();
      speechSynthesis.addEventListener("voiceschanged", refreshJapaneseVoices);
    }
    try {
      if (sessionStorage.getItem("tts_unlocked_v1")) ttsUnlocked = true;
    } catch (_) {}
    document.addEventListener("click", unlockTts, { capture: true });
    document.addEventListener("touchstart", unlockTts, { capture: true, passive: true });
    showFileOpenBanner();
    const fileBannerHide = document.getElementById("file-banner-hide");
    const fileBannerTry = document.getElementById("file-banner-try-tts");
    if (fileBannerHide) {
      fileBannerHide.onclick = () => {
        document.getElementById("file-open-banner")?.classList.remove("show");
        try {
          sessionStorage.setItem("file_open_banner_ok", "1");
        } catch (_) {}
      };
    }
    if (fileBannerTry) {
      fileBannerTry.onclick = () => {
        unlockTts();
        const u = UNITS.find((x) => x.id === state.unitId) || UNITS[0];
        const sample = u?.headline || "こんにちは";
        speak(sample);
      };
    }
    initWeChatBanner();
    document.getElementById("wx-banner-dismiss").onclick = () => {
      sessionStorage.setItem("wx_browser_banner_ok", "1");
      document.getElementById("wx-browser-banner").classList.add("collapsed");
    };
    renderVersionUi();
    document.getElementById("btn-version").onclick = showVersionModal;
    document.getElementById("convo-close").onclick = closeConvoPlay;
    document.getElementById("convo-modal").onclick = (e) => {
      if (e.target.id === "convo-modal") closeConvoPlay();
    };
    document.getElementById("fab-globe").onclick = openGlobeModal;
    document.getElementById("btn-map-globe").onclick = openGlobeModal;
    document.getElementById("btn-pick-globe").onclick = () => {
      state.unitId = null;
      openGlobeModal();
    };
    document.getElementById("btn-globe-close").onclick = closeGlobeModal;
    document.getElementById("globe-modal").onclick = (e) => {
      if (e.target.id === "globe-modal") closeGlobeModal();
    };
    document.getElementById("btn-globe-copy").onclick = async () => {
      const url = buildLessonPageUrl(state.unitId || 14);
      if (!url) {
        alert("暂无 https 链接，请先部署到 Gitee Pages");
        return;
      }
      try {
        await copyText(url);
        showHeartToast("链接已复制，用 Safari 打开");
      } catch {
        prompt("复制链接：", url);
      }
    };
    document.getElementById("btn-globe-open").onclick = openLessonInBrowser;
    document.getElementById("btn-globe-test-sound").onclick = () => {
      unlockTts();
      const u = currentUnit();
      const sample = u?.headline || "こんにちは。音声のテストです。";
      speak(sample);
      showHeartToast("🔊 试听中（有声音说明正常）");
    };
    document.getElementById("btn-version-close").onclick = () => {
      document.getElementById("version-modal").classList.remove("show");
    };
    document.getElementById("version-modal").onclick = (e) => {
      if (e.target.id === "version-modal") e.target.classList.remove("show");
    };

    startHeartTicker();
    updateWxBar();
    function openShareModal() {
      updateWxBar();
      document.getElementById("share-modal").classList.add("show");
    }
    document.getElementById("btn-open-share").onclick = openShareModal;
    document.getElementById("btn-share-close").onclick = () => {
      document.getElementById("share-modal").classList.remove("show");
    };
    document.getElementById("share-modal").onclick = (e) => {
      if (e.target.id === "share-modal") e.target.classList.remove("show");
    };
    function showHowToPlay() {
      alert(
        "【怎么玩 · 中文说明】\n\n" +
          "1. 选课（14/16/18）\n" +
          "2. 知识地图：点方块，🔊 只播日语\n" +
          "3. 闯关：听·选·说\n" +
          "4. 红心：答错-1；跟读及格+3\n\n" +
          "微信录音：··· → 用浏览器打开"
      );
    }
    const btnHowto = document.getElementById("btn-howto");
    if (btnHowto) btnHowto.onclick = showHowToPlay;

    (async function bootApp() {
      await tryUpgradeFromFileProtocol();
      renderPick();
      const urlUnit = Number(new URLSearchParams(location.search).get("unit"));
      const validUnit = UNITS.find((u) => u.id === urlUnit);
      if (validUnit) {
        showScreen("lesson");
        enterUnit(validUnit.id);
      } else if (state.unitId) {
        showScreen("lesson");
        enterUnit(state.unitId);
      } else {
        showScreen("pick");
      }
    })();
