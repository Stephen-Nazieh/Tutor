/**
 * User Profile API
 * GET /api/user/profile — current user's profile (withAuth)
 * PUT /api/user/profile — update profile (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { profile } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { sanitizeHtml, sanitizeHtmlWithMax } from '@/lib/security/sanitize'

async function getHandler(_req: NextRequest, session: Session) {
  try {
    const [profileRow] = await drizzleDb
      .select()
      .from(profile)
      .where(eq(profile.userId, session.user.id))
      .limit(1)
    return NextResponse.json({
      profile: profileRow ?? null,
      userId: session.user.id,
      email: session.user.email ?? null,
      role: session.user.role ?? null,
    })
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

async function putHandler(req: NextRequest, session: Session) {
  try {
    const csrfError = await requireCsrf(req)
    if (csrfError) return csrfError

    const body = await req.json()
    const { name, bio, credentials, subjects, availability, hourlyRate, gradeLevel, subjectsOfInterest, preferredLanguages, paidClassesEnabled, paymentGatewayPreference, currency } = body

    // Prepare update data
    const updateData: Record<string, unknown> = {}

    // Common fields (sanitize to prevent XSS)
    if (name !== undefined) updateData.name = sanitizeHtml(String(name)).trim().slice(0, 100) || null
    if (bio !== undefined) updateData.bio = sanitizeHtmlWithMax(bio, 2000)
    if (body.avatarUrl !== undefined) updateData.avatarUrl = sanitizeHtml(String(body.avatarUrl)).trim() || null
    if (body.timezone !== undefined) updateData.timezone = sanitizeHtml(String(body.timezone)).trim()
    if (body.emailNotifications !== undefined) updateData.emailNotifications = Boolean(body.emailNotifications)
    if (body.smsNotifications !== undefined) updateData.smsNotifications = Boolean(body.smsNotifications)
    if (body.isOnboarded !== undefined) updateData.isOnboarded = Boolean(body.isOnboarded)
    if (body.tosAccepted === true) {
      updateData.tosAccepted = true
      updateData.tosAcceptedAt = new Date()
    }

    // Student fields
    if (gradeLevel !== undefined) updateData.gradeLevel = gradeLevel.toString()
    if (subjectsOfInterest !== undefined) updateData.subjectsOfInterest = subjectsOfInterest
    if (preferredLanguages !== undefined) updateData.preferredLanguages = Array.isArray(preferredLanguages) ? preferredLanguages : []
    if (body.learningGoals !== undefined) updateData.learningGoals = Array.isArray(body.learningGoals) ? body.learningGoals : []

    // Tutor fields
    if (hourlyRate !== undefined) updateData.hourlyRate = hourlyRate
    if (subjects !== undefined) updateData.specialties = subjects // Map subjects to specialties
    if (paidClassesEnabled !== undefined) updateData.paidClassesEnabled = Boolean(paidClassesEnabled)
    if (paymentGatewayPreference !== undefined) updateData.paymentGatewayPreference = paymentGatewayPreference === '' ? null : paymentGatewayPreference
    if (currency !== undefined) updateData.currency = currency === '' ? null : currency

    // Tutor & Generic fields cleanup
    if (credentials !== undefined) updateData.credentials = sanitizeHtmlWithMax(credentials, 2000)
    if (availability !== undefined) updateData.availability = availability

    const [existing] = await drizzleDb
      .select()
      .from(profile)
      .where(eq(profile.userId, session.user.id))
      .limit(1)

    if (existing) {
      await drizzleDb
        .update(profile)
        .set(updateData as any)
        .where(eq(profile.userId, session.user.id))
    } else {
      await drizzleDb.insert(profile).values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        timezone: (updateData.timezone as string) ?? 'UTC',
        emailNotifications: (updateData.emailNotifications as boolean) ?? true,
        smsNotifications: (updateData.smsNotifications as boolean) ?? false,
        tosAccepted: (updateData.tosAccepted as boolean) ?? false,
        isOnboarded: (updateData.isOnboarded as boolean) ?? false,
        paidClassesEnabled: (updateData.paidClassesEnabled as boolean) ?? false,
        subjectsOfInterest: (updateData.subjectsOfInterest as string[]) ?? [],
        preferredLanguages: (updateData.preferredLanguages as string[]) ?? [],
        learningGoals: (updateData.learningGoals as string[]) ?? [],
        specialties: (updateData.specialties as string[]) ?? [],
        ...updateData,
      } as any)
    }

    const [profileRow] = await drizzleDb
      .select()
      .from(profile)
      .where(eq(profile.userId, session.user.id))
      .limit(1)

    return NextResponse.json({ profile: profileRow! })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}

export const GET = withAuth(getHandler)
export const PUT = withAuth(putHandler)
