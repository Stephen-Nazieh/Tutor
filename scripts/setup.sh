#!/bin/bash

# TutorMe Project Setup Script
# Run this from: ~/projects/tutorme (Mac) or %USERPROFILE%\projects\tutorme (Windows)

set -e  # Exit on any error

echo "=========================================="
echo "  TutorMe - Automated Setup Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_info() {
    echo -e "${YELLOW}[→]${NC} $1"
}

# Check prerequisites
print_info "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    print_error "Node.js not found. Please install Node.js 20+ first."
    echo "Visit: https://nodejs.org"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    print_error "Docker not found. Please install Docker Desktop first."
    echo "Visit: https://www.docker.com/products/docker-desktop"
    exit 1
fi

if ! command -v git &> /dev/null; then
    print_error "Git not found. Please install Git first."
    echo "Visit: https://git-scm.com/download"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_error "Node.js version must be 20 or higher. Current: $(node --version)"
    exit 1
fi

print_status "All prerequisites satisfied"

# Get project root
PROJECT_ROOT=$(pwd)
APP_NAME="tutorme-app"
APP_DIR="$PROJECT_ROOT/$APP_NAME"

print_info "Project will be created at: $APP_DIR"

# Step 1: Create Next.js project with shadcn
print_info "Step 1/8: Creating Next.js project (this may take 5-10 minutes)..."

if [ -d "$APP_DIR" ]; then
    print_error "Directory $APP_NAME already exists!"
    read -p "Delete and recreate? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$APP_DIR"
    else
        echo "Setup cancelled."
        exit 1
    fi
fi

# Create project using create-next-app
npx create-next-app@14 "$APP_NAME" \
    --typescript \
    --tailwind \
    --eslint \
    --app \
    --src-dir=false \
    --import-alias="@/*" \
    --use-npm \
    --yes

print_status "Next.js project created"

# Navigate to app directory
cd "$APP_DIR"

# Step 2: Initialize shadcn/ui
print_info "Step 2/8: Setting up shadcn/ui..."
npx shadcn-ui@latest init -y -d

# Install commonly used shadcn components
print_info "Installing shadcn components..."
npx shadcn-ui@latest add button card input label avatar badge dialog dropdown-menu select tabs sheet scroll-area separator skeleton -y

print_status "shadcn/ui setup complete"

# Step 3: Install additional dependencies
print_info "Step 3/8: Installing dependencies..."

# Core dependencies
npm install \
    @prisma/client prisma \
    next-auth \
    socket.io socket.io-client \
    redis ioredis \
    zod \
    date-fns \
    lucide-react \
    class-variance-authority clsx tailwind-merge

# AI dependencies
npm install \
    ollama \
    openai

# Real-time and video
npm install \
    yjs y-websocket \
    @daily-co/daily-js

# Utilities
npm install \
    @types/node @types/react @types/react-dom \
    typescript @types/ws

# Dev dependencies
npm install -D \
    tsx \
    @types/bcryptjs

print_status "Dependencies installed"

# Step 4: Set up Prisma
print_info "Step 4/8: Setting up Prisma..."

# Create prisma directory and schema
mkdir -p prisma

cat > prisma/schema.prisma << 'PRISMA'
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

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

enum SessionType {
  CLINIC
  GROUP
  ONE_ON_ONE
}

