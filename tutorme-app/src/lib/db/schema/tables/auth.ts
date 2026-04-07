/**
 * Drizzle table definitions (domain slice).
 * Aggregated via ./index.ts — keep enums in ../enums.ts.
 */
import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  doublePrecision,
  uniqueIndex,
  index,
  uuid,
} from 'drizzle-orm/pg-core'
import * as enums from '../enums'

export const user = pgTable(
  'User',
  {
    userId: text('userId').primaryKey().notNull(),
    email: text('email').notNull().unique(),
    password: text('password'),
    handle: text('handle'),
    role: enums.roleEnum('role').notNull(),
    emailVerified: timestamp('emailVerified', { withTimezone: true }),
    image: text('image'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    User_handle_idx: index('User_handle_idx').on(table.handle),
  })
)

export const account = pgTable(
  'Account',
  {
    accountId: text('accountId').primaryKey().notNull(),
    userId: text('userId').notNull(),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  table => ({
    Account_userId_idx: index('Account_userId_idx').on(table.userId),
    Account_provider_providerAccountId_key: uniqueIndex(
      'Account_provider_providerAccountId_key'
    ).on(table.provider, table.providerAccountId),
  })
)

export const profile = pgTable('Profile', {
  profileId: text('profileId').primaryKey().notNull(),
  userId: text('userId').notNull().unique(),
  name: text('name'),
  username: text('username').unique(),
  bio: text('bio'),
  avatarUrl: text('avatarUrl'),
  dateOfBirth: timestamp('dateOfBirth', { withTimezone: true }),
  timezone: text('timezone').notNull(),
  emailNotifications: boolean('emailNotifications').notNull(),
  smsNotifications: boolean('smsNotifications').notNull(),
  gradeLevel: text('gradeLevel'),
  studentUniqueId: text('studentUniqueId').unique(),
  subjectsOfInterest: text('subjectsOfInterest').array().notNull(),
  preferredLanguages: text('preferredLanguages').array().notNull(),
  learningGoals: text('learningGoals').array().notNull(),
  tosAccepted: boolean('tosAccepted').notNull(),
  tosAcceptedAt: timestamp('tosAcceptedAt', { withTimezone: true }),
  organizationName: text('organizationName'),
  isOnboarded: boolean('isOnboarded').notNull(),
  hourlyRate: doublePrecision('hourlyRate'),
  oneOnOneEnabled: boolean('oneOnOneEnabled'),
  specialties: text('specialties').array().notNull(),
  credentials: text('credentials'),
  availability: jsonb('availability'),
  paidClassesEnabled: boolean('paidClassesEnabled').notNull(),
  paymentGatewayPreference: text('paymentGatewayPreference'),
  currency: text('currency'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
})

export const tutorApplication = pgTable(
  'TutorApplication',
  {
    applicationId: text('applicationId').primaryKey().notNull(),
    // Must match the actual production DB column: "userId" (camelCase, quoted)
    userId: text('userId').notNull().unique(),
    firstName: text('firstName').notNull(),
    middleName: text('middleName'),
    lastName: text('lastName').notNull(),
    legalName: text('legalName').notNull(),
    countryOfResidence: text('countryOfResidence').notNull(),
    phoneCountryCode: text('phoneCountryCode').notNull(),
    phoneNumber: text('phoneNumber').notNull(),
    educationLevel: text('educationLevel').notNull(),
    hasTeachingCertificate: boolean('hasTeachingCertificate').notNull(),
    certificateName: text('certificateName'),
    certificateSubjects: text('certificateSubjects'),
    tutoringExperienceRange: text('tutoringExperienceRange').notNull(),
    globalExams: jsonb('globalExams').notNull(),
    tutoringCountries: text('tutoringCountries').array().notNull(),
    countrySubjectSelections: jsonb('countrySubjectSelections').notNull(),
    categories: text('categories').array().notNull(),
    username: text('username').notNull(),
    socialLinks: jsonb('socialLinks'),
    serviceDescription: text('serviceDescription').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    TutorApplication_userId_idx: index('TutorApplication_userId_idx').on(table.userId),
    TutorApplication_username_idx: index('TutorApplication_username_idx').on(table.username),
  })
)
