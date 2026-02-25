/**
 * GET /api/parent/dashboard
 * Parent dashboard overview - children, stats, activity, notifications
 * Requires PARENT role, family account validation
 *
 * Performance: <200ms target, 85%+ cache hit rate
 * Cache: L1 memory + L2 Redis, 300s TTL via cache.getOrSet
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getFamilyAccountForParent } from '@/lib/api/parent-helpers'
import { db } from '@/lib/db'
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
          generatedTasks,
          clinicBookings,
          familyPayments,
          studentPaymentsThisMonth,
          pendingStudentPayments,
          familyNotifications,
          parentActivities,
        ] = await Promise.all([
          studentIds.length > 0
            ? db.curriculumEnrollment.findMany({
                where: { studentId: { in: studentIds } },
                select: {
                  studentId: true,
                  curriculum: { select: { id: true, name: true } },
                },
              })
            : [],
          studentIds.length > 0
            ? db.curriculumLessonProgress.findMany({
                where: { studentId: { in: studentIds } },
                select: { studentId: true, status: true, completedAt: true },
              })
            : [],
          studentIds.length > 0
            ? db.userGamification.findMany({
                where: { userId: { in: studentIds } },
                select: { userId: true, lastLogin: true },
              })
            : [],
          studentIds.length > 0
            ? db.achievement.findMany({
                where: { userId: { in: studentIds } },
                orderBy: { unlockedAt: 'desc' },
                take: 10,
                select: { id: true, userId: true, title: true, description: true, unlockedAt: true },
              })
            : [],
          studentIds.length > 0
            ? db.taskSubmission.findMany({
                where: { studentId: { in: studentIds } },
                select: { id: true, taskId: true, studentId: true, submittedAt: true },
              })
            : [],
          studentIds.length > 0
            ? db.generatedTask.findMany({
                where: {
                  status: { in: ['assigned', 'completed'] },
                },
                orderBy: { createdAt: 'desc' },
                take: 200,
                select: {
                  id: true,
                  dueDate: true,
                  assignments: true,
                },
              })
            : [],
          studentIds.length > 0
            ? db.clinicBooking.findMany({
                where: {
                  studentId: { in: studentIds },
                  clinic: { startTime: { gte: now } },
                },
                select: {
                  id: true,
                  studentId: true,
                  clinic: { select: { title: true, startTime: true } },
                },
              })
            : [],
          db.familyPayment.findMany({
            where: { parentId: family.id, createdAt: { gte: startOfMonth } },
            orderBy: { createdAt: 'desc' },
            take: 100,
            select: { id: true, amount: true, status: true, createdAt: true },
          }),
          studentIds.length > 0
            ? db.payment.findMany({
                where: {
                  status: 'COMPLETED',
                  createdAt: { gte: startOfMonth },
                  OR: [
                    { booking: { studentId: { in: studentIds } } },
                    { enrollment: { studentId: { in: studentIds } } },
                  ],
                },
                select: { id: true, amount: true },
              })
            : [],
          studentIds.length > 0
            ? db.payment.findMany({
                where: {
                  status: { in: ['PENDING', 'PROCESSING'] },
                  OR: [
                    { booking: { studentId: { in: studentIds } } },
                    { enrollment: { studentId: { in: studentIds } } },
                  ],
                },
                include: {
                  booking: { include: { clinic: { select: { title: true, startTime: true } } } },
                  enrollment: { include: { curriculum: { select: { name: true } } } },
                },
                orderBy: { createdAt: 'desc' },
                take: 20,
              })
            : [],
          db.familyNotification.findMany({
            where: { parentId: family.id },
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: { id: true, message: true, isRead: true, createdAt: true },
          }),
          db.parentActivityLog.findMany({
            where: { parentId: family.id },
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: { id: true, action: true, details: true, createdAt: true },
          }),
        ])

        const submissionSet = new Set(taskSubmissions.map((s) => `${s.studentId}:${s.taskId}`))
        const assignmentsDueByStudent = new Map<string, number>()
        for (const sid of studentIds) assignmentsDueByStudent.set(sid, 0)
        for (const task of generatedTasks) {
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
          .filter((m) => ['child', 'children'].includes(m.relation.toLowerCase()))
          .map((m) => {
            const uid = m.userId
            const enrolls = enrollments.filter((e) => e.studentId === uid)
            const progress = lessonProgress.filter((p) => p.studentId === uid)
            const completed = progress.filter((p) => p.status === 'COMPLETED').length
            const total = progress.length
            const gam = gamification.find((g) => g.userId === uid)
            const recentAchievement = achievements.find((a) => a.userId === uid)
            const upcomingClasses = clinicBookings.filter((b) => b.studentId === uid).length
            const assignmentsDue = uid ? (assignmentsDueByStudent.get(uid) ?? 0) : 0

            return {
              id: uid || m.id,
              name: m.user?.profile?.name || m.name,
              grade: m.user?.profile?.gradeLevel || 'Not set',
              avatar: (m.name || '?').slice(0, 2).toUpperCase(),
              upcomingClasses,
              assignmentsDue,
              progress: total > 0 ? Math.round((completed / total) * 100) : 0,
              lastActive: gam?.lastLogin
                ? formatRelativeTime(gam.lastLogin)
                : '—',
              subjects: [...new Set(enrolls.map((e) => e.curriculum.name))],
              recentAchievement: recentAchievement?.title || null,
            }
          })

        const familySpentThisMonth = familyPayments
          .filter((p) => p.status === 'completed' || p.status === 'paid')
          .reduce((s, p) => s + p.amount, 0)
        const studentSpentThisMonth = studentPaymentsThisMonth.reduce((s, p) => s + (p.amount || 0), 0)
        const spentThisMonth = familySpentThisMonth + studentSpentThisMonth

        const recentActivity = [
          ...parentActivities.slice(0, 5).map((a) => ({
            id: a.id,
            type: 'activity' as const,
            description: a.action + (a.details ? `: ${a.details}` : ''),
            time: formatRelativeTime(a.createdAt),
            _ts: a.createdAt.getTime(),
          })),
          ...achievements.slice(0, 3).map((a) => ({
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
            upcomingPayments: pendingStudentPayments.slice(0, 5).map((p) => ({
              id: p.id,
              description: p.booking?.clinic?.title || p.enrollment?.curriculum?.name || 'Pending payment',
              amount: p.amount,
              dueDate: (p.booking?.clinic?.startTime || p.createdAt).toISOString().slice(0, 10),
            })),
          },
          recentActivity,
          notifications: familyNotifications.map((n) => ({
            id: n.id,
            type: 'info' as const,
            message: n.message,
            read: n.isRead,
          })),
          stats: {
            totalChildren: children.length,
            upcomingClasses: children.reduce((s, c) => s + c.upcomingClasses, 0),
            assignmentsDue: children.reduce((s, c) => s + c.assignmentsDue, 0),
            unreadNotifications: familyNotifications.filter((n) => !n.isRead).length,
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
  if (mins < 60) return `${mins}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  return new Date(d).toLocaleDateString('zh-CN')
}