enum MessageSource {
  AI
  TUTOR
  STUDENT
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  role          Role      @default(STUDENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  profile       Profile?
  sessions      SessionParticipant[]
  messages      Message[]
  quizAttempts  QuizAttempt[]
  liveSessions  LiveSession[] @relation("TutorSessions")
}

model Profile {
  id            String    @id @default(uuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name          String?
  avatar        String?
  
  // Student-specific
  gradeLevel    Int?
  subjects      String[]
  knowledgeGraph Json?
  learningStyle  Json?
  
  // Tutor-specific
  credentials   String?
  hourlyRate    Decimal?  @db.Decimal(10, 2)
  availability  Json?
  bio           String?   @db.Text
}

model Content {
  id            String    @id @default(uuid())
  subject       String
  topic         String
  difficulty    String    // BEGINNER | INTERMEDIATE | ADVANCED
  videoUrl      String
  transcript    String?   @db.Text
  duration      Int       // seconds
  createdAt     DateTime  @default(now())
  
  quizzes       Quiz[]
}

model Quiz {
  id            String    @id @default(uuid())
  contentId     String
  content       Content   @relation(fields: [contentId], references: [id], onDelete: Cascade)
  questions     Json      // Array of question objects
  createdAt     DateTime  @default(now())
  
  attempts      QuizAttempt[]
}

model QuizAttempt {
  id            String    @id @default(uuid())
  studentId     String
  student       User      @relation(fields: [studentId], references: [id], onDelete: Cascade)
  quizId        String
  quiz          Quiz      @relation(fields: [quizId], references: [id], onDelete: Cascade)
  
  answers       Json
  score         Int
  aiConfidence  Float?
  tutorReviewed Boolean   @default(false)
  createdAt     DateTime  @default(now())
}

model LiveSession {
  id            String    @id @default(uuid())
  tutorId       String
  tutor         User      @relation(fields: [tutorId], references: [id], onDelete: Cascade, name: "TutorSessions")
  scheduledAt   DateTime
  maxStudents   Int       @default(50)
  type          SessionType @default(CLINIC)
  
  participants  SessionParticipant[]
  recordingUrl  String?
  aiSummary     String?   @db.Text
  
  createdAt     DateTime  @default(now())
}

model SessionParticipant {
  id              String    @id @default(uuid())
  sessionId       String
  session         LiveSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  studentId       String
  
  joinTime        DateTime
  leaveTime       DateTime?
  engagementScore Float?
  aiInterventions Json?
}

model Message {
  id          String   @id @default(uuid())
  studentId   String
  student     User     @relation(fields: [studentId], references: [id], onDelete: Cascade)
  content     String   @db.Text
  source      MessageSource
  context     Json?    
  timestamp   DateTime @default(now())
}

model Note {
  id          String   @id @default(uuid())
  studentId   String
  contentId   String
  timestamp   Int      // Video timestamp in seconds
  content     String   @db.Text
  createdAt   DateTime @default(now())
}
PRISMA

print_status "Prisma schema created"

# Step 5: Create Docker Compose
print_info "Step 5/8: Creating Docker Compose configuration..."

cat > docker-compose.yml << 'DOCKER'
version: '3.8'

services:
  # PostgreSQL Database
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
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U tutorme"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: tutorme-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  # Ollama AI (Local LLM)
  ollama:
    image: ollama/ollama:latest
    container_name: tutorme-ollama
    restart: unless-stopped
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    # For GPU support (Linux only), uncomment:
    # deploy:
    #   resources:
    #     reservations:
    #       devices:
    #         - driver: nvidia
    #           count: 1
    #           capabilities: [gpu]

volumes:
  postgres_data:
  redis_data:
  ollama_data:
DOCKER

print_status "Docker Compose created"

# Step 6: Create environment file template
print_info "Step 6/8: Creating environment configuration..."

cat > .env.example << 'ENV'
# Database
DATABASE_URL="postgresql://tutorme:tutorme_password@localhost:5432/tutorme"
REDIS_URL="redis://localhost:6379"

# AI
OLLAMA_URL="http://localhost:11434"
ZHIPU_API_KEY="your_zhipu_api_key_here"

# Video (Daily.co - get from https://dashboard.daily.co)
DAILY_API_KEY="your_daily_api_key_here"

# Auth (NextAuth.js)
NEXTAUTH_SECRET="your_random_secret_here_min_32_chars"
NEXTAUTH_URL="http://localhost:3000"

# WeChat OAuth (get from https://open.weixin.qq.com)
WECHAT_APP_ID="your_wechat_app_id"
WECHAT_APP_SECRET="your_wechat_app_secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
ENV

# Create .env.local for development
cp .env.example .env.local

print_status "Environment files created"

# Step 7: Create project structure and base files
print_info "Step 7/8: Creating project structure..."

# Create directory structure
mkdir -p app/(auth)/login
mkdir -p app/(student)/dashboard
mkdir -p app/(student)/learn/\[contentId\]
mkdir -p app/(student)/clinic/\[sessionId\]
mkdir -p app/(tutor)/dashboard
mkdir -p app/(tutor)/clinic/host/\[sessionId\]
mkdir -p app/api/auth/\[...nextauth\]
mkdir -p components/ui
mkdir -p components/video-player
mkdir -p components/ai-chat
mkdir -p components/whiteboard
mkdir -p components/quiz
mkdir -p lib/ai
mkdir -p lib/db
mkdir -p lib/realtime
mkdir -p lib/video
mkdir -p types
mkdir -p scripts

# Create lib/utils.ts (cn utility)
cat > lib/utils.ts << 'UTILS'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
UTILS

# Create database client
cat > lib/db/index.ts << 'DBCLIENT'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
DBCLIENT

# Create types
cat > types/index.ts << 'TYPES'
export interface User {
  id: string
  email: string
  role: 'STUDENT' | 'TUTOR' | 'ADMIN'
  name?: string
  avatar?: string
}

export interface StudentProfile {
  gradeLevel: number
  subjects: string[]
  knowledgeGraph: Record<string, number>
  learningStyle: 'visual' | 'auditory' | 'kinesthetic'
}

export interface Content {
  id: string
  subject: string
  topic: string
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  videoUrl: string
  transcript?: string
  duration: number
}

export interface QuizQuestion {
  type: 'multiple_choice' | 'fill_blank' | 'short_answer' | 'code_snippet'
  question: string
  options?: string[]
  rubric?: string
  answer?: string
}

export interface Quiz {
  id: string
  contentId: string
  questions: QuizQuestion[]
}

export interface LiveSession {
  id: string
  tutorId: string
  scheduledAt: Date
  maxStudents: number
  type: 'CLINIC' | 'GROUP' | 'ONE_ON_ONE'
}

export interface StudentState {
  userId: string
  engagement: number // 0-100
  understanding: number // 0-100
  frustration: number // 0-100
  status: 'on_track' | 'struggling' | 'stuck'
}
TYPES

# Create AI clients
cat > lib/ai/ollama.ts << 'OLLAMA'
import { Ollama } from 'ollama'

const ollama = new Ollama({ host: process.env.OLLAMA_URL || 'http://localhost:11434' })

export async function generateWithOllama(prompt: string, model: string = 'llama3.1') {
  try {
    const response = await ollama.generate({
      model,
      prompt,
      stream: false,
    })
    return response.response
  } catch (error) {
    console.error('Ollama generation error:', error)
    throw error
  }
}

export async function chatWithOllama(messages: Array<{ role: string; content: string }>, model: string = 'llama3.1') {
  try {
    const response = await ollama.chat({
      model,
      messages: messages.map(m => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content,
      })),
      stream: false,
    })
    return response.message.content
  } catch (error) {
    console.error('Ollama chat error:', error)
    throw error
  }
}

