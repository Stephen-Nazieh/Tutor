/**
 * ============================================================================
 * BRIEFING AGENT - Main Implementation
 * ============================================================================
 * 
 * UI LOCATIONS:
 * - /tutor/dashboard - "AI Briefing" button on class cards
 * - /tutor/live-class/[sessionId] - Pre-class briefing panel
 * - Post-class in session summary
 * 
 * This agent prepares tutors with AI-generated class briefings.
 */

import { generateWithFallback } from '@/lib/agents';
import { 
  LiveSession, 
  Student, 
  ProgressData, 
  Curriculum,
  Conversation,
  getLiveSession,
  getStudent,
  getCurriculum,
  getProgress,
  getConversation 
} from '../shared-data';
import { 
  buildClassBriefingPrompt,
  buildStudentSpotlightPrompt,
  buildTeachingStrategyPrompt,
  buildPostClassReflectionPrompt,
  BriefingContext 
} from './prompts/briefing-prompts';

export interface ClassBriefing {
  overview: string;
  studentsNeedingAttention: Array<{
    studentId: string;
    name: string;
    issue: string;
    suggestedApproach: string;
  }>;
  readyToShine: Array<{
    studentId: string;
    name: string;
    strength: string;
    howToLeverage: string;
  }>;
  commonMisconceptions: string[];
  teachingStrategies: string[];
  icebreaker: string;
  timeWarnings: string[];
  generatedAt: Date;
}

export interface StudentSpotlight {
  summary: string;
  learningProfile: string;
  watchOutFor: string[];
  engagementStrategy: string;
  questionsToAsk: string[];
}

export interface PostClassReflection {
  summary: string;
  highEngagementMoments: string[];
  lowEngagementMoments: string[];
  followUpActions: string[];
  growthOpportunities: string[];
}

/**
 * Generate pre-class briefing for tutor
 * 
 * UI FLOW:
 * 1. Tutor on /tutor/dashboard clicks "AI Briefing" for upcoming class
 * 2. OR on /tutor/live-class/[id] before starting
 * 3. This function analyzes all students in session
 * 4. Returns structured briefing with alerts and strategies
 */
export async function generateClassBriefing(sessionId: string): Promise<ClassBriefing> {
  // FETCH DATA (READ access)
  const session = await getLiveSession(sessionId);
  if (!session) throw new Error('Session not found');
  
  // Get all student data
  const students: Student[] = [];
  const progressData: ProgressData[] = [];
  const recentQuizScores: Array<{ studentId: string; score: number; topic: string }> = [];
  
  for (const studentId of session.students) {
    const [student, progress] = await Promise.all([
      getStudent(studentId),
      getProgress(studentId, 'current')
    ]);
    
    if (student) {
      students.push(student);
      if (progress) {
        progressData.push(progress);
        // Extract recent quiz scores
        progress.quizScores.slice(-1).forEach(score => {
          recentQuizScores.push({
            studentId,
            score: (score.score / score.maxScore) * 100,
            topic: 'Recent Topic'
          });
        });
      }
    }
  }
  
  // Get curriculum
  const curriculum = await getCurriculum(session.subject, 'default');
  if (!curriculum) throw new Error('Curriculum not found');
  
  const context: BriefingContext = {
    session,
    students,
    progressData,
    curriculum,
    recentQuizScores
  };
  
  const prompt = buildClassBriefingPrompt(context);
  
  const result = await generateWithFallback(prompt, {
    temperature: 0.6,
    maxTokens: 2000
  });
  
  // Parse the structured response
  return parseBriefingResponse(result.content, students);
}

/**
 * Parse AI response into structured briefing
 */
function parseBriefingResponse(content: string, students: Student[]): ClassBriefing {
  // Simple parsing based on headers
  const lines = content.split('\n');
  const briefing: Partial<ClassBriefing> = {
    generatedAt: new Date()
  };
  
  let currentSection = '';
  const studentsNeedingAttention: ClassBriefing['studentsNeedingAttention'] = [];
  const readyToShine: ClassBriefing['readyToShine'] = [];
  const commonMisconceptions: string[] = [];
  const teachingStrategies: string[] = [];
  const timeWarnings: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.includes('CLASS OVERVIEW') || trimmed.includes('OVERVIEW')) {
      currentSection = 'overview';
      continue;
    }
    if (trimmed.includes('STUDENTS NEEDING ATTENTION')) {
      currentSection = 'attention';
      continue;
    }
    if (trimmed.includes('READY TO SHINE')) {
      currentSection = 'shine';
      continue;
    }
    if (trimmed.includes('MISCONCEPTIONS')) {
      currentSection = 'misconceptions';
      continue;
    }
    if (trimmed.includes('TEACHING STRATEGIES')) {
      currentSection = 'strategies';
      continue;
    }
    if (trimmed.includes('ICEBREAKER')) {
      currentSection = 'icebreaker';
      continue;
    }
    if (trimmed.includes('TIME WARNINGS')) {
      currentSection = 'warnings';
      continue;
    }
    
    if (!trimmed) continue;
    
    switch (currentSection) {
      case 'overview':
        briefing.overview = (briefing.overview || '') + ' ' + trimmed;
        break;
      case 'attention':
        // Parse "Name: Issue - Approach" format
        const attentionMatch = trimmed.match(/^-\s*(.+?):\s*(.+?)\s*-\s*(.+)$/);
        if (attentionMatch) {
          const name = attentionMatch[1].trim();
          const student = students.find(s => s.name === name);
          studentsNeedingAttention.push({
            studentId: student?.id || '',
            name,
            issue: attentionMatch[2].trim(),
            suggestedApproach: attentionMatch[3].trim()
          });
        }
        break;
      case 'shine':
        const shineMatch = trimmed.match(/^-\s*(.+?):\s*(.+?)\s*-\s*(.+)$/);
        if (shineMatch) {
          const name = shineMatch[1].trim();
          const student = students.find(s => s.name === name);
          readyToShine.push({
            studentId: student?.id || '',
            name,
            strength: shineMatch[2].trim(),
            howToLeverage: shineMatch[3].trim()
          });
        }
        break;
      case 'misconceptions':
        if (trimmed.startsWith('-')) {
          commonMisconceptions.push(trimmed.substring(1).trim());
        }
        break;
      case 'strategies':
        if (trimmed.startsWith('-') || trimmed.startsWith('**')) {
          teachingStrategies.push(trimmed.replace(/\*\*/g, '').trim());
        }
        break;
      case 'icebreaker':
        briefing.icebreaker = (briefing.icebreaker || '') + ' ' + trimmed;
        break;
      case 'warnings':
        if (trimmed.startsWith('-')) {
          timeWarnings.push(trimmed.substring(1).trim());
        }
        break;
    }
  }
  
  return {
    overview: briefing.overview?.trim() || 'No overview generated',
    studentsNeedingAttention,
    readyToShine,
    commonMisconceptions,
    teachingStrategies,
    icebreaker: briefing.icebreaker?.trim() || 'No icebreaker suggested',
    timeWarnings,
    generatedAt: new Date()
  };
}

