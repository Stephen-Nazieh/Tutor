# Your Action Items - TutorMe Development

> **INSTRUCTION**: This file contains ONLY the tasks YOU need to do. I will handle all coding. Check off items as you complete them.

---

## Legend

- [ ] ⬜ = Not started / Waiting for you
- [x] ✅ = Completed
- [~] 🔄 = In progress

---

## VERY IMPORTANT - READ THIS FIRST

**What I'm doing:** Building an AI tutoring platform. I write all the code.

**What you need to do:** 
1. Run the scripts I provide (just copy and paste)
2. Check if things work by opening URLs in your browser
3. Report any errors to me

**No coding required from you!** I'll write all the code.

---

## Current Status

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 0: Foundation | ✅ COMPLETE | Database, API routes, seed data |
| Phase 1: Authentication | ✅ COMPLETE | Login, signup, onboarding, NextAuth |
| Phase 2: Student Learning | ⬜ NOT STARTED | Video, quizzes, AI chat |
| Phase 3: Live Clinics | ⬜ NOT STARTED | Video calls, whiteboard |

### Phase 1 Features:
- ✅ Email/password login
- ✅ Student/Tutor registration
- ✅ Student onboarding (grade, subjects, diagnostic quiz)
- ✅ Tutor onboarding (bio, credentials, subjects, availability, hourly rate)
- ✅ Automatic redirect to onboarding for new users
- ✅ Protected routes with role-based access

**Last Updated:** 2026-02-10

---

## 📋 YOUR CURRENT TASKS

### Task 1: Run the Setup Script (ONE TIME)

**What this does:** Installs everything, sets up the database, and prepares the app.

**Copy and paste this:**

```bash
bash /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app/scripts/setup.sh
```

**This will take 3-5 minutes.** It does everything:
- Installs dependencies
- Starts Docker containers
- Creates database tables
- Generates Prisma client
- Seeds sample data
- Builds the app

**When it says "Setup Complete!" you're ready to go.**

**What you should see:**
- Docker containers starting
- "Enter a name for the new migration" → press Enter to accept "init"
- "Database ready!" or similar success message

---

### Task 3: Start the Development Server

**What this does:** Starts the web server so you can see the app.

**Copy and paste this:**

```bash
cd /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app
npm run dev
```

**What you should see:**
- "App URL: http://localhost:3003"
- Server is running message

---

### Task 4: Test the App

**Open these URLs in your browser:**

| URL | What to Check |
|-----|---------------|
| http://localhost:3003 | Landing page loads |
| http://localhost:3003/login | Login page loads |
| http://localhost:3003/register | Registration page loads |
| http://localhost:3003/api/health | Shows JSON with "status": "healthy" |

**Try creating an account:**
1. Go to http://localhost:3003/register
2. Select "学生" (Student) or "导师" (Tutor)
3. Fill in your name, email, password
4. Click "创建账号"
5. You should be redirected to login with "注册成功" message
6. Log in with your email and password

---

## 🎯 Daily Development Commands

After the initial setup, use this to start working:

```bash
# Quick start - runs everything
bash /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app/scripts/dev.sh
```

**Or manually:**
```bash
cd /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app
docker-compose up -d db redis  # Start database
npm run dev                    # Start dev server
```

Then open http://localhost:3003

To stop: Press `Ctrl+C`

---

## 📁 Project URLs Reference

| URL | What You'll See |
|-----|-----------------|
| http://localhost:3003 | Landing page |
| http://localhost:3003/login | Login page |
| http://localhost:3003/register | Sign up page |
| http://localhost:3003/onboarding/student | Student onboarding wizard |
| http://localhost:3003/onboarding/tutor | Tutor onboarding wizard |
| http://localhost:3003/student/dashboard | Student dashboard |
| http://localhost:3003/tutor/dashboard | Tutor dashboard |
| http://localhost:3003/student/learn/[id] | Video learning page |
| http://localhost:3003/api/health | System health check |
| http://localhost:3003/api/ai/status | AI provider status |
| http://localhost:5555 | Database admin (run `npx prisma studio` first) |

---

## 🆘 Troubleshooting

### Problem: "Port already in use"
**Fix:**
```bash
# Use a different port
cd /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app
npm run dev -- --port 3001
```

### Problem: "Docker not running" or "zsh: killed docker-compose"
**What it means:** Docker Desktop isn't running or doesn't have enough memory.

**Fix:**
1. Open Docker Desktop application
2. Go to Settings (gear icon) → Resources
3. Increase memory to at least 4GB
4. Click "Apply & Restart"
5. Wait for Docker to fully start (whale icon stops animating)
6. Try again

