@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 标日课后巩固 · 一键搞定

set "PUB=https://saivenwang-byte.github.io/XiaoWangXueRiyu/index.html?v=27"
set "LAN="
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do set "LAN=%%a"
set LAN=%LAN: =%
set "WIFI=http://%LAN%:8765/index.html?v=27"

echo.
echo  ============================================
echo    标日课后巩固 · 一键启动（build 27）
echo  ============================================
echo.
echo  [1] 笔记本浏览器（仅本机）
echo       http://localhost:8765/index.html?v=27
echo.
echo  [2] 手机微信 / 手机浏览器（同一 WiFi，不要用 localhost）
echo       %WIFI%
echo.
echo  [3] 发给任何人（公网 HTTPS，推荐复制这条到微信）
echo       %PUB%
echo.

netstat -an | findstr ":8765.*LISTENING" >nul
if errorlevel 1 (
  echo  正在启动本地服务 8765 ...
  start "日语学习-8765" /min cmd /c "cd /d "%~dp0" && python -m http.server 8765"
  timeout /t 2 /nobreak >nul
) else (
  echo  本地服务已在运行。
)

echo  尝试放行防火墙端口 8765（需管理员时可能跳过）...
netsh advfirewall firewall show rule name="日语学习本地8765" >nul 2>&1
if errorlevel 1 (
  netsh advfirewall firewall add rule name="日语学习本地8765" dir=in action=allow protocol=TCP localport=8765 >nul 2>&1
)

echo.
echo  正在打开：本机学习页 + 分享页 ...
start "" "http://localhost:8765/index.html?v=27"
timeout /t 1 /nobreak >nul
start "" "http://localhost:8765/share.html"

echo.
echo  公网链接已尝试写入剪贴板（可 Ctrl+V 发到手机微信）：
echo  %PUB%
echo %PUB%| clip

echo.
echo  若手机 WiFi 链接仍打不开：直接用手机 4G 打开上面 [3] 公网链接。
echo  若微信打不开 github：双击「打开Netlify拖拽部署.bat」部署后改 public-url.config.js
echo.
pause
