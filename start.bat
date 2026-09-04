@echo off
setlocal enabledelayedexpansion

echo ======================================================================
echo    KEYVAULT // Password Security Analyzer Launcher
echo ======================================================================
echo.

:: Add Node.js to PATH if installed in standard Program Files
if exist "C:\Program Files\nodejs" (
    set "PATH=C:\Program Files\nodejs;!PATH!"
)

:: Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not found in PATH! Please install Python 3.9+.
    pause
    exit /b 1
)

:: Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found in PATH! Please install Node.js 18+.
    pause
    exit /b 1
)

echo [*] Setting up Python Virtual Environment...
if not exist "backend\.venv" (
    python -m venv backend\.venv
)

call backend\.venv\Scripts\activate.bat
echo [*] Installing / Updating Python dependencies...
pip install -r backend\requirements.txt --quiet

echo [*] Checking Frontend dependencies...
cd frontend
if not exist "node_modules" (
    echo [*] Installing NPM packages (this may take a minute)...
    call npm install --quiet
)
cd ..

echo.
echo ======================================================================
echo    Starting FastAPI Backend (Port 8000) & Vite Frontend (Port 3000)
echo ======================================================================
echo.

:: Launch Backend in background
start "KeyVault Backend (FastAPI)" cmd /k "cd /d %~dp0\backend && call .venv\Scripts\activate.bat && uvicorn app:app --port 8000 --reload"

:: Launch Frontend
start "KeyVault Frontend (Vite)" cmd /k "cd /d %~dp0\frontend && npm run dev"

timeout /t 3 >nul
start http://localhost:3000

echo Application is online! Keep terminal windows open while testing.
echo Press any key to exit this launcher window...
pause >nul
