# Page Navigation Implementation Plan

## Executive Summary

This plan addresses inconsistent page navigation across the Solocorn application. The goal is to ensure **every page has proper back navigation** using a **back arrow icon** (not text), with consistent behavior across all user roles.

## Current State Analysis

### ✅ Pages with Proper Navigation (ArrowLeft Icon)
- `/tutor/whiteboards/[id]/page.tsx` - ArrowLeft icon button
- `/tutor/reports/[studentId]/page.tsx` - ArrowLeft icon button  
- `/tutor/courses/[id]/tasks/page.tsx` - ArrowLeft icon button
- `/parent/students/[studentId]/page.tsx` - ArrowLeft icon button

### ⚠️ Pages with Text-Based Navigation (Needs Fix)
- `/tutor/courses/[id]/page.tsx` - "Back to Course Builder" text
- `/tutor/courses/new/page.tsx` - "Back to My Page" text
- `/tutor/courses/[id]/enrollments/page.tsx` - "Back to Course" text
- `/student/quizzes/[id]/page.tsx` - "Back to Quizzes" text
- `/student/learn/[contentId]/page.tsx` - ChevronLeft icon (inconsistent)

### ❌ Pages Missing Back Navigation (Needs Addition)

#### Student Pages
- `/student/subjects/[subjectCode]/page.tsx`
- `/student/subjects/[subjectCode]/courses/page.tsx`
- `/student/subjects/[subjectCode]/courses/[curriculumId]/details/page.tsx`
- `/student/subjects/[subjectCode]/chat/page.tsx`
- `/student/subjects/[subjectCode]/signup/page.tsx`
- `/student/ai-tutor/browse/page.tsx`
- `/student/ai-tutor/english/page.tsx`
- `/student/ai-tutor/schedule/page.tsx`
- `/student/quizzes/page.tsx`
- `/student/review/[contentId]/page.tsx`
- `/student/live/[sessionId]/page.tsx`
- `/student/live-class/[sessionId]/page.tsx`

#### Tutor Pages
- `/tutor/courses/[id]/builder/page.tsx` (layout needs back button)
- `/tutor/courses/[id]/tasks/[taskId]/analytics/page.tsx`
- `/tutor/quizzes/[id]/page.tsx`
- `/tutor/my-page/page.tsx`
- `/tutor/insights/page.tsx`
- `/tutor/calendar/page.tsx`
- `/tutor/classes/page.tsx`
- `/tutor/lessons/page.tsx`
- `/tutor/groups/page.tsx`
- `/tutor/groups/list/page.tsx`
- `/tutor/group-builder/page.tsx`
- `/tutor/students/page.tsx`
- `/tutor/students/list/page.tsx`
- `/tutor/revenue/page.tsx`
- `/tutor/question-bank/page.tsx`
- `/tutor/resources/page.tsx`
- `/tutor/ai-assistant/page.tsx`
- `/tutor/pdf-tutoring/page.tsx`

#### Parent Pages
- `/parent/courses/[id]/page.tsx`
- `/parent/students/[studentId]/assignments/page.tsx`
- `/parent/students/[studentId]/ai-tutor/page.tsx`

#### Admin Pages
- All admin pages lack consistent back navigation

#### Registration/Onboarding Pages
- `/register/student/page.tsx`
- `/register/tutor/page.tsx`
- `/register/parent/page.tsx`
- `/register/admin/page.tsx`
- `/onboarding/student/page.tsx`
- `/onboarding/tutor/page.tsx`

#### Other Pages
- `/payment/page.tsx`
- `/payment/success/page.tsx`
- `/payment/cancel/page.tsx`
- `/forgot-password/page.tsx`
- `/categories/page.tsx`
- `/api-docs/page.tsx`

## Implementation Strategy

### Phase 1: Create Reusable BackButton Component

Create `src/components/navigation/BackButton.tsx`:

