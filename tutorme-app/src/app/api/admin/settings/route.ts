import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { systemSetting } from '@/lib/db/schema'
import { eq, and, asc } from 'drizzle-orm'
import { requireAdmin, logAdminAction, getClientIp } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'
import crypto from 'crypto'

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

    const conditions = category ? [eq(systemSetting.category, category)] : []
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const settings = await drizzleDb
      .select()
      .from(systemSetting)
      .where(whereClause)
      .orderBy(asc(systemSetting.category), asc(systemSetting.key))

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

    const existing = await drizzleDb
      .select()
      .from(systemSetting)
      .where(and(eq(systemSetting.category, category), eq(systemSetting.key, key)))
      .limit(1)

    const valueTypeFinal = valueType || 'string'
    const requiresRestartFinal = requiresRestart ?? false

    let setting: typeof systemSetting.$inferSelect
    if (existing.length > 0) {
      const [row] = existing
      await drizzleDb
        .update(systemSetting)
        .set({
          settingValue: value,
          updatedBy: session.adminId,
        })
        .where(eq(systemSetting.id, row.id))
      setting = { ...row, settingValue: value, updatedBy: session.adminId }
    } else {
      const id = crypto.randomUUID()
      await drizzleDb.insert(systemSetting).values({
        id,
        category,
        key,
        settingValue: value,
        valueType: valueTypeFinal,
        description: description ?? null,
        isEditable: true,
        requiresRestart: requiresRestartFinal,
        updatedBy: session.adminId,
      })
      const [inserted] = await drizzleDb.select().from(systemSetting).where(eq(systemSetting.id, id))
      setting = inserted!
    }

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
