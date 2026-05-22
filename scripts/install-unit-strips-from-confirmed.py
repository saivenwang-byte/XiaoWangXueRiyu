#!/usr/bin/env python3
"""从 彩蛋/单元N/确认版/{1..4}.png 安装四格条带（draft → harmonize → finish → sync）。"""
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
STORY = ROOT / "assets" / "story"
OUT_W, OUT_H = 1920, 1080


def confirmed_dir(unit: int) -> Path:
    return ROOT / "彩蛋" / f"单元{unit}" / "确认版"


def install_drafts(unit: int, *, force: bool = True) -> None:
    src_dir = confirmed_dir(unit)
    if not src_dir.is_dir():
        raise SystemExit(f"missing {src_dir}")
    for i in range(1, 5):
        src = src_dir / f"{i}.png"
        if not src.is_file():
            raise SystemExit(f"missing {src}")
        im = Image.open(src).convert("RGB").resize((OUT_W, OUT_H), Image.Resampling.LANCZOS)
        dest = STORY / f"unit-{unit}-panel-{i}-draft.png"
        im.save(dest, "PNG", optimize=True)
        print(f"unit {unit} draft {i} <- {src.name}")


def run_py(script: str, *args: str) -> None:
    cmd = [sys.executable, str(ROOT / "scripts" / script), *args]
    subprocess.run(cmd, check=True, cwd=ROOT)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--unit", type=int, action="append", help="仅处理指定单元 1-6")
    ap.add_argument("--skip-lock-check", action="store_true", help="单元1 已 LOCK 仍覆盖")
    args = ap.parse_args()

    units = args.unit or list(range(1, 7))
    locked = set()
    lock_file = ROOT / "assets" / "story" / "LOCKED.json"
    if lock_file.is_file():
        import json

        locked = {int(k) for k, v in json.loads(lock_file.read_text(encoding="utf-8")).get("units", {}).items() if v.get("locked")}

    for unit in units:
        if unit in locked and not args.skip_lock_check:
            print(f"skip unit {unit}: LOCKED（加 --skip-lock-check 强制）")
            continue
        print(f"\n=== unit {unit} ===")
        install_drafts(unit)
        run_py("harmonize-gurumi-panels.py", "--unit", str(unit))
        run_py("finish-unit-strip.py", "--unit", str(unit))
        run_py("sync-story-to-eggs.py", "--unit", str(unit))

    print("\ndone all units")


if __name__ == "__main__":
    main()
