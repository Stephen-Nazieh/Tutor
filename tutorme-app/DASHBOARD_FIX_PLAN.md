# Student Dashboard - Button Fix Plan

> **Status:** ✅ All fixes implemented as of 2026-02-11  
> See `FEATURES.md` for additional pending features.

## Analysis Summary

### ✅ Working Buttons
| Button | Location | Action |
|--------|----------|--------|
| "Start" | Continue Learning | Links to `/student/learn/[id]` |
| "Continue" | Continue Learning (fallback) | Links to sample content |
| "Start Learning" | AI Tutor Card | Links to `/student/ai-tutor` |
| "Browse Worlds" | AI Tutor Card | Links to `/student/worlds` |
| "Complete Setup" | Incomplete Profile | `router.push('/onboarding/student')` |
| "Watch" | Bookmarks | Links to content page |
| "Delete" | Bookmarks | Calls DELETE /api/bookmarks |

### ❌ Broken/Placeholder Buttons
| Button | Location | Issue |
|--------|----------|-------|
| "Book" | Upcoming Clinics | No onClick handler - hardcoded mock |
| "Join" (2x) | Study Groups | No onClick handler - hardcoded mock |
| ArrowRight | AI Recommendations | No onClick handler - no navigation |
| WorldsMap cards | Learning Worlds | No onWorldClick handler passed |
| DailyQuests items | Daily Quests | No onQuestClick handler passed |

### 📊 Components with Mock Data
| Component | Data Source | Status |
|-----------|-------------|--------|
| Knowledge Graph | Mock data in component | Display-only |
| Upcoming Clinics | Hardcoded HTML | Needs API |
| Study Groups | Hardcoded HTML | Needs API |
| Continue Learning | Real API + fallback | Works with fallback |

---

## Fix Plan

### Phase 1: Add Click Handlers to Dashboard
**Files:** `src/app/student/dashboard/page.tsx`

1. **Add onWorldClick handler**
   ```typescript
   const handleWorldClick = (world: World) => {
     router.push(`/student/worlds/${world.id}`)
   }
   ```

2. **Add onQuestClick handler**
   ```typescript
   const handleQuestClick = (quest: Quest) => {
     if (!quest.completed) {
       // Navigate based on quest type
       router.push(`/student/missions?quest=${quest.id}`)
     }
   }
   ```

3. **Fix Upcoming Clinics "Book" button**
   - Create clinics API endpoint
   - Add booking functionality

4. **Fix Study Groups "Join" button**
   - Create study groups API endpoint
   - Add join functionality

5. **Fix AI Recommendations button**
   - Navigate to recommended content

### Phase 2: Create Missing API Endpoints

1. **Clinics API** (`/api/clinics/route.ts`)
   - GET: List upcoming clinics
   - POST: Book a clinic spot
   - Database: Need `Clinic`, `ClinicBooking` tables

2. **Study Groups API** (`/api/study-groups/route.ts`)
   - GET: List available study groups
   - POST: Join a study group
   - Database: Need `StudyGroup`, `StudyGroupMember` tables

### Phase 3: Database Schema Updates

```prisma
// Add to schema.prisma

model Clinic {
  id          String   @id @default(cuid())
  title       String
  subject     String
  tutorId     String
  tutor       User     @relation(fields: [tutorId], references: [id])
  startTime   DateTime
  duration    Int      // minutes
  maxStudents Int      @default(50)
  bookings    ClinicBooking[]
  createdAt   DateTime @default(now())
}

model ClinicBooking {
  id        String   @id @default(cuid())
  clinicId  String
  clinic    Clinic   @relation(fields: [clinicId], references: [id], onDelete: Cascade)
  studentId String
  student   User     @relation(fields: [studentId], references: [id], onDelete: Cascade)
  bookedAt  DateTime @default(now())
  
  @@unique([clinicId, studentId])
}

model StudyGroup {
  id          String   @id @default(cuid())
  name        String
  subject     String
  description String?
  createdBy   String
  creator     User     @relation("CreatedGroups", fields: [createdBy], references: [id])
  members     StudyGroupMember[]
  createdAt   DateTime @default(now())
}

model StudyGroupMember {
  id        String     @id @default(cuid())
  groupId   String
  group     StudyGroup @relation(fields: [groupId], references: [id], onDelete: Cascade)
  studentId String
  student   User       @relation(fields: [studentId], references: [id], onDelete: Cascade)
  joinedAt  DateTime   @default(now())
  
  @@unique([groupId, studentId])
}
```

### Phase 4: Quick Wins (Minimal Changes)

For immediate functionality without full database changes:

1. **Add navigation handlers** to existing buttons
2. **Show "Coming Soon" toast** for features not yet implemented
3. **Add visual feedback** (loading states, disabled states)

### Phase 5: Component-Specific Fixes

#### 1. WorldsMap Component
- Already has `onWorldClick` prop
- Just needs handler passed from dashboard

#### 2. DailyQuestsWidget Component
- Already has `onQuestClick` prop
- Just needs handler passed from dashboard

#### 3. Upcoming Clinics Card
- Replace hardcoded HTML with dynamic data
- Add booking mutation

#### 4. Study Groups Card
- Replace hardcoded HTML with dynamic data
- Add join mutation

#### 5. AI Recommendations
- Add click handler to navigate to content

---

## Implementation Priority

### 🔴 High Priority (User-facing)
1. Add `onWorldClick` handler to navigate to world details
2. Add `onQuestClick` handler to navigate to missions
3. Fix "Book" button to show booking flow
4. Fix "Join" buttons for study groups

### 🟡 Medium Priority (Data)
5. Create Clinics API endpoints
6. Create Study Groups API endpoints
7. Add database migrations

### 🟢 Low Priority (Polish)
8. Add loading states
9. Add error handling
10. Add "Coming Soon" placeholders

---

## Code Snippets

### Dashboard Click Handlers
```typescript
// Add to StudentDashboard component
const handleWorldClick = (world: any) => {
  if (world.isUnlocked) {
    router.push(`/student/worlds/${world.id}`)
  } else if (world.canAccess) {
    // Show unlock modal or toast
    toast.success(`Unlocked ${world.name}!`)
    router.push(`/student/worlds/${world.id}`)
  }
}

const handleQuestClick = (quest: any) => {
  if (!quest.completed) {
    router.push('/student/missions')
  }
}

const handleBookClinic = (clinicId: string) => {
  // Show booking modal or navigate
  router.push('/student/clinics')
}

const handleJoinStudyGroup = (groupId: string) => {
  // Join API call
  toast.success('Joined study group!')
}

const handleRecommendationClick = (rec: any) => {
  // Navigate based on recommendation type
  router.push('/student/learn')
}
```

### Add Toast Notifications
```typescript
import { useToast } from '@/components/ui/use-toast'

const { toast } = useToast()
```

### Fix Bookmarks Delete API
Current issue: DELETE expects JSON body but fetch with URL params
```typescript
// In bookmarks-list.tsx, fix the delete function:
const removeBookmark = async (contentId: string) => {
  try {
    await fetch('/api/bookmarks', { 
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentId })
    })
    setBookmarks(prev => prev.filter(b => b.content.id !== contentId))
  } catch (error) {
    console.error('Failed to remove bookmark')
  }
}
```

---

## Testing Checklist

- [x] World cards navigate to world detail page
- [x] Daily quest items navigate to missions page
- [x] Book clinic button opens booking flow
- [x] Join study group button adds member
- [x] AI recommendations navigate to content
- [x] Bookmarks delete works correctly
- [x] All loading states work
- [x] Error states handled gracefully
