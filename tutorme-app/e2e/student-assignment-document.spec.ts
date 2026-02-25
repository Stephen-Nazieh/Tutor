import { test, expect } from '@playwright/test'

test.describe('Student assignment source document flow', () => {
  test('shows source file and opens Work on Document PDF tutoring view', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(process.env.E2E_STUDENT_EMAIL ?? 'student@example.com')
    await page.getByLabel(/password/i).fill(process.env.E2E_STUDENT_PASSWORD ?? 'Password1')
    await page.getByRole('button', { name: /login/i }).click()

    await expect(page).toHaveURL(/\/student\/dashboard/, { timeout: 10000 })

    await page.route('**/api/student/assignments', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          assignments: [
            {
              id: 'task-doc-1',
              title: 'Worksheet with Source PDF',
              description: 'Complete based on provided worksheet',
              type: 'assignment',
              difficulty: 'medium',
              dueDate: null,
              maxScore: 100,
              status: 'pending',
              score: null,
              submittedAt: null,
              questionCount: 0,
              lessonId: null,
              batchId: null,
              documentSource: JSON.stringify({
                fileName: 'chapter-2-worksheet.pdf',
                fileUrl: '/uploads/documents/test/chapter-2-worksheet.pdf',
                mimeType: 'application/pdf',
              }),
            },
          ],
          stats: { pending: 1, submitted: 0, overdue: 0, total: 1 },
        }),
      })
    })

    await page.goto('/en/student/assignments')
    await expect(page.getByText('Source file: chapter-2-worksheet.pdf')).toBeVisible()

    const popupPromise = page.waitForEvent('popup')
    await page.getByRole('button', { name: 'Work on Document' }).click()
    const popup = await popupPromise
    await expect(popup).toHaveURL(/\/student\/pdf-tutoring\?room=assignment-doc-task-doc-1&doc=/)
  })
})
