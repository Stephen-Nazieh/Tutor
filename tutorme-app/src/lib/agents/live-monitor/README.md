# 👁️ Live Monitor Agent

## UI Location
**Primary UI:** `/tutor/live-class/[sessionId]` - Real-time monitoring panel  
**Secondary UI:** Engagement heatmap, alert notifications  
**Access:** Tutors (real-time view), Students (monitored)

## Purpose
Monitors live classroom in real-time:
- Tracks student engagement (1 tutor : 50 students)
- Detects confusion/misunderstanding
- Alerts tutor when intervention needed
- Suggests real-time adjustments

## Data Access

### Can READ:
- `LiveSession` (all real-time data) - Current session state
- `Student` (profiles) - To personalize alerts
- `ProgressData` (past performance) - Context for alerts
- Chat messages (real-time) - To detect confusion
- Video/audio engagement metrics

### Can WRITE:
- `LiveSession.engagement` - Updates engagement scores
- `LiveSession.confusionAlerts` - Creates alerts
- `LiveSession.participation` - Tracks participation

### Cannot Access:
- `Conversation` history (privacy)
- Other sessions' data
- Grades outside current session

## Prompt Files
Edit these to change monitoring behavior:

1. `prompts/engagement-analyzer.ts` - Engagement scoring
2. `prompts/confusion-detector.ts` - Confusion detection
3. `prompts/intervention-suggestions.ts` - Real-time suggestions

## Real-Time Flow
1. WebSocket streams student activity to agent
2. Agent analyzes every 30 seconds
3. Generates engagement scores
4. Creates alerts if needed
5. Suggests interventions to tutor

## Performance
- Must respond in < 2 seconds
- Processes 50 students simultaneously
- Lightweight analysis (not full LLM call every time)
