# TutorMe - Quick Start Guide

## 🚀 Choose Your Operating System

### For Mac Users

```bash
# 1. Install prerequisites (one-time)
# Download from:
# - Node.js: https://nodejs.org (click LTS button)
# - Docker: https://www.docker.com/products/docker-desktop

# 2. Create project folder
mkdir -p ~/projects/tutorme
cd ~/projects/tutorme

# 3. Download the setup script (copy scripts/setup.sh here)
# Then run:
bash scripts/setup.sh

# 4. Wait 10-15 minutes for setup to complete

# 5. Start development server
cd tutorme-app
npm run dev:all

# 6. Open http://localhost:3000
```

### For Windows Users

**Option 1: Use Git Bash (Recommended)**

Git Bash comes with Git for Windows and supports bash scripts.

```bash
# 1. Install prerequisites (one-time)
# Download from:
# - Node.js: https://nodejs.org (click LTS button)
# - Docker: https://www.docker.com/products/docker-desktop
# - Git: https://git-scm.com/download (this includes Git Bash)

# 2. Open Git Bash (Start Menu -> Git Bash)

# 3. Create project folder
mkdir -p ~/projects/tutorme
cd ~/projects/tutorme

# 4. Download setup files (copy scripts/setup.sh here)
# Then run:
bash scripts/setup.sh

# 5. Wait 10-15 minutes

# 6. Start development server
cd tutorme-app
npm run dev:all

# 7. Open http://localhost:3000 in your browser
```

**Option 2: Use Windows Command Prompt (Manual Steps)**

If you prefer not to use Git Bash, follow the step-by-step manual setup in MANUAL_SETUP.md

---

## 📋 Prerequisites Checklist

Before starting, verify you have:

- [ ] **Node.js 20+** installed
  - Check: `node --version` should show v20.x.x
  
- [ ] **Docker Desktop** installed and running
  - Check: Docker icon in system tray/menu bar
  
- [ ] **Git** installed
  - Check: `git --version`

---

## 🔧 What the Setup Script Does

The setup script (`scripts/setup.sh`) automatically:

1. ✅ Creates Next.js 14 project with TypeScript
2. ✅ Sets up Tailwind CSS and shadcn/ui components
3. ✅ Installs all dependencies (30+ packages)
4. ✅ Creates Docker Compose configuration (Postgres, Redis, Ollama AI)
5. ✅ Sets up Prisma database schema
6. ✅ Creates environment configuration files
7. ✅ Generates helper scripts
8. ✅ Creates initial page templates

**You don't need to do any of this manually!**

---

## 🎯 Daily Development Workflow

After initial setup, this is all you need:

```bash
# Navigate to project
cd ~/projects/tutorme/tutorme-app    # Mac
cd %USERPROFILE%\projects\tutorme\tutorme-app   # Windows

# Start everything (database + AI + app)
npm run dev:all

# Wait for "Ready on http://localhost:3000"
# Open your browser to http://localhost:3000

# When done: Press Ctrl+C to stop
```

---

## 🆘 Common Issues

### "Docker not running"
**Fix:** Start Docker Desktop application

### "Port 3000 already in use"
**Fix:** Either close other apps or use different port:
```bash
npm run dev -- --port 3001
```

### "Cannot find module"
**Fix:** Reinstall dependencies:
```bash
cd ~/projects/tutorme/tutorme-app
npm install
```

### Setup script failed
**Fix:** Reset and try again:
```bash
cd ~/projects/tutorme
rm -rf tutorme-app
bash scripts/setup.sh
```

---

## 📁 Project Structure After Setup

```
~/projects/tutorme/
├── scripts/
│   ├── setup.sh          ← You ran this
│   ├── dev.sh            ← Starts dev environment
│   └── reset.sh          ← Resets everything
│
└── tutorme-app/          ← Main project folder
    ├── app/              ← Next.js pages
    │   ├── (auth)/       ← Login/signup
    │   ├── (student)/    ← Student pages
    │   ├── (tutor)/      ← Tutor pages
    │   └── api/          ← API routes
    │
    ├── components/       ← React components
    │   ├── ui/           ← shadcn components
    │   ├── video-player/
    │   ├── ai-chat/
    │   └── ...
    │
    ├── lib/              ← Utility code
    │   ├── ai/           ← AI integrations
    │   ├── db/           ← Database client
    │   └── ...
    │
    ├── prisma/
    │   └── schema.prisma ← Database schema
    │
    ├── .env.local        ← Your config
    └── package.json      ← Dependencies
```

---

## 🎮 Available Commands

| Command | What It Does |
|---------|-------------|
| `npm run dev:all` | Start database + AI + dev server |
| `npm run dev` | Start only dev server |
| `npm run db:studio` | Open database editor |
| `npm run db:migrate` | Update database schema |
| `npm run db:reset` | Reset everything (⚠️ deletes data) |
| `npm run docker:up` | Start Docker containers |
| `npm run docker:down` | Stop Docker containers |

---

## ✅ Next Steps After Setup

Once setup is complete:

1. **Test the app** - Open http://localhost:3000
2. **Verify database** - Run `npm run db:studio` and open http://localhost:5555
3. **Update YourActions.md** - Mark Phase 0 and 1 as complete
4. **Tell me** - I'll continue with Phase 2 (building actual features)

---

## 🆘 Need Help?

If something doesn't work:

1. Check the **Troubleshooting** section above
2. Look at the error message carefully
3. Tell me:
   - What command you ran
   - What error message you saw
   - What operating system you're using

---

**Ready to start?** Begin with "Phase 0: Prerequisites" in YourActions.md
