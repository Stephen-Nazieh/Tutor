/**
 * Admin System Seed Script
 * Run with: npx tsx src/scripts/seed-admin.ts
 */

import { eq, and } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { adminRole, adminAssignment, systemSetting, user, profile } from '@/lib/db/schema'
import { hashPassword } from '@/lib/admin/auth'
import crypto from 'crypto'

async function seedAdminSystem() {
  console.log('🌱 Seeding admin system...\n')

  try {
    // 1. Create default admin roles
    console.log('Creating admin roles...')

    const roles = [
      {
        name: 'SUPER_ADMIN',
        description: 'Full platform access - can do everything',
        permissions: ['*'],
      },
      {
        name: 'ADMIN',
        description: 'Administrative access - can manage users, content, and settings',
        permissions: [
          'users:read',
          'users:write',
          'users:ban',
          'features:read',
          'features:write',
          'llm:read',
          'llm:write',
          'settings:read',
          'settings:write',
          'analytics:read',
          'analytics:export',
          'audit:read',
          'content:read',
          'content:write',
          'content:moderate',
          'security:read',
          'security:write',
          'admins:read',
          'system:read',
        ],
      },
      {
        name: 'MODERATOR',
        description: 'Content moderation - can review and moderate content',
        permissions: [
          'users:read',
          'features:read',
          'content:read',
          'content:write',
          'content:moderate',
          'audit:read',
        ],
      },
      {
        name: 'SUPPORT',
        description: 'Customer support - can view users and provide support',
        permissions: [
          'users:read',
          'users:impersonate',
          'content:read',
          'audit:read',
        ],
      },
    ]

    for (const role of roles) {
      await drizzleDb.insert(adminRole).values({
        id: crypto.randomUUID(),
        ...role,
      }).onConflictDoNothing({ target: adminRole.name })
      console.log(`  ✓ Role: ${role.name}`)
    }

    // 2. Create default admin user if it doesn't exist
    console.log('\nChecking for admin user...')

    const adminEmail = (process.env.DEFAULT_ADMIN_EMAIL || 'admin@tutorme.com').toLowerCase()
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123'

    const [existingAdmin] = await drizzleDb
      .select()
      .from(user)
      .where(eq(user.email, adminEmail))
      .limit(1)

    const hashedPassword = await hashPassword(adminPassword)
    let adminUserId: string

    if (!existingAdmin) {
      console.log('Creating default admin user...')
      adminUserId = crypto.randomUUID()
      await drizzleDb.transaction(async (tx) => {
        await tx.insert(user).values({
          id: adminUserId,
          email: adminEmail,
          password: hashedPassword,
          role: 'ADMIN',
          emailVerified: new Date(),
        })
        await tx.insert(profile).values({
          id: crypto.randomUUID(),
          userId: adminUserId,
          name: 'System Administrator',
          timezone: 'UTC',
          emailNotifications: true,
          smsNotifications: false,
          subjectsOfInterest: [],
          preferredLanguages: ['en'],
          learningGoals: [],
          tosAccepted: true,
          isOnboarded: true,
          specialties: [],
          paidClassesEnabled: false,
        })
      })
      console.log(`  ✓ Created admin user: ${adminEmail}`)
    } else {
      adminUserId = existingAdmin.id
      console.log(`  ℹ Admin user exists: ${adminEmail}`)
      await drizzleDb.update(user)
        .set({ password: hashedPassword })
        .where(eq(user.id, adminUserId))
      console.log(`  ✓ Updated password so admin123 works for login`)
    }

    // 3. Assign SUPER_ADMIN role to admin user
    console.log('\nAssigning SUPER_ADMIN role...')

    const [superAdminRole] = await drizzleDb
      .select()
      .from(adminRole)
      .where(eq(adminRole.name, 'SUPER_ADMIN'))
      .limit(1)

    if (superAdminRole) {
      await drizzleDb.insert(adminAssignment).values({
        id: crypto.randomUUID(),
        userId: adminUserId,
        roleId: superAdminRole.id,
        assignedBy: adminUserId,
        isActive: true,
      }).onConflictDoUpdate({
        target: [adminAssignment.userId, adminAssignment.roleId],
        set: { isActive: true }
      })
      console.log(`  ✓ Assigned SUPER_ADMIN role`)
    }

    // 4. Create default system settings
    console.log('\nCreating default system settings...')

    const defaultSettings = [
      {
        category: 'general',
        key: 'platformName',
        settingValue: { value: 'TutorMe' },
        valueType: 'string',
        description: 'Name of the platform',
        isEditable: true,
        requiresRestart: false,
      },
      {
        category: 'general',
        key: 'platformDescription',
        settingValue: { value: 'AI-powered tutoring platform' },
        valueType: 'string',
        description: 'Description shown in meta tags',
        isEditable: true,
        requiresRestart: false,
      },
      {
        category: 'general',
        key: 'supportEmail',
        settingValue: { value: 'support@tutorme.com' },
        valueType: 'string',
        description: 'Primary support email address',
        isEditable: true,
        requiresRestart: false,
      },
      {
        category: 'features',
        key: 'registrationEnabled',
        settingValue: { value: true },
        valueType: 'boolean',
        description: 'Allow new user registrations',
        isEditable: true,
        requiresRestart: false,
      },
      {
        category: 'features',
        key: 'emailVerificationRequired',
        settingValue: { value: true },
        valueType: 'boolean',
        description: 'Require email verification for new accounts',
        isEditable: true,
        requiresRestart: false,
      },
      {
        category: 'ai',
        key: 'defaultTemperature',
        settingValue: { value: 0.7 },
        valueType: 'number',
        description: 'Default temperature for AI responses',
        isEditable: true,
        requiresRestart: false,
      },
      {
        category: 'security',
        key: 'maxLoginAttempts',
        settingValue: { value: 5 },
        valueType: 'number',
        description: 'Maximum failed login attempts before lockout',
        isEditable: true,
        requiresRestart: false,
      },
      {
        category: 'security',
        key: 'sessionTimeout',
        settingValue: { value: 480 },
        valueType: 'number',
        description: 'Session timeout in minutes',
        isEditable: true,
        requiresRestart: true,
      },
    ]

    for (const setting of defaultSettings) {
      await drizzleDb.insert(systemSetting).values({
        id: crypto.randomUUID(),
        ...setting,
        settingValue: setting.settingValue as object,
        updatedBy: adminUserId,
      }).onConflictDoNothing({ target: [systemSetting.category, systemSetting.key] })
    }
    console.log(`  ✓ Created ${defaultSettings.length} system settings`)

    console.log('\n✅ Admin system seeding complete!')
    console.log('\n📋 Default admin credentials:')
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Password: ${adminPassword}`)
    console.log('\n⚠️  IMPORTANT: Change the default password after first login!')

  } catch (error) {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  seedAdminSystem()
}

export { seedAdminSystem }

