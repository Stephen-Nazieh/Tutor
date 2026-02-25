import { expect, test, type APIRequestContext, type Page } from '@playwright/test'

async function registerUser(
  request: APIRequestContext,
  params: {
    role: 'TUTOR' | 'STUDENT'
    email: string
    password: string
    name: string
  }
) {
  const payload: Record<string, unknown> = {
    role: params.role,
    email: params.email,
    password: params.password,
    name: params.name,
    tosAccepted: true,
  }

  if (params.role === 'TUTOR') {
    payload.additionalData = {
      subjects: ['Mathematics'],
      gradeLevels: ['All Levels'],
    }
  }

  const response = await request.post('/api/auth/register', { data: payload })
  if (!response.ok()) {
    const body = await response.text()
    if (!body.toLowerCase().includes('already')) {
      throw new Error(`${params.role} registration failed (${response.status()}): ${body.slice(0, 220)}`)
    }
  }
}

async function login(page: Page, email: string, password: string, role: 'tutor' | 'student') {
  await page.goto('/login')
  await page.getByLabel(/email/i).fill(email)
  await page.getByLabel(/password/i).fill(password)
  await page.getByRole('button', { name: /login/i }).click()
  await expect(page).toHaveURL(new RegExp(`\\/${role}\\/`), { timeout: 20000 })
}

async function openTutorMathTabAndGetSessionId(page: Page): Promise<string> {
  const liveSessionId = await page.evaluate(async () => {
    const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
    const csrfData = await csrfRes.json().catch(() => ({}))
    const csrfToken = csrfData?.token ?? null

    const createRes = await fetch('/api/class/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
      },
      credentials: 'include',
      body: JSON.stringify({
        title: 'E2E Math Co-edit',
        subject: 'General',
        gradeLevel: 'mixed',
        maxStudents: 50,
        durationMinutes: 60,
        enableRecording: true,
        scheduledAt: new Date().toISOString(),
      }),
    })
    if (!createRes.ok) {
      const raw = await createRes.text().catch(() => '')
      throw new Error(raw || `Failed to create class room (${createRes.status})`)
    }
    const payload = (await createRes.json()) as { session?: { id?: string } }
    if (!payload.session?.id) throw new Error('Missing session id in create room response')
    return payload.session.id
  })

  await page.goto(`/en/tutor/live-class/${encodeURIComponent(liveSessionId)}`)
  await expect(page).toHaveURL(new RegExp(`/tutor/live-class/${liveSessionId}$`), { timeout: 30000 })
  await page.getByRole('button', { name: /Understood/i }).click({ timeout: 8000 }).catch(() => {})
  await page.keyboard.press('Escape').catch(() => {})

  const mathTab = page.locator('[role="tab"]').filter({ hasText: /^Math$/i }).first()
  await mathTab.click()
  await expect(page.getByText(/Math Whiteboard/i)).toBeVisible({ timeout: 20000 })
  await expect(page.getByTestId('fabric-math-canvas').first()).toBeVisible({ timeout: 15000 })
  await expect(page.getByTestId('fabric-math-interactive-canvas').first()).toBeVisible({ timeout: 15000 })
  return liveSessionId
}

async function openStudentMathTab(page: Page, sessionId: string) {
  await page.goto(`/en/student/live/${encodeURIComponent(sessionId)}`)
  await expect(page.locator('[role="tab"]').filter({ hasText: /^Math$/i }).first()).toBeVisible({ timeout: 30000 })

  await page.evaluate((id) => {
    window.sessionStorage.setItem(`live-recording-notice:${id}`, '1')
  }, sessionId)

  await page.reload()
  const mathTab = page.locator('[role="tab"]').filter({ hasText: /^Math$/i }).first()
  await mathTab.click()
  await expect(page.getByText(/Math Whiteboard/i)).toBeVisible({ timeout: 20000 })
  await expect(page.getByTestId('fabric-math-canvas').first()).toBeVisible({ timeout: 15000 })
  await expect(page.getByTestId('fabric-math-interactive-canvas').first()).toBeVisible({ timeout: 15000 })
}

