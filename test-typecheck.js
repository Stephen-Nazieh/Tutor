const { execSync } = require('child_process');
try {
  execSync('npm run typecheck', { cwd: '/Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app', stdio: 'pipe' });
  console.log('OK');
} catch (e) {
  require('fs').writeFileSync('typecheck.log', e.stdout.toString() + e.stderr.toString());
  console.log('ERR');
}