# Solocorn - AI-Human Hybrid Tutoring Platform

This repository contains the complete development kit for building Solocorn (also known as CogniClass).

## 📚 What's in This Folder

| File | Description | Who Needs It |
|------|-------------|--------------|
| `YourActions.md` | **START HERE** - Your personal task list | You (the user) |
| `QUICKSTART.md` | Quick start guide with common commands | You (reference) |
| `MANUAL_SETUP.md` | Step-by-step manual setup for Windows | You (if automated fails) |
| `Roadmap.md` | Complete development plan | Me (developer) |
| `PROMPT.docx` | Original project requirements | Reference |
| `Solocorn.docx` | Additional project details | Reference |
| `scripts/setup.sh` | Automated setup script (Mac/Linux) | You (run once) |
| `scripts/setup.bat` | Automated setup script (Windows) | You (alternative) |
| `landing-page/` | **NEW** Vite + React landing page (Solocorn brand) | Separate entry point |
| `tutorme-app/` | Main Next.js application | Core platform |

## 🚀 How to Use This Development Kit

### Step 0: Landing Page + Main App Architecture

This project now has two separate applications:

```
┌─────────────────┐         ┌─────────────────┐
│  Landing Page   │  ────►  │  Solocorn App   │
│  (Solocorn)     │  Links  │  (Next.js)      │
│  Port: 3000     │         │  Port: 3003     │
└─────────────────┘         └─────────────────┘
```

**To run both apps:**

```bash
# Terminal 1 - Landing Page
cd landing-page
npm install
npm run dev        # http://localhost:3000

# Terminal 2 - Main App
cd tutorme-app
npm run initialize # http://localhost:3003
```

The landing page has a **"Get Started"** button that links to the main app.

See `landing-page/README.md` for detailed integration docs.

### Step 1: Read Your Actions

Open `YourActions.md` and follow the instructions there. It tells you exactly what YOU need to do.

### Step 2: Download Required Files

From this folder, download:
1. `scripts/setup.sh` (or `setup.bat` for Windows)
2. `YourActions.md`
3. `QUICKSTART.md`

Save them to your computer at `~/projects/solocorn/` (Mac) or `%USERPROFILE%\projects\solocorn\` (Windows).

### Step 3: Follow the Phases

YourActions.md is organized into phases:
- **Phase 0**: Install prerequisites (Node.js, Docker, Git)
- **Phase 1**: Run the automated setup script
- **Phase 2+**: I'll guide you through each step

## 📋 Quick Reference

### What I'm Building

An AI-human hybrid tutoring platform with:
- 🤖 AI tutors that use Socratic method (never give direct answers)
- 👨‍🏫 Live clinics with 1 tutor for 50 students
- 📹 Video learning with inline quizzes
- ⚡ Real-time AI monitoring during live sessions
- 💬 WeChat login and payments

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui |
| Backend | Node.js + Express + Socket.io |
| Database | PostgreSQL + Redis |
| AI | Ollama (local) + Zhipu AI (fallback) |
| Video | Daily.co (abstracted for Tencent TRTC later) |
| Whiteboard | tldraw + Yjs |
| Auth | NextAuth.js (WeChat OAuth) |

### Timeline

- **Week 1-2**: Foundation + Auth
- **Week 3-6**: Student async learning (video, quiz, AI chat)
- **Week 7-9**: Live clinic system
- **Week 10-12**: Tutor dashboard + AI tools
- **Week 13-14**: Payments + Polish
- **Week 15**: Deployment

## 💰 Budget

Target: ¥15,000 total
- Infrastructure (3 months): ¥9,000
- APIs and services: ¥3,500
- Domain, SSL, misc: ¥2,500

## 📞 Support

If something doesn't work:
1. Check `YourActions.md` troubleshooting section
2. Check `QUICKSTART.md` for common commands
3. Look at the exact error message
4. Tell me:
   - What you were trying to do
   - The exact error message
   - Your operating system (Mac/Windows/Linux)

## 🎯 Success Criteria

After 15 weeks, you'll have:
- [ ] Working student dashboard with video + AI chat + quiz
- [ ] Live clinic system with real-time monitoring
- [ ] Tutor dashboard with AI briefing
- [ ] WeChat Pay integration
- [ ] Deployed app in Hong Kong

## 📝 Notes for Development

- Always use local LLM first (Ollama), Zhipu only as fallback
- Chinese i18n from day one (zh-CN primary, English secondary)
- Mobile-responsive design
- No PII in AI prompts
- Docker everything for easy deployment

---

**Ready to start?** Open `YourActions.md` and begin with Phase 0.
