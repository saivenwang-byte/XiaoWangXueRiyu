@echo off

chcp 65001 >nul

cd /d "%~dp0"

title 日语初级课后练习 - 本地预览



echo.

echo  正在启动本地服务（端口 8766）...

echo  浏览器将打开：http://localhost:8766/index.html

echo.



start "本地服务" /min cmd /c "cd /d "%~dp0" && python -m http.server 8766"

timeout /t 2 /nobreak >nul

start "" "http://127.0.0.1:8766/index.html?v=45"

