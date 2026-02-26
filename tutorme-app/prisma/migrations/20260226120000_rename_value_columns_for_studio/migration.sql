-- Rename columns named "value" to avoid Prisma Studio count-query bug.
-- Studio generates a CTE with a column "value", causing "column reference 'value' is ambiguous" in PostgreSQL.
-- See: https://github.com/prisma/studio/issues/890

ALTER TABLE "PerformanceMetric" RENAME COLUMN "value" TO "metric_value";
ALTER TABLE "SystemSetting" RENAME COLUMN "value" TO "setting_value";
