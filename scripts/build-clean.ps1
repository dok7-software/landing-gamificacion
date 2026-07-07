# Build de producción sin conflictos con el servidor de desarrollo
$ErrorActionPreference = "SilentlyContinue"
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

& "$PSScriptRoot\stop-dev.ps1"

if (Test-Path .next) {
  Remove-Item -Recurse -Force .next
  Write-Host "Carpeta .next eliminada antes del build."
}

npm run build
