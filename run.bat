@echo off
REM ── Sitelytc dev launcher ── double-click this file to run the site locally.
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is not installed. Install the LTS version from https://nodejs.org
  echo then double-click this file again.
  echo.
  pause
  exit /b 1
)

if not exist ".env.local" (
  echo Creating .env.local from .env.example ...
  copy /y ".env.example" ".env.local" >nul
)

if not exist "node_modules" (
  echo.
  echo Installing dependencies ^(first run only, this can take a few minutes^)...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed. Scroll up to see the error.
    pause
    exit /b 1
  )
)

echo.
echo ============================================================
echo   Starting Sitelytc at  http://localhost:3001
echo   Leave this window open. Press Ctrl+C to stop.
echo ============================================================
echo.
start "" http://localhost:3001
call npm run dev
pause
