import { defineConfig } from 'drizzle-kit';
import path from 'node:path';

const connectionString =
  process.env.DIRECT_URL || process.env.DATABASE_URL || 'postgresql://tutorme:tutorme_password@localhost:5433/tutorme';

export default defineConfig({
  schema: './src/lib/db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
});
