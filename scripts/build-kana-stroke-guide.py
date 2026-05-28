# -*- coding: utf-8 -*-
"""从 animCJK svgsJaKana 提取清音笔顺中线，生成 js/data/kana-stroke-guide.js"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SVG_DIR = ROOT / "_tmp_animCJK" / "svgsJaKana"
OUT = ROOT / "js" / "data" / "kana-stroke-guide.js"

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


def main() -> None:
    if not SVG_DIR.is_dir():
        raise SystemExit(f"缺少 {SVG_DIR}，请先 sparse-checkout animCJK svgsJaKana")

    guide: dict[str, dict] = {}
    missing: list[str] = []

    for kana in SEION_KANA:
        dec = ord(kana)
        svg_path = SVG_DIR / f"{dec}.svg"
        if not svg_path.is_file():
            missing.append(kana)
            continue
        text = svg_path.read_text(encoding="utf-8")
        strokes = extract_medians(text)
        # animCJK 偶发双中线（如 あ 第3笔）；负 x 为镜像辅助线，丢弃
        strokes = [s for s in strokes if s and s[0][0] >= 0]
        if not strokes:
            missing.append(kana)
            continue
        guide[kana] = {"vb": [0, 0, 1024, 1024], "strokes": strokes}

    header = """/**
 * 清音笔顺中线 · 源自 animCJK svgsJaKana（LGPL-3+）
 * https://github.com/parsimonhi/animCJK
 * 生成：python scripts/build-kana-stroke-guide.py
 */
const KANA_STROKE_GUIDE = """
    footer = ";\n"
    body = json.dumps(guide, ensure_ascii=False, separators=(",", ":"))
    OUT.write_text(header + body + footer, encoding="utf-8", newline="\n")
    print(f"[OK] {len(guide)} kana -> {OUT}")
    if missing:
        print(f"[WARN] missing: {', '.join(missing)}")


if __name__ == "__main__":
    main()
