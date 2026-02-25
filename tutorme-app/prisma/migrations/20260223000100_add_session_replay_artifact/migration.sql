-- CreateTable
CREATE TABLE "SessionReplayArtifact" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "recordingUrl" TEXT,
    "transcript" TEXT,
    "summary" TEXT,
    "summaryJson" JSONB,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "generatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SessionReplayArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionReplayArtifact_sessionId_key" ON "SessionReplayArtifact"("sessionId");

-- CreateIndex
CREATE INDEX "SessionReplayArtifact_tutorId_idx" ON "SessionReplayArtifact"("tutorId");

-- CreateIndex
CREATE INDEX "SessionReplayArtifact_status_idx" ON "SessionReplayArtifact"("status");

-- CreateIndex
CREATE INDEX "SessionReplayArtifact_generatedAt_idx" ON "SessionReplayArtifact"("generatedAt");

-- AddForeignKey
ALTER TABLE "SessionReplayArtifact"
ADD CONSTRAINT "SessionReplayArtifact_sessionId_fkey"
FOREIGN KEY ("sessionId") REFERENCES "LiveSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionReplayArtifact"
ADD CONSTRAINT "SessionReplayArtifact_tutorId_fkey"
FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
