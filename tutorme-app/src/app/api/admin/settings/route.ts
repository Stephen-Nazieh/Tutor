import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import { requireAdmin, logAdminAction, getClientIp } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'

const DEFAULT_SETTINGS = {
  general: {
    platformName: { value: 'TutorMe', valueType: 'string', description: 'Name of the platform' },
    platformDescription: { value: 'AI-powered tutoring platform', valueType: 'string', description: 'Description shown in meta tags' },
    supportEmail: { value: 'support@tutorme.com', valueType: 'string', description: 'Primary support email address' },
    maxFileUploadSize: { value: 50, valueType: 'number', description: 'Maximum file upload size in MB' },
  },
  features: {
    registrationEnabled: { value: true, valueType: 'boolean', description: 'Allow new user registrations' },
    waitlistEnabled: { value: false, valueType: 'boolean', description: 'Enable waitlist mode for new registrations' },
    emailVerificationRequired: { value: true, valueType: 'boolean', description: 'Require email verification for new accounts' },
    maintenanceMode: { value: false, valueType: 'boolean', description: 'Enable maintenance mode', requiresRestart: true },
  },
  ai: {
    defaultTemperature: { value: 0.7, valueType: 'number', description: 'Default temperature for AI responses' },
    maxContextMessages: { value: 20, valueType: 'number', description: 'Maximum messages to include in context' },
    enableResponseCache: { value: true, valueType: 'boolean', description: 'Cache AI responses for similar queries' },
  },
  security: {
    maxLoginAttempts: { value: 5, valueType: 'number', description: 'Maximum failed login attempts before lockout' },
    lockoutDuration: { value: 30, valueType: 'number', description: 'Account lockout duration in minutes' },
    requireStrongPassword: { value: true, valueType: 'boolean', description: 'Require strong passwords' },
    sessionTimeout: { value: 480, valueType: 'number', description: 'Session timeout in minutes' },
  },
}

export async function GET(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.SETTINGS_READ)
  
  if (!session) return response!

  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')

    const where: Record<string, unknown> = {}
    if (category) {
      where.category = category
    }

    const settings = await prisma.systemSetting.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { key: 'asc' },
      ],
    })

    // If no settings exist, return defaults
    if (settings.length === 0 && category) {
      const defaults = DEFAULT_SETTINGS[category as keyof typeof DEFAULT_SETTINGS]
      if (defaults) {
        return NextResponse.json({
          settings: Object.entries(defaults).map(([key, config]) => ({
            category,
            key,
            ...config,
            isDefault: true,
          })),
        })
      }
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.SETTINGS_WRITE)
  
  if (!session) return response!

  try {
    const body = await req.json()
    const { category, key, value, valueType, description, requiresRestart } = body

    if (!category || !key || value === undefined) {
      return NextResponse.json(
        { error: 'Category, key, and value are required' },
        { status: 400 }
      )
    }

    const setting = await prisma.systemSetting.upsert({
      where: {
        category_key: { category, key },
      },
      update: {
        value,
        updatedBy: session.adminId,
      },
      create: {
        category,
        key,
        value,
        valueType: valueType || 'string',
        description,
        requiresRestart: requiresRestart || false,
        updatedBy: session.adminId,
      },
    })

    await logAdminAction(session.adminId, 'settings.update', {
      resourceType: 'system_setting',
      resourceId: setting.id,
      newState: setting,
      ipAddress: getClientIp(req),
      userAgent: req.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ setting })
  } catch (error) {
    console.error('Error updating setting:', error)
    return NextResponse.json(
      { error: 'Failed to update setting' },
      { status: 500 }
    )
  }
}
