# AI 协作说明（项目级）

> **总规范入口**：[PROJECT_SPEC.md](PROJECT_SPEC.md)（文档地图 · 术语 · 自检 · MVP→24）  
> **架构与命名**：[docs/PROJECT_ARCHITECTURE.md](docs/PROJECT_ARCHITECTURE.md)

---

## 多 Agent 流水线（PM → Dev → Review → QA → Fix → Release）

| 你的角色 | Skill | 何时用 |
|----------|-------|--------|
| PM | `hyouga-orchestrator` | 拆任务、全流程、派单 |
| Dev | `hyouga-author` | 编码 / 数据 / UI |
| Review | `hyouga-review` | 审查 V1–V2（pre-ship、日文、TTS） |
| QA | `hyouga-qa` | 测试 V3（四关冒烟） |
| Fix (sub) | `hyouga-fix` | Review/QA 不通过后 |
| Release (sub) | `hyouga-shipper` | 发链接；push 须你明说 |

说明：[docs/Agent流水线-多角色分工.md](docs/Agent流水线-多角色分工.md) · [docs/agent-pipeline.json](docs/agent-pipeline.json) · 任务单 [docs/pm-tasks-template.json](docs/pm-tasks-template.json)

合体检查：仍可用 `hyouga-auditor`（= Review + QA）。  
一键提示词：[docs/Cursor推荐设置.md](docs/Cursor推荐设置.md) §多 Agent。

---

## 文递自归（改代码之前）

**每一轮改动之前**，必须先对齐已确认基线（Autoregressive Generation · 工程映射见下）：

📄 **概念**：[docs/项目知识库-文递自归.md](docs/项目知识库-文递自归.md)  
📄 **执行**：[docs/Agent文递自归.md](docs/Agent文递自归.md)（ICE · CONFIRM）  
📄 **机器基线**：[docs/iteration-baseline.json](docs/iteration-baseline.json)

**Cursor 自动规则**：`.cursor/rules/wendi-zigui-core.mdc` · `agent-delivery-gate.mdc`

---

## 交付前强制工作流

**向用户交付链接、声称修好之前**：

📄 [docs/Agent交付前工作流.md](docs/Agent交付前工作流.md)  
📄 [docs/Agent交付前工作流-记忆库.md](docs/Agent交付前工作流-记忆库.md) · [docs/version-history.json](docs/version-history.json)

```bat
发布前自检.bat
```

通过后再 `git push`（用户未要求则不 push）。

---

## 首要知识库

改日文、发布链接前必读：[docs/项目知识库-标日日文书写.md](docs/项目知识库-标日日文书写.md)

---

## 语音包

```bat
批量检查语音包.bat
```

- `data-tts-key` ↔ `tts-cache/{key}.mp3` · [docs/tts-registry.json](docs/tts-registry.json)  
- [docs/TTS-语音包编号规范.md](docs/TTS-语音包编号规范.md)

---

## 本地 vs 公网

| 用途 | 链接 |
|------|------|
| 本机 | `http://localhost:8765/index.html?v=` + `CACHE_VER`（`js/share-wechat.js`） |
| 微信 | `https://saivenwang-byte.github.io/XiaoWangXueRiyu/index.html?v=` + `CACHE_VER` |

`打开本地预览.bat` · 失败则 `重启本地服务.bat`

---

## 其它

- [docs/发布前自检.md](docs/发布前自检.md)  
- [docs/Cursor推荐设置.md](docs/Cursor推荐设置.md)  
- [docs/发布与知识库同步.md](docs/发布与知识库同步.md)
