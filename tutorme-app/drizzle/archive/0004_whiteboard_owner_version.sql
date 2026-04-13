ALTER TABLE "Whiteboard" ADD COLUMN "ownerId" text;
UPDATE "Whiteboard" SET "ownerId" = "tutorId" WHERE "ownerId" IS NULL;
ALTER TABLE "Whiteboard" ALTER COLUMN "ownerId" SET NOT NULL;
CREATE INDEX "Whiteboard_ownerId_idx" ON "Whiteboard" ("ownerId");
CREATE INDEX "Whiteboard_sessionId_ownerId_idx" ON "Whiteboard" ("sessionId", "ownerId");

ALTER TABLE "WhiteboardPage" ADD COLUMN "version" integer NOT NULL DEFAULT 1;
