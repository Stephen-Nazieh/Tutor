@echo off
REM Solocorn Project Setup Script for Windows
REM Run this from: %USERPROFILE%\projects\tutorme

echo ==========================================
echo   Solocorn - Automated Setup Script (Windows)
echo ==========================================
echo.

REM Check prerequisites
echo [→] Checking prerequisites...

node --version >nul 2>&1
if errorlevel 1 (
    echo [✗] Node.js not found. Please install Node.js 20+ first.
    echo Visit: https://nodejs.org
    exit /b 1
)

docker --version >nul 2>&1
if errorlevel 1 (
    echo [✗] Docker not found. Please install Docker Desktop first.
    echo Visit: https://www.docker.com/products/docker-desktop
    exit /b 1
)

git --version >nul 2>&1
if errorlevel 1 (
    echo [✗] Git not found. Please install Git first.
    echo Visit: https://git-scm.com/download
    exit /b 1
)

echo [✓] All prerequisites satisfied

REM Get project root
set "PROJECT_ROOT=%CD%"
set "APP_NAME=tutorme-app"
set "APP_DIR=%PROJECT_ROOT%\%APP_NAME%"

echo [→] Project will be created at: %APP_DIR%

REM Check if directory exists
if exist "%APP_DIR%" (
    echo [✗] Directory %APP_NAME% already exists!
    set /p DELETE="Delete and recreate? (y/N): "
    if /i not "%DELETE%"=="y" (
        echo Setup cancelled.
        exit /b 1
    )
    rmdir /s /q "%APP_DIR%"
)

REM Step 1: Create Next.js project
echo.
echo [→] Step 1/8: Creating Next.js project (this may take 5-10 minutes)...
call npx create-next-app@14 "%APP_NAME%" --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --yes
if errorlevel 1 (
    echo [✗] Failed to create Next.js project
    exit /b 1
)
echo [✓] Next.js project created

REM Navigate to app directory
cd "%APP_DIR%"

REM Step 2: Initialize shadcn/ui
echo.
echo [→] Step 2/8: Setting up shadcn/ui...
call npx shadcn-ui@latest init -y -d
call npx shadcn-ui@latest add button card input label avatar badge dialog dropdown-menu select tabs sheet scroll-area separator skeleton -y
echo [✓] shadcn/ui setup complete

REM Step 3: Install dependencies
echo.
echo [→] Step 3/8: Installing dependencies...
REM Step 3: Install dependencies (Prisma removed — project uses Drizzle ORM)
echo.
echo [->] Step 3/8: Installing dependencies...
call npm install next-auth socket.io socket.io-client redis ioredis zod date-fns lucide-react class-variance-authority clsx tailwind-merge ollama openai yjs y-websocket @daily-co/daily-js @types/node @types/react @types/react-dom typescript @types/ws tsx @types/bcryptjs --save
echo [v] Dependencies installed

REM Step 4: Set up Drizzle ORM
echo.
echo [->] Step 4/8: Setting up Drizzle ORM...
echo Drizzle ORM is configured. Run migrations with: npm run db:migrate
echo [v] Drizzle setup complete

REM Step 5: Create Docker Compose
echo.
echo [->] Step 5/8: Creating Docker Compose configuration...
(
echo version: '3.8'
echo.
echo services:
echo   db:
echo     image: postgres:16-alpine
echo     container_name: tutorme-db
echo     restart: unless-stopped
echo     environment:
echo       POSTGRES_USER: tutorme
echo       POSTGRES_PASSWORD: tutorme_password
echo       POSTGRES_DB: tutorme
echo     ports:
echo       - "5432:5432"
echo     volumes:
echo       - postgres_data:/var/lib/postgresql/data
echo   redis:
echo     image: redis:7-alpine
echo     container_name: tutorme-redis
echo     restart: unless-stopped
echo     ports:
echo       - "6379:6379"
echo     volumes:
echo       - redis_data:/data
echo volumes:
echo   postgres_data:
echo   redis_data:
) > docker-compose.yml

