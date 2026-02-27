/**
 * Legacy Prisma client for code not yet migrated to Drizzle.
 * Use only for: pipl-compliance, seed-gamification, generate-missions, and tests that need Prisma.
 * New code should use: import { drizzleDb } from '@/lib/db/drizzle'
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const isServer =
  typeof window === 'undefined' &&
  (typeof (globalThis as unknown as { EdgeRuntime?: string }).EdgeRuntime === 'undefined')

let prismaLegacy: import('@prisma/client').PrismaClient

if (isServer) {
  try {
    const { PrismaClient } = require('@prisma/client')
    const g = globalThis as unknown as { __prismaLegacy?: InstanceType<typeof PrismaClient> }
    if (g.__prismaLegacy) {
      prismaLegacy = g.__prismaLegacy
    } else {
      prismaLegacy = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
      })
      if (process.env.NODE_ENV !== 'production') {
        g.__prismaLegacy = prismaLegacy
      }
    }
  } catch {
    prismaLegacy = null as unknown as import('@prisma/client').PrismaClient
  }
} else {
  prismaLegacy = null as unknown as import('@prisma/client').PrismaClient
}

export const prismaLegacyClient = prismaLegacy
