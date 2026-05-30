# 微信分享冻结版 · v1.0.0-wechat（MVP build 11）

> **用途**：发给朋友的当前稳定版。后续功能升级请 **另开新仓库**，本仓库保持此版本不动。

## 版本标识

| 项 | 值 |
|---|---|
| 对外名称 | v1.0.0-wechat |
| 资源缓存 | `?v=11` / Service Worker `hyouga-mvp-v11` |
| Git 标签 | `mvp-v1.0-wechat`（本地已打，待 `git push`） |
| Git 锚点 | 标签 **`mvp-v1.0-wechat`**（`git checkout mvp-v1.0-wechat` 可回到本版） |
| 课程范围 | 第 14 / 16 / 18 课 MVP；`legacy.html` 为旧版 24 课情景 |

## 微信分享链接（GitHub Pages）

- **学习入口**：https://saivenwang-byte.github.io/XiaoWangXueRiyu/index.html  
- **分享页**（复制链接/二维码）：https://saivenwang-byte.github.io/XiaoWangXueRiyu/share.html  

### 推荐话术（复制发给好友）

```
标日课后巩固（第14/16/18课），点开就能学：
https://saivenwang-byte.github.io/XiaoWangXueRiyu/index.html

说明：网页版不是小程序；第二关要录音时，微信里请点右上角「在浏览器中打开」。
```

## 本版功能摘要

- 学习舱导航：単語 → 会話 → 文法 → テスト（Tab 顺序已修正）
- 会話多场景 + 第14课分岐试点；旧版情景从会話页链到 `legacy.html`
- 统一 🔊 日语朗读；仓库内含 `tts-cache/` 离线语音包（约 639 条）
- 修复 `vocab-flash.js` 语法错误导致的页面异常跳转

## 升级说明

新功能、新课、大改版 → **新建 GitHub 仓库**，不要在本仓库 `main` 上继续堆 breaking change，以便随时回到本标签版本。
