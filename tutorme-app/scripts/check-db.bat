@echo off
chcp 65001 >nul

REM TutorMe Database Diagnostic Script for Windows
REM Usage: scripts\check-db.bat

echo ╔════════════════════════════════════════════════════════╗
echo ║         TutorMe Database Diagnostic Tool               ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if Docker is running
echo ▶ Checking Docker Desktop...
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Desktop is not running!
    echo    Please start Docker Desktop first.
    echo    Download: https://www.docker.com/products/docker-desktop
    exit /b 1
)
echo ✅ Docker is running
echo.

REM Check PostgreSQL container
echo ▶ Checking PostgreSQL database...
docker ps | findstr "tutorme-db" >nul
if errorlevel 1 (
    docker ps -a | findstr "tutorme-db" >nul
    if errorlevel 1 (
        echo ⚠️  PostgreSQL container not found
        echo    Creating new container...
        docker run -d --name tutorme-db ^
          -e POSTGRES_USER=tutorme ^
          -e POSTGRES_PASSWORD=tutorme_password ^
          -e POSTGRES_DB=tutorme ^
          -p 5432:5432 ^
          postgres:16-alpine
        timeout /t 5 /nobreak >nul
        echo ✅ PostgreSQL container created and started
    ) else (
        echo ⚠️  PostgreSQL container exists but is stopped
        echo    Starting it now...
        docker start tutorme-db
        timeout /t 3 /nobreak >nul
        echo ✅ PostgreSQL container started
    )
) else (
    echo ✅ PostgreSQL container is running
)
echo.

REM Check Redis container
echo ▶ Checking Redis cache...
docker ps | findstr "tutorme-redis" >nul
if errorlevel 1 (
    docker ps -a | findstr "tutorme-redis" >nul
    if errorlevel 1 (
        echo ⚠️  Redis container not found
        echo    Creating new container...
        docker run -d --name tutorme-redis ^
          -p 6379:6379 ^
          redis:7-alpine
        echo ✅ Redis container created and started
    ) else (
        echo ⚠️  Redis container exists but is stopped
        echo    Starting it now...
        docker start tutorme-redis
        echo ✅ Redis container started
    )
) else (
    echo ✅ Redis container is running
)
echo.

REM Test PostgreSQL connection
echo ▶ Testing database connection...
docker exec tutorme-db psql -U tutorme -d tutorme -c "SELECT 1;" >nul 2>&1
if errorlevel 1 (
    echo ❌ Cannot connect to database
    echo    Waiting 5 seconds and retrying...
    timeout /t 5 /nobreak >nul
    docker exec tutorme-db psql -U tutorme -d tutorme -c "SELECT 1;" >nul 2>&1
    if errorlevel 1 (
        echo ❌ Database connection failed
        exit /b 1
    )
)
echo ✅ Database connection successful
echo.

REM Check users
echo ▶ Checking user accounts...
echo    Recent users:
docker exec tutorme-db psql -U tutorme -d tutorme -c "SELECT email, role, createdAt FROM User ORDER BY createdAt DESC LIMIT 5;" 2>nul || echo    (No users found or table doesn't exist)
echo.

REM Summary
echo ╔════════════════════════════════════════════════════════╗
echo ║                      Summary                           ║
echo ╠════════════════════════════════════════════════════════╣
docker ps --format "║  {{.Names}} - {{.Status}}" | findstr "tutorme"
echo ║                                                        ║
echo ║  Database URL: postgresql://tutorme:tutorme_password   ║
echo ║                @localhost:5432/tutorme                 ║
echo ║                                                        ║
echo ║  Prisma Studio: http://localhost:5555                  ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Open Prisma Studio option
set /p openstudio="🚀 Open Prisma Studio now? (y/n): "
if /i "%openstudio%"=="y" (
    echo Opening Prisma Studio...
    npx prisma studio
)
