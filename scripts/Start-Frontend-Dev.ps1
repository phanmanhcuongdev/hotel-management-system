[CmdletBinding()]
param(
    [string]$ApiBaseUrl = "/api",
    [string]$ApiProxyTarget = "http://127.0.0.1:8080"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$frontendPath = Join-Path $projectRoot "frontend"

if (-not (Test-Path $frontendPath)) {
    throw "Frontend directory not found: $frontendPath"
}

Push-Location $frontendPath
try {
    $env:VITE_API_BASE_URL = $ApiBaseUrl
    $env:VITE_DEV_API_PROXY_TARGET = $ApiProxyTarget
    $env:VITE_ENABLE_REAL_AUTH = "true"
    $env:VITE_ENABLE_MOCK_AUTH = "false"

    $nodeModulesPath = Join-Path $frontendPath "node_modules"
    if (-not (Test-Path $nodeModulesPath)) {
        Write-Host "node_modules not found. Running npm install..." -ForegroundColor Yellow
        & npm install
        if ($LASTEXITCODE -ne 0) {
            throw "npm install failed."
        }
    }

    Write-Host "Starting frontend in Vite dev mode..." -ForegroundColor Cyan
    Write-Host "API base URL: $ApiBaseUrl" -ForegroundColor Cyan
    Write-Host "API proxy target: $ApiProxyTarget" -ForegroundColor Cyan

    & npm run dev
}
finally {
    Pop-Location
}
