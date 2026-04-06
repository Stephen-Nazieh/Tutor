/**
 * Legacy gamification seed script removed.
 */

export async function seedGamification() {
  console.log('Gamification seed skipped: feature removed.')
}

if (require.main === module) {
  seedGamification().catch(err => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
}
