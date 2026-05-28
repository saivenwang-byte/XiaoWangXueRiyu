@echo off
chcp 65001 >nul
cd /d "%~dp0"
title v2 公网 Pages 一次开通

echo.
echo  ==========================================
echo    v2 公网开通（本地能开、微信 404 时）
echo  ==========================================
echo.
echo  Gmail 里 #1 失败 = 旧流程，可忽略。
echo  请看 Actions 最新一条是否绿色。
echo.
echo  即将打开 GitHub Pages 设置页，请：
echo    Source: Deploy from a branch
echo    Branch: main  或  gh-pages
echo    Folder: / (root)
echo    点 Save
echo.
echo  开通后学员链接：
echo  https://saivenwang-byte.github.io/XiaoWangXueRiyu-v2/index.html?v=314
echo.

start "" "https://github.com/saivenwang-byte/XiaoWangXueRiyu-v2/settings/pages"
start "" "https://github.com/saivenwang-byte/XiaoWangXueRiyu-v2/actions/workflows/pages.yml"
timeout /t 2 >nul
start "" "https://saivenwang-byte.github.io/XiaoWangXueRiyu-v2/index.html?v=314"

echo  详细说明见：v2-Pages-开通说明.txt
echo.
pause
