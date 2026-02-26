/**
 * Admin System Seed Script
 * Run with: npx tsx src/scripts/seed-admin.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import { hashPassword } from '@/lib/admin/auth'

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
      await prisma.adminRole.upsert({
        where: { name: role.name },
        update: {},
        create: role,
      })
      console.log(`  ✓ Role: ${role.name}`)
    }

    // 2. Create default admin user if it doesn't exist
    console.log('\nChecking for admin user...')
    
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@tutorme.com'
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123'

    let adminUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    })

    const hashedPassword = await hashPassword(adminPassword)
    if (!adminUser) {
      console.log('Creating default admin user...')
      adminUser = await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          role: 'ADMIN',
          emailVerified: new Date(),
          profile: {
            create: {
              name: 'System Administrator',
            },
          },
        },
      })
      console.log(`  ✓ Created admin user: ${adminEmail}`)
    } else {
      console.log(`  ℹ Admin user exists: ${adminEmail}`)
      await prisma.user.update({
        where: { id: adminUser.id },
        data: { password: hashedPassword },
      })
      console.log(`  ✓ Updated password so admin123 works for login`)
    }

    // 3. Assign SUPER_ADMIN role to admin user
    console.log('\nAssigning SUPER_ADMIN role...')
    
    const superAdminRole = await prisma.adminRole.findUnique({
      where: { name: 'SUPER_ADMIN' },
    })

    if (superAdminRole) {
      await prisma.adminAssignment.upsert({
        where: {
          userId_roleId: {
            userId: adminUser.id,
            roleId: superAdminRole.id,
          },
        },
        update: {
          isActive: true,
        },
        create: {
          userId: adminUser.id,
          roleId: superAdminRole.id,
          assignedBy: adminUser.id,
        },
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
      },
      {
        category: 'general',
        key: 'platformDescription',
        settingValue: { value: 'AI-powered tutoring platform' },
        valueType: 'string',
        description: 'Description shown in meta tags',
      },
      {
        category: 'general',
        key: 'supportEmail',
        settingValue: { value: 'support@tutorme.com' },
        valueType: 'string',
        description: 'Primary support email address',
      },
      {
        category: 'features',
        key: 'registrationEnabled',
        settingValue: { value: true },
        valueType: 'boolean',
        description: 'Allow new user registrations',
      },
      {
        category: 'features',
        key: 'emailVerificationRequired',
        settingValue: { value: true },
        valueType: 'boolean',
        description: 'Require email verification for new accounts',
      },
      {
        category: 'ai',
        key: 'defaultTemperature',
        settingValue: { value: 0.7 },
        valueType: 'number',
        description: 'Default temperature for AI responses',
      },
      {
        category: 'security',
        key: 'maxLoginAttempts',
        settingValue: { value: 5 },
        valueType: 'number',
        description: 'Maximum failed login attempts before lockout',
      },
      {
        category: 'security',
        key: 'sessionTimeout',
        settingValue: { value: 480 },
        valueType: 'number',
        description: 'Session timeout in minutes',
      },
    ]

    for (const setting of defaultSettings) {
      await prisma.systemSetting.upsert({
        where: {
          category_key: {
            category: setting.category,
            key: setting.key,
          },
        },
        update: {},
        create: {
          ...setting,
          updatedBy: adminUser.id,
        },
      })
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
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  seedAdminSystem()
}

export { seedAdminSystem }
