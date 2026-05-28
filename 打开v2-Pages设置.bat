@echo off
chcp 65001 >nul
cd /d "%~dp0"
title v2 公网开通（勿看 Actions #1）

echo.
echo  ==========================================
echo    重要：Gmail 里 #1 失败可以忽略
echo    那是旧的 configure-pages，不是现在的问题
echo  ==========================================
echo.
echo  公网 404 的原因：v2 仓库还没在 GitHub 点「开通 Pages」
echo  代码已在 main 分支，只差下面这一步 Save。
echo.
echo  即将打开设置页，请严格按下面选：
echo.
echo    Source:  Deploy from a branch
echo            （不要选 GitHub Actions！）
echo    Branch:  main
echo    Folder:  / (root)
echo    然后点 Save
echo.
echo  Save 后等 1～3 分钟，再开学员链接：
echo  https://saivenwang-byte.github.io/XiaoWangXueRiyu-v2/index.html?v=314
echo.

start "" "https://github.com/saivenwang-byte/XiaoWangXueRiyu-v2/settings/pages"

echo  按任意键后再打开公网链接试一次...
pause >nul
start "" "https://saivenwang-byte.github.io/XiaoWangXueRiyu-v2/index.html?v=314"
echo.
pause
