@echo off
chcp 65001 > nul
title JP AQUANA Web Portal - Port 1985
color 0B

echo ==============================================================================
echo    JP AQUANA Banja Luka - Next.js Web Portal (Port 1985)
echo    Gradski olimpijski bazen (GOB) ^& Vodeni park Aquana
echo ==============================================================================
echo.

cd /d "%~dp0"

echo [1/2] Provjera produkcijskog build-a...
if not exist ".next\BUILD_ID" (
    echo [.next produkcijski build ne postoji ili je neispravan] Pokrecem kompajliranje...
    call npm run build
)

echo.
echo [2/2] Pokrecem Next.js server na portu 1985...
echo Lokalna adresa: http://localhost:1985
echo Mrezna adresa:  http://0.0.0.0:1985
echo.

npm run start

if %errorlevel% neq 0 (
    echo.
    echo [UPOZORENJE] Server je zaustavljen ili je doslo do greske.
    pause
)
