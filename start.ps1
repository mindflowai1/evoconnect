# EvoConnect - Servidor Local (PowerShell)
# Execute: .\start.ps1

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║         EvoConnect - Servidor Local de Teste         ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Iniciando servidor..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Acesse no navegador: http://localhost:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Pressione Ctrl+C para parar o servidor" -ForegroundColor Red
Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""

# Tenta Python
try {
    $python = Get-Command python -ErrorAction SilentlyContinue
    if ($python) {
        Write-Host "✅ Python encontrado! Iniciando servidor..." -ForegroundColor Green
        Write-Host ""
        python -m http.server 8000
        exit
    }
} catch {}

# Tenta Python3
try {
    $python3 = Get-Command python3 -ErrorAction SilentlyContinue
    if ($python3) {
        Write-Host "✅ Python3 encontrado! Iniciando servidor..." -ForegroundColor Green
        Write-Host ""
        python3 -m http.server 8000
        exit
    }
} catch {}

# Tenta Node.js (npx serve)
try {
    $npx = Get-Command npx -ErrorAction SilentlyContinue
    if ($npx) {
        Write-Host "✅ Node.js encontrado! Iniciando servidor..." -ForegroundColor Green
        Write-Host ""
        npx --yes serve -l 8000
        exit
    }
} catch {}

# Tenta PHP
try {
    $php = Get-Command php -ErrorAction SilentlyContinue
    if ($php) {
        Write-Host "✅ PHP encontrado! Iniciando servidor..." -ForegroundColor Green
        Write-Host ""
        php -S localhost:8000
        exit
    }
} catch {}

# Nenhum servidor encontrado
Write-Host "❌ Nenhum servidor encontrado!" -ForegroundColor Red
Write-Host ""
Write-Host "📦 Instale uma das opções:" -ForegroundColor Yellow
Write-Host "   • Python: https://www.python.org/downloads/" -ForegroundColor White
Write-Host "   • Node.js: https://nodejs.org/" -ForegroundColor White
Write-Host "   • PHP: https://www.php.net/downloads" -ForegroundColor White
Write-Host ""
Write-Host "💡 Ou abra index.html diretamente no navegador" -ForegroundColor Cyan
Write-Host "   (alguns recursos podem não funcionar)" -ForegroundColor Gray
Write-Host ""
Read-Host "Pressione Enter para sair"

