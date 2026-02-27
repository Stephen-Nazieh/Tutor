/**
 * AI Task Generator Service
 * Generates personalized tasks with multiple distribution modes
 */

import { eq } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { prismaLegacyClient as db } from '@/lib/db/prisma-legacy'
import { studentPerformance } from '@/lib/db/schema'
import { generateWithFallback } from './orchestrator'

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
  try {
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    return parsed.tasks || []
  } catch (error) {
    console.error('Failed to parse task response:', error)
    // Return fallback tasks
    return [{
      id: 'fallback_1',
      type: 'short_answer',
      question: '请描述你对这个知识点的理解',
      difficulty: 5,
      topics: ['general'],
      explanation: '这是一个默认题目，请重新生成任务。'
    }]
  }
}

/**
 * Generate uniform tasks (same for all students)
 */
export async function generateUniformTasks(
  config: TaskConfiguration
): Promise<GeneratedTask[]> {
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
 * Get student profiles for a curriculum
 */
async function getStudentProfiles(
  studentIds: string[],
  curriculumId?: string
): Promise<StudentProfile[]> {
  const profiles = await Promise.all(
    studentIds.map(async (id) => {
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
          cluster: 'intermediate' as const
        }
      }

      return {
        id,
        currentLevel: mapLevelToDifficulty(performance.cluster),
        strengths: (performance.strengths as string[]) || [],
        weaknesses: (performance.weaknesses as string[]) || [],
        cluster: performance.cluster as any,
        learningStyle: performance.learningStyle
      }
    })
  )

  return profiles
}

function mapLevelToDifficulty(level: string): 'beginner' | 'intermediate' | 'advanced' {
  switch (level) {
    case 'advanced': return 'advanced'
    case 'struggling': return 'beginner'
    default: return 'intermediate'
  }
}

/**
 * Generate clustered tasks (grouped by skill level)
 */
