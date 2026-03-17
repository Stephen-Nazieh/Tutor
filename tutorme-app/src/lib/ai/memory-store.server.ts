import 'server-only'

import { and, eq, gt, isNull, or, sql } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { profile as profileTable, user as userTable, studentMemoryProfile, studentLearningState, studentAgentSignal } from '@/lib/db/schema'
import type { AgentSignal, EnglishLevel, LearningState, StudentContext, StudentProfile } from './types/context'

function initialState(): LearningState {
  return {
    currentMood: 'neutral',
    energyLevel: 100,
    recentStruggles: [],
    masteredTopics: [],
    activeTopics: [],
  }
}

function coerceEnglishLevel(value: unknown): EnglishLevel {
  const v = typeof value === 'string' ? value.toUpperCase() : ''
  const allowed: EnglishLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  return (allowed.includes(v as EnglishLevel) ? (v as EnglishLevel) : 'B1')
}

async function buildDefaultStudentProfile(studentId: string): Promise<StudentProfile | null> {
  const [row] = await drizzleDb
    .select({
      userId: userTable.id,
      email: userTable.email,
      name: profileTable.name,
      gradeLevel: profileTable.gradeLevel,
      learningGoals: profileTable.learningGoals,
      subjectsOfInterest: profileTable.subjectsOfInterest,
    })
    .from(userTable)
    .leftJoin(profileTable, eq(profileTable.userId, userTable.id))
    .where(eq(userTable.id, studentId))
    .limit(1)

  if (!row) return null

  // Minimal mapping; can be expanded as onboarding captures more fields.
  return {
    id: studentId,
    name: row.name ?? row.email ?? `student-${studentId.slice(0, 6)}`,
    age: 15,
    level: coerceEnglishLevel(row.gradeLevel),
    learningStyle: 'mixed',
    interests: Array.isArray(row.subjectsOfInterest) ? row.subjectsOfInterest : [],
    goals: Array.isArray(row.learningGoals) ? row.learningGoals : [],
    preferredVoice: { gender: 'female', accent: 'us' },
  }
}

async function getOrCreateProfile(studentId: string): Promise<StudentProfile | null> {
  const [existing] = await drizzleDb
    .select({ profile: studentMemoryProfile.profile })
    .from(studentMemoryProfile)
    .where(eq(studentMemoryProfile.studentId, studentId))
    .limit(1)

  if (existing?.profile) return existing.profile as StudentProfile

  const built = await buildDefaultStudentProfile(studentId)
  if (!built) return null

  await drizzleDb
    .insert(studentMemoryProfile)
    .values({ studentId, profile: built })
    .onConflictDoUpdate({
      target: studentMemoryProfile.studentId,
      set: { profile: built, updatedAt: sql`now()` },
    })

  return built
}

async function getOrCreateState(studentId: string): Promise<LearningState> {
  const [existing] = await drizzleDb
    .select({ state: studentLearningState.state })
    .from(studentLearningState)
    .where(eq(studentLearningState.studentId, studentId))
    .limit(1)

  if (existing?.state) return existing.state as LearningState

  const state = initialState()
  await drizzleDb
    .insert(studentLearningState)
    .values({ studentId, state })
    .onConflictDoUpdate({
      target: studentLearningState.studentId,
      set: { state, updatedAt: sql`now()` },
    })
  return state
}

export async function getStudentContextDb(studentId: string): Promise<StudentContext | null> {
  const profile = await getOrCreateProfile(studentId)
  if (!profile) return null
  const state = await getOrCreateState(studentId)

  const now = new Date()
  const studentSignals = await drizzleDb
    .select({
      id: studentAgentSignal.id,
      source: studentAgentSignal.source,
      type: studentAgentSignal.type,
      content: studentAgentSignal.content,
      context: studentAgentSignal.context,
      expiresAt: studentAgentSignal.expiresAt,
      createdAt: studentAgentSignal.createdAt,
    })
    .from(studentAgentSignal)
    .where(
      and(
        eq(studentAgentSignal.studentId, studentId),
        or(isNull(studentAgentSignal.expiresAt), gt(studentAgentSignal.expiresAt, now))
      )
    )
    .orderBy(studentAgentSignal.createdAt)
    .limit(50)

  const signals: AgentSignal[] = studentSignals.map((s) => ({
    id: String(s.id),
    source: s.source as AgentSignal['source'],
    type: s.type as AgentSignal['type'],
    content: s.content,
    context: (s.context ?? undefined) as any,
    expiresAt: s.expiresAt ? s.expiresAt.getTime() : undefined,
    timestamp: s.createdAt.getTime(),
  }))

  return { profile, state, signals }
}

export async function updateStateDb(
  studentId: string,
  updateFn: (state: LearningState) => LearningState
): Promise<void> {
  const current = await getOrCreateState(studentId)
  const next = updateFn({ ...current })
  await drizzleDb
    .insert(studentLearningState)
    .values({ studentId, state: next })
    .onConflictDoUpdate({
      target: studentLearningState.studentId,
      set: { state: next, updatedAt: sql`now()` },
    })
}

export async function recordSignalDb(
  studentId: string,
  signal: Omit<AgentSignal, 'id' | 'timestamp'>
): Promise<void> {
  await drizzleDb.insert(studentAgentSignal).values({
    studentId,
    source: signal.source,
    type: signal.type,
    content: signal.content,
    context: signal.context ?? null,
    expiresAt: signal.expiresAt ? new Date(signal.expiresAt) : null,
  })
}

