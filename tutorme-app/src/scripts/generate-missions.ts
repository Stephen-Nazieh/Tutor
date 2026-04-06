/**
 * Legacy missions generator removed.
 */

export async function generateMissionsFromCourses() {
  console.log('Mission generation skipped: feature removed.')
}

if (require.main === module) {
  generateMissionsFromCourses().catch(err => {
    console.error('Generation failed:', err)
    process.exit(1)
  })
}
