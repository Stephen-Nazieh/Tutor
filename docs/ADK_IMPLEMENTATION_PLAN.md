# Google ADK Implementation Plan for Solocorn

## Executive Summary

This document outlines the migration from Solocorn's custom agent framework to **Google Agent Development Kit (ADK)**. ADK provides structured agent lifecycle management, tool integration, session memory, and streaming capabilities that align perfectly with Solocorn's tutoring platform needs.

---

## 1. Current Architecture vs ADK Mapping

### Current Custom Framework
```
┌─────────────────────────────────────────────────────────────┐
│                    AGENT ORCHESTRATOR                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │ Tutor Agent │ │   Grading   │ │ Content Generator   │   │
│  │             │ │   Agent     │ │                     │   │
│  └─────────────┘ └─────────────┘ └─────────────────────┘   │
│  ┌─────────────┐ ┌─────────────┐                           │
│  │  Briefing   │ │Live Monitor │                           │
│  │   Agent     │ │   Agent     │                           │
│  └─────────────┘ └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
         ↓                    ↓
   ┌─────────────┐    ┌─────────────┐
   │  Kimi API   │    │  Fallback  │
   │  (Primary)  │    │  (Gemini)  │
   └─────────────┘    └─────────────┘
```

### Proposed ADK Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                   ADK ROOT AGENT                             │
│              (SolocornSupervisorAgent)                       │
├─────────────────────────────────────────────────────────────┤
│                     Sub-Agents                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │TutorAgent   │ │GradingAgent │ │ContentGenAgent      │   │
│  │(LlmAgent)   │ │(LlmAgent)   │ │(LlmAgent)           │   │
│  └─────────────┘ └─────────────┘ └─────────────────────┘   │
│  ┌─────────────┐ ┌─────────────┐                           │
│  │BriefingAgent│ │LiveMonitor  │                           │
│  │(LlmAgent)   │ │Agent        │                           │
│  └─────────────┘ └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
         ↓                    ↓
   ┌─────────────┐    ┌─────────────┐
   │ ADK Runtime │    │ Tool Registry│
   │   Session   │    │  (Data Access)│
   │   Memory    │    └─────────────┘
   └─────────────┘
