# Disabled Features

This document tracks features that have been temporarily disabled in the TutorMe platform.

---

## ✅ Re-enabled Features (February 2026)

### 1. Study Groups

**Status:** ✅ **RE-ENABLED**  
**Location:** Student Dashboard (`/student/dashboard`) and Left Navigation  
**Component:** `StudyGroups.tsx`  
**Page:** `/student/study-groups`

The Study Groups feature has been re-enabled with:
- Full left navigation integration
- Dashboard widget restored
- Join group functionality active
- API endpoints functional

---

### 2. Skills (Skill Radar)

**Status:** ✅ **RE-ENABLED**  
**Location:** Student Dashboard (`/student/dashboard`) and Left Navigation  
**Component:** `SkillRadar.tsx`  
**Page:** `/student/skills`

The Skills feature has been re-enabled with:
- New dedicated `/student/skills` page
- Left navigation link ("My Skills")
- Dashboard widget restored
- Progress tracking by subject

---

## 📋 Currently Disabled Features

*No features are currently disabled.*

---

## 🎯 Re-enabling Checklist

When re-enabling these features, ensure:

- [ ] Components are imported correctly
- [ ] State variables are declared
- [ ] API endpoints are functional
- [ ] Data fetching includes all necessary endpoints
- [ ] Handler functions are restored
- [ ] TypeScript types are correctly referenced
- [ ] UI renders without errors
- [ ] Mobile responsiveness is maintained
- [ ] Accessibility attributes are preserved

---

## 📝 Notes

- Both features are **commented out** (not deleted) to preserve the code
- API endpoints remain active but are not called
- Related pages (e.g., `/student/study-groups`) remain accessible via direct URL
- Database tables and relationships are preserved
- No data migration needed to re-enable

---

## 🚀 Future Enhancement Ideas

When re-enabling these features, consider:

### Study Groups Enhancements
- Real-time chat within groups
- Group video calls
- Shared whiteboard
- Group assignments
- Study session scheduling
- Peer review system

### Skills Enhancements
- Skill-based course recommendations
- Skill challenges and badges
- Skill comparison with peers
- Skill-based learning paths
- Teacher-assessed skills
- Industry-standard skill benchmarks

---

*Last Updated: February 2026*
