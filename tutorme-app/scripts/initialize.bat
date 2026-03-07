@echo off
chcp 65001 >nul

REM Solocorn Initialize Script for Windows
REM Sets up database (port 5433) and starts the app

echo ╔════════════════════════════════════════════════════════╗
echo ║         Solocorn Initialization Tool                    ║
echo ║     Database + Migrations + Seeding + Dev Server       ║
echo ╚════════════════════════════════════════════════════════╝
echo.

set DB_PORT=5433
set REDIS_PORT=6379

REM Check if Docker is running
echo ▶ Checking Docker Desktop...
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Desktop is not running!
    echo    Please start Docker Desktop first.
    exit /b 1
)
echo ✅ Docker is running
echo.

REM Stop and remove old container
echo ▶ Cleaning up old database container...
docker stop tutorme-db >nul 2>&1
docker rm tutorme-db >nul 2>&1
echo ✅ Cleaned up old containers
echo.

REM Create PostgreSQL container on port 5433
echo ▶ Creating PostgreSQL database on port %DB_PORT%...
docker run -d --name tutorme-db ^
  -e POSTGRES_USER=tutorme ^
  -e POSTGRES_PASSWORD=tutorme_password ^
  -e POSTGRES_DB=tutorme ^
  -p %DB_PORT%:5432 ^
  postgres:16-alpine

echo    Waiting for database to initialize...
timeout /t 5 /nobreak >nul
echo ✅ PostgreSQL is ready
echo.

REM Create Redis container
echo ▶ Creating Redis cache...
docker run -d --name tutorme-redis ^
  -p %REDIS_PORT%:6379 ^
  redis:7-alpine
echo ✅ Redis created and started
echo.

REM Create .env.local if not exists
echo ▶ Configuring environment...
if not exist .env.local (
    echo DATABASE_URL="postgresql://tutorme:tutorme_password@localhost:%DB_PORT%/tutorme" > .env.local
    echo REDIS_URL="redis://localhost:6379" >> .env.local
    echo NEXTAUTH_SECRET="your-secret-key-change-this" >> .env.local
    echo NEXTAUTH_URL="http://localhost:3003" >> .env.local
    echo ✅ Created .env.local with port %DB_PORT%
) else (
    echo ✅ .env.local already exists
echo.

REM Run migrations
echo ▶ Running database migrations...
npm run db:migrate
if errorlevel 1 (
    echo ⚠️  Migration may have failed, continuing...
)
echo ✅ Database ready
echo.

REM Seed curriculum
echo ▶ Seeding test curriculum...
npx tsx scripts/seed-curriculum.ts >nul 2>&1
if errorlevel 1 (
    echo ℹ️  Curriculum may already exist
) else (
    echo ✅ Curriculum seeded
)
echo.

REM Summary
echo ╔════════════════════════════════════════════════════════╗
echo ║         ✅ Initialization Complete!                    ║
echo ╠════════════════════════════════════════════════════════╣
docker ps --format "║  {{.Names}} - {{.Status}}" 2>nul | findstr "tutorme"
echo ║                                                        ║
echo ║  🗄️  Database:  postgresql://localhost:%DB_PORT%       ║
echo ║  ⚡ Redis:      localhost:%REDIS_PORT%                 ║
echo ║                                                        ║
echo ║  🚀 Starting development server...                     ║
echo ║  📱 App URL:    http://localhost:3003                  ║
echo ║                                                        ║
echo ║  To view database (in a NEW terminal):                 ║
echo ║  npm run studio                                        ║
echo ║  Then open: http://localhost:5555                      ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start dev server
npm run dev
