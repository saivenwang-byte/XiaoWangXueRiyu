# 彩蛋 · 分单元插画归档

与 `assets/story/` 工程目录对应；**定稿副本**按单元存放在本目录，便于查阅与外发。

## 文件夹

| 目录 | 课程 | 同步来源 |
|------|------|----------|
| `单元1/` | 第 1–4 課 | `finish-unit-strip.py --unit 1` 后 |
| `单元2/` | 第 5–8 課 | `--unit 2` |
| `单元3/` | 第 9–12 課 | `--unit 3` |
| `单元4/` | 第 13–16 課 | `--unit 4` |
| `单元5/` | 第 17–20 課 | `--unit 5` |
| `单元6/` | 第 21–24 課 | `--unit 6` |

各单元内另有 `彩蛋-单元N….txt` 为分镜/提示词真源（**每单元一套**）。

**制作前必读**：[`docs/story-unit-production-workflow.md`](../docs/story-unit-production-workflow.md)（开工校对 + 六单元索引）  
**校对命令**：`python scripts/preflight-unit-strip.py --unit N`

## 同步后常见文件

| 文件 | 说明 |
|------|------|
| `unit-N-strip.webp` | 四联条带（**无泡**，App 用） |
| `unit-N-panel-{1..4}-clean.png` | 单格无泡 |
| `unit-N-panel-{1..4}-dialogue.png` | 单格有泡（**第二阶段**，默认不生成） |
| `draft/` | 四格草稿（若有） |
| `harmonized/` | 调色后中间稿（若有） |

## 命令

```bash
python scripts/sync-story-to-eggs.py --unit 1
python scripts/sync-story-to-eggs.py --all
```

工程真源仍在 `assets/story/`；改图后重新跑 `finish-unit-strip.py` 再同步本目录。
