# ✅ Grading Agent

## UI Location
**Primary UI:** `/tutor/courses/[id]/tasks` - Assignment grading interface  
**Secondary UI:** `/student/quizzes/[id]/results` - Auto-graded results  
**Access:** Tutors (primary), Students (view results)

## Purpose
Automatically grades student submissions, especially short answer and essay questions. Provides detailed feedback.

## Data Access

### Can READ:
- `Quiz` (questions, correct answers, rubrics) - To know correct answers
- `StudentAnswer` (student's submission) - To grade
- `Question` (grading rubric) - To apply consistent scoring
- `Student` (level, learning style) - To personalize feedback

### Can WRITE:
- `StudentAnswer.isCorrect` - Mark correctness
- `StudentAnswer.aiFeedback` - Provide feedback text
- `QuizScore.score` - Update total score
- `ProgressData` (update strengths/weaknesses)

### Cannot Access:
- `Conversation` (private chats)
- `LiveSession` (real-time data)
- Other students' answers (privacy)

## Prompt Files
Edit these to change grading behavior:

1. `prompts/short-answer-grader.ts` - Short answer grading
2. `prompts/essay-grader.ts` - Essay rubric and grading
3. `prompts/feedback-generator.ts` - Feedback tone and style

## Key Features
- Consistent rubric application
- Detects partial credit
- Identifies misconceptions
- Generates improvement suggestions