```

---

## 2. ADK Core Components Design

### 2.1 Root Agent: SolocornSupervisorAgent

**Purpose:** Entry point that routes requests to appropriate sub-agents

**Agent Type:** `Agent` (Base class with custom routing)

**Responsibilities:**
- Intent classification (which sub-agent should handle this?)
- Session management
- Error handling and fallback
- Response aggregation

**Configuration:**
```typescript
{
  name: 'solocorn_supervisor',
  model: 'gemini-2.0-flash', // or 'kimi-k2.5' via custom client
  description: 'Routes tutoring requests to specialized agents',
  instruction: `You are the Solocorn AI Supervisor. 
    Analyze the user's intent and delegate to the appropriate specialist:
    - TutorAgent for student questions and learning support
    - GradingAgent for grading submissions
    - ContentGenAgent for creating educational content
    - BriefingAgent for tutor preparation
    - LiveMonitorAgent for real-time classroom insights`
}
```

---

### 2.2 Sub-Agent 1: TutorAgent (Student Learning)

**Purpose:** Socratic tutoring for students

**Agent Type:** `LlmAgent`

**ADK Configuration:**
```typescript
{
  name: 'tutor_agent',
  model: 'gemini-2.0-flash',
  description: 'Socratic AI tutor for student learning',
  instruction: `You are a Socratic tutor using the Solocorn platform.
    NEVER give direct answers. Guide students to discover solutions.
    
    CONTEXT AVAILABLE:
    - Student profile (grade, learning style, level)
    - Conversation history
    - Curriculum content
    - Progress data
    
    RULES:
    1. Ask guiding questions
    2. Provide hints, not answers
    3. Adapt to student's learning style
    4. Reference curriculum when relevant`,
    
  tools: [
    'fetch_student_profile',
    'fetch_conversation_history',
    'fetch_curriculum',
    'fetch_progress_data',
    'save_message_to_conversation'
  ]
}
```

**Tools Required:**
| Tool | Purpose | Data Access |
|------|---------|-------------|
| `fetch_student_profile` | Get student preferences | READ: Student |
| `fetch_conversation_history` | Get last 10 messages | READ: Conversation |
| `fetch_curriculum` | Get lesson content | READ: Curriculum |
| `fetch_progress_data` | Check understanding | READ: ProgressData |
| `save_message_to_conversation` | Persist chat | WRITE: Conversation |

**UI Integration Points:**
- `/student/ai-tutor` - Main chat interface
- `/student/learn/[id]` - "Ask AI" button
- `/student/quizzes/[id]` - "Hint" button

**Callback Flow:**
```
UI Input → SupervisorAgent → TutorAgent → Tool Calls → LLM → Stream Response → UI
```

---

### 2.3 Sub-Agent 2: GradingAgent (Auto-Grading)

**Purpose:** Auto-grade student submissions with detailed feedback

**Agent Type:** `LlmAgent`

**ADK Configuration:**
```typescript
{
  name: 'grading_agent',
  model: 'gemini-2.0-flash',
  description: 'Auto-grades submissions with detailed feedback',
  instruction: `You are the Solocorn Grading Agent.
    Grade submissions fairly and provide constructive feedback.
    
    GRADING TYPES:
    1. Multiple Choice: Binary correct/incorrect
    2. Short Answer: Score 0-100% with feedback
    3. Essay: Rubric-based scoring
    4. Math: Step-by-step checking
    
    OUTPUT FORMAT (JSON):
    {
      "score": number,
      "maxScore": number,
      "isCorrect": boolean,
      "feedback": string,
      "misconceptions": string[],
      "suggestions": string[]
    }`,
    
  tools: [
    'fetch_question',
    'fetch_student_submission',
    'fetch_student_level',
    'save_grade_result'
  ],
  
  outputKey: 'grading_result' // Store in session state
}
```

**Tools Required:**
| Tool | Purpose | Data Access |
|------|---------|-------------|
| `fetch_question` | Get question & rubric | READ: Quiz, Question |
| `fetch_student_submission` | Get answer | READ: StudentAnswer |
| `fetch_student_level` | Adjust for difficulty | READ: Student |
| `save_grade_result` | Persist grade | WRITE: QuizScore |

**UI Integration Points:**
- `/tutor/courses/[id]/tasks` - "Auto Grade" button
- `/student/quizzes/[id]/results` - Show AI feedback
- `/tutor/grading` - Batch grading interface

**Callback Flow:**
```
Submission → SupervisorAgent → GradingAgent → Tool Calls → LLM → JSON Result → Save to DB → UI
```

---

### 2.4 Sub-Agent 3: ContentGeneratorAgent

**Purpose:** Generate quizzes, lessons, and educational content

**Agent Type:** `LlmAgent` with structured output

**ADK Configuration:**
```typescript
{
  name: 'content_generator_agent',
  model: 'gemini-2.0-flash',
  description: 'Generates educational content for courses',
  instruction: `You are the Solocorn Content Generator.
    Create high-quality educational content aligned with curriculum standards.
    
    CONTENT TYPES:
    1. Quiz Questions (MCQ, short answer, essay)
    2. Lesson Plans
    3. Practice Exercises
    4. Explanation Content
    
    OUTPUT: Structured JSON matching Solocorn content schema`,
    
  tools: [
    'fetch_curriculum_standards',
    'fetch_existing_content',
    'fetch_student_analytics',
    'save_generated_content'
  ],
  
  outputSchema: {
    type: 'object',
    properties: {
      content_type: { enum: ['quiz', 'lesson', 'exercise'] },
      title: { type: 'string' },
      content: { type: 'object' },
      difficulty: { enum: ['easy', 'medium', 'hard'] },
      estimated_time: { type: 'number' }
    }
  }
}
```

**Tools Required:**
| Tool | Purpose | Data Access |
|------|---------|-------------|
| `fetch_curriculum_standards` | Get learning objectives | READ: Curriculum |
| `fetch_existing_content` | Avoid duplication | READ: Quiz, Lesson |
| `fetch_student_analytics` | Adjust difficulty | READ: ProgressData |
| `save_generated_content` | Persist content | WRITE: Quiz, Lesson |

**UI Integration Points:**
- `/tutor/courses/[id]/builder` - "Generate Questions" button
- `/admin/content` - Content management

---

### 2.5 Sub-Agent 4: BriefingAgent

**Purpose:** Pre-class preparation and insights for tutors

**Agent Type:** `LlmAgent`

**ADK Configuration:**
```typescript
{
  name: 'briefing_agent',
  model: 'gemini-2.0-flash',
  description: 'Prepares tutors with pre-class insights',
  instruction: `You are the Solocorn Briefing Agent.
    Analyze class data and prepare actionable insights for tutors.
    
    INPUT DATA:
    - Student roster
    - Previous session performance
    - Common misconceptions
    - Learning gaps
    
    OUTPUT: Concise briefing with:
    1. Key topics to emphasize
    2. Students needing attention
    3. Suggested teaching strategies`,
    
  tools: [
    'fetch_class_roster',
    'fetch_previous_session_data',
    'fetch_student_progress_summary',
    'fetch_common_misconceptions'
  ]
}
```

**Tools Required:**
| Tool | Purpose | Data Access |
|------|---------|-------------|
| `fetch_class_roster` | Get student list | READ: LiveSession |
| `fetch_previous_session_data` | Review past class | READ: LiveSession |
| `fetch_student_progress_summary` | Identify struggling students | READ: ProgressData |
| `fetch_common_misconceptions` | Prepare targeted explanations | READ: StudentAnswer |

**UI Integration Points:**
- `/tutor/dashboard` - "AI Briefing" button
- `/tutor/live-class/[id]` - Pre-class briefing panel

---

### 2.6 Sub-Agent 5: LiveMonitorAgent

**Purpose:** Real-time classroom monitoring and alerts

**Agent Type:** `Agent` with event-driven callbacks (not just LLM)

**ADK Configuration:**
```typescript
{
  name: 'live_monitor_agent',
  model: 'gemini-2.0-flash',
  description: 'Real-time classroom monitoring (1:50 ratio)',
  instruction: `You are the Solocorn Live Monitor.
    Analyze real-time classroom data and alert tutors to issues.
    
    MONITORING DUTIES:
    1. Track student engagement scores
    2. Detect confusion patterns
    3. Identify off-task behavior
    4. Suggest interventions
    
    ALERT TRIGGERS:
    - Engagement < 30%
    - Confusion keywords detected
    - No activity for 5+ minutes`,
    
  tools: [
    'fetch_live_session_data',
    'fetch_student_engagement_scores',
    'update_engagement_metrics',
    'create_confusion_alert'
  ],
  
  // Event-driven: Not waiting for user input
  callbackContext: {
    trigger: 'interval', // or 'event'
    intervalSeconds: 30
  }
}
```

**Tools Required:**
| Tool | Purpose | Data Access |
|------|---------|-------------|
| `fetch_live_session_data` | Get current session | READ: LiveSession |
| `fetch_student_engagement_scores` | Get engagement metrics | READ: LiveSession |
| `update_engagement_metrics` | Update scores | WRITE: LiveSession |
| `create_confusion_alert` | Alert tutor | WRITE: LiveSession |

**UI Integration Points:**
- `/tutor/live-class/[id]` - Real-time dashboard
- WebSocket/SSE for live updates

**Special Considerations:**
- Runs continuously during class
- Uses callbacks to push updates to UI
- Low-latency requirements

---

## 3. ADK Tool Registry Design

### Tool Definition Pattern

All tools follow this ADK pattern:

```typescript
// tools/student_tools.ts
import { Tool } from '@google/adk';

