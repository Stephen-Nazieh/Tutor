ALTER TABLE "Course" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "CourseLesson" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "CourseLessonProgress" ALTER COLUMN "updatedAt" SET DEFAULT now();