/**
 * User Profile API
 * GET /api/user/profile — current user's profile (withAuth)
 * PUT /api/user/profile — update profile (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { sanitizeHtml, sanitizeHtmlWithMax } from '@/lib/security/sanitize'

async function getHandler(_req: NextRequest, session: Session) {
  try {
    const profile = await db.profile.findUnique({
      where: { userId: session.user.id }
    })
    return NextResponse.json({ profile })
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
    const updateData: any = {}

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

    const profile = await db.profile.upsert({
      where: { userId: session.user.id },
      update: updateData,
      create: {
        userId: session.user.id,
        ...updateData
      }
    })

    return NextResponse.json({ profile })
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
