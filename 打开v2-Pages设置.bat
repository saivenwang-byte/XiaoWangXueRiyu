@echo off
chcp 65001 >nul
cd /d "%~dp0"
title v2 公网开通（修复 404）

echo.
echo  ==========================================
echo    v2 公网 404 修复（必做 1 次）
echo  ==========================================
echo.
echo  【原因】
echo    代码已在 GitHub（Actions 推 gh-pages 已成功）
echo    但 Pages 未绑定分支 → 公网显示「没有 GitHub Pages 网站」
echo.
echo  【Deployments 里红色 X】
echo    多为旧流程 configure-pages，请忽略
echo    或你把 Source 设成了 GitHub Actions（请改掉）
echo.
echo  【请严格按下面选】
echo    Source:  Deploy from a branch
echo            ^^^ 不要选 GitHub Actions ^^^
echo    Branch:  gh-pages   （推荐，与自动部署一致）
echo            或 main
echo    Folder:  / (root)
echo    点 Save，等 1～3 分钟
echo.
echo  学员链接：
echo  https://saivenwang-byte.github.io/XiaoWangXueRiyu-v2/index.html?v=314
echo.

start "" "https://github.com/saivenwang-byte/XiaoWangXueRiyu-v2/settings/pages"
echo  设置 Save 后按任意键打开公网链接...
pause >nul
start "" "https://saivenwang-byte.github.io/XiaoWangXueRiyu-v2/index.html?v=314"
pause
