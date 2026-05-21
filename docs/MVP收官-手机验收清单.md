# MVP 收官 · 手机验收清单（第 14/16/18 课）

> **产品版** 1.0.1 · **cache** v=45 · 本地自检已通过（`pre-ship-check.py`）。  
> **公网**：须先 `git push` 后 1～2 分钟再用下面链接（未 push 时手机打开仍是旧版）。

## 发给手机的链接（验收用这个）

```
https://saivenwang-byte.github.io/XiaoWangXueRiyu/index.html?v=45
```

跟读录不上：微信「···」→ **在浏览器中打开**。

## 每课快速点选（约 5 分钟/课）

| # | 检查 | 通过标准 |
|---|------|----------|
| 1 | 首页能进 14 / 16 / 18 课 | 无白屏、无「読み込みエラー」 |
| 2 | **単語** | 有单词列表；顶部「先生のひとこと」+ **難しめ一行灰字** |
| 3 | **会話** | 三行 🔊🎤▶✓；录完点 ✓ 出「本句发音」；换句旧评语消失 |
| 4 | **文法** | 秘技/文型可见；点 🔊 能播 |
| 5 | **テスト** | 题目正常；填空题 🔊 读完整句 |
| 6 | **分享** | 复制链接含 `?v=45` |

## 笔记本发布顺序（push 前）

1. `发布前自检.bat` → 全部 `[OK]`
2. `git add` / `commit` / `push`（含 `tts-cache/`、`docs/`、`.cursor/rules/` 若需纳入仓库）
3. 等 GitHub Pages 更新
4. 双击 `帮你发布好了.bat` 复制链接 → 发手机
5. 手机 **关 WiFi 用 4G** 再开链接验收（模拟学员）

## MVP 正式结束后

- 在 `docs/version-history.json` 记一笔 MVP 冻结（可选 git tag）
- 下一阶段的 backlog 见 `docs/iteration-baseline.json` → `backlog`（P0 灰字 / P2 难词 / P3 链接）
- 24 课扩展步骤：`docs/PROJECT_ARCHITECTURE.md` §7
