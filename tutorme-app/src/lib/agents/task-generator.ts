/**
 * Task Generator Agent Service (canonical entrypoint)
 *
 * Moved from `lib/ai/task-generator` so app-facing AI services live under `lib/agents`.
 * The old module now re-exports this for backwards compatibility.
 */

import crypto from 'crypto'
import { desc, eq } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { studentPerformance, taskSubmission } from '@/lib/db/schema'
import { generateWithFallback } from './orchestrator-llm'
import { safeJsonParse } from '@/lib/ai/json'

export type DistributionMode = 'uniform' | 'personalized' | 'clustered' | 'peer_group'

export interface TaskConfiguration {
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  subject: string
  topics: string[]
  taskTypes: ('multiple_choice' | 'short_answer' | 'long_answer' | 'coding' | 'diagram')[]
  count: number
  timeEstimate?: number // in minutes
  adaptive?: boolean
}

export interface GeneratedTask {
  id: string
  type: string
  question: string
  options?: string[]
  correctAnswer?: string
  explanation?: string
  difficulty: number
  topics: string[]
  hints?: string[]
  rubric?: {
    criteria: string
    points: number
  }[]
}

export interface StudentProfile {
  id: string
  currentLevel: 'beginner' | 'intermediate' | 'advanced'
  strengths: string[]
  weaknesses: string[]
  cluster?: 'advanced' | 'intermediate' | 'struggling'
  recentPerformance?: number
  learningStyle?: string | null
}

/**
 * Generate a prompt for task creation based on configuration
 */
function createTaskGenerationPrompt(
  config: TaskConfiguration,
  studentProfile?: StudentProfile
): string {
  const basePrompt = `作为一位专业的教育AI助手，请为${config.subject}科目生成${config.count}道练习题。

主题：${config.topics.join('、')}
难度级别：${config.difficulty}
题型：${config.taskTypes.join('、')}

要求：
1. 每道题都应该有明确的学习目标
2. 包含详细的题目描述
3. 提供正确答案和详细解析
4. 标注每道题的难度系数（1-10）
5. 相关知识点
6. 提供解题提示（可选）
7. 对于主观题，提供评分标准（rubric）

请以下面JSON格式返回（只返回JSON，不要有其他内容）：
{
  "tasks": [
    {
      "id": "task_1",
      "type": "multiple_choice",
      "question": "题目内容",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "correctAnswer": "选项A",
      "explanation": "详细解析...",
      "difficulty": 5,
      "topics": ["知识点1"],
      "hints": ["提示1", "提示2"],
      "rubric": [
        {"criteria": "标准1", "points": 5}
      ]
    }
  ]
}`

  if (studentProfile) {
    return `${basePrompt}

针对该学生的个性化要求：
- 当前水平：${studentProfile.currentLevel}
- 优势领域：${studentProfile.strengths.join('、') || '暂无'}
- 薄弱领域：${studentProfile.weaknesses.join('、') || '暂无'}
- 学习风格：${studentProfile.learningStyle || '综合'}

请根据学生的水平调整题目难度，针对薄弱领域加强练习，在优势领域提供挑战性题目。`
  }

  return basePrompt
}

/**
 * Parse AI response into structured tasks
 */
function parseTaskResponse(response: string): GeneratedTask[] {
  const parsed = safeJsonParse<{ tasks?: GeneratedTask[] }>(response, { extract: true })
  const tasks = parsed?.tasks
  if (Array.isArray(tasks) && tasks.length > 0) return tasks

  // Return fallback tasks
  return [
    {
      id: 'fallback_1',
      type: 'short_answer',
      question: '请描述你对这个知识点的理解',
      difficulty: 5,
      topics: ['general'],
      explanation: '这是一个默认题目，请重新生成任务。',
    },
  ]
}

/**
 * Generate uniform tasks (same for all students)
 */
export async function generateUniformTasks(config: TaskConfiguration): Promise<GeneratedTask[]> {
  const prompt = createTaskGenerationPrompt(config)
  const result = await generateWithFallback(prompt, { temperature: 0.7 })
  return parseTaskResponse(result.content)
}

/**
 * Generate personalized tasks for a specific student
 */
export async function generatePersonalizedTasks(
  config: TaskConfiguration,
  studentProfile: StudentProfile
): Promise<GeneratedTask[]> {
  const prompt = createTaskGenerationPrompt(config, studentProfile)
  const result = await generateWithFallback(prompt, { temperature: 0.7 })
  return parseTaskResponse(result.content)
}

/**
 * Get student profiles for a course
 */
async function getStudentProfiles(
  studentIds: string[],
  _courseId?: string
): Promise<StudentProfile[]> {
  const profiles = await Promise.all(
    studentIds.map(async id => {
      const rows = await drizzleDb
        .select()
        .from(studentPerformance)
        .where(eq(studentPerformance.studentId, id))
        .limit(1)
      const performance = rows[0]

      if (!performance) {
        return {
          id,
          currentLevel: 'intermediate' as const,
          strengths: [],
          weaknesses: [],
          cluster: 'intermediate' as const,
        }
      }

      return {
        id,
        currentLevel: mapLevelToDifficulty(performance.cluster),
        strengths: (performance.strengths as string[]) || [],
        weaknesses: (performance.weaknesses as string[]) || [],
        cluster: performance.cluster as any,
        learningStyle: performance.learningStyle,
      }
    })
  )

  return profiles
}