export async function pullModel(model: string = 'llama3.1') {
  try {
    await ollama.pull({ model })
    console.log(`Model ${model} pulled successfully`)
  } catch (error) {
    console.error('Failed to pull model:', error)
    throw error
  }
}
OLLAMA

cat > lib/ai/zhipu.ts << 'ZHIPU'
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.ZHIPU_API_KEY,
  baseURL: 'https://open.bigmodel.cn/api/paas/v4/',
})

export async function generateWithZhipu(prompt: string, model: string = 'glm-4-flash') {
  try {
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
    })
    return response.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Zhipu generation error:', error)
    throw error
  }
}

export async function chatWithZhipu(messages: Array<{ role: string; content: string }>, model: string = 'glm-4-flash') {
  try {
    const response = await client.chat.completions.create({
      model,
      messages: messages.map(m => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content,
      })),
    })
    return response.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Zhipu chat error:', error)
    throw error
  }
}
ZHIPU

cat > lib/ai/prompts.ts << 'PROMPTS'
export const socraticTutorPrompt = (params: {
  subject: string
  problem: string
  studentAnswer?: string
  previousMistakes?: string[]
}) => `
You are a patient tutor helping a student learn ${params.subject}.
Student is working on: ${params.problem}
${params.studentAnswer ? `Their attempt: ${params.studentAnswer}` : ''}
${params.previousMistakes?.length ? `History: ${params.previousMistakes.join(', ')}` : ''}

Rules:
1. Never give the direct answer
2. Ask one guiding question to help them discover the error
3. If they ask "just tell me," respond with encouragement + smaller hint
4. Reference specific concepts from their knowledge graph if relevant
5. Keep response under 3 sentences

Respond in Chinese if student wrote in Chinese, English if English.
`

