CREATE TABLE "BuilderTask" (
	"id" text PRIMARY KEY NOT NULL,
	"curriculumId" text NOT NULL,
	"lessonId" text NOT NULL,
	"moduleId" text,
	"tutorId" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"pci" text NOT NULL,
	"details" text,
	"type" text DEFAULT 'task' NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"metadata" jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"publishedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "BuilderTaskExtension" (
	"id" text PRIMARY KEY NOT NULL,
	"taskId" text NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL,
	"pci" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"isActive" boolean DEFAULT false NOT NULL,
	"metadata" jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BuilderTaskFile" (
	"id" text PRIMARY KEY NOT NULL,
	"taskId" text NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"mimeType" text,
	"size" integer,
	"extractedText" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BuilderTaskVersion" (
	"id" text PRIMARY KEY NOT NULL,
	"taskId" text NOT NULL,
	"version" integer NOT NULL,
	"content" text NOT NULL,
	"pci" text NOT NULL,
	"changeDescription" text,
	"createdBy" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TutorAsset" (
	"id" text PRIMARY KEY NOT NULL,
	"tutorId" text NOT NULL,
	"name" text NOT NULL,
	"content" text,
	"url" text,
	"mimeType" text,
	"size" integer,
	"metadata" jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_inquiries" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_signups" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"bio" text,
	"country" text,
	"photo" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "age_verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"is_minor" boolean NOT NULL,
	"age_group" text NOT NULL,
	"parent_consent_required" boolean NOT NULL,
	"parent_consent_granted" boolean DEFAULT false NOT NULL,
	"parent_user_id" text,
	"verified_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "age_verifications_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "consent_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"consent_type" text NOT NULL,
	"consent_version" text NOT NULL,
	"granted" boolean NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"granted_at" timestamp DEFAULT now() NOT NULL,
	"revoked_at" timestamp,
	"parent_user_id" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "data_export_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"requested_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"download_url" text,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "deletion_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"requested_by" text NOT NULL,
	"reason" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"requested_at" timestamp DEFAULT now() NOT NULL,
	"processed_at" timestamp,
	"processed_by" text,
	"admin_notes" text,
	"pseudonymized_id" text
);
--> statement-breakpoint
CREATE TABLE "pii_access_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"accessor_id" text NOT NULL,
	"accessor_role" text NOT NULL,
	"target_user_id" text,
	"resource_type" text NOT NULL,
	"resource_id" text,
	"action" text NOT NULL,
	"endpoint" text NOT NULL,
	"ip_hash" text,
	"accessed_at" timestamp DEFAULT now() NOT NULL,
	"legal_basis" text
);
--> statement-breakpoint
CREATE TABLE "privacy_policy_versions" (
	"id" text PRIMARY KEY NOT NULL,
	"version" text NOT NULL,
	"effective_date" timestamp NOT NULL,
	"summary" text NOT NULL,
	"full_text_url" text,
	"is_active" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "privacy_policy_versions_version_unique" UNIQUE("version")
);
--> statement-breakpoint
CREATE TABLE "third_party_audits" (
	"id" text PRIMARY KEY NOT NULL,
	"service_name" text NOT NULL,
	"category" text NOT NULL,
	"data_processed" jsonb NOT NULL,
	"gdpr_compliant" boolean DEFAULT false NOT NULL,
	"coppa_compliant" boolean DEFAULT false NOT NULL,
	"ferpa_compliant" boolean DEFAULT false NOT NULL,
	"dpa_signed" boolean DEFAULT false NOT NULL,
	"no_training_clause" boolean DEFAULT false NOT NULL,
	"privacy_policy_url" text,
	"notes" text,
	"last_audited_at" timestamp DEFAULT now() NOT NULL,
	"audited_by" text,
	CONSTRAINT "third_party_audits_service_name_unique" UNIQUE("service_name")
);
--> statement-breakpoint
CREATE INDEX "BuilderTask_curriculumId_idx" ON "BuilderTask" USING btree ("curriculumId");--> statement-breakpoint
CREATE INDEX "BuilderTask_lessonId_idx" ON "BuilderTask" USING btree ("lessonId");--> statement-breakpoint
CREATE INDEX "BuilderTask_moduleId_idx" ON "BuilderTask" USING btree ("moduleId");--> statement-breakpoint
CREATE INDEX "BuilderTask_tutorId_idx" ON "BuilderTask" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX "BuilderTask_type_idx" ON "BuilderTask" USING btree ("type");--> statement-breakpoint
CREATE INDEX "BuilderTask_status_idx" ON "BuilderTask" USING btree ("status");--> statement-breakpoint
CREATE INDEX "BuilderTask_curriculumId_lessonId_idx" ON "BuilderTask" USING btree ("curriculumId","lessonId");--> statement-breakpoint
CREATE INDEX "BuilderTaskExtension_taskId_idx" ON "BuilderTaskExtension" USING btree ("taskId");--> statement-breakpoint
CREATE INDEX "BuilderTaskExtension_taskId_order_idx" ON "BuilderTaskExtension" USING btree ("taskId","order");--> statement-breakpoint
CREATE INDEX "BuilderTaskFile_taskId_idx" ON "BuilderTaskFile" USING btree ("taskId");--> statement-breakpoint
CREATE INDEX "BuilderTaskVersion_taskId_idx" ON "BuilderTaskVersion" USING btree ("taskId");--> statement-breakpoint
CREATE INDEX "BuilderTaskVersion_taskId_version_idx" ON "BuilderTaskVersion" USING btree ("taskId","version");--> statement-breakpoint
CREATE INDEX "TutorAsset_tutorId_idx" ON "TutorAsset" USING btree ("tutorId");--> statement-breakpoint
CREATE INDEX "TutorAsset_tutorId_createdAt_idx" ON "TutorAsset" USING btree ("tutorId","createdAt");--> statement-breakpoint
CREATE UNIQUE INDEX "ageverif_userId_key" ON "age_verifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "consent_userId_idx" ON "consent_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "consent_type_idx" ON "consent_logs" USING btree ("consent_type");--> statement-breakpoint
CREATE INDEX "export_userId_idx" ON "data_export_requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "export_status_idx" ON "data_export_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "deletion_status_idx" ON "deletion_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "deletion_userId_idx" ON "deletion_requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "pii_accessorId_idx" ON "pii_access_logs" USING btree ("accessor_id");--> statement-breakpoint
CREATE INDEX "pii_targetUserId_idx" ON "pii_access_logs" USING btree ("target_user_id");--> statement-breakpoint
CREATE INDEX "pii_accessedAt_idx" ON "pii_access_logs" USING btree ("accessed_at");--> statement-breakpoint
CREATE INDEX "pii_resourceType_idx" ON "pii_access_logs" USING btree ("resource_type");