export const fetchStudentProfileTool: Tool = {
  name: 'fetch_student_profile',
  description: 'Fetches student profile by ID',
  parameters: {
    type: 'object',
    properties: {
      studentId: { type: 'string', description: 'Student ID' }
    },
    required: ['studentId']
  },
  handler: async (params, context) => {
    // Access session state if needed
    const session = context.session;
    
    // Database call
    const student = await db.query.student.findFirst({
      where: eq(student.id, params.studentId)
    });
    
    return {
      id: student.id,
      name: student.name,
      grade: student.grade,
      learningStyle: student.learningStyle,
      currentLevel: student.currentLevel
    };
  }
};
```

### Tool Categories

| Category | Tools | Data Access |
|----------|-------|-------------|
| **Student Tools** | `fetch_student_profile`, `fetch_student_progress`, `fetch_learning_history` | READ: Student, ProgressData |
| **Conversation Tools** | `fetch_conversation_history`, `save_message`, `summarize_conversation` | READ/WRITE: Conversation |
| **Curriculum Tools** | `fetch_curriculum`, `fetch_lesson`, `fetch_module` | READ: Curriculum |
| **Quiz Tools** | `fetch_quiz`, `fetch_question`, `save_quiz_result`, `fetch_rubric` | READ/WRITE: Quiz |
| **Live Session Tools** | `fetch_live_session`, `update_engagement`, `create_alert`, `fetch_participation` | READ/WRITE: LiveSession |
| **Content Tools** | `save_generated_quiz`, `save_lesson_content`, `check_content_exists` | WRITE: Quiz, Lesson |

---

## 4. Session Memory & State Management

### ADK Session Structure

```typescript
// Session state for a tutoring interaction
interface TutorSessionState {
  // Agent metadata
  current_agent: 'tutor' | 'grading' | 'content_gen' | 'briefing' | 'monitor';
  
