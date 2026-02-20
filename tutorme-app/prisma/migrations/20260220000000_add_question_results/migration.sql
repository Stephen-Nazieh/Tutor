-- AlterTable
ALTER TABLE "QuizAttempt" ADD COLUMN IF NOT EXISTS "questionResults" JSONB;

-- AlterTable
ALTER TABLE "TaskSubmission" ADD COLUMN IF NOT EXISTS "questionResults" JSONB;