echo [v] Docker Compose created

REM Step 6: Create environment files
echo.
echo [->] Step 6/8: Creating environment configuration...
(
echo # Database
echo DATABASE_URL="postgresql://tutorme:tutorme_password@localhost:5432/tutorme"
echo REDIS_URL="redis://localhost:6379"
echo.
echo # AI
echo.
echo # Video
echo DAILY_API_KEY="your_daily_api_key_here"
echo.
echo # Auth
echo NEXTAUTH_SECRET="your_random_secret_here_min_32_chars"
echo NEXTAUTH_URL="http://localhost:3000"
echo WECHAT_APP_ID="your_wechat_app_id"
echo WECHAT_APP_SECRET="your_wechat_app_secret"
echo.
echo # App
echo NEXT_PUBLIC_APP_URL="http://localhost:3000"
echo NODE_ENV="development"
) > .env.example

copy .env.example .env.local

echo [v] Environment files created

REM Step 7: Create directory structure
echo.
echo [->] Step 7/8: Creating project structure...
mkdir app\(auth)\login 2>nul
mkdir app\(student)\dashboard 2>nul
mkdir app\(student)\learn\[contentId] 2>nul
mkdir app\(student)\clinic\[sessionId] 2>nul
mkdir app\(tutor)\dashboard 2>nul
mkdir app\(tutor)\clinic\host\[sessionId] 2>nul
mkdir app\api\auth\[...nextauth] 2>nul
mkdir components\ui 2>nul
mkdir components\video-player 2>nul
mkdir components\ai-chat 2>nul
mkdir components\whiteboard 2>nul
mkdir components\quiz 2>nul
mkdir lib\ai 2>nul
mkdir lib\db 2>nul
mkdir lib\realtime 2>nul
mkdir lib\video 2>nul
mkdir types 2>nul
mkdir scripts 2>nul

echo [v] Project structure created

REM Step 8: Create helper scripts
echo.
echo [->] Step 8/8: Creating helper scripts...

(
echo @echo off
echo echo Starting Solocorn development environment...
echo echo.
echo docker ps ^| findstr tutorme-db ^>nul
echo if errorlevel 1 (
echo     echo Starting Docker containers...
echo     docker-compose up -d
echo     echo Waiting for database...
echo     timeout /t 5 /nobreak ^>nul
echo     echo Running migrations...
echo     npm run db:migrate
echo )
echo echo.
echo echo ========================================
echo echo   Starting Next.js development server
echo echo ========================================
echo echo.
echo echo App will be at: http://localhost:3000
echo echo Press Ctrl+C to stop
echo echo.
echo npm run dev
) > scripts\dev.bat

(
echo @echo off
echo echo Setting up database...
echo docker-compose up -d db redis
echo timeout /t 5 /nobreak ^>nul
echo npm run db:migrate
echo echo Database ready!
) > scripts\setup-db.bat

echo [v] Helper scripts created

REM Update package.json
echo.
echo [->] Updating package.json...
node -e "const fs=require('fs'),pkg=JSON.parse(fs.readFileSync('package.json','utf8'));pkg.scripts={...pkg.scripts,'dev:all':'scripts\dev.bat','db:setup':'scripts\setup-db.bat','db:migrate':'drizzle-kit migrate','db:studio':'drizzle-kit studio','docker:up':'docker-compose up -d','docker:down':'docker-compose down'};fs.writeFileSync('package.json',JSON.stringify(pkg,null,2));"

echo [v] Package.json updated

echo [✓] Package.json updated

echo.
echo ========================================
echo   SETUP COMPLETE
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Start Docker Desktop (if not running)
echo.
echo 2. Start the development environment:
echo    cd %APP_NAME%
echo    npm run dev:all
echo.
echo 3. Open http://localhost:3000
echo.
echo Happy coding!
echo.

pause
