ALTER TABLE "Course" ADD COLUMN "region" text;--> statement-breakpoint
ALTER TABLE "Course" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "Course" ADD COLUMN "parentCourseId" text;--> statement-breakpoint
ALTER TABLE "Course" ADD COLUMN "isVariant" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "Profile_countryOfResidence_idx" ON "Profile" USING btree ("countryOfResidence");--> statement-breakpoint
CREATE INDEX "Profile_hourlyRate_idx" ON "Profile" USING btree ("hourlyRate");--> statement-breakpoint
CREATE INDEX "Profile_isOnboarded_idx" ON "Profile" USING btree ("isOnboarded");--> statement-breakpoint
CREATE INDEX "Profile_subjectsOfInterest_idx" ON "Profile" USING gin ("subjectsOfInterest");--> statement-breakpoint
CREATE INDEX "Profile_preferredLanguages_idx" ON "Profile" USING gin ("preferredLanguages");--> statement-breakpoint
CREATE INDEX "Profile_tutorNationalities_idx" ON "Profile" USING gin ("tutorNationalities");--> statement-breakpoint
CREATE INDEX "Profile_categoryNationalityCombinations_idx" ON "Profile" USING gin ("categoryNationalityCombinations");--> statement-breakpoint
CREATE INDEX "Course_parentCourseId_idx" ON "Course" USING btree ("parentCourseId");--> statement-breakpoint
CREATE INDEX "Course_country_idx" ON "Course" USING btree ("country");--> statement-breakpoint
CREATE INDEX "Course_region_idx" ON "Course" USING btree ("region");--> statement-breakpoint
CREATE INDEX "CourseEnrollment_courseId_idx" ON "CourseEnrollment" USING btree ("courseId");--> statement-breakpoint
CREATE INDEX "SessionParticipant_sessionId_idx" ON "SessionParticipant" USING btree ("sessionId");--> statement-breakpoint
ALTER TABLE "Profile" DROP COLUMN "gradeLevel";--> statement-breakpoint
ALTER TABLE "LiveSession" DROP COLUMN "gradeLevel";