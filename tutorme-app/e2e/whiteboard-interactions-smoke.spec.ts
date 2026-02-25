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

async function createLiveSessionFromTutor(page: Page): Promise<string> {
  return page.evaluate(async () => {
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
        title: 'E2E Whiteboard Smoke',
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
}

async function openTutorWhiteboard(page: Page, sessionId: string) {
  await page.goto(`/en/tutor/live-class/${encodeURIComponent(sessionId)}`)
  await expect(page).toHaveURL(new RegExp(`/tutor/live-class/${sessionId}$`), { timeout: 30000 })
  await page.getByRole('button', { name: /Understood/i }).click({ timeout: 8000 }).catch(() => {})
  await page.keyboard.press('Escape').catch(() => {})
  const tab = page.getByRole('tab', { name: /whiteboard/i }).first()
  await tab.click()
  await expect(tab).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByLabel('Tutor whiteboard canvas')).toBeVisible({ timeout: 15000 })
}

async function openStudentWhiteboard(page: Page, sessionId: string) {
  await page.goto(`/en/student/live/${encodeURIComponent(sessionId)}`)
  await page.evaluate((id) => {
    window.sessionStorage.setItem(`live-recording-notice:${id}`, '1')
  }, sessionId)
  await page.reload()
  const tab = page.getByRole('tab', { name: /whiteboard/i }).first()
  await tab.click()
  await expect(tab).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByLabel('Student whiteboard canvas')).toBeVisible({ timeout: 15000 })
}

async function drawRectangleOnCanvas(page: Page, canvasLabel: string, start: { x: number; y: number }, end: { x: number; y: number }) {
  const canvas = page.getByLabel(canvasLabel).first()
  const box = await canvas.boundingBox()
  if (!box) throw new Error('Canvas bounds unavailable')
  await page.locator('button[title="Rectangle"]').first().click()
  await page.mouse.move(box.x + start.x, box.y + start.y)
  await page.mouse.down()
  await page.mouse.move(box.x + end.x, box.y + end.y)
  await page.mouse.up()
}

async function rectangleSelect(page: Page, canvasLabel: string, from: { x: number; y: number }, to: { x: number; y: number }) {
  const canvas = page.getByLabel(canvasLabel).first()
  const box = await canvas.boundingBox()
  if (!box) throw new Error('Canvas bounds unavailable')
  await page.locator('button[title="Select"]').first().click()
  await page.getByRole('button', { name: /^Rect$/i }).first().click()
  await page.mouse.move(box.x + from.x, box.y + from.y)
  await page.mouse.down()
  await page.mouse.move(box.x + to.x, box.y + to.y)
  await page.mouse.up()
}

async function altClickSelect(page: Page, canvasLabel: string, at: { x: number; y: number }) {
  const canvas = page.getByLabel(canvasLabel).first()
  const box = await canvas.boundingBox()
  if (!box) throw new Error('Canvas bounds unavailable')
  await page.locator('button[title="Select"]').first().click()
  await page.keyboard.down('Alt')
  await page.mouse.click(box.x + at.x, box.y + at.y)
  await page.keyboard.up('Alt')
}

async function lassoSelect(page: Page, canvasLabel: string) {
  const canvas = page.getByLabel(canvasLabel).first()
  const box = await canvas.boundingBox()
  if (!box) throw new Error('Canvas bounds unavailable')
  await page.locator('button[title="Select"]').first().click()
  await page.getByRole('button', { name: /^Lasso$/i }).first().click()
  await page.mouse.move(box.x + 70, box.y + 70)
  await page.mouse.down()
  await page.mouse.move(box.x + 320, box.y + 70)
  await page.mouse.move(box.x + 320, box.y + 230)
  await page.mouse.move(box.x + 70, box.y + 230)
  await page.mouse.move(box.x + 70, box.y + 70)
  await page.mouse.up()
}

test.describe('Whiteboard interactions smoke', () => {
  test('select/lasso/transform, keyboard shortcuts, and follow-tutor work without runtime regressions', async ({ browser, request }) => {
    test.setTimeout(120000)

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
    const runtimeErrors: string[] = []
    tutorPage.on('pageerror', (error) => runtimeErrors.push(`tutor:${error.message}`))
    studentPage.on('pageerror', (error) => runtimeErrors.push(`student:${error.message}`))

    await login(tutorPage, tutorEmail, tutorPassword, 'tutor')
    await login(studentPage, studentEmail, studentPassword, 'student')

    const sessionId = await createLiveSessionFromTutor(tutorPage)
    await openTutorWhiteboard(tutorPage, sessionId)
    await openStudentWhiteboard(studentPage, sessionId)

    await drawRectangleOnCanvas(tutorPage, 'Tutor whiteboard canvas', { x: 120, y: 120 }, { x: 260, y: 220 })
    await drawRectangleOnCanvas(tutorPage, 'Tutor whiteboard canvas', { x: 290, y: 140 }, { x: 430, y: 250 })
    await rectangleSelect(tutorPage, 'Tutor whiteboard canvas', { x: 90, y: 90 }, { x: 470, y: 280 })
    await altClickSelect(tutorPage, 'Tutor whiteboard canvas', { x: 180, y: 170 })
    await tutorPage.keyboard.press('+')
    await tutorPage.keyboard.press('ArrowRight')

    await lassoSelect(tutorPage, 'Tutor whiteboard canvas')
    await expect(tutorPage.getByRole('button', { name: /^Lasso$/i }).first()).toBeVisible({ timeout: 10000 })

    await tutorPage.keyboard.press('p')
    await tutorPage.keyboard.press('v')
    await tutorPage.keyboard.press('h')
    await expect(tutorPage.locator('button[title="Pan"]').first()).toBeVisible()

    await studentPage.getByRole('button', { name: /follow tutor/i }).first().click()
    await expect(studentPage.getByRole('button', { name: /follow tutor/i }).first()).toBeVisible()
    expect(runtimeErrors, `Runtime errors:\n${runtimeErrors.join('\n')}`).toEqual([])

    await tutorCtx.close()
    await studentCtx.close()
  })
})
