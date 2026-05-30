#!/usr/bin/env python3
"""从 lessons-data.js 会話链提取 4 泡，写回 unit-strip-storyboard.js bubbles。"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "js" / "data" / "lessons-data.js"
STORY = ROOT / "js" / "data" / "unit-strip-storyboard.js"


def load_lessons() -> dict[int, dict]:
    text = DATA.read_text(encoding="utf-8")
    m = re.search(r"const LESSONS_MVP\s*=\s*(\[.*\])\s*;", text, re.S)
    if not m:
        raise SystemExit("LESSONS_MVP not found")
    return {L["lessonId"]: L for L in json.loads(m.group(1))}


def gurumi_side(speaker: str) -> bool:
    return speaker in ("李", "李秀麗", "李さん")


def bubbles_from_dialogues(dialogues: list) -> list[dict]:
    """取课文会話前 4 个话轮（opener → reply 链）。"""
    if not dialogues:
        return []
    lines: list[tuple[str, str, str]] = []
    for d in dialogues[:4]:
        op = d.get("opener") or {}
        sp = (op.get("speaker") or "A").strip()
        jp = (op.get("japanese") or "").strip()
        zh = (op.get("chinese") or "").strip()
        if jp:
            lines.append((sp, jp, zh))
        ut = d.get("userTurn") or {}
        replies = ut.get("replies") or []
        if replies:
            r = replies[0]
            sp2 = (ut.get("speaker") or "B").strip()
            jp2 = (r.get("japanese") or r.get("jp") or "").strip()
            zh2 = (r.get("chinese") or r.get("zh") or "").strip()
            if jp2:
                lines.append((sp2, jp2, zh2))
    out: list[dict] = []
    for sp, jp, zh in lines[:4]:
        side = "right" if gurumi_side(sp) else "left"
        role = "李" if gurumi_side(sp) else sp
        b: dict = {"role": role, "side": side, "jp": jp}
        if gurumi_side(sp):
            b["isGurumi"] = True
        if zh:
            b["zh"] = zh
        out.append(b)
    while len(out) < 4 and out:
        out.append(out[-1])
    return out[:4]


def patch_storyboard(lessons: dict[int, dict]) -> int:
    text = STORY.read_text(encoding="utf-8")
    n = 0
    for lid in range(1, 25):
        L = lessons.get(lid)
        if not L:
            continue
        bubbles = bubbles_from_dialogues(L.get("dialogues") or [])
        if not bubbles:
            continue
        # find panel lessonId block and replace bubbles array (simple regex per lesson)
        pat = rf'(lessonId:\s*{lid},[\s\S]*?bubbles:\s*\[)([\s\S]*?)(\],)'
        m = re.search(pat, text)
        if not m:
            print(f"[WARN] L{lid} panel not found")
            continue
        lines_js = []
        for b in bubbles:
            parts = [f'role: "{b["role"]}"', f'side: "{b["side"]}"']
            if b.get("isGurumi"):
                parts.append("isGurumi: true")
            parts.append(f'jp: "{b["jp"]}"')
            if b.get("zh"):
                parts.append(f'zh: "{b["zh"]}"')
            lines_js.append("          { " + ", ".join(parts) + " }")
        new_bubbles = ",\n".join(lines_js) + "\n        "
        text = text[: m.start(2)] + new_bubbles + text[m.end(2) :]
        n += 1
        print(f"[OK] L{lid} bubbles x{len(bubbles)}")
    STORY.write_text(text, encoding="utf-8")
    return n


def main() -> None:
    lessons = load_lessons()
    n = patch_storyboard(lessons)
    print(f"Done: {n} panels updated -> {STORY}")


if __name__ == "__main__":
    main()
