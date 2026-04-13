[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$DbUrl,

    [Parameter(Mandatory = $true)]
    [string]$DbUsername,

    [Parameter(Mandatory = $true)]
    [string]$DbPassword,

    [string]$JwtSecret = "replace-with-a-long-random-secret-for-local-runtime",
    [string]$JwtExpirationMs = "86400000",
    [string]$ServerPort = "8080",
    [string]$ApiBaseUrl = "/api",
    [string]$ApiProxyTarget = "http://127.0.0.1:8080"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$backendScript = Join-Path $PSScriptRoot "Start-Backend-Db.ps1"
$frontendScript = Join-Path $PSScriptRoot "Start-Frontend-Dev.ps1"

if (-not (Test-Path $backendScript)) {
    throw "Backend start script not found: $backendScript"
}

if (-not (Test-Path $frontendScript)) {
    throw "Frontend start script not found: $frontendScript"
}

$backendCommand = "& '$backendScript' -DbUrl '$DbUrl' -DbUsername '$DbUsername' -DbPassword '$DbPassword' -JwtSecret '$JwtSecret' -JwtExpirationMs '$JwtExpirationMs' -ServerPort '$ServerPort'"
$frontendCommand = "& '$frontendScript' -ApiBaseUrl '$ApiBaseUrl' -ApiProxyTarget '$ApiProxyTarget'"

Write-Host "Opening backend and frontend in separate PowerShell windows..." -ForegroundColor Cyan

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCommand -WorkingDirectory $projectRoot
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCommand -WorkingDirectory $projectRoot
