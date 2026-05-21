@echo off
chcp 65001 >nul
cd /d "%~dp0"
start notepad "微信转发说明.txt"
explorer "%~dp0"
