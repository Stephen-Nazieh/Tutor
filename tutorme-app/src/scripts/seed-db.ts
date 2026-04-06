/**
 * Legacy seed script. Clinics/gamification removed.
 */

export async function seedDb() {
  console.log('Seed skipped: legacy seed data removed.')
}

if (require.main === module) {
  seedDb().catch(err => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
}