  // User context
  student_id: string;
  subject: string;
  lesson_id?: string;
  
  // Conversation context
  conversation_id: string;
  message_count: number;
  
  // TutorAgent specific
  tutor_context?: {
    last_topic: string;
    concepts_explained: string[];
    student_struggling: boolean;
  };
  
  // GradingAgent specific
  grading_context?: {
    quiz_id: string;
    current_question_index: number;
    partial_results: GradedAnswer[];
  };
  
  // LiveMonitor specific
  monitor_context?: {
    session_id: string;
    last_check_timestamp: number;
    active_alerts: string[];
  };
}
```

### Session Management Flow

```
1. User opens AI Tutor
   ↓
2. Frontend creates ADK session via API
   ↓
3. Session state initialized with student_id, subject
   ↓
4. Each message processed within same session
   ↓
5. Session persists for 30 min of inactivity
   ↓
6. Session data saved to DB for analytics
```

---

## 5. UI Integration Architecture

### 5.1 Frontend-ADK Communication Flow

```
┌─────────────┐      HTTP/SSE      ┌─────────────────────────────────────┐
│   React UI  │◄──────────────────►│     Next.js API Routes              │
│  (Client)   │   (Streaming)      │     (ADK Runtime)                   │
└─────────────┘                    └─────────────────────────────────────┘
        │                                      │
        │ 1. POST /api/ai/chat                 │
        │    { message, session_id }           │
        │─────────────────────────────────────>│
        │                                      │
        │ 2. ADK Session Resume/Create         │
        │    - Load session state              │
        │    - Route to agent                  │
        │                                      │
        │ 3. Agent Processing                  │
        │    - Tool calls (DB access)          │
        │    - LLM calls                       │
        │                                      │
        │ 4. SSE Stream Response               │
        │<─────────────────────────────────────│
        │    event: content                    │
        │    data: { delta: "word" }           │
        │                                      │
        │ 5. Final State Update                │
        │    - Save conversation               │
        │    - Update session state            │
