# -*- coding: utf-8 -*-
"""从 INTEPOINT 品牌目录安装 logo 到 H5 + 小程序壳。

默认源目录（可改）：
  D:\\【kasia-上海公司】\\【INTEPOINT】ShangHai

用法：
  python scripts/install-intepoint-logo.py
  python scripts/install-intepoint-logo.py --src "D:\\path\\to\\logo.png"
"""
from __future__ import annotations

import argparse
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SRC_DIR = Path(r"D:\【kasia-上海公司】\【INTEPOINT】ShangHai")
BRAND = ROOT / "assets" / "brand"
ICON_OUT = BRAND / "intepoint-logo-icon.png"
FULL_OUT = BRAND / "intepoint-logo-full.png"
MINIAPP = ROOT / "japanese_learning_miniapp" / "assets" / "logo.png"
APP_ICON = ROOT / "icons" / "icon.png"

IMAGE_EXT = {".png", ".jpg", ".jpeg", ".webp", ".svg"}


def find_logo_file(src_dir: Path) -> Path | None:
    if not src_dir.is_dir():
        return None
    skip_parts = ("产品概念", "概念图", "5-15", "5-09", "X-产品", "灵境")
    prefer_parts = ("logo", "品牌", "公司宣传", "intepoint", "INTEPOINT")
    scored: list[tuple[int, Path]] = []
    for p in src_dir.rglob("*"):
        if not p.is_file() or p.suffix.lower() not in {".png", ".webp", ".jpg", ".jpeg"}:
            continue
        path_s = str(p)
        if any(x in path_s for x in skip_parts):
            continue
        sz = p.stat().st_size
        if sz > 3_000_000:
            continue
        score = 0
        low = p.stem.lower()
        if "logo" in low or "intepoint" in low:
            score += 100
        if any(x.lower() in path_s.lower() for x in prefer_parts):
            score += 40
        if sz < 800_000:
            score += 20
        scored.append((score, p))
    if not scored:
        return None
    scored.sort(key=lambda t: (t[0], -t[1].stat().st_size), reverse=True)
    return scored[0][1]


def process_raster(src: Path) -> None:
    from PIL import Image

    img = Image.open(src).convert("RGBA")
    w, h = img.size
    cut = int(h * 0.62)
    icon = img.crop((0, 0, w, cut))
    bbox = icon.getbbox()
    if bbox:
        icon = icon.crop(bbox)
    iw, ih = icon.size
    side = max(iw, ih)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(icon, ((side - iw) // 2, (side - ih) // 2))
    icon512 = square.resize((512, 512), Image.Resampling.LANCZOS)
    BRAND.mkdir(parents=True, exist_ok=True)
    img.save(FULL_OUT, "PNG", optimize=True)
    icon512.save(ICON_OUT, "PNG", optimize=True)
    for dest in (MINIAPP, APP_ICON):
        dest.parent.mkdir(parents=True, exist_ok=True)
        icon512.resize((192, 192), Image.Resampling.LANCZOS).save(dest, "PNG", optimize=True)
    print(f"[OK] full  -> {FULL_OUT} ({FULL_OUT.stat().st_size} B)")
    print(f"[OK] icon -> {ICON_OUT} ({ICON_OUT.stat().st_size} B)")
    print(f"[OK] miniapp -> {MINIAPP}")
    print(f"[OK] icons  -> {APP_ICON}")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", help="单个 logo 图片路径")
    ap.add_argument("--dir", default=str(DEFAULT_SRC_DIR), help="扫描目录")
    args = ap.parse_args()

    src_file: Path | None = None
    if args.src:
        src_file = Path(args.src)
    else:
        src_file = find_logo_file(Path(args.dir))

    if not src_file or not src_file.is_file():
        fallback = BRAND / "intepoint-logo-full-source.png"
        if fallback.is_file():
            src_file = fallback
            print(f"[WARN] 未在 {args.dir} 找到 logo，使用已缓存 {fallback.name}")
        else:
            raise SystemExit(
                f"未找到 logo 文件。请指定 --src 或将 PNG 放入：\n  {DEFAULT_SRC_DIR}"
            )

    if src_file.suffix.lower() == ".svg":
        shutil.copy2(src_file, ROOT / "icons" / "icon.svg")
        print(f"[OK] svg -> icons/icon.svg（栅格请另提供 PNG）")
        return

    process_raster(src_file)


if __name__ == "__main__":
    main()
