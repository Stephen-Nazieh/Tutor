/**
 * ============================================================================
 * LIVE MONITOR AGENT - Main Implementation
 * ============================================================================
 * 
 * UI LOCATIONS:
 * - /tutor/live-class/[sessionId] - Real-time monitoring dashboard
 * - Engagement heatmap visualization
 * - Alert notifications popup
 * 
 * This agent monitors live classes in real-time, tracking engagement
 * and detecting when students need help.
 */

import { generateWithFallback } from '@/lib/agents';
import { 
  LiveSession, 
  Student, 
  ConfusionAlert,
  getLiveSession,
  getStudent,
  getProgress
} from '../shared-data';
import { 
  buildEngagementAnalysisPrompt,
  buildConfusionDetectionPrompt,
  buildInterventionPrompt,
  buildParticipationBalancePrompt,
  buildClassSummaryPrompt,
  StudentActivity 
} from './prompts/monitor-prompts';

export interface EngagementAnalysis {
  scores: Map<string, number>; // studentId -> 0-100
  classAverage: number;
  atRiskStudents: string[];
  trend: 'improving' | 'stable' | 'declining';
  suggestion: string;
}

export interface ConfusionDetection {
  isConfused: boolean;
  confidence: number;
  topicOfConfusion: string;
  severity: 'mild' | 'moderate' | 'severe';
  suggestedAction: string;
  shouldAlertTutor: boolean;
}

export interface Intervention {
  action: string;
  timing: 'now' | 'in 2 minutes' | 'after current topic';
  targetStudents: string[] | 'all';
  urgency: 'high' | 'medium' | 'low';
  expectedOutcome: string;
}

// Store last engagement for trend calculation
const engagementHistory: Map<string, number[]> = new Map();

/**
 * Analyze engagement for all students in a live session
 * 
 * UI FLOW:
 * 1. WebSocket receives activity data from students every 30 seconds
 * 2. This function analyzes all student activities
 * 3. Updates engagement heatmap in real-time
 * 4. Triggers alerts if engagement drops
 * 
 * CALLED: Every 30 seconds during live class
 */
export async function analyzeEngagement(
  sessionId: string,
  activities: StudentActivity[]
): Promise<EngagementAnalysis> {
  const session = await getLiveSession(sessionId);
  if (!session) throw new Error('Session not found');
  
  const duration = Math.floor((Date.now() - session.startTime.getTime()) / 60000);
  
  // For speed, don't call LLM every time - use rule-based scoring
  // Only call LLM every 2 minutes or when significant changes
  const shouldUseAI = duration % 2 === 0 || activities.some(a => a.chatSentiment === 'confused');
  
  if (shouldUseAI) {
    return analyzeWithAI(activities, session, duration);
  } else {
    return analyzeWithRules(activities, sessionId);
  }
}

/**
 * AI-powered engagement analysis (runs every 2 minutes)
 */
async function analyzeWithAI(
  activities: StudentActivity[],
  session: LiveSession,
  duration: number
): Promise<EngagementAnalysis> {
  const prompt = buildEngagementAnalysisPrompt(activities, session.subject, duration);
  
  try {
    const result = await generateWithFallback(prompt, {
      temperature: 0.3,
      maxTokens: 1000,
      timeoutMs: 3000 // Fast response needed
    });
    
    const analysis = JSON.parse(result.content);
    
    // Convert to Map
    const scores = new Map<string, number>();
    analysis.engagementScores.forEach((item: { studentId: string; score: number }) => {
      scores.set(item.studentId, item.score);
    });
    
    // Store for trend calculation
    engagementHistory.set(session.id, 
      [...(engagementHistory.get(session.id) || []), analysis.classAverage].slice(-5)
    );
    
    return {
      scores,
      classAverage: analysis.classAverage,
      atRiskStudents: analysis.atRiskStudents,
      trend: analysis.trend,
      suggestion: analysis.suggestion
    };
  } catch (error) {
    console.error('AI engagement analysis failed, falling back to rules:', error);
    return analyzeWithRules(activities, session.id);
  }
}

