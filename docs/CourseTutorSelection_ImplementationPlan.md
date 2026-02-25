# Implementation Plan: Course/Tutor Selection Page

## Overview
Modify the student signup flow so that when selecting "Human" tutor option and clicking "Continue", students see a combined page showing both available courses AND tutors, titled "Choose a Course/Tutor".

## Current Flow
```
Student Dashboard → Browse Subjects → Subject Detail → Signup (/signup)
                                                            ↓
                                                    [Human Tab] → Continue
                                                            ↓
                                              Courses Page (/courses) - Shows only curriculums
```

## Target Flow
```
Student Dashboard → Browse Subjects → Subject Detail → Signup (/signup)
                                                            ↓
                                                    [Human Tab] → Continue
                                                            ↓
                                        Choose Course/Tutor Page (/courses - MODIFIED)
                                                            ↓
                                              Shows BOTH courses AND tutors
```

---

## Implementation Steps

### Step 1: Create API Endpoint for Tutors by Subject
**File:** `src/app/api/tutors/by-subject/route.ts` (NEW)

Create a new API endpoint that returns tutors who teach a specific subject.

```typescript
// GET /api/tutors/by-subject?subject=math
// Returns: { tutors: Tutor[] }

interface Tutor {
  id: string
  name: string
  avatar: string | null
  bio: string
  subjects: string[]
  rating: number
  reviewCount: number
  hourlyRate: number | null
  currency: string
  availability: string[] // days of week
  nextAvailableSlot: string | null
  totalStudents: number
  totalClasses: number
}
```

**Implementation:**
- Query User table for role = TUTOR
- Join with Profile to get tutor details
- Filter by subjects they teach
- Include stats from reviews/Bookings
- Return sorted by rating

---

### Step 2: Modify Courses Page Title and Layout
**File:** `src/app/student/subjects/[subjectCode]/courses/page.tsx` (MODIFY)

#### 2.1 Update Page Title
```typescript
// Change from:
<h1 className="text-2xl font-semibold text-gray-900 mb-2">
  Choose a course — {subjectLabel}
</h1>

// To:
<h1 className="text-2xl font-semibold text-gray-900 mb-2">
  Choose a Course/Tutor
</h1>
<p className="text-sm text-muted-foreground mb-6">
  {subjectLabel} — Select from available courses and tutors
</p>
```

#### 2.2 Add Tabs Component
Wrap content in Tabs with two tabs:
- **"Courses"** - Existing curriculum list
- **"Tutors"** - New tutor list

```typescript
<Tabs defaultValue="courses" className="w-full">
  <TabsList className="grid w-full grid-cols-2 mb-6">
    <TabsTrigger value="courses">
      <BookOpen className="w-4 h-4 mr-2" />
      Courses ({curriculums.length})
    </TabsTrigger>
    <TabsTrigger value="tutors">
      <Users className="w-4 h-4 mr-2" />
      Tutors ({tutors.length})
    </TabsTrigger>
  </TabsList>
  
  <TabsContent value="courses">
    {/* Existing curriculum list */}
  </TabsContent>
  
  <TabsContent value="tutors">
    {/* New tutor list */}
  </TabsContent>
</Tabs>
```

---

### Step 3: Create Tutor Card Component
**File:** `src/app/student/subjects/[subjectCode]/courses/components/TutorCard.tsx` (NEW)

Display tutor information in a card format:

```typescript
interface TutorCardProps {
  tutor: {
    id: string
    name: string
    avatar: string | null
    bio: string
    rating: number
    reviewCount: number
    hourlyRate: number | null
    currency: string
    nextAvailableSlot: string | null
    totalStudents: number
  }
  onBook: () => void
}
```

**Card Layout:**
- Avatar + Name (large)
- Star rating with review count
- Bio (truncated)
- Hourly rate or "Contact for pricing"
- "Next available: [date]" or "Check availability"
- "Book Session" button → links to tutor's booking page

---

### Step 4: Create Tutor List Component
**File:** `src/app/student/subjects/[subjectCode]/courses/components/TutorList.tsx` (NEW)

