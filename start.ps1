# Quick Start Script for NDcomps10 Website

Write-Host "🎬 NDcomps10 Website - Quick Start" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor Yellow
Write-Host ""

# Check if .env.local exists
if (-Not (Test-Path ".env.local")) {
    Write-Host "⚠️  .env.local not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Creating .env.local from example..." -ForegroundColor Cyan
    
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env.local"
        Write-Host "✅ .env.local created!" -ForegroundColor Green
        Write-Host ""
        Write-Host "⚠️  IMPORTANT: Please edit .env.local and add your YouTube API Key!" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Steps to get API Key:" -ForegroundColor Cyan
        Write-Host "1. Go to https://console.cloud.google.com/" -ForegroundColor White
        Write-Host "2. Create new project or select existing" -ForegroundColor White
        Write-Host "3. Enable YouTube Data API v3" -ForegroundColor White
        Write-Host "4. Create Credentials (API Key)" -ForegroundColor White
        Write-Host "5. Copy the API Key to .env.local" -ForegroundColor White
        Write-Host ""
        
        $response = Read-Host "Press Enter when you've added your API Key (or type 'skip' to continue)"
        if ($response -eq 'skip') {
            Write-Host "⚠️  Skipping API key setup. Remember to add it later!" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ .env.example not found!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "📦 Checking dependencies..." -ForegroundColor Cyan

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Cyan
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Dependencies already installed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Your website will be available at:" -ForegroundColor Yellow
Write-Host "👉 http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

npm run dev
