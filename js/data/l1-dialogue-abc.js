/**
 * 第1課 · 会話 ABC 回答（A=课文 · B/C=可替换说法 + 老师提示）
 * 对齐【产品PRD】第1单元第01课 · 应用课文「出迎え」
 */
const L1_DIALOGUE_ABC = {
  l1_dlg_1: {
    abcGuideZh: "本句由小野回答接机确认。A 为课文原句；B/C 为自然变体。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "はい、小野です。李秀麗さんですか。",
        chinese: "是的，我是小野。您是李秀丽吗？",
        noteZh: "课文标准答：先肯定身份，再反问确认对方姓名。接机、职场第一次见面用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "はい、そうです。小野です。",
        chinese: "是的，我是小野。",
        noteZh: "B 更短：用「そうです」承接，省略反问。对方已报名字、节奏快时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "はい、小野と申します。李秀麗様でしょうか。",
        chinese: "是的，我叫小野。您是李秀丽女士吗？",
        noteZh: "C 更礼貌：「と申します」「様」偏正式；对客户、上级或商务场合可选 C。",
      },
    ],
  },
  l1_dlg_2: {
    abcGuideZh: "本句由李回答。寒暄句建议整段连贯读出。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "はい、李秀麗です。はじめまして。どうぞ よろしく お願いします。",
        chinese: "是的，我是李秀丽。初次见面，请多关照。",
        noteZh: "课文全套寒暄：身份+はじめまして+どうぞよろしく。标准接机自我介绍用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "はい、李です。はじめまして。",
        chinese: "是的，我是李。初次见面。",
        noteZh: "B 较短：省略「よろしく」；对方会再接「はじめまして」时用，避免重复寒暄。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "はい、李秀麗と申します。本日は どうぞ よろしく お願いいたします。",
        chinese: "是的，我叫李秀丽。今天请多关照。",
        noteZh: "C 更郑重：「と申します」「お願いいたします」；对上司、客户或正式场合用 C。",
      },
    ],
  },
  l1_dlg_3: {
    abcGuideZh: "小野回礼自我介绍，注意「はじめまして」词首「は」读 ha。",
    userTurn: { speaker: "小野" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "はじめまして、小野緑です。",
        chinese: "初次见面，我是小野绿。",
        noteZh: "课文原句：寒暄+全名。同事、同级第一次见用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "はじめまして、小野です。",
        chinese: "初次见面，我是小野。",
        noteZh: "B 省略名字「緑」：已互知姓氏、场合轻松时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "初めまして。小野緑と申します。どうぞ よろしく お願いします。",
        chinese: "初次见面。我叫小野绿。请多关照。",
        noteZh: "C 补全「よろしく」：想主动结束寒暄轮、语气更完整时用。",
      },
    ],
  },
  l1_dlg_4: {
    abcGuideZh: "森向李打招呼。本句发起者为森（同事侧）。",
    userTurn: { speaker: "森" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "李さん、こんにちは。",
        chinese: "李小姐，你好。",
        noteZh: "课文原句：白天见面简单问候。同事接机、已见过对方时用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "李さん、こんにちは。お迎えに 来ました。",
        chinese: "李小姐，你好。我来迎接您了。",
        noteZh: "B 补充目的：说明来接机，语气更亲切；想主动打破沉默时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "李さん、お疲れ様です。こんにちは。",
        chinese: "李小姐，辛苦了。你好。",
        noteZh: "C 加「お疲れ様」：对方旅途后、职场晚辈对刚到达的对方用，更体贴。",
      },
    ],
  },
  l1_dlg_5: {
    abcGuideZh: "李误认森为吉田。发起者为李。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "吉田さんですか。",
        chinese: "您是吉田先生吗？",
        noteZh: "课文原句：直接确认身份。认错人、需要核实时用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "あの方は 吉田さんですか。",
        chinese: "那位是吉田先生吗？",
        noteZh: "B 用「あの方」：稍远指认、不确定时用，比直接问柔和。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "失礼ですが、吉田さんでしょうか。",
        chinese: "不好意思，您是吉田先生吗？",
        noteZh: "C 更礼貌：「失礼ですが」「でしょうか」；对上级或初次见面误认时用。",
      },
    ],
  },
  l1_dlg_6: {
    abcGuideZh: "森否定并自报姓名。练习「ではありません」否定句。",
    userTurn: { speaker: "森" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "いいえ、私は 吉田では ありません。森です。",
        chinese: "不，我不是吉田。我是森。",
        noteZh: "课文完整否定+更正：先否定再报本名。标日第1课标准答，用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "いいえ、違います。森です。",
        chinese: "不，不对。我是森。",
        noteZh: "B 用「違います」：口语否定，简洁；同事、轻松场合可用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "いいえ、吉田では ありません。森と 申します。",
        chinese: "不，不是吉田。我叫森。",
        noteZh: "C 更正式：「と申します」；对客户或需要礼貌更正时用。",
      },
    ],
  },
  l1_dlg_7: {
    abcGuideZh: "李道歉并确认森的身份。注意「すみません」此处表歉意/打扰。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "あっ、森さんですか。すみません。",
        chinese: "啊，是森先生吗？不好意思。",
        noteZh: "课文原句：「あっ」惊讶+确认+すみません。认错人后标准用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "あ、森さんですね。失礼しました。",
        chinese: "啊，是森先生啊。失礼了。",
        noteZh: "B 用「失礼しました」：稍正式道歉；职场对同事可用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "森さんですか。どうも すみません。",
        chinese: "是森先生吗？非常抱歉。",
        noteZh: "C 加强歉意：「どうもすみません」；对上级或更郑重场合用。",
      },
    ],
  },
  l1_dlg_8: {
    abcGuideZh: "森接话并重新寒暄。发起者为森。",
    userTurn: { speaker: "森" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "いいえ。李秀麗さんですね。はじめまして。",
        chinese: "不。是李秀丽小姐啊。初次见面。",
        noteZh: "课文原句：「いいえ」在此非道歉，表示「没关系」+确认+寒暄。用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "いいえ、大丈夫です。はじめまして、森です。",
        chinese: "不，没关系。初次见面，我是森。",
        noteZh: "B 明确「大丈夫」并自报名：对方更易听懂，练习自我介绍时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "いいえ、かしこまりません。李さん、はじめまして。森と 申します。",
        chinese: "不，不敢当。李小姐，初次见面。我叫森。",
        noteZh: "C 更客气：「かしこまりません」；对研修生/客户更礼貌时用。",
      },
    ],
  },
  l1_dlg_9: {
    abcGuideZh: "李再次完整自我介绍。与第2句类似，可对比语气长短。",
    userTurn: { speaker: "李" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "はじめまして、李秀麗です。よろしく お願いします。",
        chinese: "初次见面，我是李秀丽。请多关照。",
        noteZh: "课文原句：寒暄+姓名+よろしく。对森正式介绍用 A。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "はじめまして。李です。よろしく。",
        chinese: "初次见面。我是李。请多关照。",
        noteZh: "B 更短：同事间已熟、语气轻松时用。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "はじめまして。李秀麗と 申します。どうぞ よろしく お願いいたします。",
        chinese: "初次见面。我叫李秀丽。恳请多关照。",
        noteZh: "C 最郑重：商务、对多名同事同时在场时用。",
      },
    ],
  },
  l1_dlg_10: {
    abcGuideZh: "森回应「よろしく」。必学「こちらこそ」，不可省略。",
    userTurn: { speaker: "森" },
    replies: [
      {
        label: "A",
        rank: 1,
        japanese: "こちらこそ。",
        chinese: "我才要（请您多关照）。",
        noteZh: "课文原句：回应「よろしくお願いします」的固定答法。必须用 A，不能说「どういたしまして」。",
      },
      {
        label: "B",
        rank: 2,
        japanese: "こちらこそ、よろしく お願いします。",
        chinese: "我才要。请多关照。",
        noteZh: "B 回赠寒暄：也想再加一句「よろしく」时用；略重复但自然。",
      },
      {
        label: "C",
        rank: 3,
        japanese: "こちらこそ。こちらこそ お願いします。",
        chinese: "我才要。我才要请您多关照。",
        noteZh: "C 强调双向：口语中偶见，课堂仍以 A 为准。",
      },
    ],
  },
};

