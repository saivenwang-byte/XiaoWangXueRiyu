@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  ========================================
echo    标日自学 - 手机可打开的本地服务
echo  ========================================
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
  for /f "tokens=1" %%b in ("%%a") do echo   手机 Safari 打开: http://%%b:8765
)
echo.
echo   学习主页:  /index.html
echo   分享页面:  /share.html  （复制链接或二维码发微信）
echo.
echo   按 Ctrl+C 停止服务
echo  ========================================
echo.
for /f "usebackq tokens=3 delims=^"" %%v in (`findstr /C:"CACHE_VER" "js\share-wechat.js"`) do set "VER=%%~v"
if not defined VER set "VER=39"
start "" "http://localhost:8765/index.html?v=%VER%"
python -m http.server 8765
if errorlevel 1 (
  echo.
  echo 未检测到 Python。请安装 Python 3 后重试。
  pause
)