```tsx
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  href?: string
  fallbackHref?: string
  className?: string
  variant?: 'ghost' | 'outline' | 'default'
  size?: 'sm' | 'default' | 'icon'
}

export function BackButton({
  href,
  fallbackHref = '/',
  className,
  variant = 'ghost',
  size = 'icon',
}: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      return // Let Link handle navigation
    }
    // Try to go back, otherwise go to fallback
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackHref)
    }
  }

  const buttonContent = (
    <Button
      variant={variant}
      size={size}
      onClick={!href ? handleClick : undefined}
      className={cn(
        'h-9 w-9 rounded-full p-0 transition-colors hover:bg-gray-100',
        className
      )}
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {buttonContent}
      </Link>
    )
  }

  return buttonContent
}

// Convenience component for role-based fallbacks
export function StudentBackButton(props: Omit<BackButtonProps, 'fallbackHref'>) {
  return <BackButton {...props} fallbackHref="/student/dashboard" />
}

export function TutorBackButton(props: Omit<BackButtonProps, 'fallbackHref'>) {
  return <BackButton {...props} fallbackHref="/tutor/dashboard" />
}

export function ParentBackButton(props: Omit<BackButtonProps, 'fallbackHref'>) {
  return <BackButton {...props} fallbackHref="/parent/dashboard" />
}

export function AdminBackButton(props: Omit<BackButtonProps, 'fallbackHref'>) {
  return <BackButton {...props} fallbackHref="/admin" />
}
```

### Phase 2: Update Layouts

#### Student Layout (`src/app/[locale]/student/layout.tsx`)
- Already has back button for tutor directory route ✓
- Add back button for other nested routes

#### Tutor Layout (`src/app/[locale]/tutor/layout.tsx`)
- Currently hides sidebar for: course builder, live class, my-page, insights, lesson bank, account pages
- These pages need their own back navigation (in the page or their layouts)

#### Parent Layout (`src/app/[locale]/parent/layout.tsx`)
- Add back button for nested routes like student detail pages

### Phase 3: Update Individual Pages

#### Pattern for Page Updates:

Each page header should follow this pattern:

```tsx
<div className="flex items-center gap-4">
  <BackButton fallbackHref="/ROLE/dashboard" />
  <div>
    <h1 className="text-2xl font-bold">Page Title</h1>
    <p className="text-gray-500">Optional subtitle</p>
  </div>
</div>
```

### Phase 4: Specific Page Updates

#### Student Pages

| Page | Current State | Action | Fallback URL |
|------|--------------|--------|--------------|
| learn/[contentId] | ChevronLeft icon | Change to ArrowLeft | /student/dashboard |
| quizzes/[id] | "Back to Quizzes" text | Replace with icon only | /student/quizzes |
| subjects/[subjectCode] | No back button | Add BackButton | /student/dashboard |
| subjects/[subjectCode]/courses | No back button | Add BackButton | /student/subjects/[subjectCode] |
| subjects/[subjectCode]/courses/[curriculumId] | Has ArrowLeft with text | Remove text, icon only | /student/subjects/[subjectCode]/courses |
| subjects/[subjectCode]/courses/[curriculumId]/details | No back button | Add BackButton | /student/subjects/[subjectCode]/courses |
| ai-tutor/browse | No back button | Add BackButton | /student/ai-tutor |
| ai-tutor/english | No back button | Add BackButton | /student/ai-tutor |
| ai-tutor/schedule | No back button | Add BackButton | /student/ai-tutor |
| live/[sessionId] | No back button | Add BackButton | /student/dashboard |
| live-class/[sessionId] | No back button | Add BackButton | /student/dashboard |
| review/[contentId] | No back button | Add BackButton | /student/courses |

#### Tutor Pages

