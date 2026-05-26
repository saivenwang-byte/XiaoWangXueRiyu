# 项目全局规范说明书 · Cursor Agent 终极索引

> **地位**：本文件为仓库内 Agent/协作者的**总入口**。细则分册见 `docs/`，禁止在本文件重复粘贴全文。  
> **当前阶段**：**MVP 已冻结**（v=46，标签 `mvp-v1.0.1-biaori-141618`）→ [docs/MVP-FREEZE.md](docs/MVP-FREEZE.md)。**完整版**按 [docs/FULL-VERSION-ROADMAP.md](docs/FULL-VERSION-ROADMAP.md)：**阶段二五课优先** → Part-0 入門（不锁课）→ 1–12 / 21–24。

---

## 0. 文档地图（读哪一本）

| 主题 | 文件 |
|------|------|
| **本索引** | `PROJECT_SPEC.md`（本文件） |
| **目录与命名** | [docs/PROJECT_ARCHITECTURE.md](docs/PROJECT_ARCHITECTURE.md) |
| **文递自归 · 概念** | [docs/项目知识库-文递自归.md](docs/项目知识库-文递自归.md) |
| **文递自归 · 执行** | [docs/Agent文递自归.md](docs/Agent文递自归.md) |
| **机器基线** | [docs/iteration-baseline.json](docs/iteration-baseline.json) |
| **交付闸门** | [docs/Agent交付前工作流.md](docs/Agent交付前工作流.md) |
| **踩坑记忆** | [docs/Agent交付前工作流-记忆库.md](docs/Agent交付前工作流-记忆库.md) |
| **标日日文** | [docs/项目知识库-标日日文书写.md](docs/项目知识库-标日日文书写.md) |
| **课内単語标黄** | [docs/项目知识库-课内单词标黄范式.md](docs/项目知识库-课内单词标黄范式.md)（改单词 UI/数据前必读） |
| **U1L1 UI 统筹** | [docs/项目知识库-U1L1-MVP-UI统筹审查.md](docs/项目知识库-U1L1-MVP-UI统筹审查.md)（课内 UI/密度/色 · 前置条件） |
| **版本沿革** | [docs/version-history.json](docs/version-history.json) · [VERSION.md](VERSION.md) |
| **Cursor 本机设置** | [docs/Cursor推荐设置.md](docs/Cursor推荐设置.md) |
| **协作入口** | [AGENTS.md](AGENTS.md) |
| **多 Agent 流水线** | [docs/Agent流水线-多角色分工.md](docs/Agent流水线-多角色分工.md) · [docs/agent-pipeline.json](docs/agent-pipeline.json) |
| **PM 任务单** | [docs/pm-tasks-template.json](docs/pm-tasks-template.json) · `docs/tasks/` |

**Cursor Skills**：`hyouga-orchestrator`(PM) · `hyouga-author`(Dev) · `hyouga-review` · `hyouga-qa` · `hyouga-fix` · `hyouga-shipper`(Release) · `hyouga-auditor`(合体)

---

## 1. 核心标准术语 · 文递自归

- **标准技术名**：Autoregressive Generation（自回归生成）
- **核心机制**：逐 Token 串行 + 历史全量依赖 + 生成内容回流闭环递推
- **架构归属**：Decoder-only 对话模型标配范式
- **优势**：长文本连贯、逻辑自洽、对话上下文稳定
- **劣势**：串行慢、误差累积、算力更高
- **完整定义与对立概念**：见 [docs/项目知识库-文递自归.md](docs/项目知识库-文递自归.md)

---

## 2. Agent 前置自检清单（每任务）

执行任何代码/文档/交付任务前：

- [ ] 已读 `docs/iteration-baseline.json`（`current` / `confirmed` / `backlog`）
- [ ] 正确使用「文递自归」定义，未混用非自回归 / 自编码
- [ ] 未省略关键机制步骤；无口语化模糊释义
- [ ] 符合 `.cursor/rules/wendi-zigui-core.mdc` 与 `agent-delivery-gate.mdc`
- [ ] 交付声称前：`python scripts/pre-ship-check.py` 全 OK

---

## 3. 项目整体要求

| 维度 | 要求 |
|------|------|
| 产品 | 标日课后巩固 H5；中文仅进 `*Zh` / `zh` 字段 |
| 学员费用 | 静态 Pages + MP3，无运行时 AI API |
| 迭代 | **文递自归**：在 `confirmed` 基线上增量改，禁止每会话重写全站 |
| 发布 | 用户未要求不 push；发链接前必自检 |
| 本地 | `http://localhost:8765` + `打开本地预览.bat`；禁止 `file://` 交付 |

---

## 4. 通用输出标准（解释类任务）

1. 先定义本质  
2. 再拆解运行机制  
3. 再列核心特征  
4. 再对比易混淆概念  
5. 最后适用场景与优劣  

---

## 5. 版本双轨（ bump 时四处同步）

| 轨道 | 位置 | 说明 |
|------|------|------|
| 产品 semver | `docs/version-history.json` · `VERSION.md` | 如 1.0.1 |
| 资源 cache | `js/share-wechat.js` `CACHE_VER` · `index.html` `?v=` · `iteration-baseline.json` `current.cache` | 如 45 |
| 作者文案 | bump 后运行 **`同步作者链接.bat`**（或 `python scripts/sync-cache-ver-hints.py`） | `怎么用.txt` 等 |

---

## 6. MVP → 完整版 24 课（启动前检查）

见 [docs/PROJECT_ARCHITECTURE.md](docs/PROJECT_ARCHITECTURE.md) §「24 课扩展」。

摘要：

1. 数据：`lessons-mvp.js` / `lessons-mvp-depth.js` / `lesson-vocab-biaori.js` 按课号扩展  
2. TTS：新增日文 → `生成语音包.bat` → `audit-tts-registry.py --write` 缺失 0  
3. 冒烟：每新课至少 1 课走四关（単語/文法/会話/テスト）  
4. 基线：验收后写入 `iteration-baseline.json` `confirmed`  
5. 归档：旧 MVP 快照见 `docs/PROJECT_ARCHITECTURE.md` §归档  

---

## 7. 修订记录

| 日期 | 内容 |
|------|------|
| 2026-05-21 | 初版：总索引、术语、自检、MVP→24 指针；配合 `.cursor/rules/wendi-zigui-core.mdc` |
