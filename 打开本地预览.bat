@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 情景日语 - 本地预览

echo.
echo  正在启动本地服务（端口 8765）...
echo  浏览器将自动打开；Cursor 里请用此地址预览：
echo  http://localhost:8765/index.html
echo.
echo  不要直接双击 index.html（会导致列表空白）
echo.

start "日语学习-本地服务" /min cmd /c "cd /d "%~dp0" && python -m http.server 8765"
timeout /t 2 /nobreak >nul
start "" "http://localhost:8765/index.html"
