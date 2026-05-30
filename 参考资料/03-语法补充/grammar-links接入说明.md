# grammarNodes.links · 从语法对照表接入

> 真源：`标日全24课语法对照表.md` 的「关联」列。

---

## 数据格式（lessons-data）

```json
"links": [
  { "label": "第4课", "lessonId": 4, "nodeId": "l4_g1", "zh": "存在句「に」的场所用法" }
]
```

- `lessonId` / `nodeId`：可点击跳转（课内文法网）
- `zh`：一句话说明关联，勿写「进行…的」讲义腔

---

## 对照表 → links 规则

| 对照表「关联」 | 写入方式 |
|----------------|----------|
| `2,3,4` | 拆为多条约链到对应课；`nodeId` 用该课主节点或 PRD 节点 id |
| `—` | 本课首条语法可不写 links，或只写「延展：第 N 课」纯文案 |
| 跨册 | 写 `【知识延展】` 于 `reviewExtension`，勿伪造 nodeId |

---

## 示例（第5课 ます形）

对照表：`关联 6,7,8,14`

```json
{ "label": "第6课", "lessonId": 6, "nodeId": "l6_g1", "zh": "移动动词也用ます形" },
{ "label": "第14课", "lessonId": 14, "nodeId": "l14_g1", "zh": "て形由ます形去ます" }
```

---

## 建议批次

- 先做 **高流量课** 14 / 18 / 24
- 每批 4 课后跑 `发布前自检.bat`
- **已接入**：`scripts/grammar_links_biaori.py` 解析 `标日全24课语法对照表.md`「关联」列，写入 `📋 对照表 · 第N课` 延展 link；执行 `python scripts/patch-grammar-links-biaori.py` 刷入 `lessons-data.js`（L2–24 全课节点）
