# Detiene servidores Next.js en puertos 3000-3002
$ErrorActionPreference = "SilentlyContinue"

foreach ($port in 3000, 3001, 3002) {
  $conns = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
  foreach ($c in $conns) {
    if ($c.OwningProcess -gt 0) {
      Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
    }
  }
}

Write-Host "Puertos 3000-3002 liberados."
