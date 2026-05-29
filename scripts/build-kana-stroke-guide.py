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
    "さ": 3, "し": 1, "す": 2, "せ": 3, "そ": 1, "た": 4, "ち": 2, "つ": 1, "て": 1, "と": 2,
    "な": 4, "に": 3, "ぬ": 2, "ね": 2, "の": 1, "は": 3, "ひ": 1, "ふ": 4, "へ": 1, "ほ": 4,
    "ま": 3, "み": 2, "む": 3, "め": 2, "も": 3, "や": 3, "ゆ": 2, "よ": 2,
    "ら": 2, "り": 2, "る": 1, "れ": 2, "ろ": 1, "わ": 2, "を": 3, "ん": 1,
}

# ── 平假名专用手工表（勿用于片假名）────────────────────────────
HIRA_MANUAL_REPLACE: dict[str, dict[int, list[list[float]]]] = {
    "よ": {0: [[280, 355], [500, 335]]},
    "か": {
        0: [[270, 410], [610, 410], [390, 560]],
        1: [[390, 200], [390, 760]],
        2: [[580, 500], [680, 590]],
    },
}

HIRA_MANUAL_ORDER: dict[str, list[int]] = {
    "や": [2, 1, 0],
}

HIRA_MANUAL_KEEP: dict[str, list[int]] = {
    "の": [0],
}

# ── 片假名专用（与平假名分开对账；默认仅 canonicalize animCJK 片假名 SVG）──
KATA_MANUAL_REPLACE: dict[str, dict[int, list[list[float]]]] = {}

KATA_MANUAL_ORDER: dict[str, list[int]] = {}

KATA_MANUAL_KEEP: dict[str, list[int]] = {}

CENTER = VB / 2
RDP_EPS = 95
MAX_STROKE_PTS = 5


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


def point_in_viewbox(p: list[float]) -> bool:
    return 0 <= p[0] <= VB and 0 <= p[1] <= VB


def stroke_in_viewbox(stroke: list[list[float]]) -> bool:
    return len(stroke) >= 2 and all(point_in_viewbox(p) for p in stroke)


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


def _y_sig(stroke: list[list[float]], step: float = 50) -> tuple[float, ...]:
    return tuple(round(p[1] / step) * step for p in stroke)


def _x_mean(stroke: list[list[float]]) -> float:
    return sum(p[0] for p in stroke) / len(stroke)


def _mirror_pair(a: list[list[float]], b: list[list[float]], y_step: float = 50, cx_tol: float = 90) -> bool:
    """animCJK 2a/2b：同笔左右镜像副线，Y 序相同且 X 关于中心对称。"""
    if len(a) != len(b) or len(a) < 2:
        return False
    if _y_sig(a, y_step) != _y_sig(b, y_step):
        return False
    for pa, pb in zip(a, b):
        if abs(pa[0] + pb[0] - 2 * CENTER) > cx_tol * 2:
            return False
    return True


def _variant_pair(a: list[list[float]], b: list[list[float]], y_step: float = 50, end_tol: float = 45) -> bool:
    """animCJK 2a/2b 另一形态：Y 路径相同、终点相同、起点不同（左右两式只留 2a）。"""
    if len(a) != len(b) or len(a) < 2:
        return False
    if _y_sig(a, y_step) != _y_sig(b, y_step):
        return False
    if abs(a[-1][0] - b[-1][0]) > end_tol or abs(a[-1][1] - b[-1][1]) > end_tol:
        return False
    if abs(a[0][0] - b[0][0]) < 40 and abs(a[0][1] - b[0][1]) < 40:
        return False
    return True


def _pair_variant(a: list[list[float]], b: list[list[float]]) -> bool:
    return _mirror_pair(a, b) or _variant_pair(a, b)


def drop_mirror_variant_strokes(strokes: list[list[list[float]]]) -> list[list[list[float]]]:
    out: list[list[list[float]]] = []
    i = 0
    while i < len(strokes):
        if i + 1 < len(strokes) and _pair_variant(strokes[i], strokes[i + 1]):
            a, b = strokes[i], strokes[i + 1]
            # 镜像副线：标日笔顺多从左起笔，保留 x 较小的一侧（如本应居左的横笔）
            out.append(a if _x_mean(a) <= _x_mean(b) else b)
            i += 2
        else:
            out.append(strokes[i])
            i += 1
    return out


