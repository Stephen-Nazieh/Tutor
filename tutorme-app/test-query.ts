import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })
import { drizzleDb } from './src/lib/db/drizzle'
import { liveSession, courseEnrollment } from './src/lib/db/schema'
import { eq, and, asc } from 'drizzle-orm'

async function run() {
  try {
    const studentId = "test"
    const courseId = "cm38dn" // or any
    
    console.log("Checking DB directly")
    
    const sessions = await drizzleDb.query.liveSession.findMany({
      with: {
        participants: true
      }
    })
    console.log("All sessions:", sessions.map(s => ({id: s.sessionId, courseId: s.courseId})))
    
    const enrollments = await drizzleDb.query.courseEnrollment.findMany()
    console.log("All enrollments:", enrollments.map(e => ({student: e.studentId, course: e.courseId})))
    
  } catch (e) {
    console.error(e)
  }
}
run().then(() => process.exit(0))
