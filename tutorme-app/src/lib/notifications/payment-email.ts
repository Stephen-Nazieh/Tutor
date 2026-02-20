/**
 * Payment-related email notifications.
 * Set RESEND_API_KEY to send real emails; otherwise logs only.
 */

interface SendPaymentConfirmationParams {
  paymentId: string
  studentEmail: string
  studentName?: string
  amount: number
  currency: string
  description: string
}

interface SendTutorPaymentReceivedParams {
  paymentId: string
  tutorEmail: string
  tutorName?: string
  amount: number
  currency: string
  description: string
}

export async function sendPaymentConfirmation(params: SendPaymentConfirmationParams): Promise<void> {
  const { paymentId, studentEmail, amount, currency, description } = params
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.PAYMENT_EMAIL_FROM || 'TutorMe <noreply@tutorme.com>'

  const html = `
    <p>Your payment was successful.</p>
    <p><strong>Amount:</strong> ${currency} ${amount.toFixed(2)}</p>
    <p><strong>Description:</strong> ${description}</p>
    <p>Your booking is confirmed. You can view it in <a href="${process.env.NEXT_PUBLIC_APP_URL}/student/classes">My bookings</a>.</p>
  `

  if (apiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from,
          to: studentEmail,
          subject: 'Payment confirmed – TutorMe',
          html
        })
      })
      if (!res.ok) {
        const err = await res.text()
        console.error('[payment-email] Resend failed:', res.status, err)
      }
    } catch (e) {
      console.error('[payment-email] Send failed:', e)
    }
  } else {
    console.log('[payment-email] (no RESEND_API_KEY) Would send payment confirmation to', studentEmail, 'paymentId', paymentId)
  }
}

export async function sendTutorPaymentReceived(params: SendTutorPaymentReceivedParams): Promise<void> {
  const { paymentId, tutorEmail, amount, currency, description } = params
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.PAYMENT_EMAIL_FROM || 'TutorMe <noreply@tutorme.com>'

  const html = `
    <p>You received a payment for a class.</p>
    <p><strong>Amount:</strong> ${currency} ${amount.toFixed(2)}</p>
    <p><strong>Description:</strong> ${description}</p>
  `

  if (apiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from,
          to: tutorEmail,
          subject: 'Payment received – TutorMe',
          html
        })
      })
      if (!res.ok) {
        const err = await res.text()
        console.error('[payment-email] Resend (tutor) failed:', res.status, err)
      }
    } catch (e) {
      console.error('[payment-email] Send (tutor) failed:', e)
    }
  } else {
    console.log('[payment-email] (no RESEND_API_KEY) Would send tutor payment received to', tutorEmail, 'paymentId', paymentId)
  }
}
