import { query } from '../adapters/db/drizzle.js';
export async function getProgressSnapshot(studentId) {
    const rows = await query(`SELECT "completionRate", strengths, weaknesses, "updatedAt"
     FROM "StudentPerformance"
     WHERE "studentId" = $1
     ORDER BY "updatedAt" DESC
     LIMIT 1`, [studentId]);
    return rows[0] || null;
}
