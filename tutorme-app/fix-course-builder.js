const { execSync } = require('child_process');
try {
  console.log('Running drizzle push...');
  execSync('npx drizzle-kit push', { 
    cwd: '/Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app',
    env: { ...process.env, DATABASE_URL: 'postgresql://tutorme:tutorme_password@localhost:5433/tutorme' },
    stdio: 'inherit'
  });
  console.log('Push completed.');
  
  execSync('npm run db:generate', { 
    cwd: '/Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app',
    env: { ...process.env, DATABASE_URL: 'postgresql://tutorme:tutorme_password@localhost:5433/tutorme' },
    stdio: 'inherit'
  });
  console.log('Migration generated.');
} catch (e) {
  console.error('Error:', e.message);
}
