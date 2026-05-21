# -*- coding: utf-8 -*-
"""校验 tts-cache：缺失、哈希冲突、异常体积。与 build-tts-cache.py 同算法。"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / "tts-cache"
SCAN = [
    ROOT / "js" / "data" / "lessons-mvp.js",
    ROOT / "js" / "data" / "lessons-mvp-depth.js",
    ROOT / "js" / "data" / "lesson-vocab-biaori.js",
    ROOT / "js" / "data" / "mini-cards.js",
]

STRING_KEYS = re.compile(
    r"(?:lessonTitle|title|example|explain|explanation|japanese|question|questionTts|pattern|jp|kana)"
    r'\s*:\s*"((?:\\.|[^"\\])*)"',
    re.MULTILINE,
)
CHINESE_MARKERS = re.compile(r"动词|形容词|名词|语法|购物|百货|连接|变化|请求|进行|建议")


def tts_key(jp: str) -> str:
    s = (jp or "").strip()
    h = 0
    for ch in s:
        h = ((h << 5) - h + ord(ch)) & 0xFFFFFFFF
    return format(h, "x")


def looks_japanese(s: str) -> bool:
    if not s or CHINESE_MARKERS.search(s):
        return False
    return bool(re.search(r"[\u3040-\u30ff\u4e00-\u9fff]", s))


def collect() -> set[str]:
    out: set[str] = set()
    for path in SCAN:
        if not path.exists():
            continue
        for m in STRING_KEYS.finditer(path.read_text(encoding="utf-8")):
            raw = m.group(1).replace('\\"', '"').strip()
            if "→" in raw or "⇔" in raw:
                raw = re.split(r"[→⇔]", raw)[0].strip()
            if looks_japanese(raw):
                out.add(raw)
    return out


def main() -> int:
    if not CACHE.is_dir():
        print("ERROR: tts-cache/ 不存在，请先运行 build-tts-cache.py")
        return 1

    phrases = collect()
    key_to_phrases: dict[str, list[str]] = {}
    for p in phrases:
        k = tts_key(p)
        key_to_phrases.setdefault(k, []).append(p)

    collisions = {k: v for k, v in key_to_phrases.items() if len(v) > 1}
    missing = []
    tiny = []
    huge = []
    for p in sorted(phrases):
        k = tts_key(p)
        f = CACHE / f"{k}.mp3"
        if not f.exists():
            missing.append((p, k))
        else:
            sz = f.stat().st_size
            if sz < 800:
                tiny.append((p, k, sz))
            if sz > 120_000:
                huge.append((p, k, sz))

    def safe_print(msg: str) -> None:
        sys.stdout.buffer.write((msg + "\n").encode("utf-8", errors="replace"))

    safe_print(f"短语 {len(phrases)} · MP3 文件 {len(list(CACHE.glob('*.mp3')))}")
    if collisions:
        safe_print(f"\n[WARN] 哈希冲突 {len(collisions)} 组（需改文案或换 key 算法）:")
        for k, arr in list(collisions.items())[:15]:
            safe_print(f"  {k}: {arr}")
    if missing:
        safe_print(f"\n[MISS] 缺 MP3 {len(missing)} 条（示例 20 条）:")
        for p, k in missing[:20]:
            safe_print(f"  {k}.mp3 ← {p[:60]}")
    if tiny:
        safe_print(f"\n[WARN] 过小文件 {len(tiny)}:")
        for p, k, sz in tiny[:10]:
            safe_print(f"  {k} ({sz}B) ← {p[:50]}")
    if huge:
        safe_print(f"\n[WARN] 过大文件 {len(huge)}:")
        for p, k, sz in huge[:10]:
            safe_print(f"  {k} ({sz}B) ← {p[:50]}")

    # 第14课 Q5 专查
    q5 = "荷物を＿＿＿か。"
    q5tts = "荷物を持ちましょうか。"
    for label, text in [("题干", q5), ("朗读句", q5tts)]:
        k = tts_key(text)
        f = CACHE / f"{k}.mp3"
        safe_print(f"\n[L14 Q5 {label}] {text}")
        safe_print(f"  key={k} exists={f.exists()} size={f.stat().st_size if f.exists() else 0}")

    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
