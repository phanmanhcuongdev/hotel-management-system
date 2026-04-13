[CmdletBinding()]
param(
    [string]$AdminUsername = "admin",
    [string]$AdminPassword = "123456",
    [string]$ApiBaseUrl = "/api",
    [string]$ApiProxyTarget = "http://127.0.0.1:8080"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$backendScript = Join-Path $PSScriptRoot "Start-Backend-H2.ps1"
$frontendScript = Join-Path $PSScriptRoot "Start-Frontend-Dev.ps1"

if (-not (Test-Path $backendScript)) {
    throw "Backend start script not found: $backendScript"
}

if (-not (Test-Path $frontendScript)) {
    throw "Frontend start script not found: $frontendScript"
}

$backendCommand = "& '$backendScript' -AdminUsername '$AdminUsername' -AdminPassword '$AdminPassword'"
$frontendCommand = "& '$frontendScript' -ApiBaseUrl '$ApiBaseUrl' -ApiProxyTarget '$ApiProxyTarget'"

Write-Host "Opening backend and frontend in separate PowerShell windows..." -ForegroundColor Cyan

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCommand -WorkingDirectory $projectRoot
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCommand -WorkingDirectory $projectRoot
