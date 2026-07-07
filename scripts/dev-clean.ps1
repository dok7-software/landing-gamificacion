# Reinicio limpio del servidor de desarrollo (solución al Internal Server Error)
$ErrorActionPreference = "SilentlyContinue"
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

& "$PSScriptRoot\stop-dev.ps1"

if (Test-Path .next) {
  Remove-Item -Recurse -Force .next
  Write-Host "Carpeta .next eliminada."
}

Write-Host ""
Write-Host "Iniciando servidor en http://localhost:3000 ..."
Write-Host ""

npm run dev
