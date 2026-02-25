import { test, expect } from '@playwright/test'

async function login(page: import('@playwright/test').Page, email: string, password: string, expectedPath: RegExp) {
  await page.goto('/login')
  await page.getByLabel(/email/i).fill(email)
  await page.getByLabel(/password/i).fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(expectedPath, { timeout: 15000 })
}

test.describe('PDF tutoring lock sync', () => {
  test('tutor lock state propagates to student session', async ({ browser }) => {
    const room = `e2e-lock-room-${Date.now()}`

    const tutorCtx = await browser.newContext()
    const studentCtx = await browser.newContext()
    const tutorPage = await tutorCtx.newPage()
    const studentPage = await studentCtx.newPage()

    await login(
      tutorPage,
      process.env.E2E_TUTOR_EMAIL ?? 'tutor@example.com',
      process.env.E2E_TUTOR_PASSWORD ?? 'Password1',
      /\/tutor\//
    )

    await login(
      studentPage,
      process.env.E2E_STUDENT_EMAIL ?? 'student@example.com',
      process.env.E2E_STUDENT_PASSWORD ?? 'Password1',
      /\/student\//
    )

    await tutorPage.goto(`/en/tutor/pdf-tutoring?room=${encodeURIComponent(room)}`)
    await studentPage.goto(`/en/student/pdf-tutoring?room=${encodeURIComponent(room)}`)

    const tutorLockBtn = tutorPage.getByRole('button', { name: /Lock Canvas|Unlock Canvas/i }).first()
    await expect(tutorLockBtn).toBeVisible({ timeout: 10000 })

    // Initially unlocked on student side.
    await expect(studentPage.getByText('Canvas Unlocked').first()).toBeVisible({ timeout: 10000 })

    await tutorLockBtn.click()
    await expect(studentPage.getByText('Canvas Locked').first()).toBeVisible({ timeout: 10000 })

    await tutorPage.getByRole('button', { name: /Unlock Canvas/i }).first().click()
    await expect(studentPage.getByText('Canvas Unlocked').first()).toBeVisible({ timeout: 10000 })

    await tutorCtx.close()
    await studentCtx.close()
  })
})
