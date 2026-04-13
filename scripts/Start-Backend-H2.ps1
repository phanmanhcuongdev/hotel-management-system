[CmdletBinding()]
param(
    [string]$AdminUsername = "admin",
    [string]$AdminPassword = "123456"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$backendPath = Join-Path $projectRoot "backend"

if (-not (Test-Path $backendPath)) {
    throw "Backend directory not found: $backendPath"
}

Push-Location $backendPath
try {
    $env:SPRING_PROFILES_ACTIVE = "dev"
    $env:APP_DEV_SEED_ADMIN_USERNAME = $AdminUsername
    $env:APP_DEV_SEED_ADMIN_PASSWORD = $AdminPassword

    Write-Host "Starting backend with Spring profile 'dev' and H2 database..." -ForegroundColor Cyan
    Write-Host "Dev seed admin username: $AdminUsername" -ForegroundColor Cyan

    & .\mvnw spring-boot:run
}
finally {
    Pop-Location
}
