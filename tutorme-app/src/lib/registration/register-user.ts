import crypto from 'crypto'
import path from 'path'
import { mkdir, writeFile } from 'fs/promises'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { eq, sql } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  user,
  profile,
  familyAccount,
  familyMember,
  emergencyContact,
  tutorApplication,
} from '@/lib/db/schema'
import { RegisterUserSchema, type RegisterUserInput } from '@/lib/validation/schemas'
import { tutorAdditionalDataSchema, tutorProfileDataSchema } from '@/lib/validation/user-registration'
import { ValidationError } from '@/lib/api/middleware'
import { sanitizeHtml } from '@/lib/security/sanitize'
import { checkRateLimit, getClientIdentifier, RATE_LIMIT_PRESETS } from '@/lib/security/rate-limit'
import { verifyAllChildren, isStudentAlreadyLinked } from '@/lib/security/parent-child-queries'
import type { NextRequest } from 'next/server'

const MAX_AVATAR_SIZE_BYTES = 8 * 1024 * 1024

function normalizeUsernameSeed(seed: string): string {
  const cleaned = seed
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '')
    .replace(/\.+/g, '.')
    .replace(/^\.|\.$/g, '')
  if (cleaned.length >= 3) return cleaned.slice(0, 24)
  return `user${nanoid(6).toLowerCase()}`
}

function normalizeUsername(value: string): string {
  return value
    .trim()
    .replace(/^@+/, '')
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '')
    .replace(/\.+/g, '.')
    .replace(/^\.|\.$/g, '')
    .slice(0, 30)
}

async function generateUniqueUsername(
  checkExists: (username: string) => Promise<boolean>,
  preferred: string
): Promise<string> {
  const base = normalizeUsernameSeed(preferred)
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const suffix = attempt === 0 ? '' : String(Math.floor(Math.random() * 9000) + 1000)
    const candidate = `${base}${suffix}`.slice(0, 30)
    const exists = await checkExists(candidate)
    if (!exists) return candidate
  }
  return `tutor${nanoid(8).toLowerCase()}`
}

async function ensureTutorApplicationTable(tx: { execute: (query: any) => Promise<unknown> }) {
  await tx.execute(sql`
    CREATE TABLE IF NOT EXISTS "TutorApplication" (
      "id" text PRIMARY KEY NOT NULL,
      "userId" text NOT NULL UNIQUE,
      "firstName" text NOT NULL,
      "middleName" text,
      "lastName" text NOT NULL,
      "legalName" text NOT NULL,
      "countryOfResidence" text NOT NULL,
      "phoneCountryCode" text NOT NULL,
      "phoneNumber" text NOT NULL,
      "educationLevel" text NOT NULL,
      "hasTeachingCertificate" boolean NOT NULL,
      "certificateName" text,
      "certificateSubjects" text,
      "tutoringExperienceRange" text NOT NULL,
      "globalExams" jsonb NOT NULL,
      "tutoringCountries" text[] NOT NULL,
      "countrySubjectSelections" jsonb NOT NULL,
      "categories" text[] NOT NULL,
      "username" text NOT NULL,
      "socialLinks" jsonb,
      "serviceDescription" text NOT NULL,
      "createdAt" timestamptz NOT NULL DEFAULT now(),
      "updatedAt" timestamptz NOT NULL DEFAULT now()
    );
  `)
  await tx.execute(sql`CREATE INDEX IF NOT EXISTS "TutorApplication_userId_idx" ON "TutorApplication" ("userId");`)
  await tx.execute(sql`CREATE INDEX IF NOT EXISTS "TutorApplication_username_idx" ON "TutorApplication" ("username");`)
}

async function saveAvatar(userId: string, avatarFile: File): Promise<string> {
  if (avatarFile.size > MAX_AVATAR_SIZE_BYTES) {
    throw new ValidationError('Profile photo is too large (max 8MB)')
  }
  const safeName = avatarFile.name.replace(/[^a-zA-Z0-9._-]/g, '_') || 'avatar'
  const timestamp = Date.now()
  const relativeDir = path.join('uploads', 'avatars', userId)
  const absoluteDir = path.join(process.cwd(), 'public', relativeDir)
  await mkdir(absoluteDir, { recursive: true })
  const storedName = `${timestamp}-${safeName}`
  const absolutePath = path.join(absoluteDir, storedName)
  const bytes = Buffer.from(await avatarFile.arrayBuffer())
  await writeFile(absolutePath, bytes)
  return `/${relativeDir}/${storedName}`
}

export interface RegistrationResult {
  status: number
  body: Record<string, unknown>
  headers?: Record<string, string>
}

