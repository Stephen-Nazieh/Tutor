import { expect, test, type APIRequestContext, type Page } from '@playwright/test'

async function registerUser(
  request: APIRequestContext,
  params: {
    role: 'TUTOR'
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
    additionalData: {
      subjects: ['Mathematics'],
      gradeLevels: ['All Levels'],
    },
  }
  const response = await request.post('/api/auth/register', { data: payload })
  if (!response.ok()) {
    const body = await response.text()
    if (!body.toLowerCase().includes('already')) {
      throw new Error(`TUTOR registration failed (${response.status()}): ${body.slice(0, 220)}`)
    }
  }
}

async function login(page: Page, email: string, password: string, role: 'tutor') {
  await page.goto('/login')
  await page.getByLabel(/email/i).fill(email)
  await page.getByLabel(/password/i).fill(password)
  await page.getByRole('button', { name: /login/i }).click()
  await expect(page).toHaveURL(new RegExp(`\\/${role}\\/`), { timeout: 20000 })
}

async function openTutorMathTab(page: Page): Promise<string> {
  await page.goto('/en/tutor/classes')
  await page.getByRole('button', { name: /Instant Class/i }).click()
  const enterLink = page.getByRole('link', { name: /^Enter$/i }).first()
  await expect(enterLink).toBeVisible({ timeout: 30000 })
  await enterLink.click()
  await expect(page).toHaveURL(/\/tutor\/live-class\/[^/]+$/, { timeout: 30000 })
  await page.getByRole('button', { name: /Understood/i }).click({ timeout: 8000 }).catch(() => {})
  await page.keyboard.press('Escape').catch(() => {})

  const mathTab = page.locator('[role="tab"]').filter({ hasText: /^Math$/i }).first()
  await mathTab.click()
  await expect(mathTab).toHaveAttribute('aria-selected', 'true')
  const match = page.url().match(/\/tutor\/live-class\/([^/?#]+)/)
  if (!match?.[1]) throw new Error(`Unable to resolve tutor live session id from URL: ${page.url()}`)
  return decodeURIComponent(match[1])
}

async function assertFabricMathUi(page: Page) {
  await expect(page.getByText(/Math Whiteboard/i)).toBeVisible({ timeout: 20000 })
  await expect(page.getByTestId('fabric-math-board')).toBeVisible({ timeout: 15000 })
  await expect(page.getByTestId('fabric-math-canvas')).toBeVisible({ timeout: 15000 })
  await expect(page.getByTestId('fabric-math-interactive-canvas')).toBeVisible({ timeout: 15000 })
  await expect(page.getByText(/Synced|Reconnecting/i)).toBeVisible({ timeout: 10000 })
  await expect(page.getByText(/Editable|Read only/i)).toBeVisible({ timeout: 10000 })
}

async function drawRectangle(page: Page) {
  const canvas = page.getByTestId('fabric-math-interactive-canvas').first()
  await expect(canvas).toBeVisible({ timeout: 15000 })
  const box = await canvas.boundingBox()
  if (!box) throw new Error('fabric canvas bounding box unavailable')
  await page.getByRole('button', { name: 'Rectangle' }).click()
  await page.mouse.move(box.x + 150, box.y + 150)
  await page.mouse.down()
  await page.mouse.move(box.x + 340, box.y + 270)
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

test.describe('Math tab smoke (fabric)', () => {
  test('renders the new fabric math UI and supports drawing', async ({ page, request }) => {
    test.setTimeout(120000)
    const tutorPassword = process.env.E2E_TUTOR_PASSWORD ?? 'Password1'
    const tutorEmail = process.env.E2E_TUTOR_EMAIL ?? `e2e-tutor-${Date.now()}@example.com`

    if (!process.env.E2E_TUTOR_EMAIL) {
      await registerUser(request, {
        role: 'TUTOR',
        email: tutorEmail,
        password: tutorPassword,
        name: 'E2E Tutor',
      })
    }

    await login(page, tutorEmail, tutorPassword, 'tutor')
    const sessionId = await openTutorMathTab(page)
    await assertFabricMathUi(page)

    const boardSessionId = `math-${sessionId}`
    const before = await getFabricObjectCount(page, boardSessionId)
    await drawRectangle(page)
    await expect.poll(() => getFabricObjectCount(page, boardSessionId), { timeout: 10000 }).toBeGreaterThan(before)
  })
})
