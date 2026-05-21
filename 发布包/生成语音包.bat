@echo off
chcp 65001 >nul
cd /d "%~dp0\.."
title 生成离线日语语音包（拷 U 盘用）

echo.
echo  ========================================
echo   为本文件夹生成 tts-cache 日语 MP3
echo   生成后整包「发布包」拷到别的电脑即可播お手本
echo  ========================================
echo.

python --version >nul 2>&1
if errorlevel 1 (
  echo 未找到 Python，请先安装 Python 3 并勾选 Add to PATH
  pause
  exit /b 1
)

echo [1/2] 安装 edge-tts（仅首次需要联网）...
pip install edge-tts -q
if errorlevel 1 (
  echo pip 安装失败，请检查网络
  pause
  exit /b 1
)

echo [2/2] 正在生成 MP3（约 3～10 分钟，请保持联网）...
python "scripts\build-tts-cache.py"
if errorlevel 1 (
  echo 生成失败
  pause
  exit /b 1
)

echo.
echo 完成！请把整个「发布包」文件夹（含 tts-cache）拷到 U 盘。
echo 另一台电脑用「跟读录音-请用这个.bat」打开即可。
echo.
pause
