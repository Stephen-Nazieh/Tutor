# Manual Setup Guide (Windows without Bash)

If you can't use Git Bash or WSL, follow these manual steps.

## Step 1: Install Prerequisites

1. **Node.js**: https://nodejs.org (download LTS, install with all defaults)
2. **Docker Desktop**: https://www.docker.com/products/docker-desktop
3. **Git**: https://git-scm.com/download/win
4. **VS Code**: https://code.visualstudio.com

## Step 2: Create Project Folder

Open Command Prompt (cmd.exe) or PowerShell:

```cmd
mkdir %USERPROFILE%\projects\tutorme
cd %USERPROFILE%\projects\tutorme
```

## Step 3: Create Next.js Project

```cmd
cd %USERPROFILE%\projects\tutorme
npx create-next-app@14 tutorme-app --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --yes
```

Wait 5-10 minutes for this to complete.

## Step 4: Install Dependencies

```cmd
cd %USERPROFILE%\projects\tutorme\tutorme-app

npm install @prisma/client prisma next-auth socket.io socket.io-client redis ioredis zod date-fns lucide-react class-variance-authority clsx tailwind-merge

npm install ollama openai yjs y-websocket @daily-co/daily-js

npm install -D tsx @types/bcryptjs
```

## Step 5: Setup shadcn/ui

```cmd
cd %USERPROFILE%\projects\tutorme\tutorme-app
npx shadcn-ui@latest init -y -d
npx shadcn-ui@latest add button card input label avatar badge dialog dropdown-menu select tabs sheet scroll-area separator skeleton -y
```

## Step 6: Create Docker Compose

Create file `%USERPROFILE%\projects\tutorme\tutorme-app\docker-compose.yml`:

```yaml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    container_name: tutorme-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: tutorme
      POSTGRES_PASSWORD: tutorme_password
      POSTGRES_DB: tutorme
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: tutorme-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  ollama:
    image: ollama/ollama:latest
    container_name: tutorme-ollama
    restart: unless-stopped
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama

volumes:
  postgres_data:
  redis_data:
  ollama_data:
```

## Step 7: Create Prisma Schema

Create folder `%USERPROFILE%\projects\tutorme\tutorme-app\prisma`

Create file `%USERPROFILE%\projects\tutorme\tutorme-app\prisma\schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  STUDENT
  TUTOR
  ADMIN
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  role          Role      @default(STUDENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  profile       Profile?
}

model Profile {
  id            String    @id @default(uuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name          String?
  avatar        String?
  gradeLevel    Int?
  subjects      String[]
}
```

## Step 8: Create Environment File

Create file `%USERPROFILE%\projects\tutorme\tutorme-app\.env.local`:

```env
DATABASE_URL="postgresql://tutorme:tutorme_password@localhost:5432/tutorme"
REDIS_URL="redis://localhost:6379"
OLLAMA_URL="http://localhost:11434"
ZHIPU_API_KEY="your_zhipu_api_key_here"
DAILY_API_KEY="your_daily_api_key_here"
NEXTAUTH_SECRET="your_random_secret_here_min_32_chars"
NEXTAUTH_URL="http://localhost:3000"
WECHAT_APP_ID="your_wechat_app_id"
WECHAT_APP_SECRET="your_wechat_app_secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

## Step 9: Start Docker

Make sure Docker Desktop is running, then:

```cmd
cd %USERPROFILE%\projects\tutorme\tutorme-app
docker-compose up -d
```

Wait 30 seconds for containers to start.

## Step 10: Setup Database

```cmd
cd %USERPROFILE%\projects\tutorme\tutorme-app
npx prisma migrate dev --name init
npx prisma generate
```

## Step 11: Update package.json Scripts

Open `%USERPROFILE%\projects\tutorme\tutorme-app\package.json` and add to the "scripts" section:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down"
  }
}
```

## Step 12: Start Development Server

```cmd
cd %USERPROFILE%\projects\tutorme\tutorme-app
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Daily Development

After setup, each day you just need to:

1. Start Docker Desktop (if not running)
2. Run: `npm run dev` in the project folder
3. Open http://localhost:3000
