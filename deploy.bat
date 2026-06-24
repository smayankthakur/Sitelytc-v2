@echo off
cd /d "%~dp0"
echo Committing and pushing security patch...
git add -A
git -c user.email=smayankthakur25@gmail.com -c user.name=Mayank commit -m "security: upgrade next-mdx-remote 5.0.0 -> 6.0.0 (advisory)"
git push origin main
echo.
echo === exit code: %errorlevel% ===
pause
