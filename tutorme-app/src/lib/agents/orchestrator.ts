/**
 * ============================================================================
 * AGENT ORCHESTRATOR
 * ============================================================================
 * 
 * This is the main entry point for all AI agents in Solocorn.
 * Routes requests to the appropriate agent based on use case.
 * 
 * UI Integration Points:
 * - All AI buttons in the UI call functions through this orchestrator
 * - Each agent has specific UI locations documented in their README.md
 */

// Import all agents
export * from './tutor';
export * from './content-generator';
export * from './grading';
export * from './briefing';
export * from './live-monitor';

// Re-export the shared data types
export * from './shared-data';

// Re-export the underlying LLM orchestrator for direct use
export { generateWithFallback, chatWithFallback } from './orchestrator-llm';

/**
 * Agent Selection Guide:
 * 
 * | UI Location | Use Case | Agent to Use |
 * |-------------|----------|--------------|
 * | /student/ai-tutor | Student asking questions | tutor.tutorChat() |
 * | /student/quizzes/[id]/hint | Hint button during quiz | tutor.generateHint() |
 * | /student/learn/[id]/explain | Explain concept button | tutor.explainConcept() |
 * | /tutor/courses/[id]/builder | Generate questions | contentGenerator.generateQuiz() |
 * | /tutor/courses/[id]/builder | Generate lesson | contentGenerator.generateLessonContent() |
 * | /tutor/courses/[id]/tasks | Auto grade button | grading.gradeQuizBatch() |
 * | /tutor/grading | Grade essay | grading.gradeEssay() |
 * | /tutor/dashboard | AI Briefing button | briefing.generateClassBriefing() |
 * | /tutor/live-class/[id] | Pre-class briefing | briefing.generateClassBriefing() |
 * | /tutor/live-class/[id] | Real-time monitoring | liveMonitor.analyzeEngagement() |
 * | /tutor/live-class/[id] | Confusion alert | liveMonitor.detectConfusion() |
 * 
 * Example Usage:
 * 
 * ```typescript
 * import { tutorChat, generateQuiz, gradeShortAnswer } from '@/lib/agents';
 * 
 * // Student asks question in AI tutor
 * const response = await tutorChat({
 *   studentId: '123',
 *   subject: 'mathematics',
 *   message: 'How do I solve x^2 + 5x + 6 = 0?'
 * });
 * 
 * // Tutor generates quiz
 * const quiz = await generateQuiz({
 *   subject: 'physics',
 *   topic: 'Newton\'s Laws',
 *   difficulty: 'medium',
 *   numQuestions: 5,
 *   questionTypes: ['multiple_choice', 'short_answer']
 * });
 * ```
 */

// Agent metadata for documentation
export const AGENT_METADATA = {
  tutor: {
    name: 'Tutor Agent',
    description: 'Socratic AI tutor for student learning',
    uiLocations: ['/student/ai-tutor', '/student/learn/[id]', '/student/quizzes/[id]'],
    primaryFunction: 'Teaching through questioning',
    dataAccess: 'READ: Student, Conversation, Curriculum, Progress | WRITE: Conversation'
  },
  contentGenerator: {
    name: 'Content Generator Agent',
    description: 'Generates quizzes, lessons, and educational content',
    uiLocations: ['/tutor/courses/[id]/builder', '/admin/content'],
    primaryFunction: 'Content creation',
    dataAccess: 'READ: Curriculum, Student | WRITE: Quiz, Question, Lesson'
  },
  grading: {
    name: 'Grading Agent',
    description: 'Auto-grades submissions with detailed feedback',
    uiLocations: ['/tutor/courses/[id]/tasks', '/student/quizzes/[id]/results'],
    primaryFunction: 'Assessment grading',
    dataAccess: 'READ: Quiz, StudentAnswer | WRITE: StudentAnswer, QuizScore, ProgressData'
  },
  briefing: {
    name: 'Briefing Agent',
    description: 'Prepares tutors with pre-class insights',
    uiLocations: ['/tutor/dashboard', '/tutor/live-class/[id]'],
    primaryFunction: 'Tutor preparation',
    dataAccess: 'READ: LiveSession, ProgressData, Student, Curriculum | WRITE: LiveSession.briefingData'
  },
  liveMonitor: {
    name: 'Live Monitor Agent',
    description: 'Real-time classroom monitoring (1:50 ratio)',
    uiLocations: ['/tutor/live-class/[id]'],
    primaryFunction: 'Real-time engagement tracking',
    dataAccess: 'READ/WRITE: LiveSession | READ: Student, ProgressData'
  }
} as const;
