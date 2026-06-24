@echo off
cd /d "%~dp0"
echo Force-pushing to GitHub (overwrite)...
git push -u origin main --force
echo.
echo === exit code: %errorlevel% ===
pause
