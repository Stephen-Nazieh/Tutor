import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const landingInquiry = pgTable('landing_inquiries', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const landingSignup = pgTable('landing_signups', {
  id: text('id').primaryKey(),
  username: text('username').notNull(),
  bio: text('bio'),
  country: text('country'),
  photo: text('photo'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})
