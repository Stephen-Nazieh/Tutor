/**
 * GET /api/one-on-one/deployables  (tutor only)
 *
 * The tutor's saved, published tasks that can be deployed into a live session's
 * classroom (the session-classroom deploy panel), grouped by the course + lesson
 * they belong to so the tutor knows exactly what they're deploying. Returns
 * enough to build the LiveTask the client emits over `task:deploy`.
 *
 * For assessment/homework tasks that carry structured DMI questions, we also
 * return the *student-safe* `dmiItems` (answers stripped via
 * `buildStudentDeployPayload`) so the deployed task is answerable in the live
 * classroom. The answer key is NEVER returned here — it stays in
 * `BuilderTaskDmi.items` server-side and the `task:complete` handler reloads it
 * by taskId to auto-grade.
 */

import { NextRequest, NextResponse } from 'next/server'
import { and, desc, eq, inArray, isNull, ne, or, sql } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { builderTask, builderTaskDmi, course, courseLesson, courseVariant } from '@/lib/db/schema'
import { buildStudentDeployPayload, type RawDeployDmiItem } from '@/lib/assessment/deploy-safety'
import type { StudentDmiItem } from '@/lib/assessment/student-dmi'

// The hidden system course that anchors course-less (ad-hoc) session deploys.
// Tasks under it are prior live deploys, not authored course content — keep them
// out of the deployable list. Mirrors ADHOC_ANCHOR_COURSE_ID in the socket server.
const ADHOC_ANCHOR_COURSE_ID = '__system_adhoc_course__'

/**
 * Resolve the whole template↔published variant family for a scoped course id.
 *
 * A course exists as a template plus N published variants (one per
 * nationality×category). Tasks are stored under whatever courseId the session
 * that authored them carried: a builder "teaching" session uses the TEMPLATE id,
 * while a scheduled live session carries the PUBLISHED-variant id. Scoping the
 * deploy panel by the raw session courseId therefore returns ZERO tasks whenever
 * the tasks were authored under a sibling id — the exact template/published
 * split documented across the codebase. Expanding to the family fixes both
 * directions. Standalone courses (no variant rows) resolve to just themselves,
 * so behaviour is unchanged for them.
 */
async function resolveCourseFamily(scopedId: string): Promise<string[]> {
  const rows = await drizzleDb
    .select({
      templateCourseId: courseVariant.templateCourseId,
      publishedCourseId: courseVariant.publishedCourseId,
    })
    .from(courseVariant)
    .where(
      or(
        eq(courseVariant.templateCourseId, scopedId),
        eq(courseVariant.publishedCourseId, scopedId)
      )
    )

  const family = new Set<string>([scopedId])
  const templateIds = new Set<string>()
  for (const r of rows) {
    family.add(r.templateCourseId)
    family.add(r.publishedCourseId)
    templateIds.add(r.templateCourseId)
  }

  // When `scopedId` is a published variant, the query above only matched its own
  // row — pull in the remaining siblings via the template(s) we just learned.
  if (templateIds.size > 0) {
    const siblings = await drizzleDb
      .select({ publishedCourseId: courseVariant.publishedCourseId })
      .from(courseVariant)
      .where(inArray(courseVariant.templateCourseId, [...templateIds]))
    for (const s of siblings) family.add(s.publishedCourseId)
  }

  return [...family]
}

/**
 * Materialize the course's authored lesson tasks — stored in the builder's
 * working model `courseLesson.builderData.{tasks,assessments,homework}` — into
 * BuilderTask + BuilderTaskDmi rows so they become deployable.
 *
 * Why: the deploy panel lists BuilderTask rows, but those are otherwise only
 * created the first time a task is deployed from a course class (the socket
 * `task:deploy` handler upserts them). A course whose tasks were authored but
 * never deployed therefore shows an empty panel — even though the tutor can see
 * the tasks under "Edit course" (which reads builderData). This runs the SAME
 * builderData→BuilderTask copy the deploy path already performs, up front and
 * scoped to this session's course family, keeping the answer key server-side in
 * BuilderTaskDmi exactly as the deploy path does (the deployables query below
 * still strips it via buildStudentDeployPayload before anything reaches a client).
 *
 * Idempotent: upserts keyed on the authored item id and refreshed from
 * builderData (the source of truth), so re-opening the panel just no-ops/refreshes.
 */
