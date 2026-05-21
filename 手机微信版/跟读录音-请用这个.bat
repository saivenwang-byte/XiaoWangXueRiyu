@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 标日闯关 · 跟读录音（推荐）

echo.
echo  正在启动本地服务（跟读/录音必须用这种方式打开）
echo.

start "标日本地服务" /min cmd /c "cd /d "%~dp0" && python -m http.server 8766 --bind 127.0.0.1"

timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8766/index.html?v=45"

echo  浏览器应已打开。若未打开，请复制：
echo  http://127.0.0.1:8766/index.html?v=44
echo.
pause
