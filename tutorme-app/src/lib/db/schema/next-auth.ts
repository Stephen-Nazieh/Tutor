/**
 * NextAuth.js tables for Drizzle adapter.
 * Session and VerificationToken are optional (database session / magic link).
 * Our User and Account are in tables.ts (table names "User", "Account").
 */
import { pgTable, text, timestamp, primaryKey } from 'drizzle-orm/pg-core'

export const session = pgTable('Session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId').notNull(),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
})

export const verificationToken = pgTable(
  'VerificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { withTimezone: true }).notNull(),
  },
  (table) => ({
    compositePk: primaryKey({
      columns: [table.identifier, table.token],
    }),
  })
)
