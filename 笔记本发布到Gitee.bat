@echo off

setlocal EnableDelayedExpansion

chcp 65001 >nul

cd /d "%~dp0"

title 笔记本发布到 Gitee（国内网络推荐）



set "REPO=XiaoWangXueRiyu"



echo.

echo  ==========================================

echo    发布到 Gitee（本机可连 gitee.com，不用手机 App）

echo  ==========================================

echo.



echo [1/5] 检测 gitee.com ...

powershell -NoProfile -Command "try{$t=New-Object Net.Sockets.TcpClient;$t.Connect('gitee.com',443);if($t.Connected){$t.Close();'   Gitee 可连接。'}else{'   失败'}}catch{'   失败'}"



echo.

echo [2/5] 请先在笔记本浏览器完成（一次性）：

echo   · 打开 https://gitee.com  注册/登录

echo   · 新建仓库，名字建议：%REPO%  （公开）

echo   · 不要勾选「使用 README 初始化」（避免和本地冲突）

echo.

set /p GITEE_USER=请输入你的 Gitee 用户名（网址里 @ 后面那段）:

if "!GITEE_USER!"=="" (

  echo 未输入用户名，已取消。

  pause

  exit /b 1

)



set "GITEE_URL=https://gitee.com/!GITEE_USER!/%REPO%.git"

echo.

echo   远程地址：!GITEE_URL!

echo.



git remote remove gitee 2>nul

git remote add gitee "!GITEE_URL!"



echo [3/5] 推送代码到 Gitee ...

echo   （若提示登录：在笔记本浏览器用 Gitee 账号授权，或按提示输入用户名/密码/令牌）

git add -A

git commit -m "update: publish from laptop via Gitee" 2>nul

git push -u gitee main

if errorlevel 1 (

  echo.

  echo   推送失败。常见原因：

  echo   · 仓库还没在 gitee.com 建好

  echo   · 仓库名或用户名输错

  echo   · 需要在 Gitee 设置里添加 SSH/私人令牌

  echo.

  echo   仍可手动：gitee 仓库页 → 上传文件 → 拖入整个「日语学习」文件夹内容

  start "" "https://gitee.com/!GITEE_USER!/%REPO%"

  pause

  exit /b 1

)



echo.

echo [4/5] 开启 Gitee Pages（笔记本浏览器）：

echo   仓库 → 服务 → Gitee Pages → 启动（选 master/main 分支）

echo.

start "" "https://gitee.com/!GITEE_USER!/%REPO%/pages"



echo.

echo [5/5] Pages 启动后，你的新链接一般是：

echo   https://!GITEE_USER!.gitee.io/%REPO%/index.html?v=29

echo.

echo   若改用 Gitee 发给学员，请把上面链接写入：

echo   js\public-url.config.js  里的 HYOUGA_PUBLIC_ORIGIN

echo   然后重新 push 一次（Gitee 或 GitHub）。

echo.

pause

