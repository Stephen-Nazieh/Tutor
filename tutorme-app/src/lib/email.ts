import nodemailer from 'nodemailer'

/**
 * Configure SMTP transport for Solocorn.
 * Using environment variables for security.
 */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'mail.privateemail.com',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_PORT === '465' || !process.env.EMAIL_PORT, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

/**
 * Send an inquiry email to support@solocorn.co.
 */
export async function sendInquiryEmail({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) {
  const mailOptions = {
    from: `"Solocorn Landing" <${process.env.EMAIL_USER || 'support@solocorn.co'}>`,
    to: 'support@solocorn.co',
    subject: `New Inquiry from ${name}`,
    text: `You have a new inquiry from the landing page.

Name: ${name}
Email: ${email}
Message: ${message}`,
    html: `
      <h2>New Landing Page Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <div style="padding: 15px; background: #f4f4f4; border-radius: 5px;">
        ${message.replace(/\n/g, '<br>') || 'No message provided.'}
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

/**
 * Send a tutor signup notification email to support@solocorn.co.
 */
export async function sendTutorSignupEmail({
  username,
  bio,
  country,
}: {
  username: string
  bio?: string | null
  country?: string | null
}) {
  const mailOptions = {
    from: `"Solocorn Landing" <${process.env.EMAIL_USER || 'support@solocorn.co'}>`,
    to: 'support@solocorn.co',
    subject: `New Tutor Signup Request: ${username}`,
    text: `A new tutor has signed up on the landing page.

Username: ${username}
Country: ${country || 'Not specified'}
Bio: ${bio || 'No bio provided'}`,
    html: `
      <h2>New Tutor Signup Request</h2>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Country:</strong> ${country || 'Not specified'}</p>
      <p><strong>Bio:</strong> ${bio || 'No bio provided'}</p>
    `,
  }

  return transporter.sendMail(mailOptions)
}