**Alternative - Start just the database:**
```bash
cd /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app
docker-compose up -d db redis
```

### Problem: "Database connection failed" or "User denied access"
**Fix:**
```bash
cd /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app

# Make sure .env file exists with correct credentials
cp .env.local .env

# Stop and remove old database
docker-compose down -v

# Start fresh
docker-compose up -d db redis
sleep 10

# Run migrations
npx prisma migrate dev --name init
```

### Problem: "Content Not Found" or Chinese Subject Names

**Step-by-step fix:**

**Step 1: Make sure Docker is running**
```bash
# Open Docker Desktop app first, then:
docker ps
```
You should see containers listed. If not, run:
```bash
docker-compose up -d db redis
```

**Step 2: Go to project folder**
```bash
cd /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app
```

**Step 3: Reset the database (this deletes all data)**
```bash
npx prisma migrate reset --force
```
When you see: "Are you sure you want to reset...?" - just press Enter to say YES.

**Step 4: Seed with fresh English content**
```bash
npx prisma db seed
```

**Step 5: Restart the dev server**
```bash
npm run dev
```

**Step 6: Test**
Open http://localhost:3003/student/dashboard and click "Start" on a lesson.

---

### Problem: "Cannot find module '.prisma/client'" or "query_engine_bg.postgresql.wasm-base64.js"
**What it means:** The Prisma client installation is corrupted.

**Fix - Install specific Prisma version:**
```bash
cd /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app

# Delete everything
rm -rf node_modules package-lock.json

# Install specific working versions
npm install prisma@5.22.0 @prisma/client@5.22.0 --legacy-peer-deps --ignore-scripts

# Generate Prisma client
npx prisma generate
```

### Problem: "Cannot find module"
**Fix:**
```bash
cd /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app
npm install
```

---

## 📞 Need Help?

If something doesn't work:
1. **Copy the exact error message** (all the red text)
2. **Tell me what command you ran**
3. **Tell me what URL you're on**

---

## Recent Changes

### Phase 2 Complete! Video Learning Core
The following features have been added:

**Video Player**
- Custom video player with play/pause, volume, fullscreen
- Playback speed control (0.5x to 2x)
- Progress tracking and quiz markers
- Auto-pause at quiz timestamps

**AI Chat Widget**
- Floating chat button (bottom-right)
- Socratic method responses
- Context-aware (knows current video)
- Conversation history

**Quiz System**
- Inline quizzes that auto-pause video
- Multiple choice questions
- Short answer with AI grading
- Results and feedback display

**Note Taking**
- Timestamp-synced notes
- Click timestamp to jump to video position
- Persistent storage (localStorage)
- Collapsible sidebar

**Learning Page**
- URL: `/student/learn/[contentId]`
- Watch video with all features
- Take notes alongside
- Chat with AI tutor
- Complete inline quizzes

### English UI Only
All interface text is in English.

### Setup Script
Run `bash scripts/setup.sh` to set up everything.

---

## What I Just Built (Phase 0 & 1)

### Phase 0: Foundation ✅
- **Database**: Prisma schema with all models (User, Profile, Content, Quiz, etc.)
- **Seed Script**: Creates sample math and physics lessons with quizzes
- **API Routes**:
  - `/api/health` - Check if database and AI are working
  - `/api/ai/status` - Check AI provider status
  - `/api/ai/chat` - Chat with AI tutor
- **Dev Script**: `scripts/dev.sh` starts everything automatically

### Phase 1: Authentication ✅
- **NextAuth.js Setup**: Complete authentication system
- **Login Page**: `/login` - Email/password login
- **Registration Page**: `/register` - Create student or tutor account
- **Protected Routes**: Student and tutor pages require login
- **Role-based Access**: Students go to student dashboard, tutors to tutor dashboard
- **Password Security**: Passwords are hashed with bcrypt

### Next Up: Phase 2
I'll build:
- Video player with inline quizzes
- AI chat widget (floating button)
- Quiz generation from video transcripts

---

## Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Landing page | ✅ Works | http://localhost:3003 |
| Database | ✅ Ready | PostgreSQL with sample data |
| AI system | ✅ Ready | Ollama + Kimi + Zhipu |
| Login/Signup | ✅ Ready | Full auth system |
| Student dashboard | ✅ Protected | Requires login |
| Tutor dashboard | ✅ Protected | Requires login |
| Video player | ⬜ Coming next | Phase 2 |
| AI chat | ⬜ Coming next | Phase 2 |


Run the setup script:

bash /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app/scripts/setup.sh
This will take 3-5 minutes and set up everything automatically. Then run:

bash /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app/scripts/dev.sh
Open http://localhost:3003 to see the app in English!



