# -*- coding: utf-8 -*-
"""启动或探测本地预览服务（默认 8765）。供 bat / pre-ship-check 调用。"""
from __future__ import annotations

import argparse
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PORT = 8765


def http_ok(port: int = PORT, timeout: float = 4.0) -> bool:
    url = f"http://127.0.0.1:{port}/index.html"
    try:
        with urllib.request.urlopen(url, timeout=timeout) as r:
            body = r.read()
            return r.status == 200 and len(body) > 200
    except (urllib.error.URLError, OSError, TimeoutError):
        return False


def port_listening(port: int = PORT) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(1)
        return s.connect_ex(("127.0.0.1", port)) == 0


def start_server(port: int = PORT) -> None:
    if sys.platform == "win32":
        subprocess.Popen(
            [
                "cmd",
                "/c",
                "start",
                "日语学习-本地服务",
                "/min",
                "python",
                "-m",
                "http.server",
                str(port),
            ],
            cwd=str(ROOT),
            creationflags=subprocess.CREATE_NEW_CONSOLE,
        )
    else:
        subprocess.Popen(
            [sys.executable, "-m", "http.server", str(port)],
            cwd=str(ROOT),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--probe", action="store_true", help="仅探测，不启动")
    ap.add_argument("--start", action="store_true", help="若不可用则启动")
    ap.add_argument("--port", type=int, default=PORT)
    args = ap.parse_args()

    if http_ok(args.port):
        print(f"[OK] http://127.0.0.1:{args.port}/index.html")
        return 0

    if args.probe:
        if port_listening(args.port):
            print(f"[WARN] 端口 {args.port} 在监听但 HTTP 无响应（僵尸进程？请运行 重启本地服务.bat）")
        else:
            print(f"[WARN] 端口 {args.port} 未启动（请双击 打开本地预览.bat）")
        return 1

    if args.start:
        start_server(args.port)
        for _ in range(12):
            time.sleep(0.5)
            if http_ok(args.port):
                print(f"[OK] 已启动 http://127.0.0.1:{args.port}/index.html")
                return 0
        print(f"[FAIL] 启动后仍无法访问 :{args.port}")
        return 1

    ap.print_help()
    return 2


if __name__ == "__main__":
    sys.exit(main())