Fetches and displays tutors for the subject:

```typescript
export function TutorList({ subjectCode }: { subjectCode: string }) {
  const [tutors, setTutors] = useState<Tutor[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch(`/api/tutors/by-subject?subject=${subjectCode}`)
      .then(r => r.json())
      .then(data => setTutors(data.tutors))
      .finally(() => setLoading(false))
  }, [subjectCode])
  
  if (loading) return <Skeleton />
  if (tutors.length === 0) return <EmptyState />
  
  return (
    <div className="grid gap-4">
      {tutors.map(tutor => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  )
}
```

---

### Step 5: Update Courses Page Integration
**File:** `src/app/student/subjects/[subjectCode]/courses/page.tsx` (MODIFY)

Add imports and integrate the tutor components:

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Users } from 'lucide-react'
import { TutorList } from './components/TutorList'
```

Update the page layout to include tabs.

---

### Step 6: Database Updates (if needed)

Check if Tutor profiles have all necessary fields. May need to add:
- `hourlyRate` to Profile table
- `currency` to Profile table  
- `bio` to Profile table (if not exists)

Migration:
```sql
-- Add tutor-specific fields to Profile if not exist
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "hourlyRate" DECIMAL(10,2)
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "currency" TEXT DEFAULT 'SGD'
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "bio" TEXT
```

---

### Step 7: Update Navigation/Back Button
Ensure the back button on the courses page goes back to `/signup` correctly.

Already implemented:
```typescript
const signupUrl = `/student/subjects/${encodeURIComponent(subjectCode)}/signup`
```

---

## Visual Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to signup                                           │
│                                                             │
│  Choose a Course/Tutor                                      │
│  Mathematics — Select from available courses and tutors    │
│                                                             │
│  ┌─────────────────┬─────────────────┐                     │
│  │  📚 Courses (3) │  👥 Tutors (5)  │                     │
│  └─────────────────┴─────────────────┘                     │
│                                                             │
│  [Selected Tab Content]                                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Course/Tutor Card 1                               │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  Course/Tutor Card 2                               │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  Course/Tutor Card 3                               │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Files to Create/Modify

### New Files:
1. `src/app/api/tutors/by-subject/route.ts` - API endpoint
2. `src/app/student/subjects/[subjectCode]/courses/components/TutorCard.tsx` - Tutor card
3. `src/app/student/subjects/[subjectCode]/courses/components/TutorList.tsx` - Tutor list

### Modified Files:
1. `src/app/student/subjects/[subjectCode]/courses/page.tsx` - Main page with tabs

### Optional Migration:
- `prisma/migrations/xxxx_add_tutor_fields/migration.sql` - If adding fields

---

## API Response Example

```json
{
  "tutors": [
    {
      "id": "tutor-123",
      "name": "Dr. Sarah Chen",
      "avatar": "/avatars/sarah.jpg",
      "bio": "PhD in Mathematics with 10+ years teaching experience...",
      "subjects": ["math", "precalculus"],
      "rating": 4.8,
      "reviewCount": 47,
      "hourlyRate": 80.00,
      "currency": "SGD",
      "availability": ["Monday", "Wednesday", "Friday"],
      "nextAvailableSlot": "2026-02-20T10:00:00Z",
      "totalStudents": 156,
      "totalClasses": 320
    }
  ]
}
```

---

## Testing Checklist

- [ ] API returns tutors filtered by subject
- [ ] Page shows "Choose a Course/Tutor" title
- [ ] Tabs switch between Courses and Tutors
- [ ] Empty states handled for both tabs
- [ ] Loading states show skeletons
- [ ] Back button works correctly
- [ ] Tutor cards display all information
- [ ] Book buttons navigate correctly
- [ ] Mobile responsive layout

---

## Estimated Effort
- API endpoint: 1 hour
- TutorCard component: 1 hour
- TutorList component: 1 hour
- Page modifications: 1 hour
- Testing & polish: 1 hour

**Total: ~5 hours**