```

### 5.2 React Hook: useADKChat

```typescript
// hooks/useADKChat.ts
interface UseADKChatOptions {
  agent: 'tutor' | 'grading' | 'content' | 'briefing';
  studentId: string;
  subject?: string;
  onStream?: (chunk: string) => void;
  onToolCall?: (tool: string, params: any) => void;
}

interface UseADKChatReturn {
  messages: Message[];
  isStreaming: boolean;
  sendMessage: (content: string) => Promise<void>;
  stopGeneration: () => void;
  sessionId: string | null;
}

export function useADKChat(options: UseADKChatOptions): UseADKChatReturn {
  // Implementation:
  // 1. Create/resume ADK session via API
  // 2. Establish SSE connection for streaming
  // 3. Handle tool call events for UI feedback
  // 4. Manage message history
}
```

### 5.3 UI Components by Agent

| Agent | UI Component | Location | Key Features |
|-------|-------------|----------|--------------|
| **TutorAgent** | `TutorChatPanel` | `/student/ai-tutor` | Streaming, hint button, explain button |
| **GradingAgent** | `AutoGrader` | `/tutor/courses/[id]/tasks` | Batch grading, rubric display |
| **ContentGenAgent** | `ContentGenerator` | `/tutor/courses/[id]/builder` | Template selection, preview |
| **BriefingAgent** | `BriefingPanel` | `/tutor/dashboard` | Pre-class insights, expandable sections |
| **LiveMonitorAgent** | `LiveDashboard` | `/tutor/live-class/[id]` | Real-time charts, alert banners |

---

## 6. Multi-Agent Orchestration

### 6.1 Agent Handoff Patterns

**Pattern 1: Supervisor Routing (Default)**
```
User Input → SupervisorAgent → Intent Analysis → Sub-Agent
```

**Pattern 2: Sequential Pipeline**
```
ContentGenAgent → (generates quiz) → GradingAgent → (grades submissions)
```

**Pattern 3: Parallel Execution**
```
                    ┌→ TutorAgent (student support)
User Input → SupervisorAgent 
                    └→ LiveMonitorAgent (background monitoring)
```

### 6.2 Intent Classification for Routing

```typescript
// Intent routing logic in SupervisorAgent
function classifyIntent(message: string, context: SessionState): string {
  const lower = message.toLowerCase();
  
  // Grading intent
  if (lower.includes('grade') || lower.includes('score') || lower.includes('mark')) {
    return 'grading_agent';
  }
  
  // Content generation intent
  if (lower.includes('generate') || lower.includes('create') || lower.includes('make quiz')) {
    return 'content_generator_agent';
  }
  
  // Briefing intent
  if (lower.includes('briefing') || lower.includes('prepare') || lower.includes('class summary')) {
    return 'briefing_agent';
  }
  
  // Live monitor intent (tutor-facing)
  if (context.user_role === 'tutor' && lower.includes('monitor')) {
    return 'live_monitor_agent';
  }
  
  // Default: Tutor
  return 'tutor_agent';
}
```

---

## 7. Data Access Layer Integration

### 7.1 Database Tools Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ADK Tool Layer                        │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │StudentTool  │ │QuizTool     │ │LiveTool     │       │
│  │Registry     │ │Registry     │ │Registry     │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    Data Access Layer                     │
│                   (Drizzle ORM)                          │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                   PostgreSQL Database                    │
└─────────────────────────────────────────────────────────┘
```

### 7.2 Tool Implementation Example

