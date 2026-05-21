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
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIRS = [ROOT / "tts-cache", ROOT / "发布包" / "tts-cache"]
VOICE = "ja-JP-NanamiNeural"
APP_BUILD = 47

SCAN_FILES = [
    ROOT / "js" / "data" / "lessons-mvp.js",
    ROOT / "js" / "data" / "lessons-mvp-depth.js",
    ROOT / "js" / "data" / "mini-cards.js",
    ROOT / "发布包" / "app.js",
    ROOT / "发布包" / "lesson-dialogues.js",
    ROOT / "js" / "data" / "scenarios.js",
]

STRING_KEYS = re.compile(
    r"(?:lessonTitle|title|example|explain|explanation|japanese|question|pattern|timeline|mistake|jp|meaningJa)"
    r'\s*:\s*"((?:\\.|[^"\\])*)"',
    re.MULTILINE,
)
SKIP_PREFIX = re.compile(r"^[\s📖🔗⚠️比：前後]+")

CHINESE_MARKERS = re.compile(
    r"动词|形容词|名词|语法|购物|百货|连接|变化|请求|进行|建议|三个|关系|会话|测试|网络"
)


def tts_key(jp: str) -> str:
    s = (jp or "").strip()
    h = 0
    for ch in s:
        h = ((h << 5) - h + ord(ch)) & 0xFFFFFFFF
    return format(h, "x")


def looks_japanese(s: str) -> bool:
    if not s or len(s.strip()) < 1:
        return False
    if CHINESE_MARKERS.search(s):
        return False
    if re.search(r"[\u3040-\u30ff\u31f0-\u31ff\u4e00-\u9fff\u3400-\u4dbf]", s):
        return True
    return False


def normalize_phrase(raw: str) -> str:
    s = raw.replace('\\"', '"').strip()
    if SKIP_PREFIX.match(s) or "第" in s and "课" in s:
        return ""
    if "→" in s:
        s = s.split("→")[0].strip()
    if "⇔" in s:
        s = s.split("⇔")[0].strip()
    return s


def collect_phrases() -> set[str]:
    phrases: set[str] = set()
    for path in SCAN_FILES:
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        for m in STRING_KEYS.finditer(text):
            raw = normalize_phrase(m.group(1))
            if looks_japanese(raw):
                phrases.add(raw)
    phrases.add("こんにちは。音声のテストです。")
    phrases.add("動詞のて形")
    phrases.add("昨日デパートへ行って、買い物しました")
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

    manifest = {
        "version": APP_BUILD,
        "voice": VOICE,
        "engine": "edge-tts",
        "count": len(keys),
        "keys": keys,
        "note": "MVP 嵌入语音包；与 speech-engine.js ttsCacheKey 算法一致",
    }
    for out_dir in OUT_DIRS:
        (out_dir / "index.json").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
        )
    safe_print(f"DONE new={ok} skip={skip} fail={fail}")
    safe_print(str(OUT_DIRS[0]))


if __name__ == "__main__":
    asyncio.run(main())
