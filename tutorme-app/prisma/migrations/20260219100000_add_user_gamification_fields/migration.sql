-- AlterTable
ALTER TABLE "UserGamification" ADD COLUMN "longestStreak" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "UserGamification" ADD COLUMN "lastActiveDate" TIMESTAMP(3);
ALTER TABLE "UserGamification" ADD COLUMN "grammarScore" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "UserGamification" ADD COLUMN "vocabularyScore" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "UserGamification" ADD COLUMN "speakingScore" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "UserGamification" ADD COLUMN "listeningScore" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "UserGamification" ADD COLUMN "confidenceScore" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "UserGamification" ADD COLUMN "fluencyScore" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "UserGamification" ADD COLUMN "unlockedWorlds" TEXT[] DEFAULT ARRAY[]::TEXT[];
