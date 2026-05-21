# -*- coding: utf-8 -*-
"""
在本机（能联网）运行一次，为「发布包/tts-cache」生成日语 MP3。
U 盘整包拷到别的 PC 后，无需安装 Windows 日语语音包即可播お手本。

依赖: pip install edge-tts
"""
from __future__ import annotations

import asyncio
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "发布包" / "tts-cache"
APP_JS = ROOT / "发布包" / "app.js"
DIALOGUES = ROOT / "发布包" / "lesson-dialogues.js"
VOICE = "ja-JP-NanamiNeural"
APP_BUILD = 46


def tts_key(jp: str) -> str:
    s = (jp or "").strip()
    h = 0
    for ch in s:
        h = ((h << 5) - h + ord(ch)) & 0xFFFFFFFF
    return format(h, "x")


def looks_japanese(s: str) -> bool:
    if not s or len(s.strip()) < 2:
        return False
    if re.search(r"[\u3040-\u30ff\u31f0-\u31ff\u4e00-\u9fff\u3400-\u4dbf]", s):
        return True
    return False


def collect_phrases() -> set[str]:
    phrases: set[str] = set()
    jp_re = re.compile(r'jp:\s*"((?:\\.|[^"\\])*)"', re.MULTILINE)
    for path in (APP_JS, DIALOGUES):
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        for m in jp_re.finditer(text):
            raw = m.group(1).replace('\\"', '"').strip()
            if looks_japanese(raw):
                phrases.add(raw)
    # 常用试听句
    phrases.add("こんにちは。音声のテストです。")
    return phrases


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
    try:
        print(msg)
    except UnicodeEncodeError:
        print(msg.encode("utf-8", errors="replace").decode("utf-8", errors="replace"))


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    phrases = sorted(collect_phrases())
    safe_print(f"phrases={len(phrases)} -> {OUT}")
    keys: list[str] = []
    ok = 0
    skip = 0
    fail = 0
    for i, jp in enumerate(phrases, 1):
        k = tts_key(jp)
        keys.append(k)
        dest = OUT / f"{k}.mp3"
        if dest.exists() and dest.stat().st_size > 200:
            skip += 1
            continue
        try:
            if await generate_one(jp, dest):
                ok += 1
                safe_print(f"[{i}/{len(phrases)}] OK {k}")
            else:
                fail += 1
                safe_print(f"[{i}/{len(phrases)}] FAIL {k}")
        except Exception as e:
            fail += 1
            safe_print(f"[{i}/{len(phrases)}] ERR {k} {e!r}")
    manifest = {
        "version": APP_BUILD,
        "voice": VOICE,
        "count": len(keys),
        "keys": keys,
        "note": "拷整个发布包到 U 盘即可离线播示范音",
    }
    (OUT / "index.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    safe_print(f"DONE new={ok} skip={skip} fail={fail}")
    safe_print(str(OUT / "index.json"))


if __name__ == "__main__":
    asyncio.run(main())
