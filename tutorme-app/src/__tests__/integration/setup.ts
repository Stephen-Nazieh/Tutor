/**
 * Integration test environment setup.
 *
 * These tests require a real Postgres instance.
 * Default to the local docker-compose database if env vars are not provided.
 */

const DEFAULT_DB_URL = 'postgresql://tutorme:tutorme_password@localhost:5433/tutorme'

process.env.DATABASE_URL ||= DEFAULT_DB_URL
process.env.DIRECT_URL ||= process.env.DATABASE_URL
process.env.NEXTAUTH_SECRET ||= 'integration-test-secret-insecure-but-long-enough-32chars'
process.env.SECURITY_AUDIT ||= 'false'
