# -*- coding: utf-8 -*-
"""将作者常用说明/文档中的 ?v= 与 js/share-wechat.js CACHE_VER 对齐。"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://saivenwang-byte.github.io/XiaoWangXueRiyu"


def get_cache_ver() -> str:
    text = (ROOT / "js" / "share-wechat.js").read_text(encoding="utf-8")
    m = re.search(r'CACHE_VER\s*=\s*"(\d+)"', text)
    if not m:
        raise SystemExit("[FAIL] 无法读取 CACHE_VER")
    return m.group(1)


def replace_v_in_text(text: str, ver: str) -> tuple[str, int]:
    new, n = re.subn(
        rf"({re.escape(ORIGIN)}/(?:index\.html|share\.html)\?v=)\d+",
        rf"\g<1>{ver}",
        text,
    )
    new, n2 = re.subn(
        rf"({re.escape(ORIGIN)}/index\.html\?v=)\d+",
        rf"\g<1>{ver}",
        new,
    )
    return new, n + n2


def sync_file(path: Path, ver: str) -> int:
    if not path.is_file():
        return 0
    raw = path.read_text(encoding="utf-8")
    new, n = replace_v_in_text(raw, ver)
    if n and new != raw:
        path.write_text(new, encoding="utf-8", newline="\n")
    return n


def main() -> int:
    ver = get_cache_ver()
    targets = [
        ROOT / "怎么用.txt",
        ROOT / "微信分享说明.txt",
        ROOT / "笔记本连接GitHub-必读.txt",
        ROOT / "docs" / "链接转发.md",
        ROOT / "Site-not-found-看这里.txt",
        ROOT / "docs" / "发布与知识库同步.md",
    ]
    total = 0
    for p in targets:
        c = sync_file(p, ver)
        if c:
            print(f"[OK] 已同步 {p.relative_to(ROOT)} ({c} 处 → v={ver})")
            total += c
    if total == 0:
        print(f"[OK] 作者链接文案已与 v={ver} 一致（无需改写）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
