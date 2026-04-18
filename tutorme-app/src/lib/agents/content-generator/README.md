# 📝 Content Generator Agent

## UI Location
**Primary UI:** `/tutor/insights?tab=builder&courseId=[id]` - Course Builder  
**Secondary UI:** `/admin/content` - Admin content management  
**Access:** Tutors, Admins

## Purpose
Generates quizzes, lessons, and educational content based on course requirements.

## Data Access

### Can READ:
- `Course` (all modules/lessons) - To align content
- `Student` (grade level, current level) - To adjust difficulty
- `ProgressData` (common struggles) - To target weak areas
- `Quiz` (existing questions) - To avoid duplication

### Can WRITE:
- `Quiz` (creates new quizzes)
- `Question` (creates individual questions)
- `Lesson.content` (generates lesson material)

### Cannot Access:
- `Conversation` (private student chats)
- `LiveSession` (real-time data)
- Individual student answers/scores

## Prompt Files
Edit these to change content generation:

1. `prompts/quiz-generator.ts` - Quiz creation prompts
2. `prompts/lesson-generator.ts` - Lesson content prompts
3. `prompts/difficulty-adjuster.ts` - Difficulty calibration

## Environment Variables
```bash
KIMI_API_KEY=your_key_here
```
