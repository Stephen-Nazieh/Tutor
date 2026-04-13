# Deprecated Items Audit Report

**Generated**: 2026-04-10  
**Scope**: Post curriculum→course rename + schema cleanup  
**Total Files Analyzed**: 600+ TypeScript files  

---

## Executive Summary

| Category | Count | Risk Level | Action Required |
|----------|-------|------------|-----------------|
| Deprecated Tables | 1 | Low | Safe to drop after data migration |
| Deprecated Types | 3 | Low | Can be removed in next major version |
| Deprecated Fields | 1 | Medium | Still referenced in 103 locations |
| Deprecated Hooks | 1 | Low | Stub implementations in place |
| Deprecated Services | 1 | Low | No-op implementations |

---

## 1. Deprecated Database Tables

### 1.1 `CourseCatalog` Table
- **Location**: `src/lib/db/schema/tables/course.ts:60`
- **Status**: `@deprecated` - Being replaced by category system
- **Current State**: Exported for backward compatibility only
- **Migration Path**: Data already migrated to `course` table's `categories` array
- **Recommendation**: Remove export after 6 months if no references found

```typescript
/**
 * @deprecated CourseCatalog is being replaced by the category system.
 * Kept for backward compatibility during migration.
 */
export const courseCatalog = pgTable('CourseCatalog', {
  // ... columns
});
```

**Check for remaining references:**
```bash
grep -r "courseCatalog\|CourseCatalog" src/ --include="*.ts" --include="*.tsx"
```

---

## 2. Deprecated Type Aliases (Builder Types)

### 2.1 `Module` Type
- **Location**: `src/app/[locale]/tutor/dashboard/components/builder-types.ts:269-270`
- **Replacement**: Use `CourseBuilderNode` instead

### 2.2 `CourseBuilderModule` Type
- **Location**: `src/app/[locale]/tutor/dashboard/components/builder-types.ts:272-273`
- **Replacement**: Use `CourseBuilderNode` instead

### 2.3 `quizzes` Property in `CourseBuilderNodeBase`
- **Location**: `src/app/[locale]/tutor/dashboard/components/builder-types.ts:250-251`
- **Replacement**: Legacy quiz items migrated to `homework` (Assessment type)

**All three aliases:**
```typescript
/** @deprecated legacy lesson quiz items are migrated into `homework` (Assessment) */
quizzes?: Quiz[]

/** @deprecated Use CourseBuilderNode instead - kept for backward compatibility */
export type Module = CourseBuilderNode

/** @deprecated Use CourseBuilderNode instead - kept for backward compatibility */
export type CourseBuilderModule = CourseBuilderNode
```

---

## 3. Deprecated Fields (HIGH PRIORITY)

### 3.1 `gradeLevel` Field
**Status**: Removed from database schema but **still referenced in 103+ locations**

**Database Schema**: Already removed from:
- ✅ `profile` table
- ✅ `liveSession` table
- ✅ Migration file `0030_remove_grade_level_from_profile_and_session.sql`

**Still Active In**:
| Location | Type | Lines |
|----------|------|-------|
| `lib/validation/schemas.ts` | Zod schema | 123, 138, 208, 227, 255, 330 |
| `lib/agents/course-service.ts` | Service param | 5, 11 |
| `lib/agents/shared-data.test.ts` | Test data | 42 |
| `lib/ai/prompts/course-description.ts` | AI prompt | 3, 7 |
| `lib/security/ai-sanitization.ts` | Security util | 220-274 |
| `components/student-profile.tsx` | UI component | 39, 64, 82, 176, 202-203 |
| `components/parent/ParentCourseViewer.tsx` | UI component | 21 |
| `components/tutor/MyPageTabsSection.tsx` | UI component | 32, 343-344, 461 |
| `app/api/courses/generate-description/route.ts` | API route | 14, 23 |
| `app/api/tutor/courses/[id]/builder-generate/route.ts` | API route | 38, 51, 164 |
| `app/api/tutor/ai-assistant/generate/route.ts` | API route | 29, 73, 84, 112, 122 |
| `app/api/tutor/ai-assistant/lesson-plan/route.ts` | API route | 20, 75 |
| `app/api/user/profile/route.ts` | API route | 47, 77 |
| `app/[locale]/student/settings/page.tsx` | Page | 51, 73, 122, 295, 298 |
| `app/[locale]/student/onboarding/page.tsx` | Page | 71, 120, 239, 242, 307 |
| `app/[locale]/tutor/dashboard/components/CreateClassDialog.tsx` | Component | 73, 103, 137, 236-237 |
| `app/[locale]/tutor/dashboard/components/CreateCourseDialog.tsx` | Component | 65, 172, 183, 321-322, 354 |
| `lib/registration/register-user.ts` | Registration | 335 |
| `lib/public/mock-tutors.ts` | Mock data | 6, 43, 56, 81, 106 |
| `lib/tutoring/categories-new.ts` | Categories | 21, 216-217 |
| Multiple student/tutor pages | Various | ~40 more locations |

