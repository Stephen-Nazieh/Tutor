import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const connectionString = process.env.DATABASE_URL;
// If no DATABASE_URL, create a dummy pool that logs warnings
let pool;
if (!connectionString || connectionString.includes('localhost')) {
    console.log('Warning: DATABASE_URL not set or using localhost. Database features will be limited.');
    // Create a dummy pool that throws meaningful errors
    pool = new Pool({
        connectionString: 'postgresql://dummy:dummy@localhost:5432/dummy',
        max: 1,
    });
    pool.on('error', () => {
        // Suppress connection errors for dummy pool
    });
}
else {
    pool = new Pool({
        connectionString,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
    });
}
export async function query(text, params = []) {
    if (!connectionString || connectionString.includes('localhost')) {
        console.log('Database query attempted but DATABASE_URL not configured');
        return [];
    }
    try {
        const result = await pool.query(text, params);
        return result.rows;
    }
    catch (error) {
        console.error('Database query failed:', error);
        return [];
    }
}
export async function closePool() {
    try {
        await pool.end();
    }
    catch {
        // Ignore errors when closing
    }
}
