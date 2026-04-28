require('dotenv').config({ path: '.env.local' })
const { Pool } = require('pg')
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function test() {
  try {
    const res = await pool.query(`
      SELECT ce."courseId", ce."studentId", c.name, c.categories, c."creatorId", p.name as tutor_name
      FROM "CourseEnrollment" ce
      INNER JOIN "Course" c ON ce."courseId" = c."id"
      LEFT JOIN "Profile" p ON c."creatorId" = p."userId"
      LIMIT 10
    `)
    console.log('Enrollments:', res.rows)
  } catch (e) {
    console.error(e)
  } finally {
    pool.end()
  }
}
test()
