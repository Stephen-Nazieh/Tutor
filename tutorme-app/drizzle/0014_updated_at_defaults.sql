ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE "Profile" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE "Curriculum" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE "CurriculumModule" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE "CurriculumLesson" ALTER COLUMN "updatedAt" SET DEFAULT now();
ALTER TABLE "CurriculumLessonProgress" ALTER COLUMN "updatedAt" SET DEFAULT now();
