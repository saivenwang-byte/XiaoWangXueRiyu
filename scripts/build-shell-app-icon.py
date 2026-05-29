# -*- coding: utf-8 -*-
"""橘色外框 + 海军蓝底 + 白色 INTEPOINT emblem（标日壳图标）。

源图：logo/INTEPOINT-logo-PNG.png（仅取上部图形，蓝/灰转白）

输出：
  icons/icon.png
  japanese_learning_miniapp/assets/logo.png
  assets/brand/intepoint-logo-app-shell.png  (512，开机页/壳)
  assets/brand/intepoint-logo-icon.png         (512，仅白色 emblem 透明底，备用)
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "logo" / "INTEPOINT-logo-PNG.png"

# 与现 icons 海军蓝采样一致 · 橘框对齐 mvp --mvp-primary 系
ORANGE = (239, 110, 88, 255)
NAVY = (16, 52, 89, 255)

OUTS = [
    (ROOT / "icons" / "icon.png", 192),
    (ROOT / "japanese_learning_miniapp" / "assets" / "logo.png", 192),
    (ROOT / "assets" / "brand" / "intepoint-logo-app-shell.png", 512),
    (ROOT / "assets" / "brand" / "intepoint-logo-icon.png", 512),
]


def to_white_emblem(img: Image.Image) -> Image.Image:
    """蓝/灰图形 → 纯白（标日壳：橘框内只留白色 emblem）。"""
    img = img.convert("RGBA")
    out = Image.new("RGBA", img.size, (0, 0, 0, 0))
    px_in = img.load()
    px_out = out.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px_in[x, y]
            if a < 16:
                continue
            if r > 248 and g > 248 and b > 248:
                continue
            mx = max(r, g, b)
            if mx < 45:
                continue
            sat = mx - min(r, g, b)
            alpha = min(255, int(a * (0.65 + sat / 400.0 + mx / 600.0)))
            px_out[x, y] = (255, 255, 255, alpha)
    return out


def extract_emblem(src: Image.Image) -> Image.Image:
    w, h = src.size
    top = src.crop((0, 0, w, int(h * 0.54)))
    bbox = top.getbbox()
    if bbox:
        top = top.crop(bbox)
    return to_white_emblem(top)


def build_shell_icon(size: int, emblem: Image.Image) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = int(size * 0.21)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=ORANGE)
    inset = int(size * 0.105)
    inner_r = max(4, int(radius * 0.68))
    draw.rounded_rectangle(
        [inset, inset, size - 1 - inset, size - 1 - inset],
        radius=inner_r,
        fill=NAVY,
    )
    inner_w = size - 2 * inset
    target = int(inner_w * 0.58)
    em = emblem.copy()
    em.thumbnail((target, target), Image.Resampling.LANCZOS)
    x = (size - em.width) // 2
    y = (size - em.height) // 2 - max(1, int(size * 0.018))
    img.paste(em, (x, y), em)
    return img


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"缺少源图 {SRC}")

    src = Image.open(SRC).convert("RGBA")
    emblem = extract_emblem(src)
    (ROOT / "assets" / "brand").mkdir(parents=True, exist_ok=True)

    shell512 = build_shell_icon(512, emblem)
    shell512.save(ROOT / "assets" / "brand" / "intepoint-logo-app-shell.png", "PNG", optimize=True)
    emblem512 = emblem.copy()
    side = max(emblem512.size)
    sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    sq.paste(emblem512, ((side - emblem512.width) // 2, (side - emblem512.height) // 2))
    sq.resize((512, 512), Image.Resampling.LANCZOS).save(
        ROOT / "assets" / "brand" / "intepoint-logo-icon.png", "PNG", optimize=True
    )

    for path, size in OUTS:
        if path.name == "intepoint-logo-icon.png" and size == 512:
            continue
        if path.name == "intepoint-logo-app-shell.png":
            continue
        out = shell512.resize((size, size), Image.Resampling.LANCZOS)
        path.parent.mkdir(parents=True, exist_ok=True)
        out.save(path, "PNG", optimize=True)
        print(f"[OK] {path} ({size}px)")

    print(f"[OK] {ROOT / 'assets/brand/intepoint-logo-app-shell.png'} (512px)")
    print(f"[OK] {ROOT / 'assets/brand/intepoint-logo-icon.png'} (512px, white emblem)")


if __name__ == "__main__":
    main()
