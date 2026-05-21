# -*- coding: utf-8 -*-
"""
发布前自检（Agent / 开发者发布前必须跑通）
  python scripts/pre-ship-check.py
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def fail(msg: str) -> None:
    print(f"[FAIL] {msg}")


def ok(msg: str) -> None:
    print(f"[OK] {msg}")


def check_cache_ver_sync() -> bool:
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    share = (ROOT / "js" / "share-wechat.js").read_text(encoding="utf-8")
    m1 = re.search(r"\?v=(\d+)", index)
    m2 = re.search(r'CACHE_VER\s*=\s*"(\d+)"', share)
    if not m1 or not m2 or m1.group(1) != m2.group(1):
        fail(f"版本号不一致 index v={m1 and m1.group(1)} vs CACHE_VER={m2 and m2.group(1)}")
        return False
    ok(f"缓存版本 v={m1.group(1)} 已同步")
    return True


def check_depth_zh() -> bool:
    text = (ROOT / "js" / "data" / "lessons-mvp-depth.js").read_text(encoding="utf-8")
    issues = []
    for m in re.finditer(r'type:\s*"text"', text):
        start = m.start()
        chunk = text[start : start + 280]
        if 'text:' in chunk and "zh:" not in chunk:
            t = re.search(r'text:\s*"([^"]+)"', chunk)
            if t:
                issues.append(t.group(1)[:40])
    for m in re.finditer(r'type:\s*"list"', text):
        start = m.start()
        chunk = text[start : start + 800]
        if re.search(r'items:\s*\[\s*"', chunk) and "zh:" not in chunk.split("]")[0]:
            issues.append("list 纯字符串")
    if issues:
        fail(f"课外讲题缺中文灰字 {len(issues)} 处（示例 {issues[:3]}）")
        return False
    ok("课外讲题 text/list 已含 zh 或为对象格式")
    return True


def run_audit_ja_text() -> bool:
    r = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "audit-ja-text.py")],
        cwd=str(ROOT),
        capture_output=True,
    )
    if r.returncode != 0:
        fail("日文书写 audit-ja-text 未通过（见 docs/项目知识库-标日日文书写.md）")
        if r.stdout:
            sys.stdout.buffer.write(r.stdout[-2000:])
        return False
    ok("日文书写 audit-ja-text 通过")
    return True


def check_vocab_meaning_zh() -> bool:
    text = (ROOT / "js" / "data" / "lesson-vocab-biaori.js").read_text(encoding="utf-8")
    jp_count = len(re.findall(r'\bjp:\s*"', text))
    zh_count = len(re.findall(r'meaningZh:\s*"', text))
    if zh_count < jp_count * 0.95:
        fail(f"标日单词 meaningZh 不足：jp={jp_count} zh={zh_count}")
        return False
    ok(f"标日单词 meaningZh 覆盖 {zh_count}/{jp_count}")
    return True


def run_verify_tts() -> bool:
    r = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "verify-tts-cache.py")],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    out = (r.stdout or "") + (r.stderr or "")
    if r.returncode != 0:
        sys.stdout.buffer.write(out.encode("utf-8", errors="replace")[-2000:])
        fail("语音包 verify-tts-cache 未通过 — 请运行 生成语音包.bat")
        return False
    if "[MISS]" in out:
        sys.stdout.buffer.write(out.encode("utf-8", errors="replace")[-2000:])
        fail("语音包有缺失 MP3")
        return False
    ok("语音包 verify-tts-cache 通过")
    return True


def main() -> int:
    print("=== 发布前自检 ===\n")
    checks = [
        check_cache_ver_sync(),
        check_vocab_meaning_zh(),
        check_depth_zh(),
        run_audit_ja_text(),
        run_verify_tts(),
    ]
    print()
    if all(checks):
        print("=== 全部通过，可以 push / 发链接 ===")
        return 0
    print("=== 未通过，请先修复再发布 ===")
    return 1


if __name__ == "__main__":
    sys.exit(main())
