# 标日真源 · 结构化课文（合并进 PRD）

## 用途

本目录存放 **可机器合并** 的标日真源补丁，经 `scripts/merge-supplement-structured-into-prd.py` 写入：

`【产品PRD】/新增补课文内容/第N单元/`

## 文件命名

与 PRD 一致，例如：

- `第2单元/第2单元第05课-真源补丁.txt`

## 区块标记（合并脚本识别）

```text
【标日真源·结构化补丁】
…正文…
【/标日真源·结构化补丁】
```

补丁内推荐子节：

- `【课文锚点】` basicText / 会話摘录
- `【作业与小测·Q1–12】` 与 PRD 【作业】一致，供 `patch-u2-lessons-5-8-biaori-truth.py` 对账
- `【拡張·易错】` mistakes 块文案

## 工作流

1. 编辑本目录 txt → 2. `merge-supplement-structured-into-prd.py` → 3. 单元 patch 脚本 → 4. pre-ship
