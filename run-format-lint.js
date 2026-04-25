const { execSync } = require('child_process');

try {
  const output = execSync('npm run format', { cwd: '/Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app', encoding: 'utf-8' });
  console.log('Format output:\n', output);
} catch (error) {
  console.error('Format failed:\n', error.stdout);
  console.error(error.stderr);
}

try {
  const output2 = execSync('npm run lint:fix', { cwd: '/Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app', encoding: 'utf-8' });
  console.log('Lint fix output:\n', output2);
} catch (error) {
  console.error('Lint fix failed:\n', error.stdout);
  console.error(error.stderr);
}
