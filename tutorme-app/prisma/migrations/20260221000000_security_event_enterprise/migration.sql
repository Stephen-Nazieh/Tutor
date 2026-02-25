-- AlterTable: Extend SecurityEvent for enterprise OWASP/GDPR/PIPL/PCI DSS compliance
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "action" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "userId" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "actorId" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "targetType" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "targetId" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "severity" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "description" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "originIp" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "userAgent" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "countryCode" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "region" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "city" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "deviceId" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "sessionId" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "correlationId" TEXT;
ALTER TABLE "SecurityEvent" ADD COLUMN IF NOT EXISTS "occurredAt" TIMESTAMP(3);

CREATE INDEX IF NOT EXISTS "SecurityEvent_action_idx" ON "SecurityEvent"("action");
CREATE INDEX IF NOT EXISTS "SecurityEvent_severity_idx" ON "SecurityEvent"("severity");
CREATE INDEX IF NOT EXISTS "SecurityEvent_occurredAt_idx" ON "SecurityEvent"("occurredAt");
CREATE INDEX IF NOT EXISTS "SecurityEvent_userId_idx" ON "SecurityEvent"("userId");
