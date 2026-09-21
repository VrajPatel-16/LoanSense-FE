@echo off
title LoanSense Frontend Dev Server (Port 5173)
cd /d "%~dp0"
echo Starting LoanSense Frontend Dev Server on http://localhost:5173 ...
npm run dev
pause
