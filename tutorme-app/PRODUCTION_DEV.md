# Production-Only Development Guide

**Date**: 2026-04-13  
**Status**: Production-Only Development Mode  

---

## Overview

This project now uses **production-only development**. All development, testing, and staging work directly against the production Neon PostgreSQL database and production services.

**⚠️ IMPORTANT**: Be extremely careful with data operations. All changes affect production data.

---

## Quick Start

### 1. Prerequisites

- Node.js 20+
- Production environment variables configured
- Access to production Neon database

### 2. Environment Setup

Environment files are pre-configured for production:

- `.env` - Production configuration
- `.env.local` - Production configuration (loaded by Next.js)
- `.env.production` - Production configuration

**Key Configuration**:
```
DATABASE_URL=postgresql://neondb_owner:...@ep-shy-lab-a1qm5o68-pooler...neon.tech/neondb?sslmode=require
REDIS_URL=your-production-redis-url
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
```

### 3. Install Dependencies

```bash
cd tutorme-app
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The app will start in **production mode** using:
- Production Neon PostgreSQL database
- Production Redis (if configured)
- Production API keys and services

---

## Available Scripts

### Development
```bash
npm run dev              # Start production dev server on port 3003
npm run build            # Build for production
npm start                # Start production server
```

### Database (Production Neon)
```bash
npm run db:migrate       # Run pending migrations
npm run drizzle:push     # Push schema changes to production
npm run drizzle:studio   # Open Drizzle Studio (connects to production)
```

**⚠️ WARNING**: `drizzle:push` modifies the production database schema directly. Use with caution.

### Testing
```bash
npm run test             # Run all unit tests
npm run test:e2e         # Run Playwright E2E tests
npm run test:integration # Run integration tests
```

### Code Quality
```bash
npm run typecheck        # TypeScript type checking
npm run lint             # ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run security:check   # Check for security vulnerabilities
```

---

## Development Workflow

### 1. Make Changes
Edit code as normal. The dev server (`npm run dev`) runs in production mode.

### 2. Test Changes
```bash
npm run typecheck        # Check types
npm run test             # Run unit tests
npm run lint             # Check linting
```

### 3. Database Changes
If you modify the database schema:

```bash
# Generate migration
npm run drizzle:generate

# Review the generated SQL in drizzle/

# Apply to production
npm run db:migrate
```

### 4. Deploy
Push changes to GitHub. The CI/CD pipeline will:
1. Run tests
2. Run type checking
3. Apply database migrations
4. Deploy to Cloud Run

---

## Important Warnings

### ⚠️ Production Database
- **All development uses the production Neon database**
- Schema changes via `drizzle:push` immediately affect production
- Test data you create is real production data
- Be careful with DELETE operations

### ⚠️ Redis
- If configured, all sessions and cache are shared with production
- Rate limiting is active
- Socket.io uses production Redis adapter

### ⚠️ External Services
- AI calls (Kimi, Gemini) use production API keys
- Email sending is real
- Payment processing is real (in production mode)

---

## Data Safety Guidelines

### DO
- ✅ Use test user accounts for development
- ✅ Create test courses with "[TEST]" prefix
- ✅ Use test email addresses
- ✅ Verify changes in Drizzle Studio before applying

### DON'T
- ❌ Delete real user data
- ❌ Modify production tutor accounts
- ❌ Run `db:reset` or similar destructive operations
- ❌ Share production credentials

---

## Local Development Archive

Previous local development files have been archived:

```
archive/local-dev/
├── docker-compose.yml           # Local Docker setup
├── .env.example                 # Local env template
├── setup-db.sh                  # Local DB setup script
├── reset.sh                     # Local DB reset script
├── check-db.sh                  # Local DB check script
├── studio.sh                    # Local Drizzle Studio
└── dev.sh                       # Local dev startup script
```

These are kept for reference but not used in production-only mode.

---

## Troubleshooting

### Database Connection Issues
```bash
# Verify DATABASE_URL is set correctly
echo $DATABASE_URL

# Test connection
npm run drizzle:studio
```

### Redis Connection Issues
If Redis is not configured, the app will:
- Use in-memory session storage (not shared across instances)
- Skip Redis caching
- Run Socket.io without Redis adapter

### Build Errors
```bash
# Clean and rebuild
rm -rf .next
npm run build
```

---

## Support

For production database access or credential updates, contact the infrastructure team.