export async function generateClusteredTasks(
  config: TaskConfiguration,
  studentIds: string[],
  curriculumId?: string
): Promise<Map<string, GeneratedTask[]>> {
  const profiles = await getStudentProfiles(studentIds, curriculumId)
  const tasksByCluster = new Map<string, GeneratedTask[]>()

  // Group students by cluster
  const clusters: Record<string, StudentProfile[]> = {
    advanced: [],
    intermediate: [],
    struggling: []
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
      difficulty: clusterName === 'advanced' ? 'advanced' :
        clusterName === 'struggling' ? 'beginner' : 'intermediate'
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
  curriculumId?: string
): Promise<Map<string, GeneratedTask[]>> {
  const profiles = await getStudentProfiles(studentIds, curriculumId)
  const tasksByStudent = new Map<string, GeneratedTask[]>()

  // Analyze group composition
  const levels = profiles.map(p => p.currentLevel)
  const levelCounts = levels.reduce((acc, level) => {
    acc[level] = (acc[level] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Determine group task difficulty
  const dominantLevel = Object.entries(levelCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'intermediate'

  const groupConfig: TaskConfiguration = {
    ...config,
    difficulty: dominantLevel as any
  }

  // Generate tasks that work for mixed abilities
  const prompt = `${createTaskGenerationPrompt(groupConfig)}

特别注意：这些题目将用于混合能力小组学习。请确保：
1. 题目有多个层次的理解深度
2. 初学者可以通过基础方法解答
3. 高水平学生可以展示更深入的理解
4. 鼓励小组讨论和互助学习`

  const result = await generateWithFallback(prompt, { temperature: 0.7 })
  const tasks = parseTaskResponse(result.content)

  // Assign same tasks to all students
  studentIds.forEach(id => {
    tasksByStudent.set(id, tasks)
  })

  return tasksByStudent
}

/**
 * Main task generation function with all distribution modes
 */
export async function generateAndDistributeTasks(
  mode: DistributionMode,
  config: TaskConfiguration,
  options: {
    studentIds?: string[]
    curriculumId?: string
    targetStudentId?: string
  }
): Promise<{ success: boolean; tasks?: Map<string, GeneratedTask[]>; error?: string }> {
  try {
    let tasksByStudent: Map<string, GeneratedTask[]> = new Map()

    switch (mode) {
      case 'uniform': {
        const tasks = await generateUniformTasks(config)
        // Same tasks for all or target student
        const targetIds = options.targetStudentId
          ? [options.targetStudentId]
          : options.studentIds || []
        targetIds.forEach(id => tasksByStudent.set(id, tasks))
        break
      }

      case 'personalized': {
        if (!options.targetStudentId && !options.studentIds?.length) {
          return { success: false, error: '需要指定学生ID' }
        }

        const targetIds = options.targetStudentId
          ? [options.targetStudentId]
          : options.studentIds!

        for (const studentId of targetIds) {
          const profiles = await getStudentProfiles([studentId], options.curriculumId)
          const tasks = await generatePersonalizedTasks(config, profiles[0])
          tasksByStudent.set(studentId, tasks)
        }
        break
      }

      case 'clustered': {
        if (!options.studentIds?.length) {
          return { success: false, error: '需要指定学生列表' }
        }
        tasksByStudent = await generateClusteredTasks(
          config,
          options.studentIds,
          options.curriculumId
        )
        break
      }

      case 'peer_group': {
        if (!options.studentIds?.length) {
          return { success: false, error: '需要指定学生列表' }
        }
        tasksByStudent = await generatePeerGroupTasks(
          config,
          options.studentIds,
          options.curriculumId
        )
        break
      }

      default:
        return { success: false, error: '未知的分发模式' }
    }

    return { success: true, tasks: tasksByStudent }
  } catch (error) {
    console.error('Task generation failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '任务生成失败'
    }
  }
}

/**
 * Save generated tasks to database
 */
export async function saveGeneratedTasks(
  tasksByStudent: Map<string, GeneratedTask[]>,
  options: {
    roomId: string
    tutorId: string
    distributionMode: DistributionMode
    title: string
    description?: string
    type?: string
  }
): Promise<{ success: boolean; taskIds?: string[]; error?: string }> {
  try {
    const taskIds: string[] = []

    // Group all tasks by their type/topic for batch creation
    for (const [studentId, tasks] of tasksByStudent.entries()) {
      // Create assignments map for this task set
      const assignments: Record<string, any> = {}
      assignments[studentId] = tasks.map(t => ({
        taskId: t.id,
        question: t.question,
        type: t.type,
        difficulty: t.difficulty,
        hints: t.hints,
        rubric: t.rubric
      }))

      const savedTask = await db.generatedTask.create({
        data: {
          tutorId: options.tutorId,
          roomId: options.roomId,
          title: options.title,
          description: options.description || `${options.title} - 共${tasks.length}道题目`,
          type: options.type || 'assignment',
          difficulty: tasks[0]?.difficulty <= 3 ? 'easy' : tasks[0]?.difficulty <= 7 ? 'medium' : 'hard',
          questions: tasks.map(t => ({
            id: t.id,
            question: t.question,
            type: t.type,
            options: t.options,
            correctAnswer: t.correctAnswer,
            explanation: t.explanation,
            difficulty: t.difficulty,
            topics: t.topics,
            hints: t.hints
          })),
          distributionMode: options.distributionMode,
          assignments: assignments,
          status: 'draft'
        }
      })
      taskIds.push(savedTask.id)
    }

    return { success: true, taskIds }
  } catch (error) {
    console.error('Failed to save tasks:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '保存任务失败'
    }
  }
}

/**
 * Get tasks for a student
 * Returns tasks where student has assignments
 */
export async function getStudentTasks(
  studentId: string,
  options?: {
    status?: 'draft' | 'assigned' | 'completed'
    roomId?: string
  }
): Promise<GeneratedTask[]> {
  const tasks = await db.generatedTask.findMany({
    where: {
      ...(options?.roomId && { roomId: options.roomId }),
      ...(options?.status && { status: options.status })
    },
    orderBy: { createdAt: 'desc' }
  })

  // Filter tasks that have assignments for this student
  const studentTasks: GeneratedTask[] = []
  for (const task of tasks) {
    const assignments = task.assignments as Record<string, any> || {}
    if (assignments[studentId]) {
      const taskVariants = assignments[studentId]
      studentTasks.push(...taskVariants.map((t: any) => ({
        id: t.taskId,
        type: t.type,
        question: t.question,
        difficulty: t.difficulty,
        topics: t.topics || [],
        hints: t.hints,
        rubric: t.rubric
      })))
    }
  }

  return studentTasks
}

/**
 * Submit task completion
 */
/** Per-question result for analytics */
export interface TaskQuestionResultItem {
  questionId: string
  correct: boolean
  pointsEarned: number
  pointsMax: number
  selectedAnswer?: unknown
  timeSpentSec?: number
}

export async function submitTask(
  generatedTaskId: string,
  studentId: string,
  submission: {
    answers: any
    timeSpent: number
    questionIndex?: number
    questionResults?: TaskQuestionResultItem[]
  }
): Promise<{ success: boolean; score?: number; feedback?: string; error?: string }> {
  try {
    // Get the task
    const task = await db.generatedTask.findUnique({
      where: { id: generatedTaskId }
    })

    if (!task) {
      return { success: false, error: '任务不存在' }
    }

    // Check if student has assignment for this task
    const assignments = task.assignments as Record<string, any> || {}
    if (!assignments[studentId]) {
      return { success: false, error: '无权提交此任务' }
    }

    // Get the specific question
    const questions = task.questions as any[] || []
    const questionIndex = submission.questionIndex || 0
    const question = questions[questionIndex]

    if (!question) {
      return { success: false, error: '题目不存在' }
    }

    // Calculate score using AI
    const gradingPrompt = `请评估以下学生答案：

题目：${question.question}
正确答案：${question.correctAnswer || '开放式问题'}
评分标准：${JSON.stringify(question.rubric || [])}

学生答案：${JSON.stringify(submission.answers)}

请提供：
1. 分数（满分100）
2. 详细反馈
3. 改进建议

请返回JSON格式：
{
  "score": 85,
  "feedback": "详细反馈...",
  "suggestions": ["建议1", "建议2"]
}`

    const gradingResult = await generateWithFallback(gradingPrompt, { temperature: 0.3 })
    const gradingData = JSON.parse(gradingResult.content.match(/\{[\s\S]*\}/)?.[0] || '{}')

    const score = gradingData.score || 0
    const questionId = (question as { id?: string }).id ?? `q-${questionIndex}`
    const questionResults = submission.questionResults ?? [{
      questionId,
      correct: score >= 70,
      pointsEarned: score,
      pointsMax: 100,
      selectedAnswer: submission.answers,
      timeSpentSec: submission.timeSpent
    }]

    // Create submission record
    await db.taskSubmission.create({
      data: {
        taskId: generatedTaskId,
        studentId,
        answers: submission.answers,
        score,
        maxScore: 100,
        timeSpent: submission.timeSpent,
        questionResults: questionResults as unknown as object,
        aiFeedback: {
          feedback: gradingData.feedback,
          suggestions: gradingData.suggestions
        }
      }
    })

    return {
      success: true,
      score: gradingData.score,
      feedback: gradingData.feedback
    }
  } catch (error) {
    console.error('Task submission failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '提交失败'
    }
  }
}