/**
 * Rule-based engagement analysis (runs every 30 seconds)
 * Fast, no LLM call
 */
function analyzeWithRules(
  activities: StudentActivity[],
  sessionId: string
): EngagementAnalysis {
  const scores = new Map<string, number>();
  const atRiskStudents: string[] = [];
  let totalScore = 0;
  
  activities.forEach(activity => {
    let score = 0;
    
    // Message participation (0-30)
    score += Math.min(activity.messagesCount * 5, 30);
    
    // Video on (0-20)
    if (activity.videoOn) score += 20;
    
    // Screen active (0-20)
    if (activity.screenActive) score += 20;
    
    // Recent activity (0-20)
    const inactive = (Date.now() - activity.lastActivity.getTime()) > 5 * 60 * 1000;
    score += inactive ? 0 : 20;
    
    // Sentiment (0-10)
    if (activity.chatSentiment === 'positive') score += 10;
    else if (activity.chatSentiment === 'neutral') score += 5;
    else if (activity.chatSentiment === 'confused') score += 3;
    else score += 2; // negative
    
    scores.set(activity.studentId, score);
    totalScore += score;
    
    if (score < 50) {
      atRiskStudents.push(activity.studentId);
    }
  });
  
  const classAverage = activities.length > 0 ? totalScore / activities.length : 0;
  
  // Calculate trend
  const history = engagementHistory.get(sessionId) || [];
  let trend: 'improving' | 'stable' | 'declining' = 'stable';
  if (history.length >= 2) {
    const recent = history.slice(-2);
    if (recent[1] > recent[0] + 5) trend = 'improving';
    else if (recent[1] < recent[0] - 5) trend = 'declining';
  }
  
  return {
    scores,
    classAverage,
    atRiskStudents,
    trend,
    suggestion: atRiskStudents.length > 0 
      ? `Consider checking on ${atRiskStudents.length} disengaged students`
      : 'Class engagement is good'
  };
}

/**
 * Detect confusion in student message
 * 
 * UI: Real-time alert in tutor dashboard
 * TRIGGER: Student sends message OR low quiz response
 */
export async function detectConfusion(
  studentMessage: string,
  currentTopic: string,
  recentMessages: string[]
): Promise<ConfusionDetection> {
  const prompt = buildConfusionDetectionPrompt(studentMessage, currentTopic, recentMessages);
  
  try {
    const result = await generateWithFallback(prompt, {
      temperature: 0.3,
      maxTokens: 500,
      timeoutMs: 2000 // Must be fast
    });
    
    return JSON.parse(result.content);
  } catch (error) {
    console.error('Confusion detection failed:', error);
    return {
      isConfused: false,
      confidence: 0,
      topicOfConfusion: '',
      severity: 'mild',
      suggestedAction: 'Continue monitoring',
      shouldAlertTutor: false
    };
  }
}

/**
 * Create confusion alert and save to session
 * 
 * UI: Alert appears in tutor's notification panel
 */
export async function createConfusionAlert(
  sessionId: string,
  studentId: string,
  topic: string,
  confidence: number,
  suggestedAction: string
): Promise<ConfusionAlert> {
  const alert: ConfusionAlert = {
    studentId,
    timestamp: new Date(),
    topic,
    confidence,
    suggestedAction
  };
  
  // Save to session (WRITE access)
  const session = await getLiveSession(sessionId);
  if (session) {
    session.confusionAlerts.push(alert);
    // In real implementation: await updateLiveSession(sessionId, session);
  }
  
  return alert;
}

/**
 * Suggest interventions when class is struggling
 * 
 * UI: Intervention suggestion card in tutor dashboard
 * TRIGGER: Engagement drops below 60% OR 3+ confusion alerts
 */
