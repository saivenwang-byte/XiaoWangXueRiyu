@echo off
chcp 65001 >nul
cd /d "%~dp0"
set PATH=%PATH%;%ProgramFiles%\GitHub CLI\

echo.
echo  === 标日课后巩固 · 发布到 GitHub Pages ===
echo.

gh auth status >nul 2>&1
if errorlevel 1 (
  echo [1/4] 请先登录 GitHub（浏览器会弹出）...
  gh auth login -h github.com -p https -w
  if errorlevel 1 exit /b 1
)

echo [2/4] 创建仓库 biaori-after-class （若已存在会提示，可忽略）...
gh repo create biaori-after-class --public --source=. --remote=origin --description "Biaori lessons 14/16/18 after-class MVP" --push
if errorlevel 1 (
  git remote remove origin 2>nul
  git remote add origin https://github.com/%USERNAME%/biaori-after-class.git 2>nul
  git branch -M main 2>nul
  git push -u origin main
)

echo [3/4] 开启 GitHub Pages...
gh api repos/{owner}/biaori-after-class/pages -X POST -f build_type=workflow -f source[branch]=main -f source[path]=/ 2>nul

echo.
echo [4/4] 获取访问地址...
for /f "delims=" %%i in ('gh repo view --json owner -q .owner.login 2^>nul') do set OWNER=%%i
if "%OWNER%"=="" set OWNER=你的GitHub用户名

echo.
echo  部署完成后（约 1～3 分钟），学习链接为：
echo  https://%OWNER%.github.io/biaori-after-class/index.html
echo  分享页：
echo  https://%OWNER%.github.io/biaori-after-class/share.html
echo.
echo  仓库地址：
gh repo view --web 2>nul
pause