export async function performRegistration(
  request: NextRequest,
  payload: RegisterUserInput,
  options?: { avatarFile?: File | null }
): Promise<RegistrationResult> {
  const parsed = RegisterUserSchema.safeParse(payload)
  if (!parsed.success) {
    const messages = parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ')
    return { status: 400, body: { error: messages } }
  }

  const data = parsed.data
  const { email, password, role } = data
  const name = sanitizeHtml(data.name).trim().slice(0, 100) || 'User'
  const normalizedEmail = email.toLowerCase()

  const clientId = getClientIdentifier(request)
  const registerOptions = RATE_LIMIT_PRESETS.register
  const scopedRateLimit = await checkRateLimit(
    `register:${clientId}:${String(role).toUpperCase()}:${normalizedEmail}`,
    registerOptions
  )
  if (!scopedRateLimit.allowed) {
    return {
      status: 429,
      body: {
        error: 'Too many requests. Please try again later.',
        rateLimit: {
          remaining: scopedRateLimit.remaining,
          resetAt: Math.ceil(scopedRateLimit.resetAt / 1000),
        },
      },
      headers: {
        'X-RateLimit-Remaining': String(scopedRateLimit.remaining),
        'X-RateLimit-Reset': String(Math.ceil(scopedRateLimit.resetAt / 1000)),
      },
    }
  }

  let verifiedStudents: Map<number, import('@/lib/security/parent-child-queries').VerifiedStudent> | undefined

  const [existingUser] = await drizzleDb
    .select()
    .from(user)
    .where(eq(user.email, normalizedEmail))
    .limit(1)
  if (existingUser) {
    throw new ValidationError('Email already registered')
  }

  if (role === 'PARENT') {
    const additionalData = data.additionalData as {
      students?: import('@/lib/validation/parent-child-security').StudentLinkingInput[]
      emergencyContacts?: Array<{ name: string; relationship: string; phone: string }>
    } | undefined
    if (additionalData?.students?.length) {
      const { verified, errors } = await verifyAllChildren(additionalData.students)
      if (errors.length > 0) {
        const msg = errors.map((e) => `Child ${e.index + 1}: ${e.message}`).join('; ')
        return { status: 400, body: { error: msg } }
      }
      verifiedStudents = verified
      for (const [, student] of verified) {
        if (await isStudentAlreadyLinked(student.userId)) {
          return {
            status: 400,
            body: { error: `Student ${student.email} is already linked to another parent account.` },
          }
        }
      }
    }
  }

  if (role === 'TUTOR') {
    await ensureTutorApplicationTable(drizzleDb)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await drizzleDb.transaction(async (tx) => {
    const userId = crypto.randomUUID()
    await tx.insert(user).values({
      id: userId,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    })

    const checkUsername = async (username: string) => {
      const [existing] = await tx.select().from(profile).where(eq(profile.username, username)).limit(1)
      return !!existing
    }

    let desiredUsername: string | null = null
    if (role === 'TUTOR') {
      const tutorData = tutorAdditionalDataSchema.parse(data.additionalData)
      desiredUsername = normalizeUsername(tutorData.username)
      if (!desiredUsername || desiredUsername.length < 3) {
        desiredUsername = await generateUniqueUsername(checkUsername, name || normalizedEmail.split('@')[0])
      } else if (await checkUsername(desiredUsername)) {
        throw new ValidationError('Username already taken')
      }
    }

    const defaultUsername =
      role === 'TUTOR'
        ? desiredUsername ?? (await generateUniqueUsername(checkUsername, name || normalizedEmail.split('@')[0] || 'tutor'))
        : null

    const profileData = role === 'TUTOR' ? tutorProfileDataSchema.parse(data.profileData) : undefined

    await tx.insert(profile).values({
      id: crypto.randomUUID(),
      userId,
      name,
      username: defaultUsername ?? undefined,
      tosAccepted: data.tosAccepted === true,
      tosAcceptedAt: new Date(),
      timezone: profileData?.timezone ?? 'Asia/Shanghai',
      emailNotifications: true,
      smsNotifications: false,
      subjectsOfInterest: [],
      preferredLanguages: profileData?.preferredLanguage ? [profileData.preferredLanguage] : [],
      learningGoals: [],
      isOnboarded: role !== 'TUTOR',
      specialties: [],
      paidClassesEnabled: false,
      ...(role === 'STUDENT' && { studentUniqueId: `STU-${nanoid(12)}` }),
    })

    if (role === 'TUTOR') {
      const tutorData = tutorAdditionalDataSchema.parse(data.additionalData)
      const credentialParts: string[] = [tutorData.educationLevel]
      if (tutorData.hasTeachingCertificate && tutorData.certificateName) {
        credentialParts.push(`Certificate: ${tutorData.certificateName}`)
      }
      if (tutorData.certificateSubjects) {
        credentialParts.push(`Qualified subjects: ${tutorData.certificateSubjects}`)
      }
      await tx
        .update(profile)
        .set({
          credentials: credentialParts.join(' | ').slice(0, 2000) || null,
          bio: tutorData.serviceDescription.slice(0, 2000),
          specialties: tutorData.categories,
          hourlyRate: typeof tutorData.hourlyRate === 'number' ? tutorData.hourlyRate : null,
          isOnboarded: false,
        })
        .where(eq(profile.userId, userId))

      const tutorApplicationValues = {
        id: crypto.randomUUID(),
        userId,
        firstName: tutorData.firstName,
        middleName: tutorData.middleName ?? null,
        lastName: tutorData.lastName,
        legalName: tutorData.legalName,
        countryOfResidence: tutorData.countryOfResidence,
        phoneCountryCode: tutorData.phoneCountryCode,
        phoneNumber: tutorData.phoneNumber,
        educationLevel: tutorData.educationLevel,
        hasTeachingCertificate: tutorData.hasTeachingCertificate,
        certificateName: tutorData.certificateName ?? null,
        certificateSubjects: tutorData.certificateSubjects ?? null,
        tutoringExperienceRange: tutorData.tutoringExperienceRange,
        globalExams: tutorData.globalExams,
        tutoringCountries: tutorData.tutoringCountries,
        countrySubjectSelections: tutorData.countrySubjectSelections,
        categories: tutorData.categories,
        username: defaultUsername ?? tutorData.username,
        socialLinks: tutorData.socialLinks ?? null,
        serviceDescription: tutorData.serviceDescription,
      }

      await tx.insert(tutorApplication).values(tutorApplicationValues)
    }

    if (role === 'PARENT') {
      const ad = data.additionalData as {
        students?: Array<{ name?: string }>
        emergencyContacts?: Array<{ name: string; relationship: string; phone: string }>
      } | undefined
      const profileDataRaw = data.profileData as { phoneNumber?: string; timezone?: string } | undefined
      const familyAccountId = crypto.randomUUID()
      await tx.insert(familyAccount).values({
        id: familyAccountId,
        familyName: name,
        familyType: 'PARENT_STUDENT',
        primaryEmail: normalizedEmail,
        phoneNumber: profileDataRaw?.phoneNumber ?? null,
        timezone: profileDataRaw?.timezone ?? 'Asia/Shanghai',
        defaultCurrency: 'CNY',
        monthlyBudget: 0,
        enableBudget: false,
        allowAdults: false,
        isActive: true,
        isVerified: false,
      })
      await tx.insert(familyMember).values({
        id: crypto.randomUUID(),
        familyAccountId,
        userId,
        name,
        relation: 'parent',
        email: normalizedEmail,
      })
      const contacts = (ad?.emergencyContacts || []).filter(
        (c: { name?: string; phone?: string }) => c.name && c.phone
      )
      for (const contact of contacts as Array<{ name: string; relationship: string; phone: string }>) {
        await tx.insert(emergencyContact).values({
          id: crypto.randomUUID(),
          parentId: familyAccountId,
          name: contact.name,
          relation: contact.relationship,
          phone: contact.phone,
          isPrimary: false,
        })
      }
      const students = ad?.students
      if (students?.length && verifiedStudents) {
        for (let i = 0; i < students.length; i++) {
          const v = verifiedStudents.get(i)
          if (v) {
            const studentName = (students[i] as { name?: string })?.name || v.name || v.email
            await tx.insert(familyMember).values({
              id: crypto.randomUUID(),
              familyAccountId,
              userId: v.userId,
              name: studentName,
              relation: 'child',
              email: v.email,
            })
          }
        }
      }
    }

    return { id: userId, email: normalizedEmail, role, createdAt: new Date() }
  })

  if (role === 'TUTOR' && options?.avatarFile) {
    const avatarUrl = await saveAvatar(newUser.id, options.avatarFile)
    await drizzleDb
      .update(profile)
      .set({ avatarUrl })
      .where(eq(profile.userId, newUser.id))
  }

  let studentUniqueId: string | undefined
  if (role === 'STUDENT') {
    const [prof] = await drizzleDb
      .select({ studentUniqueId: profile.studentUniqueId })
      .from(profile)
      .where(eq(profile.userId, newUser.id))
      .limit(1)
    studentUniqueId = prof?.studentUniqueId ?? undefined
  }

  return {
    status: 201,
    body: {
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name,
        email: newUser.email,
        role: newUser.role,
        tosAccepted: data.tosAccepted === true,
        ...(studentUniqueId && { studentUniqueId }),
      },
    },
  }
}
