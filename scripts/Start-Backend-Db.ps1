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
    [string]$ServerPort = "8080"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$backendPath = Join-Path $projectRoot "backend"

if (-not (Test-Path $backendPath)) {
    throw "Backend directory not found: $backendPath"
}

Push-Location $backendPath
try {
    Remove-Item Env:\SPRING_PROFILES_ACTIVE -ErrorAction SilentlyContinue
    Remove-Item Env:\APP_DEV_SEED_ADMIN_USERNAME -ErrorAction SilentlyContinue
    Remove-Item Env:\APP_DEV_SEED_ADMIN_PASSWORD -ErrorAction SilentlyContinue

    $env:DB_URL = $DbUrl
    $env:DB_USERNAME = $DbUsername
    $env:DB_PASSWORD = $DbPassword
    $env:JWT_SECRET = $JwtSecret
    $env:JWT_EXPIRATION_MS = $JwtExpirationMs
    $env:SERVER_PORT = $ServerPort

    Write-Host "Starting backend with external database..." -ForegroundColor Cyan
    Write-Host "DB_URL: $DbUrl" -ForegroundColor Cyan
    Write-Host "DB_USERNAME: $DbUsername" -ForegroundColor Cyan
    Write-Host "SERVER_PORT: $ServerPort" -ForegroundColor Cyan

    & .\mvnw spring-boot:run
}
finally {
    Pop-Location
}
