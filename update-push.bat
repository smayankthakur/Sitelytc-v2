@echo off
cd /d "%~dp0"
echo Committing and pushing Next.js security patch...
git add -A
git -c user.email=smayankthakur25@gmail.com -c user.name=Mayank commit -m "security: upgrade Next.js 15.1.6 -> 15.5.19 (CVE-2025-66478 patch)"
git push origin main
echo.
echo === exit code: %errorlevel% ===
pause
