import { test, expect } from '@playwright/test'

function buildMinimalPdfBuffer(): Buffer {
  const pdf = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 200] /Contents 4 0 R /Resources << >> >>\nendobj\n4 0 obj\n<< /Length 35 >>\nstream\nBT /F1 12 Tf 50 120 Td (Hello) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000010 00000 n \n0000000062 00000 n \n0000000120 00000 n \n0000000221 00000 n \ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n305\n%%EOF`
  return Buffer.from(pdf, 'utf-8')
}

test.describe('PDF tutoring flow', () => {
  test('lock toggle + mode tabs + flatten request path', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(process.env.E2E_TUTOR_EMAIL ?? 'tutor@example.com')
    await page.getByLabel(/password/i).fill(process.env.E2E_TUTOR_PASSWORD ?? 'Password1')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(/\/tutor\//, { timeout: 10000 })

    await page.goto('/en/tutor/pdf-tutoring')
    await expect(page.getByText(/PDF Tutoring Engine/i)).toBeVisible({ timeout: 10000 })

    const lockButton = page.getByRole('button', { name: /Lock Canvas|Unlock Canvas/i }).first()
    await expect(lockButton).toBeVisible()

    await lockButton.click()
    await expect(page.getByRole('button', { name: /Unlock Canvas/i })).toBeVisible()

    await page.getByRole('tab', { name: 'AI Cleaned Text' }).click()
    await expect(page.getByText(/No cleaned text generated yet|AI Cleaned Text/i).first()).toBeVisible()

    await page.getByRole('tab', { name: 'Marked Feedback' }).click()
    await expect(page.getByText(/No marking feedback generated yet|Marked Feedback/i).first()).toBeVisible()

    await page.getByRole('tab', { name: 'Original View' }).click()

    await page.route('**/api/pdf-tutoring/flatten', async (route) => {
      await route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'application/pdf' },
        body: buildMinimalPdfBuffer(),
      })
    })

    const input = page.locator('input[type="file"][accept="application/pdf"]')
    await input.setInputFiles({
      name: 'sample.pdf',
      mimeType: 'application/pdf',
      buffer: buildMinimalPdfBuffer(),
    })

    const flattenBtn = page.getByRole('button', { name: /Flatten PDF/i }).first()
    await expect(flattenBtn).toBeVisible({ timeout: 10000 })
    await flattenBtn.click()
  })
})