function mapLevelToDifficulty(level: string): 'beginner' | 'intermediate' | 'advanced' {
  switch (level) {
    case 'advanced':
      return 'advanced'
    case 'struggling':
      return 'beginner'
    default:
      return 'intermediate'
  }
}

/**
 * Generate clustered tasks (grouped by skill level)
 */
export async function generateClusteredTasks(
  config: TaskConfiguration,
  studentIds: string[],
  courseId?: string
): Promise<Map<string, GeneratedTask[]>> {
  const profiles = await getStudentProfiles(studentIds, courseId)
  const tasksByCluster = new Map<string, GeneratedTask[]>()

  // Group students by cluster
  const clusters: Record<string, StudentProfile[]> = {
    advanced: [],
    intermediate: [],
    struggling: [],
  }

  profiles.forEach(profile => {
    const cluster = profile.cluster || 'intermediate'
    clusters[cluster].push(profile)
  })

  // Generate tasks for each cluster
  for (const [clusterName, clusterStudents] of Object.entries(clusters)) {
    if (clusterStudents.length === 0) continue

    // Adjust difficulty based on cluster
    const clusterConfig: TaskConfiguration = {
      ...config,
      difficulty:
        clusterName === 'advanced'
          ? 'advanced'
          : clusterName === 'struggling'
            ? 'beginner'
            : 'intermediate',
    }

    const prompt = createTaskGenerationPrompt(clusterConfig)
    const result = await generateWithFallback(prompt, { temperature: 0.7 })
    const tasks = parseTaskResponse(result.content)

    // Assign to all students in cluster
    for (const student of clusterStudents) {
      tasksByCluster.set(student.id, tasks)
    }
  }

  return tasksByCluster
}

/**
 * Generate peer group tasks (mixed abilities, same tasks)
 */
export async function generatePeerGroupTasks(
  config: TaskConfiguration,
  studentIds: string[],
  courseId?: string
): Promise<Map<string, GeneratedTask[]>> {
  await getStudentProfiles(studentIds, courseId)
  const tasks = await generateUniformTasks(config)
  const out = new Map<string, GeneratedTask[]>()
  for (const id of studentIds) out.set(id, tasks)
  return out
}

/**
 * Generate tasks based on distribution mode
 */
export async function generateAndDistributeTasks(
  mode: DistributionMode,
  config: TaskConfiguration,
  params: { studentIds?: string[]; targetStudentId?: string; courseId?: string } = {}
): Promise<{ success: boolean; tasks?: Map<string, GeneratedTask[]>; error?: string }> {
  try {
    const studentIds = params.studentIds || (params.targetStudentId ? [params.targetStudentId] : [])

    if (mode === 'uniform') {
      const tasks = await generateUniformTasks(config)
      const map = new Map<string, GeneratedTask[]>()
      for (const id of studentIds) map.set(id, tasks)
      return { success: true, tasks: map }
    }

    if (mode === 'personalized') {
      if (!params.targetStudentId)
        return { success: false, error: 'targetStudentId is required for personalized mode' }
      const profiles = await getStudentProfiles([params.targetStudentId], params.courseId)
      const tasks = await generatePersonalizedTasks(config, profiles[0]!)
      return { success: true, tasks: new Map([[params.targetStudentId, tasks]]) }
    }

    if (mode === 'clustered') {
      if (studentIds.length === 0)
        return { success: false, error: 'studentIds required for clustered mode' }
      const tasks = await generateClusteredTasks(config, studentIds, params.courseId)
      return { success: true, tasks }
    }

    if (mode === 'peer_group') {
      if (studentIds.length === 0)
        return { success: false, error: 'studentIds required for peer_group mode' }
      const tasks = await generatePeerGroupTasks(config, studentIds, params.courseId)
      return { success: true, tasks }
    }

    return { success: false, error: 'Unknown distribution mode' }
  } catch (e: any) {
    return { success: false, error: e?.message || 'Task generation failed' }
  }
}

/**
 * Save generated tasks to database and link them to students.
 */
export async function saveGeneratedTasks(
  tasksByStudent: Map<string, GeneratedTask[]>,
  meta: {
    roomId: string
    tutorId: string
    distributionMode: DistributionMode
    title: string
    description?: string
    type?: string
  }
): Promise<{ success: boolean; taskIds?: string[]; error?: string }> {
  try {
    if (tasksByStudent.size === 0) {
      return { success: false, error: 'No tasks to save' }
    }
    return {
      success: false,
      error: 'Generated tasks have been removed from the platform.',
    }
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to save generated tasks' }
  }
}

/**
 * Fetch recent submissions for a student (for adaptive generation).
 */
export async function getRecentTaskSubmissions(studentId: string, limit = 20) {
  return drizzleDb
    .select()
    .from(taskSubmission)
    .where(eq(taskSubmission.studentId, studentId))
    .orderBy(desc(taskSubmission.submittedAt))
    .limit(limit)
}