| Page | Current State | Action | Fallback URL |
|------|--------------|--------|--------------|
| courses/[id] | "Back to Course Builder" text | Remove text, icon only | /tutor/courses |
| courses/new | "Back to My Page" text | Remove text, icon only | /tutor/my-page |
| courses/[id]/enrollments | "Back to Course" text | Remove text, icon only | /tutor/courses/[id] |
| courses/[id]/tasks | ArrowLeft icon ✓ | No change needed | - |
| courses/[id]/tasks/[taskId]/analytics | No back button | Add BackButton | /tutor/courses/[id]/tasks |
| courses/[id]/builder | No back button in layout | Add BackButton to layout | /tutor/courses/[id] |
| quizzes/[id] | No back button | Add BackButton | /tutor/quizzes |
| whiteboards/[id] | ArrowLeft icon ✓ | No change needed | - |
| reports/[studentId] | ArrowLeft icon ✓ | No change needed | - |
| my-page | No back button | Add BackButton | /tutor/dashboard |
| insights | No back button | Add BackButton | /tutor/dashboard |
| calendar | No back button | Add BackButton | /tutor/dashboard |
| classes | No back button | Add BackButton | /tutor/dashboard |
| lessons | No back button | Add BackButton | /tutor/dashboard |
| groups | No back button | Add BackButton | /tutor/dashboard |
| groups/list | No back button | Add BackButton | /tutor/groups |
| group-builder | No back button | Add BackButton | /tutor/groups |
| students | No back button | Add BackButton | /tutor/dashboard |
| students/list | No back button | Add BackButton | /tutor/students |
| revenue | No back button | Add BackButton | /tutor/dashboard |
| question-bank | No back button | Add BackButton | /tutor/dashboard |
| resources | No back button | Add BackButton | /tutor/dashboard |
| ai-assistant | No back button | Add BackButton | /tutor/dashboard |
| pdf-tutoring | No back button | Add BackButton | /tutor/dashboard |

#### Parent Pages

| Page | Current State | Action | Fallback URL |
|------|--------------|--------|--------------|
| students/[studentId] | ArrowLeft icon ✓ | No change needed | - |
| students/[studentId]/assignments | No back button | Add BackButton | /parent/students/[studentId] |
| students/[studentId]/ai-tutor | No back button | Add BackButton | /parent/students/[studentId] |
| courses/[id] | No back button | Add BackButton | /parent/courses |

#### Registration/Auth Pages

| Page | Action | Fallback URL |
|------|--------|--------------|
| register/student | Add BackButton | / |
| register/tutor | Add BackButton | / |
| register/parent | Add BackButton | / |
| register/admin | Add BackButton | / |
| onboarding/student | Add BackButton | /student/dashboard |
| onboarding/tutor | Add BackButton | /tutor/dashboard |
| forgot-password | Add BackButton | /login |

#### Payment Pages

| Page | Action | Fallback URL |
|------|--------|--------------|
| payment | Add BackButton | /student/dashboard |
| payment/success | Add BackButton | /student/courses |
| payment/cancel | Add BackButton | /student/dashboard |

### Phase 5: Standardize Error States

All error states should have consistent navigation:

```tsx
if (!data) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="max-w-md">
        <CardContent className="pt-6 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h2 className="mb-2 text-xl font-bold">Not Found</h2>
          <p className="mb-4 text-gray-500">Content could not be loaded</p>
          <BackButton fallbackHref="/ROLE/dashboard" />
        </CardContent>
      </Card>
    </div>
  )
}
```

## Files to Modify

### New Files
1. `src/components/navigation/BackButton.tsx` - Main reusable component
2. `src/components/navigation/index.ts` - Barrel export

### Modified Files (Partial List)

#### Student
- `src/app/[locale]/student/learn/[contentId]/page.tsx`
- `src/app/[locale]/student/quizzes/[id]/page.tsx`
- `src/app/[locale]/student/subjects/[subjectCode]/page.tsx`
- `src/app/[locale]/student/subjects/[subjectCode]/courses/page.tsx`
- `src/app/[locale]/student/subjects/[subjectCode]/courses/[curriculumId]/page.tsx`
- `src/app/[locale]/student/subjects/[subjectCode]/courses/[curriculumId]/details/page.tsx`
- `src/app/[locale]/student/subjects/[subjectCode]/chat/page.tsx`
- `src/app/[locale]/student/ai-tutor/browse/page.tsx`
- `src/app/[locale]/student/ai-tutor/english/page.tsx`
- `src/app/[locale]/student/ai-tutor/schedule/page.tsx`
- `src/app/[locale]/student/live/[sessionId]/page.tsx`
- `src/app/[locale]/student/live-class/[sessionId]/page.tsx`
- `src/app/[locale]/student/review/[contentId]/page.tsx`