export const quizGeneratorPrompt = (params: {
  transcript: string
  grade: number
  weakAreas: string[]
  prereq?: string
}) => `
Generate 3 questions about: ${params.transcript}
Student level: Grade ${params.grade}, struggling with: ${params.weakAreas.join(', ')}

Q1: Basic recall (multiple choice)
Q2: Application (short answer, AI-gradable)
Q3: Challenge (connects to prerequisite: ${params.prereq || 'fundamental concepts'})

Return valid JSON in this format:
{
  "questions": [
    {
      "type": "multiple_choice",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "answer": "A"
    },
    {
      "type": "short_answer",
      "question": "...",
      "rubric": "..."
    },
    {
      "type": "short_answer",
      "question": "...",
      "rubric": "..."
    }
  ]
}
`

export const tutorBriefingPrompt = (params: {
  studentAttempts: any[]
  recentQuizzes: any[]
}) => `
Summarize for tutor in 3 bullet points:
- What % of enrolled students struggled with which concept
- Specific student names needing attention (top 3)
- Suggested opening line for clinic

Data: ${JSON.stringify({ studentAttempts: params.studentAttempts, recentQuizzes: params.recentQuizzes })}
`
PROMPTS

# Create video provider interface
cat > lib/video/provider.ts << 'VIDEO_PROVIDER'
export interface VideoRoom {
  id: string
  url: string
  token?: string
}

export interface VideoProvider {
  createRoom(sessionId: string): Promise<VideoRoom>
  joinRoom(roomUrl: string, token?: string): Promise<void>
  leaveRoom(): void
  startScreenShare(): void
  stopScreenShare(): void
  startRecording(): void
  stopRecording(): void
}
VIDEO_PROVIDER

print_status "Project structure created"

# Step 8: Create helper scripts
print_info "Step 8/8: Creating helper scripts..."

cat > scripts/dev.sh << 'DEVSCRIPT'
#!/bin/bash
# Start development environment

echo "Starting TutorMe development environment..."

# Check if Docker containers are running
if ! docker ps | grep -q tutorme-db; then
    echo "Starting Docker containers..."
    docker-compose up -d
    
    # Wait for database
    echo "Waiting for database to be ready..."
    sleep 5
    
    # Run migrations
    echo "Running database migrations..."
    npx prisma migrate dev --name init
    
    # Generate Prisma client
    npx prisma generate
    
    # Pull Ollama model
    echo "Checking Ollama model..."
    docker exec tutorme-ollama ollama pull llama3.1 || echo "Model pull will happen on first use"
fi

echo ""
echo "========================================"
echo "  Starting Next.js development server"
echo "========================================"
echo ""
echo "  App will be available at: http://localhost:3000"
echo "  Database UI: npx prisma studio"
echo ""
echo "  Press Ctrl+C to stop"
echo ""

npm run dev
DEVSCRIPT

chmod +x scripts/dev.sh

cat > scripts/reset.sh << 'RESETSCRIPT'
#!/bin/bash
# Reset everything to fresh state

echo "This will DELETE all data and reset to fresh state."
read -p "Are you sure? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo "Stopping containers..."
docker-compose down -v

echo "Removing node_modules..."
rm -rf node_modules

echo "Reinstalling dependencies..."
npm install

echo "Starting fresh containers..."
docker-compose up -d

sleep 5

echo "Running migrations..."
npx prisma migrate dev --name init

echo "Generating Prisma client..."
npx prisma generate

echo "Done! Run 'npm run dev:all' to start."
RESETSCRIPT

chmod +x scripts/reset.sh

cat > scripts/setup-db.sh << 'DBSCRIPT'
#!/bin/bash
# Setup database only

echo "Setting up database..."

docker-compose up -d db redis

sleep 5

echo "Running migrations..."
npx prisma migrate dev --name init

echo "Generating Prisma client..."
npx prisma generate

echo "Database ready!"
DBSCRIPT

chmod +x scripts/setup-db.sh

print_status "Helper scripts created"

# Update package.json with custom scripts
print_info "Updating package.json scripts..."

