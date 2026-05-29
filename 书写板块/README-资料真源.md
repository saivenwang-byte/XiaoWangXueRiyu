# 书写板块 · 资料真源索引

> **屏上工程真源**：[`02-用户认可方案与会议纪要-平片分期-v1.md`](./02-用户认可方案与会议纪要-平片分期-v1.md)  
> **整理日期**：2026-05-25 · cache v375

---

## 目录结构

```text
书写板块/
├── README-资料真源.md          ← 本文件
├── 02-用户认可方案…v1.md      ← 屏上三层模型 + Phase A/B
├── data/                       ← 工程 JSON（kana-hiragana.json 等）
├── 真源/                       ← 学习者/抽检用 PDF（去重后）
│   ├── 01-平假名-QA/
│   ├── 02-平假名-分色参考/     ← 外链说明
│   ├── 03-练习纸-打印/
│   └── 04-片假名-PhaseB/       ← 平假名 OK 后再用
└── 归档/                       ← 重复/主题/备用合集
```

---

## 真源 · 必用

| 路径 | 用途 | App 映射 |
|------|------|----------|
| `真源/01-平假名-QA/hiragana_nazorigaki2015.pdf` | 46 字描红 + 笔序 QA | `scripts/extract-nazorigaki-hira.py` → `assets/write-nazorigaki/hira/*` + `js/data/kana-nazorigaki-meta.js` |

**裁切工作流**（与 QA 模板一致）：
1. `get_drawings()` 读取 PDF 矢量粉框
2. **panel**：页顶居中正方格（分色笔 + 序号 + とめる／はらう／はねる）
3. **trace**：底部 2×2 描红大格
4. 排除左上例词、右侧行对照、页外白边
5. 重跑：`python scripts/extract-nazorigaki-hira.py`
| [happylilac カラー書き順](https://happylilac.net/hiraganahyo-kakizyun.html) | 分色一览语法 | 层 B 红绿蓝紫 |
| `真源/03-练习纸-打印/matome-hiragana-rensyu-1.pdf` | 空白格练写（打印） | P1 可选「分享练习纸」 |

| `真源/04-片假名-PhaseB/matome-50katakana-a-no.pdf` | ア〜ノ · 25 页 | `extract-nazorigaki-kata.py` → `assets/write-nazorigaki/kata/*` |
| `真源/04-片假名-PhaseB/matome-50katakana-ha-nn.pdf` | ハ〜ン · 21 页 | 同上 |

**片假名裁切**（与平假名同规）：
1. panel：页顶右方矢量粉框（分色笔顺 + とめる／はらう／はねる）
2. trace：主练习格右上 2×2
3. 重跑：`python scripts/extract-nazorigaki-kata.py`

## 归档 · 不删备查

`matome-hiragana-th1ichi*.pdf` · `sonota2012*.pdf` · `50hiragana-ha-nn.pdf` · `matome-valen.pdf`

已删除重复：`matome-katakana-1-30 (1).pdf`（与 1-30 同文件）

---

## 不纳入 P0

- `书写板块增补内容.txt` 内 **动画 / 即时评分** 章节
- Podcast / YouTube（仅折叠区外链）
