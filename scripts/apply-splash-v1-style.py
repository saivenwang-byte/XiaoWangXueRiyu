#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
封面底图 cover-base.png（64649377 · 六圆+虚线）
🔒 须对齐 docs/locks/P0-SPLASH-COVER-DESIGN-LOCK-20260525.md；改版须用户解锁。
· 纯色底 #FFF8E1
· 列岛渐变 · 虚线 #4A6FA5（学習の道）
· 保留白圆 + 圆内编号
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "地图" / "64649377-e0e1-4239-a073-118630981bb6 (1).png"
OUT = ROOT / "assets" / "splash" / "cover-base.png"

CREAM = (255, 248, 225)
TRACK_BLUE = (74, 111, 165)
GRAD_SOUTH = (255, 167, 130)
GRAD_MID = (255, 112, 67)
GRAD_NORTH = (233, 74, 38)


def lerp_color(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    t = max(0.0, min(1.0, t))
    return (
        int(a[0] + (b[0] - a[0]) * t),
        int(a[1] + (b[1] - a[1]) * t),
        int(a[2] + (b[2] - a[2]) * t),
    )


def grad_at(t: float) -> tuple[int, int, int]:
    if t < 0.5:
        return lerp_color(GRAD_SOUTH, GRAD_MID, t / 0.5)
    return lerp_color(GRAD_MID, GRAD_NORTH, (t - 0.5) / 0.5)


def is_circle_fill(r: int, g: int, b: int) -> bool:
    """站点白圆（高亮近白，排除米黄底纹）。"""
    return r >= 238 and g >= 236 and b >= 234 and abs(r - g) <= 8 and abs(g - b) <= 12


def is_station_number(r: int, g: int, b: int) -> bool:
    """圆内编号（仅叠在白圆上，不咬列岛）。"""
    return r >= 165 and g <= 105 and b <= 105 and r > g + 35


def is_track_pixel(r: int, g: int, b: int) -> bool:
    if is_circle_fill(r, g, b):
        return False
    return r >= 190 and g >= 145 and b <= 125 and r > g > b + 8


def is_map_land(r: int, g: int, b: int) -> bool:
    if is_circle_fill(r, g, b) or is_track_pixel(r, g, b):
        return False
    if r >= 228 and g >= 222 and b >= 195:
        return False
    return r >= 105 and r > g + 15 and r > b + 15


def is_phone_frame_stroke(r: int, g: int, b: int) -> bool:
    if is_track_pixel(r, g, b) or is_circle_fill(r, g, b):
        return False
    return r >= 100 and g <= 72 and b <= 72 and g < int(r * 0.42)


def in_phone_frame_rim(x: int, y: int, w: int, h: int) -> bool:
    return x <= 13 or x >= w - 14 or y <= 13 or y >= h - 14


def in_corner_rim(x: int, y: int, w: int, h: int) -> bool:
    m = 28
    return (
        (x < m and y < m)
        or (x >= w - m and y < m)
        or (x < m and y >= h - m)
        or (x >= w - m and y >= h - m)
    )


def main() -> int:
    if not SRC.is_file():
        print(f"[FAIL] missing {SRC}", file=sys.stderr)
        return 1

    src = Image.open(SRC).convert("RGB")
    w, h = src.size
    spx = src.load()
    out = Image.new("RGB", (w, h), CREAM)
    dpx = out.load()

    map_ys: list[int] = []
    for y in range(h):
        for x in range(w):
            if is_map_land(*spx[x, y]):
                map_ys.append(y)
    if not map_ys:
        print("[FAIL] no map pixels", file=sys.stderr)
        return 1
    y_min, y_max = min(map_ys), max(map_ys)

    track_n = 0
    grad_n = 0
    circle_n = 0
    label_n = 0

    for y in range(h):
        for x in range(w):
            r, g, b = spx[x, y]
            if (in_phone_frame_rim(x, y, w, h) or in_corner_rim(x, y, w, h)) and is_phone_frame_stroke(
                r, g, b
            ):
                continue
            if is_track_pixel(r, g, b):
                dpx[x, y] = TRACK_BLUE
                track_n += 1
                continue
            if is_map_land(r, g, b):
                t = (y - y_min) / max(1, y_max - y_min)
                dpx[x, y] = grad_at(1.0 - t)
                grad_n += 1

    for y in range(h):
        for x in range(w):
            r, g, b = spx[x, y]
            if is_circle_fill(r, g, b):
                dpx[x, y] = (r, g, b)
                circle_n += 1
                continue
            if is_station_number(r, g, b):
                dr, dg, db = dpx[x, y]
                if dr >= 200 and dg >= 200 and db >= 200:
                    dpx[x, y] = (r, g, b)
                    label_n += 1

    OUT.parent.mkdir(parents=True, exist_ok=True)
    out.save(OUT, "PNG", optimize=True)
    print(
        f"[OK] cover-base cream={CREAM} map={grad_n} track_blue={track_n} "
        f"circles={circle_n} labels={label_n} -> {OUT} {out.size}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
