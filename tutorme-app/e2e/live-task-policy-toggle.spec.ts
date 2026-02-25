import { test, expect, type Page } from '@playwright/test'

interface SocketIoFactory {
  (options: { path: string; transports: string[] }): {
    on: (event: string, cb: () => void) => void
    emit: (event: string, payload: unknown) => void
    disconnect: () => void
  }
}

interface WindowWithIo extends Window {
  io?: SocketIoFactory
}

async function login(page: Page, email: string, password: string, expectedPath: RegExp) {
  await page.goto('/login')
  await page.getByLabel(/email/i).fill(email)
  await page.getByLabel(/password/i).fill(password)
  await page.getByRole('button', { name: /login/i }).click()
  await expect(page).toHaveURL(expectedPath, { timeout: 15000 })
}

async function emitLiveDocShare(
  page: Page,
  payload: {
    roomId: string
    userId: string
    role: 'tutor' | 'student'
    name: string
    share: Record<string, unknown>
  }
) {
  await page.evaluate(async (args) => {
    const ensureSocketIo = async () => {
      const globalWindow = window as WindowWithIo
      if (globalWindow.io) return globalWindow.io
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.src = '/socket.io/socket.io.js'
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load socket.io client'))
        document.head.appendChild(script)
      })
      return (window as WindowWithIo).io
    }

    const io = await ensureSocketIo()
    if (!io) throw new Error('Socket.io client is unavailable in page context')
    const socket = io({ path: '/api/socket', transports: ['websocket', 'polling'] })

    await new Promise<void>((resolve) => {
      socket.on('connect', () => {
        socket.emit('join_class', {
          roomId: args.roomId,
          userId: args.userId,
          name: args.name,
          role: args.role,
        })
        socket.emit('live_doc_share_update', args.share)
        setTimeout(() => {
          socket.disconnect()
          resolve()
        }, 250)
      })
    })
  }, payload)
}

test.describe('Live task granular policy toggles', () => {
  test('tutor policy changes propagate to student toolbar capabilities', async ({ browser }) => {
    test.skip(!process.env.E2E_LIVE_SESSION_ID, 'Set E2E_LIVE_SESSION_ID to run this test.')
    const sessionId = process.env.E2E_LIVE_SESSION_ID as string
    const roomId = process.env.E2E_LIVE_ROOM_ID ?? sessionId

    const tutorEmail = process.env.E2E_TUTOR_EMAIL ?? 'tutor@example.com'
    const tutorPassword = process.env.E2E_TUTOR_PASSWORD ?? 'Password1'
    const studentEmail = process.env.E2E_STUDENT_EMAIL ?? 'student@example.com'
    const studentPassword = process.env.E2E_STUDENT_PASSWORD ?? 'Password1'

    const tutorCtx = await browser.newContext()
    const studentCtx = await browser.newContext()
    const tutorPage = await tutorCtx.newPage()
    const studentPage = await studentCtx.newPage()

    await login(tutorPage, tutorEmail, tutorPassword, /\/tutor\//)
    await login(studentPage, studentEmail, studentPassword, /\/student\//)

    await tutorPage.goto(`/en/tutor/live-class/${encodeURIComponent(sessionId)}`)
    await studentPage.goto(`/en/student/live/${encodeURIComponent(sessionId)}`)

    await expect(studentPage.getByRole('tab', { name: /whiteboard/i })).toBeVisible({ timeout: 20000 })

    const shareId = `e2e-policy-${Date.now()}`
    const tutorUserId = `e2e-tutor-${Date.now()}`

    await emitLiveDocShare(tutorPage, {
      roomId,
      userId: tutorUserId,
      role: 'tutor',
      name: 'Tutor',
      share: {
        shareId,
        classRoomId: roomId,
        ownerId: tutorUserId,
        ownerName: 'Tutor',
        title: 'E2E Policy Task',
        description: 'Policy toggle coverage',
        fileUrl: '/uploads/resources/cmlujpw8m0001294quit3y42l/0651ae4a-45ed-457f-8962-54bad02a602d.pdf',
        mimeType: 'application/pdf',
        pdfRoomId: `${roomId}:pdf-share:e2e-policy`,
        visibleToAll: true,
        allowCollaborativeWrite: true,
        collaborationPolicy: {
          allowDrawing: true,
          allowTyping: true,
          allowShapes: true,
        },
        active: true,
        updatedAt: Date.now(),
      },
    })

    await expect(studentPage.getByRole('button', { name: 'Add Text' })).toBeVisible({ timeout: 15000 })
    await expect(studentPage.getByRole('button', { name: 'Rectangle' })).toBeVisible()
    await expect(studentPage.getByRole('button', { name: 'Circle' })).toBeVisible()

    await emitLiveDocShare(tutorPage, {
      roomId,
      userId: tutorUserId,
      role: 'tutor',
      name: 'Tutor',
      share: {
        shareId,
        classRoomId: roomId,
        ownerId: tutorUserId,
        ownerName: 'Tutor',
        title: 'E2E Policy Task',
        description: 'Policy toggle coverage',
        fileUrl: '/uploads/resources/cmlujpw8m0001294quit3y42l/0651ae4a-45ed-457f-8962-54bad02a602d.pdf',
        mimeType: 'application/pdf',
        pdfRoomId: `${roomId}:pdf-share:e2e-policy`,
        visibleToAll: true,
        allowCollaborativeWrite: true,
        collaborationPolicy: {
          allowDrawing: false,
          allowTyping: false,
          allowShapes: false,
        },
        active: true,
        updatedAt: Date.now(),
      },
    })

    await expect(studentPage.getByRole('button', { name: 'Add Text' })).toHaveCount(0)
    await expect(studentPage.getByRole('button', { name: 'Rectangle' })).toHaveCount(0)
    await expect(studentPage.getByRole('button', { name: 'Circle' })).toHaveCount(0)
    await expect(studentPage.getByRole('button', { name: 'Draw' })).toBeDisabled()
    await expect(studentPage.getByRole('button', { name: 'Erase' })).toBeDisabled()

    await tutorCtx.close()
    await studentCtx.close()
  })
})
