/**
 * GET /api/parent/dashboard
 * Parent dashboard overview - children, stats, activity, notifications
 * Requires PARENT role, family account validation
 *
 * Performance: <200ms target, 85%+ cache hit rate
 * Cache: L1 memory + L2 Redis, 300s TTL via cache.getOrSet
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, and, inArray, gte, desc, or } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculum,
  curriculumEnrollment,
  curriculumLessonProgress,
  userGamification,
  achievement,
  taskSubmission,
  generatedTask,
  clinic,
  clinicBooking,
  familyPayment,
  payment,
  familyNotification,
  parentActivityLog,
  profile
} from '@/lib/db/schema'
import cacheManager from '@/lib/cache-manager'

const CACHE_TTL = parseInt(process.env.CACHE_TTL_PARENT_DASHBOARD || '300', 10)

export const GET = withAuth(
  async (req: NextRequest, session) => {
    const startTime = Date.now()
    const family = await getFamilyAccountForParent(session)
    if (!family) {
      return NextResponse.json(
        { error: '未找到家庭账户，请先完成家长注册' },
        { status: 404 }
      )
    }

    const cacheKey = `parent:dashboard:${family.id}:${session.user.id}`

    const data = await cacheManager.getOrSet(
      cacheKey,
      async () => {
        const { studentIds } = family
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        const [
          enrollments,
          lessonProgress,
          gamification,
          achievements,
          taskSubmissions,
          allGeneratedTasks,
          upcomingClinicBookings,
          familyPayments,
          studentPaymentsThisMonth,
          pendingStudentPayments,
          familyNotifications,
          parentActivities,
        ] = await Promise.all([
          studentIds.length > 0
            ? drizzleDb.query.curriculumEnrollment.findMany({
              where: inArray(curriculumEnrollment.studentId, studentIds),
              with: {
                curriculum: { columns: { id: true, name: true } },
              },
            })
            : Promise.resolve([]),
          studentIds.length > 0
            ? drizzleDb.query.curriculumLessonProgress.findMany({
              where: inArray(curriculumLessonProgress.studentId, studentIds),
              columns: { studentId: true, status: true, completedAt: true },
            })
            : Promise.resolve([]),
          studentIds.length > 0
            ? drizzleDb.query.userGamification.findMany({
              where: inArray(userGamification.userId, studentIds),
              columns: { userId: true, lastLogin: true },
            })
            : Promise.resolve([]),
          studentIds.length > 0
            ? drizzleDb.query.achievement.findMany({
              where: inArray(achievement.userId, studentIds),
              orderBy: [desc(achievement.unlockedAt)],
              limit: 10,
              columns: { id: true, userId: true, title: true, description: true, unlockedAt: true },
            })
            : Promise.resolve([]),
          studentIds.length > 0
            ? drizzleDb.query.taskSubmission.findMany({
              where: inArray(taskSubmission.studentId, studentIds),
              columns: { id: true, taskId: true, studentId: true, submittedAt: true },
            })
            : Promise.resolve([]),
          studentIds.length > 0
            ? drizzleDb.query.generatedTask.findMany({
              where: inArray(generatedTask.status, ['assigned', 'completed']),
              orderBy: [desc(generatedTask.createdAt)],
              limit: 200,
              columns: { id: true, dueDate: true, assignments: true },
            })
            : Promise.resolve([]),
          studentIds.length > 0
            ? drizzleDb.query.clinicBooking.findMany({
              where: inArray(clinicBooking.studentId, studentIds),
              with: {
                clinic: { columns: { title: true, startTime: true } },
              },
            })
            : Promise.resolve([]),
          drizzleDb.query.familyPayment.findMany({
            where: and(eq(familyPayment.parentId, family.id), gte(familyPayment.createdAt, startOfMonth)),
            orderBy: [desc(familyPayment.createdAt)],
            limit: 100,
            columns: { id: true, amount: true, status: true, createdAt: true },
          }),
          studentIds.length > 0
            ? drizzleDb
                .select({ id: payment.id, amount: payment.amount })
                .from(payment)
                .leftJoin(clinicBooking, eq(payment.bookingId, clinicBooking.id))
                .leftJoin(curriculumEnrollment, eq(payment.enrollmentId, curriculumEnrollment.id))
                .where(
                  and(
                    eq(payment.status, 'COMPLETED'),
                    gte(payment.createdAt, startOfMonth),
                    or(
                      inArray(clinicBooking.studentId, studentIds),
                      inArray(curriculumEnrollment.studentId, studentIds)
                    )
                  )
                )
            : Promise.resolve([]),
          studentIds.length > 0
            ? drizzleDb
                .select({
                  id: payment.id,
                  amount: payment.amount,
                  createdAt: payment.createdAt,
                  clinicTitle: clinic.title,
                  clinicStartTime: clinic.startTime,
                  curriculumName: curriculum.name,
                })
                .from(payment)
                .leftJoin(clinicBooking, eq(payment.bookingId, clinicBooking.id))
                .leftJoin(curriculumEnrollment, eq(payment.enrollmentId, curriculumEnrollment.id))
                .leftJoin(clinic, eq(clinicBooking.clinicId, clinic.id))
                .leftJoin(curriculum, eq(curriculumEnrollment.curriculumId, curriculum.id))
                .where(
                  and(
                    inArray(payment.status, ['PENDING', 'PROCESSING']),
                    or(
                      inArray(clinicBooking.studentId, studentIds),
                      inArray(curriculumEnrollment.studentId, studentIds)
                    )
                  )
                )
                .orderBy(desc(payment.createdAt))
                .limit(20)
            : Promise.resolve([]),
          drizzleDb.query.familyNotification.findMany({
            where: eq(familyNotification.parentId, family.id),
            orderBy: [desc(familyNotification.createdAt)],
            limit: 10,
            columns: { id: true, message: true, isRead: true, createdAt: true },
          }),
          drizzleDb.query.parentActivityLog.findMany({
            where: eq(parentActivityLog.parentId, family.id),
            orderBy: [desc(parentActivityLog.createdAt)],
            limit: 10,
            columns: { id: true, action: true, details: true, createdAt: true },
          }),
        ])

        const upcomingClinicBookingsFiltered = (upcomingClinicBookings as { clinic?: { startTime: Date } }[]).filter(
          (b) => b.clinic && new Date(b.clinic.startTime) >= now
        )
        const activeClinicBookings = upcomingClinicBookingsFiltered

        const submissionSet = new Set(taskSubmissions.map((s: any) => `${s.studentId}:${s.taskId}`))
        const assignmentsDueByStudent = new Map<string, number>()
        for (const sid of studentIds) assignmentsDueByStudent.set(sid, 0)
        for (const task of allGeneratedTasks) {
          const assignmentMap = (task.assignments || {}) as Record<string, unknown>
          for (const sid of studentIds) {
            if (!Object.prototype.hasOwnProperty.call(assignmentMap, sid)) continue
            const submitted = submissionSet.has(`${sid}:${task.id}`)
            if (!submitted) {
              assignmentsDueByStudent.set(sid, (assignmentsDueByStudent.get(sid) ?? 0) + 1)
            }
          }
        }


        const children = family.members
          .filter((m: any) => ['child', 'children'].includes(m.relation.toLowerCase()))
          .map((m: any) => {
            const uid = m.userId
            const enrolls = enrollments.filter((e: any) => e.studentId === uid)
            const progress = lessonProgress.filter((p: any) => p.studentId === uid)
            const completed = progress.filter((p: any) => p.status === 'COMPLETED').length
            const total = progress.length
            const gam = gamification.find((g: any) => g.userId === uid)
            const recentAchievement = achievements.find((a: any) => a.userId === uid)
            const upcomingClassesCount = activeClinicBookings.filter((b: any) => b.studentId === uid).length
            const assignmentsDue = uid ? (assignmentsDueByStudent.get(uid) ?? 0) : 0

            return {
              id: uid || m.id,
              name: m.user?.profile?.name || m.name,
              grade: m.user?.profile?.gradeLevel || 'Not set',
              avatar: (m.name || '?').slice(0, 2).toUpperCase(),
              upcomingClasses: upcomingClassesCount,
              assignmentsDue,
              progress: total > 0 ? Math.round((completed / total) * 100) : 0,
              lastActive: gam?.lastLogin
                ? formatRelativeTime(gam.lastLogin)
                : '—',
              subjects: [...new Set(enrolls.map((e: any) => e.curriculum?.name).filter(Boolean))],
              recentAchievement: recentAchievement?.title || null,
            }
          })

        const familySpentThisMonth = familyPayments
          .filter((p: any) => p.status === 'completed' || p.status === 'paid')
          .reduce((s: any, p: any) => s + p.amount, 0)
        const studentPaymentsList = Array.isArray(studentPaymentsThisMonth) ? studentPaymentsThisMonth : []
        const studentSpentThisMonth = studentPaymentsList.reduce((s: number, p: { amount?: number }) => s + (p.amount ?? 0), 0)
        const spentThisMonth = familySpentThisMonth + studentSpentThisMonth

        const recentActivity = [
          ...parentActivities.slice(0, 5).map((a: any) => ({
            id: a.id,
            type: 'activity' as const,
            description: a.action + (a.details ? `: ${a.details}` : ''),
            time: formatRelativeTime(a.createdAt),
            _ts: a.createdAt.getTime(),
          })),
          ...achievements.slice(0, 3).map((a: any) => ({
            id: a.id,
            type: 'achievement_earned' as const,
            description: `${a.title} - ${a.description}`,
            time: formatRelativeTime(a.unlockedAt),
            _ts: new Date(a.unlockedAt).getTime(),
          })),
        ]
          .sort((a, b) => b._ts - a._ts)
          .slice(0, 10)
          .map(({ _ts, ...rest }) => rest)

        return {
          parentName: session.user?.name || family.familyName,
          children,
          financialSummary: {
            monthlyBudget: family.monthlyBudget,
            spentThisMonth,
            upcomingPayments: (Array.isArray(pendingStudentPayments) ? pendingStudentPayments : []).slice(0, 5).map((p: { id: string; amount: number; clinicTitle?: string | null; curriculumName?: string | null; clinicStartTime?: Date | null; createdAt: Date }) => ({
              id: p.id,
              description: p.clinicTitle ?? p.curriculumName ?? 'Pending payment',
              amount: p.amount,
              dueDate: (p.clinicStartTime ?? p.createdAt) instanceof Date ? (p.clinicStartTime ?? p.createdAt).toISOString().slice(0, 10) : String(p.clinicStartTime ?? p.createdAt).slice(0, 10),
            })),
          },
          recentActivity,
          notifications: familyNotifications.map((n: any) => ({
            id: n.id,
            type: 'info' as const,
            message: n.message,
            read: n.isRead,
          })),
          stats: {
            totalChildren: children.length,
            upcomingClasses: children.reduce((s: any, c: any) => s + c.upcomingClasses, 0),
            assignmentsDue: children.reduce((s: any, c: any) => s + c.assignmentsDue, 0),
            unreadNotifications: familyNotifications.filter((n: any) => !n.isRead).length,
          },
        }
      },
      {
        ttl: CACHE_TTL,
        tags: [`family:${family.id}`, `parent:${session.user.id}`, 'dashboard'],
      }
    )

    const res = NextResponse.json({ success: true, data })
    res.headers.set('X-Response-Time', `${Date.now() - startTime}ms`)
    return res
  },
  { role: 'PARENT' }
)

function formatRelativeTime(d: Date): string {
  const diff = Date.now() - new Date(d).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return '刚刚'
  if (mins < 60) return `${mins}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  return new Date(d).toLocaleDateString('zh-CN')
}
