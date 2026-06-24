@echo off
REM ── Publish Sitelytc to GitHub ── double-click to push to your repo.
cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
  echo.
  echo Git is not installed. Get it from https://git-scm.com/download/win
  echo then double-click this file again.
  echo.
  pause
  exit /b 1
)

REM Start clean — remove any partial/broken repo metadata.
if exist ".git" (
  echo Removing previous .git folder ...
  rmdir /s /q ".git"
)

echo Initializing repository ...
git init -b main
git add -A
git -c user.email=smayankthakur25@gmail.com -c user.name=Mayank commit -m "Initial commit - Sitelytc.com v2.0"
git remote add origin https://github.com/smayankthakur/Sitelytc-v2.git

echo.
echo ============================================================
echo   Pushing to https://github.com/smayankthakur/Sitelytc-v2
echo   You'll be asked to sign in to GitHub the first time.
echo ============================================================
echo.
git push -u origin main

if errorlevel 1 (
  echo.
  echo Push failed. If it says "non-fast-forward", the GitHub repo already
  echo has commits ^(e.g. a README^). To overwrite with this code, run:
  echo     git push -u origin main --force
  echo.
)
pause
