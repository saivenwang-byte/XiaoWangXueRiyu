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
GITHUB_PAGES_ORIGIN = "https://saivenwang-byte.github.io/XiaoWangXueRiyu"
AUTHOR_HINT_FILES = [
    ROOT / "怎么用.txt",
    ROOT / "微信分享说明.txt",
    ROOT / "docs" / "链接转发.md",
    ROOT / "笔记本连接GitHub-必读.txt",
]


def fail(msg: str) -> None:
    print(f"[FAIL] {msg}")


def ok(msg: str) -> None:
    print(f"[OK] {msg}")


def check_wendi_baseline_sync() -> bool:
    """文递自归：知识库存在，且 iteration-baseline / version-history 与 CACHE_VER 一致。"""
    import json

    baseline_path = ROOT / "docs" / "iteration-baseline.json"
    if not baseline_path.exists():
        fail("缺少 docs/iteration-baseline.json（文递自归机器基线）")
        return False

    try:
        baseline = json.loads(baseline_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        fail(f"iteration-baseline.json 无法解析: {e}")
        return False

    paradigm = baseline.get("paradigm") or {}
    doc_rel = paradigm.get("doc", "docs/项目知识库-文递自归.md")
    discipline_rel = paradigm.get("discipline", "docs/Agent文递自归.md")

    spec_path = ROOT / "PROJECT_SPEC.md"
    arch_path = ROOT / "docs" / "PROJECT_ARCHITECTURE.md"
    core_rule = ROOT / ".cursor" / "rules" / "wendi-zigui-core.mdc"

    doc_path = ROOT / Path(doc_rel)
    discipline_path = ROOT / Path(discipline_rel)

    if not spec_path.is_file():
        fail("缺少 PROJECT_SPEC.md（项目总规范）")
        return False
    if not arch_path.is_file():
        fail("缺少 docs/PROJECT_ARCHITECTURE.md")
        return False
    if not core_rule.is_file():
        fail("缺少 .cursor/rules/wendi-zigui-core.mdc")
        return False

    pipeline_doc = ROOT / "docs" / "Agent流水线-多角色分工.md"
    pipeline_json = ROOT / "docs" / "agent-pipeline.json"
    if not pipeline_doc.is_file() or not pipeline_json.is_file():
        fail("缺少 Agent 流水线文档（docs/Agent流水线-多角色分工.md 或 agent-pipeline.json）")
        return False
    pipeline_skills = (
        "hyouga-orchestrator",
        "hyouga-author",
        "hyouga-auditor",
        "hyouga-review",
        "hyouga-qa",
        "hyouga-fix",
        "hyouga-shipper",
    )
    for skill in pipeline_skills:
        if not (ROOT / ".cursor" / "skills" / skill / "SKILL.md").is_file():
            fail(f"缺少 .cursor/skills/{skill}/SKILL.md")
            return False

    if not doc_path.is_file():
        fail(f"文递自归概念库不存在: {doc_rel}")
        return False
    if not discipline_path.is_file():
        fail(f"文递自归执行纪律不存在: {discipline_rel}")
        return False

    cache_actual = get_cache_ver()
    if not cache_actual:
        fail("无法读取 js/share-wechat.js 的 CACHE_VER")
        return False

    cache_baseline = str((baseline.get("current") or {}).get("cache", ""))
    if cache_baseline != cache_actual:
        fail(
            f"文递自归基线 cache={cache_baseline} ≠ CACHE_VER={cache_actual} "
            f"（请同步 iteration-baseline.json 与 index ?v=）"
        )
        return False

    vh_path = ROOT / "docs" / "version-history.json"
    if vh_path.is_file():
        try:
            vh = json.loads(vh_path.read_text(encoding="utf-8"))
            cache_vh = str((vh.get("current") or {}).get("cache", ""))
            if cache_vh and cache_vh != cache_actual:
                fail(f"version-history current.cache={cache_vh} ≠ CACHE_VER={cache_actual}")
                return False
        except json.JSONDecodeError:
            fail("version-history.json 无法解析")
            return False

    ok(
        f"文递自归基线 OK（PROJECT_SPEC + {doc_rel} + {discipline_rel}，cache v={cache_actual}）"
    )
    return True


def check_author_link_hints() -> bool:
    ver = get_cache_ver()
    if not ver:
        fail("无法读取 CACHE_VER（作者链接检查跳过失败）")
        return False
    needle = f"?v={ver}"
    bad: list[str] = []
    for p in AUTHOR_HINT_FILES:
        if not p.is_file():
            continue
        text = p.read_text(encoding="utf-8")
        if GITHUB_PAGES_ORIGIN in text and needle not in text:
            bad.append(str(p.relative_to(ROOT)))
    bat_path = ROOT / "帮你发布好了.bat"
    if bat_path.is_file():
        bat = bat_path.read_text(encoding="utf-8")
        if "findstr" not in bat or "CACHE_VER" not in bat:
            bad.append("帮你发布好了.bat(须自动读 CACHE_VER)")
    if bad:
        fail(f"作者链接未同步 v={ver}: {bad} → 运行 同步作者链接.bat")
        return False
    ok(f"作者链接文案已含 ?v={ver}")
    return True


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


def get_cache_ver() -> str | None:
    share = (ROOT / "js" / "share-wechat.js").read_text(encoding="utf-8")
    m = re.search(r'CACHE_VER\s*=\s*"(\d+)"', share)
    return m.group(1) if m else None


def check_local_http() -> bool:
    script = ROOT / "scripts" / "start-local-server.py"
    if not script.exists():
        fail("缺少 scripts/start-local-server.py")
        return False
    r = subprocess.run(
        [sys.executable, str(script), "--probe"],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    out = (r.stdout or "") + (r.stderr or "")
    if r.returncode == 0:
        ok("本地 HTTP 8765 可访问 index.html")
        return True
    fail("本地 8765 不可用（先双击 重启本地服务.bat 再 打开本地预览.bat）")
    if out.strip():
        print(out.strip())
    return False


def check_quiz_blank_has_tts() -> bool:
    text = (ROOT / "js" / "data" / "lessons-mvp-depth.js").read_text(encoding="utf-8")
    bad = []
    for m in re.finditer(
        r'question:\s*"((?:\\.|[^"\\])*)"\s*,\s*questionTts:\s*"((?:\\.|[^"\\])*)"',
        text,
    ):
        q = m.group(1).replace('\\"', '"')
        tts = m.group(2).replace('\\"', '"')
        if re.search(r"[＿_]", q) and not tts.strip():
            bad.append(q[:40])
    if bad:
        fail(f"填空测验缺 questionTts {len(bad)} 处")
        return False
    ok("填空测验均配有 questionTts 完整朗读句")
    return True


def check_local_preview_hint() -> bool:
    ver = get_cache_ver()
    bat = ROOT / "打开本地预览.bat"
    if not bat.exists():
        fail("缺少 打开本地预览.bat")
        return False
    text = bat.read_text(encoding="utf-8")
    if ver and ("CACHE_VER" not in text and f"v={ver}" not in text):
        fail("打开本地预览.bat 未同步读取 CACHE_VER（请从 share-wechat.js 取 v）")
        return False
    ok(f"本地预览入口 打开本地预览.bat → localhost:8765/?v={ver or '?'}")
    return True


def tts_required_missing() -> tuple[int, int]:
    try:
        sys.path.insert(0, str(ROOT / "scripts"))
        from tts_lib import collect_requirements, list_mp3_keys

        req = collect_requirements()
        mp3 = list_mp3_keys()
        missing = len(set(req.keys()) - mp3)
        return len(req), missing
    except Exception:
        return -1, -1


def run_audit_tts_registry() -> bool:
    r = subprocess.run(
        [
            sys.executable,
            str(ROOT / "scripts" / "audit-tts-registry.py"),
            "--write",
        ],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    out = (r.stdout or "") + (r.stderr or "")
    if r.returncode != 0:
        sys.stdout.buffer.write(out.encode("utf-8", errors="replace")[-3000:])
        fail("语音包编号对账未通过 — 运行 生成语音包.bat 后重跑 audit-tts-registry.py")
        return False
    if "[FAIL]" in out or "[MISS]" in out:
        sys.stdout.buffer.write(out.encode("utf-8", errors="replace")[-3000:])
        fail("语音包有缺失 MP3（喇叭条数 ≠ 可用语音）")
        return False
    ok("语音包编号对账通过（docs/tts-registry.json 已更新）")
    return True


def get_product_version() -> str:
    import json

    p = ROOT / "docs" / "version-history.json"
    if not p.exists():
        return "?"
    try:
        data = json.loads(p.read_text(encoding="utf-8"))
        return data.get("current", {}).get("product", "?")
    except Exception:
        return "?"


def print_delivery_block(passed: bool) -> None:
    ver = get_cache_ver() or "?"
    product = get_product_version()
    required, missing = tts_required_missing()
    tts_line = (
        f"需朗读 {required} 条 · 缺失 {missing}"
        if required >= 0
        else "（对账见上方输出）"
    )
    status = "通过" if passed else "未通过"
    print("\n--- 交付反馈块（可复制到回复用户）---\n")
    print("## 交付前自检\n")
    print("| 项 | 结果 |")
    print("|----|------|")
    print(f"| 发布前自检.bat | {status} |")
    print(f"| 语音对账 | {tts_line} |")
    print(f"| 产品版本 | {product} |")
    print(f"| 缓存版本 | v={ver} |")
    print("| 文递自归基线 | 见上方 [OK]/[FAIL] |")
    print("| 本地 HTTP | 见上方 [OK]/[FAIL] |")
    print("| 本地冒烟 | Agent 改 UI/会話/语音后须自测 |")
    print("\n## 链接\n")
    print(f"- 本地：http://localhost:8765/index.html?v={ver}")
    print(f"- 公网：https://saivenwang-byte.github.io/XiaoWangXueRiyu/index.html?v={ver}")
    print("- 本地打开：双击 `打开本地预览.bat`")
    print("\n（详见 docs/Agent交付前工作流.md）\n")


def main() -> int:
    print("=== 发布前自检 ===\n")
    print("工作流：docs/Agent交付前工作流.md\n")
    checks = [
        check_wendi_baseline_sync(),
        check_cache_ver_sync(),
        check_author_link_hints(),
        check_vocab_meaning_zh(),
        check_depth_zh(),
        check_quiz_blank_has_tts(),
        run_audit_ja_text(),
        run_audit_tts_registry(),
        check_local_preview_hint(),
        check_local_http(),
    ]
    print()
    passed = all(checks)
    if passed:
        print("=== 全部通过，可以 push / 发链接 ===")
    else:
        print("=== 未通过，请先修复再发布（禁止口头交付） ===")
    print_delivery_block(passed)
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