```typescript
// lib/adk-tools/student-tools.ts
import { Tool } from '@google/adk';
import { drizzleDb } from '@/lib/db/drizzle';
import { student, progressData } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const studentTools: Tool[] = [
  {
    name: 'fetch_student_profile',
    description: 'Fetches student profile by ID',
    parameters: {
      type: 'object',
      properties: {
        studentId: { type: 'string' }
      },
      required: ['studentId']
    },
    handler: async ({ studentId }) => {
      const [profile] = await drizzleDb
        .select()
        .from(student)
        .where(eq(student.id, studentId))
        .limit(1);
      
      if (!profile) throw new Error('Student not found');
      
      return {
        id: profile.id,
        name: profile.name,
        grade: profile.grade,
        learningStyle: profile.learningStyle,
        currentLevel: profile.currentLevel,
        xp: profile.xp,
        streak: profile.streak
      };
    }
  },
  
  {
    name: 'fetch_progress_data',
    description: 'Fetches student progress for a lesson',
    parameters: {
      type: 'object',
      properties: {
        studentId: { type: 'string' },
        lessonId: { type: 'string' }
      },
      required: ['studentId', 'lessonId']
    },
    handler: async ({ studentId, lessonId }) => {
      const progress = await drizzleDb.query.progressData.findFirst({
        where: (p) => and(
          eq(p.studentId, studentId),
          eq(p.lessonId, lessonId)
        )
      });
      
      return progress || null;
    }
  }
];
```

---

## 8. Streaming & Callbacks

### 8.1 Streaming Architecture

```typescript
// API Route: /api/ai/chat/stream/route.ts
import { Runner } from '@google/adk';

export async function POST(req: Request) {
  const { sessionId, message, agentName } = await req.json();
  
  // Create or resume session
  const session = await getSession(sessionId);
  
  // Create agent runner
  const runner = Runner.create(agentName);
  
  // Return SSE stream
  const stream = new ReadableStream({
    async start(controller) {
      // Stream events from ADK
      for await (const event of runner.runAsync(message, session)) {
        if (event.content) {
          controller.enqueue(
            new TextEncoder().encode(
              `data: ${JSON.stringify({ delta: event.content })}

`
            )
          );
        }
        
        if (event.toolCall) {
          controller.enqueue(
            new TextEncoder().encode(
              `data: ${JSON.stringify({ toolCall: event.toolCall })}

`
            )
          );
        }
      }
      
      controller.close();
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    }
  });
}
```

### 8.2 UI Callback Handling

```typescript
// hooks/useADKStreaming.ts
export function useADKStreaming(sessionId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  
  const sendMessage = async (content: string) => {
    setIsStreaming(true);
    
    const response = await fetch('/api/ai/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, message: content })
    });
    
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    let currentContent = '';
    
    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6));
          
          if (data.delta) {
            currentContent += data.delta;
            // Update UI with streaming content
            updateStreamingMessage(currentContent);
          }
          
          if (data.toolCall) {
            // Show tool call indicator in UI
            showToolCallIndicator(data.toolCall.name);
          }
        }
      }
    }
    
    setIsStreaming(false);
  };
  
  return { messages, isStreaming, sendMessage };
}
```

---

## 9. Migration Strategy

### 9.1 Phase 1: Infrastructure Setup (Week 1)

- [ ] Install ADK dependencies
- [ ] Set up ADK runtime configuration
- [ ] Create base agent classes
- [ ] Implement tool registry
- [ ] Create session management layer

### 9.2 Phase 2: Agent Migration (Week 2-3)

| Priority | Agent | Effort | Dependencies |
|----------|-------|--------|--------------|
| 1 | TutorAgent | 3 days | Student tools, Conversation tools |
| 2 | GradingAgent | 2 days | Quiz tools |
| 3 | ContentGenAgent | 2 days | Curriculum tools |
| 4 | BriefingAgent | 2 days | LiveSession tools |
| 5 | LiveMonitorAgent | 3 days | Real-time streaming, WebSocket |

### 9.3 Phase 3: UI Integration (Week 4)

- [ ] Create `useADKChat` hook
- [ ] Update TutorChat UI for streaming
- [ ] Update Grading UI with tool call indicators
- [ ] Add session persistence
- [ ] Error handling and fallbacks

