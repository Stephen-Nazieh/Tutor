# 📊 Briefing Agent

## UI Location
**Primary UI:** `/tutor/dashboard` - "AI Briefing" button  
**Secondary UI:** `/tutor/insights?sessionId=[sessionId]` - Pre-class briefing panel  
**Access:** Tutors only

## Purpose
Prepares tutors before class with AI-generated briefings about:
- Student preparedness
- Common misconceptions
- Who needs extra attention
- Suggested teaching strategies

## Data Access

### Can READ:
- `LiveSession` (student roster, topic) - To know who/what to brief on
- `ProgressData` (all students in session) - Performance analytics
- `Student` (profiles, learning styles) - To personalize advice
- `Curriculum` (lesson content) - To understand objectives
- `Conversation` (recent AI tutor chats) - To see student questions
- `QuizScore` (recent results) - To identify struggling students

### Can WRITE:
- `LiveSession.briefingData` - Saves generated briefing (cache)

### Cannot Access:
- Individual student private data beyond class scope
- Other tutors' sessions

## Prompt Files
Edit these to change briefing content:

1. `prompts/class-briefing.ts` - Main briefing generation
2. `prompts/student-spotlight.ts` - Individual student alerts
3. `prompts/teaching-strategies.ts` - Strategy suggestions

## How It Works
1. Tutor clicks "AI Briefing" before class
2. Agent analyzes all students in the session
3. Generates personalized briefing document
4. Highlights students needing attention
5. Suggests teaching strategies based on class composition