export async function suggestInterventions(
  sessionId: string
): Promise<Intervention[]> {
  const session = await getLiveSession(sessionId);
  if (!session) throw new Error('Session not found');
  
  const recentAlerts = session.confusionAlerts
    .slice(-5)
    .map(a => `${a.studentId} confused about ${a.topic}`);
  
  const classEngagement = Array.from(session.engagement.values())
    .reduce((a, b) => a + b, 0) / session.engagement.size;
  
  // Only suggest interventions if needed
  if (classEngagement > 70 && recentAlerts.length < 2) {
    return []; // Class is doing fine
  }
  
  const prompt = buildInterventionPrompt(session, recentAlerts, classEngagement);
  
  try {
    const result = await generateWithFallback(prompt, {
      temperature: 0.5,
      maxTokens: 1000,
      timeoutMs: 3000
    });
    
    const parsed = JSON.parse(result.content);
    return parsed.interventions || [];
  } catch (error) {
    console.error('Intervention suggestion failed:', error);
    return [{
      action: 'Pause and ask if there are questions',
      timing: 'now',
      targetStudents: 'all',
      urgency: classEngagement < 50 ? 'high' : 'medium',
      expectedOutcome: 'Check understanding and re-engage students'
    }];
  }
}

/**
 * Analyze participation balance
 * 
 * UI: Participation pie chart/bar in tutor dashboard
 * TRIGGER: Every 5 minutes
 */
export async function analyzeParticipationBalance(
  sessionId: string
): Promise<{
  overParticipating: string[];
  silent: string[];
  balanceScore: number;
  suggestions: string[];
}> {
  const session = await getLiveSession(sessionId);
  if (!session) throw new Error('Session not found');
  
  const prompt = buildParticipationBalancePrompt(
    session.participation,
    Math.floor((Date.now() - session.startTime.getTime()) / 60000)
  );
  
  try {
    const result = await generateWithFallback(prompt, {
      temperature: 0.3,
      maxTokens: 500
    });
    
    return JSON.parse(result.content);
  } catch (error) {
    // Fallback calculation
    const counts = Array.from(session.participation.entries());
    const avg = counts.reduce((a, [, b]) => a + b, 0) / counts.length;
    
    const overParticipating = counts.filter(([, c]) => c > avg * 2).map(([id]) => id);
    const silent = counts.filter(([, c]) => c < avg * 0.5 || c === 0).map(([id]) => id);
    
    return {
      overParticipating,
      silent,
      balanceScore: silent.length === 0 ? 80 : Math.max(0, 100 - silent.length * 10),
      suggestions: silent.length > 0 
        ? [`Consider calling on silent students: ${silent.join(', ')}`]
        : ['Participation is well balanced']
    };
  }
}

/**
 * Generate end-of-class summary
 * 
 * UI: Post-class summary panel
 * TRIGGER: Class ends (tutor clicks "End Session")
 */
export async function generateClassSummary(
  sessionId: string,
  activities: StudentActivity[]
): Promise<string> {
  const session = await getLiveSession(sessionId);
  if (!session) throw new Error('Session not found');
  
  const prompt = buildClassSummaryPrompt(session, activities);
  
  const result = await generateWithFallback(prompt, {
    temperature: 0.5,
    maxTokens: 800
  });
  
  return result.content;
}

/**
 * Quick check if student needs immediate attention
 * Fast rule-based check (no LLM)
 */
export function needsImmediateAttention(activity: StudentActivity): boolean {
  // Multiple indicators of struggle
  let concernScore = 0;
  
  if (activity.chatSentiment === 'confused') concernScore += 3;
  if (activity.chatSentiment === 'negative') concernScore += 2;
  if (!activity.videoOn && !activity.screenActive) concernScore += 2;
  if (activity.messagesCount === 0) concernScore += 1;
  
  const inactive = (Date.now() - activity.lastActivity.getTime()) > 10 * 60 * 1000;
  if (inactive) concernScore += 3;
  
  return concernScore >= 4;
}