**Impact Analysis**:
- ❌ Creates confusion - field in schema but not in database
- ❌ AI prompts still use grade level for prompt generation
- ❌ Forms still accept and validate gradeLevel
- ⚠️ Mock data still relies on grade levels

**Migration Strategy**:
1. **Phase 1 (Immediate)**: Remove from validation schemas to prevent new data
2. **Phase 2 (Short-term)**: Update AI prompts to use `difficulty` + `subject` instead
3. **Phase 3 (Medium-term)**: Remove from UI components, use `difficulty` badge instead
4. **Phase 4 (Long-term)**: Remove from mock data and tests

---

## 4. Deprecated React Hooks

### 4.1 `useStudentPerformance` Hook
- **Location**: `src/hooks/use-student-performance.ts:1-5`
- **Status**: `@deprecated` - Legacy performance tracking
- **Replacement**: Use task submission analytics instead

```typescript
/**
 * React Hook for Student Performance
 * @deprecated Legacy performance tracking - use task submission analytics instead
 */
```

**Current Implementation**: Returns stub/no-op functions

---

## 5. Deprecated Services

### 5.1 Engagement Analytics Service
- **Location**: `src/lib/reports/engagement-analytics.ts`
- **Status**: All functions return no-op/legacy responses

```typescript
// Legacy engagement analytics - functionality moved to new analytics system
export async function generateEngagementReport() {
  return {
    error: 'Legacy engagement analytics removed. Use new analytics dashboard.',
  }
}

export async function calculateEngagementMetrics() {
  return { engagement: 0, participation: 0 }
}

export async function calculateClassEngagement(classId: string) {
  return { classId, engagement: 0, participation: 0, activeStudents: 0 }
}
```

---

## 6. Clean-up Recommendations

### 6.1 Immediate Actions (This Week)

1. **Remove `gradeLevel` from validation schemas**
   ```bash
   # File: src/lib/validation/schemas.ts
   # Remove lines: 123, 138, 208, 227, 255, 330
   ```

2. **Add deprecation warnings to AI service**
   ```typescript
   if (params.gradeLevel) {
     console.warn('[DEPRECATED] gradeLevel parameter is deprecated, use difficulty instead');
   }
   ```

### 6.2 Short-term Actions (Next 2 Weeks)

1. **Update AI prompts** to prefer `difficulty` over `gradeLevel`
2. **Add @deprecated JSDoc** to all type definitions still using gradeLevel
3. **Update UI components** to show `difficulty` badges instead of `gradeLevel`

### 6.3 Medium-term Actions (Next Month)

1. **Audit all API routes** for gradeLevel in request/response bodies
2. **Update mock data** to use difficulty-based categories
3. **Create migration guide** for any external API consumers

### 6.4 Long-term Actions (Next Quarter)

1. **Remove deprecated type aliases** (Module, CourseBuilderModule)
2. **Drop CourseCatalog table** from database (after confirmation)
3. **Delete engagement-analytics.ts** file entirely

---

## 7. Migration Scripts

### 7.1 Safe Removal Check Script
```bash
#!/bin/bash
# check-deprecated.sh

echo "=== Deprecated Items Check ==="
echo ""
echo "1. CourseCatalog references:"
grep -r "courseCatalog\|CourseCatalog" src/ --include="*.ts" --include="*.tsx" | grep -v "^src/lib/db/schema" | wc -l

echo ""
echo "2. Module type references:"
grep -r "\bModule\b" src/ --include="*.ts" --include="*.tsx" | grep -v "node_modules" | wc -l

echo ""
echo "3. gradeLevel references:"
grep -r "gradeLevel" src/ --include="*.ts" --include="*.tsx" | wc -l

echo ""
echo "4. useStudentPerformance imports:"
grep -r "useStudentPerformance" src/ --include="*.ts" --include="*.tsx" | wc -l

echo ""
echo "5. engagement-analytics imports:"
grep -r "engagement-analytics" src/ --include="*.ts" --include="*.tsx" | wc -l
```

---

## 8. Appendix: Complete File List

### Files with @deprecated annotations:
1. `src/hooks/use-student-performance.ts` (lines 1-5)
2. `src/lib/db/schema/tables/course.ts` (line 60)
3. `src/app/[locale]/tutor/dashboard/components/builder-types.ts` (lines 250, 269, 272)
4. `src/lib/reports/engagement-analytics.ts` (header comment)

### Files with gradeLevel (103 total):
- See section 3.1 above for complete list

---

## 9. Verification Checklist

- [ ] No database migration errors during deployment
- [ ] CourseCatalog table can be safely dropped
- [ ] gradeLevel removed from all validation schemas
- [ ] AI prompts work without gradeLevel parameter
- [ ] UI components display difficulty instead of gradeLevel
- [ ] All tests pass without gradeLevel references
- [ ] Mock data updated to use difficulty-based structure
- [ ] Documentation updated for external API consumers

---

**Next Review Date**: 2026-05-10  
**Owner**: Engineering Team  
**Related Docs**: `AGENTS.md`, `DATABASE_SCHEMA.md`
