@echo off
title Grow Simulator MEGA
echo.
echo ========================================
echo   Grow Simulator MEGA
echo   Genetics & Evolution Edition
echo ========================================
echo.
echo Starting game server...
echo.
cd /d "%~dp0"
start "" http://localhost:8080
npx http-server -p 8080 -c-1