/**
 * Generate detailed spotlight for a specific student
 * 
 * UI: Tutor clicks on student name in briefing
 */
export async function generateStudentSpotlight(
  studentId: string,
  subject: string
): Promise<StudentSpotlight> {
  const [student, progress, conversation] = await Promise.all([
    getStudent(studentId),
    getProgress(studentId, 'current'),
    getConversation(studentId, subject)
  ]);
  
  if (!student) throw new Error('Student not found');
  
  const recentConversations = conversation?.messages.slice(-5).map(m => m.content) || [];
  
  const prompt = buildStudentSpotlightPrompt(
    student,
    progress || {
      studentId,
      lessonId: '',
      completion: 0,
      quizScores: [],
      timeSpent: 0,
      struggles: [],
      strengths: [],
      lastUpdated: new Date()
    },
    recentConversations
  );
  
  const result = await generateWithFallback(prompt, {
    temperature: 0.5,
    maxTokens: 1000
  });
  
  return parseSpotlightResponse(result.content);
}

function parseSpotlightResponse(content: string): StudentSpotlight {
  // Simplified parsing
  return {
    summary: content.split('Learning Profile')[0]?.trim() || '',
    learningProfile: content.split('Learning Profile')[1]?.split('Watch Out For')[0]?.trim() || '',
    watchOutFor: content.split('Watch Out For')[1]?.split('Engagement Strategy')[0]?.split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace('-', '').trim()) || [],
    engagementStrategy: content.split('Engagement Strategy')[1]?.split('Questions to Ask')[0]?.trim() || '',
    questionsToAsk: content.split('Questions to Ask')[1]?.split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace('-', '').trim()) || []
  };
}

/**
 * Generate post-class reflection
 * 
 * UI: After class ends, in session summary
 */
export async function generatePostClassReflection(
  sessionId: string
): Promise<PostClassReflection> {
  const session = await getLiveSession(sessionId);
  if (!session) throw new Error('Session not found');
  
  const prompt = buildPostClassReflectionPrompt(session, session.engagement);
  
  const result = await generateWithFallback(prompt, {
    temperature: 0.5,
    maxTokens: 1500
  });
  
  return parseReflectionResponse(result.content);
}

function parseReflectionResponse(content: string): PostClassReflection {
  return {
    summary: content.split('High Engagement')[0]?.trim() || '',
    highEngagementMoments: content.split('High Engagement')[1]?.split('Low Engagement')[0]?.split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace('-', '').trim()) || [],
    lowEngagementMoments: content.split('Low Engagement')[1]?.split('Follow-Up')[0]?.split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace('-', '').trim()) || [],
    followUpActions: content.split('Follow-Up')[1]?.split('Growth Opportunities')[0]?.split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace('-', '').trim()) || [],
    growthOpportunities: content.split('Growth Opportunities')[1]?.split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace('-', '').trim()) || []
  };
}

/**
 * Generate teaching strategies for specific class composition
 * 
 * UI: Strategy suggestions in briefing panel
 */
export async function generateTeachingStrategies(
  sessionId: string
): Promise<string[]> {
  const session = await getLiveSession(sessionId);
  if (!session) throw new Error('Session not found');
  
  const students: Student[] = [];
  const progressData: ProgressData[] = [];
  
  for (const studentId of session.students) {
    const [student, progress] = await Promise.all([
      getStudent(studentId),
      getProgress(studentId, 'current')
    ]);
    if (student) {
      students.push(student);
      if (progress) progressData.push(progress);
    }
  }
  
  const learningStyles = students.map(s => s.learningStyle);
  const commonStruggles = progressData.flatMap(p => p.struggles);
  
  const prompt = buildTeachingStrategyPrompt(learningStyles, commonStruggles, session.subject);
  
  const result = await generateWithFallback(prompt, {
    temperature: 0.6,
    maxTokens: 1000
  });
  
  return result.content.split('\n').filter(l => l.trim().startsWith('**')).map(l => l.replace(/\*\*/g, '').trim());
}
