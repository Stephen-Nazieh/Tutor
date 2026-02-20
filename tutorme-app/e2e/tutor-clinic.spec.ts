import { test, expect } from '@playwright/test'

test.describe('Tutor clinic hosting', () => {
  test('tutor can reach dashboard and see clinic/class area', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(process.env.E2E_TUTOR_EMAIL ?? 'tutor@example.com')
    await page.getByLabel(/password/i).fill(process.env.E2E_TUTOR_PASSWORD ?? 'Password1')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(/\/tutor\/dashboard/, { timeout: 10000 })

    await expect(page.getByRole('heading', { name: /dashboard|tutor|class|clinic/i }).first()).toBeVisible({
      timeout: 5000,
    })
  })
})
