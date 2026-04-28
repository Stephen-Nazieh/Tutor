require('dotenv').config({ path: '.env' })
const { Pool } = require('pg')
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function test() {
  try {
    const res = await pool.query(`
      SELECT COUNT(*) FROM "CourseEnrollment"
    `)
    console.log('Enrollment count:', res.rows[0].count)

    const res2 = await pool.query(`
      SELECT ce."courseId", ce."studentId", c.name, c."creatorId"
      FROM "CourseEnrollment" ce
      INNER JOIN "Course" c ON ce."courseId" = c."id"
      LIMIT 5
    `)
    console.log('Sample enrollments:', res2.rows)
  } catch (e) {
    console.error(e)
  } finally {
    pool.end()
  }
}
test()
