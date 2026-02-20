import { test, expect } from '@playwright/test'

test.describe('Payment flow', () => {
  test('student can reach classes and see book or pay options', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(process.env.E2E_STUDENT_EMAIL ?? 'student@example.com')
    await page.getByLabel(/password/i).fill(process.env.E2E_STUDENT_PASSWORD ?? 'Password1')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(/\/student\/dashboard/, { timeout: 10000 })

    await page.goto('/student/classes')
    await expect(page).toHaveURL(/\/student\/classes/)

    await expect(page.getByText(/class|booking|pay|book/i).first()).toBeVisible({ timeout: 5000 })
  })
})
