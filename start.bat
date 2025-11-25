@echo off
chcp 65001 >nul
title EvoConnect - Servidor Local
color 0A

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║         EvoConnect - Servidor Local de Teste         ║
echo ╚══════════════════════════════════════════════════════╝
echo.
echo 🚀 Iniciando servidor...
echo.
echo 📱 Acesse no navegador: http://localhost:8000
echo.
echo ⚠️  Pressione Ctrl+C para parar o servidor
echo.
echo ════════════════════════════════════════════════════════
echo.

REM Tenta Python primeiro
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Python encontrado! Iniciando servidor...
    echo.
    python -m http.server 8000
    goto :end
)

REM Tenta Python3
python3 --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Python3 encontrado! Iniciando servidor...
    echo.
    python3 -m http.server 8000
    goto :end
)

REM Tenta Node.js (npx serve)
where npx >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Node.js encontrado! Iniciando servidor...
    echo.
    npx --yes serve -l 8000
    goto :end
)

REM Tenta PHP
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ PHP encontrado! Iniciando servidor...
    echo.
    php -S localhost:8000
    goto :end
)

REM Nenhum servidor encontrado
echo ❌ Nenhum servidor encontrado!
echo.
echo 📦 Instale uma das opções:
echo    • Python: https://www.python.org/downloads/
echo    • Node.js: https://nodejs.org/
echo    • PHP: https://www.php.net/downloads
echo.
echo 💡 Ou abra index.html diretamente no navegador
echo    (alguns recursos podem não funcionar)
echo.
pause
exit /b 1

:end
echo.
echo.
echo ════════════════════════════════════════════════════════
echo 🛑 Servidor parado.
echo.
pause

