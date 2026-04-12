const { execSync } = require('child_process');

try {
  console.log('Generating migration...');
  const genOutput = execSync('npm run db:generate', { 
    cwd: '/Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app',
    encoding: 'utf-8',
    env: { ...process.env, DATABASE_URL: 'postgresql://tutorme:tutorme_password@localhost:5433/tutorme' }
  });
  console.log(genOutput);

  console.log('Committing changes...');
  execSync('git add .', { cwd: '/Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app' });
  const commitOutput = execSync('git commit -m "refactor: optimize DB queries, add missing indexes, and enforce runtime validation"', { 
    cwd: '/Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app',
    encoding: 'utf-8' 
  });
  console.log(commitOutput);

  console.log('Pushing to origin...');
  execSync('git push', { cwd: '/Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app' });
  console.log('Pushed successfully!');
} catch (e) {
  console.error('Error occurred:', e.message);
  if (e.stdout) console.log('STDOUT:', e.stdout.toString());
  if (e.stderr) console.error('STDERR:', e.stderr.toString());
}
