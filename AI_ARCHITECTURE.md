# Solocorn AI Architecture

## Overview
Solocorn uses a multi-provider AI system with automatic fallback for tutoring, content generation, and real-time assistance.

## ADK Service (New)
All production AI calls can be routed through the Google ADK service in `services/adk/`.
The main app uses `ADK_BASE_URL` and `ADK_AUTH_TOKEN` to proxy AI requests to ADK agents.

## AI Provider Chain (Updated: Kimi Primary)

```
┌─────────────────────────────────────────────────────────────────┐
│                     AI ORCHESTRATOR                              │
│            (src/lib/agents/orchestrator-llm.ts)                 │
├─────────────────────────────────────────────────────────────────┤
│  Priority 1: Kimi K2.5 (Moonshot AI)  ◄── PRIMARY (You set key) │
│  Priority 2: Gemini (Google)          ◄── Fallback              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        AGENTS LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│  • Tutor Agent        (src/lib/agents/tutor)                     │
│  • Content Generator  (src/lib/agents/content-generator)         │
│  • Grading Agent      (src/lib/agents/grading)                   │
│  • Briefing Agent     (src/lib/agents/briefing)                  │
│  • Live Monitor       (src/lib/agents/live-monitor)              │
└─────────────────────────────────────────────────────────────────┘
```

## Folder Structure

```
tutorme-app/src/lib/agents/
│
├── orchestrator-llm.ts      # Provider fallback (Kimi -> Gemini)
├── orchestrator.ts          # Agent orchestration entry
├── shared-data.ts           # Shared data access layer
├── tutor/                   # Tutor agent
├── content-generator/       # Content generation agent
├── grading/                 # Grading agent
├── briefing/                # Tutor briefing agent
└── live-monitor/            # Live monitoring agent

tutorme-app/src/lib/ai/
│
├── kimi.ts                  # Kimi K2.5 API integration
├── gemini.ts                # Gemini API integration
├── tutor-service.ts         # Legacy tutor service (compat)
├── memory-service.ts        # Legacy memory service (compat)
├── prompts.ts               # Base prompt templates
└── subjects/                # Subject-specific tutoring logic
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

# FALLBACK - Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# Optional - Mock mode for testing
MOCK_AI=true

# ADK Service (Optional)
ADK_BASE_URL=http://localhost:4310
ADK_AUTH_TOKEN=dev-token
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
