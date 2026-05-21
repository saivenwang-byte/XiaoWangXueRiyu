@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  即将打开 Netlify 拖拽部署页面
echo.
echo  请把整个文件夹拖进网页虚线框：
echo  %~dp0
echo.
echo  部署完成后，把得到的 https 链接发到微信即可。
echo  详细说明见：Netlify部署指南.txt
echo.
start "" "https://app.netlify.com/drop"
timeout /t 2 >nul
start "" notepad "%~dp0Netlify部署指南.txt"
