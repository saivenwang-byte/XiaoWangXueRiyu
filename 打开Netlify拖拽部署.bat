@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  即将打开 Netlify 拖拽部署页面
echo.
echo  请把整个文件夹拖进网页虚线框：
echo  %~dp0
echo.
echo  站点名建议设为：qingjing-biaori
echo  正式链接：https://qingjing-biaori.netlify.app/index.html?v=28
echo  部署后用手机 4G（关 WiFi）验收，再发微信。
echo  详细说明见：Netlify部署指南.txt
echo.
start "" "https://app.netlify.com/drop"
timeout /t 2 >nul
start "" notepad "%~dp0Netlify部署指南.txt"
