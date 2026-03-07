# Solocorn AI Architecture

## Overview
Solocorn uses a multi-provider AI system with automatic fallback for tutoring, content generation, and real-time assistance.

## AI Provider Chain (Updated: Kimi Primary)

```
┌─────────────────────────────────────────────────────────────────┐
│                     AI ORCHESTRATOR                              │
│              (src/lib/ai/orchestrator.ts)                       │
├─────────────────────────────────────────────────────────────────┤
│  Priority 1: Kimi K2.5 (Moonshot AI)  ◄── PRIMARY (You set key) │
│  Priority 2: Ollama (Local Llama 3.1) ◄── Fallback if Kimi fails│
│  Priority 3: Zhipu GLM-4              ◄── Final fallback         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AI SERVICES                                 │
├─────────────────────────────────────────────────────────────────┤
│  • Tutor Service      (src/lib/ai/tutor-service.ts)             │
│  • Modular Tutor      (src/lib/ai/modular-tutor.ts)             │
│  • Task Generator     (src/lib/ai/task-generator.ts)             │
│  • Memory Service     (src/lib/ai/memory-service.ts)             │
└─────────────────────────────────────────────────────────────────┘
```

## Folder Structure

```
tutorme-app/src/lib/ai/
│
├── orchestrator.ts          # Main entry - manages provider fallback
├── kimi.ts                  # Kimi K2.5 API integration (PRIMARY)
├── ollama.ts                # Local Ollama integration (FALLBACK)
├── zhipu.ts                 # Zhipu GLM API integration (FALLBACK)
│
├── tutor-service.ts         # High-level tutoring interface
├── modular-tutor.ts         # Subject-specific tutoring logic
├── task-generator.ts        # Quiz/assessment generation
├── memory-service.ts        # Conversation memory/context
├── prompts.ts               # Base prompt templates
│
├── teaching-prompts/        # Modular prompt system
│   ├── index.ts
│   ├── core-identity.ts     # AI personality definition
│   ├── prompt-builder.ts    # Dynamic prompt construction
│   ├── personalities.ts     # Different tutor personalities
│   ├── common.ts            # Shared prompts
│   ├── math.ts              # Math-specific prompts
│   ├── english.ts           # English-specific prompts
│   └── gamification-context.ts  # XP/achievement context
│
├── subjects/                # Subject-specific AI logic
│   ├── index.ts
│   ├── types.ts
│   ├── mathematics.ts
│   ├── physics.ts
│   ├── chemistry.ts
│   └── english.ts
│
└── types/
    └── context.ts           # TypeScript types for AI context
```

## UI Components (AI Chat Interface)

```
tutorme-app/src/components/ai-tutor/
│
├── ai-tutor-chat.tsx        # MAIN CHAT INTERFACE
├── ai-avatar.tsx            # Tutor avatar display
├── ai-whiteboard.tsx        # Collaborative whiteboard
├── ai-activity-area.tsx     # Activity/lesson display
├── curriculum-sidebar.tsx   # Curriculum navigation
├── topic-sidebar.tsx        # Topic selection
├── collapsible-sidebar.tsx  # Collapsible nav
└── tutor-preferences.tsx    # Tutor settings

src/components/ai-chat/
└── index.tsx                # Generic AI chat widget
```

## API Routes (Backend)

```
tutorme-app/src/app/api/
│
├── ai/
│   └── chat/
│       └── route.ts         # POST /api/ai/chat
│
└── tutor/
    └── ai/
        └── briefing/
            └── route.ts     # GET /api/tutor/ai/briefing
```

## UI Buttons Linked to AI

| Button Location | Button Text | Action | AI Function Called |
|----------------|-------------|--------|-------------------|
| `/student/ai-tutor` | Chat input | Send message | `chatWithFallback()` |
| `/student/ai-tutor` | "Ask AI Tutor" | Open chat | Connects to orchestrator |
| `/tutor/dashboard` | "AI Briefing" | Generate briefing | `generateWithFallback()` with tutor prompts |
| `/tutor/live-class` | "AI Monitor" | Real-time monitoring | WebSocket + AI analysis |
| Course Builder | "Generate Questions" | Auto-generate quiz | `task-generator.ts` |
| Course Builder | "AI Grade" | Grade submissions | `generateWithFallback()` with grading prompts |
| Student Quiz | "Hint" | Get hint | `chatWithFallback()` with Socratic prompt |

## Communication Flow

```
User clicks "Ask AI" in UI
         │
         ▼
┌────────────────────┐
│  ai-tutor-chat.tsx │
│  (React Component) │
└────────┬───────────┘
         │ HTTP POST
         ▼
┌────────────────────┐
│  /api/ai/chat      │
│  (API Route)       │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│  orchestrator.ts   │
│  (Tries Kimi 1st)  │
└────────┬───────────┘
         │ API Call
         ▼
┌────────────────────┐
│  kimi.ts           │
│  (Kimi K2.5)       │
└────────┬───────────┘
         │ Response
         ▼
┌────────────────────┐
│  Stream to UI      │
└────────────────────┘
```

## Environment Variables

```bash
# PRIMARY - Kimi (Moonshot AI)
KIMI_API_KEY=your_kimi_api_key_here

# FALLBACK 1 - Ollama (Local)
OLLAMA_URL=http://localhost:11434

# FALLBACK 2 - Zhipu AI
ZHIPU_API_KEY=your_zhipu_api_key_here

# Optional - Mock mode for testing
MOCK_AI=true
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `orchestrator.ts` | Main AI entry point - use this for all AI calls |
| `kimi.ts` | Kimi API integration (now primary) |
| `tutor-service.ts` | High-level tutoring functions |
| `teaching-prompts/` | All prompts for different subjects |
| `ai-tutor-chat.tsx` | Main chat UI component |

## How to Use AI in Code

```typescript
// Always use the orchestrator, never call providers directly
import { generateWithFallback, chatWithFallback } from '@/lib/ai/orchestrator'

// For single prompts
const result = await generateWithFallback(prompt, { temperature: 0.7 })

// For chat/conversations
const result = await chatWithFallback(messages, { maxTokens: 2048 })

// Result format: { content: string, provider: 'kimi'|'ollama'|'zhipu', latencyMs: number }
```