async function materializeCourseFamilyTasks(tutorId: string, familyIds: string[]): Promise<void> {
  const lessons = await drizzleDb
    .select({
      lessonId: courseLesson.lessonId,
      courseId: courseLesson.courseId,
      builderData: courseLesson.builderData,
    })
    .from(courseLesson)
    .where(and(inArray(courseLesson.courseId, familyIds), isNull(courseLesson.deletedAt)))

  const now = new Date()
  const SOURCES: Array<['task' | 'assessment' | 'homework', string]> = [
    ['task', 'tasks'],
    ['assessment', 'assessments'],
    ['homework', 'homework'],
  ]
  const taskRows: (typeof builderTask.$inferInsert)[] = []
  const dmiRows: (typeof builderTaskDmi.$inferInsert)[] = []
  const seen = new Set<string>()

  for (const l of lessons) {
    const bd = (l.builderData ?? {}) as Record<string, unknown>
    for (const [type, key] of SOURCES) {
      const arr = Array.isArray(bd[key]) ? (bd[key] as Record<string, unknown>[]) : []
      for (const item of arr) {
        const id = typeof item?.id === 'string' ? item.id : null
        if (!id || seen.has(id) || taskRows.length >= 500) continue
        seen.add(id)
        const title = (typeof item.title === 'string' && item.title.trim()) || 'Untitled task'
        const content =
          (typeof item.content === 'string' && item.content) ||
          (typeof item.description === 'string' && item.description) ||
          (typeof item.instructions === 'string' && item.instructions) ||
          ''
        taskRows.push({
          taskId: id,
          courseId: l.courseId,
          lessonId: l.lessonId,
          tutorId,
          title,
          content,
          pci: '',
          type,
          status: 'published',
          publishedAt: now,
          createdAt: now,
          updatedAt: now,
        })
        if (Array.isArray(item.dmiItems) && item.dmiItems.length > 0) {
          dmiRows.push({
            dmiId: `dmi-${id}`,
            taskId: id,
            type: type === 'assessment' ? 'assessment' : 'task',
            items: item.dmiItems,
            createdAt: now,
            updatedAt: now,
          })
        }
      }
    }
  }

  if (taskRows.length === 0) return

  await drizzleDb
    .insert(builderTask)
    .values(taskRows)
    .onConflictDoUpdate({
      target: builderTask.taskId,
      set: {
        title: sql`excluded."title"`,
        content: sql`excluded."content"`,
        type: sql`excluded."type"`,
        courseId: sql`excluded."courseId"`,
        lessonId: sql`excluded."lessonId"`,
        status: sql`excluded."status"`,
        publishedAt: sql`excluded."publishedAt"`,
        updatedAt: sql`excluded."updatedAt"`,
      },
    })

  if (dmiRows.length > 0) {
    await drizzleDb
      .insert(builderTaskDmi)
      .values(dmiRows)
      .onConflictDoUpdate({
        target: builderTaskDmi.dmiId,
        set: {
          items: sql`excluded."items"`,
          type: sql`excluded."type"`,
          updatedAt: sql`excluded."updatedAt"`,
        },
      })
  }
}

export const GET = withAuth(
  async (req: NextRequest, session) => {
    // When a live session is built around a course, the classroom passes its
    // courseId so ONLY that course's tasks are deployable; with no course, all
    // of the tutor's published tasks are offered.
    const scopedCourseId = new URL(req.url).searchParams.get('courseId')?.trim() || null
    // Scope to the whole variant family, not just the raw id, so tasks authored
    // under a sibling variant/template id are still found (see resolveCourseFamily).
    const scopedFamily = scopedCourseId ? await resolveCourseFamily(scopedCourseId) : null

    // Ensure the course's authored lesson tasks exist as deployable BuilderTask
    // rows before we read them (see materializeCourseFamilyTasks). Only for a
    // course-scoped session; non-critical, so a failure never blocks the panel.
    if (scopedFamily) {
      try {
        await materializeCourseFamilyTasks(session.user.id, scopedFamily)
      } catch (err) {
        console.warn('[deployables] task materialization failed (non-critical):', err)
      }
    }

    const rows = await drizzleDb
      .select({
        taskId: builderTask.taskId,
        title: builderTask.title,
        type: builderTask.type,
        content: builderTask.content,
        lessonId: builderTask.lessonId,
        courseId: builderTask.courseId,
        courseName: course.name,
        coursePublished: course.isPublished,
        lessonTitle: courseLesson.title,
        lessonOrder: courseLesson.order,
      })
      .from(builderTask)
      .leftJoin(course, eq(builderTask.courseId, course.courseId))
      .leftJoin(courseLesson, eq(builderTask.lessonId, courseLesson.lessonId))
      .where(
        and(
          eq(builderTask.tutorId, session.user.id),
          eq(builderTask.status, 'published'),
          isNull(builderTask.deletedAt),
          ne(builderTask.courseId, ADHOC_ANCHOR_COURSE_ID),
          ...(scopedFamily ? [inArray(builderTask.courseId, scopedFamily)] : [])
        )
      )
      .orderBy(desc(builderTask.updatedAt))
      .limit(200)

    // Load the latest DMI item set per task in one query, then project each to
    // its student-safe form. Answer-bearing fields (answer/rubric/pairs/regions)
    // are dropped by `toStudentDmiItem`; only the prompts + option banks remain.
    const taskIds = rows.map(r => r.taskId)
    const safeItemsByTask = new Map<string, StudentDmiItem[]>()
    if (taskIds.length > 0) {
      const dmiRows = await drizzleDb
        .select({
          taskId: builderTaskDmi.taskId,
          items: builderTaskDmi.items,
          updatedAt: builderTaskDmi.updatedAt,
        })
        .from(builderTaskDmi)
        .where(inArray(builderTaskDmi.taskId, taskIds))
        .orderBy(desc(builderTaskDmi.updatedAt))

      // Keep only the most-recent row per task (rows arrive newest-first).
      for (const row of dmiRows) {
        if (safeItemsByTask.has(row.taskId)) continue
        const rawItems = Array.isArray(row.items) ? (row.items as RawDeployDmiItem[]) : []
        if (rawItems.length === 0) continue
        const { dmiItems } = buildStudentDeployPayload(rawItems)
        safeItemsByTask.set(row.taskId, dmiItems)
      }
    }

    return NextResponse.json({
      tasks: rows.map(r => ({
        taskId: r.taskId,
        title: r.title || 'Untitled task',
        type: (r.type as 'task' | 'assessment' | 'homework') || 'task',
        content: r.content || '',
        lessonId: r.lessonId || null,
        courseId: r.courseId || null,
        courseName: r.courseName || 'Uncategorized',
        coursePublished: r.coursePublished ?? false,
        lessonTitle: r.lessonTitle || null,
        lessonOrder: typeof r.lessonOrder === 'number' ? r.lessonOrder : null,
        dmiItems: safeItemsByTask.get(r.taskId) ?? [],
      })),
    })
  },
  { role: 'TUTOR' }
)
