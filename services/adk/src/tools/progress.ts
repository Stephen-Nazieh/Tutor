import { query } from '../adapters/db/drizzle'

export interface ProgressSnapshot {
  completionRate: number
  strengths: unknown
  weaknesses: unknown
  updatedAt: string
}

export async function getProgressSnapshot(studentId: string): Promise<ProgressSnapshot | null> {
  const rows = await query<ProgressSnapshot>(
    `SELECT "completionRate", strengths, weaknesses, "updatedAt"
     FROM "StudentPerformance"
     WHERE "studentId" = $1
     ORDER BY "updatedAt" DESC
     LIMIT 1`,
    [studentId]
  )
  return rows[0] || null
}
