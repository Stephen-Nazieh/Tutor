# TutorMe Scripts

## 🚀 Quick Start: Initialize Everything

The `initialize.sh` (Mac/Linux) and `initialize.bat` (Windows) scripts set up the entire development environment with one command.

### What it does:
1. ✅ Checks Docker Desktop is running
2. ✅ Creates PostgreSQL on **port 5433** (avoids conflicts)
3. ✅ Creates Redis cache
4. ✅ Runs Prisma migrations
5. ✅ Seeds test curriculum
6. ✅ Starts the development server

### How to run:

**Mac/Linux:**
```bash
npm run initialize
# OR
bash scripts/initialize.sh
```

**Windows:**
```cmd
npm run initialize:win
# OR
scripts\initialize.bat
```

Then open http://localhost:3003 in your browser!

---

## 🔍 Quick Database Check

The `check-db.sh` and `check-db.bat` scripts diagnose existing database issues.

### How to run:

**Mac/Linux:**
```bash
npm run db:check
```

**Windows:**
```cmd
npm run db:check:win
```

---

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run initialize` | **Full setup** - DB + migrations + seed + dev server |
| `npm run studio` | Open Prisma Studio GUI (database viewer) |
| `npm run db:check` | Check existing database status |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed test data |

---

## 🗄️ Using Prisma Studio (Database GUI)

Prisma Studio is a web-based GUI for viewing and editing your database.

### Start Prisma Studio:
```bash
npm run studio
# OR in a separate terminal:
npx prisma studio
```

Then open: **http://localhost:5555**

### What you can do in Prisma Studio:
- View all tables (User, Curriculum, Lesson, etc.)
- Add new users manually
- Edit existing records
- Delete test data
- View relationships between tables

### Screenshot of tables you'll see:
```
User              - All registered accounts
Profile           - User profile details
Curriculum        - IELTS, TOEFL, etc.
CurriculumModule  - Modules within curriculums
CurriculumLesson  - Individual lessons
AITutorEnrollment - Who's enrolled in AI tutoring
```

---

## ⚠️ Port 5433 Instead of 5432

The initialize script uses **port 5433** instead of the standard 5432 to avoid conflicts with other PostgreSQL installations (like Nhost, Homebrew PostgreSQL, etc.).

Your `.env.local` will be automatically updated to:
```
DATABASE_URL="postgresql://tutorme:tutorme_password@localhost:5433/tutorme"
```

---

## 🛠️ Manual Commands (if needed)

```bash
# Start containers manually
docker start tutorme-db tutorme-redis

# View database GUI
npx prisma studio

# Check container logs
docker logs tutorme-db
docker logs tutorme-redis
```