#### Tutor
- `src/app/[locale]/tutor/courses/[id]/page.tsx`
- `src/app/[locale]/tutor/courses/new/page.tsx`
- `src/app/[locale]/tutor/courses/[id]/enrollments/page.tsx`
- `src/app/[locale]/tutor/courses/[id]/builder/layout.tsx`
- `src/app/[locale]/tutor/courses/[id]/tasks/[taskId]/analytics/page.tsx`
- `src/app/[locale]/tutor/quizzes/[id]/page.tsx`
- `src/app/[locale]/tutor/my-page/page.tsx`
- `src/app/[locale]/tutor/insights/page.tsx`
- `src/app/[locale]/tutor/calendar/page.tsx`
- `src/app/[locale]/tutor/classes/page.tsx`
- `src/app/[locale]/tutor/lessons/page.tsx`
- `src/app/[locale]/tutor/groups/page.tsx`
- `src/app/[locale]/tutor/groups/list/page.tsx`
- `src/app/[locale]/tutor/group-builder/page.tsx`
- `src/app/[locale]/tutor/students/page.tsx`
- `src/app/[locale]/tutor/students/list/page.tsx`
- `src/app/[locale]/tutor/revenue/page.tsx`
- `src/app/[locale]/tutor/question-bank/page.tsx`
- `src/app/[locale]/tutor/resources/page.tsx`
- `src/app/[locale]/tutor/ai-assistant/page.tsx`
- `src/app/[locale]/tutor/pdf-tutoring/page.tsx`

#### Parent
- `src/app/[locale]/parent/students/[studentId]/assignments/page.tsx`
- `src/app/[locale]/parent/students/[studentId]/ai-tutor/page.tsx`
- `src/app/[locale]/parent/courses/[id]/page.tsx`

#### Auth/Other
- `src/app/[locale]/register/student/page.tsx`
- `src/app/[locale]/register/tutor/page.tsx`
- `src/app/[locale]/register/parent/page.tsx`
- `src/app/[locale]/register/admin/page.tsx`
- `src/app/[locale]/onboarding/student/page.tsx`
- `src/app/[locale]/onboarding/tutor/page.tsx`
- `src/app/[locale]/forgot-password/page.tsx`
- `src/app/[locale]/payment/page.tsx`
- `src/app/[locale]/payment/success/page.tsx`
- `src/app/[locale]/payment/cancel/page.tsx`

## Implementation Order

1. **Create BackButton component** (Phase 1)
2. **Update Student pages** (Phase 3 - Student)
3. **Update Tutor pages** (Phase 3 - Tutor)
4. **Update Parent pages** (Phase 3 - Parent)
5. **Update Auth/Other pages** (Phase 3 - Auth)
6. **Test and verify** all navigation flows work correctly

## Design Guidelines

### Back Button Style
- **Icon**: ArrowLeft from lucide-react
- **Size**: 20x20px (h-5 w-5)
- **Button size**: icon (36x36px)
- **Variant**: ghost (transparent background)
- **Shape**: Circular (rounded-full)
- **Hover**: Light gray background (hover:bg-gray-100)

### Placement
- Always at the **leftmost** position in page header
- **Vertically centered** with page title
- **Gap**: 1rem (gap-4) between back button and title

### Behavior
1. If `href` prop provided: Navigate to that specific URL
2. If no `href` and browser history available: `router.back()`
3. If no history: Navigate to `fallbackHref`

### No Text Label
- Back button should be **icon-only**
- No "Back" or "Back to X" text
- Screen reader support via `aria-label`

## Testing Checklist

- [ ] All pages have visible back button
- [ ] Back button uses ArrowLeft icon consistently
- [ ] No page uses text-based back navigation
- [ ] Back navigation works correctly (goes to expected page)
- [ ] Fallback navigation works (when no history)
- [ ] Mobile responsiveness verified
- [ ] Accessibility (keyboard navigation, screen readers)
