#!/usr/bin/env python3
"""Install 3.0学员 skill pack into ~/.cursor/skills/ (Cursor Agent Skills)."""
from __future__ import annotations

import re
import shutil
from pathlib import Path

SRC_ROOT = Path(r"D:\【软件】\Skill\skills for 3.0学员\skills for 3.0学员")
DEST_ROOT = Path.home() / ".cursor" / "skills"
PROJECT_SKILLS = Path(__file__).resolve().parents[1] / ".cursor" / "skills"

DESIGN_SLUGS = {
    "advanced-xhs-visual-design",
    "brand-voice-system",
    "yizhou-ppt",
    "editable-pptx-builder",
    "hook-angle-lab",
    "course-design-agent",
}

SLUG_RE = re.compile(r"（([^）]+)）\s*$")


def slug_from_dir(name: str) -> str:
    m = SLUG_RE.search(name)
    if m:
        return m.group(1).strip()
    safe = re.sub(r"[^\w\-]+", "-", name, flags=re.UNICODE).strip("-").lower()
    return safe or "unnamed-skill"


def main() -> int:
    if not SRC_ROOT.is_dir():
        print(f"[FAIL] source not found: {SRC_ROOT}")
        return 1

    DEST_ROOT.mkdir(parents=True, exist_ok=True)
    PROJECT_SKILLS.mkdir(parents=True, exist_ok=True)

    installed: list[str] = []
    skipped: list[str] = []

    for skill_md in sorted(SRC_ROOT.rglob("SKILL.md")):
        src_dir = skill_md.parent
        slug = slug_from_dir(src_dir.name)
        dest = DEST_ROOT / slug
        if dest.exists():
            shutil.rmtree(dest)
        shutil.copytree(src_dir, dest)
        installed.append(slug)

        if slug in DESIGN_SLUGS:
            proj_dest = PROJECT_SKILLS / slug
            if proj_dest.exists():
                shutil.rmtree(proj_dest)
            shutil.copytree(src_dir, proj_dest)

    index_src = SRC_ROOT / "INDEX.md"
    if index_src.is_file():
        shutil.copy2(index_src, DEST_ROOT / "yizhou-3.0-skills-INDEX.md")

    manifest = DEST_ROOT / "yizhou-3.0-installed.txt"
    manifest.write_text(
        "\n".join(
            [
                f"source: {SRC_ROOT}",
                f"count: {len(installed)}",
                "",
                *installed,
            ]
        ),
        encoding="utf-8",
    )

    print(f"[OK] installed {len(installed)} skills -> {DEST_ROOT}")
    print(f"[OK] design skills also in project: {', '.join(sorted(DESIGN_SLUGS & set(installed)))}")
    if skipped:
        print(f"[WARN] skipped: {skipped}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
