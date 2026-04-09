import { getDrizzleDb } from './src/lib/db/drizzle'
import { courseLesson, curriculumModule, course } from './src/lib/db/schema'

async function run() {
  try {
    const c = await getDrizzleDb().select().from(course).limit(1)
    if (!c.length) { console.log("No course found"); return; }
    const courseId = c[0].courseId
    console.log("Using course:", courseId)
    
    await getDrizzleDb().transaction(async tx => {
      await tx.insert(curriculumModule).values({
        moduleId: "mod-test-456",
        curriculumId: courseId,
        title: "Test Mod",
        order: 1,
        builderData: {}
      }).onConflictDoNothing()
      
      await tx.insert(courseLesson).values({
        lessonId: "less-test-456",
        courseId: courseId,
        title: "Test Lesson",
        order: 1,
        builderData: {
          tasks: [],
          assessments: [],
          homework: [],
          quizzes: []
        }
      }).onConflictDoNothing()
    })
    
    console.log("Success")
    process.exit(0)
  } catch (e) {
    console.error("ERROR:", e)
    process.exit(1)
  }
}
run()
