import { query } from '../adapters/db/drizzle.js'

export interface StudentProfile {
  id: string
  name: string
  email: string
  gradeLevel: string | null
  learningStyle: string | null
  xp: number
  streakDays: number
}

export async function getStudentProfile(studentId: string): Promise<StudentProfile | null> {
  const rows = await query<StudentProfile>(
    `SELECT u.id,
            COALESCE(p.name, 'Student') AS name,
            u.email,
            p."gradeLevel" AS "gradeLevel",
            sp."learningStyle" AS "learningStyle",
            COALESCE(ug.xp, 0) AS xp,
            COALESCE(ug."streakDays", 0) AS "streakDays"
     FROM "User" u
     LEFT JOIN "Profile" p ON p."userId" = u.id
     LEFT JOIN "StudentPerformance" sp ON sp."studentId" = u.id
     LEFT JOIN "UserGamification" ug ON ug."userId" = u.id
     WHERE u.id = $1
     ORDER BY sp."updatedAt" DESC NULLS LAST
     LIMIT 1`,
    [studentId]
  )

  return rows[0] || null
}