/** 发起句中文（折叠条右侧灰字 + 展开后译文） */
const L1_OPENER_ZH = {
  l1_dlg_1: "你是 JC 企划的小野先生吗？",
  l1_dlg_2: "是的，我是小野。您是李秀丽小姐吗？",
  l1_dlg_3: "是的，我是李秀丽。初次见面，请多关照。",
  l1_dlg_4: "初次见面，我是小野绿。",
  l1_dlg_5: "李小姐，你好。",
  l1_dlg_6: "您是吉田先生吗？",
  l1_dlg_7: "不，我不是吉田。我是森。",
  l1_dlg_8: "啊，是森先生吗？不好意思。",
  l1_dlg_9: "不。是李秀丽小姐吧。初次见面。",
  l1_dlg_10: "初次见面，我是李秀丽。请多关照。",
};

/** 合并课文对话与 ABC 扩展 */
function applyL1DialogueAbc(dialogues) {
  if (!Array.isArray(dialogues)) return dialogues;
  return dialogues.map((d) => {
    const ext = L1_DIALOGUE_ABC[d.id];
    if (!ext) return d;
    const openerZh = ext.openerZh || L1_OPENER_ZH[d.id] || d.opener?.chinese || "";
    const opener = {
      ...d.opener,
      ...(ext.opener || {}),
      chinese: openerZh,
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
