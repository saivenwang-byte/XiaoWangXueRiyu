---
name: edu-app-paradigm
description: >-
  Build or extend educational H5/apps using our Japanese-learning project paradigm:
  curriculum catalog as source of truth, map-based home, four-gate lessons, 100% sea-star
  grading, My-page supervision, comic rewards. Use when authoring teaching apps,
  lesson navigation, or syncing PRD to implementation in this repo or similar products.
---

# 教学类应用范式（本项目）

## 必读

1. Read `过程讨论内容/教学类应用制作范式.md` (master principles).
2. Read `docs/我们-产品愿景-学习の道.md` (current product truth).
3. Read `过程讨论内容/README.md` for meeting-minute index.

## 协作

- Address the user as **我们** (we); act as PM + UX officer.
- For **global product / layout / visual / Skill decomposition**, use **`hyouga-product-pm`** first (`docs/PRODUCT-PM-全局导演手册.md`); implement only after 拍板.
- **Discuss before act (mandatory):** On new user messages/screenshots/wireframes, restate understanding and wait for explicit approval (`可以开工` / `同意` / `按这个做`) before editing code. See `过程讨论内容/00-讨论优先铁律.md`.
- **Do not** change frozen lesson inner content (e.g. MVP lessons 14/16/18) without explicit request.
- Home page reads **`js/data/curriculum-catalog.js`** only for order/released/map; never flatten lessons as a supermarket grid.
- Stage blocks on home: same inner layout as MVP lesson pills; only stage grouping and map pins change (`07-首页线框与阶段内排版.md`).

## Implementation checklist

- [ ] `CURRICULUM_RELEASED_IDS` matches shipped data
- [ ] `journey-home.js` map + four island panels
- [ ] Four gates unchanged contract: vocab / grammar / dialogue / quiz
- [ ] Stars = 100% on listen/speak/read/scene/quiz; **no** writing dimension
- [ ] `CACHE_VER` bump on asset changes
- [ ] Run `python scripts/pre-ship-check.py` before claiming ship-ready

## Key files

| Area | Path |
|------|------|
| Catalog | `js/data/curriculum-catalog.js` |
| Home UI | `js/journey-home.js`, `css/mvp.css` |
| Lessons | `js/data/lessons-mvp.js`, `lessons-stage2-mvp.js`, `lessons-mvp-depth.js` |
| Storage | `js/mvp-storage.js` |
| Minutes | `过程讨论内容/` |
