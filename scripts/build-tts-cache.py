# -*- coding: utf-8 -*-
"""
生成嵌入日语语音包：edge-tts ja-JP-NanamiNeural → tts-cache/*.mp3
运行：pip install edge-tts && python scripts/build-tts-cache.py

输出目录（同时写入）：
  - tts-cache/          ← MVP 主站 index.html 使用
  - 发布包/tts-cache/   ← U 盘 / 发布包
"""
from __future__ import annotations

import asyncio
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from tts_lib import collect_requirements, tts_key, write_registry  # noqa: E402

OUT_DIRS = [ROOT / "tts-cache", ROOT / "发布包" / "tts-cache"]
VOICE = "ja-JP-NanamiNeural"
APP_BUILD = 48


def collect_phrases() -> set[str]:
    req = collect_requirements()
    return {r.line for r in req.values()}


async def generate_one(jp: str, dest: Path) -> bool:
    try:
        import edge_tts
    except ImportError:
        print("请先运行: pip install edge-tts")
        sys.exit(1)
    communicate = edge_tts.Communicate(jp, VOICE)
    await communicate.save(str(dest))
    return dest.stat().st_size > 200


def safe_print(msg: str) -> None:
    out = msg.encode(sys.stdout.encoding or "utf-8", errors="replace").decode(
        sys.stdout.encoding or "utf-8", errors="replace"
    )
    try:
        print(out)
    except Exception:
        print(out.encode("ascii", errors="replace").decode("ascii"))


async def main() -> None:
    phrases = sorted(collect_phrases())
    safe_print(f"phrases={len(phrases)} voice={VOICE}")

    for out_dir in OUT_DIRS:
        out_dir.mkdir(parents=True, exist_ok=True)

    keys: list[str] = []
    ok = 0
    skip = 0
    fail = 0

    for i, jp in enumerate(phrases, 1):
        k = tts_key(jp)
        keys.append(k)
        primary = OUT_DIRS[0] / f"{k}.mp3"
        if primary.exists() and primary.stat().st_size > 200:
            skip += 1
            for out_dir in OUT_DIRS[1:]:
                dest = out_dir / f"{k}.mp3"
                if not dest.exists():
                    dest.write_bytes(primary.read_bytes())
            continue
        try:
            if await generate_one(jp, primary):
                ok += 1
                for out_dir in OUT_DIRS[1:]:
                    dest = out_dir / f"{k}.mp3"
                    dest.write_bytes(primary.read_bytes())
                safe_print(f"[{i}/{len(phrases)}] OK {k} {jp[:40]}")
            else:
                fail += 1
                safe_print(f"[{i}/{len(phrases)}] FAIL {k}")
        except Exception as e:
            fail += 1
            safe_print(f"[{i}/{len(phrases)}] ERR {k} {e!r}")

    write_registry()
    manifest = {
        "version": APP_BUILD,
        "voice": VOICE,
        "engine": "edge-tts",
        "count": len(keys),
        "keys": keys,
        "note": "编号对账见 docs/tts-registry.json；key=ttsCacheKey=data-tts-key",
    }
    for out_dir in OUT_DIRS:
        (out_dir / "index.json").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
        )
    safe_print(f"DONE new={ok} skip={skip} fail={fail}")
    safe_print(str(OUT_DIRS[0]))
    safe_print("registry: docs/tts-registry.json")


if __name__ == "__main__":
    asyncio.run(main())
