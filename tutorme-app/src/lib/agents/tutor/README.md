# 🤖 Tutor Agent

## UI Location
**Primary UI:** `/student/ai-tutor` - AI Tutor Chat Interface  
**Secondary UI:** Student dashboard "Ask AI" button in lesson pages  
**Access:** Students only

## Purpose
Provides Socratic tutoring to students. Never gives direct answers, guides students to discover concepts through questioning.

## Data Access

### Can READ:
- `Student` (all fields) - To personalize teaching style
- `Conversation` (all messages) - For context/memory
- `Course` (current lesson content) - To stay on topic
- `ProgressData` (student's struggles/strengths) - To focus on weak areas
- `Quiz` (previous attempts) - To review mistakes

### Can WRITE:
- `Conversation.messages` - Saves chat history
- `Conversation.summary` - Updates after each session
- `Message.metadata` - Tags intent/sentiment

### Cannot Access:
- `LiveSession` (belongs to Live Monitor)
- Other students' data (privacy)
- `Tutor` profile data

## Prompt Files
Edit these to change the tutor's behavior:

1. `prompts/system-prompt.ts` - Core personality and rules
2. `prompts/socratic-method.ts` - Questioning techniques
3. `prompts/subject-adaptations.ts` - Subject-specific styles
4. `prompts/personalities.ts` - Different tutor personas

## Environment Variables
```bash
KIMI_API_KEY=your_key_here  # Uses Kimi via orchestrator
```