node << 'NODE'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.scripts = {
  ...pkg.scripts,
  "dev:all": "bash scripts/dev.sh",
  "db:setup": "bash scripts/setup-db.sh",
  "db:migrate": "prisma migrate dev",
  "db:studio": "prisma studio",
  "db:reset": "bash scripts/reset.sh",
  "db:generate": "prisma generate",
  "db:seed": "tsx prisma/seed.ts",
  "ollama:pull": "docker exec tutorme-ollama ollama pull llama3.1",
  "docker:up": "docker-compose up -d",
  "docker:down": "docker-compose down",
  "docker:logs": "docker-compose logs -f"
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
NODE

print_status "Package.json updated"

# Create initial layout and pages
print_info "Creating initial pages..."

# Root layout
cat > app/layout.tsx << 'LAYOUT'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TutorMe - AI-Human Hybrid Tutoring",
  description: "Learn with AI assistance and human tutor support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
LAYOUT

# Landing page
cat > app/page.tsx << 'LANDING'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            TutorMe
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-Human Hybrid Tutoring Platform
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <a href="/dashboard">Student Login</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/tutor/dashboard">Tutor Login</a>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>🤖 AI Learning</CardTitle>
              <CardDescription>24/7 Socratic AI tutor</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Get instant help with our AI that guides you to answers, never just gives them.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>👨‍🏫 Live Clinics</CardTitle>
              <CardDescription>Group learning sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Join live clinics where AI monitors progress and tutors provide targeted help.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 Progress Tracking</CardTitle>
              <CardDescription>Visualize your growth</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                See your knowledge graph grow as you master new concepts.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16 text-gray-500">
          <p>🚧 MVP in Development - Phase 1 Complete 🚧</p>
        </div>
      </div>
    </main>
  )
}
LANDING

# Student dashboard placeholder
cat > app/(student)/dashboard/page.tsx << 'STUDENT_DASHBOARD'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StudentDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📚 My Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No subjects enrolled yet.</p>
            <button className="text-blue-600 mt-2">Browse subjects →</button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📅 Upcoming Clinics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No upcoming clinics.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📈 Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Complete your first lesson to see progress!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
STUDENT_DASHBOARD

# Tutor dashboard placeholder
cat > app/(tutor)/dashboard/page.tsx << 'TUTOR_DASHBOARD'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TutorDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tutor Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📅 Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No upcoming sessions.</p>
            <button className="text-blue-600 mt-2">Create clinic →</button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>👥 My Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">0 active students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>💰 Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">¥0 this month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
TUTOR_DASHBOARD

print_status "Initial pages created"

# Create README
cat > README.md << 'README'
# TutorMe - AI-Human Hybrid Tutoring Platform

## Quick Start

### Prerequisites
1. Install Node.js 20+: https://nodejs.org
2. Install Docker Desktop: https://www.docker.com/products/docker-desktop

### Setup

```bash
# 1. Navigate to project
cd tutorme-app

# 2. Start everything (database + AI + dev server)
npm run dev:all

# 3. Open http://localhost:3000
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev:all` | Start database, AI, and dev server |
| `npm run dev` | Start only Next.js dev server |
| `npm run db:setup` | Setup database containers |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Prisma Studio (database UI) |
| `npm run db:reset` | Reset everything to fresh state |
| `npm run ollama:pull` | Download AI model |
| `npm run docker:up` | Start Docker containers |
| `npm run docker:down` | Stop Docker containers |

### Project Structure

```
app/
├── (auth)/          # Authentication routes
├── (student)/       # Student pages
├── (tutor)/         # Tutor pages
└── api/             # API routes
components/
├── ui/              # shadcn/ui components
├── video-player/    # Video player components
├── ai-chat/         # AI chat widget
├── whiteboard/      # Collaborative whiteboard
└── quiz/            # Quiz components
lib/
├── ai/              # AI clients (Ollama, Zhipu)
├── db/              # Database client
├── realtime/        # Socket.io setup
└── video/           # Video provider abstraction
prisma/
└── schema.prisma    # Database schema
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your API keys:

- `ZHIPU_API_KEY` - Get from https://open.bigmodel.cn
- `DAILY_API_KEY` - Get from https://dashboard.daily.co
- `WECHAT_APP_ID` and `WECHAT_APP_SECRET` - Get from https://open.weixin.qq.com

## Development Roadmap

See `Roadmap.md` for detailed development plan.
README

print_status "Setup complete!"

echo ""
echo "========================================"
echo "  ✅ SETUP COMPLETE"
echo "========================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Start Docker Desktop (if not running)"
echo ""
echo "2. Start the development environment:"
echo "   cd $APP_NAME"
echo "   npm run dev:all"
echo ""
echo "3. Open http://localhost:3000"
echo ""
echo "Useful commands:"
echo "   npm run db:studio  - View/edit database"
echo "   npm run db:reset   - Reset everything"
echo ""
echo "Happy coding! 🚀"
echo ""
