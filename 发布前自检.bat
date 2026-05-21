@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  ========================================
echo    发布前自检（语音包 + 中文灰字 + 版本）
echo  ========================================
echo.
python scripts\pre-ship-check.py
set ERR=%ERRORLEVEL%
echo.
if %ERR% neq 0 (
  echo [未通过] 请按上方提示修复后再发布
  pause
  exit /b %ERR%
)
echo [通过] 可 git push 并分享 ?v= 链接
pause
exit /b 0
