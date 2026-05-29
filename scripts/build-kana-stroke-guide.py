# -*- coding: utf-8 -*-
"""从 animCJK svgsJaKana 提取清音笔顺中线，生成 js/data/kana-stroke-guide.js"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SVG_DIR = ROOT / "_tmp_animCJK" / "svgsJaKana"
OUT = ROOT / "js" / "data" / "kana-stroke-guide.js"
VB = 1024

# 与 intro-content.js INTRO_GOJUON_SEION 一致（平假名键）
SEION_KANA = [
    "あ", "い", "う", "え", "お",
    "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ",
    "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の",
    "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も",
    "や", "ゆ", "よ",
    "ら", "り", "る", "れ", "ろ",
    "わ", "を",
    "ん",
]

# 教材笔顺表 · 清音标准笔画数（ちびむす / 五十音笔顺表）
STD_STROKES = {
    "あ": 3, "い": 2, "う": 2, "え": 2, "お": 3, "か": 3, "き": 4, "く": 1, "け": 3, "こ": 2,
    "さ": 3, "し": 1, "す": 3, "せ": 3, "そ": 1, "た": 4, "ち": 2, "つ": 1, "て": 1, "と": 2,
    "な": 4, "に": 3, "ぬ": 2, "ね": 2, "の": 1, "は": 3, "ひ": 1, "ふ": 4, "へ": 1, "ほ": 4,
    "ま": 3, "み": 2, "む": 3, "め": 2, "も": 3, "や": 3, "ゆ": 2, "よ": 2,
    "ら": 2, "り": 2, "る": 1, "れ": 2, "ろ": 1, "わ": 2, "を": 3, "ん": 1,
}

# animCJK 偶发整笔重复或副线，按索引保留
MANUAL_KEEP: dict[str, list[int]] = {
    "の": [0],
    "ね": [0, 1],
}


def parse_path_d(d: str) -> list[list[float]]:
    """解析 animCJK 中线 path（M + 空格分隔坐标）。"""
    d = d.strip()
    if not d.startswith("M"):
        return []
    body = d[1:].strip()
    nums = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", body)]
    pts: list[list[float]] = []
    for i in range(0, len(nums) - 1, 2):
        pts.append([nums[i], nums[i + 1]])
    return pts


def extract_medians(svg_text: str) -> list[list[list[float]]]:
    strokes: list[list[list[float]]] = []
    for m in re.finditer(r'clip-path="[^"]*"\s+d="([^"]+)"', svg_text):
        pts = parse_path_d(m.group(1))
        if len(pts) >= 2:
            strokes.append(pts)
    return strokes


def in_viewbox(stroke: list[list[float]]) -> bool:
    return all(0 <= x <= VB and 0 <= y <= VB for x, y in stroke)


def dedup_strokes(strokes: list[list[list[float]]], tol: float = 40) -> list[list[list[float]]]:
    out: list[list[list[float]]] = []
    for s in strokes:
        dup = False
        for t in out:
            if (
                len(s) == len(t)
                and abs(s[0][0] - t[0][0]) < tol
                and abs(s[0][1] - t[0][1]) < tol
                and abs(s[-1][0] - t[-1][0]) < tol
                and abs(s[-1][1] - t[-1][1]) < tol
            ):
                dup = True
                break
        if not dup:
            out.append(s)
    return out


def clean_strokes(kana: str, raw: list[list[list[float]]]) -> list[list[list[float]]]:
    strokes = [s for s in raw if s and s[0][0] >= 0 and in_viewbox(s)]
    strokes = dedup_strokes(strokes)
    if kana in MANUAL_KEEP:
        keep = MANUAL_KEEP[kana]
        strokes = [strokes[i] for i in keep if i < len(strokes)]
    return strokes


def main() -> None:
    if not SVG_DIR.is_dir():
        raise SystemExit(f"缺少 {SVG_DIR}，请先 sparse-checkout animCJK svgsJaKana")

    guide: dict[str, dict] = {}
    missing: list[str] = []
    mismatches: list[str] = []

    for kana in SEION_KANA:
        dec = ord(kana)
        svg_path = SVG_DIR / f"{dec}.svg"
        if not svg_path.is_file():
            missing.append(kana)
            continue
        text = svg_path.read_text(encoding="utf-8")
        raw = extract_medians(text)
        strokes = clean_strokes(kana, raw)
        if not strokes:
            missing.append(kana)
            continue
        exp = STD_STROKES.get(kana)
        if exp is not None and len(strokes) != exp:
            mismatches.append(f"{kana}: got {len(strokes)} expect {exp}")
        guide[kana] = {"vb": [0, 0, VB, VB], "strokes": strokes}

    header = """/**
 * 清音笔顺中线 · 源自 animCJK svgsJaKana（LGPL-3+）
 * https://github.com/parsimonhi/animCJK
 * 生成：python scripts/build-kana-stroke-guide.py
 * 清洗：viewBox 内 · 去重 · 教材笔顺表校对
 */
const KANA_STROKE_GUIDE = """
    footer = ";\n"
    body = json.dumps(guide, ensure_ascii=False, separators=(",", ":"))
    OUT.write_text(header + body + footer, encoding="utf-8", newline="\n")
    print(f"[OK] {len(guide)} kana -> {OUT}")
    if missing:
        print(f"[WARN] missing: {', '.join(missing)}")
    if mismatches:
        print("[WARN] stroke count mismatch:")
        for line in mismatches:
            print(f"  {line}")
        raise SystemExit(1)


if __name__ == "__main__":
    main()
