-- AlterTable
ALTER TABLE "CourseBatch" ADD COLUMN     "currency" TEXT DEFAULT 'USD',
ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "isLive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "languageOfInstruction" TEXT DEFAULT 'en',
ADD COLUMN     "maxStudents" INTEGER NOT NULL DEFAULT 50,
ADD COLUMN     "meetingUrl" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "schedule" JSONB;

-- AlterTable
ALTER TABLE "Curriculum" ADD COLUMN     "gradeLevel" TEXT,
ALTER COLUMN "estimatedHours" SET DEFAULT 0,
ALTER COLUMN "isLiveOnline" SET DEFAULT false;

-- AlterTable
ALTER TABLE "GeneratedTask" ADD COLUMN     "batchId" TEXT,
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "lessonId" TEXT,
ADD COLUMN     "maxScore" INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "enrollmentId" TEXT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "learningGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tosAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tosAcceptedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "CurriculumCatalog" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CurriculumCatalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewSchedule" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "lastReviewed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextReview" TIMESTAMP(3) NOT NULL,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "stability" DOUBLE PRECISION NOT NULL DEFAULT 24,
    "repetitionCount" INTEGER NOT NULL DEFAULT 0,
    "performance" DOUBLE PRECISION NOT NULL DEFAULT 70,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "method" TEXT NOT NULL,
    "details" JSONB,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "transactionReference" TEXT,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarConnection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "syncEnabled" BOOLEAN NOT NULL DEFAULT true,
    "syncDirection" TEXT NOT NULL DEFAULT 'bidirectional',
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalendarConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CurriculumCatalog_subject_idx" ON "CurriculumCatalog"("subject");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumCatalog_subject_name_key" ON "CurriculumCatalog"("subject", "name");

-- CreateIndex
CREATE INDEX "ReviewSchedule_studentId_idx" ON "ReviewSchedule"("studentId");

-- CreateIndex
CREATE INDEX "ReviewSchedule_nextReview_idx" ON "ReviewSchedule"("nextReview");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewSchedule_studentId_contentId_key" ON "ReviewSchedule"("studentId", "contentId");

-- CreateIndex
CREATE INDEX "Payout_tutorId_idx" ON "Payout"("tutorId");

-- CreateIndex
CREATE INDEX "Payout_status_idx" ON "Payout"("status");

-- CreateIndex
CREATE INDEX "CalendarConnection_userId_idx" ON "CalendarConnection"("userId");

-- CreateIndex
CREATE INDEX "CalendarConnection_provider_idx" ON "CalendarConnection"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "CalendarConnection_userId_provider_key" ON "CalendarConnection"("userId", "provider");

-- CreateIndex
CREATE INDEX "GeneratedTask_lessonId_idx" ON "GeneratedTask"("lessonId");

-- CreateIndex
CREATE INDEX "GeneratedTask_batchId_idx" ON "GeneratedTask"("batchId");

-- CreateIndex
CREATE INDEX "Resource_tags_idx" ON "Resource"("tags");

-- CreateIndex
CREATE INDEX "StudentPerformance_curriculumId_idx" ON "StudentPerformance"("curriculumId");

-- AddForeignKey
ALTER TABLE "StudentPerformance" ADD CONSTRAINT "StudentPerformance_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackWorkflow" ADD CONSTRAINT "FeedbackWorkflow_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "TaskSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedTask" ADD CONSTRAINT "GeneratedTask_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "CurriculumLesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedTask" ADD CONSTRAINT "GeneratedTask_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "CourseBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewSchedule" ADD CONSTRAINT "ReviewSchedule_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewSchedule" ADD CONSTRAINT "ReviewSchedule_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "CurriculumEnrollment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarConnection" ADD CONSTRAINT "CalendarConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
