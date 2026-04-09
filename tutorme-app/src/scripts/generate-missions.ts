/**
 * Legacy missions generator removed.
 */

export async function generateMissions() {
  console.log('Missions generation disabled')
}

if (require.main === module) {
  generateMissions().catch(err => {
    console.error('Generation failed:', err)
    process.exit(1)
  })
}