async function drawRectangle(page: Page, dx = 190, dy = 120) {
  const canvas = page.getByTestId('fabric-math-interactive-canvas').first()
  const box = await canvas.boundingBox()
  if (!box) throw new Error('fabric canvas bounding box unavailable')

  await page.getByRole('button', { name: 'Rectangle' }).click()
  await page.mouse.move(box.x + 120, box.y + 120)
  await page.mouse.down()
  await page.mouse.move(box.x + 120 + dx, box.y + 120 + dy)
  await page.mouse.up()
}

async function getFabricObjectCount(page: Page, sessionId: string): Promise<number> {
  return page.evaluate((sid) => {
    const fromRegistry = window.__fabricMathBoards?.[sid]
    if (fromRegistry) {
      return fromRegistry.getObjects().length
    }
    const canvas = document.querySelector(`[data-testid="fabric-math-interactive-canvas"][data-math-session="${sid}"]`) as (HTMLCanvasElement & {
      __fabricCanvas?: { getObjects: () => unknown[] }
    }) | null
    return canvas?.__fabricCanvas?.getObjects().length ?? 0
  }, sessionId)
}

test.describe('Math tab Yjs tutor+student co-edit', () => {
  test('syncs shape edits bidirectionally between tutor and student sessions', async ({ browser, request }) => {
    test.setTimeout(180000)

    const tutorPassword = process.env.E2E_TUTOR_PASSWORD ?? 'Password1'
    const studentPassword = process.env.E2E_STUDENT_PASSWORD ?? 'Password1'
    const tutorEmail = process.env.E2E_TUTOR_EMAIL ?? `e2e-tutor-${Date.now()}@example.com`
    const studentEmail = process.env.E2E_STUDENT_EMAIL ?? `e2e-student-${Date.now()}@example.com`

    if (!process.env.E2E_TUTOR_EMAIL) {
      await registerUser(request, {
        role: 'TUTOR',
        email: tutorEmail,
        password: tutorPassword,
        name: 'E2E Tutor',
      })
    }

    if (!process.env.E2E_STUDENT_EMAIL) {
      await registerUser(request, {
        role: 'STUDENT',
        email: studentEmail,
        password: studentPassword,
        name: 'E2E Student',
      })
    }

    const tutorCtx = await browser.newContext()
    const studentCtx = await browser.newContext()
    const tutorPage = await tutorCtx.newPage()
    const studentPage = await studentCtx.newPage()

    await login(tutorPage, tutorEmail, tutorPassword, 'tutor')
    await login(studentPage, studentEmail, studentPassword, 'student')

    const sessionId = await openTutorMathTabAndGetSessionId(tutorPage)
    await openStudentMathTab(studentPage, sessionId)
    const boardSessionId = `math-${sessionId}`
    const tutorBefore = await getFabricObjectCount(tutorPage, boardSessionId)
    const studentBefore = await getFabricObjectCount(studentPage, boardSessionId)

    await drawRectangle(tutorPage, 180, 100)
    await expect.poll(() => getFabricObjectCount(tutorPage, boardSessionId), { timeout: 20000 }).toBeGreaterThan(tutorBefore)
    await expect.poll(() => getFabricObjectCount(studentPage, boardSessionId), { timeout: 20000 }).toBeGreaterThan(studentBefore)

    const tutorAfterTutorDraw = await getFabricObjectCount(tutorPage, boardSessionId)
    const studentAfterTutorDraw = await getFabricObjectCount(studentPage, boardSessionId)
    await drawRectangle(studentPage, 140, 90)
    await expect.poll(() => getFabricObjectCount(studentPage, boardSessionId), { timeout: 20000 }).toBeGreaterThan(studentAfterTutorDraw)
    await expect.poll(() => getFabricObjectCount(tutorPage, boardSessionId), { timeout: 20000 }).toBeGreaterThan(tutorAfterTutorDraw)

    await tutorCtx.close()
    await studentCtx.close()
  })
})
