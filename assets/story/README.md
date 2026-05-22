# 单元四格漫画资产

## 画风定稿

**上一版**（三视图グルミ + 水彩绘本感）— 人物一致性与彩蛋效果已确认。中学生硬线漫画风暂缓。

## 交接（推荐）

修好的图放进 **`incoming/unit-{N}/panel-{1..4}.png`** → 运行 `python scripts/install-story-strips-from-folder.py`  
说明：`docs/story-24格-文件夹交接.md`

## 文件

| 文件 | 说明 |
|------|------|
| `gurumi-turnaround-v1.png` | 角色三视图真源 |
| `unit-1-strip.webp` | 第1单元 · **无泡**（四格合成用）· 🔒 已锁定 |
| `unit-1-panel-*-clean.png` | 第1单元单格真源 · 🔒 见 `locked/unit-1/` |
| `locked/unit-1/` | 第1单元定稿存档 + `MANIFEST.md` |
| `unit-1-panel-*-dialogue.png` | 单格 · **有泡**（可选，不进条带） |
| `incoming/unit-1/` | `panel-N.png` 无泡 · `panel-N-dialogue.png` 有泡 |
| `unit-2-strip.webp` | 已生成（`incoming/unit-2/` 可覆盖） |
| `unit-3-strip.webp` | 已生成（`incoming/unit-3/` 可覆盖） |
| `unit-4-strip.webp` … `unit-6-strip.webp` | 待放入 incoming 后安装 |
| `egg-grand.webp` | **隐藏彩蛋** · 24 课各 4 金星后解锁 · 全家福合成（待出图） |

规格：**16:9 · 2×2** · 左上→右上→左下→右下。见 `docs/storyboard-画幅与版式-定案.md`。