def _perp_dist(p: list[float], a: list[float], b: list[float]) -> float:
    ax, ay = a
    bx, by = b
    px, py = p
    dx, dy = bx - ax, by - ay
    if dx == 0 and dy == 0:
        return ((px - ax) ** 2 + (py - ay) ** 2) ** 0.5
    t = max(0, min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    qx, qy = ax + t * dx, ay + t * dy
    return ((px - qx) ** 2 + (py - qy) ** 2) ** 0.5


def _rdp(pts: list[list[float]], eps: float) -> list[list[float]]:
    if len(pts) <= 2:
        return [list(p) for p in pts]
    a, b = pts[0], pts[-1]
    idx, dist = 0, -1.0
    for i in range(1, len(pts) - 1):
        d = _perp_dist(pts[i], a, b)
        if d > dist:
            dist, idx = d, i
    if dist <= eps:
        return [list(a), list(b)]
    left = _rdp(pts[: idx + 1], eps)
    right = _rdp(pts[idx:], eps)
    return left[:-1] + right


def canonicalize_stroke(pts: list[list[float]]) -> list[list[float]]:
    """标日静态笔顺：少折点、直线+一弯，避免 animCJK 动画中线乱折。"""
    if len(pts) < 2:
        return [list(p) for p in pts]
    simp = _rdp([list(p) for p in pts], RDP_EPS)
    if len(simp) > MAX_STROKE_PTS:
        keep = [0]
        for i in range(1, MAX_STROKE_PTS - 1):
            keep.append(int(i * (len(simp) - 1) / (MAX_STROKE_PTS - 1)))
        keep.append(len(simp) - 1)
        simp = [simp[i] for i in sorted(set(keep))]
    return simp


def _stroke_ok(stroke: list[list[float]]) -> bool:
    return stroke_in_viewbox(stroke)


def apply_manual_fixes(
    kana: str,
    strokes: list[list[list[float]]],
    *,
    replace: dict,
    order: dict,
    keep: dict,
) -> list[list[list[float]]]:
    if kana in order:
        ord_list = order[kana]
        if all(0 <= i < len(strokes) for i in ord_list):
            strokes = [strokes[i] for i in ord_list]
    if kana in replace:
        for idx, pts in replace[kana].items():
            if 0 <= idx < len(strokes):
                strokes[idx] = [list(p) for p in pts]
    if kana in keep:
        strokes = [strokes[i] for i in keep[kana] if i < len(strokes)]
    return strokes


def clean_strokes(
    kana: str,
    raw: list[list[list[float]]],
    *,
    script: str,
) -> list[list[list[float]]]:
    strokes = [s for s in raw if s and _stroke_ok(s)]
    strokes = dedup_strokes(strokes)
    strokes = drop_mirror_variant_strokes(strokes)
    if script == "hira":
        strokes = apply_manual_fixes(
            kana, strokes, replace=HIRA_MANUAL_REPLACE, order=HIRA_MANUAL_ORDER, keep=HIRA_MANUAL_KEEP
        )
    else:
        strokes = apply_manual_fixes(
            kana, strokes, replace=KATA_MANUAL_REPLACE, order=KATA_MANUAL_ORDER, keep=KATA_MANUAL_KEEP
        )
    strokes = [canonicalize_stroke(s) for s in strokes]
    return strokes


def to_katakana(hiragana: str) -> str:
    return "".join(
        chr(ord(ch) + 0x60) if 0x3041 <= ord(ch) <= 0x3096 else ch for ch in hiragana
    )


def strokes_from_svg(char: str, *, script: str) -> list[list[list[float]]] | None:
    svg_path = SVG_DIR / f"{ord(char)}.svg"
    if not svg_path.is_file():
        return None
    raw = extract_medians(svg_path.read_text(encoding="utf-8"))
    strokes = clean_strokes(char, raw, script=script)
    return strokes if strokes else None


def main() -> None:
    if not SVG_DIR.is_dir():
        raise SystemExit(f"缺少 {SVG_DIR}，请先 sparse-checkout animCJK svgsJaKana")

    guide: dict[str, dict] = {}
    missing: list[str] = []
    kata_missing: list[str] = []
    mismatches: list[str] = []

    for kana in SEION_KANA:
        strokes = strokes_from_svg(kana, script="hira")
        if not strokes:
            missing.append(kana)
            continue
        exp = STD_STROKES.get(kana)
        if exp is not None and len(strokes) != exp:
            mismatches.append(f"hira {kana}: got {len(strokes)} expect {exp}")
        guide[kana] = {"vb": [0, 0, VB, VB], "strokes": strokes}

        kata = to_katakana(kana)
        if kata in guide:
            continue
        kata_strokes = strokes_from_svg(kata, script="kata")
        if not kata_strokes:
            kata_missing.append(kata)
            continue
        if exp is not None and len(kata_strokes) != exp:
            print(f"[WARN] {kata}: got {len(kata_strokes)} expect {exp} (片假名，不阻断)")
        guide[kata] = {"vb": [0, 0, VB, VB], "strokes": kata_strokes}

    header = """/**
 * 清音笔顺中线 · 源自 animCJK svgsJaKana（LGPL-3+）
 * https://github.com/parsimonhi/animCJK
 * 生成：python scripts/build-kana-stroke-guide.py
 * 清洗：平假名/片假名分轨 · 去重 · 教材笔顺表校对（各 46）
 * 对账：python scripts/audit-kana-strokes-batch.py
 */
const KANA_STROKE_GUIDE = """
    footer = ";\n"
    body = json.dumps(guide, ensure_ascii=False, separators=(",", ":"))
    OUT.write_text(header + body + footer, encoding="utf-8", newline="\n")
    print(f"[OK] {len(guide)} entries (平+片) -> {OUT}")
    if missing:
        print(f"[WARN] missing hiragana: {', '.join(missing)}")
    if kata_missing:
        print(f"[WARN] missing katakana: {', '.join(kata_missing)}")
    if mismatches:
        print("[WARN] stroke count mismatch:")
        for line in mismatches:
            print(f"  {line}")
        raise SystemExit(1)


if __name__ == "__main__":
    main()