### 9.4 Phase 4: Testing & Rollout (Week 5)

- [ ] Unit tests for each agent
- [ ] Integration tests for multi-agent flows
- [ ] Load testing for concurrent sessions
- [ ] Gradual rollout (10% → 50% → 100%)

---

## 10. Configuration Summary

### Environment Variables

```bash
# ADK Configuration
ADK_PROJECT_ID=your-gcp-project
ADK_LOCATION=us-central1

# Model Configuration (ADK supports these natively)
ADK_DEFAULT_MODEL=gemini-2.0-flash
ADK_FALLBACK_MODEL=gemini-1.5-flash

# For custom Kimi integration
KIMI_API_KEY=your-kimi-key
KIMI_BASE_URL=https://api.moonshot.cn/v1

# Session Storage
ADK_SESSION_TTL=1800  # 30 minutes
ADK_SESSION_STORAGE=redis  # or 'database'

# Tool Configuration
ADK_MAX_TOOL_CALLS=10
ADK_TOOL_TIMEOUT_MS=5000
```

### File Structure

```
tutorme-app/src/
├── lib/
│   ├── adk/                    # NEW: ADK configuration
│   │   ├── agents/             # Agent definitions
│   │   │   ├── supervisor.ts
│   │   │   ├── tutor-agent.ts
│   │   │   ├── grading-agent.ts
│   │   │   ├── content-gen-agent.ts
│   │   │   ├── briefing-agent.ts
│   │   │   └── live-monitor-agent.ts
│   │   ├── tools/              # Tool implementations
│   │   │   ├── student-tools.ts
│   │   │   ├── quiz-tools.ts
│   │   │   ├── curriculum-tools.ts
│   │   │   ├── conversation-tools.ts
│   │   │   └── live-tools.ts
│   │   ├── session/            # Session management
│   │   │   ├── store.ts
│   │   │   └── state.ts
│   │   └── runtime.ts          # ADK runtime config
│   │
│   └── agents/                 # DEPRECATED: Old framework
│       └── ... (keep for migration period)
│
├── app/api/adk/                # NEW: ADK API routes
│   ├── chat/route.ts           # Streaming chat endpoint
│   ├── session/route.ts        # Session management
│   └── tools/route.ts          # Tool execution
│
└── components/
    └── adk/                    # NEW: ADK UI components
        ├── ChatContainer.tsx
        ├── StreamingMessage.tsx
        └── ToolCallIndicator.tsx
```

---

## 11. Benefits of ADK Migration

| Aspect | Before (Custom) | After (ADK) |
|--------|-----------------|-------------|
| **Agent Lifecycle** | Manual management | Automatic state management |
| **Tool Calling** | Custom implementation | Standardized tool framework |
| **Streaming** | Custom SSE handling | Built-in streaming support |
| **Session Memory** | Manual localStorage | Automatic session persistence |
| **Multi-Agent** | Hard-coded routing | Dynamic orchestration |
| **Observability** | Custom logging | Built-in tracing |
| **Testing** | Custom mocks | ADK testing utilities |
| **Maintenance** | Full ownership | Google-maintained framework |

---

## 12. Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| ADK Learning Curve | Parallel development, keep old system running |
| Performance Regression | Load testing, gradual rollout |
| Data Migration | Session data backward compatibility layer |
| Vendor Lock-in | Abstract ADK behind interfaces |
| Streaming Issues | Fallback to non-streaming mode |

---

## Conclusion

This ADK implementation plan provides a structured migration path from Solocorn's custom agent framework to Google ADK. The key benefits are:

1. **Standardized Agent Framework** - Industry-standard patterns
2. **Better Streaming Support** - Native SSE and callbacks
3. **Improved Tool Management** - Declarative tool definitions
4. **Session Persistence** - Automatic state management
5. **Multi-Agent Orchestration** - Dynamic routing and handoffs

The migration can be done incrementally, starting with the TutorAgent and progressively migrating other agents while maintaining backward compatibility.
