# AI 协作说明（项目级）

> **总规范入口**：[PROJECT_SPEC.md](PROJECT_SPEC.md)（文档地图 · 术语 · 自检 · MVP→24）  
> **架构与命名**：[docs/PROJECT_ARCHITECTURE.md](docs/PROJECT_ARCHITECTURE.md)  
> **⚠️ 工作流强约束**：[docs/WORKFLOW-STRICT-ROLLBACK.md](docs/WORKFLOW-STRICT-ROLLBACK.md) — 任何代码修改前必须先执行阶段比对，失败回退，不跳阶段。

---

## 显示界面 · Cursor 浏览器刷新前必读

在 **内置浏览器 / 双通道真机框硬刷新** 或声称 UI 验收前，重读：

📄 [docs/学员端显示界面要求-会议纪要汇编.md](docs/学员端显示界面要求-会议纪要汇编.md)（**§0 三十秒清单 R1–R10**）  
📄 Cursor 规则 `.cursor/rules/ui-display-reread-before-preview.mdc`

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

**每次启动任务 / 批量改仓 / 交付审核前**（前置）：

📄 **[docs/MVP-批量脚手架与回退工作流.md](docs/MVP-批量脚手架与回退工作流.md)** · [workflow_definition.json](docs/workflow_definition.json)  
脚本：`scripts/mvp_batch_generator.py` · `scripts/workflow_with_rollback.py` · `scripts/init-check.ps1`

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

改课内単語 UI/数据前必读：[docs/项目知识库-课内单词标黄范式.md](docs/项目知识库-课内单词标黄范式.md)（记忆库 §11）

---

## 语音包

```bat
批量检查语音包.bat
```

- `data-tts-key` ↔ `tts-cache/{key}.mp3` · [docs/tts-registry.json](docs/tts-registry.json)  
- [docs/TTS-语音包编号规范.md](docs/TTS-语音包编号规范.md)

---

## 本地 vs 公网（最终成果 · 双界面）

> 首要执行：[docs/学员端双界面显示标准-首要执行.md](docs/学员端双界面显示标准-首要执行.md)

| 界面 | 用途 | 链接 |
|------|------|------|
| **① Cursor 真机壳** | 改 UI / 交付目视（390×844 锁定，切换页尺寸不变） | `http://127.0.0.1:8765/cursor-miniapp-phone.html?live=1` |
| **② 微信可转发** | 学员学习 | `https://saivenwang-byte.github.io/XiaoWangXueRiyu/index.html?v=` + `CACHE_VER` |
| 开发对照（非单独交付） | 全宽逻辑 / 数据 | `http://localhost:8765/index.html?v=` + `CACHE_VER` |

**铁律 · 真机预览（每一次改 UI / 刷星）**：`http://127.0.0.1:8765/cursor-miniapp-phone.html?live=1` · `Cursor真机持续预览.bat` · Cursor **Simple Browser** 侧边固定 → [docs/双通道验收-浏览器与手机真机框.md](docs/双通道验收-浏览器与手机真机框.md) · 规则 `miniapp-real-device-preview-iron-law.mdc`

**双通道**：`打开双通道预览.bat` = 浏览器全宽 + 真机框 live

`打开本地预览.bat` · 仅通道 A · 失败则 `重启本地服务.bat`

---

## 其它

- [docs/发布前自检.md](docs/发布前自检.md)  
- [docs/Cursor推荐设置.md](docs/Cursor推荐设置.md)  
- [docs/发布与知识库同步.md](docs/发布与知识库同步.md)
